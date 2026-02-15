#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const questions = require(path.join(__dirname, '..', 'miniprogram', 'data', 'questions.js'));

const rows = questions.map(q => ({
  id: q.id,
  leetcodeSlug: q.leetcodeSlug,
  track: q.track,
  question: q.question,
  description: q.description,
}));

const outPath = path.join(__dirname, '..', 'docs', 'descriptions_raw.json');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify({ count: rows.length, rows }, null, 2));
console.log('Wrote', outPath, 'rows=', rows.length);
