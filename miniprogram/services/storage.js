const KEY_USER_DATA = 'leetcode_duolingo_user_data';

const defaultUserData = {
  xp: 0,
  streak: 0,
  lastLoginDate: null,
  completedLessons: [], // list of lesson IDs or Topic IDs
  topicProgress: {}, // { "arrays": 1 } (level)
  badges: [],
  userSettings: {
    preferredLang: ''
  }
};

function getUserData() {
  try {
    const data = wx.getStorageSync(KEY_USER_DATA);
    return data || null;
  } catch (e) {
    console.error('Failed to get user data', e);
    return null;
  }
}

function saveUserData(data) {
  try {
    wx.setStorageSync(KEY_USER_DATA, data);
  } catch (e) {
    console.error('Failed to save user data', e);
  }
}

function initUserData() {
  const initial = JSON.parse(JSON.stringify(defaultUserData));
  saveUserData(initial);
  return initial;
}

function updateUserData(updates) {
  const current = getUserData() || JSON.parse(JSON.stringify(defaultUserData));
  const match = Object.assign({}, current, updates);
  saveUserData(match);
  return match;
}

module.exports = {
  getUserData,
  saveUserData,
  initUserData,
  updateUserData
};
