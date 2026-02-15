// scripts/check_integrity.js
const fs = require('fs');
const path = require('path');

const requiredFiles = [
  'project.config.json',
  'miniprogram/app.js',
  'miniprogram/app.json',
  'miniprogram/app.wxss',
  'miniprogram/pages/home/home.js',
  'miniprogram/pages/lesson/lesson.js',
  'miniprogram/data/questions.js'
];

console.log('Checking project integrity...');

let missing = 0;
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ Found: ${file}`);
  } else {
    console.error(`❌ Missing: ${file}`);
    missing++;
  }
});

if (missing === 0) {
  console.log('\nAll core files present. Ready for WeChat DevTools.');
  process.exit(0);
} else {
  console.error(`\nMissing ${missing} files.`);
  process.exit(1);
}
