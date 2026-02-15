/*
  Add missing 20 handbook questions into miniprogram/data/questions.js.

  Source of truth for chapter/section ordering: docs/handbook_question_map.json.
  Slug->id mapping will be updated in docs/slug_to_leetcode_id.json.
*/

const fs = require('fs');
const path = require('path');

const questionsPath = path.join(__dirname, '..', 'miniprogram', 'data', 'questions.js');
const handbookMapPath = path.join(__dirname, '..', 'docs', 'handbook_question_map.json');
const slugToIdPath = path.join(__dirname, '..', 'docs', 'slug_to_leetcode_id.json');

const questions = require(questionsPath);
const handbookMap = JSON.parse(fs.readFileSync(handbookMapPath, 'utf8'));
const slugToId = JSON.parse(fs.readFileSync(slugToIdPath, 'utf8'));

function mustGetHandbookRef(leetcodeId) {
  const ref = handbookMap[String(leetcodeId)];
  if (!ref) throw new Error(`handbook ref missing for leetcodeId=${leetcodeId}`);
  return {
    leetcodeId,
    chapter: ref.chapter,
    section: ref.section,
    orderInSection: ref.orderInSection,
    mdLine: ref.mdLine,
  };
}

const missing = [
  // id, slug, topicId
  [35, 'search-insert-position', 'ch03_binary_search'],
  [704, 'binary-search', 'ch03_binary_search'],
  [77, 'combinations', 'ch05_backtracking'],
  [78, 'subsets', 'ch05_backtracking'],
  [104, 'maximum-depth-of-binary-tree', 'ch08_trees'],
  [111, 'minimum-depth-of-binary-tree', 'ch06_bfs'],
  [123, 'best-time-to-buy-and-sell-stock-iii', 'ch07_dynamic_programming'],
  [136, 'single-number', 'ch11_bit'],
  [144, 'binary-tree-preorder-traversal', 'ch08_trees'],
  [231, 'power-of-two', 'ch11_bit'],
  [264, 'ugly-number-ii', 'ch12_interview'],
  [295, 'find-median-from-data-stream', 'ch12_interview'],
  [304, 'range-sum-query-2d-immutable', 'ch04_prefix_diff'],
  [370, 'range-addition', 'ch04_prefix_diff'],
  [518, 'coin-change-ii', 'ch07_dynamic_programming'],
  [567, 'permutation-in-string', 'ch02_sliding_window'],
  [701, 'insert-into-a-binary-search-tree', 'ch08_trees'],
  [752, 'open-the-lock', 'ch06_bfs'],
  [876, 'middle-of-the-linked-list', 'ch01_two_pointers'],
  [977, 'squares-of-a-sorted-array', 'ch01_two_pointers'],
];

const existingSlug = new Set(questions.map(q => q.leetcodeSlug));
const existingId = new Set(questions.map(q => q.id));

function nextId() {
  // q101 ...
  let n = 101;
  while (existingId.has(`q${String(n).padStart(3, '0')}`)) n++;
  return `q${String(n).padStart(3, '0')}`;
}

function addSlugMapping(slug, leetcodeId) {
  slugToId[slug] = leetcodeId;
}

function baseLearning(pattern, coreQuestion, framework, pitfalls, insight) {
  return {
    pattern,
    coreQuestion,
    framework,
    steps: [],
    pitfalls,
    complexity: '目标通常是时间 O(n) 或 O(n log n)，空间 O(1)~O(n)。',
    template: framework,
    insight,
  };
}

function snippets({ python, java, cpp }) {
  return { python, java, cpp };
}

const newQuestions = [];

