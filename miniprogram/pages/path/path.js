// pages/path/path.js
const topics = require('../../data/topics');
const storage = require('../../services/storage');

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
    const completedCount = Object.values(progress).filter(v => v > 0).length;
    
    // Pre-calculate percentages and status
    const displayTopics = topics.map(topic => {
      const lessonsDone = progress[topic.id] || 0;
      const percent = topic.totalLessons > 0 ? Math.round((lessonsDone / topic.totalLessons) * 100) : 0;
      const hasLessons = Number(topic.totalLessons) > 0;
      return {
        ...topic,
        lessonsDone,
        percent,
        isCompleted: lessonsDone > 0,
        // Avoid marking empty chapters as mastered
        isMastered: hasLessons && lessonsDone >= topic.totalLessons
      };
    });

    this.setData({
      topics: displayTopics,
      progress: progress,
      isAllCompleted: completedCount >= topics.length
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
