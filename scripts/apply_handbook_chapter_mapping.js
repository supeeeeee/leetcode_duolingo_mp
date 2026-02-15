/*
  Apply handbook chapter mapping based on LeetCode习题册.md.

  - Reads miniprogram/data/questions.js (module.exports = Array)
  - Reads docs/slug_to_leetcode_id.json (slug -> questionId)
  - Reads docs/handbook_question_map.json (questionId -> chapter/section/order)

  Output:
  - Updates each question:
    - adds handbookRef when available
    - rewrites topicId to handbook chapter topic id (when available)
    - otherwise maps legacy topicId -> closest handbook chapter
*/

const fs = require('fs');
const path = require('path');

const questionsPath = path.join(__dirname, '..', 'miniprogram', 'data', 'questions.js');
const slugToIdPath = path.join(__dirname, '..', 'docs', 'slug_to_leetcode_id.json');
const handbookMapPath = path.join(__dirname, '..', 'docs', 'handbook_question_map.json');

const questions = require(questionsPath);
const slugToId = JSON.parse(fs.readFileSync(slugToIdPath, 'utf8'));
const handbookMap = JSON.parse(fs.readFileSync(handbookMapPath, 'utf8'));

// Handbook chapter -> topicId
const chapterToTopicId = {
  '第一章：双指针技巧': 'ch01_two_pointers',
  '第二章：滑动窗口算法': 'ch02_sliding_window',
  '第三章：二分搜索': 'ch03_binary_search',
  '第四章：前缀和与差分数组': 'ch04_prefix_diff',
  '第五章：回溯算法': 'ch05_backtracking',
  '第六章：BFS算法': 'ch06_bfs',
  '第七章：动态规划': 'ch07_dynamic_programming',
  '第八章：二叉树算法': 'ch08_trees',
  '第九章：图算法': 'ch09_graphs',
  '第十章：单调栈与单调队列': 'ch10_monotonic',
  '第十一章：位运算技巧': 'ch11_bit',
  '第十二章：经典面试题': 'ch12_interview'
};

// Fallback: legacy topics -> handbook chapters (best-effort)
const legacyToChapterTopic = {
  arrays: 'ch04_prefix_diff',
  hashmaps: 'ch04_prefix_diff',
  two_pointers: 'ch01_two_pointers',
  sliding_window: 'ch02_sliding_window',
  binary_search: 'ch03_binary_search',
  backtracking: 'ch05_backtracking',
  dynamic_programming: 'ch07_dynamic_programming',
  trees: 'ch08_trees',
  graphs: 'ch09_graphs',
  stack_queue: 'ch10_monotonic',
  heap: 'ch12_interview',
  linked_list: 'ch01_two_pointers'
};

let mapped = 0;
let inferred = 0;
let missingSlug = 0;

for (const q of questions) {
  const slug = q.leetcodeSlug;
  const qid = slug ? slugToId[slug] : null;
  if (slug && !qid) missingSlug++;

  const ref = qid ? handbookMap[String(qid)] : null;

  if (ref && ref.chapter && chapterToTopicId[ref.chapter]) {
    q.handbookRef = {
      leetcodeId: qid,
      chapter: ref.chapter,
      section: ref.section,
      orderInSection: ref.orderInSection,
      mdLine: ref.mdLine
    };
    q.topicId = chapterToTopicId[ref.chapter];
    mapped++;
  } else {
    // best-effort: infer chapter topic from legacy topic
    const fallback = legacyToChapterTopic[q.topicId];
    if (fallback) {
      q.topicId = fallback;
      inferred++;
    }
  }
}

// Write back with stable formatting
const out = 'module.exports = ' + JSON.stringify(questions, null, 2) + ';;\n';
fs.writeFileSync(questionsPath, out, 'utf8');

console.log(JSON.stringify({ total: questions.length, mapped, inferred, missingSlug }, null, 2));
