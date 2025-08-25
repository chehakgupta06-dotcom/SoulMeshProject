import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { VERIFIER_ABI, VERIFIER_CONTRACT_ADDRESS } from '../contracts/Groth16Verifier';
import { validateProof, generateProof, formatProof } from '../utils/proofUtils';

const ZKPVerifier = () => {
  const [proofData, setProofData] = useState({
    pA: ['0', '0'],
    pB: [['0', '0'], ['0', '0']],
    pC: ['0', '0'],
    pubSignals: ['0', '0', '0']
  });
  const [verificationResult, setVerificationResult] = useState(null);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);
  const [isGeneratingProof, setIsGeneratingProof] = useState(false);
  const [networkInfo, setNetworkInfo] = useState(null);
  const [isContractAvailable, setIsContractAvailable] = useState(false);
  const [account, setAccount] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    checkNetwork();
    checkMetaMaskConnection();
    
    if (window.ethereum) {
      window.ethereum.on('chainChanged', () => {
        checkNetwork();
        checkMetaMaskConnection();
      });
      window.ethereum.on('accountsChanged', checkMetaMaskConnection);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('chainChanged', checkNetwork);
        window.ethereum.removeListener('accountsChanged', checkMetaMaskConnection);
      }
    };
  }, []);

  const checkMetaMaskConnection = async () => {
    try {
      if (!window.ethereum) {
        throw new Error('Please install MetaMask');
      }

      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      setAccount(accounts[0] || null);
    } catch (err) {
      console.error('Failed to check MetaMask connection:', err);
      setAccount(null);
    }
  };

  const connectMetaMask = async () => {
    try {
      setIsConnecting(true);
      setError('');

      if (!window.ethereum) {
        throw new Error('Please install MetaMask');
      }

      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);

      // Check if we're on the correct network (Hardhat local network)
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();
      
      if (network.chainId !== 31337) {
        // Try to switch to Hardhat network
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x7A69' }], // 31337 in hex
          });
        } catch (switchError) {
          // If the network doesn't exist, add it
          if (switchError.code === 4902) {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: '0x7A69',
                chainName: 'Hardhat Local',
                nativeCurrency: {
                  name: 'ETH',
                  symbol: 'ETH',
                  decimals: 18
                },
                rpcUrls: ['http://127.0.0.1:8545'],
              }],
            });
          } else {
            throw switchError;
          }
        }
      }

      await checkNetwork();
    } catch (err) {
      setError(err.message);
      console.error('Failed to connect to MetaMask:', err);
    } finally {
      setIsConnecting(false);
    }
  };

  const checkNetwork = async () => {
    try {
      if (!window.ethereum) {
        throw new Error('Please install MetaMask');
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();
      setNetworkInfo(network);

      // Check if contract exists at the specified address
      const code = await provider.getCode(VERIFIER_CONTRACT_ADDRESS);
      const isAvailable = code !== '0x';
      setIsContractAvailable(isAvailable);

      if (!isAvailable) {
        setError(`No contract found at ${VERIFIER_CONTRACT_ADDRESS}. Please deploy the contract first.`);
      } else {
        setError('');
      }
    } catch (err) {
      console.error('Network check failed:', err);
      setError('Failed to check network: ' + err.message);
      setIsContractAvailable(false);
    }
  };

  const handleInputChange = (section, index, value, subIndex = null) => {
    setProofData(prev => {
      const newData = { ...prev };
      if (subIndex !== null) {
        newData[section][index][subIndex] = value;
      } else {
        newData[section][index] = value;
      }
      return newData;
    });
    setValidationErrors([]);
  };

  const handleGenerateProof = async () => {
    setIsGeneratingProof(true);
    setError('');
    try {
      // This is where you'll implement your specific proof generation
      // For example, if proving knowledge of factors:
      const input = {
        // Add your circuit-specific inputs here
      };
      const proof = await generateProof(input);
      setProofData(proof);
    } catch (err) {
      setError('Failed to generate proof: ' + err.message);
    } finally {
      setIsGeneratingProof(false);
    }
  };

  const verifyProof = async () => {
    try {
      setError('');
      const validation = validateProof(proofData);
      if (!validation.isValid) {
        setValidationErrors(validation.errors);
        return;
      }

      if (!window.ethereum) {
        throw new Error('Please install MetaMask');
      }

      if (!account) {
        throw new Error('Please connect your wallet first');
      }

      if (!isContractAvailable) {
        throw new Error(`Contract not found at ${VERIFIER_CONTRACT_ADDRESS}. Please deploy the contract first.`);
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      
      const contract = new ethers.Contract(
        VERIFIER_CONTRACT_ADDRESS,
        VERIFIER_ABI,
        signer
      );

      // Convert all values to BigNumber
      const formattedProof = {
        pA: proofData.pA.map(x => ethers.BigNumber.from(x.toString())),
        pB: proofData.pB.map(arr => arr.map(x => ethers.BigNumber.from(x.toString()))),
        pC: proofData.pC.map(x => ethers.BigNumber.from(x.toString())),
        pubSignals: proofData.pubSignals.map(x => ethers.BigNumber.from(x.toString()))
      };

      console.log('Sending proof for verification:', formattedProof);

      const result = await contract.verifyProof(
        formattedProof.pA,
        formattedProof.pB,
        formattedProof.pC,
        formattedProof.pubSignals,
        { gasLimit: 3000000 } // Add gas limit to prevent transaction failures
      );

      setVerificationResult(result);
      setValidationErrors([]);
    } catch (err) {
      console.error('Verification error:', err);
      setError(err.message || 'Failed to verify proof. Check console for details.');
      setVerificationResult(null);
    }
  };

  const handleLoadExample = () => {
    setProofData({
      pA: [
        '20491192805390485299153009773594534940189261866228447918068658471970481763042',
        '9383485363053290200918347156157836566562967994039712273449902621266178545958'
      ],
      pB: [
        [
          '4252822878758300859123897981450591353533073413197771768651442665752259397132',
          '6375614351688725206403948262868962793625744043794305715222011528459656738731'
        ],
        [
          '21847035105528745403288232691147584728191162732299865338377159692350059136679',
          '10505242626370262277552901082094356697409835680220590971873171140371331206856'
        ]
      ],
      pC: [
        '11559732032986387107991004021392285783925812861821192530917403151452391805634',
        '4082367875863433681332203403145435568316851327593401208105741076214120093531'
      ],
      pubSignals: [
        '1451193133033985622675974395212898695894420218423981349444775983416323297705',
        '11710891714820527465038561149778207792450883245735479001691217845723259640042',
        '2276565553259163190059968305908537035580282621107837127696787732925205140758'
      ]
    });
    setValidationErrors([]);
  };

  return (
    <div className="container">
      <h1>ZKP Verifier</h1>

      <div className="wallet-section">
        {!account ? (
          <button 
            onClick={connectMetaMask} 
            disabled={isConnecting}
            className="connect-button"
          >
            {isConnecting ? 'Connecting...' : 'Connect Wallet'}
          </button>
        ) : (
          <div className="account-info">
            Connected: {account.substring(0, 6)}...{account.substring(38)}
          </div>
        )}
      </div>

      {networkInfo && (
        <div className={`network-info ${isContractAvailable ? 'success' : 'warning'}`}>
          <p>Connected to network: {networkInfo.name} (chainId: {networkInfo.chainId})</p>
          <p>Contract status: {isContractAvailable ? 'Available' : 'Not found'}</p>
        </div>
      )}
      
      <div className="button-group">
        <button onClick={handleLoadExample}>Load Example Proof</button>
      </div>

      <div className="proof-section">
        <h3>Proof Point A (pA)</h3>
        {proofData.pA.map((value, index) => (
          <input
            key={`pA-${index}`}
            type="text"
            value={value}
            onChange={(e) => handleInputChange('pA', index, e.target.value)}
            placeholder={`pA[${index}]`}
          />
        ))}
      </div>

      <div className="proof-section">
        <h3>Proof Point B (pB)</h3>
        {proofData.pB.map((arr, i) => (
          <div key={`pB-${i}`}>
            {arr.map((value, j) => (
              <input
                key={`pB-${i}-${j}`}
                type="text"
                value={value}
                onChange={(e) => handleInputChange('pB', i, e.target.value, j)}
                placeholder={`pB[${i}][${j}]`}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="proof-section">
        <h3>Proof Point C (pC)</h3>
        {proofData.pC.map((value, index) => (
          <input
            key={`pC-${index}`}
            type="text"
            value={value}
            onChange={(e) => handleInputChange('pC', index, e.target.value)}
            placeholder={`pC[${index}]`}
          />
        ))}
      </div>

      <div className="proof-section">
        <h3>Public Signals</h3>
        {proofData.pubSignals.map((value, index) => (
          <input
            key={`pubSignals-${index}`}
            type="text"
            value={value}
            onChange={(e) => handleInputChange('pubSignals', index, e.target.value)}
            placeholder={`pubSignals[${index}]`}
          />
        ))}
      </div>

      {validationErrors.length > 0 && (
        <div className="validation-errors">
          <h4>Validation Errors:</h4>
          <ul>
            {validationErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <button 
        onClick={verifyProof} 
        className="verify-button"
        disabled={!account || !isContractAvailable || validationErrors.length > 0}
      >
        {!account ? 'Connect Wallet to Verify' : 'Verify Proof'}
      </button>

      {error && <div className="error">{error}</div>}
      {verificationResult !== null && (
        <div className={`result ${verificationResult ? 'success' : 'failure'}`}>
          Verification Result: {verificationResult ? 'Valid' : 'Invalid'}
        </div>
      )}
    </div>
  );
};

export default ZKPVerifier; 