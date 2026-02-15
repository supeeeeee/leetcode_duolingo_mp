// pages/lesson/lesson.js
const srs = require('../../services/srs');
const progress = require('../../services/progress');
const history = require('../../services/history');
const highlighter = require('../../services/highlighter');

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
    emptyCtaText: ''
  },

  answerStartTime: 0,
  topicId: null,
  mode: 'daily',

  onLoad: function (options) {
    const mode = options.mode || 'daily';
    this.mode = mode;
    this.topicId = options.id || null;
    
    const questions = srs.getReviewSession(this.topicId, 5);
    const isEmpty = questions.length === 0;

    const first = isEmpty ? null : questions[0];
    const availableLangs = this.getAvailableLangs(first);
    const highlightedCode = this.getHighlightedCode(first, 'python');
    
    this.setData({
      questions,
      totalQuestions: questions.length,
      currentQuestion: questions[0] || null,
      currentIndex: 0,
      finished: false,
      accuracy: 0,
      availableLangs,
      highlightedCode,
      isEmpty,
      emptyTitle: this.getEmptyTitle(mode),
      emptyHint: this.getEmptyHint(mode),
      emptyCtaText: this.getEmptyCtaText(mode)
    });

    this.answerStartTime = Date.now();
  },

  getEmptyTitle: function(mode) {
    return mode === 'topic' ? '本章节暂无可练习题目' : '当前没有可复习题目';
  },

  getEmptyHint: function(mode) {
    return mode === 'topic'
      ? '先从其他章节完成核心题，稍后再回来解锁更多内容。'
      : '先去学习路径完成核心题，系统会自动安排下一轮复习。';
  },

  getEmptyCtaText: function(mode) {
    return mode === 'topic' ? '返回学习路径' : '前往学习路径';
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
      // Reset to python if available, else first available
      const lang = availableLangs.includes('python') ? 'python' : (availableLangs[0] || 'python');
      
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
    
    if (total > 0) {
      progress.completeLesson(this.data.earnedXP, this.topicId);
    }

    this.setData({
      finished: true,
      accuracy
    });
  },

  goBack: function() {
    wx.navigateBack();
  },

  goToPath: function() {
    wx.switchTab({ url: '/pages/path/path' });
  }
})
