const questions = require('../data/questions');
const history = require('./history');

// Spaced Repetition System (MVP)
//
// B方案：以习题册列出的题为“核心主线”（track=core），其余为扩展（track=extra）。
// 选题策略：
// - 进入某个章节(topicId)时：优先抽取“未答对过”的核心题；核心做完后再抽扩展。
// - 全局复习时：优先错题（wrongQuestions），再混合核心/扩展。

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

function getQuestionOrderMap() {
  const order = new Map();
  questions.forEach((q, idx) => {
    order.set(q.id, idx);
  });
  return order;
}

function getIdTieBreak(id) {
  const text = String(id || '');
  const matched = text.match(/\d+/);
  if (!matched) return Number.MAX_SAFE_INTEGER;
  return Number(matched[0]);
}

function stableSortWithTieBreak(list, orderMap) {
  return list
    .slice()
    .sort((a, b) => {
      const orderA = orderMap.has(a.id) ? orderMap.get(a.id) : Number.MAX_SAFE_INTEGER;
      const orderB = orderMap.has(b.id) ? orderMap.get(b.id) : Number.MAX_SAFE_INTEGER;
      if (orderA !== orderB) return orderA - orderB;
      const idA = getIdTieBreak(a.id);
      const idB = getIdTieBreak(b.id);
      if (idA !== idB) return idA - idB;
      return String(a.id || '').localeCompare(String(b.id || ''));
    });
}

function uniqueMergeGroups(groups) {
  const seen = new Set();
  const merged = [];
  groups.forEach(group => {
    group.forEach(item => {
      if (!item || seen.has(item.id)) return;
      seen.add(item.id);
      merged.push(item);
    });
  });
  return merged;
}

function getReviewSession(topicId = null, count = 5) {
  const correctSet = getAnsweredCorrectSet();
  const wrongSet = getWrongIdSet();
  const orderMap = getQuestionOrderMap();

  let pool = topicId ? questions.filter(q => q.topicId === topicId) : questions;
  if (pool.length === 0) return [];

  const corePool = pool.filter(q => q.track === 'core');
  const extraPool = pool.filter(q => q.track !== 'core');
  const wrongPool = pool.filter(q => wrongSet.has(q.id));
  const dueCore = corePool.filter(q => !correctSet.has(q.id));

  const topicOrdered = uniqueMergeGroups([
    stableSortWithTieBreak(dueCore, orderMap),
    stableSortWithTieBreak(wrongPool, orderMap),
    stableSortWithTieBreak(extraPool, orderMap),
    stableSortWithTieBreak(corePool, orderMap),
    stableSortWithTieBreak(pool, orderMap)
  ]);

  const globalOrdered = uniqueMergeGroups([
    stableSortWithTieBreak(wrongPool, orderMap),
    stableSortWithTieBreak(corePool, orderMap),
    stableSortWithTieBreak(extraPool, orderMap),
    stableSortWithTieBreak(pool, orderMap)
  ]);

  const selected = topicId ? topicOrdered : globalOrdered;
  return selected.slice(0, count);
}

module.exports = {
  getReviewSession
};
