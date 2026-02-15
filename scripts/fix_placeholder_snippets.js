/*
  Replace placeholder codeSnippet blocks with correct implementations.

  Targets: questions whose snippets contain INTENTIONAL_MISMATCH_PLACEHOLDER / TODO NotImplemented.

  Usage:
    node scripts/fix_placeholder_snippets.js
*/

const fs = require('fs');
const path = require('path');

const questionsPath = path.join(__dirname, '..', 'miniprogram', 'data', 'questions.js');
const questions = require(questionsPath);

const fixes = {
  'best-time-to-buy-and-sell-stock': {
    python: `def maxProfit(prices):\n    min_price = float('inf')\n    ans = 0\n    for p in prices:\n        min_price = min(min_price, p)\n        ans = max(ans, p - min_price)\n    return ans\n`,
    java: `public int maxProfit(int[] prices) {\n    int minPrice = Integer.MAX_VALUE;\n    int ans = 0;\n    for (int p : prices) {\n        minPrice = Math.min(minPrice, p);\n        ans = Math.max(ans, p - minPrice);\n    }\n    return ans;\n}\n`,
    cpp: `int maxProfit(vector<int>& prices) {\n    int minPrice = INT_MAX;\n    int ans = 0;\n    for (int p : prices) {\n        minPrice = min(minPrice, p);\n        ans = max(ans, p - minPrice);\n    }\n    return ans;\n}\n`
  },
  'product-of-array-except-self': {
    python: `def productExceptSelf(nums):\n    n = len(nums)\n    res = [1] * n\n    prefix = 1\n    for i in range(n):\n        res[i] = prefix\n        prefix *= nums[i]\n    suffix = 1\n    for i in range(n - 1, -1, -1):\n        res[i] *= suffix\n        suffix *= nums[i]\n    return res\n`,
    java: `public int[] productExceptSelf(int[] nums) {\n    int n = nums.length;\n    int[] res = new int[n];\n    int prefix = 1;\n    for (int i = 0; i < n; i++) {\n        res[i] = prefix;\n        prefix *= nums[i];\n    }\n    int suffix = 1;\n    for (int i = n - 1; i >= 0; i--) {\n        res[i] *= suffix;\n        suffix *= nums[i];\n    }\n    return res;\n}\n`,
    cpp: `vector<int> productExceptSelf(vector<int>& nums) {\n    int n = nums.size();\n    vector<int> res(n, 1);\n    int prefix = 1;\n    for (int i = 0; i < n; i++) {\n        res[i] = prefix;\n        prefix *= nums[i];\n    }\n    int suffix = 1;\n    for (int i = n - 1; i >= 0; i--) {\n        res[i] *= suffix;\n        suffix *= nums[i];\n    }\n    return res;\n}\n`
  },
  'maximum-subarray': {
    python: `def maxSubArray(nums):\n    best = nums[0]\n    cur = 0\n    for x in nums:\n        cur = max(x, cur + x)\n        best = max(best, cur)\n    return best\n`,
    java: `public int maxSubArray(int[] nums) {\n    int best = nums[0];\n    int cur = 0;\n    for (int x : nums) {\n        cur = Math.max(x, cur + x);\n        best = Math.max(best, cur);\n    }\n    return best;\n}\n`,
    cpp: `int maxSubArray(vector<int>& nums) {\n    int best = nums[0];\n    int cur = 0;\n    for (int x : nums) {\n        cur = max(x, cur + x);\n        best = max(best, cur);\n    }\n    return best;\n}\n`
  },
  'rotate-array': {
    python: `def rotate(nums, k):\n    n = len(nums)\n    if n == 0: return\n    k %= n\n    def rev(l, r):\n        while l < r:\n            nums[l], nums[r] = nums[r], nums[l]\n            l += 1\n            r -= 1\n    rev(0, n - 1)\n    rev(0, k - 1)\n    rev(k, n - 1)\n`,
    java: `public void rotate(int[] nums, int k) {\n    int n = nums.length;\n    if (n == 0) return;\n    k %= n;\n    reverse(nums, 0, n - 1);\n    reverse(nums, 0, k - 1);\n    reverse(nums, k, n - 1);\n}\nprivate void reverse(int[] a, int l, int r) {\n    while (l < r) {\n        int tmp = a[l];\n        a[l] = a[r];\n        a[r] = tmp;\n        l++;\n        r--;\n    }\n}\n`,
    cpp: `void rotate(vector<int>& nums, int k) {\n    int n = nums.size();\n    if (n == 0) return;\n    k %= n;\n    reverse(nums.begin(), nums.end());\n    reverse(nums.begin(), nums.begin() + k);\n    reverse(nums.begin() + k, nums.end());\n}\n`
  },
  'move-zeroes': {
    python: `def moveZeroes(nums):\n    slow = 0\n    for fast in range(len(nums)):\n        if nums[fast] != 0:\n            nums[slow], nums[fast] = nums[fast], nums[slow]\n            slow += 1\n`,
    java: `public void moveZeroes(int[] nums) {\n    int slow = 0;\n    for (int fast = 0; fast < nums.length; fast++) {\n        if (nums[fast] != 0) {\n            int tmp = nums[slow];\n            nums[slow] = nums[fast];\n            nums[fast] = tmp;\n            slow++;\n        }\n    }\n}\n`,
    cpp: `void moveZeroes(vector<int>& nums) {\n    int slow = 0;\n    for (int fast = 0; fast < (int)nums.size(); fast++) {\n        if (nums[fast] != 0) {\n            swap(nums[slow], nums[fast]);\n            slow++;\n        }\n    }\n}\n`
  },
  'majority-element': {
    python: `def majorityElement(nums):\n    cand = None\n    cnt = 0\n    for x in nums:\n        if cnt == 0:\n            cand = x\n            cnt = 1\n        elif x == cand:\n            cnt += 1\n        else:\n            cnt -= 1\n    return cand\n`,
    java: `public int majorityElement(int[] nums) {\n    int cand = 0, cnt = 0;\n    for (int x : nums) {\n        if (cnt == 0) { cand = x; cnt = 1; }\n        else if (x == cand) cnt++;\n        else cnt--;\n    }\n    return cand;\n}\n`,
    cpp: `int majorityElement(vector<int>& nums) {\n    int cand = 0, cnt = 0;\n    for (int x : nums) {\n        if (cnt == 0) { cand = x; cnt = 1; }\n        else if (x == cand) cnt++;\n        else cnt--;\n    }\n    return cand;\n}\n`
  },
  'next-permutation': {
    python: `def nextPermutation(nums):\n    n = len(nums)\n    i = n - 2\n    while i >= 0 and nums[i] >= nums[i+1]:\n        i -= 1\n    if i >= 0:\n        j = n - 1\n        while nums[j] <= nums[i]:\n            j -= 1\n        nums[i], nums[j] = nums[j], nums[i]\n    l, r = i + 1, n - 1\n    while l < r:\n        nums[l], nums[r] = nums[r], nums[l]\n        l += 1\n        r -= 1\n`,
    java: `public void nextPermutation(int[] nums) {\n    int n = nums.length;\n    int i = n - 2;\n    while (i >= 0 && nums[i] >= nums[i + 1]) i--;\n    if (i >= 0) {\n        int j = n - 1;\n        while (nums[j] <= nums[i]) j--;\n        swap(nums, i, j);\n    }\n    reverse(nums, i + 1, n - 1);\n}\nprivate void swap(int[] a, int i, int j) {\n    int t = a[i]; a[i] = a[j]; a[j] = t;\n}\nprivate void reverse(int[] a, int l, int r) {\n    while (l < r) swap(a, l++, r--);\n}\n`,
    cpp: `void nextPermutation(vector<int>& nums) {\n    int n = nums.size();\n    int i = n - 2;\n    while (i >= 0 && nums[i] >= nums[i+1]) i--;\n    if (i >= 0) {\n        int j = n - 1;\n        while (nums[j] <= nums[i]) j--;\n        swap(nums[i], nums[j]);\n    }\n    reverse(nums.begin() + i + 1, nums.end());\n}\n`
  },
  'sort-colors': {
    python: `def sortColors(nums):\n    low, mid, high = 0, 0, len(nums) - 1\n    while mid <= high:\n        if nums[mid] == 0:\n            nums[low], nums[mid] = nums[mid], nums[low]\n            low += 1\n            mid += 1\n        elif nums[mid] == 1:\n            mid += 1\n        else:\n            nums[mid], nums[high] = nums[high], nums[mid]\n            high -= 1\n`,
    java: `public void sortColors(int[] nums) {\n    int low = 0, mid = 0, high = nums.length - 1;\n    while (mid <= high) {\n        if (nums[mid] == 0) { swap(nums, low++, mid++); }\n        else if (nums[mid] == 1) { mid++; }\n        else { swap(nums, mid, high--); }\n    }\n}\nprivate void swap(int[] a, int i, int j) { int t=a[i]; a[i]=a[j]; a[j]=t; }\n`,
    cpp: `void sortColors(vector<int>& nums) {\n    int low = 0, mid = 0, high = (int)nums.size() - 1;\n    while (mid <= high) {\n        if (nums[mid] == 0) swap(nums[low++], nums[mid++]);\n        else if (nums[mid] == 1) mid++;\n        else swap(nums[mid], nums[high--]);\n    }\n}\n`
  },
  'first-missing-positive': {
    python: `def firstMissingPositive(nums):\n    n = len(nums)\n    for i in range(n):\n        while 1 <= nums[i] <= n and nums[nums[i]-1] != nums[i]:\n            j = nums[i] - 1\n            nums[i], nums[j] = nums[j], nums[i]\n    for i in range(n):\n        if nums[i] != i + 1:\n            return i + 1\n    return n + 1\n`,
    java: `public int firstMissingPositive(int[] nums) {\n    int n = nums.length;\n    for (int i = 0; i < n; i++) {\n        while (nums[i] >= 1 && nums[i] <= n && nums[nums[i]-1] != nums[i]) {\n            int j = nums[i] - 1;\n            int tmp = nums[i];\n            nums[i] = nums[j];\n            nums[j] = tmp;\n        }\n    }\n    for (int i = 0; i < n; i++) {\n        if (nums[i] != i + 1) return i + 1;\n    }\n    return n + 1;\n}\n`,
    cpp: `int firstMissingPositive(vector<int>& nums) {\n    int n = nums.size();\n    for (int i = 0; i < n; i++) {\n        while (nums[i] >= 1 && nums[i] <= n && nums[nums[i]-1] != nums[i]) {\n            swap(nums[i], nums[nums[i]-1]);\n        }\n    }\n    for (int i = 0; i < n; i++) {\n        if (nums[i] != i + 1) return i + 1;\n    }\n    return n + 1;\n}\n`
  },
  'trapping-rain-water': {
    python: `def trap(height):\n    left, right = 0, len(height) - 1\n    leftMax = rightMax = 0\n    ans = 0\n    while left < right:\n        if height[left] < height[right]:\n            leftMax = max(leftMax, height[left])\n            ans += leftMax - height[left]\n            left += 1\n        else:\n            rightMax = max(rightMax, height[right])\n            ans += rightMax - height[right]\n            right -= 1\n    return ans\n`,
    java: `public int trap(int[] height) {\n    int left = 0, right = height.length - 1;\n    int leftMax = 0, rightMax = 0;\n    int ans = 0;\n    while (left < right) {\n        if (height[left] < height[right]) {\n            leftMax = Math.max(leftMax, height[left]);\n            ans += leftMax - height[left];\n            left++;\n        } else {\n            rightMax = Math.max(rightMax, height[right]);\n            ans += rightMax - height[right];\n            right--;\n        }\n    }\n    return ans;\n}\n`,
    cpp: `int trap(vector<int>& height) {\n    int left = 0, right = (int)height.size() - 1;\n    int leftMax = 0, rightMax = 0;\n    int ans = 0;\n    while (left < right) {\n        if (height[left] < height[right]) {\n            leftMax = max(leftMax, height[left]);\n            ans += leftMax - height[left];\n            left++;\n        } else {\n            rightMax = max(rightMax, height[right]);\n            ans += rightMax - height[right];\n            right--;\n        }\n    }\n    return ans;\n}\n`
  },
  'valid-anagram': {
    python: `def isAnagram(s, t):\n    if len(s) != len(t): return False\n    from collections import Counter\n    return Counter(s) == Counter(t)\n`,
    java: `public boolean isAnagram(String s, String t) {\n    if (s.length() != t.length()) return false;\n    int[] cnt = new int[26];\n    for (int i = 0; i < s.length(); i++) cnt[s.charAt(i) - 'a']++;\n    for (int i = 0; i < t.length(); i++) {\n        if (--cnt[t.charAt(i) - 'a'] < 0) return false;\n    }\n    return true;\n}\n`,
    cpp: `bool isAnagram(string s, string t) {\n    if (s.size() != t.size()) return false;\n    int cnt[26] = {0};\n    for (char c: s) cnt[c-'a']++;\n    for (char c: t) {\n        if (--cnt[c-'a'] < 0) return false;\n    }\n    return true;\n}\n`
  },
  'subarray-sum-equals-k': {
    python: `def subarraySum(nums, k):\n    cnt = {0: 1}\n    pre = 0\n    ans = 0\n    for x in nums:\n        pre += x\n        ans += cnt.get(pre - k, 0)\n        cnt[pre] = cnt.get(pre, 0) + 1\n    return ans\n`,
    java: `public int subarraySum(int[] nums, int k) {\n    Map<Integer, Integer> map = new HashMap<>();\n    map.put(0, 1);\n    int pre = 0, ans = 0;\n    for (int x : nums) {\n        pre += x;\n        ans += map.getOrDefault(pre - k, 0);\n        map.put(pre, map.getOrDefault(pre, 0) + 1);\n    }\n    return ans;\n}\n`,
    cpp: `int subarraySum(vector<int>& nums, int k) {\n    unordered_map<int,int> cnt;\n    cnt[0] = 1;\n    int pre = 0, ans = 0;\n    for (int x : nums) {\n        pre += x;\n        if (cnt.count(pre - k)) ans += cnt[pre - k];\n        cnt[pre]++;\n    }\n    return ans;\n}\n`
  },
  'longest-consecutive-sequence': {
    python: `def longestConsecutive(nums):\n    s = set(nums)\n    best = 0\n    for x in s:\n        if x - 1 not in s:\n            y = x\n            while y in s:\n                y += 1\n            best = max(best, y - x)\n    return best\n`,
    java: `public int longestConsecutive(int[] nums) {\n    Set<Integer> set = new HashSet<>();\n    for (int x : nums) set.add(x);\n    int best = 0;\n    for (int x : set) {\n        if (!set.contains(x - 1)) {\n            int y = x;\n            while (set.contains(y)) y++;\n            best = Math.max(best, y - x);\n        }\n    }\n    return best;\n}\n`,
    cpp: `int longestConsecutive(vector<int>& nums) {\n    unordered_set<int> s(nums.begin(), nums.end());\n    int best = 0;\n    for (int x : s) {\n        if (!s.count(x - 1)) {\n            int y = x;\n            while (s.count(y)) y++;\n            best = max(best, y - x);\n        }\n    }\n    return best;\n}\n`
  },
  'top-k-frequent-elements': {
    python: `def topKFrequent(nums, k):\n    from collections import Counter\n    import heapq\n    cnt = Counter(nums)\n    return [x for x,_ in heapq.nlargest(k, cnt.items(), key=lambda p: p[1])]\n`,
    java: `public int[] topKFrequent(int[] nums, int k) {\n    Map<Integer, Integer> cnt = new HashMap<>();\n    for (int x : nums) cnt.put(x, cnt.getOrDefault(x, 0) + 1);\n    PriorityQueue<int[]> pq = new PriorityQueue<>((a,b)->a[1]-b[1]);\n    for (Map.Entry<Integer,Integer> e : cnt.entrySet()) {\n        pq.offer(new int[]{e.getKey(), e.getValue()});\n        if (pq.size() > k) pq.poll();\n    }\n    int[] res = new int[k];\n    for (int i = k - 1; i >= 0; i--) res[i] = pq.poll()[0];\n    return res;\n}\n`,
    cpp: `vector<int> topKFrequent(vector<int>& nums, int k) {\n    unordered_map<int,int> cnt;\n    for (int x: nums) cnt[x]++;\n    auto cmp = [](const pair<int,int>& a, const pair<int,int>& b){ return a.second > b.second; };\n    priority_queue<pair<int,int>, vector<pair<int,int>>, decltype(cmp)> pq(cmp);\n    for (auto &e: cnt) {\n        pq.push({e.first, e.second});\n        if ((int)pq.size() > k) pq.pop();\n    }\n    vector<int> res(k);\n    for (int i = k - 1; i >= 0; i--) {\n        res[i] = pq.top().first;\n        pq.pop();\n    }\n    return res;\n}\n`
  },
  '4sum-ii': {
    python: `def fourSumCount(nums1, nums2, nums3, nums4):\n    from collections import Counter\n    ab = Counter(a + b for a in nums1 for b in nums2)\n    ans = 0\n    for c in nums3:\n        for d in nums4:\n            ans += ab.get(-(c + d), 0)\n    return ans\n`,
    java: `public int fourSumCount(int[] nums1, int[] nums2, int[] nums3, int[] nums4) {\n    Map<Integer, Integer> ab = new HashMap<>();\n    for (int a : nums1) {\n        for (int b : nums2) {\n            int s = a + b;\n            ab.put(s, ab.getOrDefault(s, 0) + 1);\n        }\n    }\n    int ans = 0;\n    for (int c : nums3) {\n        for (int d : nums4) {\n            ans += ab.getOrDefault(-(c + d), 0);\n        }\n    }\n    return ans;\n}\n`,
    cpp: `int fourSumCount(vector<int>& A, vector<int>& B, vector<int>& C, vector<int>& D) {\n    unordered_map<int,int> ab;\n    for (int a: A) for (int b: B) ab[a+b]++;\n    int ans=0;\n    for (int c: C) for (int d: D) {\n        auto it = ab.find(-(c+d));\n        if (it != ab.end()) ans += it->second;\n    }\n    return ans;\n}\n`
  },
  'decode-ways': {
    python: `def numDecodings(s):\n    if not s or s[0] == '0': return 0\n    n = len(s)\n    dp0, dp1 = 1, 1\n    for i in range(1, n):\n        cur = 0\n        if s[i] != '0':\n            cur += dp1\n        two = int(s[i-1:i+1])\n        if 10 <= two <= 26:\n            cur += dp0\n        dp0, dp1 = dp1, cur\n    return dp1\n`,
    java: `public int numDecodings(String s) {\n    if (s == null || s.length() == 0 || s.charAt(0) == '0') return 0;\n    int n = s.length();\n    int dp0 = 1, dp1 = 1;\n    for (int i = 1; i < n; i++) {\n        int cur = 0;\n        if (s.charAt(i) != '0') cur += dp1;\n        int two = Integer.parseInt(s.substring(i - 1, i + 1));\n        if (two >= 10 && two <= 26) cur += dp0;\n        dp0 = dp1;\n        dp1 = cur;\n    }\n    return dp1;\n}\n`,
    cpp: `int numDecodings(string s) {\n    if (s.empty() || s[0] == '0') return 0;\n    int n = s.size();\n    int dp0 = 1, dp1 = 1;\n    for (int i = 1; i < n; i++) {\n        int cur = 0;\n        if (s[i] != '0') cur += dp1;\n        int two = (s[i-1]-'0')*10 + (s[i]-'0');\n        if (two >= 10 && two <= 26) cur += dp0;\n        dp0 = dp1;\n        dp1 = cur;\n    }\n    return dp1;\n}\n`
  },
  'happy-number': {
    python: `def isHappy(n):\n    def nxt(x):\n        s = 0\n        while x:\n            d = x % 10\n            s += d * d\n            x //= 10\n        return s\n    seen = set()\n    while n != 1 and n not in seen:\n        seen.add(n)\n        n = nxt(n)\n    return n == 1\n`,
    java: `public boolean isHappy(int n) {\n    Set<Integer> seen = new HashSet<>();\n    while (n != 1 && !seen.contains(n)) {\n        seen.add(n);\n        int s = 0;\n        while (n > 0) {\n            int d = n % 10;\n            s += d * d;\n            n /= 10;\n        }\n        n = s;\n    }\n    return n == 1;\n}\n`,
    cpp: `bool isHappy(int n) {\n    unordered_set<int> seen;\n    auto nxt = [&](int x){\n        int s=0;\n        while (x) {\n            int d = x % 10;\n            s += d*d;\n            x /= 10;\n        }\n        return s;\n    };\n    while (n != 1 && !seen.count(n)) {\n        seen.insert(n);\n        n = nxt(n);\n    }\n    return n == 1;\n}\n`
  },
  'isomorphic-strings': {
    python: `def isIsomorphic(s, t):\n    if len(s) != len(t): return False\n    m1, m2 = {}, {}\n    for a, b in zip(s, t):\n        if (a in m1 and m1[a] != b) or (b in m2 and m2[b] != a):\n            return False\n        m1[a] = b\n        m2[b] = a\n    return True\n`,
    java: `public boolean isIsomorphic(String s, String t) {\n    if (s.length() != t.length()) return false;\n    Map<Character, Character> m1 = new HashMap<>();\n    Map<Character, Character> m2 = new HashMap<>();\n    for (int i = 0; i < s.length(); i++) {\n        char a = s.charAt(i), b = t.charAt(i);\n        if (m1.containsKey(a) && m1.get(a) != b) return false;\n        if (m2.containsKey(b) && m2.get(b) != a) return false;\n        m1.put(a, b);\n        m2.put(b, a);\n    }\n    return true;\n}\n`,
    cpp: `bool isIsomorphic(string s, string t) {\n    if (s.size() != t.size()) return false;\n    unordered_map<char,char> m1, m2;\n    for (int i=0;i<(int)s.size();i++){\n        char a=s[i], b=t[i];\n        if (m1.count(a) && m1[a] != b) return false;\n        if (m2.count(b) && m2[b] != a) return false;\n        m1[a]=b;\n        m2[b]=a;\n    }\n    return true;\n}\n`
  },
  'container-with-most-water': {
    python: `def maxArea(height):\n    left, right = 0, len(height) - 1\n    ans = 0\n    while left < right:\n        ans = max(ans, (right - left) * min(height[left], height[right]))\n        if height[left] < height[right]:\n            left += 1\n        else:\n            right -= 1\n    return ans\n`,
    java: `public int maxArea(int[] height) {\n    int left = 0, right = height.length - 1;\n    int ans = 0;\n    while (left < right) {\n        ans = Math.max(ans, (right - left) * Math.min(height[left], height[right]));\n        if (height[left] < height[right]) left++;\n        else right--;\n    }\n    return ans;\n}\n`,
    cpp: `int maxArea(vector<int>& height) {\n    int left=0, right=(int)height.size()-1;\n    int ans=0;\n    while (left < right) {\n        ans = max(ans, (right-left) * min(height[left], height[right]));\n        if (height[left] < height[right]) left++;\n        else right--;\n    }\n    return ans;\n}\n`
  },
  'remove-duplicates-from-sorted-array': {
    python: `def removeDuplicates(nums):\n    if not nums: return 0\n    slow = 1\n    for fast in range(1, len(nums)):\n        if nums[fast] != nums[fast-1]:\n            nums[slow] = nums[fast]\n            slow += 1\n    return slow\n`,
    java: `public int removeDuplicates(int[] nums) {\n    if (nums.length == 0) return 0;\n    int slow = 1;\n    for (int fast = 1; fast < nums.length; fast++) {\n        if (nums[fast] != nums[fast - 1]) {\n            nums[slow++] = nums[fast];\n        }\n    }\n    return slow;\n}\n`,
    cpp: `int removeDuplicates(vector<int>& nums) {\n    if (nums.empty()) return 0;\n    int slow = 1;\n    for (int fast = 1; fast < (int)nums.size(); fast++) {\n        if (nums[fast] != nums[fast-1]) nums[slow++] = nums[fast];\n    }\n    return slow;\n}\n`
  },
  'trapping-rain-water-two-pointers': {
    python: `def trap(height):\n    left, right = 0, len(height) - 1\n    leftMax = rightMax = 0\n    ans = 0\n    while left < right:\n        if height[left] < height[right]:\n            leftMax = max(leftMax, height[left])\n            ans += leftMax - height[left]\n            left += 1\n        else:\n            rightMax = max(rightMax, height[right])\n            ans += rightMax - height[right]\n            right -= 1\n    return ans\n`,
    java: `public int trap(int[] height) {\n    int left = 0, right = height.length - 1;\n    int leftMax = 0, rightMax = 0;\n    int ans = 0;\n    while (left < right) {\n        if (height[left] < height[right]) {\n            leftMax = Math.max(leftMax, height[left]);\n            ans += leftMax - height[left];\n            left++;\n        } else {\n            rightMax = Math.max(rightMax, height[right]);\n            ans += rightMax - height[right];\n            right--;\n        }\n    }\n    return ans;\n}\n`,
    cpp: `int trap(vector<int>& height) {\n    int left = 0, right = (int)height.size() - 1;\n    int leftMax = 0, rightMax = 0;\n    int ans = 0;\n    while (left < right) {\n        if (height[left] < height[right]) {\n            leftMax = max(leftMax, height[left]);\n            ans += leftMax - height[left];\n            left++;\n        } else {\n            rightMax = max(rightMax, height[right]);\n            ans += rightMax - height[right];\n            right--;\n        }\n    }\n    return ans;\n}\n`
  },
  'find-all-anagrams-in-a-string': {
    python: `def findAnagrams(s, p):\n    if len(p) > len(s): return []\n    from collections import Counter\n    need = Counter(p)\n    window = Counter()\n    res = []\n    left = 0\n    for right, ch in enumerate(s):\n        window[ch] += 1\n        if right - left + 1 > len(p):\n            out = s[left]\n            window[out] -= 1\n            if window[out] == 0: del window[out]\n            left += 1\n        if right - left + 1 == len(p) and window == need:\n            res.append(left)\n    return res\n`,
    java: `public List<Integer> findAnagrams(String s, String p) {\n    List<Integer> res = new ArrayList<>();\n    if (p.length() > s.length()) return res;\n    int[] need = new int[26];\n    int[] window = new int[26];\n    for (char c : p.toCharArray()) need[c-'a']++;\n    int left = 0;\n    for (int right = 0; right < s.length(); right++) {\n        window[s.charAt(right)-'a']++;\n        if (right - left + 1 > p.length()) {\n            window[s.charAt(left)-'a']--;\n            left++;\n        }\n        if (right - left + 1 == p.length()) {\n            boolean ok = true;\n            for (int i = 0; i < 26; i++) {\n                if (window[i] != need[i]) { ok = false; break; }\n            }\n            if (ok) res.add(left);\n        }\n    }\n    return res;\n}\n`,
    cpp: `vector<int> findAnagrams(string s, string p) {\n    vector<int> res;\n    if (p.size() > s.size()) return res;\n    vector<int> need(26,0), window(26,0);\n    for (char c: p) need[c-'a']++;\n    int left=0;\n    for (int right=0; right<(int)s.size(); right++) {\n        window[s[right]-'a']++;\n        if (right-left+1 > (int)p.size()) {\n            window[s[left]-'a']--;\n            left++;\n        }\n        if (right-left+1 == (int)p.size()) {\n            if (window == need) res.push_back(left);\n        }\n    }\n    return res;\n}\n`
  },
  'minimum-size-subarray-sum': {
    python: `def minSubArrayLen(target, nums):\n    left = 0\n    s = 0\n    ans = float('inf')\n    for right, x in enumerate(nums):\n        s += x\n        while s >= target:\n            ans = min(ans, right - left + 1)\n            s -= nums[left]\n            left += 1\n    return 0 if ans == float('inf') else ans\n`,
    java: `public int minSubArrayLen(int target, int[] nums) {\n    int left = 0;\n    int sum = 0;\n    int ans = Integer.MAX_VALUE;\n    for (int right = 0; right < nums.length; right++) {\n        sum += nums[right];\n        while (sum >= target) {\n            ans = Math.min(ans, right - left + 1);\n            sum -= nums[left++];\n        }\n    }\n    return ans == Integer.MAX_VALUE ? 0 : ans;\n}\n`,
    cpp: `int minSubArrayLen(int target, vector<int>& nums) {\n    int left=0;\n    long long sum=0;\n    int ans = INT_MAX;\n    for (int right=0; right<(int)nums.size(); right++) {\n        sum += nums[right];\n        while (sum >= target) {\n            ans = min(ans, right-left+1);\n            sum -= nums[left++];\n        }\n    }\n    return ans==INT_MAX?0:ans;\n}\n`
  },
  'max-consecutive-ones-iii': {
    python: `def longestOnes(nums, k):\n    left = 0\n    zeros = 0\n    ans = 0\n    for right, x in enumerate(nums):\n        if x == 0: zeros += 1\n        while zeros > k:\n            if nums[left] == 0: zeros -= 1\n            left += 1\n        ans = max(ans, right - left + 1)\n    return ans\n`,
    java: `public int longestOnes(int[] nums, int k) {\n    int left = 0, zeros = 0, ans = 0;\n    for (int right = 0; right < nums.length; right++) {\n        if (nums[right] == 0) zeros++;\n        while (zeros > k) {\n            if (nums[left] == 0) zeros--;\n            left++;\n        }\n        ans = Math.max(ans, right - left + 1);\n    }\n    return ans;\n}\n`,
    cpp: `int longestOnes(vector<int>& nums, int k) {\n    int left=0, zeros=0, ans=0;\n    for (int right=0; right<(int)nums.size(); right++) {\n        if (nums[right]==0) zeros++;\n        while (zeros > k) {\n            if (nums[left]==0) zeros--;\n            left++;\n        }\n        ans = max(ans, right-left+1);\n    }\n    return ans;\n}\n`
  },
  'substring-with-concatenation-of-all-words': {
    python: `def findSubstring(s, words):\n    if not s or not words: return []\n    from collections import Counter\n    wlen = len(words[0])\n    total = wlen * len(words)\n    need = Counter(words)\n    res = []\n    for offset in range(wlen):\n        left = offset\n        window = Counter()\n        count = 0\n        for right in range(offset, len(s) - wlen + 1, wlen):\n            w = s[right:right+wlen]\n            if w in need:\n                window[w] += 1\n                count += 1\n                while window[w] > need[w]:\n                    out = s[left:left+wlen]\n                    window[out] -= 1\n                    left += wlen\n                    count -= 1\n                if count == len(words):\n                    res.append(left)\n                    out = s[left:left+wlen]\n                    window[out] -= 1\n                    left += wlen\n                    count -= 1\n            else:\n                window.clear()\n                count = 0\n                left = right + wlen\n    return res\n`,
    java: `public List<Integer> findSubstring(String s, String[] words) {\n    List<Integer> res = new ArrayList<>();\n    if (s == null || s.length() == 0 || words == null || words.length == 0) return res;\n    int wlen = words[0].length();\n    int total = wlen * words.length;\n    Map<String, Integer> need = new HashMap<>();\n    for (String w : words) need.put(w, need.getOrDefault(w, 0) + 1);\n    for (int offset = 0; offset < wlen; offset++) {\n        int left = offset, count = 0;\n        Map<String, Integer> window = new HashMap<>();\n        for (int right = offset; right + wlen <= s.length(); right += wlen) {\n            String w = s.substring(right, right + wlen);\n            if (need.containsKey(w)) {\n                window.put(w, window.getOrDefault(w, 0) + 1);\n                count++;\n                while (window.get(w) > need.get(w)) {\n                    String out = s.substring(left, left + wlen);\n                    window.put(out, window.get(out) - 1);\n                    left += wlen;\n                    count--;\n                }\n                if (count == words.length) {\n                    res.add(left);\n                    String out = s.substring(left, left + wlen);\n                    window.put(out, window.get(out) - 1);\n                    left += wlen;\n                    count--;\n                }\n            } else {\n                window.clear();\n                count = 0;\n                left = right + wlen;\n            }\n        }\n    }\n    return res;\n}\n`,
    cpp: `vector<int> findSubstring(string s, vector<string>& words) {\n    vector<int> res;\n    if (s.empty() || words.empty()) return res;\n    int wlen = words[0].size();\n    unordered_map<string,int> need;\n    for (auto &w: words) need[w]++;\n    for (int offset=0; offset<wlen; offset++) {\n        int left=offset, count=0;\n        unordered_map<string,int> window;\n        for (int right=offset; right + wlen <= (int)s.size(); right += wlen) {\n            string w = s.substr(right, wlen);\n            if (need.count(w)) {\n                window[w]++;\n                count++;\n                while (window[w] > need[w]) {\n                    string out = s.substr(left, wlen);\n                    window[out]--;\n                    left += wlen;\n                    count--;\n                }\n                if (count == (int)words.size()) {\n                    res.push_back(left);\n                    string out = s.substr(left, wlen);\n                    window[out]--;\n                    left += wlen;\n                    count--;\n                }\n            } else {\n                window.clear();\n                count = 0;\n                left = right + wlen;\n            }\n        }\n    }\n    return res;\n}\n`
  },
  'fruit-into-baskets': {
    python: `def totalFruit(fruits):\n    from collections import defaultdict\n    left = 0\n    cnt = defaultdict(int)\n    ans = 0\n    for right, x in enumerate(fruits):\n        cnt[x] += 1\n        while len(cnt) > 2:\n            y = fruits[left]\n            cnt[y] -= 1\n            if cnt[y] == 0: del cnt[y]\n            left += 1\n        ans = max(ans, right - left + 1)\n    return ans\n`,
    java: `public int totalFruit(int[] fruits) {\n    Map<Integer, Integer> cnt = new HashMap<>();\n    int left = 0, ans = 0;\n    for (int right = 0; right < fruits.length; right++) {\n        cnt.put(fruits[right], cnt.getOrDefault(fruits[right], 0) + 1);\n        while (cnt.size() > 2) {\n            int y = fruits[left++];\n            cnt.put(y, cnt.get(y) - 1);\n            if (cnt.get(y) == 0) cnt.remove(y);\n        }\n        ans = Math.max(ans, right - left + 1);\n    }\n    return ans;\n}\n`,
    cpp: `int totalFruit(vector<int>& fruits) {\n    unordered_map<int,int> cnt;\n    int left=0, ans=0;\n    for (int right=0; right<(int)fruits.size(); right++) {\n        cnt[fruits[right]]++;\n        while ((int)cnt.size() > 2) {\n            int y = fruits[left++];\n            if (--cnt[y] == 0) cnt.erase(y);\n        }\n        ans = max(ans, right-left+1);\n    }\n    return ans;\n}\n`
  },
  'longest-repeating-character-replacement': {
    python: `def characterReplacement(s, k):\n    from collections import defaultdict\n    cnt = defaultdict(int)\n    left = 0\n    maxCount = 0\n    ans = 0\n    for right, ch in enumerate(s):\n        cnt[ch] += 1\n        maxCount = max(maxCount, cnt[ch])\n        while (right - left + 1) - maxCount > k:\n            cnt[s[left]] -= 1\n            left += 1\n        ans = max(ans, right - left + 1)\n    return ans\n`,
    java: `public int characterReplacement(String s, int k) {\n    int[] cnt = new int[26];\n    int left = 0, maxCount = 0, ans = 0;\n    for (int right = 0; right < s.length(); right++) {\n        int idx = s.charAt(right) - 'A';\n        cnt[idx]++;\n        maxCount = Math.max(maxCount, cnt[idx]);\n        while ((right - left + 1) - maxCount > k) {\n            cnt[s.charAt(left) - 'A']--;\n            left++;\n        }\n        ans = Math.max(ans, right - left + 1);\n    }\n    return ans;\n}\n`,
    cpp: `int characterReplacement(string s, int k) {\n    vector<int> cnt(26,0);\n    int left=0, maxCount=0, ans=0;\n    for (int right=0; right<(int)s.size(); right++) {\n        int idx = s[right]-'A';\n        cnt[idx]++;\n        maxCount = max(maxCount, cnt[idx]);\n        while ((right-left+1) - maxCount > k) {\n            cnt[s[left]-'A']--;\n            left++;\n        }\n        ans = max(ans, right-left+1);\n    }\n    return ans;\n}\n`
  },
  'house-robber': {
    python: `def rob(nums):\n    prev2, prev1 = 0, 0\n    for x in nums:\n        prev2, prev1 = prev1, max(prev1, prev2 + x)\n    return prev1\n`,
    java: `public int rob(int[] nums) {\n    int prev2 = 0, prev1 = 0;\n    for (int x : nums) {\n        int cur = Math.max(prev1, prev2 + x);\n        prev2 = prev1;\n        prev1 = cur;\n    }\n    return prev1;\n}\n`,
    cpp: `int rob(vector<int>& nums) {\n    int prev2=0, prev1=0;\n    for (int x: nums) {\n        int cur = max(prev1, prev2 + x);\n        prev2 = prev1;\n        prev1 = cur;\n    }\n    return prev1;\n}\n`
  },
  'longest-increasing-subsequence': {
    python: `def lengthOfLIS(nums):\n    import bisect\n    tails = []\n    for x in nums:\n        i = bisect.bisect_left(tails, x)\n        if i == len(tails):\n            tails.append(x)\n        else:\n            tails[i] = x\n    return len(tails)\n`,
    java: `public int lengthOfLIS(int[] nums) {\n    int[] tails = new int[nums.length];\n    int size = 0;\n    for (int x : nums) {\n        int i = Arrays.binarySearch(tails, 0, size, x);\n        if (i < 0) i = -(i + 1);\n        tails[i] = x;\n        if (i == size) size++;\n    }\n    return size;\n}\n`,
    cpp: `int lengthOfLIS(vector<int>& nums) {\n    vector<int> tails;\n    for (int x: nums) {\n        auto it = lower_bound(tails.begin(), tails.end(), x);\n        if (it == tails.end()) tails.push_back(x);\n        else *it = x;\n    }\n    return (int)tails.size();\n}\n`
  },
  'longest-common-subsequence': {
    python: `def longestCommonSubsequence(text1, text2):\n    m, n = len(text1), len(text2)\n    dp = [0] * (n + 1)\n    for i in range(1, m + 1):\n        prev = 0\n        for j in range(1, n + 1):\n            tmp = dp[j]\n            if text1[i-1] == text2[j-1]:\n                dp[j] = prev + 1\n            else:\n                dp[j] = max(dp[j], dp[j-1])\n            prev = tmp\n    return dp[n]\n`,
    java: `public int longestCommonSubsequence(String text1, String text2) {\n    int m = text1.length(), n = text2.length();\n    int[] dp = new int[n + 1];\n    for (int i = 1; i <= m; i++) {\n        int prev = 0;\n        for (int j = 1; j <= n; j++) {\n            int tmp = dp[j];\n            if (text1.charAt(i - 1) == text2.charAt(j - 1)) dp[j] = prev + 1;\n            else dp[j] = Math.max(dp[j], dp[j - 1]);\n            prev = tmp;\n        }\n    }\n    return dp[n];\n}\n`,
    cpp: `int longestCommonSubsequence(string a, string b) {\n    int m=a.size(), n=b.size();\n    vector<int> dp(n+1, 0);\n    for (int i=1;i<=m;i++){\n        int prev=0;\n        for (int j=1;j<=n;j++){\n            int tmp=dp[j];\n            if (a[i-1]==b[j-1]) dp[j]=prev+1;\n            else dp[j]=max(dp[j], dp[j-1]);\n            prev=tmp;\n        }\n    }\n    return dp[n];\n}\n`
  },
  'partition-equal-subset-sum': {
    python: `def canPartition(nums):\n    s = sum(nums)\n    if s % 2: return False\n    target = s // 2\n    dp = [False] * (target + 1)\n    dp[0] = True\n    for x in nums:\n        for j in range(target, x - 1, -1):\n            dp[j] = dp[j] or dp[j - x]\n    return dp[target]\n`,
    java: `public boolean canPartition(int[] nums) {\n    int sum = 0;\n    for (int x : nums) sum += x;\n    if (sum % 2 == 1) return false;\n    int target = sum / 2;\n    boolean[] dp = new boolean[target + 1];\n    dp[0] = true;\n    for (int x : nums) {\n        for (int j = target; j >= x; j--) {\n            dp[j] = dp[j] || dp[j - x];\n        }\n    }\n    return dp[target];\n}\n`,
    cpp: `bool canPartition(vector<int>& nums) {\n    int sum=0; for (int x: nums) sum += x;\n    if (sum % 2) return false;\n    int target = sum/2;\n    vector<char> dp(target+1, 0);\n    dp[0] = 1;\n    for (int x: nums) {\n        for (int j=target; j>=x; j--) {\n            dp[j] = dp[j] || dp[j-x];\n        }\n    }\n    return dp[target];\n}\n`
  },
  'edit-distance': {
    python: `def minDistance(word1, word2):\n    m, n = len(word1), len(word2)\n    dp = list(range(n + 1))\n    for i in range(1, m + 1):\n        prev = dp[0]\n        dp[0] = i\n        for j in range(1, n + 1):\n            tmp = dp[j]\n            if word1[i-1] == word2[j-1]:\n                dp[j] = prev\n            else:\n                dp[j] = 1 + min(prev, dp[j], dp[j-1])\n            prev = tmp\n    return dp[n]\n`,
    java: `public int minDistance(String a, String b) {\n    int m = a.length(), n = b.length();\n    int[] dp = new int[n + 1];\n    for (int j = 0; j <= n; j++) dp[j] = j;\n    for (int i = 1; i <= m; i++) {\n        int prev = dp[0];\n        dp[0] = i;\n        for (int j = 1; j <= n; j++) {\n            int tmp = dp[j];\n            if (a.charAt(i - 1) == b.charAt(j - 1)) dp[j] = prev;\n            else dp[j] = 1 + Math.min(prev, Math.min(dp[j], dp[j - 1]));\n            prev = tmp;\n        }\n    }\n    return dp[n];\n}\n`,
    cpp: `int minDistance(string a, string b) {\n    int m=a.size(), n=b.size();\n    vector<int> dp(n+1);\n    for (int j=0;j<=n;j++) dp[j]=j;\n    for (int i=1;i<=m;i++){\n        int prev=dp[0];\n        dp[0]=i;\n        for (int j=1;j<=n;j++){\n            int tmp=dp[j];\n            if (a[i-1]==b[j-1]) dp[j]=prev;\n            else dp[j]=1+min(prev, min(dp[j], dp[j-1]));\n            prev=tmp;\n        }\n    }\n    return dp[n];\n}\n`
  },
  'unique-paths': {
    python: `def uniquePaths(m, n):\n    dp = [1] * n\n    for _ in range(1, m):\n        for j in range(1, n):\n            dp[j] += dp[j-1]\n    return dp[-1]\n`,
    java: `public int uniquePaths(int m, int n) {\n    int[] dp = new int[n];\n    Arrays.fill(dp, 1);\n    for (int i = 1; i < m; i++) {\n        for (int j = 1; j < n; j++) {\n            dp[j] += dp[j - 1];\n        }\n    }\n    return dp[n - 1];\n}\n`,
    cpp: `int uniquePaths(int m, int n) {\n    vector<int> dp(n, 1);\n    for (int i=1;i<m;i++){\n        for (int j=1;j<n;j++){\n            dp[j] += dp[j-1];\n        }\n    }\n    return dp[n-1];\n}\n`
  },
  'word-break': {
    python: `def wordBreak(s, wordDict):\n    wordSet = set(wordDict)\n    n = len(s)\n    dp = [False] * (n + 1)\n    dp[0] = True\n    for i in range(1, n + 1):\n        for j in range(i):\n            if dp[j] and s[j:i] in wordSet:\n                dp[i] = True\n                break\n    return dp[n]\n`,
    java: `public boolean wordBreak(String s, List<String> wordDict) {\n    Set<String> set = new HashSet<>(wordDict);\n    int n = s.length();\n    boolean[] dp = new boolean[n + 1];\n    dp[0] = true;\n    for (int i = 1; i <= n; i++) {\n        for (int j = 0; j < i; j++) {\n            if (dp[j] && set.contains(s.substring(j, i))) {\n                dp[i] = true;\n                break;\n            }\n        }\n    }\n    return dp[n];\n}\n`,
    cpp: `bool wordBreak(string s, vector<string>& wordDict) {\n    unordered_set<string> set(wordDict.begin(), wordDict.end());\n    int n = s.size();\n    vector<char> dp(n+1, 0);\n    dp[0] = 1;\n    for (int i=1;i<=n;i++){\n        for (int j=0;j<i;j++){\n            if (dp[j] && set.count(s.substr(j, i-j))) {\n                dp[i] = 1;\n                break;\n            }\n        }\n    }\n    return dp[n];\n}\n`
  },
  'maximal-square': {
    python: `def maximalSquare(matrix):\n    if not matrix or not matrix[0]: return 0\n    m, n = len(matrix), len(matrix[0])\n    dp = [0] * (n + 1)\n    best = 0\n    for i in range(1, m + 1):\n        prev = 0\n        for j in range(1, n + 1):\n            tmp = dp[j]\n            if matrix[i-1][j-1] == '1':\n                dp[j] = 1 + min(dp[j], dp[j-1], prev)\n                best = max(best, dp[j])\n            else:\n                dp[j] = 0\n            prev = tmp\n    return best * best\n`,
    java: `public int maximalSquare(char[][] matrix) {\n    if (matrix == null || matrix.length == 0 || matrix[0].length == 0) return 0;\n    int m = matrix.length, n = matrix[0].length;\n    int[] dp = new int[n + 1];\n    int best = 0;\n    for (int i = 1; i <= m; i++) {\n        int prev = 0;\n        for (int j = 1; j <= n; j++) {\n            int tmp = dp[j];\n            if (matrix[i - 1][j - 1] == '1') {\n                dp[j] = 1 + Math.min(dp[j], Math.min(dp[j - 1], prev));\n                best = Math.max(best, dp[j]);\n            } else {\n                dp[j] = 0;\n            }\n            prev = tmp;\n        }\n    }\n    return best * best;\n}\n`,
    cpp: `int maximalSquare(vector<vector<char>>& matrix) {\n    if (matrix.empty() || matrix[0].empty()) return 0;\n    int m=matrix.size(), n=matrix[0].size();\n    vector<int> dp(n+1, 0);\n    int best=0;\n    for (int i=1;i<=m;i++){\n        int prev=0;\n        for (int j=1;j<=n;j++){\n            int tmp=dp[j];\n            if (matrix[i-1][j-1]=='1') {\n                dp[j] = 1 + min(dp[j], min(dp[j-1], prev));\n                best = max(best, dp[j]);\n            } else dp[j]=0;\n            prev=tmp;\n        }\n    }\n    return best*best;\n}\n`
  },
  'best-time-to-buy-and-sell-stock-with-cooldown': {
    python: `def maxProfit(prices):\n    if not prices: return 0\n    hold = -prices[0]\n    sold = 0\n    rest = 0\n    for p in prices[1:]:\n        prevSold = sold\n        sold = hold + p\n        hold = max(hold, rest - p)\n        rest = max(rest, prevSold)\n    return max(sold, rest)\n`,
    java: `public int maxProfit(int[] prices) {\n    if (prices.length == 0) return 0;\n    int hold = -prices[0];\n    int sold = 0;\n    int rest = 0;\n    for (int i = 1; i < prices.length; i++) {\n        int p = prices[i];\n        int prevSold = sold;\n        sold = hold + p;\n        hold = Math.max(hold, rest - p);\n        rest = Math.max(rest, prevSold);\n    }\n    return Math.max(sold, rest);\n}\n`,
    cpp: `int maxProfit(vector<int>& prices) {\n    if (prices.empty()) return 0;\n    int hold = -prices[0];\n    int sold = 0;\n    int rest = 0;\n    for (int i=1;i<(int)prices.size();i++){\n        int p = prices[i];\n        int prevSold = sold;\n        sold = hold + p;\n        hold = max(hold, rest - p);\n        rest = max(rest, prevSold);\n    }\n    return max(sold, rest);\n}\n`
  },
};

function isPlaceholder(snippet) {
  const s = (snippet || '').toLowerCase();
  return s.includes('intentional_mismatch_placeholder') ||
    s.includes('notimplementederror') ||
    s.includes('unsupportedoperationexception') ||
    s.includes("todo: implement") ||
    s.includes('raise notimplementederror') ||
    s.includes('throw new unsupportedoperationexception') ||
    s.includes('throw std::logic_error');
}

let patched = 0;
let missingFix = [];

for (const q of questions) {
  const s = q.codeSnippet || {};
  const has = isPlaceholder(s.python) || isPlaceholder(s.java) || isPlaceholder(s.cpp);
  if (!has) continue;

  const fix = fixes[q.leetcodeSlug];
  if (!fix) {
    missingFix.push({ id: q.id, slug: q.leetcodeSlug });
    continue;
  }

  q.codeSnippet = { python: fix.python, java: fix.java, cpp: fix.cpp };
  patched++;
}

fs.writeFileSync(questionsPath, 'module.exports = ' + JSON.stringify(questions, null, 2) + ';\n', 'utf8');

console.log(JSON.stringify({ patched, missingFixCount: missingFix.length, missingFix }, null, 2));
