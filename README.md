# LeetLingo (LeetCode + Duolingo Mini Program)

A WeChat Mini Program for learning LeetCode concepts using spaced repetition and gamification.

## 🚀 Features

- **Daily Reviews**: Keep your streak alive with daily practice.
- **Learning Path**: Structured topics (Arrays, HashMaps, Two Pointers).
- **Gamification**: Earn XP, maintain streaks, and track progress.
- **Offline First**: All progress is saved locally.

## 🛠 Project Structure

```
miniprogram/
├── data/               # Seed data (questions, topics)
├── pages/              # UI Pages
│   ├── home/           # Dashboard & Streak view
│   ├── path/           # Topic tree
│   ├── lesson/         # Interactive quiz engine
│   └── profile/        # User stats
├── services/           # Business logic
│   ├── progress.js     # XP/Streak logic
│   ├── srs.js          # Spaced Repetition logic
│   └── storage.js      # LocalStorage wrapper
├── app.js              # Entry point
├── app.json            # Configuration
└── app.wxss            # Global styles
```

## 🖥 Setup

1. **Clone the repository**:
   ```bash
   git clone <repo_url>
   ```

2. **Open in WeChat DevTools**:
   - Open **WeChat Developer Tools**.
   - Select **Import Project**.
   - Choose the root directory `leetcode_duolingo_mp`.
   - AppID: Use your own or a test AppID.

3. **Run**:
   - The simulator should start automatically.
   - Click "Start Review" to test the lesson flow.

## 📝 Content Management

Edit `miniprogram/data/questions.js` to add new questions.
Format:
```javascript
module.exports = [
  {
    id: 'q1',
    topicId: 'ch01_two_pointers',
    type: 'multiple_choice',
    question: '...',
    options: ['A', 'B', 'C'],
    correctIndex: 0,
    explanation: '...'
  }
];
```

## License

MIT