for (const [leetcodeId, slug, topicId] of missing) {
  if (existingSlug.has(slug)) continue;
  const id = nextId();
  existingId.add(id);

  const handbookRef = mustGetHandbookRef(leetcodeId);
  addSlugMapping(slug, leetcodeId);

  let q;

  switch (leetcodeId) {
    case 35:
      q = {
        id,
        topicId,
        track: 'core',
        type: 'multiple_choice',
        question: '【搜索插入位置】 二分查找的正确边界策略是？',
        options: [
          '使用 left<=right，最后返回 left 作为插入点',
          '使用 left<right，最后返回 right+1',
          '从中间向两边线性扩展',
          '每次只移动一个指针，避免跳过'
        ],
        correctIndex: 0,
        explanation: '标准二分：循环结束时 left 指向第一个 >= target 的位置（也就是插入位置）。',
        xp: 12,
        learning: baseLearning(
          '二分搜索（找边界/插入点）',
          '循环结束时，left/right 分别代表什么含义？插入点为何是 left？',
          '维护区间不变量：在 [left, right] 中搜索；通过比较 nums[mid] 与 target 收缩边界。',
          ['mid 计算溢出（某些语言）', '死循环（边界更新不正确）', '返回 right vs left 搞反'],
          '二分题的关键不是模板背诵，而是明确不变量：你到底在找“任意命中”还是“第一个/最后一个满足条件的位置”。'
        ),
        codeSnippet: snippets({
          python: `def searchInsert(nums, target):\n    left, right = 0, len(nums) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if nums[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return left\n`,
          java: `public int searchInsert(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (nums[mid] < target) {\n            left = mid + 1;\n        } else {\n            right = mid - 1;\n        }\n    }\n    return left;\n}\n`,
          cpp: `int searchInsert(vector<int>& nums, int target) {\n    int left = 0, right = (int)nums.size() - 1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (nums[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return left;\n}\n`
        }),
        description: '给定一个排序数组 nums 和一个目标值 target，如果 target 存在返回其下标；否则返回它将会被按顺序插入的位置。',
        leetcodeSlug: slug,
        handbookRef,
      };
      break;

    case 704:
      q = {
        id,
        topicId,
        track: 'core',
        type: 'multiple_choice',
        question: '【二分查找】 循环不变量的核心是什么？',
        options: [
          '目标值若存在，一定在当前搜索区间内',
          'mid 每次都必须命中答案',
          'left 和 right 永远不相等',
          '每次循环都只能移动 left'
        ],
        correctIndex: 0,
        explanation: '二分的本质是维护“答案在区间内”的不变量，并通过比较把区间缩小。',
        xp: 10,
        learning: baseLearning(
          '二分搜索（基础）',
          '怎么设计边界更新让区间必然收缩？',
          '设置 left/right 表示当前有效搜索区间，通过 nums[mid] 与 target 的比较来缩小区间。',
          ['边界更新导致死循环', 'mid 计算错误', '区间写成开区间/闭区间混用'],
          '把二分当成“区间收缩游戏”：每一步都必须删掉一半且不能删掉可能答案。'
        ),
        codeSnippet: snippets({
          python: `def search(nums, target):\n    left, right = 0, len(nums) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if nums[mid] == target:\n            return mid\n        if nums[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1\n`,
          java: `public int search(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (nums[mid] == target) return mid;\n        if (nums[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return -1;\n}\n`,
          cpp: `int search(vector<int>& nums, int target) {\n    int left = 0, right = (int)nums.size() - 1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (nums[mid] == target) return mid;\n        if (nums[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return -1;\n}\n`
        }),
        description: '在升序数组中使用二分查找 target，存在则返回下标，否则返回 -1。',
        leetcodeSlug: slug,
        handbookRef,
      };
      break;

    case 77:
      q = {
        id,
        topicId,
        track: 'core',
        type: 'multiple_choice',
        question: '【组合】 回溯中用于避免重复组合的关键是？',
        options: [
          '使用 startIndex 控制下一层从哪里选',
          '每层都从 1 重新开始选',
          '对 path 排序后再去重',
          '用哈希表记录所有出现过的 path'
        ],
        correctIndex: 0,
        explanation: '组合是“无序选择”，通过 startIndex 保证元素只向后选，从源头避免重复。',
        xp: 14,
        learning: baseLearning(
          '回溯：组合（startIndex）',
          '如何保证不出现 [1,2] 和 [2,1] 这种排列重复？',
          '用 backtrack(start) 枚举下一次可选的起点，path 表示当前选择路径。',
          ['忘记回溯撤销选择', 'startIndex 传错导致重复/漏解', '剪枝条件写反'],
          '回溯的“去重”优先用结构约束（startIndex/used），而不是事后用 set。'
        ),
        codeSnippet: snippets({
          python: `def combine(n, k):\n    res = []\n    path = []\n    def backtrack(start):\n        if len(path) == k:\n            res.append(path[:])\n            return\n        for i in range(start, n + 1):\n            path.append(i)\n            backtrack(i + 1)\n            path.pop()\n    backtrack(1)\n    return res\n`,
          java: `public List<List<Integer>> combine(int n, int k) {\n    List<List<Integer>> res = new ArrayList<>();\n    List<Integer> path = new ArrayList<>();\n    backtrack(1, n, k, path, res);\n    return res;\n}\nprivate void backtrack(int start, int n, int k, List<Integer> path, List<List<Integer>> res) {\n    if (path.size() == k) {\n        res.add(new ArrayList<>(path));\n        return;\n    }\n    for (int i = start; i <= n; i++) {\n        path.add(i);\n        backtrack(i + 1, n, k, path, res);\n        path.remove(path.size() - 1);\n    }\n}\n`,
          cpp: `vector<vector<int>> combine(int n, int k) {\n    vector<vector<int>> res;\n    vector<int> path;\n    function<void(int)> backtrack = [&](int start){\n        if ((int)path.size() == k) {\n            res.push_back(path);\n            return;\n        }\n        for (int i = start; i <= n; i++) {\n            path.push_back(i);\n            backtrack(i + 1);\n            path.pop_back();\n        }\n    };\n    backtrack(1);\n    return res;\n}\n`
        }),
        description: '给定两个整数 n 和 k，返回 1..n 中所有可能的 k 个数的组合。',
        leetcodeSlug: slug,
        handbookRef,
      };
      break;

    case 78:
      q = {
        id,
        topicId,
        track: 'core',
        type: 'multiple_choice',
        question: '【子集】 生成所有子集的回溯策略是？',
        options: [
          '每个元素都做“选/不选”的分支，并记录每个节点的 path',
          '只记录长度为 n 的 path',
          '先排序再只取连续片段',
          '用双指针滑窗扩展'
        ],
        correctIndex: 0,
        explanation: '子集枚举可视作一棵决策树，每个节点的 path 都是一个有效子集。',
        xp: 14,
        learning: baseLearning(
          '回溯：子集（树的每个节点都是答案）',
          '为什么每次进入 backtrack 就可以把 path 加入答案？',
          '用 backtrack(start) 从 start 开始尝试加入元素；每次都先记录当前 path。',
          ['漏掉空集', 'startIndex 更新错误', '结果引用同一个 path 导致被修改'],
          '子集问题的“答案分布”在整棵树的所有节点，而不是只在叶子结点。'
        ),
        codeSnippet: snippets({
          python: `def subsets(nums):\n    res = []\n    path = []\n    def backtrack(start):\n        res.append(path[:])\n        for i in range(start, len(nums)):\n            path.append(nums[i])\n            backtrack(i + 1)\n            path.pop()\n    backtrack(0)\n    return res\n`,
          java: `public List<List<Integer>> subsets(int[] nums) {\n    List<List<Integer>> res = new ArrayList<>();\n    List<Integer> path = new ArrayList<>();\n    backtrack(0, nums, path, res);\n    return res;\n}\nprivate void backtrack(int start, int[] nums, List<Integer> path, List<List<Integer>> res) {\n    res.add(new ArrayList<>(path));\n    for (int i = start; i < nums.length; i++) {\n        path.add(nums[i]);\n        backtrack(i + 1, nums, path, res);\n        path.remove(path.size() - 1);\n    }\n}\n`,
          cpp: `vector<vector<int>> subsets(vector<int>& nums) {\n    vector<vector<int>> res;\n    vector<int> path;\n    function<void(int)> backtrack = [&](int start){\n        res.push_back(path);\n        for (int i = start; i < (int)nums.size(); i++) {\n            path.push_back(nums[i]);\n            backtrack(i + 1);\n            path.pop_back();\n        }\n    };\n    backtrack(0);\n    return res;\n}\n`
        }),
        description: '给你一个整数数组 nums，返回该数组所有可能的子集（幂集）。',
        leetcodeSlug: slug,
        handbookRef,
      };
      break;

    case 111: // BFS min depth
      q = {
        id,
        topicId,
        track: 'core',
        type: 'multiple_choice',
        question: '【二叉树的最小深度】 为什么常用 BFS 而不是 DFS？',
        options: [
          'BFS 按层推进，第一次遇到叶子节点就是最小深度',
          'DFS 无法遍历二叉树',
          'BFS 一定比 DFS 更省空间',
          'DFS 只能求最大值'
        ],
        correctIndex: 0,
        explanation: '最短路径/最小层数类问题，BFS 自带“最先到达即最短”的性质。',
        xp: 14,
        learning: baseLearning(
          'BFS：最短层数',
          '如何利用“队列按层遍历”直接得到最小深度？',
          '用 queue 做层序遍历，每层 depth+1；遇到第一个叶子结点立即返回。',
          ['把只有一个孩子的节点当作叶子', '忘记按层计数', '空树边界'],
          'BFS 很适合“最短/最小步数”问题：一旦命中目标就能提前结束。'
        ),
        codeSnippet: snippets({
          python: `from collections import deque\n\ndef minDepth(root):\n    if not root: return 0\n    queue = deque([(root, 1)])\n    while queue:\n        node, depth = queue.popleft()\n        if not node.left and not node.right:\n            return depth\n        if node.left: queue.append((node.left, depth + 1))\n        if node.right: queue.append((node.right, depth + 1))\n`,
          java: `public int minDepth(TreeNode root) {\n    if (root == null) return 0;\n    Deque<TreeNode> queue = new ArrayDeque<>();\n    Deque<Integer> depthQ = new ArrayDeque<>();\n    queue.add(root);\n    depthQ.add(1);\n    while (!queue.isEmpty()) {\n        TreeNode node = queue.poll();\n        int depth = depthQ.poll();\n        if (node.left == null && node.right == null) return depth;\n        if (node.left != null) { queue.add(node.left); depthQ.add(depth + 1); }\n        if (node.right != null) { queue.add(node.right); depthQ.add(depth + 1); }\n    }\n    return 0;\n}\n`,
          cpp: `int minDepth(TreeNode* root) {\n    if (!root) return 0;\n    queue<pair<TreeNode*, int>> q;\n    q.push({root, 1});\n    while (!q.empty()) {\n        auto [node, depth] = q.front(); q.pop();\n        if (!node->left && !node->right) return depth;\n        if (node->left) q.push({node->left, depth + 1});\n        if (node->right) q.push({node->right, depth + 1});\n    }\n    return 0;\n}\n`
        }),
        description: '给定一棵二叉树，找出其最小深度（从根节点到最近叶子节点的最短路径上的节点数）。',
        leetcodeSlug: slug,
        handbookRef,
      };
      break;

    case 752:
      q = {
        id,
        topicId,
        track: 'core',
        type: 'multiple_choice',
        question: '【打开转盘锁】 BFS 的“去重”通常用什么结构？',
        options: ['visited 集合（哈希集合）', '优先队列', '栈', '并查集'],
        correctIndex: 0,
        explanation: '状态图 BFS 必须记录 visited，否则会在环上反复入队导致爆炸。',
        xp: 16,
        learning: baseLearning(
          'BFS：最短路径（状态图）',
          '如何生成邻居状态并避免重复访问？',
          '用 queue 层序扩展状态；对每个状态生成 8 个邻居；用 visited 去重。',
          ['忘记把 deadends 加入 visited', '邻居生成错误', '没有按层计步'],
          '把题目抽象成图：节点=密码状态，边=拨动一位。BFS 找最短步数。'
        ),
        codeSnippet: snippets({
          python: `from collections import deque\n\ndef openLock(deadends, target):\n    dead = set(deadends)\n    if '0000' in dead: return -1\n    queue = deque(['0000'])\n    visited = set(['0000'])\n    step = 0\n    while queue:\n        for _ in range(len(queue)):\n            cur = queue.popleft()\n            if cur == target: return step\n            for i in range(4):\n                x = int(cur[i])\n                for d in (-1, 1):\n                    y = (x + d) % 10\n                    nxt = cur[:i] + str(y) + cur[i+1:]\n                    if nxt in dead or nxt in visited: continue\n                    visited.add(nxt)\n                    queue.append(nxt)\n        step += 1\n    return -1\n`,
          java: `public int openLock(String[] deadends, String target) {\n    Set<String> dead = new HashSet<>(Arrays.asList(deadends));\n    if (dead.contains("0000")) return -1;\n    Deque<String> queue = new ArrayDeque<>();\n    Set<String> visited = new HashSet<>();\n    queue.add("0000");\n    visited.add("0000");\n    int step = 0;\n    while (!queue.isEmpty()) {\n        int size = queue.size();\n        for (int s = 0; s < size; s++) {\n            String cur = queue.poll();\n            if (cur.equals(target)) return step;\n            for (int i = 0; i < 4; i++) {\n                char c = cur.charAt(i);\n                for (int d : new int[]{-1, 1}) {\n                    int y = (c - '0' + d + 10) % 10;\n                    String nxt = cur.substring(0, i) + y + cur.substring(i + 1);\n                    if (dead.contains(nxt) || visited.contains(nxt)) continue;\n                    visited.add(nxt);\n                    queue.add(nxt);\n                }\n            }\n        }\n        step++;\n    }\n    return -1;\n}\n`,
          cpp: `int openLock(vector<string>& deadends, string target) {\n    unordered_set<string> dead(deadends.begin(), deadends.end());\n    if (dead.count("0000")) return -1;\n    queue<string> q;\n    unordered_set<string> visited;\n    q.push("0000");\n    visited.insert("0000");\n    int step = 0;\n    while (!q.empty()) {\n        int size = q.size();\n        while (size--) {\n            string cur = q.front(); q.pop();\n            if (cur == target) return step;\n            for (int i = 0; i < 4; i++) {\n                int x = cur[i] - '0';\n                for (int d : {-1, 1}) {\n                    int y = (x + d + 10) % 10;\n                    string nxt = cur;\n                    nxt[i] = char('0' + y);\n                    if (dead.count(nxt) || visited.count(nxt)) continue;\n                    visited.insert(nxt);\n                    q.push(nxt);\n                }\n            }\n        }\n        step++;\n    }\n    return -1;\n}\n`
        }),
        description: '你有一个带四个拨轮的转盘锁，每次可以将某一位拨动 +1 或 -1（循环）。给定 deadends 与 target，求最少拨动次数。',
        leetcodeSlug: slug,
        handbookRef,
      };
      break;

    default:
      // For remaining problems, create a compact but valid question with correct snippets.
      q = makeGeneric({ id, topicId, slug, leetcodeId, handbookRef });
  }

  newQuestions.push(q);
  existingSlug.add(slug);
}

