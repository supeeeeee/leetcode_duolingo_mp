const questions = require('../data/questions');
const history = require('./history');
const storage = require('./storage');

function buildTopicStatsMap() {
  const map = {};
  questions.forEach(question => {
    const topicId = question.topicId;
    if (!topicId) return;
    if (!map[topicId]) {
      map[topicId] = {
        core: 0,
        extra: 0,
        total: 0
      };
    }
    const isCore = question.track === 'core';
    if (isCore) map[topicId].core += 1;
    else map[topicId].extra += 1;
    map[topicId].total += 1;
  });
  return map;
}

function getCorrectQuestionIdSet() {
  const h = history.getHistory();
  const set = new Set();
  (h.records || []).forEach(record => {
    if (record && record.isCorrect) set.add(record.questionId);
  });
  return set;
}

function buildQuestionMap() {
  const map = {};
  questions.forEach(question => {
    map[question.id] = question;
  });
  return map;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function getTopicDoneMap() {
  const totals = buildTopicStatsMap();
  const questionMap = buildQuestionMap();
  const correctSet = getCorrectQuestionIdSet();
  const userData = storage.getUserData() || storage.initUserData();
  const topicProgress = userData.topicProgress || {};

  const done = {};
  Object.keys(totals).forEach(topicId => {
    done[topicId] = {
      core: 0,
      extra: 0,
      total: 0
    };
  });

  correctSet.forEach(questionId => {
    const question = questionMap[questionId];
    if (!question || !question.topicId || !done[question.topicId]) return;
    if (question.track === 'core') done[question.topicId].core += 1;
    else done[question.topicId].extra += 1;
    done[question.topicId].total += 1;
  });

  Object.keys(totals).forEach(topicId => {
    const topicTotal = totals[topicId];
    const legacyCoreProgress = Number(topicProgress[topicId]) || 0;
    const boundedLegacyCore = clamp(legacyCoreProgress, 0, topicTotal.core);
    done[topicId].core = Math.max(done[topicId].core, boundedLegacyCore);
    done[topicId].extra = clamp(done[topicId].extra, 0, topicTotal.extra);
    done[topicId].total = clamp(done[topicId].core + done[topicId].extra, 0, topicTotal.total);
  });

  return done;
}

function getTopicProgressMap() {
  const totals = buildTopicStatsMap();
  const done = getTopicDoneMap();
  const progress = {};

  Object.keys(totals).forEach(topicId => {
    const topicTotal = totals[topicId];
    const topicDone = done[topicId] || { core: 0, extra: 0, total: 0 };
    progress[topicId] = {
      coreDone: topicDone.core,
      coreTotal: topicTotal.core,
      extraDone: topicDone.extra,
      extraTotal: topicTotal.extra,
      totalDone: topicDone.total,
      total: topicTotal.total,
      corePercent: topicTotal.core > 0 ? Math.round((topicDone.core / topicTotal.core) * 100) : 0,
      totalPercent: topicTotal.total > 0 ? Math.round((topicDone.total / topicTotal.total) * 100) : 0
    };
  });

  return progress;
}

module.exports = {
  getTopicProgressMap
};
