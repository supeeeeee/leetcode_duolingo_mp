const storage = require('./storage.js');

function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function parseDateString(value) {
  if (!value) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const parts = value.split('-').map(Number);
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed;
}

function normalizeDateString(value) {
  const d = parseDateString(value);
  return d ? formatDate(d) : null;
}

function isYesterday(lastDateStr, todayStr) {
  const lastDate = parseDateString(lastDateStr);
  const todayDate = parseDateString(todayStr);
  if (!lastDate || !todayDate) return false;
  todayDate.setDate(todayDate.getDate() - 1);
  return formatDate(todayDate) === formatDate(lastDate);
}

function checkDailyStreak() {
  const data = storage.getUserData();
  if (!data) return;

  const today = formatDate(new Date());
  const lastLogin = normalizeDateString(data.lastLoginDate);

  if (lastLogin === today) {
    return;
  }

  if (lastLogin && isYesterday(lastLogin, today)) {
    storage.updateUserData({ lastLoginDate: today });
  } else {
    if (lastLogin) {
      storage.updateUserData({ streak: 0, lastLoginDate: today });
    } else {
      storage.updateUserData({ lastLoginDate: today });
    }
  }
}

function completeLesson(xpEarned, topicId) {
  const data = storage.getUserData() || storage.initUserData();
  let xp = Number(data.xp) || 0;
  let streak = Number(data.streak) || 0;
  const topicProgress = data.topicProgress || {};

  xp += Number(xpEarned) || 0;

  const today = formatDate(new Date());
  let newStreak = streak;
  const lastPractice = normalizeDateString(data.lastPracticeDate);

  if (lastPractice !== today) {
    if (lastPractice && isYesterday(lastPractice, today)) {
      newStreak += 1;
    } else {
      newStreak = 1;
    }
  }

  if (topicId) {
    const currentLevel = Number(topicProgress[topicId]) || 0;
    topicProgress[topicId] = currentLevel + 1;
  }

  storage.updateUserData({
    xp,
    streak: newStreak,
    lastPracticeDate: today,
    lastLoginDate: today,
    topicProgress
  });

  return { xp, streak: newStreak };
}

module.exports = {
  checkDailyStreak,
  completeLesson
};