function makeGeneric({ id, topicId, slug, leetcodeId, handbookRef }) {
  // Provide per-problem concise content while satisfying validators.
  const common = {
    id,
    topicId,
    track: 'core',
    type: 'multiple_choice',
    xp: 14,
    leetcodeSlug: slug,
    handbookRef,
  };

  const defs = {
    104: {
      question: '【二叉树最大深度】 DFS 递归的返回值通常表示？',
      options: ['以当前节点为根的最大深度', '当前节点的值', '节点总数', '树是否平衡'],
      correctIndex: 0,
      explanation: '递归函数返回“子树的答案”，当前节点只做组合：1 + max(left,right)。',
      description: '给定二叉树 root，返回其最大深度（从根到最远叶子节点的最长路径节点数）。',
      learning: baseLearning('树递归：后序组合', '递归函数该返回什么，才能在父节点一步合并？', '定义 dfs(node) 返回子树深度：dfs = 1 + max(dfs(left), dfs(right))。', ['空节点返回 0', '把深度与节点数混淆'], '树题往往是“定义子问题 + 后序合并”。先定义 dfs 的含义，代码自然就出来。'),
      codeSnippet: snippets({
        python: `def maxDepth(root):\n    if not root: return 0\n    left = maxDepth(root.left)\n    right = maxDepth(root.right)\n    return 1 + max(left, right)\n`,
        java: `public int maxDepth(TreeNode root) {\n    if (root == null) return 0;\n    int left = maxDepth(root.left);\n    int right = maxDepth(root.right);\n    return 1 + Math.max(left, right);\n}\n`,
        cpp: `int maxDepth(TreeNode* root) {\n    if (!root) return 0;\n    int left = maxDepth(root->left);\n    int right = maxDepth(root->right);\n    return 1 + max(left, right);\n}\n`
      })
    },
    123: {
      question: '【股票 III】 最多两次交易的 DP 关键状态是？',
      options: ['次数k + 是否持股 的状态机 DP', '排序后贪心', '双指针夹逼', '并查集合并区间'],
      correctIndex: 0,
      explanation: '经典股票 DP：dp[k][0/1] 表示完成 k 次交易后不持股/持股的最大利润。',
      description: '给定 prices，最多完成两笔交易（买入+卖出为一笔），求最大利润（不能同时参与多笔交易）。',
      learning: baseLearning('DP：股票状态机（k 次交易）', '如何把“买/卖/不操作”写成可转移的状态？', '用 dp[k][0/1] 维护状态：不持股/持股。遍历价格更新。', ['交易次数定义不清（卖出算一次）', '更新顺序错误导致覆盖'], '股票题像状态机：每一天都在“持/不持”之间切换，DP 记录最优。'),
      codeSnippet: snippets({
        python: `def maxProfit(prices):\n    dp10, dp11 = 0, float('-inf')\n    dp20, dp21 = 0, float('-inf')\n    for p in prices:\n        dp20 = max(dp20, dp21 + p)\n        dp21 = max(dp21, dp10 - p)\n        dp10 = max(dp10, dp11 + p)\n        dp11 = max(dp11, -p)\n    return dp20\n`,
        java: `public int maxProfit(int[] prices) {\n    int dp10 = 0, dp20 = 0;\n    int dp11 = Integer.MIN_VALUE, dp21 = Integer.MIN_VALUE;\n    for (int p : prices) {\n        dp20 = Math.max(dp20, dp21 + p);\n        dp21 = Math.max(dp21, dp10 - p);\n        dp10 = Math.max(dp10, dp11 + p);\n        dp11 = Math.max(dp11, -p);\n    }\n    return dp20;\n}\n`,
        cpp: `int maxProfit(vector<int>& prices) {\n    int dp10 = 0, dp20 = 0;\n    int dp11 = INT_MIN, dp21 = INT_MIN;\n    for (int p : prices) {\n        dp20 = max(dp20, dp21 + p);\n        dp21 = max(dp21, dp10 - p);\n        dp10 = max(dp10, dp11 + p);\n        dp11 = max(dp11, -p);\n    }\n    return dp20;\n}\n`
      })
    },
    136: {
      question: '【只出现一次的数字】 使用异或的关键性质是？',
      options: ['a^a=0 且 a^0=a', 'a&a=a', 'a|a=0', '异或不满足交换律'],
      correctIndex: 0,
      explanation: '异或满足交换律/结合律，成对元素会抵消为 0，剩下的就是答案。',
      description: '给定非空整数数组，除一个元素只出现一次外，其余元素均出现两次，找出只出现一次的元素。',
      learning: baseLearning('位运算：异或消消乐', '为什么把所有数异或起来就等于答案？', '利用异或的交换律/结合律以及 a^a=0，遍历累计 xor。', ['把“出现两次”误解成其它次数', '忘记初始化为 0'], '位运算题的“魔法”来自代数性质：先写等式，再做化简。'),
      codeSnippet: snippets({
        python: `def singleNumber(nums):\n    x = 0\n    for v in nums:\n        x ^= v\n    return x\n`,
        java: `public int singleNumber(int[] nums) {\n    int x = 0;\n    for (int v : nums) x ^= v;\n    return x;\n}\n`,
        cpp: `int singleNumber(vector<int>& nums) {\n    int x = 0;\n    for (int v : nums) x ^= v;\n    return x;\n}\n`
      })
    },
    144: {
      question: '【二叉树前序遍历】 递归前序的“访问位置”是？',
      options: ['进入节点时（左右子树之前）', '左子树之后', '右子树之后', '任何时候都一样'],
      correctIndex: 0,
      explanation: '前序遍历顺序：根-左-右，所以在递归一开始就把 node.val 加入结果。',
      description: '给定二叉树 root，返回其节点值的前序遍历。',
      learning: baseLearning('树遍历：前序', '前序/中序/后序差别本质在哪里？', '递归框架不变，只是“处理当前节点”的位置不同。', ['忘记处理空节点', '结果数组作用域错误'], '遍历的三种序只是“访问时机”不同：进入、左右之间、退出。掌握框架就能一通百通。'),
      codeSnippet: snippets({
        python: `def preorderTraversal(root):\n    res = []\n    def dfs(node):\n        if not node: return\n        res.append(node.val)\n        dfs(node.left)\n        dfs(node.right)\n    dfs(root)\n    return res\n`,
        java: `public List<Integer> preorderTraversal(TreeNode root) {\n    List<Integer> res = new ArrayList<>();\n    dfs(root, res);\n    return res;\n}\nprivate void dfs(TreeNode node, List<Integer> res) {\n    if (node == null) return;\n    res.add(node.val);\n    dfs(node.left, res);\n    dfs(node.right, res);\n}\n`,
        cpp: `vector<int> preorderTraversal(TreeNode* root) {\n    vector<int> res;\n    function<void(TreeNode*)> dfs = [&](TreeNode* node){\n        if (!node) return;\n        res.push_back(node->val);\n        dfs(node->left);\n        dfs(node->right);\n    };\n    dfs(root);\n    return res;\n}\n`
      })
    },
    231: {
      question: '【2 的幂】 位运算判断 2^k 的常用式子是？',
      options: ['n>0 且 (n & (n-1)) == 0', 'n%2==1', '(n| (n-1))==0', 'n==0'],
      correctIndex: 0,
      explanation: '2 的幂二进制只有一个 1，n & (n-1) 会把最低位 1 清零，因此结果为 0。',
      description: '给定一个整数 n，判断它是否为 2 的幂。',
      learning: baseLearning('位运算：最低位 1', '为何 n&(n-1) 能去掉最低位 1？', '当 n 为 2 的幂时二进制只有一个 1；清零后为 0。', ['忘记处理 n<=0', '把 1 当作非幂'], '很多位运算套路都是围绕“最低位 1”展开：提取、消去、计数。'),
      codeSnippet: snippets({
        python: `def isPowerOfTwo(n):\n    return n > 0 and (n & (n - 1)) == 0\n`,
        java: `public boolean isPowerOfTwo(int n) {\n    return n > 0 && ( (n & (n - 1)) == 0 );\n}\n`,
        cpp: `bool isPowerOfTwo(int n) {\n    return n > 0 && ((n & (n - 1)) == 0);\n}\n`
      })
    },
    295: {
      question: '【数据流的中位数】 常用的数据结构组合是？',
      options: ['大顶堆 + 小顶堆', '单调栈', '并查集', '前缀和数组'],
      correctIndex: 0,
      explanation: '用两个堆维持左右两半：maxHeap 保存较小一半，minHeap 保存较大一半。',
      description: '设计数据结构支持 addNum 与 findMedian，在不断添加数字的数据流中实时返回中位数。',
      learning: baseLearning('堆：双堆维护中位数', '如何保持两堆元素数量平衡且顺序正确？', 'maxHeap 存左半，minHeap 存右半；保证 size 差不超过 1 且 maxHeap.top <= minHeap.top。', ['平衡步骤顺序错误', '偶数个元素时取平均'], '把“全局排序”转化为“维护中间分割点”：两堆就是动态的分割线。'),
      codeSnippet: snippets({
        python: `import heapq\n\nclass MedianFinder:\n    def __init__(self):\n        self.small = []  # max heap (neg)\n        self.large = []  # min heap\n\n    def addNum(self, num):\n        heapq.heappush(self.small, -num)\n        heapq.heappush(self.large, -heapq.heappop(self.small))\n        if len(self.large) > len(self.small):\n            heapq.heappush(self.small, -heapq.heappop(self.large))\n\n    def findMedian(self):\n        if len(self.small) > len(self.large):\n            return -self.small[0]\n        return (-self.small[0] + self.large[0]) / 2.0\n`,
        java: `class MedianFinder {\n    private PriorityQueue<Integer> small = new PriorityQueue<>((a,b)->b-a);\n    private PriorityQueue<Integer> large = new PriorityQueue<>();\n\n    public void addNum(int num) {\n        small.offer(num);\n        large.offer(small.poll());\n        if (large.size() > small.size()) {\n            small.offer(large.poll());\n        }\n    }\n\n    public double findMedian() {\n        if (small.size() > large.size()) return small.peek();\n        return (small.peek() + large.peek()) / 2.0;\n    }\n}\n`,
        cpp: `class MedianFinder {\npublic:\n    priority_queue<int> small;\n    priority_queue<int, vector<int>, greater<int>> large;\n\n    void addNum(int num) {\n        small.push(num);\n        large.push(small.top());\n        small.pop();\n        if (large.size() > small.size()) {\n            small.push(large.top());\n            large.pop();\n        }\n    }\n\n    double findMedian() {\n        if (small.size() > large.size()) return small.top();\n        return (small.top() + large.top()) / 2.0;\n    }\n};\n`
      })
    },
    567: {
      question: '【字符串的排列】 滑动窗口需要维护的核心变量是？',
      options: ['window 计数与 need 计数', '只维护 left 指针', '只维护 right 指针', '只维护排序后的字符串'],
      correctIndex: 0,
      explanation: '这是固定长度窗口：移动 right 增加计数，必要时移动 left 缩小，并比较计数是否满足。',
      description: '给定 s1 和 s2，判断 s2 是否包含 s1 的任意排列作为子串。',
      learning: baseLearning('滑动窗口：计数匹配', '如何在 O(n) 内判断某个长度窗口是否满足字符计数相同？', '维护 left/right 和 window 计数；窗口长度达到 |s1| 时比较是否匹配。', ['窗口长度控制错误', '计数更新漏掉 left 侧字符', '字符集处理不一致'], '滑窗的本质是“增量维护”：不要每个窗口都重算统计，而是进一个字符、出一个字符。'),
      codeSnippet: snippets({
        python: `def checkInclusion(s1, s2):\n    from collections import Counter\n    need = Counter(s1)\n    window = Counter()\n    left = 0\n    for right, ch in enumerate(s2):\n        window[ch] += 1\n        if right - left + 1 > len(s1):\n            out = s2[left]\n            window[out] -= 1\n            if window[out] == 0: del window[out]\n            left += 1\n        if right - left + 1 == len(s1) and window == need:\n            return True\n    return False\n`,
        java: `public boolean checkInclusion(String s1, String s2) {\n    int[] need = new int[26];\n    int[] window = new int[26];\n    for (char c : s1.toCharArray()) need[c - 'a']++;\n    int left = 0;\n    for (int right = 0; right < s2.length(); right++) {\n        window[s2.charAt(right) - 'a']++;\n        if (right - left + 1 > s1.length()) {\n            window[s2.charAt(left) - 'a']--;\n            left++;\n        }\n        if (right - left + 1 == s1.length()) {\n            boolean ok = true;\n            for (int i = 0; i < 26; i++) {\n                if (window[i] != need[i]) { ok = false; break; }\n            }\n            if (ok) return true;\n        }\n    }\n    return false;\n}\n`,
        cpp: `bool checkInclusion(string s1, string s2) {\n    vector<int> need(26,0), window(26,0);\n    for (char c: s1) need[c-'a']++;\n    int left=0;\n    for (int right=0; right<(int)s2.size(); right++) {\n        window[s2[right]-'a']++;\n        if (right-left+1 > (int)s1.size()) {\n            window[s2[left]-'a']--;\n            left++;\n        }\n        if (right-left+1 == (int)s1.size()) {\n            if (window == need) return true;\n        }\n    }\n    return false;\n}\n`
      })
    },
    876: {
      question: '【链表的中间结点】 快慢指针的步速关系是？',
      options: ['fast 每次走两步，slow 每次走一步', 'fast 每次走一步，slow 每次走两步', '两者都走两步', 'slow 不动'],
      correctIndex: 0,
      explanation: '当 fast 到达末尾，slow 正好在中点。',
      description: '给定非空单链表 head，返回链表的中间结点；若有两个中间结点返回第二个。',
      learning: baseLearning('双指针：快慢指针', '为何 fast 走两步、slow 走一步会在中点相遇？', '同时移动 fast/slow，fast 到尾时 slow 走了长度的一半。', ['偶数长度返回哪个中点', '空指针判断 fast.next'], '快慢指针是用“速度差”把一个遍历问题变成“相对运动”问题。'),
      codeSnippet: snippets({
        python: `def middleNode(head):\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n    return slow\n`,
        java: `public ListNode middleNode(ListNode head) {\n    ListNode slow = head, fast = head;\n    while (fast != null && fast.next != null) {\n        slow = slow.next;\n        fast = fast.next.next;\n    }\n    return slow;\n}\n`,
        cpp: `ListNode* middleNode(ListNode* head) {\n    ListNode* slow = head;\n    ListNode* fast = head;\n    while (fast && fast->next) {\n        slow = slow->next;\n        fast = fast->next->next;\n    }\n    return slow;\n}\n`
      })
    },
    977: {
      question: '【有序数组的平方】 为什么可以用双指针从两端向中间？',
      options: ['最大平方一定来自两端的较大绝对值', '平方会保持原排序', '必须先排序再平方', '只能用堆做 TopK'],
      correctIndex: 0,
      explanation: '因为负数平方后可能变大；两端绝对值最大，平方最大，倒序填充结果数组即可。',
      description: '给定按非递减顺序排序的整数数组 nums，返回每个数字的平方组成的新数组，要求也按非递减顺序排序。',
      learning: baseLearning('双指针：左右夹逼 + 逆向填充', '如何避免先平方后排序的 O(n log n)？', 'left/right 指向两端，比绝对值，放到结果末尾，指针向中间移动。', ['结果填充方向写反', '比较值用绝对值', '边界 left<=right'], '利用原数组的有序性：答案的“最大值”从两端产生，双指针就能线性合并。'),
      codeSnippet: snippets({
        python: `def sortedSquares(nums):\n    n = len(nums)\n    res = [0]*n\n    left, right = 0, n-1\n    pos = n-1\n    while left <= right:\n        if abs(nums[left]) > abs(nums[right]):\n            res[pos] = nums[left]*nums[left]\n            left += 1\n        else:\n            res[pos] = nums[right]*nums[right]\n            right -= 1\n        pos -= 1\n    return res\n`,
        java: `public int[] sortedSquares(int[] nums) {\n    int n = nums.length;\n    int[] res = new int[n];\n    int left = 0, right = n - 1, pos = n - 1;\n    while (left <= right) {\n        int a = nums[left], b = nums[right];\n        if (Math.abs(a) > Math.abs(b)) {\n            res[pos--] = a * a;\n            left++;\n        } else {\n            res[pos--] = b * b;\n            right--;\n        }\n    }\n    return res;\n}\n`,
        cpp: `vector<int> sortedSquares(vector<int>& nums) {\n    int n = nums.size();\n    vector<int> res(n);\n    int left = 0, right = n - 1, pos = n - 1;\n    while (left <= right) {\n        int a = nums[left], b = nums[right];\n        if (abs(a) > abs(b)) {\n            res[pos--] = a * a;\n            left++;\n        } else {\n            res[pos--] = b * b;\n            right--;\n        }\n    }\n    return res;\n}\n`
      })
    },
  };

  if (defs[leetcodeId]) return { ...common, ...defs[leetcodeId] };

  // Remaining ids: 264,304,370,518,701
  if (leetcodeId === 264) {
    return {
      ...common,
      question: '【丑数 II】 求第 n 个丑数的常用方法是？',
      options: ['三指针 DP 合并有序序列', '二分查找答案', '并查集', '单调栈'],
      correctIndex: 0,
      explanation: '用指针 i2/i3/i5 生成下一个最小丑数，避免重复。',
      xp: 18,
      learning: baseLearning('DP：多路归并（指针）', '如何在不排序的情况下生成递增丑数序列？', 'dp[0]=1，维护 i2/i3/i5 指向下一个候选；每次取最小并推进对应指针。', ['重复值要同时推进多个指针', 'n 从 1 开始'], '这类题的本质是“合并多个有序生成器”，指针就是生成器的游标。'),
      codeSnippet: snippets({
        python: `def nthUglyNumber(n):\n    dp = [0]*n\n    dp[0] = 1\n    i2 = i3 = i5 = 0\n    for i in range(1, n):\n        a, b, c = dp[i2]*2, dp[i3]*3, dp[i5]*5\n        dp[i] = min(a, b, c)\n        if dp[i] == a: i2 += 1\n        if dp[i] == b: i3 += 1\n        if dp[i] == c: i5 += 1\n    return dp[-1]\n`,
        java: `public int nthUglyNumber(int n) {\n    int[] dp = new int[n];\n    dp[0] = 1;\n    int i2 = 0, i3 = 0, i5 = 0;\n    for (int i = 1; i < n; i++) {\n        int a = dp[i2] * 2, b = dp[i3] * 3, c = dp[i5] * 5;\n        int v = Math.min(a, Math.min(b, c));\n        dp[i] = v;\n        if (v == a) i2++;\n        if (v == b) i3++;\n        if (v == c) i5++;\n    }\n    return dp[n-1];\n}\n`,
        cpp: `int nthUglyNumber(int n) {\n    vector<int> dp(n);\n    dp[0] = 1;\n    int i2=0, i3=0, i5=0;\n    for (int i=1;i<n;i++){\n        int a=dp[i2]*2, b=dp[i3]*3, c=dp[i5]*5;\n        int v=min(a, min(b,c));\n        dp[i]=v;\n        if (v==a) i2++;\n        if (v==b) i3++;\n        if (v==c) i5++;\n    }\n    return dp[n-1];\n}\n`
      })
    };
  }

  if (leetcodeId === 304) {
    return {
      ...common,
      question: '【二维区域和检索】 构建二维前缀和的核心公式是？',
      options: ['sum = A+B-C+D（包含-排除）', '只累加行前缀', '只累加列前缀', '用并查集维护区域'],
      correctIndex: 0,
      explanation: '二维前缀和用 inclusion-exclusion：S[i][j] = S[i-1][j]+S[i][j-1]-S[i-1][j-1]+matrix[i][j]。',
      description: '给定二维矩阵，预处理后支持多次查询任意子矩形的元素和。',
      learning: baseLearning('前缀和：二维（包含-排除）', '子矩形求和如何从 O(mn) 降到 O(1)？', '预处理 prefix，查询用四个角包含-排除。', ['下标偏移（多开一行一列）', '把减法写错导致重复计算'], '前缀和的精髓是“把重复累加提前做一次”，查询就变成常数次运算。'),
      codeSnippet: snippets({
        python: `class NumMatrix:\n    def __init__(self, matrix):\n        m = len(matrix)\n        n = len(matrix[0]) if m else 0\n        self.pre = [[0]*(n+1) for _ in range(m+1)]\n        for i in range(m):\n            for j in range(n):\n                self.pre[i+1][j+1] = self.pre[i][j+1] + self.pre[i+1][j] - self.pre[i][j] + matrix[i][j]\n\n    def sumRegion(self, r1, c1, r2, c2):\n        p = self.pre\n        return p[r2+1][c2+1] - p[r1][c2+1] - p[r2+1][c1] + p[r1][c1]\n`,
        java: `class NumMatrix {\n    int[][] pre;\n    public NumMatrix(int[][] matrix) {\n        int m = matrix.length;\n        int n = m == 0 ? 0 : matrix[0].length;\n        pre = new int[m+1][n+1];\n        for (int i = 0; i < m; i++) {\n            for (int j = 0; j < n; j++) {\n                pre[i+1][j+1] = pre[i][j+1] + pre[i+1][j] - pre[i][j] + matrix[i][j];\n            }\n        }\n    }\n    public int sumRegion(int r1, int c1, int r2, int c2) {\n        return pre[r2+1][c2+1] - pre[r1][c2+1] - pre[r2+1][c1] + pre[r1][c1];\n    }\n}\n`,
        cpp: `class NumMatrix {\npublic:\n    vector<vector<int>> pre;\n    NumMatrix(vector<vector<int>>& matrix) {\n        int m = matrix.size();\n        int n = m? matrix[0].size():0;\n        pre.assign(m+1, vector<int>(n+1, 0));\n        for (int i=0;i<m;i++){\n            for (int j=0;j<n;j++){\n                pre[i+1][j+1] = pre[i][j+1] + pre[i+1][j] - pre[i][j] + matrix[i][j];\n            }\n        }\n    }\n    int sumRegion(int r1, int c1, int r2, int c2) {\n        return pre[r2+1][c2+1] - pre[r1][c2+1] - pre[r2+1][c1] + pre[r1][c1];\n    }\n};\n`
      })
    };
  }

  if (leetcodeId === 370) {
    return {
      ...common,
      question: '【区间加法】 差分数组 diff 的含义是？',
      options: ['diff[i] = nums[i] - nums[i-1]', 'diff 只记录最大值', 'diff 记录前缀和', 'diff 用来二分查找'],
      correctIndex: 0,
      explanation: '对区间 [l,r] 加 val：diff[l]+=val, diff[r+1]-=val，最后对 diff 求前缀和还原。',
      description: '给定长度为 length 的数组初始为 0，多次对区间 [start,end] 加上增量，返回最终数组。',
      learning: baseLearning('差分数组：区间更新', '为什么两处修改就能表示整个区间的加法？', 'diff 记录相邻差值；区间加法在边界产生变化；最后前缀还原。', ['r+1 越界处理', '忘记最后还原前缀和'], '差分的本质是把“影响一段区间”变成“只在边界产生变化”。'),
      codeSnippet: snippets({
        python: `def getModifiedArray(length, updates):\n    diff = [0]*(length+1)\n    for l, r, val in updates:\n        diff[l] += val\n        if r + 1 < length:\n            diff[r+1] -= val\n    res = [0]*length\n    cur = 0\n    for i in range(length):\n        cur += diff[i]\n        res[i] = cur\n    return res\n`,
        java: `public int[] getModifiedArray(int length, int[][] updates) {\n    int[] diff = new int[length + 1];\n    for (int[] u : updates) {\n        int l = u[0], r = u[1], val = u[2];\n        diff[l] += val;\n        if (r + 1 < length) diff[r + 1] -= val;\n    }\n    int[] res = new int[length];\n    int cur = 0;\n    for (int i = 0; i < length; i++) {\n        cur += diff[i];\n        res[i] = cur;\n    }\n    return res;\n}\n`,
        cpp: `vector<int> getModifiedArray(int length, vector<vector<int>>& updates) {\n    vector<int> diff(length+1, 0);\n    for (auto &u : updates) {\n        int l=u[0], r=u[1], val=u[2];\n        diff[l] += val;\n        if (r + 1 < length) diff[r+1] -= val;\n    }\n    vector<int> res(length);\n    int cur=0;\n    for (int i=0;i<length;i++){\n        cur += diff[i];\n        res[i]=cur;\n    }\n    return res;\n}\n`
      })
    };
  }

  if (leetcodeId === 518) {
    return {
      ...common,
      question: '【零钱兑换 II】 组合数（不限次数）背包的遍历顺序是？',
      options: ['先遍历 coin 再遍历金额', '先遍历金额再遍历 coin', '只能 DFS', '必须排序后双指针'],
      correctIndex: 0,
      explanation: '组合数避免排列重复：外层 coin，内层 amount 从 coin 到 target 递增。',
      description: '给定硬币面额 coins 与总金额 amount，计算可以凑成 amount 的组合数（每种硬币可无限使用）。',
      learning: baseLearning('DP：完全背包（组合数）', '为什么外层遍历 coin 能避免把同一组合当成不同排列？', 'dp[j] 表示凑成金额 j 的组合数；对 coin 递增更新 dp。', ['把组合写成排列导致重复计数', '金额循环方向写反'], '背包的遍历顺序决定“去重口径”：外层 coin = 组合，外层金额 = 排列。'),
      codeSnippet: snippets({
        python: `def change(amount, coins):\n    dp = [0]*(amount+1)\n    dp[0] = 1\n    for coin in coins:\n        for j in range(coin, amount+1):\n            dp[j] += dp[j-coin]\n    return dp[amount]\n`,
        java: `public int change(int amount, int[] coins) {\n    int[] dp = new int[amount + 1];\n    dp[0] = 1;\n    for (int coin : coins) {\n        for (int j = coin; j <= amount; j++) {\n            dp[j] += dp[j - coin];\n        }\n    }\n    return dp[amount];\n}\n`,
        cpp: `int change(int amount, vector<int>& coins) {\n    vector<int> dp(amount+1, 0);\n    dp[0] = 1;\n    for (int coin : coins) {\n        for (int j = coin; j <= amount; j++) {\n            dp[j] += dp[j-coin];\n        }\n    }\n    return dp[amount];\n}\n`
      })
    };
  }

  if (leetcodeId === 701) {
    return {
      ...common,
      question: '【BST 插入】 插入操作的递归方向由什么决定？',
      options: ['与当前节点值比较大小', '树的高度', '节点个数奇偶', '中序遍历序号'],
      correctIndex: 0,
      explanation: 'BST 性质：val < node.val 去左子树，否则去右子树，直到空位置挂新节点。',
      description: '给定二叉搜索树 root 与插入值 val，返回插入后的 BST 根节点。',
      learning: baseLearning('BST：利用有序性递归定位', '如何根据 BST 性质把搜索空间缩小到一条路径？', '比较 val 与 node.val，递归到左/右子树，空节点处创建新节点。', ['忘记返回 root', '等于时放哪边不一致'], 'BST 的所有操作都像“二分”：每一步都能排除一半子树。'),
      codeSnippet: snippets({
        python: `def insertIntoBST(root, val):\n    if not root:\n        return TreeNode(val)\n    if val < root.val:\n        root.left = insertIntoBST(root.left, val)\n    else:\n        root.right = insertIntoBST(root.right, val)\n    return root\n`,
        java: `public TreeNode insertIntoBST(TreeNode root, int val) {\n    if (root == null) return new TreeNode(val);\n    if (val < root.val) root.left = insertIntoBST(root.left, val);\n    else root.right = insertIntoBST(root.right, val);\n    return root;\n}\n`,
        cpp: `TreeNode* insertIntoBST(TreeNode* root, int val) {\n    if (!root) return new TreeNode(val);\n    if (val < root->val) root->left = insertIntoBST(root->left, val);\n    else root->right = insertIntoBST(root->right, val);\n    return root;\n}\n`
      })
    };
  }

  throw new Error(`Unhandled leetcodeId=${leetcodeId}`);
}

// Append and write
questions.push(...newQuestions);

fs.writeFileSync(questionsPath, 'module.exports = ' + JSON.stringify(questions, null, 2) + ';\n', 'utf8');
fs.writeFileSync(slugToIdPath, JSON.stringify(slugToId, null, 2) + '\n', 'utf8');

console.log(`added ${newQuestions.length} question(s). total now=${questions.length}`);
