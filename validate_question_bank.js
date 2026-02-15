const questions = require('./miniprogram/data/questions')

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const semanticRules = [
  { match: /^two-sum(?:-|$)|^two-sum-ii/, tokens: ['target', 'map', 'hash', 'complement'] },
  { match: /^lru-cache$/, tokens: ['lru', 'linkedhashmap', 'ordereddict', 'list'] },
  { match: /binary-search|search-a-2d-matrix|sqrtx|koko-eating-bananas|find-peak-element|search-in-rotated-sorted-array/, tokens: ['left', 'right', 'mid'] },
  { match: /sliding-window-maximum|longest-substring-without-repeating-characters|minimum-window-substring|find-all-anagrams-in-a-string|longest-repeating-character-replacement/, tokens: ['left', 'right', 'window', 'cnt'] },
  { match: /linked-list|remove-nth-node-from-end-of-list|reorder-list|reverse-nodes-in-k-group|cycle/, tokens: ['listnode', 'next', 'head'] },
  { match: /binary-tree|\bbst\b|serialize-and-deserialize-binary-tree|path-sum|diameter-of-binary-tree/, tokens: ['treenode', 'left', 'right'] },
  { match: /number-of-islands|clone-graph|course-schedule|word-ladder|network-delay-time|surrounded-regions|redundant-connection/, tokens: ['dfs', 'bfs', 'queue', 'graph'] },
  { match: /permutations|combination-sum|n-queens/, tokens: ['backtrack', 'path', 'used', 'dfs'] },
  { match: /top-k-frequent-elements/, tokens: ['heap', 'priority', 'counter', 'unordered_map'] },
  { match: /group-anagrams/, tokens: ['sorted', 'key', 'groups', 'map'] },
  { match: /construct-binary-tree-from-preorder-and-inorder-traversal/, tokens: ['preorder', 'inorder', 'treenode'] },
  { match: /longest-palindromic-substring/, tokens: ['expand', 'substring', 'palindrome'] },
]

const errors = []
const slugs = new Set()

for (const q of questions) {
  if (!q.id) errors.push(`[${q.id || 'unknown'}] missing id`)

  // Slug checks
  if (!q.leetcodeSlug || typeof q.leetcodeSlug !== 'string') {
    errors.push(`[${q.id}] missing leetcodeSlug`)
  } else {
    if (!slugRegex.test(q.leetcodeSlug)) {
      errors.push(`[${q.id}] invalid slug format: ${q.leetcodeSlug}`)
    }
    if (slugs.has(q.leetcodeSlug)) {
      errors.push(`[${q.id}] duplicate slug: ${q.leetcodeSlug}`)
    }
    slugs.add(q.leetcodeSlug)
  }

  // Description checks
  if (!q.description || q.description.length < 20) {
    errors.push(`[${q.id}] description too short or missing`)
  }
  if (/逐步补齐中|这是关于【|q\d{3}/.test(q.description || '')) {
    errors.push(`[${q.id}] description still looks like placeholder`)
  }

  // Code snippet checks
  const s = q.codeSnippet
  if (!s || typeof s !== 'object') {
    errors.push(`[${q.id}] codeSnippet missing object`)
  } else {
    for (const lang of ['python', 'java', 'cpp']) {
      if (!s[lang] || typeof s[lang] !== 'string' || s[lang].trim().length < 20) {
        errors.push(`[${q.id}] missing or too short snippet for ${lang}`)
      }
    }

    const merged = `${s.python || ''}\n${s.java || ''}\n${s.cpp || ''}`.toLowerCase()
    const hasIntentionalPlaceholder = /intentional_mismatch_placeholder/.test(merged)
    if (!hasIntentionalPlaceholder && /通用逻辑框架|同理|pass\b|void solve\(\)/.test(merged)) {
      errors.push(`[${q.id}] snippet still contains placeholder-like text`)
    }

    // Heuristic semantic check
    const rule = semanticRules.find(r => r.match.test(q.leetcodeSlug || ''))
    if (rule && !hasIntentionalPlaceholder) {
      const hit = rule.tokens.some(t => merged.includes(t))
      if (!hit) {
        errors.push(`[${q.id}] snippet may not match slug topic (${q.leetcodeSlug})`)
      }
    }
  }

  // Learning checks
  if (!q.learning || typeof q.learning !== 'object') {
    errors.push(`[${q.id}] missing learning object`)
  } else {
    const required = ['pattern', 'coreQuestion', 'framework', 'pitfalls', 'template', 'insight']
    for (const key of required) {
      if (!(key in q.learning)) {
        errors.push(`[${q.id}] learning missing key: ${key}`)
      }
    }
  }
}

if (errors.length) {
  console.error(`Question bank validation failed: ${errors.length} issue(s)`)
  for (const e of errors) console.error(`- ${e}`)
  process.exit(1)
}

console.log(`Question bank validation passed: ${questions.length} questions checked`) 
