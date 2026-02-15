// pages/path/path.js
const topics = require('../../data/topics');
const storage = require('../../services/storage');
const topicStats = require('../../services/topicStats');

const topicEmojis = {
  ch01_two_pointers: '👆👇',
  ch02_sliding_window: '🪟',
  ch03_binary_search: '🔍',
  ch04_prefix_diff: '🧮',
  ch05_backtracking: '🧩',
  ch06_bfs: '🧭',
  ch07_dynamic_programming: '📊',
  ch08_trees: '🌳',
  ch09_graphs: '🕸️',
  ch10_monotonic: '🥞',
  ch11_bit: '⚙️',
  ch12_interview: '🎯'
};

Page({
  data: {
    topics: [],
    progress: {}
  },

  onShow: function () {
    const userData = storage.getUserData();
    const progress = userData ? userData.topicProgress : {};
    const topicProgressMap = topicStats.getTopicProgressMap();

    // Pre-calculate percentages and status
    const displayTopics = topics.map(topic => {
      const stats = topicProgressMap[topic.id] || {
        coreDone: 0,
        coreTotal: 0,
        extraDone: 0,
        extraTotal: 0,
        totalDone: 0,
        total: 0,
        corePercent: 0,
        totalPercent: 0
      };
      const hasLessons = Number(stats.total) > 0;
      return {
        ...topic,
        lessonsDone: stats.totalDone,
        percent: stats.totalPercent,
        coreDone: stats.coreDone,
        coreTotal: stats.coreTotal,
        coreRemaining: Math.max(0, stats.coreTotal - stats.coreDone),
        extraDone: stats.extraDone,
        extraTotal: stats.extraTotal,
        extraRemaining: Math.max(0, stats.extraTotal - stats.extraDone),
        isCompleted: stats.totalDone > 0,
        isMastered: hasLessons && stats.totalDone >= stats.total,
        hasCore: stats.coreTotal > 0,
        hasExtra: stats.extraTotal > 0
      };
    });

    const topicsWithQuestions = displayTopics.filter(topic => (topic.coreTotal + topic.extraTotal) > 0);
    const masteredCount = topicsWithQuestions.filter(topic => topic.isMastered).length;

    this.setData({
      topics: displayTopics,
      progress: progress,
      showCoreFirstHint: displayTopics.some(topic => topic.coreTotal > 0 && topic.coreDone < topic.coreTotal),
      isAllCompleted: topicsWithQuestions.length > 0 && masteredCount >= topicsWithQuestions.length
    });
  },

  startTopic: function (e) {
    const topicId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/lesson/lesson?mode=topic&id=${topicId}`,
    });
  },

  getTopicEmoji: function(topicId) {
    return topicEmojis[topicId] || '📚';
  }
})
