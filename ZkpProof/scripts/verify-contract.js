const hre = require("hardhat");

async function main() {
  // Use the newly deployed contract address
  const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  
  console.log("Verifying contract at address:", contractAddress);

  try {
    // Get the provider
    const provider = await hre.ethers.provider;
    
    // Get the contract code
    const code = await provider.getCode(contractAddress);
    console.log("\nContract code length:", code.length);
    console.log("Contract exists:", code !== "0x");

    if (code !== "0x") {
      // Try to create contract instance
      const Verifier = await hre.ethers.getContractFactory("Groth16Verifier");
      const verifier = await Verifier.attach(contractAddress);
      
      console.log("\nContract instance created successfully");
      console.log("Contract address:", await verifier.getAddress());

      // Get all accounts
      const accounts = await hre.ethers.getSigners();
      console.log("\nAvailable accounts:", accounts.map(a => a.address));

      // Get network info
      const network = await provider.getNetwork();
      console.log("\nNetwork info:", {
        name: network.name,
        chainId: Number(network.chainId)
      });

      // Try to verify a proof
      console.log("\nTrying to verify an example proof...");
      const exampleProof = {
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
      };

      const result = await verifier.verifyProof(
        exampleProof.pA,
        exampleProof.pB,
        exampleProof.pC,
        exampleProof.pubSignals,
        { gasLimit: 3000000 }
      );

      console.log("Proof verification result:", result);
    }
  } catch (error) {
    console.error("Error verifying contract:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 