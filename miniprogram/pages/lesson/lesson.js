// pages/lesson/lesson.js
const srs = require('../../services/srs');
const progress = require('../../services/progress');
const history = require('../../services/history');
const highlighter = require('../../services/highlighter');
const userSettings = require('../../services/userSettings');
const recommendation = require('../../services/recommendation');

Page({
  data: {
    questions: [],
    currentIndex: 0,
    currentQuestion: null,
    totalQuestions: 0,
    selectedOption: null,
    status: 'answering', // answering, checked_correct, checked_wrong
    selectedLang: 'python',
    availableLangs: [],
    highlightedCode: '',
    showDetail: false,
    
    // Results
    finished: false,
    earnedXP: 0,
    correctCount: 0,
    accuracy: 0,

    isEmpty: false,
    emptyTitle: '',
    emptyHint: '',
    emptyCtaText: '',
    isWrongMode: false,
    wrongRemainingCount: 0,
    wrongSessionStartCount: 0,
    wrongClearedCount: 0,
    wrongSessionTarget: 0,
    wrongAnsweredCount: 0,
    wrongPrimaryActionType: 'wrongReview',
    wrongPrimaryActionText: '继续错题复习',
    wrongPrimaryTopicId: '',
    wrongPrimaryHint: '',
    completionTitle: '课程完成！',
    sessionBannerText: ''
  },

  answerStartTime: 0,
  topicId: null,
  mode: 'daily',

  onLoad: function (options) {
    const mode = options.mode || 'daily';
    this.mode = mode;
    this.topicId = options.id || null;
    const isWrongMode = mode === 'wrong';

    const questions = isWrongMode
      ? srs.getWrongSession(5)
      : srs.getReviewSession(this.topicId, 5);
    const isEmpty = questions.length === 0;
    const wrongRemainingCount = isWrongMode
      ? (history.getHistory().wrongQuestions || []).length
      : 0;
    const wrongSessionTarget = isWrongMode ? questions.length : 0;

    const first = isEmpty ? null : questions[0];
    const availableLangs = this.getAvailableLangs(first);
    const lang = userSettings.pickQuestionLang(availableLangs);
    const highlightedCode = this.getHighlightedCode(first, lang);
    
    this.setData({
      questions,
      totalQuestions: questions.length,
      currentQuestion: questions[0] || null,
      currentIndex: 0,
      finished: false,
      accuracy: 0,
      selectedLang: lang,
      availableLangs,
      highlightedCode,
      isEmpty,
      emptyTitle: this.getEmptyTitle(mode),
      emptyHint: this.getEmptyHint(mode),
      emptyCtaText: this.getEmptyCtaText(mode),
      isWrongMode,
      wrongRemainingCount,
      wrongSessionStartCount: wrongRemainingCount,
      wrongClearedCount: 0,
      wrongSessionTarget,
      wrongAnsweredCount: 0,
      wrongPrimaryActionType: 'wrongReview',
      wrongPrimaryActionText: '继续错题复习',
      wrongPrimaryTopicId: '',
      wrongPrimaryHint: '',
      completionTitle: isWrongMode ? '错题复习完成' : '课程完成！',
      sessionBannerText: this.getSessionBannerText(mode, questions.length, wrongSessionTarget)
    });

    this.answerStartTime = Date.now();
  },

  getEmptyTitle: function(mode) {
    if (mode === 'topic') return '本章节暂无可练习题目';
    if (mode === 'wrong') return '暂无错题可复习';
    return '当前没有可复习题目';
  },

  getEmptyHint: function(mode) {
    if (mode === 'topic') {
      return '先从其他章节完成核心题，稍后再回来解锁更多内容。';
    }
    if (mode === 'wrong') {
      return '太棒了，你的错题本已经清空，继续保持！';
    }
    return '先去学习路径完成核心题，系统会自动安排下一轮复习。';
  },

  getEmptyCtaText: function(mode) {
    if (mode === 'topic') return '返回学习路径';
    if (mode === 'wrong') return '去做每日挑战';
    return '前往学习路径';
  },

  getSessionBannerText: function(mode, totalQuestions, wrongSessionTarget) {
    if (mode === 'wrong') {
      return `本次错题复习 ${wrongSessionTarget} 题小回合`;
    }
    if (mode === 'topic') {
      return `本次练习 ${totalQuestions} 题小回合，可完成后继续下一组`;
    }
    return '';
  },

  selectOption: function(e) {
    if (this.data.status !== 'answering') return;
    
    const index = e.currentTarget.dataset.index;
    this.setData({ selectedOption: index });
  },

  handleAction: function() {
    if (this.data.status === 'answering') {
      this.checkAnswer();
    } else {
      this.nextQuestion();
    }
  },

  checkAnswer: function() {
    if (this.data.selectedOption === null) return;

    const q = this.data.currentQuestion;
    if (!q) return;
    const isCorrect = this.data.selectedOption === q.correctIndex;
    const answerTime = Math.round((Date.now() - this.answerStartTime) / 1000);
    
    // 保存答题记录
    history.saveQuestionRecord(q.id, q.topicId, isCorrect, this.data.selectedOption, answerTime);
    if (this.mode === 'wrong') {
      const wrongRemainingCount = (history.getHistory().wrongQuestions || []).length;
      this.setData({
        wrongRemainingCount,
        wrongAnsweredCount: this.data.wrongAnsweredCount + 1
      });
    }
    
    if (isCorrect) {
      wx.vibrateShort({ type: 'light' });
      this.setData({ 
        status: 'checked_correct',
        correctCount: this.data.correctCount + 1,
        earnedXP: this.data.earnedXP + (q.xp || 10)
      });
    } else {
      wx.vibrateShort({ type: 'medium' });
      this.setData({ 
        status: 'checked_wrong',
        shakeActive: true 
      });
      setTimeout(() => {
        this.setData({ shakeActive: false });
      }, 300);
    }
  },

  nextQuestion: function() {
    const nextIdx = this.data.currentIndex + 1;
    
    if (nextIdx >= this.data.totalQuestions) {
      this.finishLesson();
    } else {
      const nextQ = this.data.questions[nextIdx];
      const availableLangs = this.getAvailableLangs(nextQ);
      const lang = userSettings.pickQuestionLang(availableLangs);
      
      this.setData({
        currentIndex: nextIdx,
        currentQuestion: nextQ,
        selectedOption: null,
        status: 'answering',
        selectedLang: lang,
        availableLangs,
        highlightedCode: this.getHighlightedCode(nextQ, lang)
      });
      this.answerStartTime = Date.now();
    }
  },

  getAvailableLangs: function(question) {
    if (!question || !question.codeSnippet) return [];
    if (typeof question.codeSnippet === 'string') return ['python'];
    return Object.keys(question.codeSnippet);
  },

  getHighlightedCode: function(question, lang) {
    if (!question || !question.codeSnippet) return '';
    const rawCode = typeof question.codeSnippet === 'string' ? question.codeSnippet : question.codeSnippet[lang];
    return highlighter.highlight(rawCode, lang);
  },

  switchLang: function(e) {
    const lang = e.currentTarget.dataset.lang;
    userSettings.setPreferredLang(lang);
    this.setData({ 
      selectedLang: lang,
      highlightedCode: this.getHighlightedCode(this.data.currentQuestion, lang)
    });
  },

  toggleDetail: function() {
    this.setData({ showDetail: !this.data.showDetail });
  },

  finishLesson: function() {
    const total = this.data.totalQuestions;
    const accuracy = total > 0 ? Math.round((this.data.correctCount / total) * 100) : 0;
    const resultPatch = {
      finished: true,
      accuracy
    };

    if (total > 0) {
      progress.completeLesson(this.data.earnedXP, this.mode === 'wrong' ? null : this.topicId);
    }

    if (this.mode === 'wrong') {
      const latestWrongIds = history.getHistory().wrongQuestions || [];
      const wrongRemainingCount = latestWrongIds.length;
      const wrongClearedCount = Math.max(0, this.data.wrongSessionStartCount - wrongRemainingCount);
      const learningRecommendation = recommendation.getLearningRecommendation({
        wrongIds: latestWrongIds
      });

      let wrongPrimaryActionType = 'wrongReview';
      let wrongPrimaryActionText = '继续错题复习';
      let wrongPrimaryTopicId = '';
      let wrongPrimaryHint = '';

      if (wrongRemainingCount > 0) {
        wrongPrimaryHint = `还有 ${wrongRemainingCount} 题待巩固，建议立刻继续。`;
      } else if (learningRecommendation.dueCoreTotal > 0 && learningRecommendation.recommendedTopic) {
        wrongPrimaryActionType = 'continueChapter';
        wrongPrimaryActionText = '去推荐章节';
        wrongPrimaryTopicId = learningRecommendation.recommendedTopic.id;
        wrongPrimaryHint = `推荐先学习 ${learningRecommendation.recommendedTopic.title}，核心题还剩 ${learningRecommendation.recommendedTopic.dueCore} 题。`;
      } else {
        wrongPrimaryActionType = 'dailyChallenge';
        wrongPrimaryActionText = '去每日挑战';
        wrongPrimaryHint = '错题与核心章节都已清空，来一场今日挑战保持手感。';
      }

      Object.assign(resultPatch, {
        wrongRemainingCount,
        wrongClearedCount,
        wrongPrimaryActionType,
        wrongPrimaryActionText,
        wrongPrimaryTopicId,
        wrongPrimaryHint
      });
    }

    this.setData(resultPatch);
  },

  goBack: function() {
    wx.navigateBack();
  },

  goToPath: function() {
    if (this.mode === 'wrong') {
      wx.navigateTo({ url: '/pages/daily/daily' });
      return;
    }
    wx.switchTab({ url: '/pages/path/path' });
  },

  handleWrongPrimaryAction: function() {
    if (this.data.wrongPrimaryActionType === 'wrongReview') {
      wx.redirectTo({ url: '/pages/lesson/lesson?mode=wrong' });
      return;
    }
    if (this.data.wrongPrimaryActionType === 'continueChapter' && this.data.wrongPrimaryTopicId) {
      wx.redirectTo({ url: `/pages/lesson/lesson?mode=topic&id=${this.data.wrongPrimaryTopicId}` });
      return;
    }
    wx.navigateTo({ url: '/pages/daily/daily' });
  },

  handleWrongSecondaryAction: function() {
    wx.switchTab({ url: '/pages/path/path' });
  }
})
