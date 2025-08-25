import { ethers } from 'ethers';

// Constants from the verifier contract
export const SCALAR_FIELD = ethers.BigNumber.from('21888242871839275222246405745257275088548364400416034343698204186575808495617');
export const BASE_FIELD = ethers.BigNumber.from('21888242871839275222246405745257275088696311157297823662689037894645226208583');

// Validate if a number is within the valid range
export const isValidFieldElement = (value) => {
  try {
    const bigNum = ethers.BigNumber.from(value);
    return bigNum.gte(0) && bigNum.lt(SCALAR_FIELD);
  } catch (error) {
    return false;
  }
};

// Format proof data from snarkjs output to contract input format
export const formatProof = (snarkProof) => {
  return {
    pA: snarkProof.pi_a.slice(0, 2),
    pB: [
      snarkProof.pi_b[0].slice(0, 2),
      snarkProof.pi_b[1].slice(0, 2)
    ],
    pC: snarkProof.pi_c.slice(0, 2),
    pubSignals: snarkProof.publicSignals
  };
};

// Example proof generation helper (replace with your actual circuit)
export const generateProof = async (input) => {
  // This is a placeholder. You'll need to implement this based on your specific circuit
  // Example using snarkjs:
  /*
  const { proof, publicSignals } = await snarkjs.groth16.fullProve(
    input,
    'path/to/your/circuit.wasm',
    'path/to/your/circuit_final.zkey'
  );
  return formatProof({ ...proof, publicSignals });
  */
  throw new Error('Proof generation not implemented');
};

// Validate entire proof structure
export const validateProof = (proofData) => {
  const errors = [];

  // Validate pA
  if (!Array.isArray(proofData.pA) || proofData.pA.length !== 2) {
    errors.push('Invalid pA format');
  } else {
    proofData.pA.forEach((value, index) => {
      if (!isValidFieldElement(value)) {
        errors.push(`Invalid pA[${index}] value`);
      }
    });
  }

  // Validate pB
  if (!Array.isArray(proofData.pB) || proofData.pB.length !== 2) {
    errors.push('Invalid pB format');
  } else {
    proofData.pB.forEach((arr, i) => {
      if (!Array.isArray(arr) || arr.length !== 2) {
        errors.push(`Invalid pB[${i}] format`);
      } else {
        arr.forEach((value, j) => {
          if (!isValidFieldElement(value)) {
            errors.push(`Invalid pB[${i}][${j}] value`);
          }
        });
      }
    });
  }

  // Validate pC
  if (!Array.isArray(proofData.pC) || proofData.pC.length !== 2) {
    errors.push('Invalid pC format');
  } else {
    proofData.pC.forEach((value, index) => {
      if (!isValidFieldElement(value)) {
        errors.push(`Invalid pC[${index}] value`);
      }
    });
  }

  // Validate pubSignals
  if (!Array.isArray(proofData.pubSignals) || proofData.pubSignals.length !== 3) {
    errors.push('Invalid pubSignals format');
  } else {
    proofData.pubSignals.forEach((value, index) => {
      if (!isValidFieldElement(value)) {
        errors.push(`Invalid pubSignals[${index}] value`);
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}; 