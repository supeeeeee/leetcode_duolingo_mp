#!/usr/bin/env node
/**
 * Apply description fixes with minimal diff.
 *
 * Input: docs/description_fixes.json
 * Format: { "q001": "new description", ... }
 */
const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..');
const fixesPath = path.join(repoRoot, 'docs', 'description_fixes.json');
const questionsPath = path.join(repoRoot, 'miniprogram', 'data', 'questions.js');

if (!fs.existsSync(fixesPath)) {
  console.error('Missing', fixesPath);
  process.exit(1);
}

const fixes = JSON.parse(fs.readFileSync(fixesPath, 'utf8'));
const fixIds = new Set(Object.keys(fixes));

function escapeJsString(s) {
  // questions.js stores description as a single-line double-quoted JSON-style string
  return s
    .replace(/\\/g, '\\\\')
    .replace(/\"/g, '\\"')
    .replace(/\n/g, ' ')
    .replace(/\r/g, ' ');
}

const original = fs.readFileSync(questionsPath, 'utf8');
const lines = original.split(/\n/);

let currentId = null;
let changed = 0;
let touched = new Set();

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const idMatch = line.match(/^\s*\"id\"\s*:\s*\"(q\d{3})\"\s*,\s*$/);
  if (idMatch) {
    currentId = idMatch[1];
    continue;
  }
  if (!currentId || !fixIds.has(currentId)) continue;

  if (line.match(/^\s*\"description\"\s*:\s*\"/)) {
    const newDesc = escapeJsString(String(fixes[currentId] ?? ''));
    const newLine = line.replace(/^(\s*\"description\"\s*:\s*\")[^\"]*(\"\s*,\s*)$/, `$1${newDesc}$2`);
    if (newLine === line) {
      console.error('Failed to replace description line for', currentId, 'at line', i + 1);
      process.exit(2);
    }
    if (newLine !== line) {
      lines[i] = newLine;
      changed++;
      touched.add(currentId);
    }
    continue;
  }
}

const missing = [...fixIds].filter(id => !touched.has(id));
if (missing.length) {
  console.warn('Some fixes were not applied (id not found or no description line):', missing.slice(0, 30).join(', '), missing.length > 30 ? `... (+${missing.length-30})` : '');
}

fs.writeFileSync(questionsPath, lines.join('\n'));
console.log('Applied description fixes:', changed);
