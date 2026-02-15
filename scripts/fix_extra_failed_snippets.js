/*
  Fix codeSnippet implementations for EXTRA questions that failed extra test harness.

  Usage:
    node scripts/fix_extra_failed_snippets.js
*/

const fs = require('fs');
const path = require('path');

const questionsPath = path.join(__dirname, '..', 'miniprogram', 'data', 'questions.js');
const questions = require(questionsPath);

const fixes = {
  'balanced-binary-tree': {
    python: `def isBalanced(root):\n    def height(node):\n        if not node:\n            return 0\n        lh = height(node.left)\n        if lh == -1:\n            return -1\n        rh = height(node.right)\n        if rh == -1:\n            return -1\n        if abs(lh - rh) > 1:\n            return -1\n        return 1 + max(lh, rh)\n    return height(root) != -1\n`,
    java: `public boolean isBalanced(TreeNode root) {\n    return height(root) != -1;\n}\nprivate int height(TreeNode node) {\n    if (node == null) return 0;\n    int lh = height(node.left);\n    if (lh == -1) return -1;\n    int rh = height(node.right);\n    if (rh == -1) return -1;\n    if (Math.abs(lh - rh) > 1) return -1;\n    return 1 + Math.max(lh, rh);\n}\n`,
    cpp: `bool isBalanced(TreeNode* root) {\n    function<int(TreeNode*)> h = [&](TreeNode* node){\n        if (!node) return 0;\n        int lh = h(node->left);\n        if (lh == -1) return -1;\n        int rh = h(node->right);\n        if (rh == -1) return -1;\n        if (abs(lh - rh) > 1) return -1;\n        return 1 + max(lh, rh);\n    };\n    return h(root) != -1;\n}\n`
  },

  'binary-tree-level-order-traversal': {
    python: `def levelOrder(root):\n    if not root:\n        return []\n    res = []\n    q = [root]\n    while q:\n        level = []\n        for _ in range(len(q)):\n            node = q.pop(0)\n            level.append(node.val)\n            if node.left: q.append(node.left)\n            if node.right: q.append(node.right)\n        res.append(level)\n    return res\n`,
    java: `public List<List<Integer>> levelOrder(TreeNode root) {\n    List<List<Integer>> res = new ArrayList<>();\n    if (root == null) return res;\n    Deque<TreeNode> q = new ArrayDeque<>();\n    q.add(root);\n    while (!q.isEmpty()) {\n        int sz = q.size();\n        List<Integer> level = new ArrayList<>();\n        for (int i=0;i<sz;i++) {\n            TreeNode node = q.poll();\n            level.add(node.val);\n            if (node.left != null) q.add(node.left);\n            if (node.right != null) q.add(node.right);\n        }\n        res.add(level);\n    }\n    return res;\n}\n`,
    cpp: `vector<vector<int>> levelOrder(TreeNode* root) {\n    vector<vector<int>> res;\n    if (!root) return res;\n    queue<TreeNode*> q;\n    q.push(root);\n    while(!q.empty()) {\n        int sz = q.size();\n        vector<int> level;\n        for(int i=0;i<sz;i++){\n            auto node=q.front(); q.pop();\n            level.push_back(node->val);\n            if(node->left) q.push(node->left);\n            if(node->right) q.push(node->right);\n        }\n        res.push_back(level);\n    }\n    return res;\n}\n`
  },

  'daily-temperatures': {
    python: `def dailyTemperatures(temperatures):\n    n = len(temperatures)\n    res = [0]*n\n    st = []  # indices, temps decreasing\n    for i, t in enumerate(temperatures):\n        while st and temperatures[st[-1]] < t:\n            j = st.pop()\n            res[j] = i - j\n        st.append(i)\n    return res\n`,
    java: `public int[] dailyTemperatures(int[] temperatures) {\n    int n = temperatures.length;\n    int[] res = new int[n];\n    Deque<Integer> st = new ArrayDeque<>();\n    for (int i=0;i<n;i++) {\n        while (!st.isEmpty() && temperatures[st.peek()] < temperatures[i]) {\n            int j = st.pop();\n            res[j] = i - j;\n        }\n        st.push(i);\n    }\n    return res;\n}\n`,
    cpp: `vector<int> dailyTemperatures(vector<int>& temperatures) {\n    int n = temperatures.size();\n    vector<int> res(n,0);\n    vector<int> st;\n    for(int i=0;i<n;i++){\n        while(!st.empty() && temperatures[st.back()] < temperatures[i]){\n            int j=st.back(); st.pop_back();\n            res[j]=i-j;\n        }\n        st.push_back(i);\n    }\n    return res;\n}\n`
  },

  'decode-string': {
    python: `def decodeString(s):\n    st = []\n    cur = ''\n    k = 0\n    for ch in s:\n        if ch.isdigit():\n            k = k*10 + int(ch)\n        elif ch == '[':\n            st.append((cur, k))\n            cur = ''\n            k = 0\n        elif ch == ']':\n            prev, num = st.pop()\n            cur = prev + cur * num\n        else:\n            cur += ch\n    return cur\n`,
    java: `public String decodeString(String s) {\n    Deque<int[]> numSt = new ArrayDeque<>();\n    Deque<StringBuilder> strSt = new ArrayDeque<>();\n    StringBuilder cur = new StringBuilder();\n    int k = 0;\n    for (char ch : s.toCharArray()) {\n        if (Character.isDigit(ch)) {\n            k = k*10 + (ch - '0');\n        } else if (ch == '[') {\n            numSt.push(new int[]{k});\n            strSt.push(cur);\n            cur = new StringBuilder();\n            k = 0;\n        } else if (ch == ']') {\n            int num = numSt.pop()[0];\n            StringBuilder prev = strSt.pop();\n            for (int i=0;i<num;i++) prev.append(cur);\n            cur = prev;\n        } else {\n            cur.append(ch);\n        }\n    }\n    return cur.toString();\n}\n`,
    cpp: `string decodeString(string s) {\n    vector<pair<string,int>> st;\n    string cur;\n    int k=0;\n    for(char ch: s){\n        if(isdigit(ch)) k = k*10 + (ch-'0');\n        else if(ch=='['){\n            st.push_back({cur,k});\n            cur.clear();\n            k=0;\n        } else if(ch==']'){\n            auto [prev,num]=st.back(); st.pop_back();\n            string tmp;\n            for(int i=0;i<num;i++) tmp += cur;\n            cur = prev + tmp;\n        } else cur.push_back(ch);\n    }\n    return cur;\n}\n`
  },

  'diameter-of-binary-tree': {
    python: `def diameterOfBinaryTree(root):\n    ans = 0\n    def depth(node):\n        nonlocal ans\n        if not node:\n            return 0\n        l = depth(node.left)\n        r = depth(node.right)\n        ans = max(ans, l + r)\n        return 1 + max(l, r)\n    depth(root)\n    return ans\n`,
    java: `public int diameterOfBinaryTree(TreeNode root) {\n    int[] ans = new int[1];\n    depth(root, ans);\n    return ans[0];\n}\nprivate int depth(TreeNode node, int[] ans) {\n    if (node == null) return 0;\n    int l = depth(node.left, ans);\n    int r = depth(node.right, ans);\n    ans[0] = Math.max(ans[0], l + r);\n    return 1 + Math.max(l, r);\n}\n`,
    cpp: `int diameterOfBinaryTree(TreeNode* root) {\n    int ans=0;\n    function<int(TreeNode*)> d = [&](TreeNode* node){\n        if(!node) return 0;\n        int l=d(node->left), r=d(node->right);\n        ans=max(ans,l+r);\n        return 1+max(l,r);\n    };\n    d(root);\n    return ans;\n}\n`
  },

  'evaluate-reverse-polish-notation': {
    python: `def evalRPN(tokens):\n    st = []\n    for t in tokens:\n        if t in ['+','-','*','/']:\n            b = st.pop()\n            a = st.pop()\n            if t == '+': st.append(a+b)\n            elif t == '-': st.append(a-b)\n            elif t == '*': st.append(a*b)\n            else: st.append(int(a/b))\n        else:\n            st.append(int(t))\n    return st[-1]\n`,
    java: `public int evalRPN(String[] tokens) {\n    Deque<Integer> st = new ArrayDeque<>();\n    for (String t : tokens) {\n        if (t.equals("+") || t.equals("-") || t.equals("*") || t.equals("/")) {\n            int b = st.pop();\n            int a = st.pop();\n            if (t.equals("+")) st.push(a + b);\n            else if (t.equals("-")) st.push(a - b);\n            else if (t.equals("*")) st.push(a * b);\n            else st.push(a / b);\n        } else {\n            st.push(Integer.parseInt(t));\n        }\n    }\n    return st.peek();\n}\n`,
    cpp: `int evalRPN(vector<string>& tokens) {\n    vector<long long> st;\n    for (auto &t: tokens) {\n        if (t=="+"||t=="-"||t=="*"||t=="/") {\n            long long b=st.back(); st.pop_back();\n            long long a=st.back(); st.pop_back();\n            if (t=="+") st.push_back(a+b);\n            else if (t=="-") st.push_back(a-b);\n            else if (t=="*") st.push_back(a*b);\n            else st.push_back(a/b);\n        } else st.push_back(stoll(t));\n    }\n    return (int)st.back();\n}\n`
  },

  'find-first-and-last-position-of-element-in-sorted-array': {
    python: `def searchRange(nums, target):\n    def lower(x):\n        l, r = 0, len(nums)\n        while l < r:\n            m = (l + r) // 2\n            if nums[m] < x:\n                l = m + 1\n            else:\n                r = m\n        return l\n    l = lower(target)\n    r = lower(target + 1) - 1\n    if l <= r and l < len(nums) and nums[l] == target:\n        return [l, r]\n    return [-1, -1]\n`,
    java: `public int[] searchRange(int[] nums, int target) {\n    int l = lower(nums, target);\n    int r = lower(nums, target + 1) - 1;\n    if (l <= r && l < nums.length && nums[l] == target) return new int[]{l, r};\n    return new int[]{-1, -1};\n}\nprivate int lower(int[] nums, int x) {\n    int l = 0, r = nums.length;\n    while (l < r) {\n        int m = l + (r - l) / 2;\n        if (nums[m] < x) l = m + 1;\n        else r = m;\n    }\n    return l;\n}\n`,
    cpp: `vector<int> searchRange(vector<int>& nums, int target) {\n    auto lower = [&](int x){\n        int l=0,r=nums.size();\n        while(l<r){\n            int m=(l+r)/2;\n            if(nums[m] < x) l=m+1;\n            else r=m;\n        }\n        return l;\n    };\n    int l=lower(target);\n    int r=lower(target+1)-1;\n    if(l<=r && l<(int)nums.size() && nums[l]==target) return {l,r};\n    return {-1,-1};\n}\n`
  },

  'implement-queue-using-stacks': {
    python: `class MyQueue:\n    def __init__(self):\n        self.s1 = []\n        self.s2 = []\n\n    def push(self, x):\n        self.s1.append(x)\n\n    def _shift(self):\n        if not self.s2:\n            while self.s1:\n                self.s2.append(self.s1.pop())\n\n    def pop(self):\n        self._shift()\n        return self.s2.pop()\n\n    def peek(self):\n        self._shift()\n        return self.s2[-1]\n\n    def empty(self):\n        return (not self.s1) and (not self.s2)\n`,
    java: `class MyQueue {\n    Deque<Integer> s1 = new ArrayDeque<>();\n    Deque<Integer> s2 = new ArrayDeque<>();\n\n    public void push(int x) {\n        s1.push(x);\n    }\n\n    private void shift() {\n        if (s2.isEmpty()) {\n            while (!s1.isEmpty()) s2.push(s1.pop());\n        }\n    }\n\n    public int pop() {\n        shift();\n        return s2.pop();\n    }\n\n    public int peek() {\n        shift();\n        return s2.peek();\n    }\n\n    public boolean empty() {\n        return s1.isEmpty() && s2.isEmpty();\n    }\n}\n`,
    cpp: `class MyQueue {\npublic:\n    stack<int> s1, s2;\n    void push(int x) { s1.push(x); }\n    void shift() {\n        if (s2.empty()) {\n            while(!s1.empty()) { s2.push(s1.top()); s1.pop(); }\n        }\n    }\n    int pop() { shift(); int v=s2.top(); s2.pop(); return v; }\n    int peek() { shift(); return s2.top(); }\n    bool empty() { return s1.empty() && s2.empty(); }\n};\n`
  },

  'invert-binary-tree': {
    python: `def invertTree(root):\n    if not root:\n        return None\n    root.left, root.right = invertTree(root.right), invertTree(root.left)\n    return root\n`,
    java: `public TreeNode invertTree(TreeNode root) {\n    if (root == null) return null;\n    TreeNode left = invertTree(root.left);\n    TreeNode right = invertTree(root.right);\n    root.left = right;\n    root.right = left;\n    return root;\n}\n`,
    cpp: `TreeNode* invertTree(TreeNode* root) {\n    if(!root) return nullptr;\n    auto left = invertTree(root->left);\n    auto right = invertTree(root->right);\n    root->left = right;\n    root->right = left;\n    return root;\n}\n`
  },

  'lowest-common-ancestor-of-a-binary-tree': {
    python: `def lowestCommonAncestor(root, p, q):\n    if not root or root is p or root is q:\n        return root\n    left = lowestCommonAncestor(root.left, p, q)\n    right = lowestCommonAncestor(root.right, p, q)\n    if left and right:\n        return root\n    return left if left else right\n`,
    java: `public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n    if (root == null || root == p || root == q) return root;\n    TreeNode left = lowestCommonAncestor(root.left, p, q);\n    TreeNode right = lowestCommonAncestor(root.right, p, q);\n    if (left != null && right != null) return root;\n    return (left != null) ? left : right;\n}\n`,
    cpp: `TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {\n    if(!root || root==p || root==q) return root;\n    auto left = lowestCommonAncestor(root->left, p, q);\n    auto right = lowestCommonAncestor(root->right, p, q);\n    if(left && right) return root;\n    return left ? left : right;\n}\n`
  },

  'min-stack': {
    python: `class MinStack:\n    def __init__(self):\n        self.st = []\n        self.mn = []\n\n    def push(self, val):\n        self.st.append(val)\n        if not self.mn:\n            self.mn.append(val)\n        else:\n            self.mn.append(min(val, self.mn[-1]))\n\n    def pop(self):\n        self.st.pop()\n        self.mn.pop()\n\n    def top(self):\n        return self.st[-1]\n\n    def getMin(self):\n        return self.mn[-1]\n`,
    java: `class MinStack {\n    Deque<Integer> st = new ArrayDeque<>();\n    Deque<Integer> mn = new ArrayDeque<>();\n\n    public void push(int val) {\n        st.push(val);\n        if (mn.isEmpty()) mn.push(val);\n        else mn.push(Math.min(val, mn.peek()));\n    }\n\n    public void pop() {\n        st.pop();\n        mn.pop();\n    }\n\n    public int top() {\n        return st.peek();\n    }\n\n    public int getMin() {\n        return mn.peek();\n    }\n}\n`,
    cpp: `class MinStack {\npublic:\n    stack<int> st, mn;\n    void push(int val) {\n        st.push(val);\n        if (mn.empty()) mn.push(val);\n        else mn.push(std::min(val, mn.top()));\n    }\n    void pop() { st.pop(); mn.pop(); }\n    int top() { return st.top(); }\n    int getMin() { return mn.top(); }\n};\n`
  },

  'palindrome-linked-list-review': {
    python: `def isPalindrome(head):\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n    prev = None\n    cur = slow\n    while cur:\n        nxt = cur.next\n        cur.next = prev\n        prev = cur\n        cur = nxt\n    left, right = head, prev\n    while right:\n        if left.val != right.val:\n            return False\n        left = left.next\n        right = right.next\n    return True\n`,
    java: `public boolean isPalindrome(ListNode head) {\n    if (head == null) return true;\n    ListNode slow = head, fast = head;\n    while (fast != null && fast.next != null) {\n        slow = slow.next;\n        fast = fast.next.next;\n    }\n    ListNode prev = null, cur = slow;\n    while (cur != null) {\n        ListNode nxt = cur.next;\n        cur.next = prev;\n        prev = cur;\n        cur = nxt;\n    }\n    ListNode left = head, right = prev;\n    while (right != null) {\n        if (left.val != right.val) return false;\n        left = left.next;\n        right = right.next;\n    }\n    return true;\n}\n`,
    cpp: `bool isPalindrome(ListNode* head) {\n    ListNode* slow=head;\n    ListNode* fast=head;\n    while(fast && fast->next){ slow=slow->next; fast=fast->next->next; }\n    ListNode* prev=nullptr;\n    ListNode* cur=slow;\n    while(cur){\n        ListNode* nxt=cur->next;\n        cur->next=prev;\n        prev=cur;\n        cur=nxt;\n    }\n    ListNode* left=head;\n    ListNode* right=prev;\n    while(right){\n        if(left->val!=right->val) return false;\n        left=left->next;\n        right=right->next;\n    }\n    return true;\n}\n`
  },

  'path-sum': {
    python: `def hasPathSum(root, targetSum):\n    if not root:\n        return False\n    if not root.left and not root.right:\n        return root.val == targetSum\n    return hasPathSum(root.left, targetSum - root.val) or hasPathSum(root.right, targetSum - root.val)\n`,
    java: `public boolean hasPathSum(TreeNode root, int targetSum) {\n    if (root == null) return false;\n    if (root.left == null && root.right == null) return root.val == targetSum;\n    return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val);\n}\n`,
    cpp: `bool hasPathSum(TreeNode* root, int targetSum) {\n    if(!root) return false;\n    if(!root->left && !root->right) return root->val == targetSum;\n    return hasPathSum(root->left, targetSum-root->val) || hasPathSum(root->right, targetSum-root->val);\n}\n`
  },

  'remove-duplicates-from-sorted-list-ii': {
    python: `def deleteDuplicates(head):\n    dummy = ListNode(0, head)\n    prev = dummy\n    cur = head\n    while cur:\n        dup = False\n        while cur.next and cur.val == cur.next.val:\n            dup = True\n            cur = cur.next\n        if dup:\n            prev.next = cur.next\n        else:\n            prev = prev.next\n        cur = cur.next\n    return dummy.next\n`,
    java: `public ListNode deleteDuplicates(ListNode head) {\n    ListNode dummy = new ListNode(0);\n    dummy.next = head;\n    ListNode prev = dummy;\n    ListNode cur = head;\n    while (cur != null) {\n        boolean dup = false;\n        while (cur.next != null && cur.val == cur.next.val) {\n            dup = true;\n            cur = cur.next;\n        }\n        if (dup) prev.next = cur.next;\n        else prev = prev.next;\n        cur = cur.next;\n    }\n    return dummy.next;\n}\n`,
    cpp: `ListNode* deleteDuplicates(ListNode* head) {\n    ListNode dummy(0);\n    dummy.next = head;\n    ListNode* prev = &dummy;\n    ListNode* cur = head;\n    while(cur){\n        bool dup=false;\n        while(cur->next && cur->val==cur->next->val){ dup=true; cur=cur->next; }\n        if(dup) prev->next = cur->next;\n        else prev = prev->next;\n        cur = cur->next;\n    }\n    return dummy.next;\n}\n`
  },

  'reorder-list': {
    python: `def reorderList(head):\n    if not head or not head.next:\n        return\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n    prev = None\n    cur = slow\n    while cur:\n        nxt = cur.next\n        cur.next = prev\n        prev = cur\n        cur = nxt\n    first, second = head, prev\n    while second and second.next:\n        t1 = first.next\n        t2 = second.next\n        first.next = second\n        second.next = t1\n        first = t1\n        second = t2\n`,
    java: `public void reorderList(ListNode head) {\n    if (head == null || head.next == null) return;\n    ListNode slow=head, fast=head;\n    while (fast != null && fast.next != null) {\n        slow = slow.next;\n        fast = fast.next.next;\n    }\n    ListNode prev=null, cur=slow;\n    while (cur != null) {\n        ListNode nxt=cur.next;\n        cur.next=prev;\n        prev=cur;\n        cur=nxt;\n    }\n    ListNode first=head, second=prev;\n    while (second != null && second.next != null) {\n        ListNode t1=first.next;\n        ListNode t2=second.next;\n        first.next=second;\n        second.next=t1;\n        first=t1;\n        second=t2;\n    }\n}\n`,
    cpp: `void reorderList(ListNode* head) {\n    if(!head || !head->next) return;\n    ListNode* slow=head;\n    ListNode* fast=head;\n    while(fast && fast->next){ slow=slow->next; fast=fast->next->next; }\n    ListNode* prev=nullptr;\n    ListNode* cur=slow;\n    while(cur){\n        ListNode* nxt=cur->next;\n        cur->next=prev;\n        prev=cur;\n        cur=nxt;\n    }\n    ListNode* first=head;\n    ListNode* second=prev;\n    while(second && second->next){\n        ListNode* t1=first->next;\n        ListNode* t2=second->next;\n        first->next=second;\n        second->next=t1;\n        first=t1;\n        second=t2;\n    }\n}\n`
  },

  'symmetric-tree': {
    python: `def isSymmetric(root):\n    def same(a, b):\n        if not a and not b:\n            return True\n        if not a or not b:\n            return False\n        return a.val == b.val and same(a.left, b.right) and same(a.right, b.left)\n    return same(root.left, root.right) if root else True\n`,
    java: `public boolean isSymmetric(TreeNode root) {\n    if (root == null) return true;\n    return same(root.left, root.right);\n}\nprivate boolean same(TreeNode a, TreeNode b) {\n    if (a == null && b == null) return true;\n    if (a == null || b == null) return false;\n    if (a.val != b.val) return false;\n    return same(a.left, b.right) && same(a.right, b.left);\n}\n`,
    cpp: `bool isSymmetric(TreeNode* root) {\n    function<bool(TreeNode*,TreeNode*)> same = [&](TreeNode* a, TreeNode* b){\n        if(!a && !b) return true;\n        if(!a || !b) return false;\n        if(a->val != b->val) return false;\n        return same(a->left, b->right) && same(a->right, b->left);\n    };\n    if(!root) return true;\n    return same(root->left, root->right);\n}\n`
  },

  'top-k-frequent-elements-review': {
    python: `def topKFrequent(nums, k):\n    from collections import Counter\n    cnt = Counter(nums)\n    buckets = [[] for _ in range(len(nums)+1)]\n    for num, f in cnt.items():\n        buckets[f].append(num)\n    res = []\n    for f in range(len(buckets)-1, -1, -1):\n        for num in buckets[f]:\n            res.append(num)\n            if len(res) == k:\n                return res\n    return res\n`,
    java: `public int[] topKFrequent(int[] nums, int k) {\n    Map<Integer, Integer> cnt = new HashMap<>();\n    for (int x : nums) cnt.put(x, cnt.getOrDefault(x, 0) + 1);\n    List<Integer>[] buckets = new List[nums.length + 1];\n    for (int i=0;i<buckets.length;i++) buckets[i] = new ArrayList<>();\n    for (Map.Entry<Integer,Integer> e : cnt.entrySet()) buckets[e.getValue()].add(e.getKey());\n    int[] res = new int[k];\n    int idx = 0;\n    for (int f=buckets.length-1; f>=0 && idx<k; f--) {\n        for (int num : buckets[f]) {\n            res[idx++] = num;\n            if (idx == k) break;\n        }\n    }\n    return res;\n}\n`,
    cpp: `vector<int> topKFrequent(vector<int>& nums, int k) {\n    unordered_map<int,int> cnt;\n    for(int x: nums) cnt[x]++;\n    vector<vector<int>> buckets(nums.size()+1);\n    for(auto &p: cnt) buckets[p.second].push_back(p.first);\n    vector<int> res;\n    for(int f=buckets.size()-1; f>=0 && (int)res.size()<k; f--){\n        for(int num: buckets[f]){\n            res.push_back(num);\n            if((int)res.size()==k) break;\n        }\n    }\n    return res;\n}\n`
  },

  'valid-parentheses': {
    python: `def isValid(s):\n    st = []\n    mp = {')':'(', ']':'[', '}':'{'}\n    for ch in s:\n        if ch in mp:\n            if not st or st[-1] != mp[ch]:\n                return False\n            st.pop()\n        else:\n            st.append(ch)\n    return not st\n`,
    java: `public boolean isValid(String s) {\n    Deque<Character> st = new ArrayDeque<>();\n    for (char ch : s.toCharArray()) {\n        if (ch == ')' || ch == ']' || ch == '}') {\n            if (st.isEmpty()) return false;\n            char top = st.pop();\n            if ((ch == ')' && top != '(') || (ch == ']' && top != '[') || (ch == '}' && top != '{')) return false;\n        } else {\n            st.push(ch);\n        }\n    }\n    return st.isEmpty();\n}\n`,
    cpp: `bool isValid(string s) {\n    vector<char> st;\n    for(char ch: s){\n        if(ch==')' || ch==']' || ch=='}'){\n            if(st.empty()) return false;\n            char top=st.back(); st.pop_back();\n            if((ch==')' && top!='(') || (ch==']' && top!='[') || (ch=='}' && top!='{')) return false;\n        } else st.push_back(ch);\n    }\n    return st.empty();\n}\n`
  },
};

let patched = 0;
for (const q of questions) {
  const fix = fixes[q.leetcodeSlug];
  if (!fix) continue;
  q.codeSnippet = { python: fix.python, java: fix.java, cpp: fix.cpp };
  patched++;
}

fs.writeFileSync(questionsPath, 'module.exports = ' + JSON.stringify(questions, null, 2) + ';\n', 'utf8');
console.log(JSON.stringify({ patched }, null, 2));
