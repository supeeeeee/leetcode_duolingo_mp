const test = require('node:test');
const assert = require('node:assert/strict');

const recommendation = require('../miniprogram/services/recommendation');

function buildProgress(overrides = {}) {
  return {
    ch01_two_pointers: { coreDone: 0, coreTotal: 2 },
    ch02_sliding_window: { coreDone: 1, coreTotal: 1 },
    ...overrides
  };
}

test('prioritizes wrong review when wrong questions remain', () => {
  const result = recommendation.getLearningRecommendation({
    wrongIds: ['q001_two_sum', 'q003_longest_substring_without_repeating_characters'],
    topicProgressMap: buildProgress()
  });

  assert.equal(result.recommendedActionType, 'wrongReview');
  assert.equal(result.wrongCount, 2);
  assert.equal(result.recommendedActionText, '优先复习错题（2）');
});

test('falls back to recommended chapter when no wrong remain and core is due', () => {
  const result = recommendation.getLearningRecommendation({
    wrongIds: [],
    topicProgressMap: buildProgress({
      ch01_two_pointers: { coreDone: 1, coreTotal: 3 }
    })
  });

  assert.equal(result.recommendedActionType, 'continueChapter');
  assert.ok(result.recommendedTopic);
  assert.equal(result.recommendedTopic.id, 'ch01_two_pointers');
  assert.equal(result.recommendedActionText, `继续推荐章节：${result.recommendedTopic.title}`);
});

test('falls back to daily challenge when wrong and due core are both clear', () => {
  const result = recommendation.getLearningRecommendation({
    wrongIds: [],
    topicProgressMap: {
      ch01_two_pointers: { coreDone: 2, coreTotal: 2 },
      ch02_sliding_window: { coreDone: 1, coreTotal: 1 },
      ch03_binary_search: { coreDone: 2, coreTotal: 2 }
    }
  });

  assert.equal(result.recommendedActionType, 'dailyChallenge');
  assert.equal(result.recommendedActionText, '开始每日挑战');
  assert.equal(result.dueCoreTotal, 0);
});
