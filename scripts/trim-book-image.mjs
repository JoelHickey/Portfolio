import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, '../public/images/AI talk');
const inputPath = path.join(dir, 'designforpeople.webp');
const outputPath = path.join(dir, 'designforpeople-trimmed.webp');

let image = sharp(inputPath);
const meta = await image.metadata();
console.log('Input dimensions:', meta.width, 'x', meta.height);

// Crop from right side only (px to remove from right)
const cropRight = 40;
const w = Math.max(1, meta.width - cropRight);
let pipeline = image.extract({ left: 0, top: 0, width: w, height: meta.height });

const out = await pipeline.toFormat('webp', { quality: 90 }).toFile(outputPath);
const trimmed = { width: out.width, height: out.height };

const fs = await import('fs');
const finalPath = path.join(dir, 'designforpeople.webp');
fs.renameSync(outputPath, finalPath);

console.log('Saved to', finalPath);
console.log('Output dimensions:', trimmed.width, 'x', trimmed.height);
