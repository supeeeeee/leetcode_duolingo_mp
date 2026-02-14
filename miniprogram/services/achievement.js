// services/achievement.js
const storage = require('./storage');

const ACHIEVEMENTS = [
  {
    id: 'streak_3',
    name: '连续 3 天',
    description: '连续练习 3 天',
    icon: '🔥',
    condition: (data) => data.streak >= 3
  },
  {
    id: 'streak_7',
    name: '周战神',
    description: '连续练习 7 天',
    icon: '🌟',
    condition: (data) => data.streak >= 7
  },
  {
    id: 'streak_30',
    name: '月度大师',
    description: '连续练习 30 天',
    icon: '🏆',
    condition: (data) => data.streak >= 30
  },
  {
    id: 'xp_100',
    name: '初出茅庐',
    description: '赚取 100 XP',
    icon: '💎',
    condition: (data) => data.xp >= 100
  },
  {
    id: 'xp_1000',
    name: 'XP 冠军',
    description: '赚取 1000 XP',
    icon: '👑',
    condition: (data) => data.xp >= 1000
  },
  {
    id: 'questions_10',
    name: '开始起步',
    description: '回答 10 道题目',
    icon: '📚',
    condition: (data) => {
      const history = require('./history').getHistory();
      return history.stats.totalAnswered >= 10;
    }
  },
  {
    id: 'questions_100',
    name: '资深学习者',
    description: '回答 100 道题目',
    icon: '🎯',
    condition: (data) => {
      const history = require('./history').getHistory();
      return history.stats.totalAnswered >= 100;
    }
  },
  {
    id: 'accuracy_80',
    name: '神枪手',
    description: '正确率达到 80%',
    icon: '🎯',
    condition: (data) => {
      const history = require('./history').getHistory();
      if (history.stats.totalAnswered < 10) return false;
      const accuracy = (history.stats.correctCount / history.stats.totalAnswered) * 100;
      return accuracy >= 80;
    }
  },
  {
    id: 'perfect_10',
    name: '十全十美',
    description: '连续答对 10 道题',
    icon: '💯',
    condition: (data) => {
      const history = require('./history').getHistory();
      let maxStreak = 0;
      let currentStreak = 0;
      history.records.forEach(r => {
        if (r.isCorrect) {
          currentStreak++;
          maxStreak = Math.max(maxStreak, currentStreak);
        } else {
          currentStreak = 0;
        }
      });
      return maxStreak >= 10;
    }
  },
  {
    id: 'topic_master',
    name: '知识领主',
    description: '完成一个主题的所有课程',
    icon: '🏅',
    condition: (data) => {
      const topics = require('../data/topics');
      const progress = data.topicProgress || {};
      return topics.every(t => (progress[t.id] || 0) >= t.totalLessons);
    }
  }
];

/**
 * 获取所有成就
 */
function getAllAchievements() {
  const userData = storage.getUserData() || storage.initUserData();
  const unlockedIds = userData.badges || [];
  
  return ACHIEVEMENTS.map(ach => ({
    ...ach,
    unlocked: unlockedIds.includes(ach.id)
  }));
}

/**
 * 获取已解锁成就
 */
function getUnlockedAchievements() {
  return getAllAchievements().filter(ach => ach.unlocked);
}

/**
 * 检查并解锁新成就
 */
function checkAndUnlockAchievements() {
  const userData = storage.getUserData() || storage.initUserData();
  const unlockedIds = userData.badges || [];
  const newUnlocked = [];

  ACHIEVEMENTS.forEach(ach => {
    if (!unlockedIds.includes(ach.id) && ach.condition(userData)) {
      unlockedIds.push(ach.id);
      newUnlocked.push(ach);
    }
  });

  if (newUnlocked.length > 0) {
    storage.updateUserData({ badges: unlockedIds });
  }

  return newUnlocked;
}

/**
 * 获取成就进度
 */
function getAchievementProgress() {
  const all = getAllAchievements();
  const unlocked = all.filter(ach => ach.unlocked).length;
  
  return {
    unlocked,
    total: all.length,
    percentage: Math.round((unlocked / all.length) * 100)
  };
}

module.exports = {
  getAllAchievements,
  getUnlockedAchievements,
  checkAndUnlockAchievements,
  getAchievementProgress
};
