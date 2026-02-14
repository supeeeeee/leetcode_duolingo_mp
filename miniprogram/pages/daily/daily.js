const dailyChallenge = require('../../services/dailyChallenge');
const history = require('../../services/history');
const achievement = require('../../services/achievement');
const highlighter = require('../../services/highlighter');

Page({
  data: {
    challenge: null,
    currentIndex: 0,
    currentQuestion: null,
    selectedOption: null,
    status: 'answering',
    completed: false,
    results: null,
    correctCount: 0,
    newAchievements: [],
    selectedLang: 'python',
    availableLangs: [],
    highlightedCode: '',
    showDetail: false
  },

  onLoad: function () {
    this.loadChallenge();
  },

  loadChallenge: function () {
    const challenge = dailyChallenge.getDailyChallenge();
    const status = dailyChallenge.checkDailyStatus();

    if (status.isCompleted) {
      const data = dailyChallenge.getDailyData();
      this.setData({
        challenge,
        completed: true,
        results: data
      });
      return;
    }

    if (!challenge.questions || challenge.questions.length === 0) {
      this.setData({
        challenge,
        currentIndex: 0,
        currentQuestion: null,
        selectedOption: null,
        status: 'answering',
        completed: true,
        results: {
          date: challenge.date,
          completed: false,
          correctCount: 0,
          totalCount: 0,
          accuracy: 0,
          earnedXP: 0,
          bonusXP: 0
        },
        correctCount: 0
      });
      return;
    }

    const firstQ = challenge.questions[0];
    const availableLangs = this.getAvailableLangs(firstQ);
    const highlightedCode = this.getHighlightedCode(firstQ, 'python');

    this.setData({
      challenge,
      currentIndex: 0,
      currentQuestion: firstQ,
      selectedOption: null,
      status: 'answering',
      completed: false,
      results: null,
      correctCount: 0,
      availableLangs,
      highlightedCode
    });
  },

  selectOption: function (e) {
    if (this.data.status !== 'answering') return;
    const index = e.currentTarget.dataset.index;
    this.setData({ selectedOption: index });
  },

  handleAction: function () {
    if (this.data.status === 'answering') this.checkAnswer();
    else this.nextQuestion();
  },

  checkAnswer: function () {
    if (this.data.selectedOption === null) return;

    const q = this.data.currentQuestion;
    if (!q) return;
    const isCorrect = this.data.selectedOption === q.correctIndex;

    // 保存答题记录（后续用于 Profile 统计）
    history.saveQuestionRecord(q.id, q.topicId, isCorrect, this.data.selectedOption, 0);

    if (isCorrect) {
      wx.vibrateShort({ type: 'light' });
      this.setData({
        correctCount: this.data.correctCount + 1,
        status: 'checked_correct'
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

  nextQuestion: function () {
    const nextIdx = this.data.currentIndex + 1;
    if (nextIdx >= this.data.challenge.questions.length) {
      this.finishChallenge();
      return;
    }

    const nextQ = this.data.challenge.questions[nextIdx];
    const availableLangs = this.getAvailableLangs(nextQ);
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

  finishChallenge: function () {
    const total = this.data.challenge.questions.length;
    const correct = this.data.correctCount;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

    if (total === 0) {
      this.setData({
        completed: true,
        results: {
          date: this.data.challenge.date,
          completed: false,
          correctCount: 0,
          totalCount: 0,
          accuracy: 0,
          earnedXP: 0,
          bonusXP: 0
        },
        newAchievements: []
      });
      return;
    }

    const result = dailyChallenge.completeDailyChallenge({
      correctCount: correct,
      totalCount: total,
      accuracy
    });

    if (result.error) {
      wx.showToast({ title: result.error, icon: 'none' });
      this.loadChallenge();
      return;
    }

    const newAchievements = achievement.checkAndUnlockAchievements();

    this.setData({
      completed: true,
      results: result.record || result,
      newAchievements
    });

    if (newAchievements.length > 0) this.showAchievementPopup(newAchievements);
  },

  showAchievementPopup: function (achievements) {
    const names = achievements.map(a => `${a.icon} ${a.name}`).join('\n');
    wx.showModal({
      title: '🏆 获得成就！',
      content: names,
      showCancel: false,
      confirmText: '太棒了'
    });
  },

  goHome: function () {
    wx.switchTab({ url: '/pages/home/home' });
  }
});
