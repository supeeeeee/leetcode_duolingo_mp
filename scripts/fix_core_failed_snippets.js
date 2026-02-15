/*
  Fix codeSnippet implementations for core questions that failed core test harness.

  Targets:
  - merge-two-sorted-lists
  - linked-list-cycle
  - linked-list-cycle-ii
  - largest-rectangle-in-histogram
  - validate-binary-search-tree
  - number-of-islands
  - course-schedule
  - permutations
  - n-queens
  - find-minimum-in-rotated-sorted-array

  Usage:
    node scripts/fix_core_failed_snippets.js
*/

const fs = require('fs');
const path = require('path');

const questionsPath = path.join(__dirname, '..', 'miniprogram', 'data', 'questions.js');
const questions = require(questionsPath);

const fixes = {
  'merge-two-sorted-lists': {
    python: `def mergeTwoLists(l1, l2):\n    dummy = ListNode(0)\n    cur = dummy\n    while l1 and l2:\n        if l1.val <= l2.val:\n            cur.next = l1\n            l1 = l1.next\n        else:\n            cur.next = l2\n            l2 = l2.next\n        cur = cur.next\n    cur.next = l1 if l1 else l2\n    return dummy.next\n`,
    java: `public ListNode mergeTwoLists(ListNode l1, ListNode l2) {\n    ListNode dummy = new ListNode(0);\n    ListNode cur = dummy;\n    while (l1 != null && l2 != null) {\n        if (l1.val <= l2.val) {\n            cur.next = l1;\n            l1 = l1.next;\n        } else {\n            cur.next = l2;\n            l2 = l2.next;\n        }\n        cur = cur.next;\n    }\n    cur.next = (l1 != null) ? l1 : l2;\n    return dummy.next;\n}\n`,
    cpp: `ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {\n    ListNode dummy(0);\n    ListNode* cur = &dummy;\n    while (l1 && l2) {\n        if (l1->val <= l2->val) {\n            cur->next = l1;\n            l1 = l1->next;\n        } else {\n            cur->next = l2;\n            l2 = l2->next;\n        }\n        cur = cur->next;\n    }\n    cur->next = l1 ? l1 : l2;\n    return dummy.next;\n}\n`
  },

  'linked-list-cycle': {
    python: `def hasCycle(head):\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n        if slow is fast:\n            return True\n    return False\n`,
    java: `public boolean hasCycle(ListNode head) {\n    ListNode slow = head, fast = head;\n    while (fast != null && fast.next != null) {\n        slow = slow.next;\n        fast = fast.next.next;\n        if (slow == fast) return true;\n    }\n    return false;\n}\n`,
    cpp: `bool hasCycle(ListNode* head) {\n    ListNode* slow = head;\n    ListNode* fast = head;\n    while (fast && fast->next) {\n        slow = slow->next;\n        fast = fast->next->next;\n        if (slow == fast) return true;\n    }\n    return false;\n}\n`
  },

  'linked-list-cycle-ii': {
    python: `def detectCycle(head):\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n        if slow is fast:\n            p = head\n            while p is not slow:\n                p = p.next\n                slow = slow.next\n            return p\n    return None\n`,
    java: `public ListNode detectCycle(ListNode head) {\n    ListNode slow = head, fast = head;\n    while (fast != null && fast.next != null) {\n        slow = slow.next;\n        fast = fast.next.next;\n        if (slow == fast) {\n            ListNode p = head;\n            while (p != slow) {\n                p = p.next;\n                slow = slow.next;\n            }\n            return p;\n        }\n    }\n    return null;\n}\n`,
    cpp: `ListNode* detectCycle(ListNode* head) {\n    ListNode* slow = head;\n    ListNode* fast = head;\n    while (fast && fast->next) {\n        slow = slow->next;\n        fast = fast->next->next;\n        if (slow == fast) {\n            ListNode* p = head;\n            while (p != slow) {\n                p = p->next;\n                slow = slow->next;\n            }\n            return p;\n        }\n    }\n    return nullptr;\n}\n`
  },

  'largest-rectangle-in-histogram': {
    python: `def largestRectangleArea(heights):\n    st = []\n    ans = 0\n    heights.append(0)\n    for i, h in enumerate(heights):\n        while st and heights[st[-1]] > h:\n            height = heights[st.pop()]\n            left = st[-1] + 1 if st else 0\n            width = i - left\n            ans = max(ans, height * width)\n        st.append(i)\n    heights.pop()\n    return ans\n`,
    java: `public int largestRectangleArea(int[] heights) {\n    Deque<Integer> st = new ArrayDeque<>();\n    int n = heights.length;\n    int ans = 0;\n    for (int i = 0; i <= n; i++) {\n        int h = (i == n) ? 0 : heights[i];\n        while (!st.isEmpty() && heights[st.peek()] > h) {\n            int height = heights[st.pop()];\n            int left = st.isEmpty() ? 0 : st.peek() + 1;\n            int width = i - left;\n            ans = Math.max(ans, height * width);\n        }\n        st.push(i);\n    }\n    return ans;\n}\n`,
    cpp: `int largestRectangleArea(vector<int>& heights) {\n    vector<int> st;\n    int ans = 0;\n    heights.push_back(0);\n    for (int i = 0; i < (int)heights.size(); i++) {\n        while (!st.empty() && heights[st.back()] > heights[i]) {\n            int height = heights[st.back()];\n            st.pop_back();\n            int left = st.empty() ? 0 : st.back() + 1;\n            int width = i - left;\n            ans = max(ans, height * width);\n        }\n        st.push_back(i);\n    }\n    heights.pop_back();\n    return ans;\n}\n`
  },

  'validate-binary-search-tree': {
    python: `def isValidBST(root):\n    prev = None\n    def inorder(node):\n        nonlocal prev\n        if not node: return True\n        if not inorder(node.left): return False\n        if prev is not None and node.val <= prev: return False\n        prev = node.val\n        return inorder(node.right)\n    return inorder(root)\n`,
    java: `public boolean isValidBST(TreeNode root) {\n    return inorder(root, new long[]{Long.MIN_VALUE});\n}\nprivate boolean inorder(TreeNode node, long[] prev) {\n    if (node == null) return true;\n    if (!inorder(node.left, prev)) return false;\n    if (node.val <= prev[0]) return false;\n    prev[0] = node.val;\n    return inorder(node.right, prev);\n}\n`,
    cpp: `bool isValidBST(TreeNode* root) {\n    long long prev = LLONG_MIN;\n    function<bool(TreeNode*)> dfs = [&](TreeNode* node){\n        if (!node) return true;\n        if (!dfs(node->left)) return false;\n        if ((long long)node->val <= prev) return false;\n        prev = node->val;\n        return dfs(node->right);\n    };\n    return dfs(root);\n}\n`
  },

  'number-of-islands': {
    python: `def numIslands(grid):\n    if not grid: return 0\n    m, n = len(grid), len(grid[0])\n    def dfs(i, j):\n        if i < 0 or i >= m or j < 0 or j >= n or grid[i][j] != '1':\n            return\n        grid[i][j] = '0'\n        dfs(i+1, j); dfs(i-1, j); dfs(i, j+1); dfs(i, j-1)\n    ans = 0\n    for i in range(m):\n        for j in range(n):\n            if grid[i][j] == '1':\n                ans += 1\n                dfs(i, j)\n    return ans\n`,
    java: `public int numIslands(char[][] grid) {\n    int m = grid.length;\n    if (m == 0) return 0;\n    int n = grid[0].length;\n    int ans = 0;\n    for (int i = 0; i < m; i++) {\n        for (int j = 0; j < n; j++) {\n            if (grid[i][j] == '1') {\n                ans++;\n                dfs(grid, i, j);\n            }\n        }\n    }\n    return ans;\n}\nprivate void dfs(char[][] g, int i, int j) {\n    int m=g.length, n=g[0].length;\n    if (i<0||i>=m||j<0||j>=n||g[i][j]!='1') return;\n    g[i][j]='0';\n    dfs(g,i+1,j); dfs(g,i-1,j); dfs(g,i,j+1); dfs(g,i,j-1);\n}\n`,
    cpp: `int numIslands(vector<vector<char>>& grid) {\n    int m = grid.size();\n    if (!m) return 0;\n    int n = grid[0].size();\n    function<void(int,int)> dfs = [&](int i,int j){\n        if (i<0||i>=m||j<0||j>=n||grid[i][j] != '1') return;\n        grid[i][j] = '0';\n        dfs(i+1,j); dfs(i-1,j); dfs(i,j+1); dfs(i,j-1);\n    };\n    int ans=0;\n    for(int i=0;i<m;i++) for(int j=0;j<n;j++) if(grid[i][j]=='1'){ans++; dfs(i,j);} \n    return ans;\n}\n`
  },

  'course-schedule': {
    python: `def canFinish(numCourses, prerequisites):\n    from collections import deque\n    graph = [[] for _ in range(numCourses)]\n    indeg = [0]*numCourses\n    for a,b in prerequisites:\n        graph[b].append(a)\n        indeg[a] += 1\n    q = deque([i for i in range(numCourses) if indeg[i]==0])\n    taken = 0\n    while q:\n        x = q.popleft()\n        taken += 1\n        for y in graph[x]:\n            indeg[y] -= 1\n            if indeg[y] == 0:\n                q.append(y)\n    return taken == numCourses\n`,
    java: `public boolean canFinish(int numCourses, int[][] prerequisites) {\n    List<List<Integer>> graph = new ArrayList<>();\n    for (int i = 0; i < numCourses; i++) graph.add(new ArrayList<>());\n    int[] indeg = new int[numCourses];\n    for (int[] p : prerequisites) {\n        int a = p[0], b = p[1];\n        graph.get(b).add(a);\n        indeg[a]++;\n    }\n    Deque<Integer> q = new ArrayDeque<>();\n    for (int i = 0; i < numCourses; i++) if (indeg[i] == 0) q.add(i);\n    int taken = 0;\n    while (!q.isEmpty()) {\n        int x = q.poll();\n        taken++;\n        for (int y : graph.get(x)) {\n            if (--indeg[y] == 0) q.add(y);\n        }\n    }\n    return taken == numCourses;\n}\n`,
    cpp: `bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {\n    vector<vector<int>> graph(numCourses);\n    vector<int> indeg(numCourses, 0);\n    for (auto &p : prerequisites) {\n        int a=p[0], b=p[1];\n        graph[b].push_back(a);\n        indeg[a]++;\n    }\n    queue<int> q;\n    for (int i=0;i<numCourses;i++) if (indeg[i]==0) q.push(i);\n    int taken=0;\n    while(!q.empty()) {\n        int x=q.front(); q.pop();\n        taken++;\n        for (int y: graph[x]) {\n            if (--indeg[y]==0) q.push(y);\n        }\n    }\n    return taken==numCourses;\n}\n`
  },

  'permutations': {
    python: `def permute(nums):\n    res = []\n    used = [False]*len(nums)\n    path = []\n    def backtrack():\n        if len(path) == len(nums):\n            res.append(path[:])\n            return\n        for i, x in enumerate(nums):\n            if used[i]:\n                continue\n            used[i] = True\n            path.append(x)\n            backtrack()\n            path.pop()\n            used[i] = False\n    backtrack()\n    return res\n`,
    java: `public List<List<Integer>> permute(int[] nums) {\n    List<List<Integer>> res = new ArrayList<>();\n    boolean[] used = new boolean[nums.length];\n    List<Integer> path = new ArrayList<>();\n    backtrack(nums, used, path, res);\n    return res;\n}\nprivate void backtrack(int[] nums, boolean[] used, List<Integer> path, List<List<Integer>> res) {\n    if (path.size() == nums.length) {\n        res.add(new ArrayList<>(path));\n        return;\n    }\n    for (int i = 0; i < nums.length; i++) {\n        if (used[i]) continue;\n        used[i] = true;\n        path.add(nums[i]);\n        backtrack(nums, used, path, res);\n        path.remove(path.size() - 1);\n        used[i] = false;\n    }\n}\n`,
    cpp: `vector<vector<int>> permute(vector<int>& nums) {\n    vector<vector<int>> res;\n    vector<int> path;\n    vector<int> used(nums.size(), 0);\n    function<void()> dfs = [&](){\n        if (path.size() == nums.size()) {\n            res.push_back(path);\n            return;\n        }\n        for (int i=0;i<(int)nums.size();i++){\n            if (used[i]) continue;\n            used[i]=1;\n            path.push_back(nums[i]);\n            dfs();\n            path.pop_back();\n            used[i]=0;\n        }\n    };\n    dfs();\n    return res;\n}\n`
  },

  'n-queens': {
    python: `def solveNQueens(n):\n    res = []\n    cols = set()\n    diag1 = set()  # r-c\n    diag2 = set()  # r+c\n    board = [['.']*n for _ in range(n)]\n    def backtrack(r):\n        if r == n:\n            res.append([''.join(row) for row in board])\n            return\n        for c in range(n):\n            if c in cols or (r-c) in diag1 or (r+c) in diag2:\n                continue\n            cols.add(c); diag1.add(r-c); diag2.add(r+c)\n            board[r][c] = 'Q'\n            backtrack(r+1)\n            board[r][c] = '.'\n            cols.remove(c); diag1.remove(r-c); diag2.remove(r+c)\n    backtrack(0)\n    return res\n`,
    java: `public List<List<String>> solveNQueens(int n) {\n    List<List<String>> res = new ArrayList<>();\n    boolean[] cols = new boolean[n];\n    boolean[] diag1 = new boolean[2*n];\n    boolean[] diag2 = new boolean[2*n];\n    char[][] board = new char[n][n];\n    for (int i=0;i<n;i++) Arrays.fill(board[i], '.');\n    backtrack(0, n, cols, diag1, diag2, board, res);\n    return res;\n}\nprivate void backtrack(int r, int n, boolean[] cols, boolean[] d1, boolean[] d2, char[][] board, List<List<String>> res) {\n    if (r == n) {\n        List<String> one = new ArrayList<>();\n        for (int i=0;i<n;i++) one.add(new String(board[i]));\n        res.add(one);\n        return;\n    }\n    for (int c=0;c<n;c++) {\n        int i1 = r - c + n;\n        int i2 = r + c;\n        if (cols[c] || d1[i1] || d2[i2]) continue;\n        cols[c] = d1[i1] = d2[i2] = true;\n        board[r][c] = 'Q';\n        backtrack(r+1, n, cols, d1, d2, board, res);\n        board[r][c] = '.';\n        cols[c] = d1[i1] = d2[i2] = false;\n    }\n}\n`,
    cpp: `vector<vector<string>> solveNQueens(int n) {\n    vector<vector<string>> res;\n    vector<string> board(n, string(n, '.'));\n    vector<int> col(n,0), d1(2*n,0), d2(2*n,0);\n    function<void(int)> dfs = [&](int r){\n        if (r==n){ res.push_back(board); return; }\n        for(int c=0;c<n;c++){\n            int i1=r-c+n, i2=r+c;\n            if(col[c]||d1[i1]||d2[i2]) continue;\n            col[c]=d1[i1]=d2[i2]=1;\n            board[r][c]='Q';\n            dfs(r+1);\n            board[r][c]='.';\n            col[c]=d1[i1]=d2[i2]=0;\n        }\n    };\n    dfs(0);\n    return res;\n}\n`
  },

  'find-minimum-in-rotated-sorted-array': {
    python: `def findMin(nums):\n    l, r = 0, len(nums) - 1\n    while l < r:\n        mid = (l + r) // 2\n        if nums[mid] > nums[r]:\n            l = mid + 1\n        else:\n            r = mid\n    return nums[l]\n`,
    java: `public int findMin(int[] nums) {\n    int l = 0, r = nums.length - 1;\n    while (l < r) {\n        int mid = l + (r - l) / 2;\n        if (nums[mid] > nums[r]) l = mid + 1;\n        else r = mid;\n    }\n    return nums[l];\n}\n`,
    cpp: `int findMin(vector<int>& nums) {\n    int l=0, r=(int)nums.size()-1;\n    while (l<r) {\n        int mid = l + (r-l)/2;\n        if (nums[mid] > nums[r]) l = mid + 1;\n        else r = mid;\n    }\n    return nums[l];\n}\n`
  },
};

let patched = 0;
let missing = [];
for (const q of questions) {
  const fix = fixes[q.leetcodeSlug];
  if (!fix) continue;
  q.codeSnippet = { python: fix.python, java: fix.java, cpp: fix.cpp };
  patched++;
}

fs.writeFileSync(questionsPath, 'module.exports = ' + JSON.stringify(questions, null, 2) + ';\n', 'utf8');
console.log(JSON.stringify({ patched, missing }, null, 2));
