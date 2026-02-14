/**
 * app.js
 */
const storage = require('./services/storage.js')
const progress = require('./services/progress.js')

App({
  onLaunch: function () {
    // Initialize storage if needed
    const userData = storage.getUserData();
    if (!userData) {
      storage.initUserData();
    }
    
    // Check daily streak
    progress.checkDailyStreak();

    this.globalData = {
      userInfo: null
    }
  },
  globalData: {
    userInfo: null
  }
})