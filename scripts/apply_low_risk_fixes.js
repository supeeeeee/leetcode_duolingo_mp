const fs = require('fs')
const path = require('path')

const repoRoot = path.resolve(__dirname, '..')
const questionsPath = path.join(repoRoot, 'miniprogram/data/questions.js')

const questions = require(questionsPath)

const genericCodeRegexes = [
  /明确暴力关系/,
  /根据题意维护状态/,
  /先查后存，避免匹配自己/,
  /扩张窗口\/移动右指针/,
  /条件不满足时收缩/,
  /dp0,\s*dp1\s*=\s*0,\s*0/,
]

const genericInsight = '算法思维比代码本身更重要。先理解问题的结构，再尝试用已知框架套用。'

const topicLearningMap = {
  arrays: {
    pattern: '数组扫描 + 不变量维护（最值/前后缀/原地映射）',
    template:
      '先写出暴力关系，再识别可复用信息（前缀、后缀、最值）。\n用一次遍历维护状态并处理边界。',
    insight: '数组题本质是把“重复计算”改成“状态复用”，关键在于每一步维护的不变量是否正确。',
  },
  hashmaps: {
    pattern: '哈希映射建模（键设计 + 更新时机）',
    template:
      '定义 key/value 的语义。\n在循环中严格区分“先查后存”或“先存后查”，避免自匹配与覆盖错误。',
    insight: '哈希的核心不是 API，而是键设计：把原问题映射为 O(1) 查询的可判定条件。',
  },
  two_pointers: {
    pattern: '双指针收缩与分治（同向/相向）',
    template:
      '先确定左右指针各自语义，再写移动规则。\n每次移动只改变一个边界，并保持区间性质不被破坏。',
    insight: '双指针能降复杂度的前提，是“移动某一侧不会丢失最优解”的单调性结论。',
  },
  sliding_window: {
    pattern: '滑动窗口计数（扩张-收缩-更新答案）',
    template:
      'right 扩张窗口更新计数；满足条件时 left 收缩。\n每轮只在窗口合法时更新答案，并明确固定窗/可变窗。',
    insight: '滑窗题难点不在双指针，而在“窗口何时合法、何时必须收缩”的判定条件。',
  },
  linked_list: {
    pattern: '链表指针操作（哑结点 + 快慢指针 + 局部反转）',
    template:
      '优先使用 dummy 统一头结点边界。\n涉及区间操作时先断开再重连，保证 next 指针始终可追踪。',
    insight: '链表题最常见错误是丢失 next。每次改指针前先保存后继，才能避免链断裂。',
  },
  stack_queue: {
    pattern: '栈/队列维护顺序约束',
    template:
      '先定义栈顶或队头的语义（最近匹配/单调性/最早入队）。\n入栈入队前先弹出失效元素，再执行当前更新。',
    insight: '单调栈与队列的本质是“延迟结算”，在触发条件出现时一次性处理历史元素。',
  },
  binary_search: {
    pattern: '二分查找边界模板（左闭右闭或左闭右开）',
    template:
      '固定循环不变量与区间定义。\n每轮比较 mid 后收缩一半区间，结束后返回边界位置。',
    insight: '二分的关键是边界语义一致：更新 left/right 的规则必须与返回值定义完全匹配。',
  },
  trees: {
    pattern: '树遍历框架（前中后序 / DFS-BFS）',
    template:
      '先写递归/迭代遍历骨架，再明确在前序、中序或后序位置处理当前节点。\n涉及全局答案时避免重复计算。',
    insight: '树题统一解法是“先分解子问题，再合并结果”，关键在于节点处理时机。',
  },
  graphs: {
    pattern: '图遍历与建图（DFS/BFS/拓扑/并查集）',
    template:
      '先明确图表示（邻接表/入度/边集），再决定 DFS、BFS 或并查集。\n访问即标记，避免重复遍历和死循环。',
    insight: '图题的第一步不是写搜索，而是把输入关系正确建模成“点-边”结构。',
  },
  dynamic_programming: {
    pattern: '动态规划五步法（状态/转移/初始化/遍历/答案）',
    template:
      '先定义 dp 状态含义，再写转移方程。\n明确初始化和遍历顺序，确保依赖状态已被计算。',
    insight: 'DP 的本质是把指数级搜索改写为状态复用，状态定义正确比转移技巧更重要。',
  },
  backtracking: {
    pattern: '回溯树搜索（路径、选择列表、结束条件）',
    template:
      '进入递归前做选择，返回时撤销选择。\n用 start/used 控制重复，保证每层决策空间正确。',
    insight: '回溯性能的核心在剪枝：越早排除不可能分支，搜索树越小。',
  },
  heap: {
    pattern: '堆维护 TopK / 第 k 小(大)',
    template:
      '先确定使用小顶堆还是大顶堆。\n遍历过程中维护堆大小和堆顶语义，保证最终堆内即答案集合。',
    insight: '堆适合维护“动态前 K 名”，将全量排序降为局部有序维护。',
  },
}

