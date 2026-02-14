const HISTORY_KEY = 'leetcode_duolingo_history';

const defaultHistory = {
  records: [],
  wrongQuestions: [],
  stats: {
    totalAnswered: 0,
    correctCount: 0,
    wrongCount: 0
  }
};

function safeLoad() {
  try {
    return wx.getStorageSync(HISTORY_KEY) || null;
  } catch (e) {
    return null;
  }
}

function saveHistory(data) {
  try {
    wx.setStorageSync(HISTORY_KEY, data);
  } catch (e) {
    console.error('Failed to save history', e);
  }
}

function getDefaultHistory() {
  return JSON.parse(JSON.stringify(defaultHistory));
}

function normalizeHistory(data) {
  const base = getDefaultHistory();
  const source = data && typeof data === 'object' ? data : {};

  const records = Array.isArray(source.records) ? source.records : base.records;
  const wrongQuestions = Array.isArray(source.wrongQuestions) ? source.wrongQuestions : base.wrongQuestions;
  const stats = source.stats && typeof source.stats === 'object' ? source.stats : {};

  return {
    records,
    wrongQuestions,
    stats: {
      totalAnswered: Number(stats.totalAnswered) || 0,
      correctCount: Number(stats.correctCount) || 0,
      wrongCount: Number(stats.wrongCount) || 0
    }
  };
}

function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function dateFromTimestamp(timestamp) {
  if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) return null;
  const d = new Date(timestamp);
  if (Number.isNaN(d.getTime())) return null;
  return d;
}

/**
 * 获取历史记录（可限制返回 records 条数；stats 保持全量）
 */
function getHistory(limit = null) {
  const data = normalizeHistory(safeLoad());
  if (typeof limit === 'number') {
    return {
      ...data,
      records: data.records.slice(0, limit)
    };
  }
  return data;
}

/**
 * 保存答题记录
 */
function saveQuestionRecord(questionId, topicId, isCorrect, selectedIndex, answerTime) {
  if (questionId === null || questionId === undefined) return null;

  const history = getHistory();

  const record = {
    questionId,
    topicId,
    isCorrect,
    selectedIndex,
    answerTime,
    timestamp: Date.now()
  };

  history.records.unshift(record);
  history.stats.totalAnswered += 1;

  if (isCorrect) {
    history.stats.correctCount += 1;
  } else {
    history.stats.wrongCount += 1;
    if (!history.wrongQuestions.includes(questionId)) {
      history.wrongQuestions.push(questionId);
    }
  }

  // 只保留最近 200 条
  if (history.records.length > 200) history.records = history.records.slice(0, 200);

  cleanUpWrongQuestions(history);
  saveHistory(history);
  return record;
}

/**
 * 清理错题本：同一题答对 >=3 次则移除
 */
function cleanUpWrongQuestions(history) {
  const remove = [];
  for (const qId of history.wrongQuestions) {
    const correctTimes = history.records.filter(r => r.questionId === qId && r.isCorrect).length;
    if (correctTimes >= 3) remove.push(qId);
  }
  if (remove.length === 0) return;
  history.wrongQuestions = history.wrongQuestions.filter(id => !remove.includes(id));
}

function getWrongQuestions() {
  const history = getHistory();
  const questions = require('../data/questions');
  return history.wrongQuestions
    .map(id => questions.find(q => q.id === id))
    .filter(Boolean);
}

function getTodayStats() {
  const history = getHistory();
  const today = formatDate(new Date());

  const todayRecords = history.records.filter(r => {
    const dt = dateFromTimestamp(r.timestamp);
    if (!dt) return false;
    const d = formatDate(dt);
    return d === today;
  });

  const correct = todayRecords.filter(r => r.isCorrect).length;
  const answered = todayRecords.length;

  return {
    answered,
    correct,
    wrong: answered - correct,
    accuracy: answered > 0 ? Math.round((correct / answered) * 100) : 0
  };
}

function getWeekStats(days = 7) {
  if (days <= 0) return {};

  const history = getHistory();
  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);
  startDate.setDate(startDate.getDate() - (days - 1));
  const start = startDate.getTime();
  const records = history.records.filter(r => r.timestamp >= start);

  const dailyStats = {};
  for (const r of records) {
    const dt = dateFromTimestamp(r.timestamp);
    if (!dt) continue;
    const day = formatDate(dt);
    if (!dailyStats[day]) dailyStats[day] = { total: 0, correct: 0 };
    dailyStats[day].total += 1;
    if (r.isCorrect) dailyStats[day].correct += 1;
  }
  return dailyStats;
}

function resetHistory() {
  try {
    wx.removeStorageSync(HISTORY_KEY);
  } catch (e) {
    console.error('Failed to reset history', e);
  }
}

module.exports = {
  saveQuestionRecord,
  getHistory,
  getWrongQuestions,
  getTodayStats,
  getWeekStats,
  resetHistory
};
