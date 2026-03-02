#!/usr/bin/env node
/**
 * Single entry point for Vercel: portfolio project runs vite build,
 * aipreso project runs build:ai-preso. In aipreso project set env BUILD_PRESO=true and Output Directory "ai-preso/dist".
 */
const { execSync } = require('child_process');
const isAipreso =
  process.env.BUILD_PRESO === 'true' ||
  process.env.VERCEL_PROJECT_NAME === 'aipreso';
const command = isAipreso ? 'npm run build:ai-preso' : 'npx vite build';
execSync(command, { stdio: 'inherit' });
