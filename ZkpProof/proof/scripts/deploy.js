const hre = require("hardhat");

async function main() {
  console.log("Deploying IAge contract...");

  // Deploy ACE (Aztec Cryptography Engine)
  const ACE = await hre.ethers.getContractFactory("ACE");
  const ace = await ACE.deploy();
  await ace.deployed();
  console.log("ACE deployed to:", ace.address);

  // Deploy ERC20Mintable token
  const ERC20Mintable = await hre.ethers.getContractFactory("ERC20Mintable");
  const token = await ERC20Mintable.deploy();
  await token.deployed();
  console.log("ERC20Mintable token deployed to:", token.address);

  // Deploy IAge contract
  const IAge = await hre.ethers.getContractFactory("IAge");
  const scalingFactor = 1; // Adjust this value based on your needs
  const iage = await IAge.deploy(ace.address, token.address, scalingFactor);
  await iage.deployed();

  console.log("IAge deployed to:", iage.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 