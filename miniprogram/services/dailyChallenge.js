const storage = require('./storage');
const questions = require('../data/questions');

const DAILY_CHALLENGE_KEY = 'leetcode_duolingo_daily_challenge';

function getTodayStr() {
  return formatDate(new Date());
}

/**
 * 获取每日挑战数据（同一天固定一组题）
 */
function getDailyChallenge() {
  const today = getTodayStr();
  const seed = dateToSeed(today);

  // 目前题库没有显式 difficulty 字段：用稳定 seed 做抽样即可。
  const pool = [...questions];
  const shuffled = seededShuffle(pool, seed);
  const picked = shuffled.slice(0, Math.min(5, shuffled.length));

  return {
    date: today,
    questions: picked,
    totalXP: picked.length * 10,
    bonusXP: 50
  };
}

/**
 * 今日是否已完成
 */
function checkDailyStatus() {
  const today = getTodayStr();
  const data = getDailyData();
  return {
    isCompleted: !!(data && data.date === today && data.completed),
    completedDate: data ? data.date : null
  };
}

/**
 * 完成每日挑战：写入 daily 记录 + 更新用户 xp/streak
 */
function completeDailyChallenge(results) {
  const today = getTodayStr();
  const status = checkDailyStatus();
  if (status.isCompleted) return { error: 'Already completed today' };

  const challenge = getDailyChallenge();
  const earnedXP = results.correctCount * 10;
  const bonusXP = results.accuracy >= 80 ? challenge.bonusXP : 0;
  const totalEarned = earnedXP + bonusXP;

  const userData = storage.getUserData() || storage.initUserData();
  const newStreak = calcNewStreak(userData.streak || 0, userData.lastPracticeDate, today);

  storage.updateUserData({
    xp: (userData.xp || 0) + totalEarned,
    streak: newStreak,
    lastPracticeDate: today
  });

  const dailyRecord = {
    date: today,
    completed: true,
    correctCount: results.correctCount,
    totalCount: results.totalCount,
    accuracy: results.accuracy,
    earnedXP: totalEarned,
    bonusXP,
    streakAfter: newStreak
  };
  saveDailyData(dailyRecord);

  return {
    success: true,
    earnedXP,
    bonusXP,
    totalEarned,
    streak: newStreak,
    record: dailyRecord
  };
}

function calcNewStreak(currentStreak, lastPracticeDate, today) {
  if (!lastPracticeDate) return 1;
  if (lastPracticeDate === today) return currentStreak || 1;

  const yesterday = getPrevDateStr(today);
  if (lastPracticeDate === yesterday) return (currentStreak || 0) + 1;

  return 1;
}

function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function getPrevDateStr(dateStr) {
  const parts = dateStr.split('-').map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) {
    const yesterday = new Date(Date.now() - 86400000);
    return formatDate(yesterday);
  }
  const date = new Date(parts[0], parts[1] - 1, parts[2]);
  date.setDate(date.getDate() - 1);
  return formatDate(date);
}

function getDailyData() {
  try {
    return wx.getStorageSync(DAILY_CHALLENGE_KEY) || null;
  } catch (e) {
    return null;
  }
}

function saveDailyData(data) {
  try {
    wx.setStorageSync(DAILY_CHALLENGE_KEY, data);
  } catch (e) {
    console.error('Failed to save daily data', e);
  }
}

function dateToSeed(dateStr) {
  return dateStr.split('-').reduce((acc, v) => (acc * 131 + Number(v)) >>> 0, 7);
}

function seededShuffle(arr, seed) {
  const res = [...arr];
  let s = seed >>> 0;
  for (let i = res.length - 1; i > 0; i--) {
    // xorshift32
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    const j = Math.abs(s) % (i + 1);
    [res[i], res[j]] = [res[j], res[i]];
  }
  return res;
}

module.exports = {
  getDailyChallenge,
  checkDailyStatus,
  completeDailyChallenge,
  getDailyData
};
