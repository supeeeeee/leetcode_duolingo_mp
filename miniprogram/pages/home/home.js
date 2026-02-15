// pages/home/home.js
const storage = require('../../services/storage');
const dailyChallenge = require('../../services/dailyChallenge');
const history = require('../../services/history');
const achievement = require('../../services/achievement');
const recommendation = require('../../services/recommendation');

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
    newAchievements: [],
    dueCoreTotal: 0,
    dueCoreChapterCount: 0,
    wrongCount: 0,
    chapterSuggestions: [],
    recommendedTopicId: '',
    recommendedTopicTitle: '',
    recommendedTopicDueCore: 0,
    recommendedTopicWrong: 0,
    recommendedTopicDesc: '',
    recommendedActionType: 'dailyChallenge',
    recommendedActionText: '开始每日挑战',
    wrongReviewSessionCount: 0
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
    const learningRecommendation = recommendation.getLearningRecommendation();
    const chapterProgress = learningRecommendation.chapterProgress;
    const recommendedTopic = learningRecommendation.recommendedTopic;

    const chapterSuggestions = chapterProgress
      .filter(topic => topic.dueCore > 0 || topic.wrong > 0)
      .slice(0, 3);

    const recommendedTopicDesc = recommendedTopic
      ? `核心优先：剩余 ${recommendedTopic.dueCore} 题${recommendedTopic.wrong > 0 ? `，错题 ${recommendedTopic.wrong} 题` : ''}`
      : '';

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
      achievements,
      dueCoreTotal: learningRecommendation.dueCoreTotal,
      dueCoreChapterCount: learningRecommendation.dueCoreChapterCount,
      wrongCount: learningRecommendation.wrongCount,
      chapterSuggestions,
      recommendedTopicId: recommendedTopic ? recommendedTopic.id : '',
      recommendedTopicTitle: recommendedTopic ? recommendedTopic.title : '',
      recommendedTopicDueCore: recommendedTopic ? recommendedTopic.dueCore : 0,
      recommendedTopicWrong: recommendedTopic ? recommendedTopic.wrong : 0,
      recommendedTopicDesc,
      recommendedActionType: learningRecommendation.recommendedActionType,
      recommendedActionText: learningRecommendation.recommendedActionText,
      wrongReviewSessionCount: Math.min(5, learningRecommendation.wrongCount)
    });
  },

  startRecommendedAction: function() {
    if (this.data.recommendedActionType === 'wrongReview') {
      this.startWrongReview();
      return;
    }
    if (this.data.recommendedActionType === 'continueChapter') {
      this.continueRecommendedTopic();
      return;
    }
    this.startDailyChallenge();
  },

  continueRecommendedTopic: function() {
    if (!this.data.recommendedTopicId) {
      this.goPath();
      return;
    }
    wx.navigateTo({
      url: `/pages/lesson/lesson?mode=topic&id=${this.data.recommendedTopicId}`
    });
  },

  goPath: function () {
    wx.switchTab({
      url: '/pages/path/path'
    });
  },

  startDailyReview: function () {
    wx.navigateTo({
      url: '/pages/lesson/lesson?mode=daily',
    });
  },

  startWrongReview: function () {
    wx.navigateTo({
      url: '/pages/lesson/lesson?mode=wrong'
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
