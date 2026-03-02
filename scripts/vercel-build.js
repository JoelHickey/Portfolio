#!/usr/bin/env node
/**
 * Single entry point for Vercel: portfolio project runs vite build,
 * aipreso project runs build:ai-preso. Set aipreso Output Directory to "ai-preso/dist".
 */
const { execSync } = require('child_process');
const isAipreso = process.env.VERCEL_PROJECT_NAME === 'aipreso';
const command = isAipreso ? 'npm run build:ai-preso' : 'npx vite build';
execSync(command, { stdio: 'inherit' });
