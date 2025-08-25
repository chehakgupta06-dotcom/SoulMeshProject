const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function main() {
  console.log('Resetting Hardhat Network...');

  // Clear cache and artifacts
  const foldersToDelete = ['cache', 'artifacts'];
  foldersToDelete.forEach(folder => {
    const folderPath = path.join(__dirname, '..', folder);
    if (fs.existsSync(folderPath)) {
      fs.rmSync(folderPath, { recursive: true, force: true });
      console.log(`Deleted ${folder} folder`);
    }
  });

  // Kill any running Hardhat instances
  try {
    if (process.platform === "win32") {
      execSync('taskkill /F /IM node.exe /T', { stdio: 'ignore' });
    } else {
      execSync('pkill -f "hardhat node"', { stdio: 'ignore' });
    }
  } catch (error) {
    // Ignore errors if no processes were found
  }

  console.log('Cleared previous Hardhat processes');

  // Compile contracts
  execSync('npx hardhat compile', { stdio: 'inherit' });
  console.log('Compiled contracts');

  // Start new Hardhat node
  console.log('\nStarting fresh Hardhat node...');
  console.log('\nIMPORTANT: To reset MetaMask state:');
  console.log('1. Open MetaMask');
  console.log('2. Go to Settings > Advanced');
  console.log('3. Click "Clear Activity Tab Data"');
  console.log('4. Go to Settings > Networks > Localhost 8545');
  console.log('5. Click "Reset Account" to clear transaction history');
  console.log('\nAfter performing these steps, your local network will be completely fresh!\n');

  // Start Hardhat node
  execSync('npx hardhat node', { stdio: 'inherit' });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 