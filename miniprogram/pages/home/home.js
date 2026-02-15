// pages/home/home.js
const storage = require('../../services/storage');
const dailyChallenge = require('../../services/dailyChallenge');
const history = require('../../services/history');
const achievement = require('../../services/achievement');
const topicStats = require('../../services/topicStats');
const topics = require('../../data/topics');
const questions = require('../../data/questions');

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
    recommendedTopicDesc: ''
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
    const topicProgressMap = topicStats.getTopicProgressMap();
    const reviewHistory = history.getHistory();
    const wrongSet = new Set(reviewHistory.wrongQuestions || []);

    const questionTopicMap = {};
    questions.forEach(question => {
      questionTopicMap[question.id] = question.topicId;
    });

    const wrongByTopic = {};
    wrongSet.forEach(questionId => {
      const topicId = questionTopicMap[questionId];
      if (!topicId) return;
      wrongByTopic[topicId] = (wrongByTopic[topicId] || 0) + 1;
    });

    const chapterProgress = topics.map(topic => {
      const stats = topicProgressMap[topic.id] || {
        coreDone: 0,
        coreTotal: 0
      };
      const dueCore = Math.max(0, Number(stats.coreTotal || 0) - Number(stats.coreDone || 0));
      const wrong = Number(wrongByTopic[topic.id]) || 0;
      return {
        id: topic.id,
        title: topic.title,
        dueCore,
        wrong
      };
    });

    const dueCoreTotal = chapterProgress.reduce((sum, topic) => sum + topic.dueCore, 0);
    const dueCoreChapterCount = chapterProgress.filter(topic => topic.dueCore > 0).length;

    const recommendedTopic =
      chapterProgress.find(topic => topic.dueCore > 0) ||
      chapterProgress.find(topic => topic.wrong > 0) ||
      null;

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
      dueCoreTotal,
      dueCoreChapterCount,
      wrongCount: wrongSet.size,
      chapterSuggestions,
      recommendedTopicId: recommendedTopic ? recommendedTopic.id : '',
      recommendedTopicTitle: recommendedTopic ? recommendedTopic.title : '',
      recommendedTopicDueCore: recommendedTopic ? recommendedTopic.dueCore : 0,
      recommendedTopicWrong: recommendedTopic ? recommendedTopic.wrong : 0,
      recommendedTopicDesc
    });
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
