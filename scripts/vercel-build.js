#!/usr/bin/env node
/**
 * Single entry point for Vercel: portfolio project runs vite build,
 * aipreso project runs build:ai-preso. Preso output is in ai-preso/dist; we copy to dist so Vercel finds it when root vercel.json says outputDirectory: "dist".
 */
import { execSync } from 'child_process';
import { cpSync } from 'fs';

const isAipreso =
  process.env.BUILD_PRESO === 'true' ||
  process.env.VERCEL_PROJECT_NAME === 'aipreso';
const command = isAipreso ? 'npm run build:ai-preso' : 'npx vite build';
console.log('[vercel-build] Building:', isAipreso ? 'PRESO (ai-preso)' : 'PORTFOLIO');
execSync(command, { stdio: 'inherit' });

if (isAipreso) {
  cpSync('ai-preso/dist', 'dist', { recursive: true });
  console.log('[vercel-build] Copied ai-preso/dist → dist for Vercel');
}
