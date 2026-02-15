#!/usr/bin/env node
/**
 * Shuffle multiple-choice options so the correct answer is not always option 0.
 *
 * Assumption: current correctIndex is correct for each question (right now all 0).
 * We permute options deterministically per question id, and update correctIndex.
 */
const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..');
const questionsPath = path.join(repoRoot, 'miniprogram', 'data', 'questions.js');
const reportPath = path.join(repoRoot, 'docs', 'SHUFFLE_OPTIONS_REPORT.md');

const questions = require(questionsPath);

function hash32(str) {
  // FNV-1a 32-bit
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffledIndices(n, rnd) {
  const arr = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

let changed = 0;
const rows = [];

for (const q of questions) {
  if (q.type !== 'multiple_choice') continue;
  if (!Array.isArray(q.options) || q.options.length < 2) continue;
  const n = q.options.length;
  const seed = hash32(q.id);
  const rnd = mulberry32(seed);
  const perm = shuffledIndices(n, rnd);

  // Ensure we actually move the correct option away from 0 when possible.
  // If perm keeps correctIndex at same position, do a simple rotate by 1.
  const oldCorrect = q.correctIndex;
  let newPerm = perm;
  const newCorrectPos = newPerm.indexOf(oldCorrect);
  if (n > 1 && newCorrectPos === 0) {
    newPerm = newPerm.slice(1).concat(newPerm[0]);
  }

  const newOptions = newPerm.map(i => q.options[i]);
  const newCorrectIndex = newPerm.indexOf(oldCorrect);

  // Apply
  q.options = newOptions;
  q.correctIndex = newCorrectIndex;
  changed++;

  rows.push({
    id: q.id,
    leetcodeSlug: q.leetcodeSlug,
    oldCorrectIndex: oldCorrect,
    newCorrectIndex,
  });
}

// Write report
fs.mkdirSync(path.dirname(reportPath), { recursive: true });
const dist = rows.reduce((acc, r) => {
  acc[r.newCorrectIndex] = (acc[r.newCorrectIndex] || 0) + 1;
  return acc;
}, {});

const lines = [];
lines.push('# Shuffle MCQ Options Report');
lines.push('');
lines.push(`Total questions processed: ${changed}`);
lines.push('');
lines.push('New correctIndex distribution:');
lines.push('');
for (const k of Object.keys(dist).sort((a,b)=>Number(a)-Number(b))) {
  lines.push(`- ${k}: ${dist[k]}`);
}
lines.push('');
lines.push('| id | leetcodeSlug | oldCorrectIndex | newCorrectIndex |');
lines.push('|---|---|---:|---:|');
for (const r of rows) {
  lines.push(`| ${r.id} | ${r.leetcodeSlug} | ${r.oldCorrectIndex} | ${r.newCorrectIndex} |`);
}
fs.writeFileSync(reportPath, lines.join('\n'));

// Write back questions.js with minimal changes by doing a targeted replacement
// Simpler: rewrite whole file as JSON-ish would be huge diff. Instead, we patch lines in-place.
const original = fs.readFileSync(questionsPath, 'utf8').split(/\n/);
let currentId = null;
let inOptions = false;
let optionsLines = [];
let optionsStart = -1;

function emitOptionsFor(id) {
  const q = questions.find(x => x.id === id);
  if (!q) return;
  // find correctIndex line already handled elsewhere
}

// Build maps for quick lookup
const qMap = new Map(questions.map(q => [q.id, q]));

for (let i = 0; i < original.length; i++) {
  const line = original[i];
  const idMatch = line.match(/^\s*\"id\"\s*:\s*\"(q\d{3})\"\s*,\s*$/);
  if (idMatch) {
    currentId = idMatch[1];
    continue;
  }
  if (!currentId) continue;
  const q = qMap.get(currentId);
  if (!q) continue;

  // Replace correctIndex line
  const ciMatch = line.match(/^(\s*\"correctIndex\"\s*:\s*)(\d+)(\s*,\s*)$/);
  if (ciMatch) {
    original[i] = `${ciMatch[1]}${q.correctIndex}${ciMatch[3]}`;
    continue;
  }

  // Replace options block (array) exactly
  if (line.match(/^\s*\"options\"\s*:\s*\[\s*$/)) {
    inOptions = true;
    optionsStart = i;
    optionsLines = [line];
    continue;
  }
  if (inOptions) {
    optionsLines.push(line);
    if (line.match(/^\s*\]\s*,\s*$/)) {
      // replace block
      const indent = optionsLines[0].match(/^(\s*)/)[1];
      const itemIndent = indent + '  ';
      const newBlock = [];
      newBlock.push(`${indent}"options": [`);
      for (let k = 0; k < q.options.length; k++) {
        const opt = q.options[k].replace(/\\/g, '\\\\').replace(/\"/g, '\\"');
        const comma = k === q.options.length - 1 ? '' : ',';
        newBlock.push(`${itemIndent}"${opt}"${comma}`);
      }
      newBlock.push(`${indent}],`);

      // splice
      original.splice(optionsStart, optionsLines.length, ...newBlock);
      // adjust i to continue after inserted block
      i = optionsStart + newBlock.length - 1;

      inOptions = false;
      optionsLines = [];
      optionsStart = -1;
    }
  }
}

fs.writeFileSync(questionsPath, original.join('\n'));
console.log('Shuffled options and updated correctIndex for', changed, 'questions');
console.log('Report written to', reportPath);