function getTitle(question) {
  const m = String(question || '').match(/【([^】]+)】/)
  return m ? m[1] : String(question || '')
}

function shouldReplaceSnippet(code) {
  const text = String(code || '')
  return genericCodeRegexes.some((re) => re.test(text))
}

function makeTodoSnippet(lang, title, slug) {
  if (lang === 'python') {
    return [
      `# TODO: ${title} (${slug})`,
      '# INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。',
      'def solve(*args, **kwargs):',
      `    raise NotImplementedError('TODO: implement ${slug}')`,
    ].join('\n')
  }
  if (lang === 'java') {
    return [
      `// TODO: ${title} (${slug})`,
      '// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。',
      'class Solution {',
      '    public Object solve() {',
      `        throw new UnsupportedOperationException("TODO: implement ${slug}");`,
      '    }',
      '}',
    ].join('\n')
  }
  return [
    `// TODO: ${title} (${slug})`,
    '// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。',
    'class Solution {',
    'public:',
    '    void solve() {',
    `        throw std::logic_error("TODO: implement ${slug}");`,
    '    }',
    '};',
  ].join('\n')
}

let touchedQuestions = 0
let replacedSnippetQuestions = 0
let replacedSnippetBlocks = 0
let replacedLearningFields = 0

for (const q of questions) {
  let touched = false

  if (q.codeSnippet && typeof q.codeSnippet === 'object') {
    const title = getTitle(q.question)
    const slug = q.leetcodeSlug || q.id
    const langs = ['python', 'java', 'cpp']
    const hasGeneric = langs.some((lang) => shouldReplaceSnippet(q.codeSnippet[lang]))
    if (hasGeneric) {
      replacedSnippetQuestions += 1
      for (const lang of langs) {
        q.codeSnippet[lang] = makeTodoSnippet(lang, title, slug)
        replacedSnippetBlocks += 1
      }
      touched = true
    }
  }

  if (q.learning && typeof q.learning === 'object') {
    const topicMap = topicLearningMap[q.topicId]
    if (topicMap) {
      if (typeof q.learning.pattern === 'string' && q.learning.pattern.trim().length < 8) {
        q.learning.pattern = topicMap.pattern
        replacedLearningFields += 1
        touched = true
      }

      if (typeof q.learning.template === 'string' && /process\(data\);/.test(q.learning.template)) {
        q.learning.template = topicMap.template
        replacedLearningFields += 1
        touched = true
      }

      if (q.learning.insight === genericInsight) {
        q.learning.insight = topicMap.insight
        replacedLearningFields += 1
        touched = true
      }
    }
  }

  if (touched) touchedQuestions += 1
}

const output = `module.exports = ${JSON.stringify(questions, null, 2)}\n`
fs.writeFileSync(questionsPath, output, 'utf8')

console.log('Low-risk fixes applied')
console.log(`- touched questions: ${touchedQuestions}`)
console.log(`- snippet-replaced questions: ${replacedSnippetQuestions}`)
console.log(`- snippet blocks replaced: ${replacedSnippetBlocks}`)
console.log(`- learning fields replaced: ${replacedLearningFields}`)
