const test = require('node:test');
const assert = require('node:assert/strict');

const USER_DATA_KEY = 'leetcode_duolingo_user_data';

function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function getRelativeDate(offsetDays) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return formatDate(d);
}

function setupWxStorage(initialData = {}) {
  const store = Object.assign({}, initialData);
  global.wx = {
    getStorageSync(key) {
      return store[key];
    },
    setStorageSync(key, value) {
      store[key] = value;
    },
    removeStorageSync(key) {
      delete store[key];
    }
  };
  return store;
}

function loadProgressService() {
  delete require.cache[require.resolve('../miniprogram/services/progress')];
  delete require.cache[require.resolve('../miniprogram/services/storage')];
  return require('../miniprogram/services/progress');
}

test('wrong-mode completion updates xp/streak but does not increment topicProgress', () => {
  const yesterday = getRelativeDate(-1);
  const storage = setupWxStorage({
    [USER_DATA_KEY]: {
      xp: 40,
      streak: 3,
      lastLoginDate: yesterday,
      lastPracticeDate: yesterday,
      topicProgress: { ch01_arrays: 2 }
    }
  });

  const progress = loadProgressService();
  const result = progress.completeLesson(25, null);
  const saved = storage[USER_DATA_KEY];

  assert.equal(result.xp, 65);
  assert.equal(result.streak, 4);
  assert.equal(saved.xp, 65);
  assert.equal(saved.streak, 4);
  assert.deepEqual(saved.topicProgress, { ch01_arrays: 2 });
});

test('same-day wrong-mode completion does not bump streak again', () => {
  const today = getRelativeDate(0);
  const storage = setupWxStorage({
    [USER_DATA_KEY]: {
      xp: 100,
      streak: 7,
      lastLoginDate: today,
      lastPracticeDate: today,
      topicProgress: { ch02_hashmap: 5 }
    }
  });

  const progress = loadProgressService();
  const result = progress.completeLesson(10, null);
  const saved = storage[USER_DATA_KEY];

  assert.equal(result.xp, 110);
  assert.equal(result.streak, 7);
  assert.equal(saved.streak, 7);
  assert.deepEqual(saved.topicProgress, { ch02_hashmap: 5 });
});
