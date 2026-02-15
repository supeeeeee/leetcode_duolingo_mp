const history = require('./history');
const topicStats = require('./topicStats');
const topics = require('../data/topics');
const questions = require('../data/questions');

const questionTopicMap = questions.reduce((map, question) => {
  map[question.id] = question.topicId;
  return map;
}, {});

function normalizeWrongIds(wrongIds) {
  if (!Array.isArray(wrongIds)) return [];
  return [...new Set(wrongIds.filter(Boolean))];
}

function buildWrongByTopic(wrongIds) {
  const wrongByTopic = {};
  wrongIds.forEach(questionId => {
    const topicId = questionTopicMap[questionId];
    if (!topicId) return;
    wrongByTopic[topicId] = (wrongByTopic[topicId] || 0) + 1;
  });
  return wrongByTopic;
}

function getLearningRecommendation(options = {}) {
  const wrongIds = normalizeWrongIds(
    options.wrongIds || (history.getHistory().wrongQuestions || [])
  );
  const progressMap = options.topicProgressMap || topicStats.getTopicProgressMap();
  const wrongByTopic = buildWrongByTopic(wrongIds);

  const chapterProgress = topics.map(topic => {
    const stats = progressMap[topic.id] || { coreDone: 0, coreTotal: 0 };
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
  const recommendedTopic = chapterProgress.find(topic => topic.dueCore > 0) || null;

  let recommendedActionType = 'dailyChallenge';
  let recommendedActionText = '开始每日挑战';
  if (wrongIds.length > 0) {
    recommendedActionType = 'wrongReview';
    recommendedActionText = `优先复习错题（${wrongIds.length}）`;
  } else if (dueCoreTotal > 0) {
    recommendedActionType = 'continueChapter';
    recommendedActionText = recommendedTopic ? `继续推荐章节：${recommendedTopic.title}` : '继续推荐章节';
  }

  return {
    wrongCount: wrongIds.length,
    dueCoreTotal,
    dueCoreChapterCount,
    chapterProgress,
    recommendedTopic,
    recommendedActionType,
    recommendedActionText
  };
}

module.exports = {
  getLearningRecommendation
};
