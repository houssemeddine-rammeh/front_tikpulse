import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const content = 'tiktok-developers-site-verification=35GQFkyiUcZ9ea0W9FjDqvHCdWvqLxRe';

const publicDir = path.join(__dirname, 'public');

// Write sig.txt
fs.writeFileSync(path.join(publicDir, 'sig.txt'), content, 'utf-8');
console.log('Created public/sig.txt');

// Create sig folder if missing
const sigFolder = path.join(publicDir, 'sig');
if (!fs.existsSync(sigFolder)) {
  fs.mkdirSync(sigFolder);
  console.log('Created public/sig/ folder');
}

// Write sig/index.html
fs.writeFileSync(path.join(sigFolder, 'index.html'), content, 'utf-8');
console.log('Created public/sig/index.html');
