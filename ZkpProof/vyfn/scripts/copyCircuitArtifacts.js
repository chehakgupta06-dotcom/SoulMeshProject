const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '../../proof');
const targetDir = path.join(__dirname, '../public');

const files = [
  'multiplier.wasm',
  'multiplier_final.zkey',
  'verification_key.json'
];

// Create public directory if it doesn't exist
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir);
}

// Copy each file
files.forEach(file => {
  const sourcePath = path.join(sourceDir, file);
  const targetPath = path.join(targetDir, file);
  
  try {
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`Successfully copied ${file} to public folder`);
  } catch (error) {
    console.error(`Error copying ${file}:`, error);
  }
}); 