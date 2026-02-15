const storage = require('./storage');

function getUserSettings() {
  const userData = storage.getUserData() || storage.initUserData();
  const settings = userData && typeof userData.userSettings === 'object' && userData.userSettings
    ? userData.userSettings
    : {};
  return {
    preferredLang: typeof settings.preferredLang === 'string' ? settings.preferredLang : ''
  };
}

function getPreferredLang() {
  return getUserSettings().preferredLang;
}

function setPreferredLang(lang) {
  if (!lang) return;
  const userData = storage.getUserData() || storage.initUserData();
  const settings = userData && typeof userData.userSettings === 'object' && userData.userSettings
    ? userData.userSettings
    : {};
  storage.updateUserData({
    userSettings: {
      ...settings,
      preferredLang: lang
    }
  });
}

function pickQuestionLang(availableLangs) {
  const langs = Array.isArray(availableLangs) ? availableLangs : [];
  const preferred = getPreferredLang();
  if (preferred && langs.includes(preferred)) return preferred;
  if (langs.includes('python')) return 'python';
  return langs[0] || 'python';
}

module.exports = {
  getPreferredLang,
  setPreferredLang,
  pickQuestionLang
};
