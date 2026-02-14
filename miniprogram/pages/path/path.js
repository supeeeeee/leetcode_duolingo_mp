// pages/path/path.js
const topics = require('../../data/topics');
const storage = require('../../services/storage');

const topicEmojis = {
  arrays: '📦',
  hashmaps: '🗂️',
  two_pointers: '👆👇',
  linked_list: '🔗',
  sliding_window: '🪟',
  recursion: '🔄',
  dynamic_programming: '📊',
  binary_search: '🔍',
  trees: '🌳',
  graphs: '🕸️',
  stack_queue: '🥞',
  backtracking: '🧩',
  heap: '🗻'
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
      return {
        ...topic,
        lessonsDone,
        percent,
        isCompleted: lessonsDone > 0,
        isMastered: lessonsDone >= topic.totalLessons
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
