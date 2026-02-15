const fs = require('fs')
const path = require('path')

const repoRoot = path.resolve(__dirname, '..')
const questionsPath = path.join(repoRoot, 'miniprogram/data/questions.js')
const handbookPath = path.join(repoRoot, 'LeetCode学习习题册.md')
const outputPath = path.join(repoRoot, 'docs/qa_validate_output.json')
const reportPath = path.join(repoRoot, 'docs/QA_REPORT.md')

const questions = require(questionsPath)
const raw = fs.readFileSync(questionsPath, 'utf8')
const handbookRaw = fs.readFileSync(handbookPath, 'utf8')

const lines = raw.split(/\r?\n/)
const idLineMap = new Map()
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/"id"\s*:\s*"(q\d{3})"/)
  if (m) idLineMap.set(m[1], i + 1)
}

const chapterToTopic = {
  双指针: 'two_pointers',
  滑动窗口: 'sliding_window',
  二分搜索: 'binary_search',
  前缀和与差分: 'arrays',
  回溯: 'backtracking',
  BFS: 'graphs',
  动态规划: 'dynamic_programming',
  二叉树: 'trees',
  图算法: 'graphs',
  单调栈: 'stack_queue',
  位运算: 'arrays',
}

const topicFragments = {
  arrays: {
    pattern: '数组扫描 + 不变量维护（最值/前后缀/原地映射）',
    framework: '先写暴力关系，再用可复用状态把重复计算折叠为一次扫描。',
  },
  hashmaps: {
    pattern: '哈希映射建模（键设计 + 查存顺序）',
    framework: '先定义 key/value 语义，再明确先查后存或先存后查。',
  },
  two_pointers: {
    pattern: '双指针相向或同向收缩',
    framework: '每次只移动一侧并保持区间性质，依赖单调性保证正确性。',
  },
  sliding_window: {
    pattern: '滑窗扩张-收缩模板',
    framework: '右指针扩张更新计数，窗口非法时左指针收缩，合法时更新答案。',
  },
  linked_list: {
    pattern: '链表指针重连（dummy + 快慢指针）',
    framework: '每次改 next 前先保存后继，区间操作先断开再重连。',
  },
  stack_queue: {
    pattern: '栈队列维护顺序约束',
    framework: '维护“栈顶/队头语义”，触发条件时批量弹出并结算。',
  },
  binary_search: {
    pattern: '二分边界模板',
    framework: '固定区间语义与循环不变量，按 mid 判定收缩一半区间。',
  },
  trees: {
    pattern: '树遍历框架（DFS/BFS）',
    framework: '先确定处理时机（前中后序），再组合子树结果。',
  },
  graphs: {
    pattern: '图建模 + 搜索',
    framework: '先建图，再选 BFS/DFS/并查集；访问即标记防重。',
  },
  dynamic_programming: {
    pattern: '动态规划五步法',
    framework: '状态定义、转移、初始化、遍历顺序、答案提取依次落地。',
  },
  backtracking: {
    pattern: '回溯树搜索',
    framework: '做选择 -> 递归 -> 撤销选择，用剪枝减少分支。',
  },
  heap: {
    pattern: '堆维护 TopK',
    framework: '用小顶/大顶堆维持局部有序，控制堆大小与堆顶语义。',
  },
}

const slugRules = [
  { match: /two-sum(?:-|$)|two-sum-ii/, expected: ['target', 'complement', 'map', 'hash'], anti: ['maxsubarray', 'kadane'] },
  { match: /maximum-subarray/, expected: ['max', 'cur', 'kadane', 'dp'], anti: ['complement', 'hashmap'] },
  { match: /best-time-to-buy-and-sell-stock/, expected: ['min', 'profit', 'price'], anti: ['unionfind', 'backtrack'] },
  { match: /valid-anagram|group-anagrams/, expected: ['sort', 'counter', 'map', 'key'], anti: ['target', 'complement'] },
  { match: /subarray-sum-equals-k/, expected: ['prefix', 'k', 'map', 'sum'], anti: ['two', 'complement'] },
  { match: /top-k-frequent-elements/, expected: ['heap', 'priority', 'counter', 'frequency'], anti: ['left', 'right', 'window'] },
  { match: /longest-consecutive-sequence/, expected: ['set', 'contains', 'sequence', 'while'], anti: ['target', 'complement'] },
  { match: /binary-search|sqrtx|search-a-2d-matrix|koko-eating-bananas|find-minimum-in-rotated-sorted-array|find-peak-element/, expected: ['left', 'right', 'mid'], anti: ['backtrack', 'queue'] },
  { match: /permutations|combination-sum|n-queens/, expected: ['backtrack', 'path', 'dfs', 'used'], anti: ['mid', 'left', 'right'] },
  { match: /course-schedule|number-of-islands|clone-graph|word-ladder|network-delay-time|rotting-oranges/, expected: ['queue', 'graph', 'dfs', 'bfs'], anti: ['kadane'] },
]

