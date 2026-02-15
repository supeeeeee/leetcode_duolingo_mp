const questions = require('../data/questions');
const history = require('./history');

// Spaced Repetition System (MVP)
//
// B方案：以习题册列出的题为“核心主线”（track=core），其余为扩展（track=extra）。
// 选题策略：
// - 进入某个章节(topicId)时：优先抽取“未答对过”的核心题；核心做完后再抽扩展。
// - 全局复习时：优先错题（wrongQuestions），再混合核心/扩展。

function shuffle(arr) {
  return arr.slice().sort(() => 0.5 - Math.random());
}

function getAnsweredCorrectSet() {
  const h = history.getHistory();
  const set = new Set();
  for (const r of (h.records || [])) {
    if (r && r.isCorrect) set.add(r.questionId);
  }
  return set;
}

function getWrongIdSet() {
  const h = history.getHistory();
  const set = new Set();
  for (const id of (h.wrongQuestions || [])) set.add(id);
  return set;
}

function getReviewSession(topicId = null, count = 5) {
  const correctSet = getAnsweredCorrectSet();
  const wrongSet = getWrongIdSet();

  let pool = topicId ? questions.filter(q => q.topicId === topicId) : questions;
  if (pool.length === 0) return [];

  // Always prioritize wrong questions within the pool
  const wrongPool = pool.filter(q => wrongSet.has(q.id));

  // Separate core vs extra (default extra)
  const corePool = pool.filter(q => q.track === 'core');
  const extraPool = pool.filter(q => q.track !== 'core');

  // "Due" core = core questions not answered correctly before
  const dueCore = corePool.filter(q => !correctSet.has(q.id));

  let selected = [];

  if (topicId) {
    // Topic session: core first, then extra
    selected = shuffle(dueCore.length > 0 ? dueCore : (extraPool.length > 0 ? extraPool : corePool));
  } else {
    // Global: wrong first, then mix remaining
    const rest = pool.filter(q => !wrongSet.has(q.id));
    selected = shuffle([...wrongPool, ...rest]);
  }

  return selected.slice(0, count);
}

module.exports = {
  getReviewSession
};