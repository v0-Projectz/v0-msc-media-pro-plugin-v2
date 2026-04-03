import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const TEMP_DIR = '/tmp/v0-msc-media-pro-plugin';
const CURRENT_DIR = '/vercel/share/v0-project';

try {
  // Remove temp dir if it exists
  if (fs.existsSync(TEMP_DIR)) {
    execSync(`rm -rf "${TEMP_DIR}"`);
  }

  console.log('Cloning original repository...');
  execSync(`git clone https://github.com/jonbeatz/v0-msc-media-pro-plugin.git "${TEMP_DIR}"`);

  console.log('Copying files from original repo...');
  
  // Get all files from temp directory
  const copyCommand = `cp -r "${TEMP_DIR}"/* "${CURRENT_DIR}/" 2>/dev/null || true`;
  execSync(copyCommand);

  // Copy hidden files
  const copyHiddenCommand = `cp -r "${TEMP_DIR}"/.[!.]* "${CURRENT_DIR}/" 2>/dev/null || true`;
  execSync(copyHiddenCommand);

  // Remove .git to avoid conflicts
  if (fs.existsSync(path.join(CURRENT_DIR, '.git'))) {
    execSync(`rm -rf "${CURRENT_DIR}/.git"`);
  }

  // Clean up temp directory
  execSync(`rm -rf "${TEMP_DIR}"`);

  console.log('✓ Files merged successfully!');
  console.log('✓ All files from v0-msc-media-pro-plugin have been copied to this project.');
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