const requiredLearningKeys = ['pattern', 'coreQuestion', 'framework', 'steps', 'pitfalls', 'complexity', 'template', 'insight']
const requiredLangs = ['python', 'java', 'cpp']
const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const errors = []
const warnings = []
const suggestions = []
const questionDiagnostics = []

const idSet = new Set()
const slugSet = new Set()

function issue(target, severity, q, field, message, snippet, suggestion) {
  target.push({
    severity,
    id: q.id,
    leetcodeSlug: q.leetcodeSlug,
    question: q.question,
    field,
    line: idLineMap.get(q.id) || null,
    message,
    snippet: snippet || '',
    suggestion: suggestion || '',
  })
}

function getTitle(question) {
  const m = String(question || '').match(/【([^】]+)】/)
  return m ? m[1].trim() : String(question || '')
}

function normalizeText(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[\s`'"“”‘’【】\[\]（）(){}:;,.!?，。！？、_\-]/g, '')
}

function extractFingerprint(code) {
  const src = String(code || '')
  const firstLines = src
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 3)
  const names = []
  const regexes = [
    /def\s+([a-zA-Z_]\w*)\s*\(/g,
    /function\s+([a-zA-Z_]\w*)\s*\(/g,
    /class\s+([a-zA-Z_]\w*)/g,
    /(?:public|private|protected)?\s*(?:static\s+)?[\w<>\[\]]+\s+([a-zA-Z_]\w*)\s*\(/g,
  ]
  for (const re of regexes) {
    let m = re.exec(src)
    while (m) {
      names.push(m[1])
      m = re.exec(src)
    }
  }
  return {
    firstLines,
    symbols: [...new Set(names)].slice(0, 8),
  }
}

function getHandbookMap(rawMd) {
  const lines = rawMd.split(/\r?\n/)
  let currentChapter = ''
  const mappedTopics = new Set()
  const entries = []
  for (const line of lines) {
    const chapter = line.match(/^##\s+第.+章：(.+)$/)
    if (chapter) {
      currentChapter = chapter[1].trim()
      const topic = Object.entries(chapterToTopic).find(([key]) => currentChapter.includes(key))
      if (topic) mappedTopics.add(topic[1])
      continue
    }
    const q = line.match(/^####\s+题目：LeetCode\s+\d+\.\s+(.+)$/)
    if (q) {
      const topic = Object.entries(chapterToTopic).find(([key]) => currentChapter.includes(key))
      entries.push({ chapter: currentChapter, title: q[1].trim(), topic: topic ? topic[1] : null })
    }
  }
  return { mappedTopics: [...mappedTopics], entries }
}

const handbookMap = getHandbookMap(handbookRaw)

for (const q of questions) {
  const diagnostics = {
    id: q.id,
    slug: q.leetcodeSlug,
    title: getTitle(q.question),
    topicId: q.topicId,
    fingerprints: {},
    codeMismatchSignals: [],
    handbookMapping: {
      topicCovered: handbookMap.mappedTopics.includes(q.topicId),
      fragmentPresent: !!topicFragments[q.topicId],
      uncertain: false,
    },
  }

  if (!q.id || !/^q\d{3}$/.test(q.id)) issue(errors, 'error', q, 'id', 'id 缺失或格式非法', q.id, '改为 q001 这种格式')
  if (idSet.has(q.id)) issue(errors, 'error', q, 'id', 'id 重复', q.id, '确保 id 唯一')
  idSet.add(q.id)

  if (!q.leetcodeSlug || !slugRegex.test(q.leetcodeSlug)) issue(errors, 'error', q, 'leetcodeSlug', 'leetcodeSlug 缺失或格式非法', q.leetcodeSlug, '补充合法 slug')
  if (slugSet.has(q.leetcodeSlug)) issue(errors, 'error', q, 'leetcodeSlug', 'leetcodeSlug 重复', q.leetcodeSlug, '确保 slug 唯一')
  slugSet.add(q.leetcodeSlug)

  if (!q.description || String(q.description).trim().length < 20) {
    issue(errors, 'error', q, 'description', 'description 为空或过短', q.description, '补充题目摘要')
  }

  if (q.type === 'multiple_choice') {
    if (!Array.isArray(q.options) || q.options.length < 2) issue(errors, 'error', q, 'options', 'MC 选项不足', '', '至少 2 个选项')
    if (!Number.isInteger(q.correctIndex) || q.correctIndex < 0 || q.correctIndex >= q.options.length) {
      issue(errors, 'error', q, 'correctIndex', 'correctIndex 非法', String(q.correctIndex), '修正正确答案下标')
    }
    if (!q.explanation || !String(q.explanation).trim()) issue(errors, 'error', q, 'explanation', '解释为空', '', '补充解释')
  }

  if (!q.codeSnippet || typeof q.codeSnippet !== 'object') {
    issue(errors, 'error', q, 'codeSnippet', '缺少 codeSnippet', '', '补充 python/java/cpp')
  } else {
    const merged = []
    for (const lang of requiredLangs) {
      const code = q.codeSnippet[lang]
      if (!code || typeof code !== 'string' || code.trim().length < 20) {
        issue(errors, 'error', q, `codeSnippet.${lang}`, `${lang} 代码块为空或过短`, '', '补充实现')
      } else {
        diagnostics.fingerprints[lang] = extractFingerprint(code)
      }
      merged.push(String(code || '').toLowerCase())
    }

    const mergedCode = merged.join('\n')
    const rule = slugRules.find((r) => r.match.test(q.leetcodeSlug || ''))
    if (rule) {
      const expectedHit = rule.expected.some((token) => mergedCode.includes(token))
      const antiHit = rule.anti.some((token) => mergedCode.includes(token))
      if (!expectedHit && !/intentional_mismatch_placeholder/.test(mergedCode)) {
        diagnostics.codeMismatchSignals.push('missing_expected_keywords')
        issue(
          warnings,
          'warning',
          q,
          'codeSnippet',
          '代码块与 slug 的关键词浅层匹配失败',
          `${rule.expected.join(', ')}`,
          '核对该题代码是否对应当前题目'
        )
      }
      if (antiHit) {
        diagnostics.codeMismatchSignals.push('unexpected_cross_topic_keywords')
        issue(
          warnings,
          'warning',
          q,
          'codeSnippet',
          '代码块出现跨题型可疑关键词',
          `${rule.anti.join(', ')}`,
          '核对是否误贴了别题代码'
        )
      }
    }

    const mergedCodeLower = mergedCode.toLowerCase()
    if (/intentional_mismatch_placeholder/.test(mergedCodeLower)) {
      issue(
        suggestions,
        'suggestion',
        q,
        'codeSnippet',
        '该题代码块已按低风险策略留空 TODO，后续可补齐正式实现',
        q.leetcodeSlug,
        '优先参考题目 slug 对应官方题解或习题册模板补全'
      )
    }
  }

  if (!q.learning || typeof q.learning !== 'object') {
    issue(errors, 'error', q, 'learning', '缺少 learning 字段', '', '补齐 learning')
  } else {
    for (const key of requiredLearningKeys) {
      if (!(key in q.learning)) issue(errors, 'error', q, `learning.${key}`, `learning 缺少 ${key}`, '', '补齐该字段')
    }

    const f = topicFragments[q.topicId]
    if (!f) {
      diagnostics.handbookMapping.uncertain = true
      issue(
        warnings,
        'warning',
        q,
        'learning',
        '该 topic 未找到习题册可复用片段映射',
        q.topicId,
        '在习题册中补充该专题或人工映射'
      )
    } else {
      const pattern = String(q.learning.pattern || '')
      const framework = String(q.learning.framework || '')
      if (pattern.length < 8) {
        issue(warnings, 'warning', q, 'learning.pattern', 'pattern 过短，建议具体到方法层', pattern, `可参考：${f.pattern}`)
      }
      if (framework.length < 12) {
        issue(warnings, 'warning', q, 'learning.framework', 'framework 过短，建议补充步骤关系', framework, `可参考：${f.framework}`)
      }
      if (!Array.isArray(q.learning.steps) || q.learning.steps.length === 0) {
        issue(errors, 'error', q, 'learning.steps', 'steps 为空', '', '至少给出 1 条步骤')
      }
      if (!Array.isArray(q.learning.pitfalls) || q.learning.pitfalls.length === 0) {
        issue(errors, 'error', q, 'learning.pitfalls', 'pitfalls 为空', '', '至少给出 1 条坑点')
      }
    }
  }

  questionDiagnostics.push(diagnostics)
}

const byQuestion = {}
for (const arr of [errors, warnings, suggestions]) {
  for (const item of arr) {
    if (!byQuestion[item.id]) {
      byQuestion[item.id] = { errors: 0, warnings: 0, suggestions: 0 }
    }
    if (item.severity === 'error') byQuestion[item.id].errors += 1
    if (item.severity === 'warning') byQuestion[item.id].warnings += 1
    if (item.severity === 'suggestion') byQuestion[item.id].suggestions += 1
  }
}

const output = {
  meta: {
    generatedAt: new Date().toISOString(),
    source: 'miniprogram/data/questions.js',
    handbookSource: 'LeetCode学习习题册.md',
    totalQuestions: questions.length,
  },
  summary: {
    errors: errors.length,
    warnings: warnings.length,
    suggestions: suggestions.length,
    handbookMappedTopics: handbookMap.mappedTopics,
    handbookEntryCount: handbookMap.entries.length,
  },
  perQuestionSummary: byQuestion,
  questionDiagnostics,
  errors,
  warnings,
  suggestions,
}

fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`, 'utf8')

const warningRows = warnings.slice(0, 160)
const suggestionRows = suggestions.slice(0, 120)
const unresolved = questionDiagnostics.filter((d) => d.handbookMapping.uncertain)
const codeTodoQuestions = questions.filter((q) => {
  const merged = `${q.codeSnippet?.python || ''}\n${q.codeSnippet?.java || ''}\n${q.codeSnippet?.cpp || ''}`.toLowerCase()
  return merged.includes('intentional_mismatch_placeholder')
})

const md = []
md.push('# QA Report')
md.push('')
md.push('## Summary')
md.push(`- 题目总数：${questions.length}`)
md.push(`- Errors：${errors.length}`)
md.push(`- Warnings：${warnings.length}`)
md.push(`- Suggestions：${suggestions.length}`)
md.push(`- 习题册映射专题数：${handbookMap.mappedTopics.length}`)
md.push(`- 留空+TODO 代码块题目数：${codeTodoQuestions.length}`)
md.push(`- 生成时间：${output.meta.generatedAt}`)
md.push('')
md.push('## Errors（必须修）')
if (errors.length === 0) {
  md.push('无')
} else {
  md.push('| id | slug | 定位 | 问题 | 建议 |')
  md.push('|---|---|---|---|---|')
  for (const e of errors) {
    md.push(`| ${e.id} | ${e.leetcodeSlug} | miniprogram/data/questions.js:${e.line || '-'} (${e.field}) | ${e.message} | ${e.suggestion} |`)
  }
}
md.push('')
md.push('## Warnings（逐题定位）')
md.push('| id | slug | 定位 | 片段 | 问题 | 建议 |')
md.push('|---|---|---|---|---|---|')
for (const w of warningRows) {
  const snippet = String(w.snippet || '').replace(/\n/g, ' ').slice(0, 70)
  md.push(`| ${w.id} | ${w.leetcodeSlug} | miniprogram/data/questions.js:${w.line || '-'} (${w.field}) | ${snippet} | ${w.message} | ${w.suggestion} |`)
}
if (warnings.length > warningRows.length) {
  md.push(`| ... | ... | ... | ... | 其余 ${warnings.length - warningRows.length} 条见 docs/qa_validate_output.json | - |`)
}
md.push('')
md.push('## Suggestions')
if (suggestions.length === 0) {
  md.push('无')
} else {
  md.push('| id | slug | 定位 | 建议 |')
  md.push('|---|---|---|---|')
  for (const s of suggestionRows) {
    md.push(`| ${s.id} | ${s.leetcodeSlug} | miniprogram/data/questions.js:${s.line || '-'} (${s.field}) | ${s.message} |`)
  }
  if (suggestions.length > suggestionRows.length) {
    md.push(`| ... | ... | ... | 其余 ${suggestions.length - suggestionRows.length} 条见 docs/qa_validate_output.json |`)
  }
}
md.push('')
md.push('## Uncertain Mapping')
if (unresolved.length === 0) {
  md.push('无')
} else {
  md.push('| id | slug | topic | 说明 |')
  md.push('|---|---|---|---|')
  for (const r of unresolved) {
    md.push(`| ${r.id} | ${r.slug} | ${r.topicId} | 习题册暂无该专题明确映射，需人工补充 |`)
  }
}

fs.writeFileSync(reportPath, `${md.join('\n')}\n`, 'utf8')

console.log('QA validation finished')
console.log(`- Questions: ${questions.length}`)
console.log(`- Errors: ${errors.length}`)
console.log(`- Warnings: ${warnings.length}`)
console.log(`- Suggestions: ${suggestions.length}`)
console.log(`- Output JSON: ${path.relative(repoRoot, outputPath)}`)
console.log(`- Output Report: ${path.relative(repoRoot, reportPath)}`)

if (errors.length > 0) process.exitCode = 1
