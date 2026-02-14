const questions = require('../data/questions');

// Spaced Repetition System (Simplified)
// In a real app, we'd track "nextReviewDate" for each question.
// For MVP, we just randomly pick questions from the topics or "due" questions.

function getReviewSession(topicId = null, count = 5) {
  let pool = [];
  if (topicId) {
    pool = questions.filter(q => q.topicId === topicId);
  } else {
    // Global review - mix of all
    pool = questions;
  }

  // Shuffle and pick 'count'
  const shuffled = pool.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

module.exports = {
  getReviewSession
};