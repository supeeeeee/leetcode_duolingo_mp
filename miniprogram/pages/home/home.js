// pages/home/home.js
const storage = require('../../services/storage');
const dailyChallenge = require('../../services/dailyChallenge');
const history = require('../../services/history');
const achievement = require('../../services/achievement');

function getTodayStr() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

Page({
  data: {
    loading: true,
    xp: 0,
    streak: 0,
    dailyStatus: null,
    dailyChallengeXP: 0,
    todayXP: 0,
    newAchievements: []
  },

  onShow: function () {
    this.setData({ loading: true });
    // Small timeout to make transitions visible
    setTimeout(() => {
      this.refreshData();
      this.setData({ loading: false });
    }, 300);
  },

  refreshData: function() {
    const data = storage.getUserData();
    const dailyStatus = dailyChallenge.checkDailyStatus();
    const challenge = dailyChallenge.getDailyChallenge();
    const dailyData = dailyChallenge.getDailyData();
    const todayStats = history.getTodayStats();
    const achievements = achievement.getAchievementProgress();

    let todayXP = todayStats.correct * 10;
    if (dailyStatus.isCompleted && dailyData && dailyData.date === getTodayStr()) {
      todayXP += Number(dailyData.bonusXP) || 0;
    }
    const todayGoalPercent = Math.max(0, Math.min(100, Math.round((todayXP / 50) * 100)));

    this.setData({
      xp: data ? data.xp : 0,
      streak: data ? data.streak : 0,
      dailyStatus,
      dailyChallengeXP: challenge ? challenge.totalXP + challenge.bonusXP : 0,
      todayXP,
      todayGoalPercent,
      achievements
    });
  },

  startDailyReview: function () {
    wx.navigateTo({
      url: '/pages/lesson/lesson?mode=daily',
    });
  },

  startDailyChallenge: function () {
    wx.navigateTo({
      url: '/pages/daily/daily',
    });
  },

  onShareAppMessage: function() {
    return {
      title: '力扣灵犀 - 像玩游戏一样刷算法题！',
      path: '/pages/home/home'
    };
  },

  onShareTimeline: function() {
    return {
      title: '力扣灵犀 - 像玩游戏一样刷算法题！',
      query: 'from=share'
    };
  }
})
