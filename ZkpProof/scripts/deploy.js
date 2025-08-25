const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("Deploying Groth16Verifier contract...");

  const Verifier = await hre.ethers.getContractFactory("Groth16Verifier");
  const verifier = await Verifier.deploy();

  console.log(`Groth16Verifier deploying to: ${verifier.target}`);
  await verifier.waitForDeployment();
  const deployedAddress = await verifier.getAddress();
  
  console.log(`Groth16Verifier deployed to: ${deployedAddress}`);
  
  // Save the contract address to a file that our frontend can read
  const contractsDir = path.join(__dirname, "..", "frontend", "src", "contracts");
  
  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir, { recursive: true });
  }

  const artifact = await hre.artifacts.readArtifact("Groth16Verifier");
  
  // Update the contract address in the frontend
  const contractConfig = `
export const VERIFIER_CONTRACT_ADDRESS = "${deployedAddress}";

export const VERIFIER_ABI = ${JSON.stringify(artifact.abi, null, 2)};
`;

  const configPath = path.join(contractsDir, "Groth16Verifier.js");
  fs.writeFileSync(configPath, contractConfig);

  console.log("Contract address and ABI saved to:", configPath);
  console.log("Contract address:", deployedAddress);
  
  // Verify the saved file
  const savedContent = fs.readFileSync(configPath, 'utf8');
  console.log("\nVerifying saved contract config:");
  console.log("Contract address in file:", savedContent.match(/VERIFIER_CONTRACT_ADDRESS = "(.*?)"/)[1]);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 