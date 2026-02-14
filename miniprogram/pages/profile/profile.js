// pages/profile/profile.js
const storage = require('../../services/storage');
const history = require('../../services/history');
const achievement = require('../../services/achievement');

function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

Page({
  data: {
    xp: 0,
    streak: 0,
    totalAnswered: 0,
    correctCount: 0,
    accuracy: 0,
    userLevel: 1,
    xpToNext: 100,
    xpProgress: 0,
    weekDays: [],
    bestDay: '-',
    bestCount: 0,
    achievements: [],
    showAchievementDetail: false,
    selectedAchievement: null
  },

  onShow: function () {
    this.loadProfileData();
  },

  loadProfileData: function () {
    const userData = storage.getUserData() || storage.initUserData();
    const historyData = history.getHistory();
    const weekStats = history.getWeekStats(7);
    const achievements = achievement.getAllAchievements();

    const xp = userData.xp || 0;
    const streak = userData.streak || 0;
    const totalAnswered = historyData.stats.totalAnswered || 0;
    const correctCount = historyData.stats.correctCount || 0;
    const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;
    
    // Level logic: Level 1 (0-99), Level 2 (100-199)...
    const userLevel = Math.floor(xp / 100) + 1;
    const xpProgress = xp % 100;
    const xpToNext = 100 - xpProgress;

    // 最近 7 天（含今天）
    const labels = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const weekDays = [];
    let bestDay = '-';
    let bestCount = 0;

    for (let offset = 6; offset >= 0; offset--) {
      const d = new Date(Date.now() - offset * 24 * 60 * 60 * 1000);
      const dateStr = formatDate(d);
      const dayLabel = labels[d.getDay()];
      const count = weekStats[dateStr] ? weekStats[dateStr].total : 0;

      weekDays.push({ day: dayLabel, count, active: count > 0 });

      if (count >= bestCount) {
        bestCount = count;
        bestDay = dayLabel;
      }
    }

    this.setData({
      xp,
      streak,
      totalAnswered,
      correctCount,
      accuracy,
      userLevel,
      xpToNext,
      xpProgress,
      weekDays,
      bestDay,
      bestCount,
      achievements
    });
  },

  showAchievement: function(e) {
    const id = e.currentTarget.dataset.id;
    const ach = this.data.achievements.find(a => a.id === id);
    if (ach) {
      this.setData({
        selectedAchievement: ach,
        showAchievementDetail: true
      });
    }
  },

  hideAchievement: function() {
    this.setData({
      showAchievementDetail: false,
      selectedAchievement: null
    });
  },

  stopBubbling: function() {
    // Prevent closing when clicking inside modal
  },

  onShareAppMessage: function() {
    return {
      title: `我在力扣灵犀已经等级 ${this.data.userLevel} 啦！快来一起刷题！`,
      path: '/pages/home/home'
    };
  }
});
