#!/usr/bin/env node
/**
 * Recover playriq project files from Cursor Local History.
 *
 * Cursor stores file history in:
 *   ~/Library/Application Support/Cursor/User/History/<hash>/
 * Each folder has entries.json (resource path + entry ids) and the backup files.
 *
 * Run from repo root: node scripts/recover-playriq-from-history.js
 * Output: ../playriq-recovered/
 */

import fs from 'fs';
import path from 'path';
const historyRoot = path.join(
  process.env.HOME,
  'Library/Application Support/Cursor/User/History'
);
const prefix = 'file:///Users/joelhickey/Desktop/';
const playriqPrefix = 'file:///Users/joelhickey/Desktop/playriq';
const outRoot = path.join(process.env.HOME, 'Desktop', 'playriq-recovered');

if (!fs.existsSync(historyRoot)) {
  console.error('Cursor History folder not found:', historyRoot);
  process.exit(1);
}

const dirs = fs.readdirSync(historyRoot);
let recovered = 0;
let skipped = 0;

for (const dir of dirs) {
  const entriesPath = path.join(historyRoot, dir, 'entries.json');
  if (!fs.existsSync(entriesPath)) continue;

  let data;
  try {
    data = JSON.parse(fs.readFileSync(entriesPath, 'utf8'));
  } catch (_) {
    continue;
  }

  const resource = data.resource;
  if (!resource || !resource.startsWith(playriqPrefix)) continue;

  const entries = data.entries;
  if (!Array.isArray(entries) || entries.length === 0) continue;

  // Latest backup = last entry
  const latest = entries[entries.length - 1];
  const entryId = latest.id;
  const backupPath = path.join(historyRoot, dir, entryId);
  if (!fs.existsSync(backupPath)) {
    skipped++;
    continue;
  }

  // Map to path under playriq (strip file URL and Desktop prefix)
  const relativePath = resource
    .replace(/^file:\/\//, '')
    .replace(/^\/Users\/joelhickey\/Desktop\//, '');
  if (!relativePath.startsWith('playriq')) continue;

  const outPath = path.join(outRoot, relativePath.replace(/^playriq\/?/, '') || '.');
  const outDir = path.dirname(outPath);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  try {
    fs.copyFileSync(backupPath, outPath);
    console.log('OK', relativePath);
    recovered++;
  } catch (e) {
    console.error('FAIL', relativePath, e.message);
  }
}

console.log('\nDone. Recovered', recovered, 'files to', outRoot);
if (skipped) console.log('Skipped (missing backup file):', skipped);
