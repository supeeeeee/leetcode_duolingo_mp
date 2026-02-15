module.exports = [
  {
    "id": "q001",
    "topicId": "ch04_prefix_diff",
    "type": "multiple_choice",
    "question": "【两数之和】 最优解法的核心数据结构是什么？",
    "options": [
      "哈希表",
      "单调栈",
      "前缀树",
      "并查集"
    ],
    "correctIndex": 0,
    "explanation": "使用哈希表记录值到索引，可在一次遍历内完成查找。",
    "xp": 14,
    "codeSnippet": {
      "python": "def twoSum(nums, target):\n    hashmap = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in hashmap:\n            return [hashmap[complement], i]\n        hashmap[num] = i",
      "java": "public int[] twoSum(int[] nums, int target) {\n    Map<Integer, Integer> map = new HashMap<>();\n    for (int i = 0; i < nums.length; i++) {\n        int complement = target - nums[i];\n        if (map.containsKey(complement)) {\n            return new int[] { map.get(complement), i };\n        }\n        map.put(nums[i], i);\n    }\n    return new int[0];\n}",
      "cpp": "vector<int> twoSum(vector<int>& nums, int target) {\n    unordered_map<int, int> hashmap;\n    for (int i = 0; i < nums.size(); i++) {\n        int complement = target - nums[i];\n        if (hashmap.count(complement)) {\n            return {hashmap[complement], i};\n        }\n        hashmap[nums[i]] = i;\n    }\n    return {};\n}",
      "javascript": "function twoSum(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (map.has(complement)) return [map.get(complement), i];\n        map.set(nums[i], i);\n    }\n};"
    },
    "learning": {
      "pattern": "数组扫描 + 不变量维护（最值/前后缀/原地映射）",
      "coreQuestion": "当遍历到 nums[i]，如何 O(1) 找到 target-nums[i]？",
      "framework": "先暴力确定变量关系，再用前缀信息、双指针或原地映射降复杂度。",
      "steps": [
        "先查 complement 是否出现",
        "命中就返回索引对",
        "未命中则把当前值写入哈希"
      ],
      "pitfalls": [
        "先写入再查询会匹配自己"
      ],
      "complexity": "目标通常是时间 O(n)、空间 O(1) 或 O(n)。",
      "template": "先写出暴力关系，再识别可复用信息（前缀、后缀、最值）。\n用一次遍历维护状态并处理边界。",
      "insight": "这是一类经典的‘求和’转‘查找’问题。哈希表的作用就是：把对‘未来’或‘过去’的查找动作，从 O(n) 降到 O(1)。"
    },
    "description": "给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那两个整数，并返回他们的数组下标。",
    "leetcodeSlug": "two-sum",
    "track": "extra"
  },
  {
    "id": "q002",
    "topicId": "ch07_dynamic_programming",
    "type": "multiple_choice",
    "question": "【买卖股票的最佳时机】 单次交易最优策略是？",
    "options": [
      "维护历史最小值并更新最大利润",
      "每次上涨就卖出",
      "动态规划三维状态",
      "双端队列维护窗口"
    ],
    "correctIndex": 0,
    "explanation": "一次遍历：minPrice 与 maxProfit。",
    "xp": 12,
    "learning": {
      "pattern": "数组题通用框架（枚举 + 结构优化）",
      "coreQuestion": "是否能在一次遍历中维护足够信息，避免双重循环？",
      "framework": "先暴力确定变量关系，再用前缀信息、双指针或原地映射降复杂度。",
      "steps": [
        "先写出暴力关系式（两层循环）",
        "观察可复用信息（前缀和/最值/哈希）",
        "将关系转成“边遍历边更新”"
      ],
      "pitfalls": [
        "忽略空数组或长度 1",
        "原地修改数组时覆盖未处理值",
        "边界下标 +1/-1 错误"
      ],
      "complexity": "目标通常是时间 O(n)、空间 O(1) 或 O(n)。",
      "template": "先写出暴力关系，再识别可复用信息（前缀、后缀、最值）。\n用一次遍历维护状态并处理边界。",
      "insight": "数组题本质是把“重复计算”改成“状态复用”，关键在于每一步维护的不变量是否正确。"
    },
    "codeSnippet": {
      "python": "def maxProfit(prices):\n    min_price = float('inf')\n    ans = 0\n    for p in prices:\n        min_price = min(min_price, p)\n        ans = max(ans, p - min_price)\n    return ans\n",
      "java": "public int maxProfit(int[] prices) {\n    int minPrice = Integer.MAX_VALUE;\n    int ans = 0;\n    for (int p : prices) {\n        minPrice = Math.min(minPrice, p);\n        ans = Math.max(ans, p - minPrice);\n    }\n    return ans;\n}\n",
      "cpp": "int maxProfit(vector<int>& prices) {\n    int minPrice = INT_MAX;\n    int ans = 0;\n    for (int p : prices) {\n        minPrice = min(minPrice, p);\n        ans = max(ans, p - minPrice);\n    }\n    return ans;\n}\n"
    },
    "description": "给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。设计一个算法来计算你所能获取的最大利润。你只能选择某一天买入这只股票，并选择在未来的某一个不同的日子卖出该股票。",
    "leetcodeSlug": "best-time-to-buy-and-sell-stock",
    "handbookRef": {
      "leetcodeId": 121,
      "chapter": "第七章：动态规划",
      "section": "7.3 股票买卖系列",
      "orderInSection": 1,
      "mdLine": 974
    },
    "track": "core"
  },
  {
    "id": "q003",
    "topicId": "ch04_prefix_diff",
    "type": "multiple_choice",
    "question": "【除自身以外数组的乘积】 不使用除法时，应组合哪两类信息？",
    "options": [
      "前缀积+后缀积",
      "排序+二分",
      "哈希计数+滑窗",
      "并查集+路径压缩"
    ],
    "correctIndex": 0,
    "explanation": "每个位置答案=左侧乘积*右侧乘积。",
    "xp": 12,
    "learning": {
      "pattern": "数组题通用框架（枚举 + 结构优化）",
      "coreQuestion": "是否能在一次遍历中维护足够信息，避免双重循环？",
      "framework": "先暴力确定变量关系，再用前缀信息、双指针或原地映射降复杂度。",
      "steps": [
        "先写出暴力关系式（两层循环）",
        "观察可复用信息（前缀和/最值/哈希）",
        "将关系转成“边遍历边更新”"
      ],
      "pitfalls": [
        "忽略空数组或长度 1",
        "原地修改数组时覆盖未处理值",
        "边界下标 +1/-1 错误"
      ],
      "complexity": "目标通常是时间 O(n)、空间 O(1) 或 O(n)。",
      "template": "先写出暴力关系，再识别可复用信息（前缀、后缀、最值）。\n用一次遍历维护状态并处理边界。",
      "insight": "数组题本质是把“重复计算”改成“状态复用”，关键在于每一步维护的不变量是否正确。"
    },
    "codeSnippet": {
      "python": "def productExceptSelf(nums):\n    n = len(nums)\n    res = [1] * n\n    prefix = 1\n    for i in range(n):\n        res[i] = prefix\n        prefix *= nums[i]\n    suffix = 1\n    for i in range(n - 1, -1, -1):\n        res[i] *= suffix\n        suffix *= nums[i]\n    return res\n",
      "java": "public int[] productExceptSelf(int[] nums) {\n    int n = nums.length;\n    int[] res = new int[n];\n    int prefix = 1;\n    for (int i = 0; i < n; i++) {\n        res[i] = prefix;\n        prefix *= nums[i];\n    }\n    int suffix = 1;\n    for (int i = n - 1; i >= 0; i--) {\n        res[i] *= suffix;\n        suffix *= nums[i];\n    }\n    return res;\n}\n",
      "cpp": "vector<int> productExceptSelf(vector<int>& nums) {\n    int n = nums.size();\n    vector<int> res(n, 1);\n    int prefix = 1;\n    for (int i = 0; i < n; i++) {\n        res[i] = prefix;\n        prefix *= nums[i];\n    }\n    int suffix = 1;\n    for (int i = n - 1; i >= 0; i--) {\n        res[i] *= suffix;\n        suffix *= nums[i];\n    }\n    return res;\n}\n"
    },
    "description": "给你一个整数数组 nums，返回一个数组 answer ，其中 answer[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积。请不要使用除法，且在 O(n) 时间复杂度内完成。",
    "leetcodeSlug": "product-of-array-except-self",
    "track": "extra"
  },
  {
    "id": "q004",
    "topicId": "ch07_dynamic_programming",
    "type": "multiple_choice",
    "question": "【最大子数组和】 Kadane 算法的状态转移是？",
    "options": [
      "cur=max(nums[i],cur+nums[i])",
      "cur=max(cur,nums[i-1])",
      "cur=min(nums[i],cur+nums[i])",
      "cur=cur*nums[i]"
    ],
    "correctIndex": 0,
    "explanation": "以 i 结尾的最优子数组要么重开要么延续。",
    "xp": 12,
    "learning": {
      "pattern": "数组题通用框架（枚举 + 结构优化）",
      "coreQuestion": "是否能在一次遍历中维护足够信息，避免双重循环？",
      "framework": "先暴力确定变量关系，再用前缀信息、双指针或原地映射降复杂度。",
      "steps": [
        "先写出暴力关系式（两层循环）",
        "观察可复用信息（前缀和/最值/哈希）",
        "将关系转成“边遍历边更新”"
      ],
      "pitfalls": [
        "忽略空数组或长度 1",
        "原地修改数组时覆盖未处理值",
        "边界下标 +1/-1 错误"
      ],
      "complexity": "目标通常是时间 O(n)、空间 O(1) 或 O(n)。",
      "template": "先写出暴力关系，再识别可复用信息（前缀、后缀、最值）。\n用一次遍历维护状态并处理边界。",
      "insight": "数组题本质是把“重复计算”改成“状态复用”，关键在于每一步维护的不变量是否正确。"
    },
    "codeSnippet": {
      "python": "def maxSubArray(nums):\n    best = nums[0]\n    cur = 0\n    for x in nums:\n        cur = max(x, cur + x)\n        best = max(best, cur)\n    return best\n",
      "java": "public int maxSubArray(int[] nums) {\n    int best = nums[0];\n    int cur = 0;\n    for (int x : nums) {\n        cur = Math.max(x, cur + x);\n        best = Math.max(best, cur);\n    }\n    return best;\n}\n",
      "cpp": "int maxSubArray(vector<int>& nums) {\n    int best = nums[0];\n    int cur = 0;\n    for (int x : nums) {\n        cur = max(x, cur + x);\n        best = max(best, cur);\n    }\n    return best;\n}\n"
    },
    "description": "给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。",
    "leetcodeSlug": "maximum-subarray",
    "handbookRef": {
      "leetcodeId": 53,
      "chapter": "第七章：动态规划",
      "section": "7.1 动态规划核心框架",
      "orderInSection": 2,
      "mdLine": 885
    },
    "track": "core"
  },
  {
    "id": "q005",
    "topicId": "ch04_prefix_diff",
    "type": "multiple_choice",
    "question": "【合并区间】 为什么先按左端点排序？",
    "options": [
      "让可合并区间变为连续处理",
      "保证区间长度最短",
      "减少空间到 O(1)",
      "便于并行计算"
    ],
    "correctIndex": 0,
    "explanation": "排序后只需和结果最后一个区间比较。",
    "xp": 13,
    "codeSnippet": {
      "python": "def merge(intervals):\n    intervals.sort(key=lambda x: x[0])\n    merged = []\n    for interval in intervals:\n        if not merged or merged[-1][1] < interval[0]:\n            merged.append(interval)\n        else:\n            merged[-1][1] = max(merged[-1][1], interval[1])\n    return merged",
      "java": "public int[][] merge(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    LinkedList<int[]> merged = new LinkedList<>();\n    for (int[] interval : intervals) {\n        if (merged.isEmpty() || merged.getLast()[1] < interval[0]) {\n            merged.add(interval);\n        } else {\n            merged.getLast()[1] = Math.max(merged.getLast()[1], interval[1]);\n        }\n    }\n    return merged.toArray(new int[merged.size()][]);\n}",
      "cpp": "vector<vector<int>> merge(vector<vector<int>>& intervals) {\n    if (intervals.empty()) return {};\n    sort(intervals.begin(), intervals.end());\n    vector<vector<int>> merged;\n    for (auto& interval : intervals) {\n        if (merged.empty() || merged.back()[1] < interval[0]) {\n            merged.push_back(interval);\n        } else {\n            merged.back()[1] = max(merged.back()[1], interval[1]);\n        }\n    }\n    return merged;\n}"
    },
    "learning": {
      "pattern": "数组题通用框架（枚举 + 结构优化）",
      "coreQuestion": "是否能在一次遍历中维护足够信息，避免双重循环？",
      "framework": "先暴力确定变量关系，再用前缀信息、双指针或原地映射降复杂度。",
      "steps": [
        "先写出暴力关系式（两层循环）",
        "观察可复用信息（前缀和/最值/哈希）",
        "将关系转成“边遍历边更新”"
      ],
      "pitfalls": [
        "忽略空数组或长度 1",
        "原地修改数组时覆盖未处理值",
        "边界下标 +1/-1 错误"
      ],
      "complexity": "目标通常是时间 O(n)、空间 O(1) 或 O(n)。",
      "template": "先写出暴力关系，再识别可复用信息（前缀、后缀、最值）。\n用一次遍历维护状态并处理边界。",
      "insight": "数组题本质是把“重复计算”改成“状态复用”，关键在于每一步维护的不变量是否正确。"
    },
    "description": "以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi]。请你合并所有重叠的区间，并返回一个不重叠的区间数组。",
    "leetcodeSlug": "merge-intervals",
    "track": "extra"
  },
  {
    "id": "q006",
    "topicId": "ch04_prefix_diff",
    "type": "multiple_choice",
    "question": "【轮转数组】 O(1) 额外空间常用做法是？",
    "options": [
      "整体反转+分段反转",
      "每次右移一位共 k 次",
      "建立新数组拷贝",
      "快速选择"
    ],
    "correctIndex": 0,
    "explanation": "三次反转实现旋转。",
    "xp": 12,
    "learning": {
      "pattern": "数组题通用框架（枚举 + 结构优化）",
      "coreQuestion": "是否能在一次遍历中维护足够信息，避免双重循环？",
      "framework": "先暴力确定变量关系，再用前缀信息、双指针或原地映射降复杂度。",
      "steps": [
        "先写出暴力关系式（两层循环）",
        "观察可复用信息（前缀和/最值/哈希）",
        "将关系转成“边遍历边更新”"
      ],
      "pitfalls": [
        "忽略空数组或长度 1",
        "原地修改数组时覆盖未处理值",
        "边界下标 +1/-1 错误"
      ],
      "complexity": "目标通常是时间 O(n)、空间 O(1) 或 O(n)。",
      "template": "先写出暴力关系，再识别可复用信息（前缀、后缀、最值）。\n用一次遍历维护状态并处理边界。",
      "insight": "数组题本质是把“重复计算”改成“状态复用”，关键在于每一步维护的不变量是否正确。"
    },
    "codeSnippet": {
      "python": "def rotate(nums, k):\n    n = len(nums)\n    if n == 0: return\n    k %= n\n    def rev(l, r):\n        while l < r:\n            nums[l], nums[r] = nums[r], nums[l]\n            l += 1\n            r -= 1\n    rev(0, n - 1)\n    rev(0, k - 1)\n    rev(k, n - 1)\n",
      "java": "public void rotate(int[] nums, int k) {\n    int n = nums.length;\n    if (n == 0) return;\n    k %= n;\n    reverse(nums, 0, n - 1);\n    reverse(nums, 0, k - 1);\n    reverse(nums, k, n - 1);\n}\nprivate void reverse(int[] a, int l, int r) {\n    while (l < r) {\n        int tmp = a[l];\n        a[l] = a[r];\n        a[r] = tmp;\n        l++;\n        r--;\n    }\n}\n",
      "cpp": "void rotate(vector<int>& nums, int k) {\n    int n = nums.size();\n    if (n == 0) return;\n    k %= n;\n    reverse(nums.begin(), nums.end());\n    reverse(nums.begin(), nums.begin() + k);\n    reverse(nums.begin() + k, nums.end());\n}\n"
    },
    "description": "给你一个数组，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。尝试使用 O(1) 额外空间完成。",
    "leetcodeSlug": "rotate-array",
    "track": "extra"
  },
  {
    "id": "q007",
    "topicId": "ch04_prefix_diff",
    "type": "multiple_choice",
    "question": "【移动零】 保持相对顺序的线性做法是？",
    "options": [
      "快慢指针交换非零元素",
      "冒泡把零沉底",
      "排序",
      "哈希计数"
    ],
    "correctIndex": 0,
    "explanation": "slow 指向下一个放非零的位置。",
    "xp": 12,
    "learning": {
      "pattern": "数组题通用框架（枚举 + 结构优化）",
      "coreQuestion": "是否能在一次遍历中维护足够信息，避免双重循环？",
      "framework": "先暴力确定变量关系，再用前缀信息、双指针或原地映射降复杂度。",
      "steps": [
        "先写出暴力关系式（两层循环）",
        "观察可复用信息（前缀和/最值/哈希）",
        "将关系转成“边遍历边更新”"
      ],
      "pitfalls": [
        "忽略空数组或长度 1",
        "原地修改数组时覆盖未处理值",
        "边界下标 +1/-1 错误"
      ],
      "complexity": "目标通常是时间 O(n)、空间 O(1) 或 O(n)。",
      "template": "先写出暴力关系，再识别可复用信息（前缀、后缀、最值）。\n用一次遍历维护状态并处理边界。",
      "insight": "数组题本质是把“重复计算”改成“状态复用”，关键在于每一步维护的不变量是否正确。"
    },
    "codeSnippet": {
      "python": "def moveZeroes(nums):\n    slow = 0\n    for fast in range(len(nums)):\n        if nums[fast] != 0:\n            nums[slow], nums[fast] = nums[fast], nums[slow]\n            slow += 1\n",
      "java": "public void moveZeroes(int[] nums) {\n    int slow = 0;\n    for (int fast = 0; fast < nums.length; fast++) {\n        if (nums[fast] != 0) {\n            int tmp = nums[slow];\n            nums[slow] = nums[fast];\n            nums[fast] = tmp;\n            slow++;\n        }\n    }\n}\n",
      "cpp": "void moveZeroes(vector<int>& nums) {\n    int slow = 0;\n    for (int fast = 0; fast < (int)nums.size(); fast++) {\n        if (nums[fast] != 0) {\n            swap(nums[slow], nums[fast]);\n            slow++;\n        }\n    }\n}\n"
    },
    "description": "给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。必须在原数组上操作。",
    "leetcodeSlug": "move-zeroes",
    "track": "extra"
  },
  {
    "id": "q008",
    "topicId": "ch04_prefix_diff",
    "type": "multiple_choice",
    "question": "【多数元素】 Boyer-Moore 的关键思想是？",
    "options": [
      "不同元素相互抵消",
      "统计全部频次",
      "维护最小堆",
      "滑窗计数"
    ],
    "correctIndex": 0,
    "explanation": "多数元素数量超过一半，抵消后仍会留下。",
    "xp": 12,
    "learning": {
      "pattern": "数组题通用框架（枚举 + 结构优化）",
      "coreQuestion": "是否能在一次遍历中维护足够信息，避免双重循环？",
      "framework": "先暴力确定变量关系，再用前缀信息、双指针或原地映射降复杂度。",
      "steps": [
        "先写出暴力关系式（两层循环）",
        "观察可复用信息（前缀和/最值/哈希）",
        "将关系转成“边遍历边更新”"
      ],
      "pitfalls": [
        "忽略空数组或长度 1",
        "原地修改数组时覆盖未处理值",
        "边界下标 +1/-1 错误"
      ],
      "complexity": "目标通常是时间 O(n)、空间 O(1) 或 O(n)。",
      "template": "先写出暴力关系，再识别可复用信息（前缀、后缀、最值）。\n用一次遍历维护状态并处理边界。",
      "insight": "数组题本质是把“重复计算”改成“状态复用”，关键在于每一步维护的不变量是否正确。"
    },
    "codeSnippet": {
      "python": "def majorityElement(nums):\n    cand = None\n    cnt = 0\n    for x in nums:\n        if cnt == 0:\n            cand = x\n            cnt = 1\n        elif x == cand:\n            cnt += 1\n        else:\n            cnt -= 1\n    return cand\n",
      "java": "public int majorityElement(int[] nums) {\n    int cand = 0, cnt = 0;\n    for (int x : nums) {\n        if (cnt == 0) { cand = x; cnt = 1; }\n        else if (x == cand) cnt++;\n        else cnt--;\n    }\n    return cand;\n}\n",
      "cpp": "int majorityElement(vector<int>& nums) {\n    int cand = 0, cnt = 0;\n    for (int x : nums) {\n        if (cnt == 0) { cand = x; cnt = 1; }\n        else if (x == cand) cnt++;\n        else cnt--;\n    }\n    return cand;\n}\n"
    },
    "description": "给定一个大小为 n 的数组 nums ，返回其中的多数元素。多数元素是指在数组中出现次数大于 ⌊ n/2 ⌋ 的元素。",
    "leetcodeSlug": "majority-element",
    "track": "extra"
  },
  {
    "id": "q009",
    "topicId": "ch04_prefix_diff",
    "type": "multiple_choice",
    "question": "【下一个排列】 从后往前找到第一个下降位后，下一步是？",
    "options": [
      "在后缀中找刚好大于它的数交换",
      "把后缀排序升序再交换",
      "直接整体反转",
      "删除该位"
    ],
    "correctIndex": 0,
    "explanation": "交换后再反转后缀得到最小增量。",
    "xp": 12,
    "learning": {
      "pattern": "数组题通用框架（枚举 + 结构优化）",
      "coreQuestion": "是否能在一次遍历中维护足够信息，避免双重循环？",
      "framework": "先暴力确定变量关系，再用前缀信息、双指针或原地映射降复杂度。",
      "steps": [
        "先写出暴力关系式（两层循环）",
        "观察可复用信息（前缀和/最值/哈希）",
        "将关系转成“边遍历边更新”"
      ],
      "pitfalls": [
        "忽略空数组或长度 1",
        "原地修改数组时覆盖未处理值",
        "边界下标 +1/-1 错误"
      ],
      "complexity": "目标通常是时间 O(n)、空间 O(1) 或 O(n)。",
      "template": "先写出暴力关系，再识别可复用信息（前缀、后缀、最值）。\n用一次遍历维护状态并处理边界。",
      "insight": "数组题本质是把“重复计算”改成“状态复用”，关键在于每一步维护的不变量是否正确。"
    },
    "codeSnippet": {
      "python": "def nextPermutation(nums):\n    n = len(nums)\n    i = n - 2\n    while i >= 0 and nums[i] >= nums[i+1]:\n        i -= 1\n    if i >= 0:\n        j = n - 1\n        while nums[j] <= nums[i]:\n            j -= 1\n        nums[i], nums[j] = nums[j], nums[i]\n    l, r = i + 1, n - 1\n    while l < r:\n        nums[l], nums[r] = nums[r], nums[l]\n        l += 1\n        r -= 1\n",
      "java": "public void nextPermutation(int[] nums) {\n    int n = nums.length;\n    int i = n - 2;\n    while (i >= 0 && nums[i] >= nums[i + 1]) i--;\n    if (i >= 0) {\n        int j = n - 1;\n        while (nums[j] <= nums[i]) j--;\n        swap(nums, i, j);\n    }\n    reverse(nums, i + 1, n - 1);\n}\nprivate void swap(int[] a, int i, int j) {\n    int t = a[i]; a[i] = a[j]; a[j] = t;\n}\nprivate void reverse(int[] a, int l, int r) {\n    while (l < r) swap(a, l++, r--);\n}\n",
      "cpp": "void nextPermutation(vector<int>& nums) {\n    int n = nums.size();\n    int i = n - 2;\n    while (i >= 0 && nums[i] >= nums[i+1]) i--;\n    if (i >= 0) {\n        int j = n - 1;\n        while (nums[j] <= nums[i]) j--;\n        swap(nums[i], nums[j]);\n    }\n    reverse(nums.begin() + i + 1, nums.end());\n}\n"
    },
    "description": "给你一个整数数组 nums ，找出 nums 的下一个字典序更大的排列。如果不存在下一个更大的排列，则将数组重新按升序排列。",
    "leetcodeSlug": "next-permutation",
    "track": "extra"
  },
  {
    "id": "q010",
    "topicId": "ch04_prefix_diff",
    "type": "multiple_choice",
    "question": "【颜色分类】 荷兰国旗问题需要几个指针？",
    "options": [
      "3 个",
      "2 个",
      "4 个",
      "1 个"
    ],
    "correctIndex": 0,
    "explanation": "low、mid、high 三指针划分 0/1/2。",
    "xp": 12,
    "learning": {
      "pattern": "数组题通用框架（枚举 + 结构优化）",
      "coreQuestion": "是否能在一次遍历中维护足够信息，避免双重循环？",
      "framework": "先暴力确定变量关系，再用前缀信息、双指针或原地映射降复杂度。",
      "steps": [
        "先写出暴力关系式（两层循环）",
        "观察可复用信息（前缀和/最值/哈希）",
        "将关系转成“边遍历边更新”"
      ],
      "pitfalls": [
        "忽略空数组或长度 1",
        "原地修改数组时覆盖未处理值",
        "边界下标 +1/-1 错误"
      ],
      "complexity": "目标通常是时间 O(n)、空间 O(1) 或 O(n)。",
      "template": "先写出暴力关系，再识别可复用信息（前缀、后缀、最值）。\n用一次遍历维护状态并处理边界。",
      "insight": "数组题本质是把“重复计算”改成“状态复用”，关键在于每一步维护的不变量是否正确。"
    },
    "codeSnippet": {
      "python": "def sortColors(nums):\n    low, mid, high = 0, 0, len(nums) - 1\n    while mid <= high:\n        if nums[mid] == 0:\n            nums[low], nums[mid] = nums[mid], nums[low]\n            low += 1\n            mid += 1\n        elif nums[mid] == 1:\n            mid += 1\n        else:\n            nums[mid], nums[high] = nums[high], nums[mid]\n            high -= 1\n",
      "java": "public void sortColors(int[] nums) {\n    int low = 0, mid = 0, high = nums.length - 1;\n    while (mid <= high) {\n        if (nums[mid] == 0) { swap(nums, low++, mid++); }\n        else if (nums[mid] == 1) { mid++; }\n        else { swap(nums, mid, high--); }\n    }\n}\nprivate void swap(int[] a, int i, int j) { int t=a[i]; a[i]=a[j]; a[j]=t; }\n",
      "cpp": "void sortColors(vector<int>& nums) {\n    int low = 0, mid = 0, high = (int)nums.size() - 1;\n    while (mid <= high) {\n        if (nums[mid] == 0) swap(nums[low++], nums[mid++]);\n        else if (nums[mid] == 1) mid++;\n        else swap(nums[mid], nums[high--]);\n    }\n}\n"
    },
    "description": "给定一个包含红色、白色和蓝色、共 n 个元素的数组 nums ，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。",
    "leetcodeSlug": "sort-colors",
    "track": "extra"
  },
  {
    "id": "q011",
    "topicId": "ch04_prefix_diff",
    "type": "multiple_choice",
    "question": "【缺失的第一个正数】 O(n)+O(1) 的核心是？",
    "options": [
      "原地哈希（下标映射）",
      "二分查找",
      "堆排序",
      "位运算"
    ],
    "correctIndex": 0,
    "explanation": "把值 x 放到下标 x-1 上。",
    "xp": 12,
    "learning": {
      "pattern": "数组题通用框架（枚举 + 结构优化）",
      "coreQuestion": "是否能在一次遍历中维护足够信息，避免双重循环？",
      "framework": "先暴力确定变量关系，再用前缀信息、双指针或原地映射降复杂度。",
      "steps": [
        "先写出暴力关系式（两层循环）",
        "观察可复用信息（前缀和/最值/哈希）",
        "将关系转成“边遍历边更新”"
      ],
      "pitfalls": [
        "忽略空数组或长度 1",
        "原地修改数组时覆盖未处理值",
        "边界下标 +1/-1 错误"
      ],
      "complexity": "目标通常是时间 O(n)、空间 O(1) 或 O(n)。",
      "template": "先写出暴力关系，再识别可复用信息（前缀、后缀、最值）。\n用一次遍历维护状态并处理边界。",
      "insight": "数组题本质是把“重复计算”改成“状态复用”，关键在于每一步维护的不变量是否正确。"
    },
    "codeSnippet": {
      "python": "def firstMissingPositive(nums):\n    n = len(nums)\n    for i in range(n):\n        while 1 <= nums[i] <= n and nums[nums[i]-1] != nums[i]:\n            j = nums[i] - 1\n            nums[i], nums[j] = nums[j], nums[i]\n    for i in range(n):\n        if nums[i] != i + 1:\n            return i + 1\n    return n + 1\n",
      "java": "public int firstMissingPositive(int[] nums) {\n    int n = nums.length;\n    for (int i = 0; i < n; i++) {\n        while (nums[i] >= 1 && nums[i] <= n && nums[nums[i]-1] != nums[i]) {\n            int j = nums[i] - 1;\n            int tmp = nums[i];\n            nums[i] = nums[j];\n            nums[j] = tmp;\n        }\n    }\n    for (int i = 0; i < n; i++) {\n        if (nums[i] != i + 1) return i + 1;\n    }\n    return n + 1;\n}\n",
      "cpp": "int firstMissingPositive(vector<int>& nums) {\n    int n = nums.size();\n    for (int i = 0; i < n; i++) {\n        while (nums[i] >= 1 && nums[i] <= n && nums[nums[i]-1] != nums[i]) {\n            swap(nums[i], nums[nums[i]-1]);\n        }\n    }\n    for (int i = 0; i < n; i++) {\n        if (nums[i] != i + 1) return i + 1;\n    }\n    return n + 1;\n}\n"
    },
    "description": "给你一个未排序的整数数组 nums ，请你找出其中没有出现的最小的正整数。请你设计并实现时间复杂度为 O(n) 且仅使用常数级别额外空间的算法。",
    "leetcodeSlug": "first-missing-positive",
    "track": "extra"
  },
  {
    "id": "q012",
    "topicId": "ch10_monotonic",
    "type": "multiple_choice",
    "question": "【接雨水】 双指针做法每步更新哪一个边界？",
    "options": [
      "较低的一侧",
      "较高的一侧",
      "两侧同时",
      "随机一侧"
    ],
    "correctIndex": 0,
    "explanation": "较低侧决定当前可接水上界。",
    "xp": 12,
    "learning": {
      "pattern": "数组题通用框架（枚举 + 结构优化）",
      "coreQuestion": "是否能在一次遍历中维护足够信息，避免双重循环？",
      "framework": "先暴力确定变量关系，再用前缀信息、双指针或原地映射降复杂度。",
      "steps": [
        "先写出暴力关系式（两层循环）",
        "观察可复用信息（前缀和/最值/哈希）",
        "将关系转成“边遍历边更新”"
      ],
      "pitfalls": [
        "忽略空数组或长度 1",
        "原地修改数组时覆盖未处理值",
        "边界下标 +1/-1 错误"
      ],
      "complexity": "目标通常是时间 O(n)、空间 O(1) 或 O(n)。",
      "template": "先写出暴力关系，再识别可复用信息（前缀、后缀、最值）。\n用一次遍历维护状态并处理边界。",
      "insight": "数组题本质是把“重复计算”改成“状态复用”，关键在于每一步维护的不变量是否正确。"
    },
    "codeSnippet": {
      "python": "def trap(height):\n    left, right = 0, len(height) - 1\n    leftMax = rightMax = 0\n    ans = 0\n    while left < right:\n        if height[left] < height[right]:\n            leftMax = max(leftMax, height[left])\n            ans += leftMax - height[left]\n            left += 1\n        else:\n            rightMax = max(rightMax, height[right])\n            ans += rightMax - height[right]\n            right -= 1\n    return ans\n",
      "java": "public int trap(int[] height) {\n    int left = 0, right = height.length - 1;\n    int leftMax = 0, rightMax = 0;\n    int ans = 0;\n    while (left < right) {\n        if (height[left] < height[right]) {\n            leftMax = Math.max(leftMax, height[left]);\n            ans += leftMax - height[left];\n            left++;\n        } else {\n            rightMax = Math.max(rightMax, height[right]);\n            ans += rightMax - height[right];\n            right--;\n        }\n    }\n    return ans;\n}\n",
      "cpp": "int trap(vector<int>& height) {\n    int left = 0, right = (int)height.size() - 1;\n    int leftMax = 0, rightMax = 0;\n    int ans = 0;\n    while (left < right) {\n        if (height[left] < height[right]) {\n            leftMax = max(leftMax, height[left]);\n            ans += leftMax - height[left];\n            left++;\n        } else {\n            rightMax = max(rightMax, height[right]);\n            ans += rightMax - height[right];\n            right--;\n        }\n    }\n    return ans;\n}\n"
    },
    "description": "给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。",
    "leetcodeSlug": "trapping-rain-water",
    "handbookRef": {
      "leetcodeId": 42,
      "chapter": "第十章：单调栈与单调队列",
      "section": "10.1 单调栈",
      "orderInSection": 1,
      "mdLine": 1244
    },
    "track": "core"
  },
  {
    "id": "q013",
    "topicId": "ch04_prefix_diff",
    "type": "multiple_choice",
    "question": "【字母异位词分组】 作为 key 的常用设计是？",
    "options": [
      "排序后的字符串",
      "字符串长度",
      "首字母",
      "hashCode 取模"
    ],
    "correctIndex": 0,
    "explanation": "异位词排序后相同。",
    "xp": 12,
    "learning": {
      "pattern": "哈希映射框架（空间换时间）",
      "coreQuestion": "当前元素需要什么“历史信息”才能 O(1) 决策？",
      "framework": "定义键和值，再明确更新时机：先查再存，还是先存再查。",
      "steps": [
        "定义 map 的 key/value 含义",
        "进入循环先做“命中判断”",
        "最后更新 map 供后续使用"
      ],
      "pitfalls": [
        "更新顺序错误导致自己匹配自己",
        "key 设计不稳定（如可变对象）",
        "忘记处理重复键覆盖策略"
      ],
      "complexity": "平均时间 O(n)，最坏取决于哈希冲突。",
      "template": "定义 key/value 的语义。\n在循环中严格区分“先查后存”或“先存后查”，避免自匹配与覆盖错误。",
      "insight": "哈希的核心不是 API，而是键设计：把原问题映射为 O(1) 查询的可判定条件。"
    },
    "codeSnippet": {
      "python": "from collections import defaultdict\ndef groupAnagrams(strs):\n    groups = defaultdict(list)\n    for s in strs:\n        key = ''.join(sorted(s))\n        groups[key].append(s)\n    return list(groups.values())",
      "java": "public List<List<String>> groupAnagrams(String[] strs) {\n    Map<String, List<String>> groups = new HashMap<>();\n    for (String s : strs) {\n        char[] arr = s.toCharArray();\n        Arrays.sort(arr);\n        String key = new String(arr);\n        groups.computeIfAbsent(key, k -> new ArrayList<>()).add(s);\n    }\n    return new ArrayList<>(groups.values());\n}",
      "cpp": "vector<vector<string>> groupAnagrams(vector<string>& strs) {\n    unordered_map<string, vector<string>> groups;\n    for (string s : strs) {\n        string key = s;\n        sort(key.begin(), key.end());\n        groups[key].push_back(s);\n    }\n    vector<vector<string>> ans;\n    for (auto &p : groups) ans.push_back(p.second);\n    return ans;\n}"
    },
    "description": "给你一个字符串数组，请你将字母异位词组合在一起。可以按任意顺序返回结果列表。字母异位词是由重新排列源字符串的字母得到的一个新字符串。",
    "leetcodeSlug": "group-anagrams",
    "track": "extra"
  },
  {
    "id": "q014",
    "topicId": "ch04_prefix_diff",
    "type": "multiple_choice",
    "question": "【有效的字母异位词】 最稳妥解法是？",
    "options": [
      "计数字符频次并比较",
      "比较 ASCII 和",
      "比较长度",
      "双指针"
    ],
    "correctIndex": 0,
    "explanation": "频次一致才是异位词。",
    "xp": 12,
    "learning": {
      "pattern": "哈希映射框架（空间换时间）",
      "coreQuestion": "当前元素需要什么“历史信息”才能 O(1) 决策？",
      "framework": "定义键和值，再明确更新时机：先查再存，还是先存再查。",
      "steps": [
        "定义 map 的 key/value 含义",
        "进入循环先做“命中判断”",
        "最后更新 map 供后续使用"
      ],
      "pitfalls": [
        "更新顺序错误导致自己匹配自己",
        "key 设计不稳定（如可变对象）",
        "忘记处理重复键覆盖策略"
      ],
      "complexity": "平均时间 O(n)，最坏取决于哈希冲突。",
      "template": "定义 key/value 的语义。\n在循环中严格区分“先查后存”或“先存后查”，避免自匹配与覆盖错误。",
      "insight": "哈希的核心不是 API，而是键设计：把原问题映射为 O(1) 查询的可判定条件。"
    },
    "codeSnippet": {
      "python": "def isAnagram(s, t):\n    if len(s) != len(t): return False\n    from collections import Counter\n    return Counter(s) == Counter(t)\n",
      "java": "public boolean isAnagram(String s, String t) {\n    if (s.length() != t.length()) return false;\n    int[] cnt = new int[26];\n    for (int i = 0; i < s.length(); i++) cnt[s.charAt(i) - 'a']++;\n    for (int i = 0; i < t.length(); i++) {\n        if (--cnt[t.charAt(i) - 'a'] < 0) return false;\n    }\n    return true;\n}\n",
      "cpp": "bool isAnagram(string s, string t) {\n    if (s.size() != t.size()) return false;\n    int cnt[26] = {0};\n    for (char c: s) cnt[c-'a']++;\n    for (char c: t) {\n        if (--cnt[c-'a'] < 0) return false;\n    }\n    return true;\n}\n"
    },
    "description": "给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。",
    "leetcodeSlug": "valid-anagram",
    "track": "extra"
  },
  {
    "id": "q015",
    "topicId": "ch04_prefix_diff",
    "type": "multiple_choice",
    "question": "【和为 K 的子数组】 前缀和+哈希的查找条件是？",
    "options": [
      "pre[j]-k 是否出现过",
      "pre[j]+k 是否出现过",
      "nums[j]-k",
      "nums[j]+k"
    ],
    "correctIndex": 0,
    "explanation": "若 pre[i]=pre[j]-k，则(i,j]和为k。",
    "xp": 12,
    "learning": {
      "pattern": "哈希映射框架（空间换时间）",
      "coreQuestion": "当前元素需要什么“历史信息”才能 O(1) 决策？",
      "framework": "定义键和值，再明确更新时机：先查再存，还是先存再查。",
      "steps": [
        "定义 map 的 key/value 含义",
        "进入循环先做“命中判断”",
        "最后更新 map 供后续使用"
      ],
      "pitfalls": [
        "更新顺序错误导致自己匹配自己",
        "key 设计不稳定（如可变对象）",
        "忘记处理重复键覆盖策略"
      ],
      "complexity": "平均时间 O(n)，最坏取决于哈希冲突。",
      "template": "定义 key/value 的语义。\n在循环中严格区分“先查后存”或“先存后查”，避免自匹配与覆盖错误。",
      "insight": "哈希的核心不是 API，而是键设计：把原问题映射为 O(1) 查询的可判定条件。"
    },
    "codeSnippet": {
      "python": "def subarraySum(nums, k):\n    cnt = {0: 1}\n    pre = 0\n    ans = 0\n    for x in nums:\n        pre += x\n        ans += cnt.get(pre - k, 0)\n        cnt[pre] = cnt.get(pre, 0) + 1\n    return ans\n",
      "java": "public int subarraySum(int[] nums, int k) {\n    Map<Integer, Integer> map = new HashMap<>();\n    map.put(0, 1);\n    int pre = 0, ans = 0;\n    for (int x : nums) {\n        pre += x;\n        ans += map.getOrDefault(pre - k, 0);\n        map.put(pre, map.getOrDefault(pre, 0) + 1);\n    }\n    return ans;\n}\n",
      "cpp": "int subarraySum(vector<int>& nums, int k) {\n    unordered_map<int,int> cnt;\n    cnt[0] = 1;\n    int pre = 0, ans = 0;\n    for (int x : nums) {\n        pre += x;\n        if (cnt.count(pre - k)) ans += cnt[pre - k];\n        cnt[pre]++;\n    }\n    return ans;\n}\n"
    },
    "description": "给你一个整数数组 nums 和一个整数 k ，请你统计并返回该数组中和为 k 的连续子数组的个数。",
    "leetcodeSlug": "subarray-sum-equals-k",
    "handbookRef": {
      "leetcodeId": 560,
      "chapter": "第四章：前缀和与差分数组",
      "section": "4.1 前缀和数组",
      "orderInSection": 1,
      "mdLine": 547
    },
    "track": "core"
  },
  {
    "id": "q016",
    "topicId": "ch04_prefix_diff",
    "type": "multiple_choice",
    "question": "【最长连续序列】 O(n) 做法的关键是？",
    "options": [
      "只从序列起点开始扩展",
      "先排序",
      "双重循环枚举",
      "并查集全连"
    ],
    "correctIndex": 0,
    "explanation": "若 x-1 不在集合里，x 才是起点。",
    "xp": 12,
    "learning": {
      "pattern": "哈希映射框架（空间换时间）",
      "coreQuestion": "当前元素需要什么“历史信息”才能 O(1) 决策？",
      "framework": "定义键和值，再明确更新时机：先查再存，还是先存再查。",
      "steps": [
        "定义 map 的 key/value 含义",
        "进入循环先做“命中判断”",
        "最后更新 map 供后续使用"
      ],
      "pitfalls": [
        "更新顺序错误导致自己匹配自己",
        "key 设计不稳定（如可变对象）",
        "忘记处理重复键覆盖策略"
      ],
      "complexity": "平均时间 O(n)，最坏取决于哈希冲突。",
      "template": "定义 key/value 的语义。\n在循环中严格区分“先查后存”或“先存后查”，避免自匹配与覆盖错误。",
      "insight": "哈希的核心不是 API，而是键设计：把原问题映射为 O(1) 查询的可判定条件。"
    },
    "codeSnippet": {
      "python": "def longestConsecutive(nums):\n    s = set(nums)\n    best = 0\n    for x in s:\n        if x - 1 not in s:\n            y = x\n            while y in s:\n                y += 1\n            best = max(best, y - x)\n    return best\n",
      "java": "public int longestConsecutive(int[] nums) {\n    Set<Integer> set = new HashSet<>();\n    for (int x : nums) set.add(x);\n    int best = 0;\n    for (int x : set) {\n        if (!set.contains(x - 1)) {\n            int y = x;\n            while (set.contains(y)) y++;\n            best = Math.max(best, y - x);\n        }\n    }\n    return best;\n}\n",
      "cpp": "int longestConsecutive(vector<int>& nums) {\n    unordered_set<int> s(nums.begin(), nums.end());\n    int best = 0;\n    for (int x : s) {\n        if (!s.count(x - 1)) {\n            int y = x;\n            while (s.count(y)) y++;\n            best = max(best, y - x);\n        }\n    }\n    return best;\n}\n"
    },
    "description": "给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。请设计并实现时间复杂度为 O(n) 的算法。",
    "leetcodeSlug": "longest-consecutive-sequence",
    "track": "extra"
  },
  {
    "id": "q017",
    "topicId": "ch04_prefix_diff",
    "type": "multiple_choice",
    "question": "【LRU 缓存】 满足 O(1) get/put 的组合是？",
    "options": [
      "哈希表+双向链表",
      "数组+栈",
      "堆+队列",
      "树+数组"
    ],
    "correctIndex": 0,
    "explanation": "哈希定位节点，链表维护最近使用顺序。",
    "xp": 16,
    "codeSnippet": {
      "python": "from collections import OrderedDict\nclass LRUCache:\n    def __init__(self, capacity: int):\n        self.cache = OrderedDict()\n        self.capacity = capacity\n\n    def get(self, key: int) -> int:\n        if key not in self.cache: return -1\n        self.cache.move_to_end(key)\n        return self.cache[key]\n\n    def put(self, key: int, value: int) -> None:\n        if key in self.cache: self.cache.move_to_end(key)\n        self.cache[key] = value\n        if len(self.cache) > self.capacity: self.cache.popitem(last=False)",
      "java": "class LRUCache extends LinkedHashMap<Integer, Integer> {\n    private int capacity;\n    public LRUCache(int capacity) {\n        super(capacity, 0.75f, true);\n        this.capacity = capacity;\n    }\n    public int get(int key) {\n        return super.getOrDefault(key, -1);\n    }\n    public void put(int key, int value) {\n        super.put(key, value);\n    }\n    @Override\n    protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {\n        return size() > capacity;\n    }\n}",
      "cpp": "class LRUCache {\n    int cap;\n    list<pair<int, int>> l;\n    unordered_map<int, list<pair<int, int>>::iterator> m;\npublic:\n    LRUCache(int capacity) : cap(capacity) {}\n    int get(int key) {\n        if (m.find(key) == m.end()) return -1;\n        l.splice(l.begin(), l, m[key]);\n        return m[key]->second;\n    }\n    void put(int key, int value) {\n        if (get(key) != -1) { m[key]->second = value; return; }\n        if (l.size() == cap) {\n            int delKey = l.back().first;\n            l.pop_back(); m.erase(delKey);\n        }\n        l.push_front({key, value});\n        m[key] = l.begin();\n    }\n};"
    },
    "learning": {
      "pattern": "哈希映射框架（空间换时间）",
      "coreQuestion": "当前元素需要什么“历史信息”才能 O(1) 决策？",
      "framework": "定义键和值，再明确更新时机：先查再存，还是先存再查。",
      "steps": [
        "定义 map 的 key/value 含义",
        "进入循环先做“命中判断”",
        "最后更新 map 供后续使用"
      ],
      "pitfalls": [
        "更新顺序错误导致自己匹配自己",
        "key 设计不稳定（如可变对象）",
        "忘记处理重复键覆盖策略"
      ],
      "complexity": "平均时间 O(n)，最坏取决于哈希冲突。",
      "template": "定义 key/value 的语义。\n在循环中严格区分“先查后存”或“先存后查”，避免自匹配与覆盖错误。",
      "insight": "哈希的核心不是 API，而是键设计：把原问题映射为 O(1) 查询的可判定条件。"
    },
    "description": "设计并实现一个满足 LRU (最近最少使用) 缓存约束的数据结构。支持 get(key) 和 put(key, value) 操作，且复杂度均为 O(1)。",
    "leetcodeSlug": "lru-cache",
    "track": "extra"
  },
  {
    "id": "q018",
    "topicId": "ch04_prefix_diff",
    "type": "multiple_choice",
    "question": "【前 K 个高频元素】 典型做法是？",
    "options": [
      "哈希计数+堆",
      "双指针",
      "并查集",
      "前缀和"
    ],
    "correctIndex": 0,
    "explanation": "先统计频次，再用堆选 TopK。",
    "xp": 12,
    "learning": {
      "pattern": "哈希映射框架（空间换时间）",
      "coreQuestion": "当前元素需要什么“历史信息”才能 O(1) 决策？",
      "framework": "定义键和值，再明确更新时机：先查再存，还是先存再查。",
      "steps": [
        "定义 map 的 key/value 含义",
        "进入循环先做“命中判断”",
        "最后更新 map 供后续使用"
      ],
      "pitfalls": [
        "更新顺序错误导致自己匹配自己",
        "key 设计不稳定（如可变对象）",
        "忘记处理重复键覆盖策略"
      ],
      "complexity": "平均时间 O(n)，最坏取决于哈希冲突。",
      "template": "定义 key/value 的语义。\n在循环中严格区分“先查后存”或“先存后查”，避免自匹配与覆盖错误。",
      "insight": "哈希的核心不是 API，而是键设计：把原问题映射为 O(1) 查询的可判定条件。"
    },
    "codeSnippet": {
      "python": "def topKFrequent(nums, k):\n    from collections import Counter\n    import heapq\n    cnt = Counter(nums)\n    return [x for x,_ in heapq.nlargest(k, cnt.items(), key=lambda p: p[1])]\n",
      "java": "public int[] topKFrequent(int[] nums, int k) {\n    Map<Integer, Integer> cnt = new HashMap<>();\n    for (int x : nums) cnt.put(x, cnt.getOrDefault(x, 0) + 1);\n    PriorityQueue<int[]> pq = new PriorityQueue<>((a,b)->a[1]-b[1]);\n    for (Map.Entry<Integer,Integer> e : cnt.entrySet()) {\n        pq.offer(new int[]{e.getKey(), e.getValue()});\n        if (pq.size() > k) pq.poll();\n    }\n    int[] res = new int[k];\n    for (int i = k - 1; i >= 0; i--) res[i] = pq.poll()[0];\n    return res;\n}\n",
      "cpp": "vector<int> topKFrequent(vector<int>& nums, int k) {\n    unordered_map<int,int> cnt;\n    for (int x: nums) cnt[x]++;\n    auto cmp = [](const pair<int,int>& a, const pair<int,int>& b){ return a.second > b.second; };\n    priority_queue<pair<int,int>, vector<pair<int,int>>, decltype(cmp)> pq(cmp);\n    for (auto &e: cnt) {\n        pq.push({e.first, e.second});\n        if ((int)pq.size() > k) pq.pop();\n    }\n    vector<int> res(k);\n    for (int i = k - 1; i >= 0; i--) {\n        res[i] = pq.top().first;\n        pq.pop();\n    }\n    return res;\n}\n"
    },
    "description": "给你一个整数数组 nums 和一个整数 k ，请你返回其中出现频率前 k 高的元素。你可以按任意顺序返回答案。",
    "leetcodeSlug": "top-k-frequent-elements",
    "track": "extra"
  },
  {
    "id": "q019",
    "topicId": "ch04_prefix_diff",
    "type": "multiple_choice",
    "question": "【四数相加 II】 降维思路是？",
    "options": [
      "两两求和并计数",
      "排序后四指针",
      "DFS 枚举",
      "动态规划"
    ],
    "correctIndex": 0,
    "explanation": "A+B 的和频次与 -(C+D) 匹配。",
    "xp": 12,
    "learning": {
      "pattern": "哈希映射框架（空间换时间）",
      "coreQuestion": "当前元素需要什么“历史信息”才能 O(1) 决策？",
      "framework": "定义键和值，再明确更新时机：先查再存，还是先存再查。",
      "steps": [
        "定义 map 的 key/value 含义",
        "进入循环先做“命中判断”",
        "最后更新 map 供后续使用"
      ],
      "pitfalls": [
        "更新顺序错误导致自己匹配自己",
        "key 设计不稳定（如可变对象）",
        "忘记处理重复键覆盖策略"
      ],
      "complexity": "平均时间 O(n)，最坏取决于哈希冲突。",
      "template": "定义 key/value 的语义。\n在循环中严格区分“先查后存”或“先存后查”，避免自匹配与覆盖错误。",
      "insight": "哈希的核心不是 API，而是键设计：把原问题映射为 O(1) 查询的可判定条件。"
    },
    "codeSnippet": {
      "python": "def fourSumCount(nums1, nums2, nums3, nums4):\n    from collections import Counter\n    ab = Counter(a + b for a in nums1 for b in nums2)\n    ans = 0\n    for c in nums3:\n        for d in nums4:\n            ans += ab.get(-(c + d), 0)\n    return ans\n",
      "java": "public int fourSumCount(int[] nums1, int[] nums2, int[] nums3, int[] nums4) {\n    Map<Integer, Integer> ab = new HashMap<>();\n    for (int a : nums1) {\n        for (int b : nums2) {\n            int s = a + b;\n            ab.put(s, ab.getOrDefault(s, 0) + 1);\n        }\n    }\n    int ans = 0;\n    for (int c : nums3) {\n        for (int d : nums4) {\n            ans += ab.getOrDefault(-(c + d), 0);\n        }\n    }\n    return ans;\n}\n",
      "cpp": "int fourSumCount(vector<int>& A, vector<int>& B, vector<int>& C, vector<int>& D) {\n    unordered_map<int,int> ab;\n    for (int a: A) for (int b: B) ab[a+b]++;\n    int ans=0;\n    for (int c: C) for (int d: D) {\n        auto it = ab.find(-(c+d));\n        if (it != ab.end()) ans += it->second;\n    }\n    return ans;\n}\n"
    },
    "description": "给你四个整数数组 nums1、nums2、nums3 和 nums4 ，数组长度都是 n ，请你计算有多少个元组 (i, j, k, l) 能满足四个数组对应元素之和为 0。",
    "leetcodeSlug": "4sum-ii",
    "track": "extra"
  },
  {
    "id": "q020",
    "topicId": "ch04_prefix_diff",
    "type": "multiple_choice",
    "question": "【字符串解码计数场景】 为什么常用 Map 而不是数组？",
    "options": [
      "键空间不固定或为字符串",
      "数组更慢",
      "Map 不能扩容",
      "数组不支持加法"
    ],
    "correctIndex": 0,
    "explanation": "当键不是小范围整数时 Map 更通用。",
    "xp": 12,
    "learning": {
      "pattern": "哈希映射框架（空间换时间）",
      "coreQuestion": "当前元素需要什么“历史信息”才能 O(1) 决策？",
      "framework": "定义键和值，再明确更新时机：先查再存，还是先存再查。",
      "steps": [
        "定义 map 的 key/value 含义",
        "进入循环先做“命中判断”",
        "最后更新 map 供后续使用"
      ],
      "pitfalls": [
        "更新顺序错误导致自己匹配自己",
        "key 设计不稳定（如可变对象）",
        "忘记处理重复键覆盖策略"
      ],
      "complexity": "平均时间 O(n)，最坏取决于哈希冲突。",
      "template": "定义 key/value 的语义。\n在循环中严格区分“先查后存”或“先存后查”，避免自匹配与覆盖错误。",
      "insight": "哈希的核心不是 API，而是键设计：把原问题映射为 O(1) 查询的可判定条件。"
    },
    "codeSnippet": {
      "python": "def numDecodings(s):\n    if not s or s[0] == '0': return 0\n    n = len(s)\n    dp0, dp1 = 1, 1\n    for i in range(1, n):\n        cur = 0\n        if s[i] != '0':\n            cur += dp1\n        two = int(s[i-1:i+1])\n        if 10 <= two <= 26:\n            cur += dp0\n        dp0, dp1 = dp1, cur\n    return dp1\n",
      "java": "public int numDecodings(String s) {\n    if (s == null || s.length() == 0 || s.charAt(0) == '0') return 0;\n    int n = s.length();\n    int dp0 = 1, dp1 = 1;\n    for (int i = 1; i < n; i++) {\n        int cur = 0;\n        if (s.charAt(i) != '0') cur += dp1;\n        int two = Integer.parseInt(s.substring(i - 1, i + 1));\n        if (two >= 10 && two <= 26) cur += dp0;\n        dp0 = dp1;\n        dp1 = cur;\n    }\n    return dp1;\n}\n",
      "cpp": "int numDecodings(string s) {\n    if (s.empty() || s[0] == '0') return 0;\n    int n = s.size();\n    int dp0 = 1, dp1 = 1;\n    for (int i = 1; i < n; i++) {\n        int cur = 0;\n        if (s[i] != '0') cur += dp1;\n        int two = (s[i-1]-'0')*10 + (s[i]-'0');\n        if (two >= 10 && two <= 26) cur += dp0;\n        dp0 = dp1;\n        dp1 = cur;\n    }\n    return dp1;\n}\n"
    },
    "description": "本题对应《字符串解码计数场景》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 hashmaps 相关方法中完成复杂度优化。",
    "leetcodeSlug": "decode-ways",
    "track": "extra"
  },
  {
    "id": "q021",
    "topicId": "ch04_prefix_diff",
    "type": "multiple_choice",
    "question": "【快乐数】 判环常用哪个结构？",
    "options": [
      "哈希集合记录出现值",
      "最小堆",
      "单调队列",
      "并查集"
    ],
    "correctIndex": 0,
    "explanation": "出现重复即进入循环。",
    "xp": 12,
    "learning": {
      "pattern": "哈希映射框架（空间换时间）",
      "coreQuestion": "当前元素需要什么“历史信息”才能 O(1) 决策？",
      "framework": "定义键和值，再明确更新时机：先查再存，还是先存再查。",
      "steps": [
        "定义 map 的 key/value 含义",
        "进入循环先做“命中判断”",
        "最后更新 map 供后续使用"
      ],
      "pitfalls": [
        "更新顺序错误导致自己匹配自己",
        "key 设计不稳定（如可变对象）",
        "忘记处理重复键覆盖策略"
      ],
      "complexity": "平均时间 O(n)，最坏取决于哈希冲突。",
      "template": "定义 key/value 的语义。\n在循环中严格区分“先查后存”或“先存后查”，避免自匹配与覆盖错误。",
      "insight": "哈希的核心不是 API，而是键设计：把原问题映射为 O(1) 查询的可判定条件。"
    },
    "codeSnippet": {
      "python": "def isHappy(n):\n    def nxt(x):\n        s = 0\n        while x:\n            d = x % 10\n            s += d * d\n            x //= 10\n        return s\n    seen = set()\n    while n != 1 and n not in seen:\n        seen.add(n)\n        n = nxt(n)\n    return n == 1\n",
      "java": "public boolean isHappy(int n) {\n    Set<Integer> seen = new HashSet<>();\n    while (n != 1 && !seen.contains(n)) {\n        seen.add(n);\n        int s = 0;\n        while (n > 0) {\n            int d = n % 10;\n            s += d * d;\n            n /= 10;\n        }\n        n = s;\n    }\n    return n == 1;\n}\n",
      "cpp": "bool isHappy(int n) {\n    unordered_set<int> seen;\n    auto nxt = [&](int x){\n        int s=0;\n        while (x) {\n            int d = x % 10;\n            s += d*d;\n            x /= 10;\n        }\n        return s;\n    };\n    while (n != 1 && !seen.count(n)) {\n        seen.insert(n);\n        n = nxt(n);\n    }\n    return n == 1;\n}\n"
    },
    "description": "编写一个算法来判断一个数 n 是不是快乐数。快乐数定义为：对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和，最终变更为 1。",
    "leetcodeSlug": "happy-number",
    "track": "extra"
  },
  {
    "id": "q022",
    "topicId": "ch04_prefix_diff",
    "type": "multiple_choice",
    "question": "【同构字符串】 需要保证什么？",
    "options": [
      "双向映射都一致",
      "只看长度相同",
      "首尾字符相同",
      "排序相同"
    ],
    "correctIndex": 0,
    "explanation": "字符映射必须一一对应。",
    "xp": 12,
    "learning": {
      "pattern": "哈希映射框架（空间换时间）",
      "coreQuestion": "当前元素需要什么“历史信息”才能 O(1) 决策？",
      "framework": "定义键和值，再明确更新时机：先查再存，还是先存再查。",
      "steps": [
        "定义 map 的 key/value 含义",
        "进入循环先做“命中判断”",
        "最后更新 map 供后续使用"
      ],
      "pitfalls": [
        "更新顺序错误导致自己匹配自己",
        "key 设计不稳定（如可变对象）",
        "忘记处理重复键覆盖策略"
      ],
      "complexity": "平均时间 O(n)，最坏取决于哈希冲突。",
      "template": "定义 key/value 的语义。\n在循环中严格区分“先查后存”或“先存后查”，避免自匹配与覆盖错误。",
      "insight": "哈希的核心不是 API，而是键设计：把原问题映射为 O(1) 查询的可判定条件。"
    },
    "codeSnippet": {
      "python": "def isIsomorphic(s, t):\n    if len(s) != len(t): return False\n    m1, m2 = {}, {}\n    for a, b in zip(s, t):\n        if (a in m1 and m1[a] != b) or (b in m2 and m2[b] != a):\n            return False\n        m1[a] = b\n        m2[b] = a\n    return True\n",
      "java": "public boolean isIsomorphic(String s, String t) {\n    if (s.length() != t.length()) return false;\n    Map<Character, Character> m1 = new HashMap<>();\n    Map<Character, Character> m2 = new HashMap<>();\n    for (int i = 0; i < s.length(); i++) {\n        char a = s.charAt(i), b = t.charAt(i);\n        if (m1.containsKey(a) && m1.get(a) != b) return false;\n        if (m2.containsKey(b) && m2.get(b) != a) return false;\n        m1.put(a, b);\n        m2.put(b, a);\n    }\n    return true;\n}\n",
      "cpp": "bool isIsomorphic(string s, string t) {\n    if (s.size() != t.size()) return false;\n    unordered_map<char,char> m1, m2;\n    for (int i=0;i<(int)s.size();i++){\n        char a=s[i], b=t[i];\n        if (m1.count(a) && m1[a] != b) return false;\n        if (m2.count(b) && m2[b] != a) return false;\n        m1[a]=b;\n        m2[b]=a;\n    }\n    return true;\n}\n"
    },
    "description": "给定两个字符串 s 和 t ，判断它们是否是同构的。如果 s 中的字符可以按某种替换规则得到 t ，则两个字符串同构。",
    "leetcodeSlug": "isomorphic-strings",
    "track": "extra"
  },
  {
    "id": "q023",
    "topicId": "ch01_two_pointers",
    "type": "multiple_choice",
    "question": "【三数之和】 去重通常在何处做？",
    "options": [
      "固定 i 时与移动 l/r 时都去重",
      "只在最后去重",
      "不需要去重",
      "只对 i 去重"
    ],
    "correctIndex": 0,
    "explanation": "双层去重才能避免重复三元组。",
    "xp": 14,
    "codeSnippet": {
      "python": "def threeSum(nums):\n    nums.sort()\n    res = []\n    for i in range(len(nums)-2):\n        if i > 0 and nums[i] == nums[i-1]: continue\n        l, r = i+1, len(nums)-1\n        while l < r:\n            s = nums[i] + nums[l] + nums[r]\n            if s < 0: l += 1\n            elif s > 0: r -= 1\n            else:\n                res.append([nums[i], nums[l], nums[r]])\n                while l < r and nums[l] == nums[l+1]: l += 1\n                while l < r and nums[r] == nums[r-1]: r -= 1\n                l += 1; r -= 1\n    return res",
      "java": "public List<List<Integer>> threeSum(int[] nums) {\n    Arrays.sort(nums);\n    List<List<Integer>> res = new ArrayList<>();\n    for (int i = 0; i < nums.length - 2; i++) {\n        if (i > 0 && nums[i] == nums[i - 1]) continue;\n        int l = i + 1, r = nums.length - 1;\n        while (l < r) {\n            int sum = nums[i] + nums[l] + nums[r];\n            if (sum == 0) {\n                res.add(Arrays.asList(nums[i], nums[l], nums[r]));\n                while (l < r && nums[l] == nums[l + 1]) l++;\n                while (l < r && nums[r] == nums[r - 1]) r--;\n                l++; r--;\n            } else if (sum < 0) l++;\n            else r--;\n        }\n    }\n    return res;\n}",
      "cpp": "vector<vector<int>> threeSum(vector<int>& nums) {\n    sort(nums.begin(), nums.end());\n    vector<vector<int>> res;\n    for (int i = 0; i < (int)nums.size() - 2; i++) {\n        if (i > 0 && nums[i] == nums[i - 1]) continue;\n        int l = i + 1, r = nums.size() - 1;\n        while (l < r) {\n            int sum = nums[i] + nums[l] + nums[r];\n            if (sum == 0) {\n                res.push_back({nums[i], nums[l], nums[r]});\n                while (l < r && nums[l] == nums[l + 1]) l++;\n                while (l < r && nums[r] == nums[r - 1]) r--;\n                l++; r--;\n            } else if (sum < 0) l++;\n            else r--;\n        }\n    }\n    return res;\n}"
    },
    "learning": {
      "pattern": "双指针收缩与分治（同向/相向）",
      "coreQuestion": "移动哪一侧指针才不会漏解？",
      "framework": "利用单调性（有序/约束）决定指针移动方向。",
      "steps": [
        "定义 left/right 含义与不变量",
        "根据条件移动一侧指针",
        "移动后维护去重/有效区间"
      ],
      "pitfalls": [
        "去重时机不对造成重复答案",
        "循环条件写成 <= 导致越界",
        "忽略排序前置条件"
      ],
      "complexity": "典型时间 O(n) 或 O(n^2)，空间 O(1)。",
      "template": "先确定左右指针各自语义，再写移动规则。\n每次移动只改变一个边界，并保持区间性质不被破坏。",
      "insight": "双指针能降复杂度的前提，是“移动某一侧不会丢失最优解”的单调性结论。"
    },
    "description": "给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。",
    "leetcodeSlug": "3sum",
    "handbookRef": {
      "leetcodeId": 15,
      "chapter": "第一章：双指针技巧",
      "section": "1.2 数组双指针技巧",
      "orderInSection": 3,
      "mdLine": 231
    },
    "track": "core"
  },
  {
    "id": "q024",
    "topicId": "ch01_two_pointers",
    "type": "multiple_choice",
    "question": "【盛最多水的容器】 每次移动哪边指针？",
    "options": [
      "较短边",
      "较长边",
      "两边同时",
      "随机"
    ],
    "correctIndex": 0,
    "explanation": "面积受短边限制，移动长边无收益。",
    "xp": 12,
    "learning": {
      "pattern": "双指针收缩与分治（同向/相向）",
      "coreQuestion": "移动哪一侧指针才不会漏解？",
      "framework": "利用单调性（有序/约束）决定指针移动方向。",
      "steps": [
        "定义 left/right 含义与不变量",
        "根据条件移动一侧指针",
        "移动后维护去重/有效区间"
      ],
      "pitfalls": [
        "去重时机不对造成重复答案",
        "循环条件写成 <= 导致越界",
        "忽略排序前置条件"
      ],
      "complexity": "典型时间 O(n) 或 O(n^2)，空间 O(1)。",
      "template": "先确定左右指针各自语义，再写移动规则。\n每次移动只改变一个边界，并保持区间性质不被破坏。",
      "insight": "双指针能降复杂度的前提，是“移动某一侧不会丢失最优解”的单调性结论。"
    },
    "codeSnippet": {
      "python": "def maxArea(height):\n    left, right = 0, len(height) - 1\n    ans = 0\n    while left < right:\n        ans = max(ans, (right - left) * min(height[left], height[right]))\n        if height[left] < height[right]:\n            left += 1\n        else:\n            right -= 1\n    return ans\n",
      "java": "public int maxArea(int[] height) {\n    int left = 0, right = height.length - 1;\n    int ans = 0;\n    while (left < right) {\n        ans = Math.max(ans, (right - left) * Math.min(height[left], height[right]));\n        if (height[left] < height[right]) left++;\n        else right--;\n    }\n    return ans;\n}\n",
      "cpp": "int maxArea(vector<int>& height) {\n    int left=0, right=(int)height.size()-1;\n    int ans=0;\n    while (left < right) {\n        ans = max(ans, (right-left) * min(height[left], height[right]));\n        if (height[left] < height[right]) left++;\n        else right--;\n    }\n    return ans;\n}\n"
    },
    "description": "给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。",
    "leetcodeSlug": "container-with-most-water",
    "track": "extra"
  },
  {
    "id": "q025",
    "topicId": "ch01_two_pointers",
    "type": "multiple_choice",
    "question": "【删除有序数组重复项】 slow 指针含义是？",
    "options": [
      "下一个可写入位置",
      "当前遍历位置",
      "最后一个元素位置",
      "数组长度"
    ],
    "correctIndex": 0,
    "explanation": "slow 保持结果区间 [0,slow)。",
    "xp": 12,
    "learning": {
      "pattern": "双指针收缩与分治（同向/相向）",
      "coreQuestion": "移动哪一侧指针才不会漏解？",
      "framework": "利用单调性（有序/约束）决定指针移动方向。",
      "steps": [
        "定义 left/right 含义与不变量",
        "根据条件移动一侧指针",
        "移动后维护去重/有效区间"
      ],
      "pitfalls": [
        "去重时机不对造成重复答案",
        "循环条件写成 <= 导致越界",
        "忽略排序前置条件"
      ],
      "complexity": "典型时间 O(n) 或 O(n^2)，空间 O(1)。",
      "template": "先确定左右指针各自语义，再写移动规则。\n每次移动只改变一个边界，并保持区间性质不被破坏。",
      "insight": "双指针能降复杂度的前提，是“移动某一侧不会丢失最优解”的单调性结论。"
    },
    "codeSnippet": {
      "python": "def removeDuplicates(nums):\n    if not nums: return 0\n    slow = 1\n    for fast in range(1, len(nums)):\n        if nums[fast] != nums[fast-1]:\n            nums[slow] = nums[fast]\n            slow += 1\n    return slow\n",
      "java": "public int removeDuplicates(int[] nums) {\n    if (nums.length == 0) return 0;\n    int slow = 1;\n    for (int fast = 1; fast < nums.length; fast++) {\n        if (nums[fast] != nums[fast - 1]) {\n            nums[slow++] = nums[fast];\n        }\n    }\n    return slow;\n}\n",
      "cpp": "int removeDuplicates(vector<int>& nums) {\n    if (nums.empty()) return 0;\n    int slow = 1;\n    for (int fast = 1; fast < (int)nums.size(); fast++) {\n        if (nums[fast] != nums[fast-1]) nums[slow++] = nums[fast];\n    }\n    return slow;\n}\n"
    },
    "description": "给你一个升序排列的数组 nums ，请你原地删除重复出现的元素，使每个元素只出现一次 ，返回删除后数组的新长度。",
    "leetcodeSlug": "remove-duplicates-from-sorted-array",
    "handbookRef": {
      "leetcodeId": 26,
      "chapter": "第一章：双指针技巧",
      "section": "1.2 数组双指针技巧",
      "orderInSection": 1,
      "mdLine": 176
    },
    "track": "core"
  },
  {
    "id": "q026",
    "topicId": "ch01_two_pointers",
    "type": "multiple_choice",
    "question": "【回文链表】 O(1) 空间常见流程是？",
    "options": [
      "找中点+反转后半+比较",
      "全部拷贝到数组",
      "递归回溯",
      "哈希统计"
    ],
    "correctIndex": 0,
    "explanation": "快慢指针找中点后原地比较。",
    "xp": 12,
    "learning": {
      "pattern": "双指针收缩与分治（同向/相向）",
      "coreQuestion": "移动哪一侧指针才不会漏解？",
      "framework": "利用单调性（有序/约束）决定指针移动方向。",
      "steps": [
        "定义 left/right 含义与不变量",
        "根据条件移动一侧指针",
        "移动后维护去重/有效区间"
      ],
      "pitfalls": [
        "去重时机不对造成重复答案",
        "循环条件写成 <= 导致越界",
        "忽略排序前置条件"
      ],
      "complexity": "典型时间 O(n) 或 O(n^2)，空间 O(1)。",
      "template": "先确定左右指针各自语义，再写移动规则。\n每次移动只改变一个边界，并保持区间性质不被破坏。",
      "insight": "双指针能降复杂度的前提，是“移动某一侧不会丢失最优解”的单调性结论。"
    },
    "codeSnippet": {
      "python": "def isPalindrome(head):\n    slow = fast = head\n    while fast and fast.next:\n        slow, fast = slow.next, fast.next.next\n    prev = None\n    while slow:\n        nxt = slow.next\n        slow.next = prev\n        prev = slow\n        slow = nxt\n    while prev:\n        if head.val != prev.val: return False\n        head, prev = head.next, prev.next\n    return True",
      "java": "public boolean isPalindrome(ListNode head) {\n    ListNode slow = head, fast = head;\n    while (fast != null && fast.next != null) {\n        slow = slow.next; fast = fast.next.next;\n    }\n    ListNode prev = null;\n    while (slow != null) {\n        ListNode nxt = slow.next;\n        slow.next = prev; prev = slow; slow = nxt;\n    }\n    while (prev != null) {\n        if (head.val != prev.val) return false;\n        head = head.next; prev = prev.next;\n    }\n    return true;\n}",
      "cpp": "bool isPalindrome(ListNode* head) {\n    ListNode *slow = head, *fast = head;\n    while (fast && fast->next) { slow = slow->next; fast = fast->next->next; }\n    ListNode* prev = nullptr;\n    while (slow) {\n        ListNode* nxt = slow->next;\n        slow->next = prev; prev = slow; slow = nxt;\n    }\n    while (prev) {\n        if (head->val != prev->val) return false;\n        head = head->next; prev = prev->next;\n    }\n    return true;\n}"
    },
    "description": "给你一个单链表的头节点 head ，请你判断该链表是否为回文链表。如果是，返回 true ；否则，返回 false 。",
    "leetcodeSlug": "palindrome-linked-list",
    "track": "extra"
  },
  {
    "id": "q027",
    "topicId": "ch01_two_pointers",
    "type": "multiple_choice",
    "question": "【有序数组两数之和 II】 为何可用双指针？",
    "options": [
      "数组有序可根据和大小单调移动",
      "元素唯一",
      "可随机访问",
      "长度固定"
    ],
    "correctIndex": 0,
    "explanation": "和过小左移左指针，过大右移右指针。",
    "xp": 12,
    "learning": {
      "pattern": "双指针收缩与分治（同向/相向）",
      "coreQuestion": "移动哪一侧指针才不会漏解？",
      "framework": "利用单调性（有序/约束）决定指针移动方向。",
      "steps": [
        "定义 left/right 含义与不变量",
        "根据条件移动一侧指针",
        "移动后维护去重/有效区间"
      ],
      "pitfalls": [
        "去重时机不对造成重复答案",
        "循环条件写成 <= 导致越界",
        "忽略排序前置条件"
      ],
      "complexity": "典型时间 O(n) 或 O(n^2)，空间 O(1)。",
      "template": "先确定左右指针各自语义，再写移动规则。\n每次移动只改变一个边界，并保持区间性质不被破坏。",
      "insight": "双指针能降复杂度的前提，是“移动某一侧不会丢失最优解”的单调性结论。"
    },
    "codeSnippet": {
      "python": "def twoSum(numbers, target):\n    left, right = 0, len(numbers) - 1\n    while left < right:\n        s = numbers[left] + numbers[right]\n        if s == target: return [left + 1, right + 1]\n        if s < target: left += 1\n        else: right -= 1",
      "java": "public int[] twoSum(int[] numbers, int target) {\n    int left = 0, right = numbers.length - 1;\n    while (left < right) {\n        int s = numbers[left] + numbers[right];\n        if (s == target) return new int[]{left + 1, right + 1};\n        if (s < target) left++; else right--;\n    }\n    return new int[0];\n}",
      "cpp": "vector<int> twoSum(vector<int>& numbers, int target) {\n    int left = 0, right = (int)numbers.size() - 1;\n    while (left < right) {\n        int s = numbers[left] + numbers[right];\n        if (s == target) return {left + 1, right + 1};\n        if (s < target) left++; else right--;\n    }\n    return {};\n}"
    },
    "description": "给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那两个整数，并返回他们的数组下标。",
    "leetcodeSlug": "two-sum-ii-input-array-is-sorted",
    "track": "extra"
  },
  {
    "id": "q028",
    "topicId": "ch01_two_pointers",
    "type": "multiple_choice",
    "question": "【删除链表倒数第 N 个节点】 经典做法是？",
    "options": [
      "快慢指针先走 n 步",
      "递归层数计数",
      "哈希节点",
      "双端队列"
    ],
    "correctIndex": 0,
    "explanation": "保持快慢间距 n。",
    "xp": 12,
    "learning": {
      "pattern": "双指针收缩与分治（同向/相向）",
      "coreQuestion": "移动哪一侧指针才不会漏解？",
      "framework": "利用单调性（有序/约束）决定指针移动方向。",
      "steps": [
        "定义 left/right 含义与不变量",
        "根据条件移动一侧指针",
        "移动后维护去重/有效区间"
      ],
      "pitfalls": [
        "去重时机不对造成重复答案",
        "循环条件写成 <= 导致越界",
        "忽略排序前置条件"
      ],
      "complexity": "典型时间 O(n) 或 O(n^2)，空间 O(1)。",
      "template": "先确定左右指针各自语义，再写移动规则。\n每次移动只改变一个边界，并保持区间性质不被破坏。",
      "insight": "双指针能降复杂度的前提，是“移动某一侧不会丢失最优解”的单调性结论。"
    },
    "codeSnippet": {
      "python": "def removeNthFromEnd(head, n):\n    dummy = ListNode(0, head)\n    fast = slow = dummy\n    for _ in range(n):\n        fast = fast.next\n    while fast.next:\n        fast = fast.next\n        slow = slow.next\n    slow.next = slow.next.next\n    return dummy.next",
      "java": "public ListNode removeNthFromEnd(ListNode head, int n) {\n    ListNode dummy = new ListNode(0, head);\n    ListNode fast = dummy, slow = dummy;\n    for (int i = 0; i < n; i++) fast = fast.next;\n    while (fast.next != null) {\n        fast = fast.next;\n        slow = slow.next;\n    }\n    slow.next = slow.next.next;\n    return dummy.next;\n}",
      "cpp": "ListNode* removeNthFromEnd(ListNode* head, int n) {\n    ListNode dummy(0, head);\n    ListNode *fast = &dummy, *slow = &dummy;\n    for (int i = 0; i < n; i++) fast = fast->next;\n    while (fast->next) {\n        fast = fast->next;\n        slow = slow->next;\n    }\n    slow->next = slow->next->next;\n    return dummy.next;\n}"
    },
    "description": "给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。",
    "leetcodeSlug": "remove-nth-node-from-end-of-list",
    "handbookRef": {
      "leetcodeId": 19,
      "chapter": "第一章：双指针技巧",
      "section": "1.1 链表双指针技巧",
      "orderInSection": 5,
      "mdLine": 148
    },
    "track": "core"
  },
  {
    "id": "q029",
    "topicId": "ch01_two_pointers",
    "type": "multiple_choice",
    "question": "【相交链表】 O(1) 空间解法核心是？",
    "options": [
      "两个指针走完各自链后切换到对方头",
      "哈希存节点",
      "排序链表",
      "二分"
    ],
    "correctIndex": 0,
    "explanation": "总路程相等后在交点相遇。",
    "xp": 12,
    "learning": {
      "pattern": "双指针收缩与分治（同向/相向）",
      "coreQuestion": "移动哪一侧指针才不会漏解？",
      "framework": "利用单调性（有序/约束）决定指针移动方向。",
      "steps": [
        "定义 left/right 含义与不变量",
        "根据条件移动一侧指针",
        "移动后维护去重/有效区间"
      ],
      "pitfalls": [
        "去重时机不对造成重复答案",
        "循环条件写成 <= 导致越界",
        "忽略排序前置条件"
      ],
      "complexity": "典型时间 O(n) 或 O(n^2)，空间 O(1)。",
      "template": "先确定左右指针各自语义，再写移动规则。\n每次移动只改变一个边界，并保持区间性质不被破坏。",
      "insight": "双指针能降复杂度的前提，是“移动某一侧不会丢失最优解”的单调性结论。"
    },
    "codeSnippet": {
      "python": "def getIntersectionNode(headA, headB):\n    p, q = headA, headB\n    while p != q:\n        p = p.next if p else headB\n        q = q.next if q else headA\n    return p",
      "java": "public ListNode getIntersectionNode(ListNode headA, ListNode headB) {\n    ListNode p = headA, q = headB;\n    while (p != q) {\n        p = (p == null) ? headB : p.next;\n        q = (q == null) ? headA : q.next;\n    }\n    return p;\n}",
      "cpp": "ListNode* getIntersectionNode(ListNode* headA, ListNode* headB) {\n    ListNode *p = headA, *q = headB;\n    while (p != q) {\n        p = p ? p->next : headB;\n        q = q ? q->next : headA;\n    }\n    return p;\n}"
    },
    "description": "给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表不存在相交节点，返回 null 。",
    "leetcodeSlug": "intersection-of-two-linked-lists",
    "track": "extra"
  },
  {
    "id": "q030",
    "topicId": "ch01_two_pointers",
    "type": "multiple_choice",
    "question": "【接雨水双指针】 leftMax < rightMax 时计算哪侧？",
    "options": [
      "左侧",
      "右侧",
      "都可",
      "都不算"
    ],
    "correctIndex": 0,
    "explanation": "较小边确定当前有效水位。",
    "xp": 12,
    "learning": {
      "pattern": "双指针收缩与分治（同向/相向）",
      "coreQuestion": "移动哪一侧指针才不会漏解？",
      "framework": "利用单调性（有序/约束）决定指针移动方向。",
      "steps": [
        "定义 left/right 含义与不变量",
        "根据条件移动一侧指针",
        "移动后维护去重/有效区间"
      ],
      "pitfalls": [
        "去重时机不对造成重复答案",
        "循环条件写成 <= 导致越界",
        "忽略排序前置条件"
      ],
      "complexity": "典型时间 O(n) 或 O(n^2)，空间 O(1)。",
      "template": "先确定左右指针各自语义，再写移动规则。\n每次移动只改变一个边界，并保持区间性质不被破坏。",
      "insight": "双指针能降复杂度的前提，是“移动某一侧不会丢失最优解”的单调性结论。"
    },
    "codeSnippet": {
      "python": "def trap(height):\n    left, right = 0, len(height) - 1\n    leftMax = rightMax = 0\n    ans = 0\n    while left < right:\n        if height[left] < height[right]:\n            leftMax = max(leftMax, height[left])\n            ans += leftMax - height[left]\n            left += 1\n        else:\n            rightMax = max(rightMax, height[right])\n            ans += rightMax - height[right]\n            right -= 1\n    return ans\n",
      "java": "public int trap(int[] height) {\n    int left = 0, right = height.length - 1;\n    int leftMax = 0, rightMax = 0;\n    int ans = 0;\n    while (left < right) {\n        if (height[left] < height[right]) {\n            leftMax = Math.max(leftMax, height[left]);\n            ans += leftMax - height[left];\n            left++;\n        } else {\n            rightMax = Math.max(rightMax, height[right]);\n            ans += rightMax - height[right];\n            right--;\n        }\n    }\n    return ans;\n}\n",
      "cpp": "int trap(vector<int>& height) {\n    int left = 0, right = (int)height.size() - 1;\n    int leftMax = 0, rightMax = 0;\n    int ans = 0;\n    while (left < right) {\n        if (height[left] < height[right]) {\n            leftMax = max(leftMax, height[left]);\n            ans += leftMax - height[left];\n            left++;\n        } else {\n            rightMax = max(rightMax, height[right]);\n            ans += rightMax - height[right];\n            right--;\n        }\n    }\n    return ans;\n}\n"
    },
    "description": "给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。",
    "leetcodeSlug": "trapping-rain-water-two-pointers",
    "track": "extra"
  },
  {
    "id": "q031",
    "topicId": "ch02_sliding_window",
    "type": "multiple_choice",
    "question": "【无重复字符的最长子串】 窗口左边界何时移动？",
    "options": [
      "右指针字符重复时",
      "每次都移动",
      "窗口长度>k",
      "遇到元音"
    ],
    "correctIndex": 0,
    "explanation": "遇到重复才收缩到不重复状态。",
    "xp": 14,
    "codeSnippet": {
      "python": "def lengthOfLongestSubstring(s):\n    char_map = {}\n    left = 0\n    max_len = 0\n    for right, char in enumerate(s):\n        if char in char_map and char_map[char] >= left:\n            left = char_map[char] + 1\n        char_map[char] = right\n        max_len = max(max_len, right - left + 1)\n    return max_len",
      "java": "public int lengthOfLongestSubstring(String s) {\n    Map<Character, Integer> map = new HashMap<>();\n    int left = 0, maxLen = 0;\n    for (int right = 0; right < s.length(); right++) {\n        char c = s.charAt(right);\n        if (map.containsKey(c)) {\n            left = Math.max(left, map.get(c) + 1);\n        }\n        map.put(c, right);\n        maxLen = Math.max(maxLen, right - left + 1);\n    }\n    return maxLen;\n}",
      "cpp": "int lengthOfLongestSubstring(string s) {\n    unordered_map<char, int> map;\n    int left = 0, maxLen = 0;\n    for (int right = 0; right < s.size(); right++) {\n        if (map.count(s[right])) {\n            left = max(left, map[s[right]] + 1);\n        }\n        map[s[right]] = right;\n        maxLen = max(maxLen, right - left + 1);\n    }\n    return maxLen;\n}"
    },
    "learning": {
      "pattern": "滑动窗口计数（扩张-收缩-更新答案）",
      "coreQuestion": "如何保证窗口内字符始终不重复？",
      "framework": "右指针扩张获取信息，满足约束后左指针收缩并更新答案。",
      "steps": [
        "map 记录字符最近下标",
        "遇到重复时 left 跳到重复位后一位",
        "每轮更新最大长度"
      ],
      "pitfalls": [
        "left 不能回退，需 left=max(left,...)"
      ],
      "complexity": "双指针各最多移动 n 次，时间 O(n)。",
      "template": "int left = 0, right = 0;\nwhile (right < s.size()) {\n    window.add(s[right]);\n    right++;\n    while (window needs shrink) {\n        window.remove(s[left]);\n        left++;\n    }\n}",
      "insight": "滑动窗口的精髓在于：不断增加 right 扩大窗口，直到满足约束；然后不断增加 left 缩小窗口，直到不再满足约束。过程中更新答案。"
    },
    "description": "给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。",
    "leetcodeSlug": "longest-substring-without-repeating-characters",
    "handbookRef": {
      "leetcodeId": 3,
      "chapter": "第二章：滑动窗口算法",
      "section": "2.1 滑动窗口核心模板",
      "orderInSection": 4,
      "mdLine": 394
    },
    "track": "core"
  },
  {
    "id": "q032",
    "topicId": "ch02_sliding_window",
    "type": "multiple_choice",
    "question": "【最小覆盖子串】 valid 的含义通常是？",
    "options": [
      "满足 t 所有字符需求",
      "窗口长度最小",
      "窗口无重复",
      "窗口有序"
    ],
    "correctIndex": 0,
    "explanation": "只有覆盖需求后才尝试收缩。",
    "xp": 16,
    "codeSnippet": {
      "python": "def minWindow(s, t):\n    from collections import Counter\n    if not t: return \"\"\n    need = Counter(t)\n    window = Counter()\n    needTypes = len(need)\n    valid = 0\n    left = 0\n    start = 0\n    bestLen = float('inf')\n\n    for right, ch in enumerate(s):\n        window[ch] += 1\n        if ch in need and window[ch] == need[ch]:\n            valid += 1\n\n        while valid == needTypes:\n            if right - left + 1 < bestLen:\n                bestLen = right - left + 1\n                start = left\n            out = s[left]\n            left += 1\n            if out in need and window[out] == need[out]:\n                valid -= 1\n            window[out] -= 1\n\n    return \"\" if bestLen == float('inf') else s[start:start+bestLen]\n",
      "java": "public String minWindow(String s, String t) {\n    if (t.length() == 0) return \"\";\n    int[] need = new int[128];\n    int[] window = new int[128];\n    int needTypes = 0;\n    for (char c : t.toCharArray()) {\n        if (need[c] == 0) needTypes++;\n        need[c]++;\n    }\n    int valid = 0;\n    int left = 0, start = 0, bestLen = Integer.MAX_VALUE;\n    for (int right = 0; right < s.length(); right++) {\n        char ch = s.charAt(right);\n        window[ch]++;\n        if (need[ch] > 0 && window[ch] == need[ch]) valid++;\n        while (valid == needTypes) {\n            if (right - left + 1 < bestLen) {\n                bestLen = right - left + 1;\n                start = left;\n            }\n            char out = s.charAt(left++);\n            if (need[out] > 0 && window[out] == need[out]) valid--;\n            window[out]--;\n        }\n    }\n    return bestLen == Integer.MAX_VALUE ? \"\" : s.substring(start, start + bestLen);\n}\n",
      "cpp": "string minWindow(string s, string t) {\n    if (t.empty()) return \"\";\n    vector<int> need(128, 0), window(128, 0);\n    int needTypes = 0;\n    for (char c : t) {\n        if (need[c] == 0) needTypes++;\n        need[c]++;\n    }\n    int valid = 0;\n    int left = 0, start = 0;\n    int bestLen = INT_MAX;\n    for (int right = 0; right < (int)s.size(); right++) {\n        char ch = s[right];\n        window[ch]++;\n        if (need[ch] > 0 && window[ch] == need[ch]) valid++;\n        while (valid == needTypes) {\n            if (right - left + 1 < bestLen) {\n                bestLen = right - left + 1;\n                start = left;\n            }\n            char out = s[left++];\n            if (need[out] > 0 && window[out] == need[out]) valid--;\n            window[out]--;\n        }\n    }\n    return bestLen == INT_MAX ? \"\" : s.substr(start, bestLen);\n}\n"
    },
    "learning": {
      "pattern": "滑动窗口模板（扩张-收缩）",
      "coreQuestion": "窗口什么时候扩张，什么时候收缩？",
      "framework": "右指针扩张获取信息，满足约束后左指针收缩并更新答案。",
      "steps": [
        "维护窗口状态（计数/频次）",
        "右移 right 扩张窗口",
        "条件满足时循环右移 left 收缩"
      ],
      "pitfalls": [
        "valid 计数定义不清",
        "收缩后忘记回滚状态",
        "固定窗口与可变窗口混用"
      ],
      "complexity": "双指针各最多移动 n 次，时间 O(n)。",
      "template": "int left = 0, right = 0;\nwhile (right < s.size()) {\n    window.add(s[right]);\n    right++;\n    while (window needs shrink) {\n        window.remove(s[left]);\n        left++;\n    }\n}",
      "insight": "滑动窗口的精髓在于：不断增加 right 扩大窗口，直到满足约束；然后不断增加 left 缩小窗口，直到不再满足约束。过程中更新答案。"
    },
    "description": "给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串。",
    "leetcodeSlug": "minimum-window-substring",
    "handbookRef": {
      "leetcodeId": 76,
      "chapter": "第二章：滑动窗口算法",
      "section": "2.1 滑动窗口核心模板",
      "orderInSection": 1,
      "mdLine": 278
    },
    "track": "core"
  },
  {
    "id": "q033",
    "topicId": "ch02_sliding_window",
    "type": "multiple_choice",
    "question": "【找到字符串中所有字母异位词】 常用策略是？",
    "options": [
      "固定窗口长度 + 频次数组",
      "双端队列最大值",
      "二分长度",
      "堆"
    ],
    "correctIndex": 0,
    "explanation": "窗口长度固定为 p.length。",
    "xp": 12,
    "learning": {
      "pattern": "滑动窗口模板（扩张-收缩）",
      "coreQuestion": "窗口什么时候扩张，什么时候收缩？",
      "framework": "右指针扩张获取信息，满足约束后左指针收缩并更新答案。",
      "steps": [
        "维护窗口状态（计数/频次）",
        "右移 right 扩张窗口",
        "条件满足时循环右移 left 收缩"
      ],
      "pitfalls": [
        "valid 计数定义不清",
        "收缩后忘记回滚状态",
        "固定窗口与可变窗口混用"
      ],
      "complexity": "双指针各最多移动 n 次，时间 O(n)。",
      "template": "int left = 0, right = 0;\nwhile (right < s.size()) {\n    window.add(s[right]);\n    right++;\n    while (window needs shrink) {\n        window.remove(s[left]);\n        left++;\n    }\n}",
      "insight": "滑动窗口的精髓在于：不断增加 right 扩大窗口，直到满足约束；然后不断增加 left 缩小窗口，直到不再满足约束。过程中更新答案。"
    },
    "codeSnippet": {
      "python": "def findAnagrams(s, p):\n    if len(p) > len(s): return []\n    from collections import Counter\n    need = Counter(p)\n    window = Counter()\n    res = []\n    left = 0\n    for right, ch in enumerate(s):\n        window[ch] += 1\n        if right - left + 1 > len(p):\n            out = s[left]\n            window[out] -= 1\n            if window[out] == 0: del window[out]\n            left += 1\n        if right - left + 1 == len(p) and window == need:\n            res.append(left)\n    return res\n",
      "java": "public List<Integer> findAnagrams(String s, String p) {\n    List<Integer> res = new ArrayList<>();\n    if (p.length() > s.length()) return res;\n    int[] need = new int[26];\n    int[] window = new int[26];\n    for (char c : p.toCharArray()) need[c-'a']++;\n    int left = 0;\n    for (int right = 0; right < s.length(); right++) {\n        window[s.charAt(right)-'a']++;\n        if (right - left + 1 > p.length()) {\n            window[s.charAt(left)-'a']--;\n            left++;\n        }\n        if (right - left + 1 == p.length()) {\n            boolean ok = true;\n            for (int i = 0; i < 26; i++) {\n                if (window[i] != need[i]) { ok = false; break; }\n            }\n            if (ok) res.add(left);\n        }\n    }\n    return res;\n}\n",
      "cpp": "vector<int> findAnagrams(string s, string p) {\n    vector<int> res;\n    if (p.size() > s.size()) return res;\n    vector<int> need(26,0), window(26,0);\n    for (char c: p) need[c-'a']++;\n    int left=0;\n    for (int right=0; right<(int)s.size(); right++) {\n        window[s[right]-'a']++;\n        if (right-left+1 > (int)p.size()) {\n            window[s[left]-'a']--;\n            left++;\n        }\n        if (right-left+1 == (int)p.size()) {\n            if (window == need) res.push_back(left);\n        }\n    }\n    return res;\n}\n"
    },
    "description": "给定两个字符串 s 和 p，找到 s 中所有 p 的异位词的子串，返回这些子串的起始索引。",
    "leetcodeSlug": "find-all-anagrams-in-a-string",
    "handbookRef": {
      "leetcodeId": 438,
      "chapter": "第二章：滑动窗口算法",
      "section": "2.1 滑动窗口核心模板",
      "orderInSection": 3,
      "mdLine": 355
    },
    "track": "core"
  },
  {
    "id": "q034",
    "topicId": "ch02_sliding_window",
    "type": "multiple_choice",
    "question": "【长度最小的子数组】 正数数组时可用滑窗的原因是？",
    "options": [
      "窗口和随右移单调不减",
      "元素唯一",
      "数组有序",
      "可随机访问"
    ],
    "correctIndex": 0,
    "explanation": "正数保证扩大窗口只会增大和。",
    "xp": 12,
    "learning": {
      "pattern": "滑动窗口模板（扩张-收缩）",
      "coreQuestion": "窗口什么时候扩张，什么时候收缩？",
      "framework": "右指针扩张获取信息，满足约束后左指针收缩并更新答案。",
      "steps": [
        "维护窗口状态（计数/频次）",
        "右移 right 扩张窗口",
        "条件满足时循环右移 left 收缩"
      ],
      "pitfalls": [
        "valid 计数定义不清",
        "收缩后忘记回滚状态",
        "固定窗口与可变窗口混用"
      ],
      "complexity": "双指针各最多移动 n 次，时间 O(n)。",
      "template": "int left = 0, right = 0;\nwhile (right < s.size()) {\n    window.add(s[right]);\n    right++;\n    while (window needs shrink) {\n        window.remove(s[left]);\n        left++;\n    }\n}",
      "insight": "滑动窗口的精髓在于：不断增加 right 扩大窗口，直到满足约束；然后不断增加 left 缩小窗口，直到不再满足约束。过程中更新答案。"
    },
    "codeSnippet": {
      "python": "def minSubArrayLen(target, nums):\n    left = 0\n    s = 0\n    ans = float('inf')\n    for right, x in enumerate(nums):\n        s += x\n        while s >= target:\n            ans = min(ans, right - left + 1)\n            s -= nums[left]\n            left += 1\n    return 0 if ans == float('inf') else ans\n",
      "java": "public int minSubArrayLen(int target, int[] nums) {\n    int left = 0;\n    int sum = 0;\n    int ans = Integer.MAX_VALUE;\n    for (int right = 0; right < nums.length; right++) {\n        sum += nums[right];\n        while (sum >= target) {\n            ans = Math.min(ans, right - left + 1);\n            sum -= nums[left++];\n        }\n    }\n    return ans == Integer.MAX_VALUE ? 0 : ans;\n}\n",
      "cpp": "int minSubArrayLen(int target, vector<int>& nums) {\n    int left=0;\n    long long sum=0;\n    int ans = INT_MAX;\n    for (int right=0; right<(int)nums.size(); right++) {\n        sum += nums[right];\n        while (sum >= target) {\n            ans = min(ans, right-left+1);\n            sum -= nums[left++];\n        }\n    }\n    return ans==INT_MAX?0:ans;\n}\n"
    },
    "description": "给定一个含有 n 个正整数的数组和一个正整数 target 。找出该数组中满足其和 ≥ target 的长度最小的连续子数组，并返回其长度。",
    "leetcodeSlug": "minimum-size-subarray-sum",
    "track": "extra"
  },
  {
    "id": "q035",
    "topicId": "ch02_sliding_window",
    "type": "multiple_choice",
    "question": "【最大连续 1（可翻转 k 次）】 关键计数是？",
    "options": [
      "窗口内 0 的个数",
      "窗口内 1 的个数",
      "窗口和",
      "窗口最大值"
    ],
    "correctIndex": 0,
    "explanation": "当 0 的数量超过 k 时收缩。",
    "xp": 12,
    "learning": {
      "pattern": "滑动窗口模板（扩张-收缩）",
      "coreQuestion": "窗口什么时候扩张，什么时候收缩？",
      "framework": "右指针扩张获取信息，满足约束后左指针收缩并更新答案。",
      "steps": [
        "维护窗口状态（计数/频次）",
        "右移 right 扩张窗口",
        "条件满足时循环右移 left 收缩"
      ],
      "pitfalls": [
        "valid 计数定义不清",
        "收缩后忘记回滚状态",
        "固定窗口与可变窗口混用"
      ],
      "complexity": "双指针各最多移动 n 次，时间 O(n)。",
      "template": "int left = 0, right = 0;\nwhile (right < s.size()) {\n    window.add(s[right]);\n    right++;\n    while (window needs shrink) {\n        window.remove(s[left]);\n        left++;\n    }\n}",
      "insight": "滑动窗口的精髓在于：不断增加 right 扩大窗口，直到满足约束；然后不断增加 left 缩小窗口，直到不再满足约束。过程中更新答案。"
    },
    "codeSnippet": {
      "python": "def longestOnes(nums, k):\n    left = 0\n    zeros = 0\n    ans = 0\n    for right, x in enumerate(nums):\n        if x == 0: zeros += 1\n        while zeros > k:\n            if nums[left] == 0: zeros -= 1\n            left += 1\n        ans = max(ans, right - left + 1)\n    return ans\n",
      "java": "public int longestOnes(int[] nums, int k) {\n    int left = 0, zeros = 0, ans = 0;\n    for (int right = 0; right < nums.length; right++) {\n        if (nums[right] == 0) zeros++;\n        while (zeros > k) {\n            if (nums[left] == 0) zeros--;\n            left++;\n        }\n        ans = Math.max(ans, right - left + 1);\n    }\n    return ans;\n}\n",
      "cpp": "int longestOnes(vector<int>& nums, int k) {\n    int left=0, zeros=0, ans=0;\n    for (int right=0; right<(int)nums.size(); right++) {\n        if (nums[right]==0) zeros++;\n        while (zeros > k) {\n            if (nums[left]==0) zeros--;\n            left++;\n        }\n        ans = max(ans, right-left+1);\n    }\n    return ans;\n}\n"
    },
    "description": "给定一个二进制数组 nums 和一个整数 k，如果可以翻转最多 k 个 0 ，则返回数组中连续 1 的最大个数。",
    "leetcodeSlug": "max-consecutive-ones-iii",
    "track": "extra"
  },
  {
    "id": "q036",
    "topicId": "ch02_sliding_window",
    "type": "multiple_choice",
    "question": "【串联所有单词的子串】 常见优化是？",
    "options": [
      "按单词长度分组起点遍历",
      "暴力全排列",
      "二分查找",
      "并查集"
    ],
    "correctIndex": 0,
    "explanation": "避免每次从头切分。",
    "xp": 12,
    "learning": {
      "pattern": "滑动窗口模板（扩张-收缩）",
      "coreQuestion": "窗口什么时候扩张，什么时候收缩？",
      "framework": "右指针扩张获取信息，满足约束后左指针收缩并更新答案。",
      "steps": [
        "维护窗口状态（计数/频次）",
        "右移 right 扩张窗口",
        "条件满足时循环右移 left 收缩"
      ],
      "pitfalls": [
        "valid 计数定义不清",
        "收缩后忘记回滚状态",
        "固定窗口与可变窗口混用"
      ],
      "complexity": "双指针各最多移动 n 次，时间 O(n)。",
      "template": "int left = 0, right = 0;\nwhile (right < s.size()) {\n    window.add(s[right]);\n    right++;\n    while (window needs shrink) {\n        window.remove(s[left]);\n        left++;\n    }\n}",
      "insight": "滑动窗口的精髓在于：不断增加 right 扩大窗口，直到满足约束；然后不断增加 left 缩小窗口，直到不再满足约束。过程中更新答案。"
    },
    "codeSnippet": {
      "python": "def findSubstring(s, words):\n    if not s or not words: return []\n    from collections import Counter\n    wlen = len(words[0])\n    total = wlen * len(words)\n    need = Counter(words)\n    res = []\n    for offset in range(wlen):\n        left = offset\n        window = Counter()\n        count = 0\n        for right in range(offset, len(s) - wlen + 1, wlen):\n            w = s[right:right+wlen]\n            if w in need:\n                window[w] += 1\n                count += 1\n                while window[w] > need[w]:\n                    out = s[left:left+wlen]\n                    window[out] -= 1\n                    left += wlen\n                    count -= 1\n                if count == len(words):\n                    res.append(left)\n                    out = s[left:left+wlen]\n                    window[out] -= 1\n                    left += wlen\n                    count -= 1\n            else:\n                window.clear()\n                count = 0\n                left = right + wlen\n    return res\n",
      "java": "public List<Integer> findSubstring(String s, String[] words) {\n    List<Integer> res = new ArrayList<>();\n    if (s == null || s.length() == 0 || words == null || words.length == 0) return res;\n    int wlen = words[0].length();\n    int total = wlen * words.length;\n    Map<String, Integer> need = new HashMap<>();\n    for (String w : words) need.put(w, need.getOrDefault(w, 0) + 1);\n    for (int offset = 0; offset < wlen; offset++) {\n        int left = offset, count = 0;\n        Map<String, Integer> window = new HashMap<>();\n        for (int right = offset; right + wlen <= s.length(); right += wlen) {\n            String w = s.substring(right, right + wlen);\n            if (need.containsKey(w)) {\n                window.put(w, window.getOrDefault(w, 0) + 1);\n                count++;\n                while (window.get(w) > need.get(w)) {\n                    String out = s.substring(left, left + wlen);\n                    window.put(out, window.get(out) - 1);\n                    left += wlen;\n                    count--;\n                }\n                if (count == words.length) {\n                    res.add(left);\n                    String out = s.substring(left, left + wlen);\n                    window.put(out, window.get(out) - 1);\n                    left += wlen;\n                    count--;\n                }\n            } else {\n                window.clear();\n                count = 0;\n                left = right + wlen;\n            }\n        }\n    }\n    return res;\n}\n",
      "cpp": "vector<int> findSubstring(string s, vector<string>& words) {\n    vector<int> res;\n    if (s.empty() || words.empty()) return res;\n    int wlen = words[0].size();\n    unordered_map<string,int> need;\n    for (auto &w: words) need[w]++;\n    for (int offset=0; offset<wlen; offset++) {\n        int left=offset, count=0;\n        unordered_map<string,int> window;\n        for (int right=offset; right + wlen <= (int)s.size(); right += wlen) {\n            string w = s.substr(right, wlen);\n            if (need.count(w)) {\n                window[w]++;\n                count++;\n                while (window[w] > need[w]) {\n                    string out = s.substr(left, wlen);\n                    window[out]--;\n                    left += wlen;\n                    count--;\n                }\n                if (count == (int)words.size()) {\n                    res.push_back(left);\n                    string out = s.substr(left, wlen);\n                    window[out]--;\n                    left += wlen;\n                    count--;\n                }\n            } else {\n                window.clear();\n                count = 0;\n                left = right + wlen;\n            }\n        }\n    }\n    return res;\n}\n"
    },
    "description": "本题对应《串联所有单词的子串》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 sliding_window 相关方法中完成复杂度优化。",
    "leetcodeSlug": "substring-with-concatenation-of-all-words",
    "track": "extra"
  },
  {
    "id": "q037",
    "topicId": "ch02_sliding_window",
    "type": "multiple_choice",
    "question": "【水果成篮】 对应的数据结构是？",
    "options": [
      "最多容纳2种键的哈希计数",
      "最小堆",
      "数组排序",
      "前缀和"
    ],
    "correctIndex": 0,
    "explanation": "本质是“最多含两种字符的最长子串”。",
    "xp": 12,
    "learning": {
      "pattern": "滑动窗口模板（扩张-收缩）",
      "coreQuestion": "窗口什么时候扩张，什么时候收缩？",
      "framework": "右指针扩张获取信息，满足约束后左指针收缩并更新答案。",
      "steps": [
        "维护窗口状态（计数/频次）",
        "右移 right 扩张窗口",
        "条件满足时循环右移 left 收缩"
      ],
      "pitfalls": [
        "valid 计数定义不清",
        "收缩后忘记回滚状态",
        "固定窗口与可变窗口混用"
      ],
      "complexity": "双指针各最多移动 n 次，时间 O(n)。",
      "template": "int left = 0, right = 0;\nwhile (right < s.size()) {\n    window.add(s[right]);\n    right++;\n    while (window needs shrink) {\n        window.remove(s[left]);\n        left++;\n    }\n}",
      "insight": "滑动窗口的精髓在于：不断增加 right 扩大窗口，直到满足约束；然后不断增加 left 缩小窗口，直到不再满足约束。过程中更新答案。"
    },
    "codeSnippet": {
      "python": "def totalFruit(fruits):\n    from collections import defaultdict\n    left = 0\n    cnt = defaultdict(int)\n    ans = 0\n    for right, x in enumerate(fruits):\n        cnt[x] += 1\n        while len(cnt) > 2:\n            y = fruits[left]\n            cnt[y] -= 1\n            if cnt[y] == 0: del cnt[y]\n            left += 1\n        ans = max(ans, right - left + 1)\n    return ans\n",
      "java": "public int totalFruit(int[] fruits) {\n    Map<Integer, Integer> cnt = new HashMap<>();\n    int left = 0, ans = 0;\n    for (int right = 0; right < fruits.length; right++) {\n        cnt.put(fruits[right], cnt.getOrDefault(fruits[right], 0) + 1);\n        while (cnt.size() > 2) {\n            int y = fruits[left++];\n            cnt.put(y, cnt.get(y) - 1);\n            if (cnt.get(y) == 0) cnt.remove(y);\n        }\n        ans = Math.max(ans, right - left + 1);\n    }\n    return ans;\n}\n",
      "cpp": "int totalFruit(vector<int>& fruits) {\n    unordered_map<int,int> cnt;\n    int left=0, ans=0;\n    for (int right=0; right<(int)fruits.size(); right++) {\n        cnt[fruits[right]]++;\n        while ((int)cnt.size() > 2) {\n            int y = fruits[left++];\n            if (--cnt[y] == 0) cnt.erase(y);\n        }\n        ans = max(ans, right-left+1);\n    }\n    return ans;\n}\n"
    },
    "description": "本题对应《水果成篮》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 sliding_window 相关方法中完成复杂度优化。",
    "leetcodeSlug": "fruit-into-baskets",
    "track": "extra"
  },
  {
    "id": "q038",
    "topicId": "ch02_sliding_window",
    "type": "multiple_choice",
    "question": "【替换后的最长重复字符】 窗口是否必须实时维护精确 maxFreq？",
    "options": [
      "不必须，可用历史最大值优化",
      "必须精确",
      "不能用频次",
      "需排序"
    ],
    "correctIndex": 0,
    "explanation": "历史最大值不会影响正确性，仅可能延后收缩。",
    "xp": 12,
    "learning": {
      "pattern": "滑动窗口模板（扩张-收缩）",
      "coreQuestion": "窗口什么时候扩张，什么时候收缩？",
      "framework": "右指针扩张获取信息，满足约束后左指针收缩并更新答案。",
      "steps": [
        "维护窗口状态（计数/频次）",
        "右移 right 扩张窗口",
        "条件满足时循环右移 left 收缩"
      ],
      "pitfalls": [
        "valid 计数定义不清",
        "收缩后忘记回滚状态",
        "固定窗口与可变窗口混用"
      ],
      "complexity": "双指针各最多移动 n 次，时间 O(n)。",
      "template": "int left = 0, right = 0;\nwhile (right < s.size()) {\n    window.add(s[right]);\n    right++;\n    while (window needs shrink) {\n        window.remove(s[left]);\n        left++;\n    }\n}",
      "insight": "滑动窗口的精髓在于：不断增加 right 扩大窗口，直到满足约束；然后不断增加 left 缩小窗口，直到不再满足约束。过程中更新答案。"
    },
    "codeSnippet": {
      "python": "def characterReplacement(s, k):\n    from collections import defaultdict\n    cnt = defaultdict(int)\n    left = 0\n    maxCount = 0\n    ans = 0\n    for right, ch in enumerate(s):\n        cnt[ch] += 1\n        maxCount = max(maxCount, cnt[ch])\n        while (right - left + 1) - maxCount > k:\n            cnt[s[left]] -= 1\n            left += 1\n        ans = max(ans, right - left + 1)\n    return ans\n",
      "java": "public int characterReplacement(String s, int k) {\n    int[] cnt = new int[26];\n    int left = 0, maxCount = 0, ans = 0;\n    for (int right = 0; right < s.length(); right++) {\n        int idx = s.charAt(right) - 'A';\n        cnt[idx]++;\n        maxCount = Math.max(maxCount, cnt[idx]);\n        while ((right - left + 1) - maxCount > k) {\n            cnt[s.charAt(left) - 'A']--;\n            left++;\n        }\n        ans = Math.max(ans, right - left + 1);\n    }\n    return ans;\n}\n",
      "cpp": "int characterReplacement(string s, int k) {\n    vector<int> cnt(26,0);\n    int left=0, maxCount=0, ans=0;\n    for (int right=0; right<(int)s.size(); right++) {\n        int idx = s[right]-'A';\n        cnt[idx]++;\n        maxCount = max(maxCount, cnt[idx]);\n        while ((right-left+1) - maxCount > k) {\n            cnt[s[left]-'A']--;\n            left++;\n        }\n        ans = max(ans, right-left+1);\n    }\n    return ans;\n}\n"
    },
    "description": "本题对应《替换后的最长重复字符》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 sliding_window 相关方法中完成复杂度优化。",
    "leetcodeSlug": "longest-repeating-character-replacement",
    "track": "extra"
  },
  {
    "id": "q039",
    "topicId": "ch01_two_pointers",
    "type": "multiple_choice",
    "question": "【反转链表】 迭代解法每轮需要保存什么？",
    "options": [
      "next 节点",
      "head 长度",
      "尾指针值",
      "随机节点"
    ],
    "correctIndex": 0,
    "explanation": "先存 next 防止断链。",
    "xp": 14,
    "codeSnippet": {
      "python": "def reverseList(head):\n    prev = None\n    curr = head\n    while curr:\n        next_node = curr.next\n        curr.next = prev\n        prev = curr\n        curr = next_node\n    return prev",
      "java": "public ListNode reverseList(ListNode head) {\n    ListNode prev = null;\n    ListNode curr = head;\n    while (curr != null) {\n        ListNode next = curr.next;\n        curr.next = prev;\n        prev = curr;\n        curr = next;\n    }\n    return prev;\n}",
      "cpp": "ListNode* reverseList(ListNode* head) {\n    ListNode* prev = nullptr;\n    ListNode* curr = head;\n    while (curr) {\n        ListNode* next = curr->next;\n        curr->next = prev;\n        prev = curr;\n        curr = next;\n    }\n    return prev;\n}"
    },
    "learning": {
      "pattern": "链表指针操作框架",
      "coreQuestion": "当前节点修改前，哪些指针必须先保存？",
      "framework": "优先保证不断链，再做重连；哑节点可统一头结点逻辑。",
      "steps": [
        "画出局部指针变化图",
        "先缓存 next 再改指向",
        "最后移动工作指针"
      ],
      "pitfalls": [
        "先改 next 导致链断",
        "头节点特殊分支过多",
        "空链表/单节点未覆盖"
      ],
      "complexity": "多数题时间 O(n)，空间 O(1)。",
      "template": "优先使用 dummy 统一头结点边界。\n涉及区间操作时先断开再重连，保证 next 指针始终可追踪。",
      "insight": "链表题最常见错误是丢失 next。每次改指针前先保存后继，才能避免链断裂。"
    },
    "description": "给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。",
    "leetcodeSlug": "reverse-linked-list",
    "track": "extra"
  },
  {
    "id": "q040",
    "topicId": "ch01_two_pointers",
    "type": "multiple_choice",
    "question": "【合并两个有序链表】 常用技巧是？",
    "options": [
      "哑节点 dummy",
      "哈希表",
      "二分",
      "栈"
    ],
    "correctIndex": 0,
    "explanation": "dummy 简化头节点处理。",
    "xp": 12,
    "learning": {
      "pattern": "链表指针操作框架",
      "coreQuestion": "当前节点修改前，哪些指针必须先保存？",
      "framework": "优先保证不断链，再做重连；哑节点可统一头结点逻辑。",
      "steps": [
        "画出局部指针变化图",
        "先缓存 next 再改指向",
        "最后移动工作指针"
      ],
      "pitfalls": [
        "先改 next 导致链断",
        "头节点特殊分支过多",
        "空链表/单节点未覆盖"
      ],
      "complexity": "多数题时间 O(n)，空间 O(1)。",
      "template": "优先使用 dummy 统一头结点边界。\n涉及区间操作时先断开再重连，保证 next 指针始终可追踪。",
      "insight": "链表题最常见错误是丢失 next。每次改指针前先保存后继，才能避免链断裂。"
    },
    "codeSnippet": {
      "python": "def mergeTwoLists(l1, l2):\n    dummy = ListNode(0)\n    cur = dummy\n    while l1 and l2:\n        if l1.val <= l2.val:\n            cur.next = l1\n            l1 = l1.next\n        else:\n            cur.next = l2\n            l2 = l2.next\n        cur = cur.next\n    cur.next = l1 if l1 else l2\n    return dummy.next\n",
      "java": "public ListNode mergeTwoLists(ListNode l1, ListNode l2) {\n    ListNode dummy = new ListNode(0);\n    ListNode cur = dummy;\n    while (l1 != null && l2 != null) {\n        if (l1.val <= l2.val) {\n            cur.next = l1;\n            l1 = l1.next;\n        } else {\n            cur.next = l2;\n            l2 = l2.next;\n        }\n        cur = cur.next;\n    }\n    cur.next = (l1 != null) ? l1 : l2;\n    return dummy.next;\n}\n",
      "cpp": "ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {\n    ListNode dummy(0);\n    ListNode* cur = &dummy;\n    while (l1 && l2) {\n        if (l1->val <= l2->val) {\n            cur->next = l1;\n            l1 = l1->next;\n        } else {\n            cur->next = l2;\n            l2 = l2->next;\n        }\n        cur = cur->next;\n    }\n    cur->next = l1 ? l1 : l2;\n    return dummy.next;\n}\n"
    },
    "description": "将两个升序链表合并为一个新的升序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。",
    "leetcodeSlug": "merge-two-sorted-lists",
    "handbookRef": {
      "leetcodeId": 21,
      "chapter": "第一章：双指针技巧",
      "section": "1.1 链表双指针技巧",
      "orderInSection": 3,
      "mdLine": 84
    },
    "track": "core"
  },
  {
    "id": "q041",
    "topicId": "ch01_two_pointers",
    "type": "multiple_choice",
    "question": "【链表有环】 为什么快慢指针可判环？",
    "options": [
      "有环时相对速度差导致必相遇",
      "快指针总能到尾",
      "慢指针更快",
      "链表有序"
    ],
    "correctIndex": 0,
    "explanation": "环中追及问题。",
    "xp": 12,
    "learning": {
      "pattern": "链表指针操作框架",
      "coreQuestion": "当前节点修改前，哪些指针必须先保存？",
      "framework": "优先保证不断链，再做重连；哑节点可统一头结点逻辑。",
      "steps": [
        "画出局部指针变化图",
        "先缓存 next 再改指向",
        "最后移动工作指针"
      ],
      "pitfalls": [
        "先改 next 导致链断",
        "头节点特殊分支过多",
        "空链表/单节点未覆盖"
      ],
      "complexity": "多数题时间 O(n)，空间 O(1)。",
      "template": "优先使用 dummy 统一头结点边界。\n涉及区间操作时先断开再重连，保证 next 指针始终可追踪。",
      "insight": "链表题最常见错误是丢失 next。每次改指针前先保存后继，才能避免链断裂。"
    },
    "codeSnippet": {
      "python": "def hasCycle(head):\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n        if slow is fast:\n            return True\n    return False\n",
      "java": "public boolean hasCycle(ListNode head) {\n    ListNode slow = head, fast = head;\n    while (fast != null && fast.next != null) {\n        slow = slow.next;\n        fast = fast.next.next;\n        if (slow == fast) return true;\n    }\n    return false;\n}\n",
      "cpp": "bool hasCycle(ListNode* head) {\n    ListNode* slow = head;\n    ListNode* fast = head;\n    while (fast && fast->next) {\n        slow = slow->next;\n        fast = fast->next->next;\n        if (slow == fast) return true;\n    }\n    return false;\n}\n"
    },
    "description": "本题对应《链表有环》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 linked_list 相关方法中完成复杂度优化。",
    "leetcodeSlug": "linked-list-cycle",
    "handbookRef": {
      "leetcodeId": 141,
      "chapter": "第一章：双指针技巧",
      "section": "1.1 链表双指针技巧",
      "orderInSection": 1,
      "mdLine": 32
    },
    "track": "core"
  },
  {
    "id": "q042",
    "topicId": "ch01_two_pointers",
    "type": "multiple_choice",
    "question": "【重排链表】 典型流程是？",
    "options": [
      "找中点+反转后半+交替合并",
      "排序后重建",
      "随机打乱",
      "双重循环"
    ],
    "correctIndex": 0,
    "explanation": "三步法是标准做法。",
    "xp": 12,
    "learning": {
      "pattern": "链表指针操作框架",
      "coreQuestion": "当前节点修改前，哪些指针必须先保存？",
      "framework": "优先保证不断链，再做重连；哑节点可统一头结点逻辑。",
      "steps": [
        "画出局部指针变化图",
        "先缓存 next 再改指向",
        "最后移动工作指针"
      ],
      "pitfalls": [
        "先改 next 导致链断",
        "头节点特殊分支过多",
        "空链表/单节点未覆盖"
      ],
      "complexity": "多数题时间 O(n)，空间 O(1)。",
      "template": "优先使用 dummy 统一头结点边界。\n涉及区间操作时先断开再重连，保证 next 指针始终可追踪。",
      "insight": "链表题最常见错误是丢失 next。每次改指针前先保存后继，才能避免链断裂。"
    },
    "codeSnippet": {
      "python": "# 重排链表\ndef solve(head):\n    dummy = ListNode(0, head)\n    prev, cur = None, head\n    while cur:\n        nxt = cur.next\n        # 典型链表操作：先存 nxt，再改指针\n        cur.next = prev\n        prev, cur = cur, nxt\n    return prev",
      "java": "// 重排链表\nListNode solve(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n        ListNode nxt = cur.next;\n        cur.next = prev;\n        prev = cur;\n        cur = nxt;\n    }\n    return prev;\n}",
      "cpp": "// 重排链表\nListNode* solve(ListNode* head) {\n    ListNode* prev = nullptr;\n    while (head) {\n        ListNode* nxt = head->next;\n        head->next = prev;\n        prev = head;\n        head = nxt;\n    }\n    return prev;\n}"
    },
    "description": "本题对应《重排链表》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 linked_list 相关方法中完成复杂度优化。",
    "leetcodeSlug": "reorder-list",
    "track": "extra"
  },
  {
    "id": "q043",
    "topicId": "ch01_two_pointers",
    "type": "multiple_choice",
    "question": "【K 个一组翻转链表】 一般需要先确认什么？",
    "options": [
      "剩余节点数是否 >= k",
      "链表值是否递增",
      "头结点值",
      "是否有环"
    ],
    "correctIndex": 0,
    "explanation": "不足 k 的尾部保持不变。",
    "xp": 12,
    "learning": {
      "pattern": "链表指针操作框架",
      "coreQuestion": "当前节点修改前，哪些指针必须先保存？",
      "framework": "优先保证不断链，再做重连；哑节点可统一头结点逻辑。",
      "steps": [
        "画出局部指针变化图",
        "先缓存 next 再改指向",
        "最后移动工作指针"
      ],
      "pitfalls": [
        "先改 next 导致链断",
        "头节点特殊分支过多",
        "空链表/单节点未覆盖"
      ],
      "complexity": "多数题时间 O(n)，空间 O(1)。",
      "template": "优先使用 dummy 统一头结点边界。\n涉及区间操作时先断开再重连，保证 next 指针始终可追踪。",
      "insight": "链表题最常见错误是丢失 next。每次改指针前先保存后继，才能避免链断裂。"
    },
    "codeSnippet": {
      "python": "# K 个一组翻转链表\ndef solve(head):\n    dummy = ListNode(0, head)\n    prev, cur = None, head\n    while cur:\n        nxt = cur.next\n        # 典型链表操作：先存 nxt，再改指针\n        cur.next = prev\n        prev, cur = cur, nxt\n    return prev",
      "java": "// K 个一组翻转链表\nListNode solve(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n        ListNode nxt = cur.next;\n        cur.next = prev;\n        prev = cur;\n        cur = nxt;\n    }\n    return prev;\n}",
      "cpp": "// K 个一组翻转链表\nListNode* solve(ListNode* head) {\n    ListNode* prev = nullptr;\n    while (head) {\n        ListNode* nxt = head->next;\n        head->next = prev;\n        prev = head;\n        head = nxt;\n    }\n    return prev;\n}"
    },
    "description": "本题对应《K 个一组翻转链表》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 linked_list 相关方法中完成复杂度优化。",
    "leetcodeSlug": "reverse-nodes-in-k-group",
    "track": "extra"
  },
  {
    "id": "q044",
    "topicId": "ch01_two_pointers",
    "type": "multiple_choice",
    "question": "【复制带随机指针的链表】 O(1) 额外空间做法是？",
    "options": [
      "新节点插入旧节点后再拆分",
      "哈希映射旧新节点",
      "递归拷贝",
      "排序"
    ],
    "correctIndex": 0,
    "explanation": "穿插复制可避免额外映射。",
    "xp": 12,
    "learning": {
      "pattern": "链表指针操作框架",
      "coreQuestion": "当前节点修改前，哪些指针必须先保存？",
      "framework": "优先保证不断链，再做重连；哑节点可统一头结点逻辑。",
      "steps": [
        "画出局部指针变化图",
        "先缓存 next 再改指向",
        "最后移动工作指针"
      ],
      "pitfalls": [
        "先改 next 导致链断",
        "头节点特殊分支过多",
        "空链表/单节点未覆盖"
      ],
      "complexity": "多数题时间 O(n)，空间 O(1)。",
      "template": "优先使用 dummy 统一头结点边界。\n涉及区间操作时先断开再重连，保证 next 指针始终可追踪。",
      "insight": "链表题最常见错误是丢失 next。每次改指针前先保存后继，才能避免链断裂。"
    },
    "codeSnippet": {
      "python": "# 复制带随机指针的链表\ndef solve(head):\n    dummy = ListNode(0, head)\n    prev, cur = None, head\n    while cur:\n        nxt = cur.next\n        # 典型链表操作：先存 nxt，再改指针\n        cur.next = prev\n        prev, cur = cur, nxt\n    return prev",
      "java": "// 复制带随机指针的链表\nListNode solve(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n        ListNode nxt = cur.next;\n        cur.next = prev;\n        prev = cur;\n        cur = nxt;\n    }\n    return prev;\n}",
      "cpp": "// 复制带随机指针的链表\nListNode* solve(ListNode* head) {\n    ListNode* prev = nullptr;\n    while (head) {\n        ListNode* nxt = head->next;\n        head->next = prev;\n        prev = head;\n        head = nxt;\n    }\n    return prev;\n}"
    },
    "description": "本题对应《复制带随机指针的链表》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 linked_list 相关方法中完成复杂度优化。",
    "leetcodeSlug": "copy-list-with-random-pointer",
    "track": "extra"
  },
  {
    "id": "q045",
    "topicId": "ch01_two_pointers",
    "type": "multiple_choice",
    "question": "【排序链表】 最常用达到 O(n log n) 的方法是？",
    "options": [
      "归并排序",
      "快速排序",
      "选择排序",
      "计数排序"
    ],
    "correctIndex": 0,
    "explanation": "链表适合归并，分割和合并都高效。",
    "xp": 12,
    "learning": {
      "pattern": "链表指针操作框架",
      "coreQuestion": "当前节点修改前，哪些指针必须先保存？",
      "framework": "优先保证不断链，再做重连；哑节点可统一头结点逻辑。",
      "steps": [
        "画出局部指针变化图",
        "先缓存 next 再改指向",
        "最后移动工作指针"
      ],
      "pitfalls": [
        "先改 next 导致链断",
        "头节点特殊分支过多",
        "空链表/单节点未覆盖"
      ],
      "complexity": "多数题时间 O(n)，空间 O(1)。",
      "template": "优先使用 dummy 统一头结点边界。\n涉及区间操作时先断开再重连，保证 next 指针始终可追踪。",
      "insight": "链表题最常见错误是丢失 next。每次改指针前先保存后继，才能避免链断裂。"
    },
    "codeSnippet": {
      "python": "# 排序链表\ndef solve(head):\n    dummy = ListNode(0, head)\n    prev, cur = None, head\n    while cur:\n        nxt = cur.next\n        # 典型链表操作：先存 nxt，再改指针\n        cur.next = prev\n        prev, cur = cur, nxt\n    return prev",
      "java": "// 排序链表\nListNode solve(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n        ListNode nxt = cur.next;\n        cur.next = prev;\n        prev = cur;\n        cur = nxt;\n    }\n    return prev;\n}",
      "cpp": "// 排序链表\nListNode* solve(ListNode* head) {\n    ListNode* prev = nullptr;\n    while (head) {\n        ListNode* nxt = head->next;\n        head->next = prev;\n        prev = head;\n        head = nxt;\n    }\n    return prev;\n}"
    },
    "description": "本题对应《排序链表》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 linked_list 相关方法中完成复杂度优化。",
    "leetcodeSlug": "sort-list",
    "track": "extra"
  },
  {
    "id": "q046",
    "topicId": "ch01_two_pointers",
    "type": "multiple_choice",
    "question": "【回文链表】 结束后是否建议恢复链表？",
    "options": [
      "建议恢复，避免副作用",
      "必须不恢复",
      "恢复会错",
      "无所谓"
    ],
    "correctIndex": 0,
    "explanation": "面试中恢复可体现工程意识。",
    "xp": 12,
    "learning": {
      "pattern": "链表指针操作框架",
      "coreQuestion": "当前节点修改前，哪些指针必须先保存？",
      "framework": "优先保证不断链，再做重连；哑节点可统一头结点逻辑。",
      "steps": [
        "画出局部指针变化图",
        "先缓存 next 再改指向",
        "最后移动工作指针"
      ],
      "pitfalls": [
        "先改 next 导致链断",
        "头节点特殊分支过多",
        "空链表/单节点未覆盖"
      ],
      "complexity": "多数题时间 O(n)，空间 O(1)。",
      "template": "优先使用 dummy 统一头结点边界。\n涉及区间操作时先断开再重连，保证 next 指针始终可追踪。",
      "insight": "链表题最常见错误是丢失 next。每次改指针前先保存后继，才能避免链断裂。"
    },
    "codeSnippet": {
      "python": "# 回文链表\ndef solve(head):\n    dummy = ListNode(0, head)\n    prev, cur = None, head\n    while cur:\n        nxt = cur.next\n        # 典型链表操作：先存 nxt，再改指针\n        cur.next = prev\n        prev, cur = cur, nxt\n    return prev",
      "java": "// 回文链表\nListNode solve(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n        ListNode nxt = cur.next;\n        cur.next = prev;\n        prev = cur;\n        cur = nxt;\n    }\n    return prev;\n}",
      "cpp": "// 回文链表\nListNode* solve(ListNode* head) {\n    ListNode* prev = nullptr;\n    while (head) {\n        ListNode* nxt = head->next;\n        head->next = prev;\n        prev = head;\n        head = nxt;\n    }\n    return prev;\n}"
    },
    "description": "给你一个单链表的头节点 head ，请你判断该链表是否为回文链表。如果是，返回 true ；否则，返回 false 。",
    "leetcodeSlug": "palindrome-linked-list-review",
    "track": "extra"
  },
  {
    "id": "q047",
    "topicId": "ch01_two_pointers",
    "type": "multiple_choice",
    "question": "【环形链表 II】 找入环点时的关键是？",
    "options": [
      "相遇后一指针回头同时一步步走",
      "继续快慢指针",
      "哈希后排序",
      "随机跳"
    ],
    "correctIndex": 0,
    "explanation": "数学推导可得两者在入环点相遇。",
    "xp": 12,
    "learning": {
      "pattern": "链表指针操作框架",
      "coreQuestion": "当前节点修改前，哪些指针必须先保存？",
      "framework": "优先保证不断链，再做重连；哑节点可统一头结点逻辑。",
      "steps": [
        "画出局部指针变化图",
        "先缓存 next 再改指向",
        "最后移动工作指针"
      ],
      "pitfalls": [
        "先改 next 导致链断",
        "头节点特殊分支过多",
        "空链表/单节点未覆盖"
      ],
      "complexity": "多数题时间 O(n)，空间 O(1)。",
      "template": "优先使用 dummy 统一头结点边界。\n涉及区间操作时先断开再重连，保证 next 指针始终可追踪。",
      "insight": "链表题最常见错误是丢失 next。每次改指针前先保存后继，才能避免链断裂。"
    },
    "codeSnippet": {
      "python": "def detectCycle(head):\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n        if slow is fast:\n            p = head\n            while p is not slow:\n                p = p.next\n                slow = slow.next\n            return p\n    return None\n",
      "java": "public ListNode detectCycle(ListNode head) {\n    ListNode slow = head, fast = head;\n    while (fast != null && fast.next != null) {\n        slow = slow.next;\n        fast = fast.next.next;\n        if (slow == fast) {\n            ListNode p = head;\n            while (p != slow) {\n                p = p.next;\n                slow = slow.next;\n            }\n            return p;\n        }\n    }\n    return null;\n}\n",
      "cpp": "ListNode* detectCycle(ListNode* head) {\n    ListNode* slow = head;\n    ListNode* fast = head;\n    while (fast && fast->next) {\n        slow = slow->next;\n        fast = fast->next->next;\n        if (slow == fast) {\n            ListNode* p = head;\n            while (p != slow) {\n                p = p->next;\n                slow = slow->next;\n            }\n            return p;\n        }\n    }\n    return nullptr;\n}\n"
    },
    "description": "本题对应《环形链表 II》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 linked_list 相关方法中完成复杂度优化。",
    "leetcodeSlug": "linked-list-cycle-ii",
    "handbookRef": {
      "leetcodeId": 142,
      "chapter": "第一章：双指针技巧",
      "section": "1.1 链表双指针技巧",
      "orderInSection": 2,
      "mdLine": 57
    },
    "track": "core"
  },
  {
    "id": "q048",
    "topicId": "ch01_two_pointers",
    "type": "multiple_choice",
    "question": "【删除排序链表重复元素 II】 需要删除哪些节点？",
    "options": [
      "所有重复值节点",
      "保留一个重复值",
      "只删相邻两项",
      "只删首尾"
    ],
    "correctIndex": 0,
    "explanation": "题意是重复元素完全移除。",
    "xp": 12,
    "learning": {
      "pattern": "链表指针操作框架",
      "coreQuestion": "当前节点修改前，哪些指针必须先保存？",
      "framework": "优先保证不断链，再做重连；哑节点可统一头结点逻辑。",
      "steps": [
        "画出局部指针变化图",
        "先缓存 next 再改指向",
        "最后移动工作指针"
      ],
      "pitfalls": [
        "先改 next 导致链断",
        "头节点特殊分支过多",
        "空链表/单节点未覆盖"
      ],
      "complexity": "多数题时间 O(n)，空间 O(1)。",
      "template": "优先使用 dummy 统一头结点边界。\n涉及区间操作时先断开再重连，保证 next 指针始终可追踪。",
      "insight": "链表题最常见错误是丢失 next。每次改指针前先保存后继，才能避免链断裂。"
    },
    "codeSnippet": {
      "python": "# 删除排序链表重复元素 II\ndef solve(head):\n    dummy = ListNode(0, head)\n    prev, cur = None, head\n    while cur:\n        nxt = cur.next\n        # 典型链表操作：先存 nxt，再改指针\n        cur.next = prev\n        prev, cur = cur, nxt\n    return prev",
      "java": "// 删除排序链表重复元素 II\nListNode solve(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n        ListNode nxt = cur.next;\n        cur.next = prev;\n        prev = cur;\n        cur = nxt;\n    }\n    return prev;\n}",
      "cpp": "// 删除排序链表重复元素 II\nListNode* solve(ListNode* head) {\n    ListNode* prev = nullptr;\n    while (head) {\n        ListNode* nxt = head->next;\n        head->next = prev;\n        prev = head;\n        head = nxt;\n    }\n    return prev;\n}"
    },
    "description": "本题对应《删除排序链表重复元素 II》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 linked_list 相关方法中完成复杂度优化。",
    "leetcodeSlug": "remove-duplicates-from-sorted-list-ii",
    "track": "extra"
  },
  {
    "id": "q049",
    "topicId": "ch10_monotonic",
    "type": "multiple_choice",
    "question": "【有效括号】 核心数据结构是？",
    "options": [
      "栈",
      "队列",
      "哈希",
      "堆"
    ],
    "correctIndex": 0,
    "explanation": "后进先出匹配括号。",
    "xp": 12,
    "learning": {
      "pattern": "栈队列模型（后进先出/先进先出）",
      "coreQuestion": "当前元素与之前元素是什么“最近关系”？",
      "framework": "若关心最近更大/更小，优先考虑单调栈；若按层推进，优先队列。",
      "steps": [
        "确认需要“最近关系”还是“层序关系”",
        "定义栈/队列中保存值还是下标",
        "入结构前清理不合法元素"
      ],
      "pitfalls": [
        "把值和下标混用",
        "忘记弹出过期元素",
        "单调性方向写反"
      ],
      "complexity": "均摊时间通常 O(n)。",
      "template": "先定义栈顶或队头的语义（最近匹配/单调性/最早入队）。\n入栈入队前先弹出失效元素，再执行当前更新。",
      "insight": "单调栈与队列的本质是“延迟结算”，在触发条件出现时一次性处理历史元素。"
    },
    "codeSnippet": {
      "python": "# 有效括号\ndef solve(s):\n    st = []\n    mp = {')':'(', ']':'[', '}':'{'}\n    for c in s:\n        if c in mp:\n            if not st or st.pop() != mp[c]:\n                return False\n        else:\n            st.append(c)\n    return not st",
      "java": "// 有效括号\nboolean solve(String s) {\n    Deque<Character> st = new ArrayDeque<>();\n    Map<Character,Character> mp = Map.of(')','(',']','[','}','{');\n    for (char c : s.toCharArray()) {\n        if (mp.containsKey(c)) {\n            if (st.isEmpty() || st.pop() != mp.get(c)) return false;\n        } else st.push(c);\n    }\n    return st.isEmpty();\n}",
      "cpp": "// 有效括号\nbool solve(string s) {\n    stack<char> st; unordered_map<char,char> mp{{')','('},{']','['},{'}','{'}};\n    for (char c : s) {\n        if (mp.count(c)) {\n            if (st.empty() || st.top() != mp[c]) return false;\n            st.pop();\n        } else st.push(c);\n    }\n    return st.empty();\n}"
    },
    "description": "给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。",
    "leetcodeSlug": "valid-parentheses",
    "track": "extra"
  },
  {
    "id": "q050",
    "topicId": "ch10_monotonic",
    "type": "multiple_choice",
    "question": "【最小栈】 常见做法是？",
    "options": [
      "辅助栈同步维护最小值",
      "每次遍历求最小",
      "二分树",
      "并查集"
    ],
    "correctIndex": 0,
    "explanation": "push/pop 同步更新 min 栈。",
    "xp": 12,
    "learning": {
      "pattern": "栈队列模型（后进先出/先进先出）",
      "coreQuestion": "当前元素与之前元素是什么“最近关系”？",
      "framework": "若关心最近更大/更小，优先考虑单调栈；若按层推进，优先队列。",
      "steps": [
        "确认需要“最近关系”还是“层序关系”",
        "定义栈/队列中保存值还是下标",
        "入结构前清理不合法元素"
      ],
      "pitfalls": [
        "把值和下标混用",
        "忘记弹出过期元素",
        "单调性方向写反"
      ],
      "complexity": "均摊时间通常 O(n)。",
      "template": "先定义栈顶或队头的语义（最近匹配/单调性/最早入队）。\n入栈入队前先弹出失效元素，再执行当前更新。",
      "insight": "单调栈与队列的本质是“延迟结算”，在触发条件出现时一次性处理历史元素。"
    },
    "codeSnippet": {
      "python": "# 最小栈\ndef solve(s):\n    st = []\n    mp = {')':'(', ']':'[', '}':'{'}\n    for c in s:\n        if c in mp:\n            if not st or st.pop() != mp[c]:\n                return False\n        else:\n            st.append(c)\n    return not st",
      "java": "// 最小栈\nboolean solve(String s) {\n    Deque<Character> st = new ArrayDeque<>();\n    Map<Character,Character> mp = Map.of(')','(',']','[','}','{');\n    for (char c : s.toCharArray()) {\n        if (mp.containsKey(c)) {\n            if (st.isEmpty() || st.pop() != mp.get(c)) return false;\n        } else st.push(c);\n    }\n    return st.isEmpty();\n}",
      "cpp": "// 最小栈\nbool solve(string s) {\n    stack<char> st; unordered_map<char,char> mp{{')','('},{']','['},{'}','{'}};\n    for (char c : s) {\n        if (mp.count(c)) {\n            if (st.empty() || st.top() != mp[c]) return false;\n            st.pop();\n        } else st.push(c);\n    }\n    return st.empty();\n}"
    },
    "description": "设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。",
    "leetcodeSlug": "min-stack",
    "track": "extra"
  },
  {
    "id": "q051",
    "topicId": "ch10_monotonic",
    "type": "multiple_choice",
    "question": "【每日温度】 为什么用单调递减栈？",
    "options": [
      "可在出栈时确定下一个更大元素",
      "减少空间为 O(1)",
      "便于排序",
      "避免循环"
    ],
    "correctIndex": 0,
    "explanation": "每个元素最多进出栈一次。",
    "xp": 12,
    "learning": {
      "pattern": "栈队列模型（后进先出/先进先出）",
      "coreQuestion": "当前元素与之前元素是什么“最近关系”？",
      "framework": "若关心最近更大/更小，优先考虑单调栈；若按层推进，优先队列。",
      "steps": [
        "确认需要“最近关系”还是“层序关系”",
        "定义栈/队列中保存值还是下标",
        "入结构前清理不合法元素"
      ],
      "pitfalls": [
        "把值和下标混用",
        "忘记弹出过期元素",
        "单调性方向写反"
      ],
      "complexity": "均摊时间通常 O(n)。",
      "template": "先定义栈顶或队头的语义（最近匹配/单调性/最早入队）。\n入栈入队前先弹出失效元素，再执行当前更新。",
      "insight": "单调栈与队列的本质是“延迟结算”，在触发条件出现时一次性处理历史元素。"
    },
    "description": "本题对应《每日温度》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 stack_queue 相关方法中完成复杂度优化。",
    "codeSnippet": {
      "python": "def solve(tokens):\n    st = []\n    for t in tokens:\n        if t in [\"+\", \"-\", \"*\", \"/\"]:\n            b, a = st.pop(), st.pop()\n            if t == \"+\": st.append(a + b)\n            elif t == \"-\": st.append(a - b)\n            elif t == \"*\": st.append(a * b)\n            else: st.append(int(a / b))\n        else:\n            st.append(int(t))\n    return st[-1]",
      "java": "int solve(String[] tokens) {\n    Deque<Integer> st = new ArrayDeque<>();\n    for (String t : tokens) {\n        if (t.equals(\"+\") || t.equals(\"-\") || t.equals(\"*\") || t.equals(\"/\")) {\n            int b = st.pop(), a = st.pop();\n            if (t.equals(\"+\")) st.push(a + b);\n            else if (t.equals(\"-\")) st.push(a - b);\n            else if (t.equals(\"*\")) st.push(a * b);\n            else st.push(a / b);\n        } else st.push(Integer.parseInt(t));\n    }\n    return st.peek();\n}",
      "cpp": "int solve(vector<string>& tokens) {\n    stack<int> st;\n    for (auto &t : tokens) {\n        if (t == \"+\" || t == \"-\" || t == \"*\" || t == \"/\") {\n            int b = st.top(); st.pop();\n            int a = st.top(); st.pop();\n            if (t == \"+\") st.push(a + b);\n            else if (t == \"-\") st.push(a - b);\n            else if (t == \"*\") st.push(a * b);\n            else st.push(a / b);\n        } else st.push(stoi(t));\n    }\n    return st.top();\n}"
    },
    "leetcodeSlug": "daily-temperatures",
    "track": "extra"
  },
  {
    "id": "q052",
    "topicId": "ch10_monotonic",
    "type": "multiple_choice",
    "question": "【柱状图最大矩形】 经典解法是？",
    "options": [
      "单调栈求左右边界",
      "双指针夹逼",
      "哈希计数",
      "前缀和"
    ],
    "correctIndex": 0,
    "explanation": "栈维护递增高度。",
    "xp": 12,
    "learning": {
      "pattern": "栈队列模型（后进先出/先进先出）",
      "coreQuestion": "当前元素与之前元素是什么“最近关系”？",
      "framework": "若关心最近更大/更小，优先考虑单调栈；若按层推进，优先队列。",
      "steps": [
        "确认需要“最近关系”还是“层序关系”",
        "定义栈/队列中保存值还是下标",
        "入结构前清理不合法元素"
      ],
      "pitfalls": [
        "把值和下标混用",
        "忘记弹出过期元素",
        "单调性方向写反"
      ],
      "complexity": "均摊时间通常 O(n)。",
      "template": "先定义栈顶或队头的语义（最近匹配/单调性/最早入队）。\n入栈入队前先弹出失效元素，再执行当前更新。",
      "insight": "单调栈与队列的本质是“延迟结算”，在触发条件出现时一次性处理历史元素。"
    },
    "description": "本题对应《柱状图最大矩形》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 stack_queue 相关方法中完成复杂度优化。",
    "codeSnippet": {
      "python": "def largestRectangleArea(heights):\n    st = []\n    ans = 0\n    heights.append(0)\n    for i, h in enumerate(heights):\n        while st and heights[st[-1]] > h:\n            height = heights[st.pop()]\n            left = st[-1] + 1 if st else 0\n            width = i - left\n            ans = max(ans, height * width)\n        st.append(i)\n    heights.pop()\n    return ans\n",
      "java": "public int largestRectangleArea(int[] heights) {\n    Deque<Integer> st = new ArrayDeque<>();\n    int n = heights.length;\n    int ans = 0;\n    for (int i = 0; i <= n; i++) {\n        int h = (i == n) ? 0 : heights[i];\n        while (!st.isEmpty() && heights[st.peek()] > h) {\n            int height = heights[st.pop()];\n            int left = st.isEmpty() ? 0 : st.peek() + 1;\n            int width = i - left;\n            ans = Math.max(ans, height * width);\n        }\n        st.push(i);\n    }\n    return ans;\n}\n",
      "cpp": "int largestRectangleArea(vector<int>& heights) {\n    vector<int> st;\n    int ans = 0;\n    heights.push_back(0);\n    for (int i = 0; i < (int)heights.size(); i++) {\n        while (!st.empty() && heights[st.back()] > heights[i]) {\n            int height = heights[st.back()];\n            st.pop_back();\n            int left = st.empty() ? 0 : st.back() + 1;\n            int width = i - left;\n            ans = max(ans, height * width);\n        }\n        st.push_back(i);\n    }\n    heights.pop_back();\n    return ans;\n}\n"
    },
    "leetcodeSlug": "largest-rectangle-in-histogram",
    "handbookRef": {
      "leetcodeId": 84,
      "chapter": "第十章：单调栈与单调队列",
      "section": "10.1 单调栈",
      "orderInSection": 2,
      "mdLine": 1273
    },
    "track": "core"
  },
  {
    "id": "q053",
    "topicId": "ch10_monotonic",
    "type": "multiple_choice",
    "question": "【逆波兰表达式求值】 遇到运算符时应？",
    "options": [
      "弹出两个操作数计算后压回",
      "跳过",
      "清空栈",
      "入队"
    ],
    "correctIndex": 0,
    "explanation": "遵循后缀表达式规则。",
    "xp": 12,
    "learning": {
      "pattern": "栈队列模型（后进先出/先进先出）",
      "coreQuestion": "当前元素与之前元素是什么“最近关系”？",
      "framework": "若关心最近更大/更小，优先考虑单调栈；若按层推进，优先队列。",
      "steps": [
        "确认需要“最近关系”还是“层序关系”",
        "定义栈/队列中保存值还是下标",
        "入结构前清理不合法元素"
      ],
      "pitfalls": [
        "把值和下标混用",
        "忘记弹出过期元素",
        "单调性方向写反"
      ],
      "complexity": "均摊时间通常 O(n)。",
      "template": "先定义栈顶或队头的语义（最近匹配/单调性/最早入队）。\n入栈入队前先弹出失效元素，再执行当前更新。",
      "insight": "单调栈与队列的本质是“延迟结算”，在触发条件出现时一次性处理历史元素。"
    },
    "description": "本题对应《逆波兰表达式求值》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 stack_queue 相关方法中完成复杂度优化。",
    "codeSnippet": {
      "python": "def solve(tokens):\n    st = []\n    for t in tokens:\n        if t in [\"+\", \"-\", \"*\", \"/\"]:\n            b, a = st.pop(), st.pop()\n            if t == \"+\": st.append(a + b)\n            elif t == \"-\": st.append(a - b)\n            elif t == \"*\": st.append(a * b)\n            else: st.append(int(a / b))\n        else:\n            st.append(int(t))\n    return st[-1]",
      "java": "int solve(String[] tokens) {\n    Deque<Integer> st = new ArrayDeque<>();\n    for (String t : tokens) {\n        if (t.equals(\"+\") || t.equals(\"-\") || t.equals(\"*\") || t.equals(\"/\")) {\n            int b = st.pop(), a = st.pop();\n            if (t.equals(\"+\")) st.push(a + b);\n            else if (t.equals(\"-\")) st.push(a - b);\n            else if (t.equals(\"*\")) st.push(a * b);\n            else st.push(a / b);\n        } else st.push(Integer.parseInt(t));\n    }\n    return st.peek();\n}",
      "cpp": "int solve(vector<string>& tokens) {\n    stack<int> st;\n    for (auto &t : tokens) {\n        if (t == \"+\" || t == \"-\" || t == \"*\" || t == \"/\") {\n            int b = st.top(); st.pop();\n            int a = st.top(); st.pop();\n            if (t == \"+\") st.push(a + b);\n            else if (t == \"-\") st.push(a - b);\n            else if (t == \"*\") st.push(a * b);\n            else st.push(a / b);\n        } else st.push(stoi(t));\n    }\n    return st.top();\n}"
    },
    "leetcodeSlug": "evaluate-reverse-polish-notation",
    "track": "extra"
  },
  {
    "id": "q054",
    "topicId": "ch10_monotonic",
    "type": "multiple_choice",
    "question": "【字符串解码】 `3【a2【c】】` 推荐用什么实现？",
    "options": [
      "双栈或递归",
      "并查集",
      "二分查找",
      "最小堆"
    ],
    "correctIndex": 0,
    "explanation": "括号嵌套天然适合栈。",
    "xp": 12,
    "learning": {
      "pattern": "栈队列模型（后进先出/先进先出）",
      "coreQuestion": "当前元素与之前元素是什么“最近关系”？",
      "framework": "若关心最近更大/更小，优先考虑单调栈；若按层推进，优先队列。",
      "steps": [
        "确认需要“最近关系”还是“层序关系”",
        "定义栈/队列中保存值还是下标",
        "入结构前清理不合法元素"
      ],
      "pitfalls": [
        "把值和下标混用",
        "忘记弹出过期元素",
        "单调性方向写反"
      ],
      "complexity": "均摊时间通常 O(n)。",
      "template": "先定义栈顶或队头的语义（最近匹配/单调性/最早入队）。\n入栈入队前先弹出失效元素，再执行当前更新。",
      "insight": "单调栈与队列的本质是“延迟结算”，在触发条件出现时一次性处理历史元素。"
    },
    "description": "本题对应《字符串解码》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 stack_queue 相关方法中完成复杂度优化。",
    "codeSnippet": {
      "python": "def solve(tokens):\n    st = []\n    for t in tokens:\n        if t in [\"+\", \"-\", \"*\", \"/\"]:\n            b, a = st.pop(), st.pop()\n            if t == \"+\": st.append(a + b)\n            elif t == \"-\": st.append(a - b)\n            elif t == \"*\": st.append(a * b)\n            else: st.append(int(a / b))\n        else:\n            st.append(int(t))\n    return st[-1]",
      "java": "int solve(String[] tokens) {\n    Deque<Integer> st = new ArrayDeque<>();\n    for (String t : tokens) {\n        if (t.equals(\"+\") || t.equals(\"-\") || t.equals(\"*\") || t.equals(\"/\")) {\n            int b = st.pop(), a = st.pop();\n            if (t.equals(\"+\")) st.push(a + b);\n            else if (t.equals(\"-\")) st.push(a - b);\n            else if (t.equals(\"*\")) st.push(a * b);\n            else st.push(a / b);\n        } else st.push(Integer.parseInt(t));\n    }\n    return st.peek();\n}",
      "cpp": "int solve(vector<string>& tokens) {\n    stack<int> st;\n    for (auto &t : tokens) {\n        if (t == \"+\" || t == \"-\" || t == \"*\" || t == \"/\") {\n            int b = st.top(); st.pop();\n            int a = st.top(); st.pop();\n            if (t == \"+\") st.push(a + b);\n            else if (t == \"-\") st.push(a - b);\n            else if (t == \"*\") st.push(a * b);\n            else st.push(a / b);\n        } else st.push(stoi(t));\n    }\n    return st.top();\n}"
    },
    "leetcodeSlug": "decode-string",
    "track": "extra"
  },
  {
    "id": "q055",
    "topicId": "ch10_monotonic",
    "type": "multiple_choice",
    "question": "【滑动窗口最大值】 O(n) 解法常用？",
    "options": [
      "单调队列",
      "最小堆",
      "哈希表",
      "并查集"
    ],
    "correctIndex": 0,
    "explanation": "队列头始终是当前窗口最大值下标。",
    "xp": 12,
    "learning": {
      "pattern": "栈队列模型（后进先出/先进先出）",
      "coreQuestion": "当前元素与之前元素是什么“最近关系”？",
      "framework": "若关心最近更大/更小，优先考虑单调栈；若按层推进，优先队列。",
      "steps": [
        "确认需要“最近关系”还是“层序关系”",
        "定义栈/队列中保存值还是下标",
        "入结构前清理不合法元素"
      ],
      "pitfalls": [
        "把值和下标混用",
        "忘记弹出过期元素",
        "单调性方向写反"
      ],
      "complexity": "均摊时间通常 O(n)。",
      "template": "先定义栈顶或队头的语义（最近匹配/单调性/最早入队）。\n入栈入队前先弹出失效元素，再执行当前更新。",
      "insight": "单调栈与队列的本质是“延迟结算”，在触发条件出现时一次性处理历史元素。"
    },
    "description": "本题对应《滑动窗口最大值》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 stack_queue 相关方法中完成复杂度优化。",
    "codeSnippet": {
      "python": "from collections import deque\ndef maxSlidingWindow(nums, k):\n    dq = deque()\n    ans = []\n    for i, x in enumerate(nums):\n        while dq and dq[0] <= i - k: dq.popleft()\n        while dq and nums[dq[-1]] <= x: dq.pop()\n        dq.append(i)\n        if i >= k - 1: ans.append(nums[dq[0]])\n    return ans",
      "java": "public int[] maxSlidingWindow(int[] nums, int k) {\n    Deque<Integer> dq = new ArrayDeque<>();\n    int[] ans = new int[nums.length - k + 1];\n    for (int i = 0; i < nums.length; i++) {\n        while (!dq.isEmpty() && dq.peekFirst() <= i - k) dq.pollFirst();\n        while (!dq.isEmpty() && nums[dq.peekLast()] <= nums[i]) dq.pollLast();\n        dq.offerLast(i);\n        if (i >= k - 1) ans[i - k + 1] = nums[dq.peekFirst()];\n    }\n    return ans;\n}",
      "cpp": "vector<int> maxSlidingWindow(vector<int>& nums, int k) {\n    deque<int> dq;\n    vector<int> ans;\n    for (int i = 0; i < (int)nums.size(); i++) {\n        while (!dq.empty() && dq.front() <= i - k) dq.pop_front();\n        while (!dq.empty() && nums[dq.back()] <= nums[i]) dq.pop_back();\n        dq.push_back(i);\n        if (i >= k - 1) ans.push_back(nums[dq.front()]);\n    }\n    return ans;\n}"
    },
    "leetcodeSlug": "sliding-window-maximum",
    "track": "extra"
  },
  {
    "id": "q056",
    "topicId": "ch10_monotonic",
    "type": "multiple_choice",
    "question": "【实现队列用栈】 摊还 O(1) 的关键是？",
    "options": [
      "只在需要时把输入栈倒到输出栈",
      "每次操作都全倒",
      "保持两个队列",
      "随机弹出"
    ],
    "correctIndex": 0,
    "explanation": "每个元素最多搬运一次。",
    "xp": 12,
    "learning": {
      "pattern": "栈队列模型（后进先出/先进先出）",
      "coreQuestion": "当前元素与之前元素是什么“最近关系”？",
      "framework": "若关心最近更大/更小，优先考虑单调栈；若按层推进，优先队列。",
      "steps": [
        "确认需要“最近关系”还是“层序关系”",
        "定义栈/队列中保存值还是下标",
        "入结构前清理不合法元素"
      ],
      "pitfalls": [
        "把值和下标混用",
        "忘记弹出过期元素",
        "单调性方向写反"
      ],
      "complexity": "均摊时间通常 O(n)。",
      "template": "先定义栈顶或队头的语义（最近匹配/单调性/最早入队）。\n入栈入队前先弹出失效元素，再执行当前更新。",
      "insight": "单调栈与队列的本质是“延迟结算”，在触发条件出现时一次性处理历史元素。"
    },
    "description": "本题对应《实现队列用栈》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 stack_queue 相关方法中完成复杂度优化。",
    "codeSnippet": {
      "python": "def solve(tokens):\n    st = []\n    for t in tokens:\n        if t in [\"+\", \"-\", \"*\", \"/\"]:\n            b, a = st.pop(), st.pop()\n            if t == \"+\": st.append(a + b)\n            elif t == \"-\": st.append(a - b)\n            elif t == \"*\": st.append(a * b)\n            else: st.append(int(a / b))\n        else:\n            st.append(int(t))\n    return st[-1]",
      "java": "int solve(String[] tokens) {\n    Deque<Integer> st = new ArrayDeque<>();\n    for (String t : tokens) {\n        if (t.equals(\"+\") || t.equals(\"-\") || t.equals(\"*\") || t.equals(\"/\")) {\n            int b = st.pop(), a = st.pop();\n            if (t.equals(\"+\")) st.push(a + b);\n            else if (t.equals(\"-\")) st.push(a - b);\n            else if (t.equals(\"*\")) st.push(a * b);\n            else st.push(a / b);\n        } else st.push(Integer.parseInt(t));\n    }\n    return st.peek();\n}",
      "cpp": "int solve(vector<string>& tokens) {\n    stack<int> st;\n    for (auto &t : tokens) {\n        if (t == \"+\" || t == \"-\" || t == \"*\" || t == \"/\") {\n            int b = st.top(); st.pop();\n            int a = st.top(); st.pop();\n            if (t == \"+\") st.push(a + b);\n            else if (t == \"-\") st.push(a - b);\n            else if (t == \"*\") st.push(a * b);\n            else st.push(a / b);\n        } else st.push(stoi(t));\n    }\n    return st.top();\n}"
    },
    "leetcodeSlug": "implement-queue-using-stacks",
    "track": "extra"
  },
  {
    "id": "q057",
    "topicId": "ch03_binary_search",
    "type": "multiple_choice",
    "question": "【二分查找】 mid 的安全写法是？",
    "options": [
      "l + (r - l) / 2",
      "(l + r) / 2 永远安全",
      "l + r + 1",
      "(l-r)/2"
    ],
    "correctIndex": 0,
    "explanation": "防止整型溢出。",
    "xp": 13,
    "codeSnippet": {
      "python": "def search(nums, target):\n    l, r = 0, len(nums) - 1\n    while l <= r:\n        mid = l + (r - l) // 2\n        if nums[mid] == target: return mid\n        if nums[mid] < target: l = mid + 1\n        else: r = mid - 1\n    return -1",
      "java": "public int search(int[] nums, int target) {\n    int l = 0, r = nums.length - 1;\n    while (l <= r) {\n        int mid = l + (r - l) / 2;\n        if (nums[mid] == target) return mid;\n        if (nums[mid] < target) l = mid + 1;\n        else r = mid - 1;\n    }\n    return -1;\n}",
      "cpp": "int search(vector<int>& nums, int target) {\n    int l = 0, r = nums.size() - 1;\n    while (l <= r) {\n        int mid = l + (r - l) / 2;\n        if (nums[mid] == target) return mid;\n        if (nums[mid] < target) l = mid + 1;\n        else r = mid - 1;\n    }\n    return -1;\n}"
    },
    "learning": {
      "pattern": "二分查找边界模板（左闭右闭或左闭右开）",
      "coreQuestion": "mid 命中时返回，否则如何安全缩区间？",
      "framework": "将问题转成单调判定函数，用区间不变量维护答案边界。",
      "steps": [
        "使用 mid=l+(r-l)//2 防溢出",
        "nums[mid] < target 时移动左边界",
        "否则移动右边界"
      ],
      "pitfalls": [
        "l/r 更新错导致死循环"
      ],
      "complexity": "时间 O(log n)，空间 O(1)。",
      "template": "int left = 0, right = nums.length - 1;\nwhile (left <= right) {\n    int mid = left + (right - left) / 2;\n    if (nums[mid] == target) return mid;\n    if (nums[mid] < target) left = mid + 1;\n    else right = mid - 1;\n}",
      "insight": "二分搜索最容易错在边界。记住：搜索区间是 [left, right] 还是 [left, right)？这决定了 while 条件和 left/right 的更新逻辑。"
    },
    "description": "给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。",
    "leetcodeSlug": "binary-search",
    "handbookRef": {
      "leetcodeId": 704,
      "chapter": "第三章：二分搜索",
      "section": "3.1 二分搜索核心模板",
      "orderInSection": 1,
      "mdLine": 428
    },
    "track": "core"
  },
  {
    "id": "q058",
    "topicId": "ch03_binary_search",
    "type": "multiple_choice",
    "question": "【搜索旋转排序数组】 如何判断有序半边？",
    "options": [
      "比较 nums[l] 与 nums[mid]",
      "比较 nums[mid] 与 target",
      "比较 nums[r] 与 target",
      "随机判断"
    ],
    "correctIndex": 0,
    "explanation": "一侧一定有序，再判断 target 是否落入。",
    "xp": 12,
    "learning": {
      "pattern": "二分查找边界模板（左闭右闭或左闭右开）",
      "coreQuestion": "你在找“某值”，还是找“第一个满足条件的位置”？",
      "framework": "将问题转成单调判定函数，用区间不变量维护答案边界。",
      "steps": [
        "定义区间是闭区间还是左闭右开",
        "写判定函数 check(mid)",
        "根据 check 结果收缩边界"
      ],
      "pitfalls": [
        "mid 计算溢出",
        "左右边界更新方向反了",
        "循环结束条件与返回值不匹配"
      ],
      "complexity": "时间 O(log n)，空间 O(1)。",
      "template": "int left = 0, right = nums.length - 1;\nwhile (left <= right) {\n    int mid = left + (right - left) / 2;\n    if (nums[mid] == target) return mid;\n    if (nums[mid] < target) left = mid + 1;\n    else right = mid - 1;\n}",
      "insight": "二分搜索最容易错在边界。记住：搜索区间是 [left, right] 还是 [left, right)？这决定了 while 条件和 left/right 的更新逻辑。"
    },
    "description": "本题对应《搜索旋转排序数组》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 binary_search 相关方法中完成复杂度优化。",
    "codeSnippet": {
      "python": "def search(nums, target):\n    left, right = 0, len(nums) - 1\n    while left <= right:\n        mid = left + (right - left) // 2\n        if nums[mid] == target: return mid\n        if nums[left] <= nums[mid]:\n            if nums[left] <= target < nums[mid]:\n                right = mid - 1\n            else:\n                left = mid + 1\n        else:\n            if nums[mid] < target <= nums[right]:\n                left = mid + 1\n            else:\n                right = mid - 1\n    return -1",
      "java": "public int search(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (nums[mid] == target) return mid;\n        if (nums[left] <= nums[mid]) {\n            if (nums[left] <= target && target < nums[mid]) right = mid - 1;\n            else left = mid + 1;\n        } else {\n            if (nums[mid] < target && target <= nums[right]) left = mid + 1;\n            else right = mid - 1;\n        }\n    }\n    return -1;\n}",
      "cpp": "int search(vector<int>& nums, int target) {\n    int left = 0, right = (int)nums.size() - 1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (nums[mid] == target) return mid;\n        if (nums[left] <= nums[mid]) {\n            if (nums[left] <= target && target < nums[mid]) right = mid - 1;\n            else left = mid + 1;\n        } else {\n            if (nums[mid] < target && target <= nums[right]) left = mid + 1;\n            else right = mid - 1;\n        }\n    }\n    return -1;\n}"
    },
    "leetcodeSlug": "search-in-rotated-sorted-array",
    "handbookRef": {
      "leetcodeId": 33,
      "chapter": "第三章：二分搜索",
      "section": "3.1 二分搜索核心模板",
      "orderInSection": 3,
      "mdLine": 481
    },
    "track": "core"
  },
  {
    "id": "q059",
    "topicId": "ch03_binary_search",
    "type": "multiple_choice",
    "question": "【寻找峰值】 为什么可用二分？",
    "options": [
      "根据 mid 与 mid+1 的趋势能确定峰值所在侧",
      "数组有序",
      "值唯一",
      "只需一次比较"
    ],
    "correctIndex": 0,
    "explanation": "斜率方向可指导搜索区间。",
    "xp": 12,
    "learning": {
      "pattern": "二分查找边界模板（左闭右闭或左闭右开）",
      "coreQuestion": "你在找“某值”，还是找“第一个满足条件的位置”？",
      "framework": "将问题转成单调判定函数，用区间不变量维护答案边界。",
      "steps": [
        "定义区间是闭区间还是左闭右开",
        "写判定函数 check(mid)",
        "根据 check 结果收缩边界"
      ],
      "pitfalls": [
        "mid 计算溢出",
        "左右边界更新方向反了",
        "循环结束条件与返回值不匹配"
      ],
      "complexity": "时间 O(log n)，空间 O(1)。",
      "template": "int left = 0, right = nums.length - 1;\nwhile (left <= right) {\n    int mid = left + (right - left) / 2;\n    if (nums[mid] == target) return mid;\n    if (nums[mid] < target) left = mid + 1;\n    else right = mid - 1;\n}",
      "insight": "二分搜索最容易错在边界。记住：搜索区间是 [left, right] 还是 [left, right)？这决定了 while 条件和 left/right 的更新逻辑。"
    },
    "description": "本题对应《寻找峰值》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 binary_search 相关方法中完成复杂度优化。",
    "codeSnippet": {
      "python": "def findPeakElement(nums):\n    left, right = 0, len(nums) - 1\n    while left < right:\n        mid = left + (right - left) // 2\n        if nums[mid] > nums[mid + 1]:\n            right = mid\n        else:\n            left = mid + 1\n    return left",
      "java": "public int findPeakElement(int[] nums) {\n    int left = 0, right = nums.length - 1;\n    while (left < right) {\n        int mid = left + (right - left) / 2;\n        if (nums[mid] > nums[mid + 1]) right = mid;\n        else left = mid + 1;\n    }\n    return left;\n}",
      "cpp": "int findPeakElement(vector<int>& nums) {\n    int left = 0, right = (int)nums.size() - 1;\n    while (left < right) {\n        int mid = left + (right - left) / 2;\n        if (nums[mid] > nums[mid + 1]) right = mid;\n        else left = mid + 1;\n    }\n    return left;\n}"
    },
    "leetcodeSlug": "find-peak-element",
    "track": "extra"
  },
  {
    "id": "q060",
    "topicId": "ch03_binary_search",
    "type": "multiple_choice",
    "question": "【在排序数组中查找元素首尾位置】 常见做法是？",
    "options": [
      "两次二分找左边界和右边界",
      "一次二分即可",
      "哈希统计",
      "线性扫描"
    ],
    "correctIndex": 0,
    "explanation": "lower_bound 与 upper_bound 思路。",
    "xp": 12,
    "learning": {
      "pattern": "二分查找边界模板（左闭右闭或左闭右开）",
      "coreQuestion": "你在找“某值”，还是找“第一个满足条件的位置”？",
      "framework": "将问题转成单调判定函数，用区间不变量维护答案边界。",
      "steps": [
        "定义区间是闭区间还是左闭右开",
        "写判定函数 check(mid)",
        "根据 check 结果收缩边界"
      ],
      "pitfalls": [
        "mid 计算溢出",
        "左右边界更新方向反了",
        "循环结束条件与返回值不匹配"
      ],
      "complexity": "时间 O(log n)，空间 O(1)。",
      "template": "int left = 0, right = nums.length - 1;\nwhile (left <= right) {\n    int mid = left + (right - left) / 2;\n    if (nums[mid] == target) return mid;\n    if (nums[mid] < target) left = mid + 1;\n    else right = mid - 1;\n}",
      "insight": "二分搜索最容易错在边界。记住：搜索区间是 [left, right] 还是 [left, right)？这决定了 while 条件和 left/right 的更新逻辑。"
    },
    "description": "本题对应《在排序数组中查找元素首尾位置》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 binary_search 相关方法中完成复杂度优化。",
    "codeSnippet": {
      "python": "def solve(nums, target):\n    l, r = 0, len(nums) - 1\n    while l <= r:\n        m = l + (r - l) // 2\n        if nums[m] == target: return m\n        if nums[m] < target: l = m + 1\n        else: r = m - 1\n    return -1",
      "java": "int solve(int[] nums, int target) {\n    int l = 0, r = nums.length - 1;\n    while (l <= r) {\n        int m = l + (r - l) / 2;\n        if (nums[m] == target) return m;\n        if (nums[m] < target) l = m + 1;\n        else r = m - 1;\n    }\n    return -1;\n}",
      "cpp": "int solve(vector<int>& nums, int target) {\n    int l = 0, r = (int)nums.size() - 1;\n    while (l <= r) {\n        int m = l + (r - l) / 2;\n        if (nums[m] == target) return m;\n        if (nums[m] < target) l = m + 1;\n        else r = m - 1;\n    }\n    return -1;\n}"
    },
    "leetcodeSlug": "find-first-and-last-position-of-element-in-sorted-array",
    "track": "extra"
  },
  {
    "id": "q061",
    "topicId": "ch03_binary_search",
    "type": "multiple_choice",
    "question": "【x 的平方根】 二分答案空间时判定条件是？",
    "options": [
      "mid*mid <= x",
      "mid <= x",
      "mid+x <= x",
      "mid-mid <= x"
    ],
    "correctIndex": 0,
    "explanation": "找满足条件的最大 mid。",
    "xp": 12,
    "learning": {
      "pattern": "二分查找边界模板（左闭右闭或左闭右开）",
      "coreQuestion": "你在找“某值”，还是找“第一个满足条件的位置”？",
      "framework": "将问题转成单调判定函数，用区间不变量维护答案边界。",
      "steps": [
        "定义区间是闭区间还是左闭右开",
        "写判定函数 check(mid)",
        "根据 check 结果收缩边界"
      ],
      "pitfalls": [
        "mid 计算溢出",
        "左右边界更新方向反了",
        "循环结束条件与返回值不匹配"
      ],
      "complexity": "时间 O(log n)，空间 O(1)。",
      "template": "int left = 0, right = nums.length - 1;\nwhile (left <= right) {\n    int mid = left + (right - left) / 2;\n    if (nums[mid] == target) return mid;\n    if (nums[mid] < target) left = mid + 1;\n    else right = mid - 1;\n}",
      "insight": "二分搜索最容易错在边界。记住：搜索区间是 [left, right] 还是 [left, right)？这决定了 while 条件和 left/right 的更新逻辑。"
    },
    "description": "本题对应《x 的平方根》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 binary_search 相关方法中完成复杂度优化。",
    "codeSnippet": {
      "python": "def mySqrt(x):\n    left, right = 0, x\n    while left <= right:\n        mid = left + (right - left) // 2\n        if mid * mid <= x:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return right",
      "java": "public int mySqrt(int x) {\n    long left = 0, right = x;\n    while (left <= right) {\n        long mid = left + (right - left) / 2;\n        if (mid * mid <= x) left = mid + 1;\n        else right = mid - 1;\n    }\n    return (int) right;\n}",
      "cpp": "int mySqrt(int x) {\n    long long left = 0, right = x;\n    while (left <= right) {\n        long long mid = left + (right - left) / 2;\n        if (mid * mid <= x) left = mid + 1;\n        else right = mid - 1;\n    }\n    return (int) right;\n}"
    },
    "leetcodeSlug": "sqrtx",
    "track": "extra"
  },
  {
    "id": "q062",
    "topicId": "ch03_binary_search",
    "type": "multiple_choice",
    "question": "【寻找旋转数组最小值】 判断依据是？",
    "options": [
      "nums[mid] 与 nums[r] 比较",
      "nums[mid] 与 nums[l] 比较即可",
      "target 比较",
      "长度比较"
    ],
    "correctIndex": 0,
    "explanation": "与右端比较可判断最小值在哪半边。",
    "xp": 12,
    "learning": {
      "pattern": "二分查找边界模板（左闭右闭或左闭右开）",
      "coreQuestion": "你在找“某值”，还是找“第一个满足条件的位置”？",
      "framework": "将问题转成单调判定函数，用区间不变量维护答案边界。",
      "steps": [
        "定义区间是闭区间还是左闭右开",
        "写判定函数 check(mid)",
        "根据 check 结果收缩边界"
      ],
      "pitfalls": [
        "mid 计算溢出",
        "左右边界更新方向反了",
        "循环结束条件与返回值不匹配"
      ],
      "complexity": "时间 O(log n)，空间 O(1)。",
      "template": "int left = 0, right = nums.length - 1;\nwhile (left <= right) {\n    int mid = left + (right - left) / 2;\n    if (nums[mid] == target) return mid;\n    if (nums[mid] < target) left = mid + 1;\n    else right = mid - 1;\n}",
      "insight": "二分搜索最容易错在边界。记住：搜索区间是 [left, right] 还是 [left, right)？这决定了 while 条件和 left/right 的更新逻辑。"
    },
    "description": "本题对应《寻找旋转数组最小值》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 binary_search 相关方法中完成复杂度优化。",
    "codeSnippet": {
      "python": "def findMin(nums):\n    l, r = 0, len(nums) - 1\n    while l < r:\n        mid = (l + r) // 2\n        if nums[mid] > nums[r]:\n            l = mid + 1\n        else:\n            r = mid\n    return nums[l]\n",
      "java": "public int findMin(int[] nums) {\n    int l = 0, r = nums.length - 1;\n    while (l < r) {\n        int mid = l + (r - l) / 2;\n        if (nums[mid] > nums[r]) l = mid + 1;\n        else r = mid;\n    }\n    return nums[l];\n}\n",
      "cpp": "int findMin(vector<int>& nums) {\n    int l=0, r=(int)nums.size()-1;\n    while (l<r) {\n        int mid = l + (r-l)/2;\n        if (nums[mid] > nums[r]) l = mid + 1;\n        else r = mid;\n    }\n    return nums[l];\n}\n"
    },
    "leetcodeSlug": "find-minimum-in-rotated-sorted-array",
    "handbookRef": {
      "leetcodeId": 153,
      "chapter": "第三章：二分搜索",
      "section": "3.1 二分搜索核心模板",
      "orderInSection": 4,
      "mdLine": 516
    },
    "track": "core"
  },
  {
    "id": "q063",
    "topicId": "ch03_binary_search",
    "type": "multiple_choice",
    "question": "【Koko 吃香蕉】 本质是什么？",
    "options": [
      "最小可行速度的答案二分",
      "排序问题",
      "图最短路",
      "滑动窗口"
    ],
    "correctIndex": 0,
    "explanation": "速度越大耗时越短，具有单调性。",
    "xp": 12,
    "learning": {
      "pattern": "二分查找边界模板（左闭右闭或左闭右开）",
      "coreQuestion": "你在找“某值”，还是找“第一个满足条件的位置”？",
      "framework": "将问题转成单调判定函数，用区间不变量维护答案边界。",
      "steps": [
        "定义区间是闭区间还是左闭右开",
        "写判定函数 check(mid)",
        "根据 check 结果收缩边界"
      ],
      "pitfalls": [
        "mid 计算溢出",
        "左右边界更新方向反了",
        "循环结束条件与返回值不匹配"
      ],
      "complexity": "时间 O(log n)，空间 O(1)。",
      "template": "int left = 0, right = nums.length - 1;\nwhile (left <= right) {\n    int mid = left + (right - left) / 2;\n    if (nums[mid] == target) return mid;\n    if (nums[mid] < target) left = mid + 1;\n    else right = mid - 1;\n}",
      "insight": "二分搜索最容易错在边界。记住：搜索区间是 [left, right] 还是 [left, right)？这决定了 while 条件和 left/right 的更新逻辑。"
    },
    "description": "本题对应《Koko 吃香蕉》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 binary_search 相关方法中完成复杂度优化。",
    "codeSnippet": {
      "python": "def minEatingSpeed(piles, h):\n    left, right = 1, max(piles)\n    while left < right:\n        mid = left + (right - left) // 2\n        hours = sum((p + mid - 1) // mid for p in piles)\n        if hours <= h:\n            right = mid\n        else:\n            left = mid + 1\n    return left",
      "java": "public int minEatingSpeed(int[] piles, int h) {\n    int left = 1, right = Arrays.stream(piles).max().getAsInt();\n    while (left < right) {\n        int mid = left + (right - left) / 2;\n        long hours = 0;\n        for (int p : piles) hours += (p + mid - 1) / mid;\n        if (hours <= h) right = mid;\n        else left = mid + 1;\n    }\n    return left;\n}",
      "cpp": "int minEatingSpeed(vector<int>& piles, int h) {\n    int left = 1, right = *max_element(piles.begin(), piles.end());\n    while (left < right) {\n        int mid = left + (right - left) / 2;\n        long long hours = 0;\n        for (int p : piles) hours += (p + mid - 1) / mid;\n        if (hours <= h) right = mid;\n        else left = mid + 1;\n    }\n    return left;\n}"
    },
    "leetcodeSlug": "koko-eating-bananas",
    "track": "extra"
  },
  {
    "id": "q064",
    "topicId": "ch03_binary_search",
    "type": "multiple_choice",
    "question": "【搜索二维矩阵】 若矩阵行首递增可视作？",
    "options": [
      "一维有序数组",
      "二叉树",
      "图",
      "链表"
    ],
    "correctIndex": 0,
    "explanation": "用下标映射 row/col 即可二分。",
    "xp": 12,
    "learning": {
      "pattern": "二分查找边界模板（左闭右闭或左闭右开）",
      "coreQuestion": "你在找“某值”，还是找“第一个满足条件的位置”？",
      "framework": "将问题转成单调判定函数，用区间不变量维护答案边界。",
      "steps": [
        "定义区间是闭区间还是左闭右开",
        "写判定函数 check(mid)",
        "根据 check 结果收缩边界"
      ],
      "pitfalls": [
        "mid 计算溢出",
        "左右边界更新方向反了",
        "循环结束条件与返回值不匹配"
      ],
      "complexity": "时间 O(log n)，空间 O(1)。",
      "template": "int left = 0, right = nums.length - 1;\nwhile (left <= right) {\n    int mid = left + (right - left) / 2;\n    if (nums[mid] == target) return mid;\n    if (nums[mid] < target) left = mid + 1;\n    else right = mid - 1;\n}",
      "insight": "二分搜索最容易错在边界。记住：搜索区间是 [left, right] 还是 [left, right)？这决定了 while 条件和 left/right 的更新逻辑。"
    },
    "description": "本题对应《搜索二维矩阵》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 binary_search 相关方法中完成复杂度优化。",
    "codeSnippet": {
      "python": "def searchMatrix(matrix, target):\n    m, n = len(matrix), len(matrix[0])\n    left, right = 0, m * n - 1\n    while left <= right:\n        mid = left + (right - left) // 2\n        v = matrix[mid // n][mid % n]\n        if v == target: return True\n        if v < target: left = mid + 1\n        else: right = mid - 1\n    return False",
      "java": "public boolean searchMatrix(int[][] matrix, int target) {\n    int m = matrix.length, n = matrix[0].length;\n    int left = 0, right = m * n - 1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        int v = matrix[mid / n][mid % n];\n        if (v == target) return true;\n        if (v < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return false;\n}",
      "cpp": "bool searchMatrix(vector<vector<int>>& matrix, int target) {\n    int m = matrix.size(), n = matrix[0].size();\n    int left = 0, right = m * n - 1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        int v = matrix[mid / n][mid % n];\n        if (v == target) return true;\n        if (v < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return false;\n}"
    },
    "leetcodeSlug": "search-a-2d-matrix",
    "track": "extra"
  },
  {
    "id": "q065",
    "topicId": "ch08_trees",
    "type": "multiple_choice",
    "question": "【二叉树层序遍历】 典型结构是？",
    "options": [
      "队列 BFS",
      "栈 DFS",
      "哈希",
      "堆"
    ],
    "correctIndex": 0,
    "explanation": "按层推进天然使用队列。",
    "xp": 14,
    "codeSnippet": {
      "python": "def dfs(root):\n    if not root: return 0\n    left = dfs(root.left)\n    right = dfs(root.right)\n    return 1 + max(left, right)",
      "java": "int dfs(TreeNode root) {\n    if (root == null) return 0;\n    int left = dfs(root.left);\n    int right = dfs(root.right);\n    return 1 + Math.max(left, right);\n}",
      "cpp": "int dfs(TreeNode* root) {\n    if (!root) return 0;\n    int left = dfs(root->left);\n    int right = dfs(root->right);\n    return 1 + max(left, right);\n}"
    },
    "learning": {
      "pattern": "二叉树递归框架（遍历视角）",
      "coreQuestion": "这题是“遍历每个节点做事”还是“子树返回结果”？",
      "framework": "先定义递归函数含义，再选择前/中/后序位置放逻辑。",
      "steps": [
        "明确函数返回值语义",
        "写出 base case",
        "在递归三位置放入业务逻辑"
      ],
      "pitfalls": [
        "遍历视角和分解视角混淆",
        "遗漏空节点判断",
        "全局变量未正确回溯"
      ],
      "complexity": "多数题时间 O(n)，递归栈 O(h)。",
      "template": "void traverse(TreeNode root) {\n    // 前序位置\n    traverse(root.left);\n    // 中序位置\n    traverse(root.right);\n    // 后序位置\n}",
      "insight": "二叉树的所有问题，本质上只有两种思维：‘遍历’一遍二叉树得到答案，或者‘分解’问题通过子树结果推导答案。位置的选择至关重要。"
    },
    "description": "给你二叉树的根节点 root ，返回其节点值的层序遍历。（即逐层地，从左到右访问所有节点）。",
    "leetcodeSlug": "binary-tree-level-order-traversal",
    "track": "extra"
  },
  {
    "id": "q066",
    "topicId": "ch08_trees",
    "type": "multiple_choice",
    "question": "【验证二叉搜索树】 递归法常用约束是？",
    "options": [
      "节点值在 (low, high) 开区间",
      "只比较父节点",
      "只比较叶子",
      "中序长度"
    ],
    "correctIndex": 0,
    "explanation": "BST 每个子树都有全局上下界。",
    "xp": 12,
    "learning": {
      "pattern": "二叉树递归框架（遍历视角）",
      "coreQuestion": "这题是“遍历每个节点做事”还是“子树返回结果”？",
      "framework": "先定义递归函数含义，再选择前/中/后序位置放逻辑。",
      "steps": [
        "明确函数返回值语义",
        "写出 base case",
        "在递归三位置放入业务逻辑"
      ],
      "pitfalls": [
        "遍历视角和分解视角混淆",
        "遗漏空节点判断",
        "全局变量未正确回溯"
      ],
      "complexity": "多数题时间 O(n)，递归栈 O(h)。",
      "template": "void traverse(TreeNode root) {\n    // 前序位置\n    traverse(root.left);\n    // 中序位置\n    traverse(root.right);\n    // 后序位置\n}",
      "insight": "二叉树的所有问题，本质上只有两种思维：‘遍历’一遍二叉树得到答案，或者‘分解’问题通过子树结果推导答案。位置的选择至关重要。"
    },
    "description": "给你一个二叉树的根节点 root ，判断其是否是一个有效的二叉搜索树。",
    "codeSnippet": {
      "python": "def isValidBST(root):\n    prev = None\n    def inorder(node):\n        nonlocal prev\n        if not node: return True\n        if not inorder(node.left): return False\n        if prev is not None and node.val <= prev: return False\n        prev = node.val\n        return inorder(node.right)\n    return inorder(root)\n",
      "java": "public boolean isValidBST(TreeNode root) {\n    return inorder(root, new long[]{Long.MIN_VALUE});\n}\nprivate boolean inorder(TreeNode node, long[] prev) {\n    if (node == null) return true;\n    if (!inorder(node.left, prev)) return false;\n    if (node.val <= prev[0]) return false;\n    prev[0] = node.val;\n    return inorder(node.right, prev);\n}\n",
      "cpp": "bool isValidBST(TreeNode* root) {\n    long long prev = LLONG_MIN;\n    function<bool(TreeNode*)> dfs = [&](TreeNode* node){\n        if (!node) return true;\n        if (!dfs(node->left)) return false;\n        if ((long long)node->val <= prev) return false;\n        prev = node->val;\n        return dfs(node->right);\n    };\n    return dfs(root);\n}\n"
    },
    "leetcodeSlug": "validate-binary-search-tree",
    "handbookRef": {
      "leetcodeId": 98,
      "chapter": "第八章：二叉树算法",
      "section": "8.2 二叉搜索树",
      "orderInSection": 1,
      "mdLine": 1094
    },
    "track": "core"
  },
  {
    "id": "q067",
    "topicId": "ch08_trees",
    "type": "multiple_choice",
    "question": "【最近公共祖先】 递归返回逻辑是？",
    "options": [
      "左右子树各命中一个则当前为 LCA",
      "谁大返回谁",
      "深度最小返回",
      "哈希计数"
    ],
    "correctIndex": 0,
    "explanation": "后序遍历汇总命中信息。",
    "xp": 12,
    "learning": {
      "pattern": "二叉树递归框架（遍历视角）",
      "coreQuestion": "这题是“遍历每个节点做事”还是“子树返回结果”？",
      "framework": "先定义递归函数含义，再选择前/中/后序位置放逻辑。",
      "steps": [
        "明确函数返回值语义",
        "写出 base case",
        "在递归三位置放入业务逻辑"
      ],
      "pitfalls": [
        "遍历视角和分解视角混淆",
        "遗漏空节点判断",
        "全局变量未正确回溯"
      ],
      "complexity": "多数题时间 O(n)，递归栈 O(h)。",
      "template": "void traverse(TreeNode root) {\n    // 前序位置\n    traverse(root.left);\n    // 中序位置\n    traverse(root.right);\n    // 后序位置\n}",
      "insight": "二叉树的所有问题，本质上只有两种思维：‘遍历’一遍二叉树得到答案，或者‘分解’问题通过子树结果推导答案。位置的选择至关重要。"
    },
    "description": "给定一个二叉树, 找到该树中两个指定节点的最近公共祖先 (LCA)。",
    "codeSnippet": {
      "python": "def dfs(root):\n    if not root: return 0\n    left = dfs(root.left)\n    right = dfs(root.right)\n    return 1 + max(left, right)",
      "java": "int dfs(TreeNode root) {\n    if (root == null) return 0;\n    int left = dfs(root.left);\n    int right = dfs(root.right);\n    return 1 + Math.max(left, right);\n}",
      "cpp": "int dfs(TreeNode* root) {\n    if (!root) return 0;\n    int left = dfs(root->left);\n    int right = dfs(root->right);\n    return 1 + max(left, right);\n}"
    },
    "leetcodeSlug": "lowest-common-ancestor-of-a-binary-tree",
    "track": "extra"
  },
  {
    "id": "q068",
    "topicId": "ch08_trees",
    "type": "multiple_choice",
    "question": "【翻转二叉树】 本质操作是？",
    "options": [
      "交换每个节点左右子树",
      "反转中序序列",
      "删除叶子",
      "按值排序"
    ],
    "correctIndex": 0,
    "explanation": "递归或迭代均可。",
    "xp": 12,
    "learning": {
      "pattern": "二叉树递归框架（遍历视角）",
      "coreQuestion": "这题是“遍历每个节点做事”还是“子树返回结果”？",
      "framework": "先定义递归函数含义，再选择前/中/后序位置放逻辑。",
      "steps": [
        "明确函数返回值语义",
        "写出 base case",
        "在递归三位置放入业务逻辑"
      ],
      "pitfalls": [
        "遍历视角和分解视角混淆",
        "遗漏空节点判断",
        "全局变量未正确回溯"
      ],
      "complexity": "多数题时间 O(n)，递归栈 O(h)。",
      "template": "void traverse(TreeNode root) {\n    // 前序位置\n    traverse(root.left);\n    // 中序位置\n    traverse(root.right);\n    // 后序位置\n}",
      "insight": "二叉树的所有问题，本质上只有两种思维：‘遍历’一遍二叉树得到答案，或者‘分解’问题通过子树结果推导答案。位置的选择至关重要。"
    },
    "description": "给你一棵二叉树的根节点 root ，翻转这棵二叉树，并返回其根节点。",
    "codeSnippet": {
      "python": "def dfs(root):\n    if not root: return 0\n    left = dfs(root.left)\n    right = dfs(root.right)\n    return 1 + max(left, right)",
      "java": "int dfs(TreeNode root) {\n    if (root == null) return 0;\n    int left = dfs(root.left);\n    int right = dfs(root.right);\n    return 1 + Math.max(left, right);\n}",
      "cpp": "int dfs(TreeNode* root) {\n    if (!root) return 0;\n    int left = dfs(root->left);\n    int right = dfs(root->right);\n    return 1 + max(left, right);\n}"
    },
    "leetcodeSlug": "invert-binary-tree",
    "track": "extra"
  },
  {
    "id": "q069",
    "topicId": "ch08_trees",
    "type": "multiple_choice",
    "question": "【路径总和】 DFS 参数常用什么？",
    "options": [
      "当前路径和",
      "节点层号",
      "队列长度",
      "父节点值"
    ],
    "correctIndex": 0,
    "explanation": "到叶子时比较目标值。",
    "xp": 12,
    "learning": {
      "pattern": "二叉树递归框架（遍历视角）",
      "coreQuestion": "这题是“遍历每个节点做事”还是“子树返回结果”？",
      "framework": "先定义递归函数含义，再选择前/中/后序位置放逻辑。",
      "steps": [
        "明确函数返回值语义",
        "写出 base case",
        "在递归三位置放入业务逻辑"
      ],
      "pitfalls": [
        "遍历视角和分解视角混淆",
        "遗漏空节点判断",
        "全局变量未正确回溯"
      ],
      "complexity": "多数题时间 O(n)，递归栈 O(h)。",
      "template": "void traverse(TreeNode root) {\n    // 前序位置\n    traverse(root.left);\n    // 中序位置\n    traverse(root.right);\n    // 后序位置\n}",
      "insight": "二叉树的所有问题，本质上只有两种思维：‘遍历’一遍二叉树得到答案，或者‘分解’问题通过子树结果推导答案。位置的选择至关重要。"
    },
    "description": "本题对应《路径总和》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 trees 相关方法中完成复杂度优化。",
    "codeSnippet": {
      "python": "def dfs(root):\n    if not root: return 0\n    left = dfs(root.left)\n    right = dfs(root.right)\n    return 1 + max(left, right)",
      "java": "int dfs(TreeNode root) {\n    if (root == null) return 0;\n    int left = dfs(root.left);\n    int right = dfs(root.right);\n    return 1 + Math.max(left, right);\n}",
      "cpp": "int dfs(TreeNode* root) {\n    if (!root) return 0;\n    int left = dfs(root->left);\n    int right = dfs(root->right);\n    return 1 + max(left, right);\n}"
    },
    "leetcodeSlug": "path-sum",
    "track": "extra"
  },
  {
    "id": "q070",
    "topicId": "ch08_trees",
    "type": "multiple_choice",
    "question": "【二叉树直径】 需要在 DFS 中维护什么？",
    "options": [
      "每个节点左右高度之和最大值",
      "节点数量",
      "层序数组",
      "叶子值"
    ],
    "correctIndex": 0,
    "explanation": "直径可能不经过根。",
    "xp": 12,
    "learning": {
      "pattern": "二叉树递归框架（遍历视角）",
      "coreQuestion": "这题是“遍历每个节点做事”还是“子树返回结果”？",
      "framework": "先定义递归函数含义，再选择前/中/后序位置放逻辑。",
      "steps": [
        "明确函数返回值语义",
        "写出 base case",
        "在递归三位置放入业务逻辑"
      ],
      "pitfalls": [
        "遍历视角和分解视角混淆",
        "遗漏空节点判断",
        "全局变量未正确回溯"
      ],
      "complexity": "多数题时间 O(n)，递归栈 O(h)。",
      "template": "void traverse(TreeNode root) {\n    // 前序位置\n    traverse(root.left);\n    // 中序位置\n    traverse(root.right);\n    // 后序位置\n}",
      "insight": "二叉树的所有问题，本质上只有两种思维：‘遍历’一遍二叉树得到答案，或者‘分解’问题通过子树结果推导答案。位置的选择至关重要。"
    },
    "description": "本题对应《二叉树直径》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 trees 相关方法中完成复杂度优化。",
    "codeSnippet": {
      "python": "def dfs(root):\n    if not root: return 0\n    left = dfs(root.left)\n    right = dfs(root.right)\n    return 1 + max(left, right)",
      "java": "int dfs(TreeNode root) {\n    if (root == null) return 0;\n    int left = dfs(root.left);\n    int right = dfs(root.right);\n    return 1 + Math.max(left, right);\n}",
      "cpp": "int dfs(TreeNode* root) {\n    if (!root) return 0;\n    int left = dfs(root->left);\n    int right = dfs(root->right);\n    return 1 + max(left, right);\n}"
    },
    "leetcodeSlug": "diameter-of-binary-tree",
    "track": "extra"
  },
  {
    "id": "q071",
    "topicId": "ch08_trees",
    "type": "multiple_choice",
    "question": "【平衡二叉树】 高效做法是？",
    "options": [
      "后序返回高度并剪枝",
      "每层都重复计算高度",
      "排序节点",
      "哈希去重"
    ],
    "correctIndex": 0,
    "explanation": "子树不平衡可提前返回。",
    "xp": 12,
    "learning": {
      "pattern": "二叉树递归框架（遍历视角）",
      "coreQuestion": "这题是“遍历每个节点做事”还是“子树返回结果”？",
      "framework": "先定义递归函数含义，再选择前/中/后序位置放逻辑。",
      "steps": [
        "明确函数返回值语义",
        "写出 base case",
        "在递归三位置放入业务逻辑"
      ],
      "pitfalls": [
        "遍历视角和分解视角混淆",
        "遗漏空节点判断",
        "全局变量未正确回溯"
      ],
      "complexity": "多数题时间 O(n)，递归栈 O(h)。",
      "template": "void traverse(TreeNode root) {\n    // 前序位置\n    traverse(root.left);\n    // 中序位置\n    traverse(root.right);\n    // 后序位置\n}",
      "insight": "二叉树的所有问题，本质上只有两种思维：‘遍历’一遍二叉树得到答案，或者‘分解’问题通过子树结果推导答案。位置的选择至关重要。"
    },
    "description": "本题对应《平衡二叉树》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 trees 相关方法中完成复杂度优化。",
    "codeSnippet": {
      "python": "def dfs(root):\n    if not root: return 0\n    left = dfs(root.left)\n    right = dfs(root.right)\n    return 1 + max(left, right)",
      "java": "int dfs(TreeNode root) {\n    if (root == null) return 0;\n    int left = dfs(root.left);\n    int right = dfs(root.right);\n    return 1 + Math.max(left, right);\n}",
      "cpp": "int dfs(TreeNode* root) {\n    if (!root) return 0;\n    int left = dfs(root->left);\n    int right = dfs(root->right);\n    return 1 + max(left, right);\n}"
    },
    "leetcodeSlug": "balanced-binary-tree",
    "track": "extra"
  },
  {
    "id": "q072",
    "topicId": "ch08_trees",
    "type": "multiple_choice",
    "question": "【二叉树最大路径和】 路径贡献如何定义？",
    "options": [
      "max(0,leftGain/rightGain)",
      "left+right 必须都取",
      "只取叶子",
      "只取根"
    ],
    "correctIndex": 0,
    "explanation": "负贡献应舍弃。",
    "xp": 12,
    "learning": {
      "pattern": "二叉树递归框架（遍历视角）",
      "coreQuestion": "这题是“遍历每个节点做事”还是“子树返回结果”？",
      "framework": "先定义递归函数含义，再选择前/中/后序位置放逻辑。",
      "steps": [
        "明确函数返回值语义",
        "写出 base case",
        "在递归三位置放入业务逻辑"
      ],
      "pitfalls": [
        "遍历视角和分解视角混淆",
        "遗漏空节点判断",
        "全局变量未正确回溯"
      ],
      "complexity": "多数题时间 O(n)，递归栈 O(h)。",
      "template": "void traverse(TreeNode root) {\n    // 前序位置\n    traverse(root.left);\n    // 中序位置\n    traverse(root.right);\n    // 后序位置\n}",
      "insight": "二叉树的所有问题，本质上只有两种思维：‘遍历’一遍二叉树得到答案，或者‘分解’问题通过子树结果推导答案。位置的选择至关重要。"
    },
    "description": "本题对应《二叉树最大路径和》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 trees 相关方法中完成复杂度优化。",
    "codeSnippet": {
      "python": "def dfs(root):\n    if not root: return 0\n    left = dfs(root.left)\n    right = dfs(root.right)\n    return 1 + max(left, right)",
      "java": "int dfs(TreeNode root) {\n    if (root == null) return 0;\n    int left = dfs(root.left);\n    int right = dfs(root.right);\n    return 1 + Math.max(left, right);\n}",
      "cpp": "int dfs(TreeNode* root) {\n    if (!root) return 0;\n    int left = dfs(root->left);\n    int right = dfs(root->right);\n    return 1 + max(left, right);\n}"
    },
    "leetcodeSlug": "binary-tree-maximum-path-sum",
    "track": "extra"
  },
  {
    "id": "q073",
    "topicId": "ch08_trees",
    "type": "multiple_choice",
    "question": "【从前序与中序构造二叉树】 核心映射是？",
    "options": [
      "中序值到下标哈希",
      "前序值到深度",
      "后序值到下标",
      "层序映射"
    ],
    "correctIndex": 0,
    "explanation": "通过中序下标切分左右子树。",
    "xp": 12,
    "learning": {
      "pattern": "二叉树递归框架（遍历视角）",
      "coreQuestion": "这题是“遍历每个节点做事”还是“子树返回结果”？",
      "framework": "先定义递归函数含义，再选择前/中/后序位置放逻辑。",
      "steps": [
        "明确函数返回值语义",
        "写出 base case",
        "在递归三位置放入业务逻辑"
      ],
      "pitfalls": [
        "遍历视角和分解视角混淆",
        "遗漏空节点判断",
        "全局变量未正确回溯"
      ],
      "complexity": "多数题时间 O(n)，递归栈 O(h)。",
      "template": "void traverse(TreeNode root) {\n    // 前序位置\n    traverse(root.left);\n    // 中序位置\n    traverse(root.right);\n    // 后序位置\n}",
      "insight": "二叉树的所有问题，本质上只有两种思维：‘遍历’一遍二叉树得到答案，或者‘分解’问题通过子树结果推导答案。位置的选择至关重要。"
    },
    "description": "本题对应《从前序与中序构造二叉树》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 trees 相关方法中完成复杂度优化。",
    "codeSnippet": {
      "python": "def buildTree(preorder, inorder):\n    pos = {v: i for i, v in enumerate(inorder)}\n    def dfs(pl, pr, il, ir):\n        if pl > pr: return None\n        root_val = preorder[pl]\n        root = TreeNode(root_val)\n        k = pos[root_val]\n        left_size = k - il\n        root.left = dfs(pl + 1, pl + left_size, il, k - 1)\n        root.right = dfs(pl + left_size + 1, pr, k + 1, ir)\n        return root\n    return dfs(0, len(preorder) - 1, 0, len(inorder) - 1)",
      "java": "public TreeNode buildTree(int[] preorder, int[] inorder) {\n    Map<Integer, Integer> pos = new HashMap<>();\n    for (int i = 0; i < inorder.length; i++) pos.put(inorder[i], i);\n    return dfs(preorder, 0, preorder.length - 1, 0, inorder.length - 1, pos);\n}\nprivate TreeNode dfs(int[] pre, int pl, int pr, int il, int ir, Map<Integer, Integer> pos) {\n    if (pl > pr) return null;\n    TreeNode root = new TreeNode(pre[pl]);\n    int k = pos.get(pre[pl]);\n    int leftSize = k - il;\n    root.left = dfs(pre, pl + 1, pl + leftSize, il, k - 1, pos);\n    root.right = dfs(pre, pl + leftSize + 1, pr, k + 1, ir, pos);\n    return root;\n}",
      "cpp": "TreeNode* dfs(vector<int>& pre, int pl, int pr, int il, int ir, unordered_map<int,int>& pos) {\n    if (pl > pr) return nullptr;\n    TreeNode* root = new TreeNode(pre[pl]);\n    int k = pos[pre[pl]];\n    int leftSize = k - il;\n    root->left = dfs(pre, pl + 1, pl + leftSize, il, k - 1, pos);\n    root->right = dfs(pre, pl + leftSize + 1, pr, k + 1, ir, pos);\n    return root;\n}"
    },
    "leetcodeSlug": "construct-binary-tree-from-preorder-and-inorder-traversal",
    "track": "extra"
  },
  {
    "id": "q074",
    "topicId": "ch08_trees",
    "type": "multiple_choice",
    "question": "【二叉搜索树第 K 小】 中序遍历性质是？",
    "options": [
      "得到递增序列",
      "得到递减序列",
      "随机序列",
      "层序序列"
    ],
    "correctIndex": 0,
    "explanation": "BST 的中序是有序。",
    "xp": 12,
    "learning": {
      "pattern": "二叉树递归框架（遍历视角）",
      "coreQuestion": "这题是“遍历每个节点做事”还是“子树返回结果”？",
      "framework": "先定义递归函数含义，再选择前/中/后序位置放逻辑。",
      "steps": [
        "明确函数返回值语义",
        "写出 base case",
        "在递归三位置放入业务逻辑"
      ],
      "pitfalls": [
        "遍历视角和分解视角混淆",
        "遗漏空节点判断",
        "全局变量未正确回溯"
      ],
      "complexity": "多数题时间 O(n)，递归栈 O(h)。",
      "template": "void traverse(TreeNode root) {\n    // 前序位置\n    traverse(root.left);\n    // 中序位置\n    traverse(root.right);\n    // 后序位置\n}",
      "insight": "二叉树的所有问题，本质上只有两种思维：‘遍历’一遍二叉树得到答案，或者‘分解’问题通过子树结果推导答案。位置的选择至关重要。"
    },
    "description": "本题对应《二叉搜索树第 K 小》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 trees 相关方法中完成复杂度优化。",
    "codeSnippet": {
      "python": "def dfs(root):\n    if not root: return 0\n    left = dfs(root.left)\n    right = dfs(root.right)\n    return 1 + max(left, right)",
      "java": "int dfs(TreeNode root) {\n    if (root == null) return 0;\n    int left = dfs(root.left);\n    int right = dfs(root.right);\n    return 1 + Math.max(left, right);\n}",
      "cpp": "int dfs(TreeNode* root) {\n    if (!root) return 0;\n    int left = dfs(root->left);\n    int right = dfs(root->right);\n    return 1 + max(left, right);\n}"
    },
    "leetcodeSlug": "kth-smallest-element-in-a-bst",
    "track": "extra"
  },
  {
    "id": "q075",
    "topicId": "ch08_trees",
    "type": "multiple_choice",
    "question": "【序列化二叉树】 需要记录空节点的原因是？",
    "options": [
      "保证结构可唯一还原",
      "节省空间",
      "避免递归",
      "提升排序"
    ],
    "correctIndex": 0,
    "explanation": "只存值会丢失形状信息。",
    "xp": 12,
    "learning": {
      "pattern": "二叉树递归框架（遍历视角）",
      "coreQuestion": "这题是“遍历每个节点做事”还是“子树返回结果”？",
      "framework": "先定义递归函数含义，再选择前/中/后序位置放逻辑。",
      "steps": [
        "明确函数返回值语义",
        "写出 base case",
        "在递归三位置放入业务逻辑"
      ],
      "pitfalls": [
        "遍历视角和分解视角混淆",
        "遗漏空节点判断",
        "全局变量未正确回溯"
      ],
      "complexity": "多数题时间 O(n)，递归栈 O(h)。",
      "template": "void traverse(TreeNode root) {\n    // 前序位置\n    traverse(root.left);\n    // 中序位置\n    traverse(root.right);\n    // 后序位置\n}",
      "insight": "二叉树的所有问题，本质上只有两种思维：‘遍历’一遍二叉树得到答案，或者‘分解’问题通过子树结果推导答案。位置的选择至关重要。"
    },
    "description": "本题对应《序列化二叉树》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 trees 相关方法中完成复杂度优化。",
    "codeSnippet": {
      "python": "def dfs(root):\n    if not root: return 0\n    left = dfs(root.left)\n    right = dfs(root.right)\n    return 1 + max(left, right)",
      "java": "int dfs(TreeNode root) {\n    if (root == null) return 0;\n    int left = dfs(root.left);\n    int right = dfs(root.right);\n    return 1 + Math.max(left, right);\n}",
      "cpp": "int dfs(TreeNode* root) {\n    if (!root) return 0;\n    int left = dfs(root->left);\n    int right = dfs(root->right);\n    return 1 + max(left, right);\n}"
    },
    "leetcodeSlug": "serialize-and-deserialize-binary-tree",
    "track": "extra"
  },
  {
    "id": "q076",
    "topicId": "ch08_trees",
    "type": "multiple_choice",
    "question": "【对称二叉树】 递归比较哪两棵子树？",
    "options": [
      "左子树的左与右子树的右，左子树的右与右子树的左",
      "同侧比较",
      "只比较值集合",
      "只比较深度"
    ],
    "correctIndex": 0,
    "explanation": "镜像比较。",
    "xp": 12,
    "learning": {
      "pattern": "二叉树递归框架（遍历视角）",
      "coreQuestion": "这题是“遍历每个节点做事”还是“子树返回结果”？",
      "framework": "先定义递归函数含义，再选择前/中/后序位置放逻辑。",
      "steps": [
        "明确函数返回值语义",
        "写出 base case",
        "在递归三位置放入业务逻辑"
      ],
      "pitfalls": [
        "遍历视角和分解视角混淆",
        "遗漏空节点判断",
        "全局变量未正确回溯"
      ],
      "complexity": "多数题时间 O(n)，递归栈 O(h)。",
      "template": "void traverse(TreeNode root) {\n    // 前序位置\n    traverse(root.left);\n    // 中序位置\n    traverse(root.right);\n    // 后序位置\n}",
      "insight": "二叉树的所有问题，本质上只有两种思维：‘遍历’一遍二叉树得到答案，或者‘分解’问题通过子树结果推导答案。位置的选择至关重要。"
    },
    "description": "本题对应《对称二叉树》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 trees 相关方法中完成复杂度优化。",
    "codeSnippet": {
      "python": "def dfs(root):\n    if not root: return 0\n    left = dfs(root.left)\n    right = dfs(root.right)\n    return 1 + max(left, right)",
      "java": "int dfs(TreeNode root) {\n    if (root == null) return 0;\n    int left = dfs(root.left);\n    int right = dfs(root.right);\n    return 1 + Math.max(left, right);\n}",
      "cpp": "int dfs(TreeNode* root) {\n    if (!root) return 0;\n    int left = dfs(root->left);\n    int right = dfs(root->right);\n    return 1 + max(left, right);\n}"
    },
    "leetcodeSlug": "symmetric-tree",
    "track": "extra"
  },
  {
    "id": "q077",
    "topicId": "ch09_graphs",
    "type": "multiple_choice",
    "question": "【岛屿数量】 访问陆地后为什么要立刻标记？",
    "options": [
      "防止重复搜索",
      "提高精度",
      "减少递归栈",
      "保证排序"
    ],
    "correctIndex": 0,
    "explanation": "避免多次计数。",
    "xp": 14,
    "codeSnippet": {
      "python": "def numIslands(grid):\n    if not grid: return 0\n    m, n = len(grid), len(grid[0])\n    def dfs(i, j):\n        if i < 0 or i >= m or j < 0 or j >= n or grid[i][j] != '1':\n            return\n        grid[i][j] = '0'\n        dfs(i+1, j); dfs(i-1, j); dfs(i, j+1); dfs(i, j-1)\n    ans = 0\n    for i in range(m):\n        for j in range(n):\n            if grid[i][j] == '1':\n                ans += 1\n                dfs(i, j)\n    return ans\n",
      "java": "public int numIslands(char[][] grid) {\n    int m = grid.length;\n    if (m == 0) return 0;\n    int n = grid[0].length;\n    int ans = 0;\n    for (int i = 0; i < m; i++) {\n        for (int j = 0; j < n; j++) {\n            if (grid[i][j] == '1') {\n                ans++;\n                dfs(grid, i, j);\n            }\n        }\n    }\n    return ans;\n}\nprivate void dfs(char[][] g, int i, int j) {\n    int m=g.length, n=g[0].length;\n    if (i<0||i>=m||j<0||j>=n||g[i][j]!='1') return;\n    g[i][j]='0';\n    dfs(g,i+1,j); dfs(g,i-1,j); dfs(g,i,j+1); dfs(g,i,j-1);\n}\n",
      "cpp": "int numIslands(vector<vector<char>>& grid) {\n    int m = grid.size();\n    if (!m) return 0;\n    int n = grid[0].size();\n    function<void(int,int)> dfs = [&](int i,int j){\n        if (i<0||i>=m||j<0||j>=n||grid[i][j] != '1') return;\n        grid[i][j] = '0';\n        dfs(i+1,j); dfs(i-1,j); dfs(i,j+1); dfs(i,j-1);\n    };\n    int ans=0;\n    for(int i=0;i<m;i++) for(int j=0;j<n;j++) if(grid[i][j]=='1'){ans++; dfs(i,j);} \n    return ans;\n}\n"
    },
    "learning": {
      "pattern": "图遍历框架（DFS/BFS/并查集）",
      "coreQuestion": "是求连通性、最短路，还是判环？",
      "framework": "连通性优先 DFS/BFS；最短步数优先 BFS；动态连通可用并查集。",
      "steps": [
        "确定图表示（邻接表/网格）",
        "定义访问标记防重复",
        "按题意选择遍历策略"
      ],
      "pitfalls": [
        "访问标记时机过晚导致重复",
        "网格越界判断漏写",
        "有向图和无向图判环混淆"
      ],
      "complexity": "图遍历常见 O(V+E)。",
      "template": "先明确图表示（邻接表/入度/边集），再决定 DFS、BFS 或并查集。\n访问即标记，避免重复遍历和死循环。",
      "insight": "图题的第一步不是写搜索，而是把输入关系正确建模成“点-边”结构。"
    },
    "description": "给你一个由 '1'（陆地）和 '0'（水）组成的二维网格，请你计算网格中岛屿的数量。岛屿总是被水包围。",
    "leetcodeSlug": "number-of-islands",
    "handbookRef": {
      "leetcodeId": 200,
      "chapter": "第九章：图算法",
      "section": "9.2 并查集",
      "orderInSection": 1,
      "mdLine": 1202
    },
    "track": "core"
  },
  {
    "id": "q078",
    "topicId": "ch09_graphs",
    "type": "multiple_choice",
    "question": "【课程表】 判环通常用什么？",
    "options": [
      "拓扑排序或 DFS 染色",
      "并查集按值合并",
      "双指针",
      "堆"
    ],
    "correctIndex": 0,
    "explanation": "有向图有环则无法完成课程。",
    "xp": 12,
    "learning": {
      "pattern": "图遍历框架（DFS/BFS/并查集）",
      "coreQuestion": "是求连通性、最短路，还是判环？",
      "framework": "连通性优先 DFS/BFS；最短步数优先 BFS；动态连通可用并查集。",
      "steps": [
        "确定图表示（邻接表/网格）",
        "定义访问标记防重复",
        "按题意选择遍历策略"
      ],
      "pitfalls": [
        "访问标记时机过晚导致重复",
        "网格越界判断漏写",
        "有向图和无向图判环混淆"
      ],
      "complexity": "图遍历常见 O(V+E)。",
      "template": "先明确图表示（邻接表/入度/边集），再决定 DFS、BFS 或并查集。\n访问即标记，避免重复遍历和死循环。",
      "insight": "图题的第一步不是写搜索，而是把输入关系正确建模成“点-边”结构。"
    },
    "description": "你这个学期必须选修 numCourses 门课程，记为 0 到 numCourses - 1 。在选修某些课程之前需要一些先修课程。判断你是否可能完成所有课程的学习。",
    "codeSnippet": {
      "python": "def canFinish(numCourses, prerequisites):\n    from collections import deque\n    graph = [[] for _ in range(numCourses)]\n    indeg = [0]*numCourses\n    for a,b in prerequisites:\n        graph[b].append(a)\n        indeg[a] += 1\n    q = deque([i for i in range(numCourses) if indeg[i]==0])\n    taken = 0\n    while q:\n        x = q.popleft()\n        taken += 1\n        for y in graph[x]:\n            indeg[y] -= 1\n            if indeg[y] == 0:\n                q.append(y)\n    return taken == numCourses\n",
      "java": "public boolean canFinish(int numCourses, int[][] prerequisites) {\n    List<List<Integer>> graph = new ArrayList<>();\n    for (int i = 0; i < numCourses; i++) graph.add(new ArrayList<>());\n    int[] indeg = new int[numCourses];\n    for (int[] p : prerequisites) {\n        int a = p[0], b = p[1];\n        graph.get(b).add(a);\n        indeg[a]++;\n    }\n    Deque<Integer> q = new ArrayDeque<>();\n    for (int i = 0; i < numCourses; i++) if (indeg[i] == 0) q.add(i);\n    int taken = 0;\n    while (!q.isEmpty()) {\n        int x = q.poll();\n        taken++;\n        for (int y : graph.get(x)) {\n            if (--indeg[y] == 0) q.add(y);\n        }\n    }\n    return taken == numCourses;\n}\n",
      "cpp": "bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {\n    vector<vector<int>> graph(numCourses);\n    vector<int> indeg(numCourses, 0);\n    for (auto &p : prerequisites) {\n        int a=p[0], b=p[1];\n        graph[b].push_back(a);\n        indeg[a]++;\n    }\n    queue<int> q;\n    for (int i=0;i<numCourses;i++) if (indeg[i]==0) q.push(i);\n    int taken=0;\n    while(!q.empty()) {\n        int x=q.front(); q.pop();\n        taken++;\n        for (int y: graph[x]) {\n            if (--indeg[y]==0) q.push(y);\n        }\n    }\n    return taken==numCourses;\n}\n"
    },
    "leetcodeSlug": "course-schedule",
    "handbookRef": {
      "leetcodeId": 207,
      "chapter": "第九章：图算法",
      "section": "9.1 拓扑排序",
      "orderInSection": 1,
      "mdLine": 1163
    },
    "track": "core"
  },
  {
    "id": "q079",
    "topicId": "ch09_graphs",
    "type": "multiple_choice",
    "question": "【克隆图】 为什么要哈希 old->new？",
    "options": [
      "处理环和共享邻接节点",
      "减少节点数",
      "便于排序",
      "计算最短路"
    ],
    "correctIndex": 0,
    "explanation": "防止重复克隆与无限递归。",
    "xp": 12,
    "learning": {
      "pattern": "图遍历框架（DFS/BFS/并查集）",
      "coreQuestion": "是求连通性、最短路，还是判环？",
      "framework": "连通性优先 DFS/BFS；最短步数优先 BFS；动态连通可用并查集。",
      "steps": [
        "确定图表示（邻接表/网格）",
        "定义访问标记防重复",
        "按题意选择遍历策略"
      ],
      "pitfalls": [
        "访问标记时机过晚导致重复",
        "网格越界判断漏写",
        "有向图和无向图判环混淆"
      ],
      "complexity": "图遍历常见 O(V+E)。",
      "template": "先明确图表示（邻接表/入度/边集），再决定 DFS、BFS 或并查集。\n访问即标记，避免重复遍历和死循环。",
      "insight": "图题的第一步不是写搜索，而是把输入关系正确建模成“点-边”结构。"
    },
    "description": "本题对应《克隆图》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 graphs 相关方法中完成复杂度优化。",
    "codeSnippet": {
      "python": "from collections import deque\ndef bfs(start, graph):\n    q = deque([start])\n    vis = {start}\n    while q:\n        x = q.popleft()\n        for y in graph[x]:\n            if y not in vis:\n                vis.add(y)\n                q.append(y)",
      "java": "void bfs(int start, List<Integer>[] g) {\n    Queue<Integer> q = new LinkedList<>();\n    boolean[] vis = new boolean[g.length];\n    q.offer(start); vis[start] = true;\n    while (!q.isEmpty()) {\n        int x = q.poll();\n        for (int y : g[x]) if (!vis[y]) { vis[y] = true; q.offer(y); }\n    }\n}",
      "cpp": "void bfs(int start, vector<vector<int>>& g) {\n    queue<int> q; vector<int> vis(g.size());\n    q.push(start); vis[start] = 1;\n    while (!q.empty()) {\n        int x = q.front(); q.pop();\n        for (int y : g[x]) if (!vis[y]) { vis[y] = 1; q.push(y); }\n    }\n}"
    },
    "leetcodeSlug": "clone-graph",
    "track": "extra"
  },
  {
    "id": "q080",
    "topicId": "ch09_graphs",
    "type": "multiple_choice",
    "question": "【腐烂的橘子】 为什么是多源 BFS？",
    "options": [
      "多个腐烂点同时扩散",
      "只需 DFS",
      "图有权",
      "必须并查集"
    ],
    "correctIndex": 0,
    "explanation": "每一层代表一分钟。",
    "xp": 12,
    "learning": {
      "pattern": "图遍历框架（DFS/BFS/并查集）",
      "coreQuestion": "是求连通性、最短路，还是判环？",
      "framework": "连通性优先 DFS/BFS；最短步数优先 BFS；动态连通可用并查集。",
      "steps": [
        "确定图表示（邻接表/网格）",
        "定义访问标记防重复",
        "按题意选择遍历策略"
      ],
      "pitfalls": [
        "访问标记时机过晚导致重复",
        "网格越界判断漏写",
        "有向图和无向图判环混淆"
      ],
      "complexity": "图遍历常见 O(V+E)。",
      "template": "先明确图表示（邻接表/入度/边集），再决定 DFS、BFS 或并查集。\n访问即标记，避免重复遍历和死循环。",
      "insight": "图题的第一步不是写搜索，而是把输入关系正确建模成“点-边”结构。"
    },
    "description": "本题对应《腐烂的橘子》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 graphs 相关方法中完成复杂度优化。",
    "codeSnippet": {
      "python": "from collections import deque\ndef bfs(start, graph):\n    q = deque([start])\n    vis = {start}\n    while q:\n        x = q.popleft()\n        for y in graph[x]:\n            if y not in vis:\n                vis.add(y)\n                q.append(y)",
      "java": "void bfs(int start, List<Integer>[] g) {\n    Queue<Integer> q = new LinkedList<>();\n    boolean[] vis = new boolean[g.length];\n    q.offer(start); vis[start] = true;\n    while (!q.isEmpty()) {\n        int x = q.poll();\n        for (int y : g[x]) if (!vis[y]) { vis[y] = true; q.offer(y); }\n    }\n}",
      "cpp": "void bfs(int start, vector<vector<int>>& g) {\n    queue<int> q; vector<int> vis(g.size());\n    q.push(start); vis[start] = 1;\n    while (!q.empty()) {\n        int x = q.front(); q.pop();\n        for (int y : g[x]) if (!vis[y]) { vis[y] = 1; q.push(y); }\n    }\n}"
    },
    "leetcodeSlug": "rotting-oranges",
    "track": "extra"
  },
  {
    "id": "q081",
    "topicId": "ch09_graphs",
    "type": "multiple_choice",
    "question": "【单词接龙】 适合哪种搜索？",
    "options": [
      "BFS 最短步数",
      "DFS 最短步数",
      "Dijkstra",
      "A* 必须"
    ],
    "correctIndex": 0,
    "explanation": "无权图最短路径用 BFS。",
    "xp": 12,
    "learning": {
      "pattern": "图遍历框架（DFS/BFS/并查集）",
      "coreQuestion": "是求连通性、最短路，还是判环？",
      "framework": "连通性优先 DFS/BFS；最短步数优先 BFS；动态连通可用并查集。",
      "steps": [
        "确定图表示（邻接表/网格）",
        "定义访问标记防重复",
        "按题意选择遍历策略"
      ],
      "pitfalls": [
        "访问标记时机过晚导致重复",
        "网格越界判断漏写",
        "有向图和无向图判环混淆"
      ],
      "complexity": "图遍历常见 O(V+E)。",
      "template": "先明确图表示（邻接表/入度/边集），再决定 DFS、BFS 或并查集。\n访问即标记，避免重复遍历和死循环。",
      "insight": "图题的第一步不是写搜索，而是把输入关系正确建模成“点-边”结构。"
    },
    "description": "本题对应《单词接龙》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 graphs 相关方法中完成复杂度优化。",
    "codeSnippet": {
      "python": "from collections import deque\ndef bfs(start, graph):\n    q = deque([start])\n    vis = {start}\n    while q:\n        x = q.popleft()\n        for y in graph[x]:\n            if y not in vis:\n                vis.add(y)\n                q.append(y)",
      "java": "void bfs(int start, List<Integer>[] g) {\n    Queue<Integer> q = new LinkedList<>();\n    boolean[] vis = new boolean[g.length];\n    q.offer(start); vis[start] = true;\n    while (!q.isEmpty()) {\n        int x = q.poll();\n        for (int y : g[x]) if (!vis[y]) { vis[y] = true; q.offer(y); }\n    }\n}",
      "cpp": "void bfs(int start, vector<vector<int>>& g) {\n    queue<int> q; vector<int> vis(g.size());\n    q.push(start); vis[start] = 1;\n    while (!q.empty()) {\n        int x = q.front(); q.pop();\n        for (int y : g[x]) if (!vis[y]) { vis[y] = 1; q.push(y); }\n    }\n}"
    },
    "leetcodeSlug": "word-ladder",
    "track": "extra"
  },
  {
    "id": "q082",
    "topicId": "ch09_graphs",
    "type": "multiple_choice",
    "question": "【被围绕的区域】 边界 O 处理思路是？",
    "options": [
      "先标记边界连通 O，再翻转其余 O",
      "直接翻全部 O",
      "按行排序",
      "哈希频次"
    ],
    "correctIndex": 0,
    "explanation": "边界连通的不应被捕获。",
    "xp": 12,
    "learning": {
      "pattern": "图遍历框架（DFS/BFS/并查集）",
      "coreQuestion": "是求连通性、最短路，还是判环？",
      "framework": "连通性优先 DFS/BFS；最短步数优先 BFS；动态连通可用并查集。",
      "steps": [
        "确定图表示（邻接表/网格）",
        "定义访问标记防重复",
        "按题意选择遍历策略"
      ],
      "pitfalls": [
        "访问标记时机过晚导致重复",
        "网格越界判断漏写",
        "有向图和无向图判环混淆"
      ],
      "complexity": "图遍历常见 O(V+E)。",
      "template": "先明确图表示（邻接表/入度/边集），再决定 DFS、BFS 或并查集。\n访问即标记，避免重复遍历和死循环。",
      "insight": "图题的第一步不是写搜索，而是把输入关系正确建模成“点-边”结构。"
    },
    "description": "本题对应《被围绕的区域》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 graphs 相关方法中完成复杂度优化。",
    "codeSnippet": {
      "python": "from collections import deque\ndef bfs(start, graph):\n    q = deque([start])\n    vis = {start}\n    while q:\n        x = q.popleft()\n        for y in graph[x]:\n            if y not in vis:\n                vis.add(y)\n                q.append(y)",
      "java": "void bfs(int start, List<Integer>[] g) {\n    Queue<Integer> q = new LinkedList<>();\n    boolean[] vis = new boolean[g.length];\n    q.offer(start); vis[start] = true;\n    while (!q.isEmpty()) {\n        int x = q.poll();\n        for (int y : g[x]) if (!vis[y]) { vis[y] = true; q.offer(y); }\n    }\n}",
      "cpp": "void bfs(int start, vector<vector<int>>& g) {\n    queue<int> q; vector<int> vis(g.size());\n    q.push(start); vis[start] = 1;\n    while (!q.empty()) {\n        int x = q.front(); q.pop();\n        for (int y : g[x]) if (!vis[y]) { vis[y] = 1; q.push(y); }\n    }\n}"
    },
    "leetcodeSlug": "surrounded-regions",
    "track": "extra"
  },
  {
    "id": "q083",
    "topicId": "ch09_graphs",
    "type": "multiple_choice",
    "question": "【冗余连接】 无向图找成环边常用？",
    "options": [
      "并查集",
      "拓扑排序",
      "最小堆",
      "滑窗"
    ],
    "correctIndex": 0,
    "explanation": "加入边前若已连通则是冗余边。",
    "xp": 12,
    "learning": {
      "pattern": "图遍历框架（DFS/BFS/并查集）",
      "coreQuestion": "是求连通性、最短路，还是判环？",
      "framework": "连通性优先 DFS/BFS；最短步数优先 BFS；动态连通可用并查集。",
      "steps": [
        "确定图表示（邻接表/网格）",
        "定义访问标记防重复",
        "按题意选择遍历策略"
      ],
      "pitfalls": [
        "访问标记时机过晚导致重复",
        "网格越界判断漏写",
        "有向图和无向图判环混淆"
      ],
      "complexity": "图遍历常见 O(V+E)。",
      "template": "先明确图表示（邻接表/入度/边集），再决定 DFS、BFS 或并查集。\n访问即标记，避免重复遍历和死循环。",
      "insight": "图题的第一步不是写搜索，而是把输入关系正确建模成“点-边”结构。"
    },
    "description": "本题对应《冗余连接》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 graphs 相关方法中完成复杂度优化。",
    "codeSnippet": {
      "python": "from collections import deque\ndef bfs(start, graph):\n    q = deque([start])\n    vis = {start}\n    while q:\n        x = q.popleft()\n        for y in graph[x]:\n            if y not in vis:\n                vis.add(y)\n                q.append(y)",
      "java": "void bfs(int start, List<Integer>[] g) {\n    Queue<Integer> q = new LinkedList<>();\n    boolean[] vis = new boolean[g.length];\n    q.offer(start); vis[start] = true;\n    while (!q.isEmpty()) {\n        int x = q.poll();\n        for (int y : g[x]) if (!vis[y]) { vis[y] = true; q.offer(y); }\n    }\n}",
      "cpp": "void bfs(int start, vector<vector<int>>& g) {\n    queue<int> q; vector<int> vis(g.size());\n    q.push(start); vis[start] = 1;\n    while (!q.empty()) {\n        int x = q.front(); q.pop();\n        for (int y : g[x]) if (!vis[y]) { vis[y] = 1; q.push(y); }\n    }\n}"
    },
    "leetcodeSlug": "redundant-connection",
    "track": "extra"
  },
  {
    "id": "q084",
    "topicId": "ch09_graphs",
    "type": "multiple_choice",
    "question": "【网络延迟时间】 边权非负时常用算法？",
    "options": [
      "Dijkstra",
      "Floyd 必须",
      "KMP",
      "单调栈"
    ],
    "correctIndex": 0,
    "explanation": "单源最短路径经典。",
    "xp": 12,
    "learning": {
      "pattern": "图遍历框架（DFS/BFS/并查集）",
      "coreQuestion": "是求连通性、最短路，还是判环？",
      "framework": "连通性优先 DFS/BFS；最短步数优先 BFS；动态连通可用并查集。",
      "steps": [
        "确定图表示（邻接表/网格）",
        "定义访问标记防重复",
        "按题意选择遍历策略"
      ],
      "pitfalls": [
        "访问标记时机过晚导致重复",
        "网格越界判断漏写",
        "有向图和无向图判环混淆"
      ],
      "complexity": "图遍历常见 O(V+E)。",
      "template": "先明确图表示（邻接表/入度/边集），再决定 DFS、BFS 或并查集。\n访问即标记，避免重复遍历和死循环。",
      "insight": "图题的第一步不是写搜索，而是把输入关系正确建模成“点-边”结构。"
    },
    "description": "本题对应《网络延迟时间》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 graphs 相关方法中完成复杂度优化。",
    "codeSnippet": {
      "python": "from collections import deque\ndef bfs(start, graph):\n    q = deque([start])\n    vis = {start}\n    while q:\n        x = q.popleft()\n        for y in graph[x]:\n            if y not in vis:\n                vis.add(y)\n                q.append(y)",
      "java": "void bfs(int start, List<Integer>[] g) {\n    Queue<Integer> q = new LinkedList<>();\n    boolean[] vis = new boolean[g.length];\n    q.offer(start); vis[start] = true;\n    while (!q.isEmpty()) {\n        int x = q.poll();\n        for (int y : g[x]) if (!vis[y]) { vis[y] = true; q.offer(y); }\n    }\n}",
      "cpp": "void bfs(int start, vector<vector<int>>& g) {\n    queue<int> q; vector<int> vis(g.size());\n    q.push(start); vis[start] = 1;\n    while (!q.empty()) {\n        int x = q.front(); q.pop();\n        for (int y : g[x]) if (!vis[y]) { vis[y] = 1; q.push(y); }\n    }\n}"
    },
    "leetcodeSlug": "network-delay-time",
    "track": "extra"
  },
  {
    "id": "q085",
    "topicId": "ch07_dynamic_programming",
    "type": "multiple_choice",
    "question": "【爬楼梯】 状态转移是？",
    "options": [
      "dp[i]=dp[i-1]+dp[i-2]",
      "dp[i]=dp[i-1]*2",
      "dp[i]=max(dp[i-1],dp[i-2])",
      "dp[i]=1"
    ],
    "correctIndex": 0,
    "explanation": "每一步来自前一阶或前两阶。",
    "xp": 13,
    "codeSnippet": {
      "python": "def climbStairs(n):\n    if n <= 2: return n\n    a, b = 1, 2\n    for _ in range(3, n + 1):\n        a, b = b, a + b\n    return b",
      "java": "public int climbStairs(int n) {\n    if (n <= 2) return n;\n    int a = 1, b = 2;\n    for (int i = 3; i <= n; i++) {\n        int temp = a + b;\n        a = b;\n        b = temp;\n    }\n    return b;\n}",
      "cpp": "int climbStairs(int n) {\n    if (n <= 2) return n;\n    int a = 1, b = 2;\n    for (int i = 3; i <= n; i++) {\n        int temp = a + b;\n        a = b;\n        b = temp;\n    }\n    return b;\n}"
    },
    "learning": {
      "pattern": "线性 DP（斐波那契型）",
      "coreQuestion": "到第 n 阶的方案数由哪些子问题组成？",
      "framework": "先定义 dp 含义，再写状态转移，最后确定遍历顺序。",
      "steps": [
        "定义 dp[i] 为到 i 阶方案数",
        "转移 dp[i]=dp[i-1]+dp[i-2]",
        "滚动数组降到 O(1) 空间"
      ],
      "pitfalls": [
        "n=1,n=2 基础状态漏写"
      ],
      "complexity": "复杂度由状态数 × 转移代价决定。",
      "template": "# 状态转移方程\ndp[i] = max(dp[i-1], dp[i-2] + val)",
      "insight": "动态规划的核心是：状态、选择、base case。先尝试暴力递归，发现重叠子问题后通过备忘录优化，最后转为自底向上的迭代。"
    },
    "description": "假设你正在爬楼梯。需要 n 阶你才能到达楼顶。每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？",
    "leetcodeSlug": "climbing-stairs",
    "track": "extra"
  },
  {
    "id": "q086",
    "topicId": "ch07_dynamic_programming",
    "type": "multiple_choice",
    "question": "【打家劫舍】 线性 DP 转移是？",
    "options": [
      "dp[i]=max(dp[i-1],dp[i-2]+nums[i])",
      "dp[i]=dp[i-1]+nums[i]",
      "dp[i]=min(...) ",
      "dp[i]=nums[i]"
    ],
    "correctIndex": 0,
    "explanation": "偷当前则不能偷前一间。",
    "xp": 12,
    "learning": {
      "pattern": "动态规划五步法（状态/转移/初始化/遍历/答案）",
      "coreQuestion": "状态是什么？选择是什么？转移从哪里来？",
      "framework": "先定义 dp 含义，再写状态转移，最后确定遍历顺序。",
      "steps": [
        "定义 dp 数组/状态含义",
        "写出状态转移方程",
        "确定初始化与遍历方向"
      ],
      "pitfalls": [
        "状态定义不完整",
        "初始化错误污染结果",
        "遍历顺序与依赖冲突"
      ],
      "complexity": "复杂度由状态数 × 转移代价决定。",
      "template": "# 状态转移方程\ndp[i] = max(dp[i-1], dp[i-2] + val)",
      "insight": "动态规划的核心是：状态、选择、base case。先尝试暴力递归，发现重叠子问题后通过备忘录优化，最后转为自底向上的迭代。"
    },
    "description": "你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统。",
    "codeSnippet": {
      "python": "def rob(nums):\n    prev2, prev1 = 0, 0\n    for x in nums:\n        prev2, prev1 = prev1, max(prev1, prev2 + x)\n    return prev1\n",
      "java": "public int rob(int[] nums) {\n    int prev2 = 0, prev1 = 0;\n    for (int x : nums) {\n        int cur = Math.max(prev1, prev2 + x);\n        prev2 = prev1;\n        prev1 = cur;\n    }\n    return prev1;\n}\n",
      "cpp": "int rob(vector<int>& nums) {\n    int prev2=0, prev1=0;\n    for (int x: nums) {\n        int cur = max(prev1, prev2 + x);\n        prev2 = prev1;\n        prev1 = cur;\n    }\n    return prev1;\n}\n"
    },
    "leetcodeSlug": "house-robber",
    "track": "extra"
  },
  {
    "id": "q087",
    "topicId": "ch07_dynamic_programming",
    "type": "multiple_choice",
    "question": "【零钱兑换】 完全背包转移方向是？",
    "options": [
      "金额从小到大",
      "金额从大到小",
      "随意",
      "只更新一次"
    ],
    "correctIndex": 0,
    "explanation": "每个硬币可重复使用。",
    "xp": 15,
    "codeSnippet": {
      "python": "def coinChange(coins, amount):\n    dp = [float('inf')] * (amount + 1)\n    dp[0] = 0\n    for coin in coins:\n        for i in range(coin, amount + 1):\n            dp[i] = min(dp[i], dp[i - coin] + 1)\n    return dp[amount] if dp[amount] != float('inf') else -1",
      "java": "public int coinChange(int[] coins, int amount) {\n    int[] dp = new int[amount + 1];\n    Arrays.fill(dp, amount + 1);\n    dp[0] = 0;\n    for (int coin : coins) {\n        for (int i = coin; i <= amount; i++) {\n            dp[i] = Math.min(dp[i], dp[i - coin] + 1);\n        }\n    }\n    return dp[amount] > amount ? -1 : dp[amount];\n}",
      "cpp": "int coinChange(vector<int>& coins, int amount) {\n    vector<int> dp(amount + 1, amount + 1);\n    dp[0] = 0;\n    for (int coin : coins) {\n        for (int i = coin; i <= amount; i++) {\n            dp[i] = min(dp[i], dp[i - coin] + 1);\n        }\n    }\n    return dp[amount] > amount ? -1 : dp[amount];\n}"
    },
    "learning": {
      "pattern": "动态规划五步法（状态/转移/初始化/遍历/答案）",
      "coreQuestion": "状态是什么？选择是什么？转移从哪里来？",
      "framework": "先定义 dp 含义，再写状态转移，最后确定遍历顺序。",
      "steps": [
        "定义 dp 数组/状态含义",
        "写出状态转移方程",
        "确定初始化与遍历方向"
      ],
      "pitfalls": [
        "状态定义不完整",
        "初始化错误污染结果",
        "遍历顺序与依赖冲突"
      ],
      "complexity": "复杂度由状态数 × 转移代价决定。",
      "template": "# 状态转移方程\ndp[i] = max(dp[i-1], dp[i-2] + val)",
      "insight": "动态规划的核心是：状态、选择、base case。先尝试暴力递归，发现重叠子问题后通过备忘录优化，最后转为自底向上的迭代。"
    },
    "description": "给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额。计算并返回可以凑成总金额所需的最少的硬币个数。",
    "leetcodeSlug": "coin-change",
    "track": "extra"
  },
  {
    "id": "q088",
    "topicId": "ch07_dynamic_programming",
    "type": "multiple_choice",
    "question": "【最长递增子序列】 O(n log n) 优化依赖？",
    "options": [
      "维护 tails 并二分",
      "前缀和",
      "并查集",
      "单调队列"
    ],
    "correctIndex": 0,
    "explanation": "tails[k] 是长度 k+1 子序列最小尾值。",
    "xp": 12,
    "learning": {
      "pattern": "动态规划五步法（状态/转移/初始化/遍历/答案）",
      "coreQuestion": "状态是什么？选择是什么？转移从哪里来？",
      "framework": "先定义 dp 含义，再写状态转移，最后确定遍历顺序。",
      "steps": [
        "定义 dp 数组/状态含义",
        "写出状态转移方程",
        "确定初始化与遍历方向"
      ],
      "pitfalls": [
        "状态定义不完整",
        "初始化错误污染结果",
        "遍历顺序与依赖冲突"
      ],
      "complexity": "复杂度由状态数 × 转移代价决定。",
      "template": "# 状态转移方程\ndp[i] = max(dp[i-1], dp[i-2] + val)",
      "insight": "动态规划的核心是：状态、选择、base case。先尝试暴力递归，发现重叠子问题后通过备忘录优化，最后转为自底向上的迭代。"
    },
    "description": "给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。",
    "codeSnippet": {
      "python": "def lengthOfLIS(nums):\n    import bisect\n    tails = []\n    for x in nums:\n        i = bisect.bisect_left(tails, x)\n        if i == len(tails):\n            tails.append(x)\n        else:\n            tails[i] = x\n    return len(tails)\n",
      "java": "public int lengthOfLIS(int[] nums) {\n    int[] tails = new int[nums.length];\n    int size = 0;\n    for (int x : nums) {\n        int i = Arrays.binarySearch(tails, 0, size, x);\n        if (i < 0) i = -(i + 1);\n        tails[i] = x;\n        if (i == size) size++;\n    }\n    return size;\n}\n",
      "cpp": "int lengthOfLIS(vector<int>& nums) {\n    vector<int> tails;\n    for (int x: nums) {\n        auto it = lower_bound(tails.begin(), tails.end(), x);\n        if (it == tails.end()) tails.push_back(x);\n        else *it = x;\n    }\n    return (int)tails.size();\n}\n"
    },
    "leetcodeSlug": "longest-increasing-subsequence",
    "handbookRef": {
      "leetcodeId": 300,
      "chapter": "第七章：动态规划",
      "section": "7.1 动态规划核心框架",
      "orderInSection": 1,
      "mdLine": 844
    },
    "track": "core"
  },
  {
    "id": "q089",
    "topicId": "ch07_dynamic_programming",
    "type": "multiple_choice",
    "question": "【最长公共子序列】 当字符相等时？",
    "options": [
      "dp[i][j]=dp[i-1][j-1]+1",
      "dp[i][j]=dp[i-1][j]",
      "dp[i][j]=dp[i][j-1]",
      "dp[i][j]=0"
    ],
    "correctIndex": 0,
    "explanation": "相等就承接左上并 +1。",
    "xp": 12,
    "learning": {
      "pattern": "动态规划五步法（状态/转移/初始化/遍历/答案）",
      "coreQuestion": "状态是什么？选择是什么？转移从哪里来？",
      "framework": "先定义 dp 含义，再写状态转移，最后确定遍历顺序。",
      "steps": [
        "定义 dp 数组/状态含义",
        "写出状态转移方程",
        "确定初始化与遍历方向"
      ],
      "pitfalls": [
        "状态定义不完整",
        "初始化错误污染结果",
        "遍历顺序与依赖冲突"
      ],
      "complexity": "复杂度由状态数 × 转移代价决定。",
      "template": "# 状态转移方程\ndp[i] = max(dp[i-1], dp[i-2] + val)",
      "insight": "动态规划的核心是：状态、选择、base case。先尝试暴力递归，发现重叠子问题后通过备忘录优化，最后转为自底向上的迭代。"
    },
    "description": "给定两个字符串 text1 和 text2，返回这两个字符串的最长 公共子序列 的长度。如果不存在公共子序列，返回 0。",
    "codeSnippet": {
      "python": "def longestCommonSubsequence(text1, text2):\n    m, n = len(text1), len(text2)\n    dp = [0] * (n + 1)\n    for i in range(1, m + 1):\n        prev = 0\n        for j in range(1, n + 1):\n            tmp = dp[j]\n            if text1[i-1] == text2[j-1]:\n                dp[j] = prev + 1\n            else:\n                dp[j] = max(dp[j], dp[j-1])\n            prev = tmp\n    return dp[n]\n",
      "java": "public int longestCommonSubsequence(String text1, String text2) {\n    int m = text1.length(), n = text2.length();\n    int[] dp = new int[n + 1];\n    for (int i = 1; i <= m; i++) {\n        int prev = 0;\n        for (int j = 1; j <= n; j++) {\n            int tmp = dp[j];\n            if (text1.charAt(i - 1) == text2.charAt(j - 1)) dp[j] = prev + 1;\n            else dp[j] = Math.max(dp[j], dp[j - 1]);\n            prev = tmp;\n        }\n    }\n    return dp[n];\n}\n",
      "cpp": "int longestCommonSubsequence(string a, string b) {\n    int m=a.size(), n=b.size();\n    vector<int> dp(n+1, 0);\n    for (int i=1;i<=m;i++){\n        int prev=0;\n        for (int j=1;j<=n;j++){\n            int tmp=dp[j];\n            if (a[i-1]==b[j-1]) dp[j]=prev+1;\n            else dp[j]=max(dp[j], dp[j-1]);\n            prev=tmp;\n        }\n    }\n    return dp[n];\n}\n"
    },
    "leetcodeSlug": "longest-common-subsequence",
    "track": "extra"
  },
  {
    "id": "q090",
    "topicId": "ch07_dynamic_programming",
    "type": "multiple_choice",
    "question": "【分割等和子集】 目标可转化为？",
    "options": [
      "是否能凑出 sum/2",
      "是否有连续子数组和为0",
      "是否排序后对称",
      "是否有环"
    ],
    "correctIndex": 0,
    "explanation": "典型 0/1 背包可达性。",
    "xp": 12,
    "learning": {
      "pattern": "动态规划五步法（状态/转移/初始化/遍历/答案）",
      "coreQuestion": "状态是什么？选择是什么？转移从哪里来？",
      "framework": "先定义 dp 含义，再写状态转移，最后确定遍历顺序。",
      "steps": [
        "定义 dp 数组/状态含义",
        "写出状态转移方程",
        "确定初始化与遍历方向"
      ],
      "pitfalls": [
        "状态定义不完整",
        "初始化错误污染结果",
        "遍历顺序与依赖冲突"
      ],
      "complexity": "复杂度由状态数 × 转移代价决定。",
      "template": "# 状态转移方程\ndp[i] = max(dp[i-1], dp[i-2] + val)",
      "insight": "动态规划的核心是：状态、选择、base case。先尝试暴力递归，发现重叠子问题后通过备忘录优化，最后转为自底向上的迭代。"
    },
    "description": "本题对应《分割等和子集》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 dynamic_programming 相关方法中完成复杂度优化。",
    "codeSnippet": {
      "python": "def canPartition(nums):\n    s = sum(nums)\n    if s % 2: return False\n    target = s // 2\n    dp = [False] * (target + 1)\n    dp[0] = True\n    for x in nums:\n        for j in range(target, x - 1, -1):\n            dp[j] = dp[j] or dp[j - x]\n    return dp[target]\n",
      "java": "public boolean canPartition(int[] nums) {\n    int sum = 0;\n    for (int x : nums) sum += x;\n    if (sum % 2 == 1) return false;\n    int target = sum / 2;\n    boolean[] dp = new boolean[target + 1];\n    dp[0] = true;\n    for (int x : nums) {\n        for (int j = target; j >= x; j--) {\n            dp[j] = dp[j] || dp[j - x];\n        }\n    }\n    return dp[target];\n}\n",
      "cpp": "bool canPartition(vector<int>& nums) {\n    int sum=0; for (int x: nums) sum += x;\n    if (sum % 2) return false;\n    int target = sum/2;\n    vector<char> dp(target+1, 0);\n    dp[0] = 1;\n    for (int x: nums) {\n        for (int j=target; j>=x; j--) {\n            dp[j] = dp[j] || dp[j-x];\n        }\n    }\n    return dp[target];\n}\n"
    },
    "leetcodeSlug": "partition-equal-subset-sum",
    "handbookRef": {
      "leetcodeId": 416,
      "chapter": "第七章：动态规划",
      "section": "7.2 背包问题",
      "orderInSection": 1,
      "mdLine": 921
    },
    "track": "core"
  },
  {
    "id": "q091",
    "topicId": "ch07_dynamic_programming",
    "type": "multiple_choice",
    "question": "【编辑距离】 三种操作对应？",
    "options": [
      "插入/删除/替换",
      "交换/删除/反转",
      "合并/拆分/复制",
      "排序/查找/替换"
    ],
    "correctIndex": 0,
    "explanation": "dp 取三者最小 +1。",
    "xp": 12,
    "learning": {
      "pattern": "动态规划五步法（状态/转移/初始化/遍历/答案）",
      "coreQuestion": "状态是什么？选择是什么？转移从哪里来？",
      "framework": "先定义 dp 含义，再写状态转移，最后确定遍历顺序。",
      "steps": [
        "定义 dp 数组/状态含义",
        "写出状态转移方程",
        "确定初始化与遍历方向"
      ],
      "pitfalls": [
        "状态定义不完整",
        "初始化错误污染结果",
        "遍历顺序与依赖冲突"
      ],
      "complexity": "复杂度由状态数 × 转移代价决定。",
      "template": "# 状态转移方程\ndp[i] = max(dp[i-1], dp[i-2] + val)",
      "insight": "动态规划的核心是：状态、选择、base case。先尝试暴力递归，发现重叠子问题后通过备忘录优化，最后转为自底向上的迭代。"
    },
    "description": "给你两个单词 word1 和 word2，请返回将 word1 转换成 word2 所使用的最少操作数。你可以对一个单词进行插入、删除、替换操作。",
    "codeSnippet": {
      "python": "def minDistance(word1, word2):\n    m, n = len(word1), len(word2)\n    dp = list(range(n + 1))\n    for i in range(1, m + 1):\n        prev = dp[0]\n        dp[0] = i\n        for j in range(1, n + 1):\n            tmp = dp[j]\n            if word1[i-1] == word2[j-1]:\n                dp[j] = prev\n            else:\n                dp[j] = 1 + min(prev, dp[j], dp[j-1])\n            prev = tmp\n    return dp[n]\n",
      "java": "public int minDistance(String a, String b) {\n    int m = a.length(), n = b.length();\n    int[] dp = new int[n + 1];\n    for (int j = 0; j <= n; j++) dp[j] = j;\n    for (int i = 1; i <= m; i++) {\n        int prev = dp[0];\n        dp[0] = i;\n        for (int j = 1; j <= n; j++) {\n            int tmp = dp[j];\n            if (a.charAt(i - 1) == b.charAt(j - 1)) dp[j] = prev;\n            else dp[j] = 1 + Math.min(prev, Math.min(dp[j], dp[j - 1]));\n            prev = tmp;\n        }\n    }\n    return dp[n];\n}\n",
      "cpp": "int minDistance(string a, string b) {\n    int m=a.size(), n=b.size();\n    vector<int> dp(n+1);\n    for (int j=0;j<=n;j++) dp[j]=j;\n    for (int i=1;i<=m;i++){\n        int prev=dp[0];\n        dp[0]=i;\n        for (int j=1;j<=n;j++){\n            int tmp=dp[j];\n            if (a[i-1]==b[j-1]) dp[j]=prev;\n            else dp[j]=1+min(prev, min(dp[j], dp[j-1]));\n            prev=tmp;\n        }\n    }\n    return dp[n];\n}\n"
    },
    "leetcodeSlug": "edit-distance",
    "track": "extra"
  },
  {
    "id": "q092",
    "topicId": "ch07_dynamic_programming",
    "type": "multiple_choice",
    "question": "【不同路径】 机器人只能右/下时转移是？",
    "options": [
      "dp[i][j]=dp[i-1][j]+dp[i][j-1]",
      "dp[i][j]=dp[i-1][j-1]",
      "dp[i][j]=max(...) ",
      "dp[i][j]=1"
    ],
    "correctIndex": 0,
    "explanation": "到当前格路径来自上和左。",
    "xp": 12,
    "learning": {
      "pattern": "动态规划五步法（状态/转移/初始化/遍历/答案）",
      "coreQuestion": "状态是什么？选择是什么？转移从哪里来？",
      "framework": "先定义 dp 含义，再写状态转移，最后确定遍历顺序。",
      "steps": [
        "定义 dp 数组/状态含义",
        "写出状态转移方程",
        "确定初始化与遍历方向"
      ],
      "pitfalls": [
        "状态定义不完整",
        "初始化错误污染结果",
        "遍历顺序与依赖冲突"
      ],
      "complexity": "复杂度由状态数 × 转移代价决定。",
      "template": "# 状态转移方程\ndp[i] = max(dp[i-1], dp[i-2] + val)",
      "insight": "动态规划的核心是：状态、选择、base case。先尝试暴力递归，发现重叠子问题后通过备忘录优化，最后转为自底向上的迭代。"
    },
    "description": "本题对应《不同路径》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 dynamic_programming 相关方法中完成复杂度优化。",
    "codeSnippet": {
      "python": "def uniquePaths(m, n):\n    dp = [1] * n\n    for _ in range(1, m):\n        for j in range(1, n):\n            dp[j] += dp[j-1]\n    return dp[-1]\n",
      "java": "public int uniquePaths(int m, int n) {\n    int[] dp = new int[n];\n    Arrays.fill(dp, 1);\n    for (int i = 1; i < m; i++) {\n        for (int j = 1; j < n; j++) {\n            dp[j] += dp[j - 1];\n        }\n    }\n    return dp[n - 1];\n}\n",
      "cpp": "int uniquePaths(int m, int n) {\n    vector<int> dp(n, 1);\n    for (int i=1;i<m;i++){\n        for (int j=1;j<n;j++){\n            dp[j] += dp[j-1];\n        }\n    }\n    return dp[n-1];\n}\n"
    },
    "leetcodeSlug": "unique-paths",
    "track": "extra"
  },
  {
    "id": "q093",
    "topicId": "ch07_dynamic_programming",
    "type": "multiple_choice",
    "question": "【最长回文子串】 中心扩展法复杂度通常是？",
    "options": [
      "O(n^2)",
      "O(n)",
      "O(log n)",
      "O(n^3)"
    ],
    "correctIndex": 0,
    "explanation": "每个中心向两侧扩展。",
    "xp": 12,
    "learning": {
      "pattern": "动态规划五步法（状态/转移/初始化/遍历/答案）",
      "coreQuestion": "状态是什么？选择是什么？转移从哪里来？",
      "framework": "先定义 dp 含义，再写状态转移，最后确定遍历顺序。",
      "steps": [
        "定义 dp 数组/状态含义",
        "写出状态转移方程",
        "确定初始化与遍历方向"
      ],
      "pitfalls": [
        "状态定义不完整",
        "初始化错误污染结果",
        "遍历顺序与依赖冲突"
      ],
      "complexity": "复杂度由状态数 × 转移代价决定。",
      "template": "# 状态转移方程\ndp[i] = max(dp[i-1], dp[i-2] + val)",
      "insight": "动态规划的核心是：状态、选择、base case。先尝试暴力递归，发现重叠子问题后通过备忘录优化，最后转为自底向上的迭代。"
    },
    "description": "本题对应《最长回文子串》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 dynamic_programming 相关方法中完成复杂度优化。",
    "codeSnippet": {
      "python": "def longestPalindrome(s):\n    def expand(l, r):\n        while l >= 0 and r < len(s) and s[l] == s[r]:\n            l -= 1\n            r += 1\n        return s[l+1:r]\n    ans = ''\n    for i in range(len(s)):\n        p1 = expand(i, i)\n        p2 = expand(i, i + 1)\n        ans = max(ans, p1, p2, key=len)\n    return ans",
      "java": "public String longestPalindrome(String s) {\n    String ans = \"\";\n    for (int i = 0; i < s.length(); i++) {\n        String p1 = expand(s, i, i);\n        String p2 = expand(s, i, i + 1);\n        ans = p1.length() > ans.length() ? p1 : ans;\n        ans = p2.length() > ans.length() ? p2 : ans;\n    }\n    return ans;\n}\nprivate String expand(String s, int l, int r) {\n    while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) { l--; r++; }\n    return s.substring(l + 1, r);\n}",
      "cpp": "string expand(const string& s, int l, int r) {\n    while (l >= 0 && r < (int)s.size() && s[l] == s[r]) { l--; r++; }\n    return s.substr(l + 1, r - l - 1);\n}\nstring longestPalindrome(string s) {\n    string ans;\n    for (int i = 0; i < (int)s.size(); i++) {\n        string p1 = expand(s, i, i);\n        string p2 = expand(s, i, i + 1);\n        if (p1.size() > ans.size()) ans = p1;\n        if (p2.size() > ans.size()) ans = p2;\n    }\n    return ans;\n}"
    },
    "leetcodeSlug": "longest-palindromic-substring",
    "track": "extra"
  },
  {
    "id": "q094",
    "topicId": "ch07_dynamic_programming",
    "type": "multiple_choice",
    "question": "【单词拆分】 常见状态定义是？",
    "options": [
      "dp[i] 表示前 i 个字符可拆分",
      "dp[i] 表示第 i 字符是否元音",
      "dp[i] 表示词典大小",
      "dp[i] 表示最短词"
    ],
    "correctIndex": 0,
    "explanation": "通过枚举断点转移。",
    "xp": 12,
    "learning": {
      "pattern": "动态规划五步法（状态/转移/初始化/遍历/答案）",
      "coreQuestion": "状态是什么？选择是什么？转移从哪里来？",
      "framework": "先定义 dp 含义，再写状态转移，最后确定遍历顺序。",
      "steps": [
        "定义 dp 数组/状态含义",
        "写出状态转移方程",
        "确定初始化与遍历方向"
      ],
      "pitfalls": [
        "状态定义不完整",
        "初始化错误污染结果",
        "遍历顺序与依赖冲突"
      ],
      "complexity": "复杂度由状态数 × 转移代价决定。",
      "template": "# 状态转移方程\ndp[i] = max(dp[i-1], dp[i-2] + val)",
      "insight": "动态规划的核心是：状态、选择、base case。先尝试暴力递归，发现重叠子问题后通过备忘录优化，最后转为自底向上的迭代。"
    },
    "description": "本题对应《单词拆分》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 dynamic_programming 相关方法中完成复杂度优化。",
    "codeSnippet": {
      "python": "def wordBreak(s, wordDict):\n    wordSet = set(wordDict)\n    n = len(s)\n    dp = [False] * (n + 1)\n    dp[0] = True\n    for i in range(1, n + 1):\n        for j in range(i):\n            if dp[j] and s[j:i] in wordSet:\n                dp[i] = True\n                break\n    return dp[n]\n",
      "java": "public boolean wordBreak(String s, List<String> wordDict) {\n    Set<String> set = new HashSet<>(wordDict);\n    int n = s.length();\n    boolean[] dp = new boolean[n + 1];\n    dp[0] = true;\n    for (int i = 1; i <= n; i++) {\n        for (int j = 0; j < i; j++) {\n            if (dp[j] && set.contains(s.substring(j, i))) {\n                dp[i] = true;\n                break;\n            }\n        }\n    }\n    return dp[n];\n}\n",
      "cpp": "bool wordBreak(string s, vector<string>& wordDict) {\n    unordered_set<string> set(wordDict.begin(), wordDict.end());\n    int n = s.size();\n    vector<char> dp(n+1, 0);\n    dp[0] = 1;\n    for (int i=1;i<=n;i++){\n        for (int j=0;j<i;j++){\n            if (dp[j] && set.count(s.substr(j, i-j))) {\n                dp[i] = 1;\n                break;\n            }\n        }\n    }\n    return dp[n];\n}\n"
    },
    "leetcodeSlug": "word-break",
    "track": "extra"
  },
  {
    "id": "q095",
    "topicId": "ch07_dynamic_programming",
    "type": "multiple_choice",
    "question": "【最大正方形】 状态与哪个方向有关？",
    "options": [
      "上、左、左上最小值+1",
      "仅上方+1",
      "仅左方+1",
      "对角线和"
    ],
    "correctIndex": 0,
    "explanation": "三者共同限制正方形边长。",
    "xp": 12,
    "learning": {
      "pattern": "动态规划五步法（状态/转移/初始化/遍历/答案）",
      "coreQuestion": "状态是什么？选择是什么？转移从哪里来？",
      "framework": "先定义 dp 含义，再写状态转移，最后确定遍历顺序。",
      "steps": [
        "定义 dp 数组/状态含义",
        "写出状态转移方程",
        "确定初始化与遍历方向"
      ],
      "pitfalls": [
        "状态定义不完整",
        "初始化错误污染结果",
        "遍历顺序与依赖冲突"
      ],
      "complexity": "复杂度由状态数 × 转移代价决定。",
      "template": "# 状态转移方程\ndp[i] = max(dp[i-1], dp[i-2] + val)",
      "insight": "动态规划的核心是：状态、选择、base case。先尝试暴力递归，发现重叠子问题后通过备忘录优化，最后转为自底向上的迭代。"
    },
    "description": "本题对应《最大正方形》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 dynamic_programming 相关方法中完成复杂度优化。",
    "codeSnippet": {
      "python": "def maximalSquare(matrix):\n    if not matrix or not matrix[0]: return 0\n    m, n = len(matrix), len(matrix[0])\n    dp = [0] * (n + 1)\n    best = 0\n    for i in range(1, m + 1):\n        prev = 0\n        for j in range(1, n + 1):\n            tmp = dp[j]\n            if matrix[i-1][j-1] == '1':\n                dp[j] = 1 + min(dp[j], dp[j-1], prev)\n                best = max(best, dp[j])\n            else:\n                dp[j] = 0\n            prev = tmp\n    return best * best\n",
      "java": "public int maximalSquare(char[][] matrix) {\n    if (matrix == null || matrix.length == 0 || matrix[0].length == 0) return 0;\n    int m = matrix.length, n = matrix[0].length;\n    int[] dp = new int[n + 1];\n    int best = 0;\n    for (int i = 1; i <= m; i++) {\n        int prev = 0;\n        for (int j = 1; j <= n; j++) {\n            int tmp = dp[j];\n            if (matrix[i - 1][j - 1] == '1') {\n                dp[j] = 1 + Math.min(dp[j], Math.min(dp[j - 1], prev));\n                best = Math.max(best, dp[j]);\n            } else {\n                dp[j] = 0;\n            }\n            prev = tmp;\n        }\n    }\n    return best * best;\n}\n",
      "cpp": "int maximalSquare(vector<vector<char>>& matrix) {\n    if (matrix.empty() || matrix[0].empty()) return 0;\n    int m=matrix.size(), n=matrix[0].size();\n    vector<int> dp(n+1, 0);\n    int best=0;\n    for (int i=1;i<=m;i++){\n        int prev=0;\n        for (int j=1;j<=n;j++){\n            int tmp=dp[j];\n            if (matrix[i-1][j-1]=='1') {\n                dp[j] = 1 + min(dp[j], min(dp[j-1], prev));\n                best = max(best, dp[j]);\n            } else dp[j]=0;\n            prev=tmp;\n        }\n    }\n    return best*best;\n}\n"
    },
    "leetcodeSlug": "maximal-square",
    "track": "extra"
  },
  {
    "id": "q096",
    "topicId": "ch07_dynamic_programming",
    "type": "multiple_choice",
    "question": "【买卖股票含冷冻期】 需要几个状态？",
    "options": [
      "持有/不持有且可买/不持有且冷冻",
      "1 个",
      "2 个固定",
      "与天数无关"
    ],
    "correctIndex": 0,
    "explanation": "冷冻期引入额外状态。",
    "xp": 12,
    "learning": {
      "pattern": "动态规划五步法（状态/转移/初始化/遍历/答案）",
      "coreQuestion": "状态是什么？选择是什么？转移从哪里来？",
      "framework": "先定义 dp 含义，再写状态转移，最后确定遍历顺序。",
      "steps": [
        "定义 dp 数组/状态含义",
        "写出状态转移方程",
        "确定初始化与遍历方向"
      ],
      "pitfalls": [
        "状态定义不完整",
        "初始化错误污染结果",
        "遍历顺序与依赖冲突"
      ],
      "complexity": "复杂度由状态数 × 转移代价决定。",
      "template": "# 状态转移方程\ndp[i] = max(dp[i-1], dp[i-2] + val)",
      "insight": "动态规划的核心是：状态、选择、base case。先尝试暴力递归，发现重叠子问题后通过备忘录优化，最后转为自底向上的迭代。"
    },
    "description": "本题对应《买卖股票含冷冻期》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 dynamic_programming 相关方法中完成复杂度优化。",
    "codeSnippet": {
      "python": "def maxProfit(prices):\n    if not prices: return 0\n    hold = -prices[0]\n    sold = 0\n    rest = 0\n    for p in prices[1:]:\n        prevSold = sold\n        sold = hold + p\n        hold = max(hold, rest - p)\n        rest = max(rest, prevSold)\n    return max(sold, rest)\n",
      "java": "public int maxProfit(int[] prices) {\n    if (prices.length == 0) return 0;\n    int hold = -prices[0];\n    int sold = 0;\n    int rest = 0;\n    for (int i = 1; i < prices.length; i++) {\n        int p = prices[i];\n        int prevSold = sold;\n        sold = hold + p;\n        hold = Math.max(hold, rest - p);\n        rest = Math.max(rest, prevSold);\n    }\n    return Math.max(sold, rest);\n}\n",
      "cpp": "int maxProfit(vector<int>& prices) {\n    if (prices.empty()) return 0;\n    int hold = -prices[0];\n    int sold = 0;\n    int rest = 0;\n    for (int i=1;i<(int)prices.size();i++){\n        int p = prices[i];\n        int prevSold = sold;\n        sold = hold + p;\n        hold = max(hold, rest - p);\n        rest = max(rest, prevSold);\n    }\n    return max(sold, rest);\n}\n"
    },
    "leetcodeSlug": "best-time-to-buy-and-sell-stock-with-cooldown",
    "track": "extra"
  },
  {
    "id": "q097",
    "topicId": "ch05_backtracking",
    "type": "multiple_choice",
    "question": "【全排列】 回溯模板关键是？",
    "options": [
      "路径 path + 使用标记 used + 回退",
      "仅双指针",
      "并查集",
      "二分"
    ],
    "correctIndex": 0,
    "explanation": "做选择、递归、撤销选择。",
    "xp": 14,
    "codeSnippet": {
      "python": "def permute(nums):\n    res = []\n    used = [False]*len(nums)\n    path = []\n    def backtrack():\n        if len(path) == len(nums):\n            res.append(path[:])\n            return\n        for i, x in enumerate(nums):\n            if used[i]:\n                continue\n            used[i] = True\n            path.append(x)\n            backtrack()\n            path.pop()\n            used[i] = False\n    backtrack()\n    return res\n",
      "java": "public List<List<Integer>> permute(int[] nums) {\n    List<List<Integer>> res = new ArrayList<>();\n    boolean[] used = new boolean[nums.length];\n    List<Integer> path = new ArrayList<>();\n    backtrack(nums, used, path, res);\n    return res;\n}\nprivate void backtrack(int[] nums, boolean[] used, List<Integer> path, List<List<Integer>> res) {\n    if (path.size() == nums.length) {\n        res.add(new ArrayList<>(path));\n        return;\n    }\n    for (int i = 0; i < nums.length; i++) {\n        if (used[i]) continue;\n        used[i] = true;\n        path.add(nums[i]);\n        backtrack(nums, used, path, res);\n        path.remove(path.size() - 1);\n        used[i] = false;\n    }\n}\n",
      "cpp": "vector<vector<int>> permute(vector<int>& nums) {\n    vector<vector<int>> res;\n    vector<int> path;\n    vector<int> used(nums.size(), 0);\n    function<void()> dfs = [&](){\n        if (path.size() == nums.size()) {\n            res.push_back(path);\n            return;\n        }\n        for (int i=0;i<(int)nums.size();i++){\n            if (used[i]) continue;\n            used[i]=1;\n            path.push_back(nums[i]);\n            dfs();\n            path.pop_back();\n            used[i]=0;\n        }\n    };\n    dfs();\n    return res;\n}\n"
    },
    "learning": {
      "pattern": "回溯树搜索（路径、选择列表、结束条件）",
      "coreQuestion": "每一层代表“做什么选择”？",
      "framework": "路径 path 表示当前解，递归前做选择，递归后撤销选择。",
      "steps": [
        "明确结束条件",
        "枚举当前层可选项",
        "回溯撤销恢复现场"
      ],
      "pitfalls": [
        "忘记撤销状态",
        "去重策略放错层级",
        "剪枝条件不安全"
      ],
      "complexity": "通常是指数级，重点在剪枝。",
      "template": "void backtrack(路径, 选择列表) {\n    if (终止条件) {\n        res.add(路径); return;\n    }\n    for (选择 : 选择列表) {\n        做选择;\n        backtrack(路径, 选择列表);\n        撤销选择;\n    }\n}",
      "insight": "回溯算法本质上就是一棵‘决策树’的遍历。你只需要思考三个问题：路径、选择列表、结束条件。"
    },
    "description": "给定一个不含重复数字的数组 nums ，返回其所有可能的全排列。你可以按任意顺序返回答案。",
    "leetcodeSlug": "permutations",
    "handbookRef": {
      "leetcodeId": 46,
      "chapter": "第五章：回溯算法",
      "section": "5.1 回溯算法核心框架",
      "orderInSection": 1,
      "mdLine": 634
    },
    "track": "core"
  },
  {
    "id": "q098",
    "topicId": "ch05_backtracking",
    "type": "multiple_choice",
    "question": "【组合总和】 为避免重复组合，递归应？",
    "options": [
      "传递 start 下标保证非递减选择",
      "每层从 0 开始",
      "随机选择",
      "排序后去重即可"
    ],
    "correctIndex": 0,
    "explanation": "同一层从 start 开始可复用当前元素。",
    "xp": 12,
    "learning": {
      "pattern": "回溯树搜索（路径、选择列表、结束条件）",
      "coreQuestion": "每一层代表“做什么选择”？",
      "framework": "路径 path 表示当前解，递归前做选择，递归后撤销选择。",
      "steps": [
        "明确结束条件",
        "枚举当前层可选项",
        "回溯撤销恢复现场"
      ],
      "pitfalls": [
        "忘记撤销状态",
        "去重策略放错层级",
        "剪枝条件不安全"
      ],
      "complexity": "通常是指数级，重点在剪枝。",
      "template": "void backtrack(路径, 选择列表) {\n    if (终止条件) {\n        res.add(路径); return;\n    }\n    for (选择 : 选择列表) {\n        做选择;\n        backtrack(路径, 选择列表);\n        撤销选择;\n    }\n}",
      "insight": "回溯算法本质上就是一棵‘决策树’的遍历。你只需要思考三个问题：路径、选择列表、结束条件。"
    },
    "description": "本题对应《组合总和》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 backtracking 相关方法中完成复杂度优化。",
    "codeSnippet": {
      "python": "def backtrack(path, used, nums, ans):\n    if len(path) == len(nums):\n        ans.append(path[:]); return\n    for i, x in enumerate(nums):\n        if used[i]: continue\n        used[i] = True\n        path.append(x)\n        backtrack(path, used, nums, ans)\n        path.pop()\n        used[i] = False",
      "java": "void backtrack(List<Integer> path, boolean[] used, int[] nums, List<List<Integer>> ans) {\n    if (path.size() == nums.length) { ans.add(new ArrayList<>(path)); return; }\n    for (int i = 0; i < nums.length; i++) {\n        if (used[i]) continue;\n        used[i] = true;\n        path.add(nums[i]);\n        backtrack(path, used, nums, ans);\n        path.remove(path.size() - 1);\n        used[i] = false;\n    }\n}",
      "cpp": "void backtrack(vector<int>& path, vector<int>& used, vector<int>& nums, vector<vector<int>>& ans) {\n    if (path.size() == nums.size()) { ans.push_back(path); return; }\n    for (int i = 0; i < (int)nums.size(); i++) {\n        if (used[i]) continue;\n        used[i] = 1;\n        path.push_back(nums[i]);\n        backtrack(path, used, nums, ans);\n        path.pop_back();\n        used[i] = 0;\n    }\n}"
    },
    "leetcodeSlug": "combination-sum",
    "track": "extra"
  },
  {
    "id": "q099",
    "topicId": "ch05_backtracking",
    "type": "multiple_choice",
    "question": "【N 皇后】 剪枝时常维护哪些集合？",
    "options": [
      "列、主对角线、副对角线",
      "行号和列号数组",
      "层序队列",
      "哈希频次"
    ],
    "correctIndex": 0,
    "explanation": "O(1) 判断冲突。",
    "xp": 12,
    "learning": {
      "pattern": "回溯树搜索（路径、选择列表、结束条件）",
      "coreQuestion": "每一层代表“做什么选择”？",
      "framework": "路径 path 表示当前解，递归前做选择，递归后撤销选择。",
      "steps": [
        "明确结束条件",
        "枚举当前层可选项",
        "回溯撤销恢复现场"
      ],
      "pitfalls": [
        "忘记撤销状态",
        "去重策略放错层级",
        "剪枝条件不安全"
      ],
      "complexity": "通常是指数级，重点在剪枝。",
      "template": "void backtrack(路径, 选择列表) {\n    if (终止条件) {\n        res.add(路径); return;\n    }\n    for (选择 : 选择列表) {\n        做选择;\n        backtrack(路径, 选择列表);\n        撤销选择;\n    }\n}",
      "insight": "回溯算法本质上就是一棵‘决策树’的遍历。你只需要思考三个问题：路径、选择列表、结束条件。"
    },
    "description": "设计一个算法，将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。",
    "codeSnippet": {
      "python": "def solveNQueens(n):\n    res = []\n    cols = set()\n    diag1 = set()  # r-c\n    diag2 = set()  # r+c\n    board = [['.']*n for _ in range(n)]\n    def backtrack(r):\n        if r == n:\n            res.append([''.join(row) for row in board])\n            return\n        for c in range(n):\n            if c in cols or (r-c) in diag1 or (r+c) in diag2:\n                continue\n            cols.add(c); diag1.add(r-c); diag2.add(r+c)\n            board[r][c] = 'Q'\n            backtrack(r+1)\n            board[r][c] = '.'\n            cols.remove(c); diag1.remove(r-c); diag2.remove(r+c)\n    backtrack(0)\n    return res\n",
      "java": "public List<List<String>> solveNQueens(int n) {\n    List<List<String>> res = new ArrayList<>();\n    boolean[] cols = new boolean[n];\n    boolean[] diag1 = new boolean[2*n];\n    boolean[] diag2 = new boolean[2*n];\n    char[][] board = new char[n][n];\n    for (int i=0;i<n;i++) Arrays.fill(board[i], '.');\n    backtrack(0, n, cols, diag1, diag2, board, res);\n    return res;\n}\nprivate void backtrack(int r, int n, boolean[] cols, boolean[] d1, boolean[] d2, char[][] board, List<List<String>> res) {\n    if (r == n) {\n        List<String> one = new ArrayList<>();\n        for (int i=0;i<n;i++) one.add(new String(board[i]));\n        res.add(one);\n        return;\n    }\n    for (int c=0;c<n;c++) {\n        int i1 = r - c + n;\n        int i2 = r + c;\n        if (cols[c] || d1[i1] || d2[i2]) continue;\n        cols[c] = d1[i1] = d2[i2] = true;\n        board[r][c] = 'Q';\n        backtrack(r+1, n, cols, d1, d2, board, res);\n        board[r][c] = '.';\n        cols[c] = d1[i1] = d2[i2] = false;\n    }\n}\n",
      "cpp": "vector<vector<string>> solveNQueens(int n) {\n    vector<vector<string>> res;\n    vector<string> board(n, string(n, '.'));\n    vector<int> col(n,0), d1(2*n,0), d2(2*n,0);\n    function<void(int)> dfs = [&](int r){\n        if (r==n){ res.push_back(board); return; }\n        for(int c=0;c<n;c++){\n            int i1=r-c+n, i2=r+c;\n            if(col[c]||d1[i1]||d2[i2]) continue;\n            col[c]=d1[i1]=d2[i2]=1;\n            board[r][c]='Q';\n            dfs(r+1);\n            board[r][c]='.';\n            col[c]=d1[i1]=d2[i2]=0;\n        }\n    };\n    dfs(0);\n    return res;\n}\n"
    },
    "leetcodeSlug": "n-queens",
    "handbookRef": {
      "leetcodeId": 51,
      "chapter": "第五章：回溯算法",
      "section": "5.1 回溯算法核心框架",
      "orderInSection": 4,
      "mdLine": 718
    },
    "track": "core"
  },
  {
    "id": "q100",
    "topicId": "ch12_interview",
    "type": "multiple_choice",
    "question": "【前 K 个高频元素】 Python 中常见库是？",
    "options": [
      "heapq",
      "bisect",
      "itertools",
      "collections.deque"
    ],
    "correctIndex": 0,
    "explanation": "heapq.nlargest 可直接取前 K。",
    "xp": 14,
    "codeSnippet": {
      "python": "import heapq\ndef topK(nums, k):\n    from collections import Counter\n    cnt = Counter(nums)\n    return [x for x, _ in heapq.nlargest(k, cnt.items(), key=lambda p: p[1])]",
      "java": "int[] topK(int[] nums, int k) {\n    Map<Integer,Integer> cnt = new HashMap<>();\n    for (int x : nums) cnt.put(x, cnt.getOrDefault(x, 0) + 1);\n    PriorityQueue<int[]> pq = new PriorityQueue<>((a,b)->a[1]-b[1]);\n    for (var e : cnt.entrySet()) {\n        pq.offer(new int[]{e.getKey(), e.getValue()});\n        if (pq.size() > k) pq.poll();\n    }\n    int[] ans = new int[k];\n    for (int i = k - 1; i >= 0; i--) ans[i] = pq.poll()[0];\n    return ans;\n}",
      "cpp": "vector<int> topK(vector<int>& nums, int k) {\n    unordered_map<int,int> cnt;\n    for (int x : nums) cnt[x]++;\n    using P = pair<int,int>;\n    priority_queue<P, vector<P>, greater<P>> pq;\n    for (auto &e : cnt) {\n        pq.push({e.second, e.first});\n        if ((int)pq.size() > k) pq.pop();\n    }\n    vector<int> ans;\n    while (!pq.empty()) { ans.push_back(pq.top().second); pq.pop(); }\n    return ans;\n}"
    },
    "learning": {
      "pattern": "堆/优先队列 TopK 框架",
      "coreQuestion": "需要实时维护“前 K 大/小”吗？",
      "framework": "小顶堆维护前 K 大，大顶堆维护前 K 小。",
      "steps": [
        "先统计频次或构造比较键",
        "堆大小超过 K 时弹出",
        "最终导出结果"
      ],
      "pitfalls": [
        "比较器方向写反",
        "忘记限制堆大小",
        "输出顺序与题意不一致"
      ],
      "complexity": "常见 O(n log k)。",
      "template": "先确定使用小顶堆还是大顶堆。\n遍历过程中维护堆大小和堆顶语义，保证最终堆内即答案集合。",
      "insight": "堆适合维护“动态前 K 名”，将全量排序降为局部有序维护。"
    },
    "description": "给你一个整数数组 nums 和一个整数 k ，请你返回其中出现频率前 k 高的元素。你可以按任意顺序返回答案。",
    "leetcodeSlug": "top-k-frequent-elements-review",
    "track": "extra"
  },
  {
    "id": "q101",
    "topicId": "ch03_binary_search",
    "track": "core",
    "type": "multiple_choice",
    "question": "【搜索插入位置】 二分查找的正确边界策略是？",
    "options": [
      "使用 left<=right，最后返回 left 作为插入点",
      "使用 left<right，最后返回 right+1",
      "从中间向两边线性扩展",
      "每次只移动一个指针，避免跳过"
    ],
    "correctIndex": 0,
    "explanation": "标准二分：循环结束时 left 指向第一个 >= target 的位置（也就是插入位置）。",
    "xp": 12,
    "learning": {
      "pattern": "二分搜索（找边界/插入点）",
      "coreQuestion": "循环结束时，left/right 分别代表什么含义？插入点为何是 left？",
      "framework": "维护区间不变量：在 [left, right] 中搜索；通过比较 nums[mid] 与 target 收缩边界。",
      "steps": [],
      "pitfalls": [
        "mid 计算溢出（某些语言）",
        "死循环（边界更新不正确）",
        "返回 right vs left 搞反"
      ],
      "complexity": "目标通常是时间 O(n) 或 O(n log n)，空间 O(1)~O(n)。",
      "template": "维护区间不变量：在 [left, right] 中搜索；通过比较 nums[mid] 与 target 收缩边界。",
      "insight": "二分题的关键不是模板背诵，而是明确不变量：你到底在找“任意命中”还是“第一个/最后一个满足条件的位置”。"
    },
    "codeSnippet": {
      "python": "def searchInsert(nums, target):\n    left, right = 0, len(nums) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if nums[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return left\n",
      "java": "public int searchInsert(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (nums[mid] < target) {\n            left = mid + 1;\n        } else {\n            right = mid - 1;\n        }\n    }\n    return left;\n}\n",
      "cpp": "int searchInsert(vector<int>& nums, int target) {\n    int left = 0, right = (int)nums.size() - 1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (nums[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return left;\n}\n"
    },
    "description": "给定一个排序数组 nums 和一个目标值 target，如果 target 存在返回其下标；否则返回它将会被按顺序插入的位置。",
    "leetcodeSlug": "search-insert-position",
    "handbookRef": {
      "leetcodeId": 35,
      "chapter": "第三章：二分搜索",
      "section": "3.1 二分搜索核心模板",
      "orderInSection": 2,
      "mdLine": 455
    }
  },
  {
    "id": "q102",
    "topicId": "ch05_backtracking",
    "track": "core",
    "type": "multiple_choice",
    "question": "【组合】 回溯中用于避免重复组合的关键是？",
    "options": [
      "使用 startIndex 控制下一层从哪里选",
      "每层都从 1 重新开始选",
      "对 path 排序后再去重",
      "用哈希表记录所有出现过的 path"
    ],
    "correctIndex": 0,
    "explanation": "组合是“无序选择”，通过 startIndex 保证元素只向后选，从源头避免重复。",
    "xp": 14,
    "learning": {
      "pattern": "回溯：组合（startIndex）",
      "coreQuestion": "如何保证不出现 [1,2] 和 [2,1] 这种排列重复？",
      "framework": "用 backtrack(start) 枚举下一次可选的起点，path 表示当前选择路径。",
      "steps": [],
      "pitfalls": [
        "忘记回溯撤销选择",
        "startIndex 传错导致重复/漏解",
        "剪枝条件写反"
      ],
      "complexity": "目标通常是时间 O(n) 或 O(n log n)，空间 O(1)~O(n)。",
      "template": "用 backtrack(start) 枚举下一次可选的起点，path 表示当前选择路径。",
      "insight": "回溯的“去重”优先用结构约束（startIndex/used），而不是事后用 set。"
    },
    "codeSnippet": {
      "python": "def combine(n, k):\n    res = []\n    path = []\n    def backtrack(start):\n        if len(path) == k:\n            res.append(path[:])\n            return\n        for i in range(start, n + 1):\n            path.append(i)\n            backtrack(i + 1)\n            path.pop()\n    backtrack(1)\n    return res\n",
      "java": "public List<List<Integer>> combine(int n, int k) {\n    List<List<Integer>> res = new ArrayList<>();\n    List<Integer> path = new ArrayList<>();\n    backtrack(1, n, k, path, res);\n    return res;\n}\nprivate void backtrack(int start, int n, int k, List<Integer> path, List<List<Integer>> res) {\n    if (path.size() == k) {\n        res.add(new ArrayList<>(path));\n        return;\n    }\n    for (int i = start; i <= n; i++) {\n        path.add(i);\n        backtrack(i + 1, n, k, path, res);\n        path.remove(path.size() - 1);\n    }\n}\n",
      "cpp": "vector<vector<int>> combine(int n, int k) {\n    vector<vector<int>> res;\n    vector<int> path;\n    function<void(int)> backtrack = [&](int start){\n        if ((int)path.size() == k) {\n            res.push_back(path);\n            return;\n        }\n        for (int i = start; i <= n; i++) {\n            path.push_back(i);\n            backtrack(i + 1);\n            path.pop_back();\n        }\n    };\n    backtrack(1);\n    return res;\n}\n"
    },
    "description": "给定两个整数 n 和 k，返回 1..n 中所有可能的 k 个数的组合。",
    "leetcodeSlug": "combinations",
    "handbookRef": {
      "leetcodeId": 77,
      "chapter": "第五章：回溯算法",
      "section": "5.1 回溯算法核心框架",
      "orderInSection": 3,
      "mdLine": 689
    }
  },
  {
    "id": "q103",
    "topicId": "ch05_backtracking",
    "track": "core",
    "type": "multiple_choice",
    "question": "【子集】 生成所有子集的回溯策略是？",
    "options": [
      "每个元素都做“选/不选”的分支，并记录每个节点的 path",
      "只记录长度为 n 的 path",
      "先排序再只取连续片段",
      "用双指针滑窗扩展"
    ],
    "correctIndex": 0,
    "explanation": "子集枚举可视作一棵决策树，每个节点的 path 都是一个有效子集。",
    "xp": 14,
    "learning": {
      "pattern": "回溯：子集（树的每个节点都是答案）",
      "coreQuestion": "为什么每次进入 backtrack 就可以把 path 加入答案？",
      "framework": "用 backtrack(start) 从 start 开始尝试加入元素；每次都先记录当前 path。",
      "steps": [],
      "pitfalls": [
        "漏掉空集",
        "startIndex 更新错误",
        "结果引用同一个 path 导致被修改"
      ],
      "complexity": "目标通常是时间 O(n) 或 O(n log n)，空间 O(1)~O(n)。",
      "template": "用 backtrack(start) 从 start 开始尝试加入元素；每次都先记录当前 path。",
      "insight": "子集问题的“答案分布”在整棵树的所有节点，而不是只在叶子结点。"
    },
    "codeSnippet": {
      "python": "def subsets(nums):\n    res = []\n    path = []\n    def backtrack(start):\n        res.append(path[:])\n        for i in range(start, len(nums)):\n            path.append(nums[i])\n            backtrack(i + 1)\n            path.pop()\n    backtrack(0)\n    return res\n",
      "java": "public List<List<Integer>> subsets(int[] nums) {\n    List<List<Integer>> res = new ArrayList<>();\n    List<Integer> path = new ArrayList<>();\n    backtrack(0, nums, path, res);\n    return res;\n}\nprivate void backtrack(int start, int[] nums, List<Integer> path, List<List<Integer>> res) {\n    res.add(new ArrayList<>(path));\n    for (int i = start; i < nums.length; i++) {\n        path.add(nums[i]);\n        backtrack(i + 1, nums, path, res);\n        path.remove(path.size() - 1);\n    }\n}\n",
      "cpp": "vector<vector<int>> subsets(vector<int>& nums) {\n    vector<vector<int>> res;\n    vector<int> path;\n    function<void(int)> backtrack = [&](int start){\n        res.push_back(path);\n        for (int i = start; i < (int)nums.size(); i++) {\n            path.push_back(nums[i]);\n            backtrack(i + 1);\n            path.pop_back();\n        }\n    };\n    backtrack(0);\n    return res;\n}\n"
    },
    "description": "给你一个整数数组 nums，返回该数组所有可能的子集（幂集）。",
    "leetcodeSlug": "subsets",
    "handbookRef": {
      "leetcodeId": 78,
      "chapter": "第五章：回溯算法",
      "section": "5.1 回溯算法核心框架",
      "orderInSection": 2,
      "mdLine": 662
    }
  },
  {
    "id": "q104",
    "topicId": "ch08_trees",
    "track": "core",
    "type": "multiple_choice",
    "xp": 14,
    "leetcodeSlug": "maximum-depth-of-binary-tree",
    "handbookRef": {
      "leetcodeId": 104,
      "chapter": "第八章：二叉树算法",
      "section": "8.1 二叉树遍历框架",
      "orderInSection": 2,
      "mdLine": 1072
    },
    "question": "【二叉树最大深度】 DFS 递归的返回值通常表示？",
    "options": [
      "以当前节点为根的最大深度",
      "当前节点的值",
      "节点总数",
      "树是否平衡"
    ],
    "correctIndex": 0,
    "explanation": "递归函数返回“子树的答案”，当前节点只做组合：1 + max(left,right)。",
    "description": "给定二叉树 root，返回其最大深度（从根到最远叶子节点的最长路径节点数）。",
    "learning": {
      "pattern": "树递归：后序组合",
      "coreQuestion": "递归函数该返回什么，才能在父节点一步合并？",
      "framework": "定义 dfs(node) 返回子树深度：dfs = 1 + max(dfs(left), dfs(right))。",
      "steps": [],
      "pitfalls": [
        "空节点返回 0",
        "把深度与节点数混淆"
      ],
      "complexity": "目标通常是时间 O(n) 或 O(n log n)，空间 O(1)~O(n)。",
      "template": "定义 dfs(node) 返回子树深度：dfs = 1 + max(dfs(left), dfs(right))。",
      "insight": "树题往往是“定义子问题 + 后序合并”。先定义 dfs 的含义，代码自然就出来。"
    },
    "codeSnippet": {
      "python": "def maxDepth(root):\n    if not root: return 0\n    left = maxDepth(root.left)\n    right = maxDepth(root.right)\n    return 1 + max(left, right)\n",
      "java": "public int maxDepth(TreeNode root) {\n    if (root == null) return 0;\n    int left = maxDepth(root.left);\n    int right = maxDepth(root.right);\n    return 1 + Math.max(left, right);\n}\n",
      "cpp": "int maxDepth(TreeNode* root) {\n    if (!root) return 0;\n    int left = maxDepth(root->left);\n    int right = maxDepth(root->right);\n    return 1 + max(left, right);\n}\n"
    }
  },
  {
    "id": "q105",
    "topicId": "ch06_bfs",
    "track": "core",
    "type": "multiple_choice",
    "question": "【二叉树的最小深度】 为什么常用 BFS 而不是 DFS？",
    "options": [
      "BFS 按层推进，第一次遇到叶子节点就是最小深度",
      "DFS 无法遍历二叉树",
      "BFS 一定比 DFS 更省空间",
      "DFS 只能求最大值"
    ],
    "correctIndex": 0,
    "explanation": "最短路径/最小层数类问题，BFS 自带“最先到达即最短”的性质。",
    "xp": 14,
    "learning": {
      "pattern": "BFS：最短层数",
      "coreQuestion": "如何利用“队列按层遍历”直接得到最小深度？",
      "framework": "用 queue 做层序遍历，每层 depth+1；遇到第一个叶子结点立即返回。",
      "steps": [],
      "pitfalls": [
        "把只有一个孩子的节点当作叶子",
        "忘记按层计数",
        "空树边界"
      ],
      "complexity": "目标通常是时间 O(n) 或 O(n log n)，空间 O(1)~O(n)。",
      "template": "用 queue 做层序遍历，每层 depth+1；遇到第一个叶子结点立即返回。",
      "insight": "BFS 很适合“最短/最小步数”问题：一旦命中目标就能提前结束。"
    },
    "codeSnippet": {
      "python": "from collections import deque\n\ndef minDepth(root):\n    if not root: return 0\n    queue = deque([(root, 1)])\n    while queue:\n        node, depth = queue.popleft()\n        if not node.left and not node.right:\n            return depth\n        if node.left: queue.append((node.left, depth + 1))\n        if node.right: queue.append((node.right, depth + 1))\n",
      "java": "public int minDepth(TreeNode root) {\n    if (root == null) return 0;\n    Deque<TreeNode> queue = new ArrayDeque<>();\n    Deque<Integer> depthQ = new ArrayDeque<>();\n    queue.add(root);\n    depthQ.add(1);\n    while (!queue.isEmpty()) {\n        TreeNode node = queue.poll();\n        int depth = depthQ.poll();\n        if (node.left == null && node.right == null) return depth;\n        if (node.left != null) { queue.add(node.left); depthQ.add(depth + 1); }\n        if (node.right != null) { queue.add(node.right); depthQ.add(depth + 1); }\n    }\n    return 0;\n}\n",
      "cpp": "int minDepth(TreeNode* root) {\n    if (!root) return 0;\n    queue<pair<TreeNode*, int>> q;\n    q.push({root, 1});\n    while (!q.empty()) {\n        auto [node, depth] = q.front(); q.pop();\n        if (!node->left && !node->right) return depth;\n        if (node->left) q.push({node->left, depth + 1});\n        if (node->right) q.push({node->right, depth + 1});\n    }\n    return 0;\n}\n"
    },
    "description": "给定一棵二叉树，找出其最小深度（从根节点到最近叶子节点的最短路径上的节点数）。",
    "leetcodeSlug": "minimum-depth-of-binary-tree",
    "handbookRef": {
      "leetcodeId": 111,
      "chapter": "第六章：BFS算法",
      "section": "6.1 BFS核心框架",
      "orderInSection": 1,
      "mdLine": 766
    }
  },
  {
    "id": "q106",
    "topicId": "ch07_dynamic_programming",
    "track": "core",
    "type": "multiple_choice",
    "xp": 14,
    "leetcodeSlug": "best-time-to-buy-and-sell-stock-iii",
    "handbookRef": {
      "leetcodeId": 123,
      "chapter": "第七章：动态规划",
      "section": "7.3 股票买卖系列",
      "orderInSection": 2,
      "mdLine": 997
    },
    "question": "【股票 III】 最多两次交易的 DP 关键状态是？",
    "options": [
      "次数k + 是否持股 的状态机 DP",
      "排序后贪心",
      "双指针夹逼",
      "并查集合并区间"
    ],
    "correctIndex": 0,
    "explanation": "经典股票 DP：dp[k][0/1] 表示完成 k 次交易后不持股/持股的最大利润。",
    "description": "给定 prices，最多完成两笔交易（买入+卖出为一笔），求最大利润（不能同时参与多笔交易）。",
    "learning": {
      "pattern": "DP：股票状态机（k 次交易）",
      "coreQuestion": "如何把“买/卖/不操作”写成可转移的状态？",
      "framework": "用 dp[k][0/1] 维护状态：不持股/持股。遍历价格更新。",
      "steps": [],
      "pitfalls": [
        "交易次数定义不清（卖出算一次）",
        "更新顺序错误导致覆盖"
      ],
      "complexity": "目标通常是时间 O(n) 或 O(n log n)，空间 O(1)~O(n)。",
      "template": "用 dp[k][0/1] 维护状态：不持股/持股。遍历价格更新。",
      "insight": "股票题像状态机：每一天都在“持/不持”之间切换，DP 记录最优。"
    },
    "codeSnippet": {
      "python": "def maxProfit(prices):\n    dp10, dp11 = 0, float('-inf')\n    dp20, dp21 = 0, float('-inf')\n    for p in prices:\n        dp20 = max(dp20, dp21 + p)\n        dp21 = max(dp21, dp10 - p)\n        dp10 = max(dp10, dp11 + p)\n        dp11 = max(dp11, -p)\n    return dp20\n",
      "java": "public int maxProfit(int[] prices) {\n    int dp10 = 0, dp20 = 0;\n    int dp11 = Integer.MIN_VALUE, dp21 = Integer.MIN_VALUE;\n    for (int p : prices) {\n        dp20 = Math.max(dp20, dp21 + p);\n        dp21 = Math.max(dp21, dp10 - p);\n        dp10 = Math.max(dp10, dp11 + p);\n        dp11 = Math.max(dp11, -p);\n    }\n    return dp20;\n}\n",
      "cpp": "int maxProfit(vector<int>& prices) {\n    int dp10 = 0, dp20 = 0;\n    int dp11 = INT_MIN, dp21 = INT_MIN;\n    for (int p : prices) {\n        dp20 = max(dp20, dp21 + p);\n        dp21 = max(dp21, dp10 - p);\n        dp10 = max(dp10, dp11 + p);\n        dp11 = max(dp11, -p);\n    }\n    return dp20;\n}\n"
    }
  },
  {
    "id": "q107",
    "topicId": "ch11_bit",
    "track": "core",
    "type": "multiple_choice",
    "xp": 14,
    "leetcodeSlug": "single-number",
    "handbookRef": {
      "leetcodeId": 136,
      "chapter": "第十一章：位运算技巧",
      "section": "11.1 常用位操作",
      "orderInSection": 1,
      "mdLine": 1304
    },
    "question": "【只出现一次的数字】 使用异或的关键性质是？",
    "options": [
      "a^a=0 且 a^0=a",
      "a&a=a",
      "a|a=0",
      "异或不满足交换律"
    ],
    "correctIndex": 0,
    "explanation": "异或满足交换律/结合律，成对元素会抵消为 0，剩下的就是答案。",
    "description": "给定非空整数数组，除一个元素只出现一次外，其余元素均出现两次，找出只出现一次的元素。",
    "learning": {
      "pattern": "位运算：异或消消乐",
      "coreQuestion": "为什么把所有数异或起来就等于答案？",
      "framework": "利用异或的交换律/结合律以及 a^a=0，遍历累计 xor。",
      "steps": [],
      "pitfalls": [
        "把“出现两次”误解成其它次数",
        "忘记初始化为 0"
      ],
      "complexity": "目标通常是时间 O(n) 或 O(n log n)，空间 O(1)~O(n)。",
      "template": "利用异或的交换律/结合律以及 a^a=0，遍历累计 xor。",
      "insight": "位运算题的“魔法”来自代数性质：先写等式，再做化简。"
    },
    "codeSnippet": {
      "python": "def singleNumber(nums):\n    x = 0\n    for v in nums:\n        x ^= v\n    return x\n",
      "java": "public int singleNumber(int[] nums) {\n    int x = 0;\n    for (int v : nums) x ^= v;\n    return x;\n}\n",
      "cpp": "int singleNumber(vector<int>& nums) {\n    int x = 0;\n    for (int v : nums) x ^= v;\n    return x;\n}\n"
    }
  },
  {
    "id": "q108",
    "topicId": "ch08_trees",
    "track": "core",
    "type": "multiple_choice",
    "xp": 14,
    "leetcodeSlug": "binary-tree-preorder-traversal",
    "handbookRef": {
      "leetcodeId": 144,
      "chapter": "第八章：二叉树算法",
      "section": "8.1 二叉树遍历框架",
      "orderInSection": 1,
      "mdLine": 1029
    },
    "question": "【二叉树前序遍历】 递归前序的“访问位置”是？",
    "options": [
      "进入节点时（左右子树之前）",
      "左子树之后",
      "右子树之后",
      "任何时候都一样"
    ],
    "correctIndex": 0,
    "explanation": "前序遍历顺序：根-左-右，所以在递归一开始就把 node.val 加入结果。",
    "description": "给定二叉树 root，返回其节点值的前序遍历。",
    "learning": {
      "pattern": "树遍历：前序",
      "coreQuestion": "前序/中序/后序差别本质在哪里？",
      "framework": "递归框架不变，只是“处理当前节点”的位置不同。",
      "steps": [],
      "pitfalls": [
        "忘记处理空节点",
        "结果数组作用域错误"
      ],
      "complexity": "目标通常是时间 O(n) 或 O(n log n)，空间 O(1)~O(n)。",
      "template": "递归框架不变，只是“处理当前节点”的位置不同。",
      "insight": "遍历的三种序只是“访问时机”不同：进入、左右之间、退出。掌握框架就能一通百通。"
    },
    "codeSnippet": {
      "python": "def preorderTraversal(root):\n    res = []\n    def dfs(node):\n        if not node: return\n        res.append(node.val)\n        dfs(node.left)\n        dfs(node.right)\n    dfs(root)\n    return res\n",
      "java": "public List<Integer> preorderTraversal(TreeNode root) {\n    List<Integer> res = new ArrayList<>();\n    dfs(root, res);\n    return res;\n}\nprivate void dfs(TreeNode node, List<Integer> res) {\n    if (node == null) return;\n    res.add(node.val);\n    dfs(node.left, res);\n    dfs(node.right, res);\n}\n",
      "cpp": "vector<int> preorderTraversal(TreeNode* root) {\n    vector<int> res;\n    function<void(TreeNode*)> dfs = [&](TreeNode* node){\n        if (!node) return;\n        res.push_back(node->val);\n        dfs(node->left);\n        dfs(node->right);\n    };\n    dfs(root);\n    return res;\n}\n"
    }
  },
  {
    "id": "q109",
    "topicId": "ch11_bit",
    "track": "core",
    "type": "multiple_choice",
    "xp": 14,
    "leetcodeSlug": "power-of-two",
    "handbookRef": {
      "leetcodeId": 231,
      "chapter": "第十一章：位运算技巧",
      "section": "11.1 常用位操作",
      "orderInSection": 2,
      "mdLine": 1322
    },
    "question": "【2 的幂】 位运算判断 2^k 的常用式子是？",
    "options": [
      "n>0 且 (n & (n-1)) == 0",
      "n%2==1",
      "(n| (n-1))==0",
      "n==0"
    ],
    "correctIndex": 0,
    "explanation": "2 的幂二进制只有一个 1，n & (n-1) 会把最低位 1 清零，因此结果为 0。",
    "description": "给定一个整数 n，判断它是否为 2 的幂。",
    "learning": {
      "pattern": "位运算：最低位 1",
      "coreQuestion": "为何 n&(n-1) 能去掉最低位 1？",
      "framework": "当 n 为 2 的幂时二进制只有一个 1；清零后为 0。",
      "steps": [],
      "pitfalls": [
        "忘记处理 n<=0",
        "把 1 当作非幂"
      ],
      "complexity": "目标通常是时间 O(n) 或 O(n log n)，空间 O(1)~O(n)。",
      "template": "当 n 为 2 的幂时二进制只有一个 1；清零后为 0。",
      "insight": "很多位运算套路都是围绕“最低位 1”展开：提取、消去、计数。"
    },
    "codeSnippet": {
      "python": "def isPowerOfTwo(n):\n    return n > 0 and (n & (n - 1)) == 0\n",
      "java": "public boolean isPowerOfTwo(int n) {\n    return n > 0 && ( (n & (n - 1)) == 0 );\n}\n",
      "cpp": "bool isPowerOfTwo(int n) {\n    return n > 0 && ((n & (n - 1)) == 0);\n}\n"
    }
  },
  {
    "id": "q110",
    "topicId": "ch12_interview",
    "track": "core",
    "type": "multiple_choice",
    "xp": 18,
    "leetcodeSlug": "ugly-number-ii",
    "handbookRef": {
      "leetcodeId": 264,
      "chapter": "第十二章：经典面试题",
      "section": "12.1 丑数系列",
      "orderInSection": 1,
      "mdLine": 1344
    },
    "question": "【丑数 II】 求第 n 个丑数的常用方法是？",
    "options": [
      "三指针 DP 合并有序序列",
      "二分查找答案",
      "并查集",
      "单调栈"
    ],
    "correctIndex": 0,
    "explanation": "用指针 i2/i3/i5 生成下一个最小丑数，避免重复。",
    "description": "给定正整数 n，返回第 n 个丑数。丑数是只包含质因数 2、3、5 的正整数。",
    "learning": {
      "pattern": "DP：多路归并（指针）",
      "coreQuestion": "如何在不排序的情况下生成递增丑数序列？",
      "framework": "dp[0]=1，维护 i2/i3/i5 指向下一个候选；每次取最小并推进对应指针。",
      "steps": [],
      "pitfalls": [
        "重复值要同时推进多个指针",
        "n 从 1 开始"
      ],
      "complexity": "目标通常是时间 O(n) 或 O(n log n)，空间 O(1)~O(n)。",
      "template": "dp[0]=1，维护 i2/i3/i5 指向下一个候选；每次取最小并推进对应指针。",
      "insight": "这类题的本质是“合并多个有序生成器”，指针就是生成器的游标。"
    },
    "codeSnippet": {
      "python": "def nthUglyNumber(n):\n    dp = [0]*n\n    dp[0] = 1\n    i2 = i3 = i5 = 0\n    for i in range(1, n):\n        a, b, c = dp[i2]*2, dp[i3]*3, dp[i5]*5\n        dp[i] = min(a, b, c)\n        if dp[i] == a: i2 += 1\n        if dp[i] == b: i3 += 1\n        if dp[i] == c: i5 += 1\n    return dp[-1]\n",
      "java": "public int nthUglyNumber(int n) {\n    int[] dp = new int[n];\n    dp[0] = 1;\n    int i2 = 0, i3 = 0, i5 = 0;\n    for (int i = 1; i < n; i++) {\n        int a = dp[i2] * 2, b = dp[i3] * 3, c = dp[i5] * 5;\n        int v = Math.min(a, Math.min(b, c));\n        dp[i] = v;\n        if (v == a) i2++;\n        if (v == b) i3++;\n        if (v == c) i5++;\n    }\n    return dp[n-1];\n}\n",
      "cpp": "int nthUglyNumber(int n) {\n    vector<int> dp(n);\n    dp[0] = 1;\n    int i2=0, i3=0, i5=0;\n    for (int i=1;i<n;i++){\n        int a=dp[i2]*2, b=dp[i3]*3, c=dp[i5]*5;\n        int v=min(a, min(b,c));\n        dp[i]=v;\n        if (v==a) i2++;\n        if (v==b) i3++;\n        if (v==c) i5++;\n    }\n    return dp[n-1];\n}\n"
    }
  },
  {
    "id": "q111",
    "topicId": "ch12_interview",
    "track": "core",
    "type": "multiple_choice",
    "xp": 14,
    "leetcodeSlug": "find-median-from-data-stream",
    "handbookRef": {
      "leetcodeId": 295,
      "chapter": "第十二章：经典面试题",
      "section": "12.2 堆的应用",
      "orderInSection": 1,
      "mdLine": 1373
    },
    "question": "【数据流的中位数】 常用的数据结构组合是？",
    "options": [
      "大顶堆 + 小顶堆",
      "单调栈",
      "并查集",
      "前缀和数组"
    ],
    "correctIndex": 0,
    "explanation": "用两个堆维持左右两半：maxHeap 保存较小一半，minHeap 保存较大一半。",
    "description": "设计数据结构支持 addNum 与 findMedian，在不断添加数字的数据流中实时返回中位数。",
    "learning": {
      "pattern": "堆：双堆维护中位数",
      "coreQuestion": "如何保持两堆元素数量平衡且顺序正确？",
      "framework": "maxHeap 存左半，minHeap 存右半；保证 size 差不超过 1 且 maxHeap.top <= minHeap.top。",
      "steps": [],
      "pitfalls": [
        "平衡步骤顺序错误",
        "偶数个元素时取平均"
      ],
      "complexity": "目标通常是时间 O(n) 或 O(n log n)，空间 O(1)~O(n)。",
      "template": "maxHeap 存左半，minHeap 存右半；保证 size 差不超过 1 且 maxHeap.top <= minHeap.top。",
      "insight": "把“全局排序”转化为“维护中间分割点”：两堆就是动态的分割线。"
    },
    "codeSnippet": {
      "python": "import heapq\n\nclass MedianFinder:\n    def __init__(self):\n        self.small = []  # max heap (neg)\n        self.large = []  # min heap\n\n    def addNum(self, num):\n        heapq.heappush(self.small, -num)\n        heapq.heappush(self.large, -heapq.heappop(self.small))\n        if len(self.large) > len(self.small):\n            heapq.heappush(self.small, -heapq.heappop(self.large))\n\n    def findMedian(self):\n        if len(self.small) > len(self.large):\n            return -self.small[0]\n        return (-self.small[0] + self.large[0]) / 2.0\n",
      "java": "class MedianFinder {\n    private PriorityQueue<Integer> small = new PriorityQueue<>((a,b)->b-a);\n    private PriorityQueue<Integer> large = new PriorityQueue<>();\n\n    public void addNum(int num) {\n        small.offer(num);\n        large.offer(small.poll());\n        if (large.size() > small.size()) {\n            small.offer(large.poll());\n        }\n    }\n\n    public double findMedian() {\n        if (small.size() > large.size()) return small.peek();\n        return (small.peek() + large.peek()) / 2.0;\n    }\n}\n",
      "cpp": "class MedianFinder {\npublic:\n    priority_queue<int> small;\n    priority_queue<int, vector<int>, greater<int>> large;\n\n    void addNum(int num) {\n        small.push(num);\n        large.push(small.top());\n        small.pop();\n        if (large.size() > small.size()) {\n            small.push(large.top());\n            large.pop();\n        }\n    }\n\n    double findMedian() {\n        if (small.size() > large.size()) return small.top();\n        return (small.top() + large.top()) / 2.0;\n    }\n};\n"
    }
  },
  {
    "id": "q112",
    "topicId": "ch04_prefix_diff",
    "track": "core",
    "type": "multiple_choice",
    "xp": 14,
    "leetcodeSlug": "range-sum-query-2d-immutable",
    "handbookRef": {
      "leetcodeId": 304,
      "chapter": "第四章：前缀和与差分数组",
      "section": "4.1 前缀和数组",
      "orderInSection": 2,
      "mdLine": 574
    },
    "question": "【二维区域和检索】 构建二维前缀和的核心公式是？",
    "options": [
      "sum = A+B-C+D（包含-排除）",
      "只累加行前缀",
      "只累加列前缀",
      "用并查集维护区域"
    ],
    "correctIndex": 0,
    "explanation": "二维前缀和用 inclusion-exclusion：S[i][j] = S[i-1][j]+S[i][j-1]-S[i-1][j-1]+matrix[i][j]。",
    "description": "给定二维矩阵，预处理后支持多次查询任意子矩形的元素和。",
    "learning": {
      "pattern": "前缀和：二维（包含-排除）",
      "coreQuestion": "子矩形求和如何从 O(mn) 降到 O(1)？",
      "framework": "预处理 prefix，查询用四个角包含-排除。",
      "steps": [],
      "pitfalls": [
        "下标偏移（多开一行一列）",
        "把减法写错导致重复计算"
      ],
      "complexity": "目标通常是时间 O(n) 或 O(n log n)，空间 O(1)~O(n)。",
      "template": "预处理 prefix，查询用四个角包含-排除。",
      "insight": "前缀和的精髓是“把重复累加提前做一次”，查询就变成常数次运算。"
    },
    "codeSnippet": {
      "python": "class NumMatrix:\n    def __init__(self, matrix):\n        m = len(matrix)\n        n = len(matrix[0]) if m else 0\n        self.pre = [[0]*(n+1) for _ in range(m+1)]\n        for i in range(m):\n            for j in range(n):\n                self.pre[i+1][j+1] = self.pre[i][j+1] + self.pre[i+1][j] - self.pre[i][j] + matrix[i][j]\n\n    def sumRegion(self, r1, c1, r2, c2):\n        p = self.pre\n        return p[r2+1][c2+1] - p[r1][c2+1] - p[r2+1][c1] + p[r1][c1]\n",
      "java": "class NumMatrix {\n    int[][] pre;\n    public NumMatrix(int[][] matrix) {\n        int m = matrix.length;\n        int n = m == 0 ? 0 : matrix[0].length;\n        pre = new int[m+1][n+1];\n        for (int i = 0; i < m; i++) {\n            for (int j = 0; j < n; j++) {\n                pre[i+1][j+1] = pre[i][j+1] + pre[i+1][j] - pre[i][j] + matrix[i][j];\n            }\n        }\n    }\n    public int sumRegion(int r1, int c1, int r2, int c2) {\n        return pre[r2+1][c2+1] - pre[r1][c2+1] - pre[r2+1][c1] + pre[r1][c1];\n    }\n}\n",
      "cpp": "class NumMatrix {\npublic:\n    vector<vector<int>> pre;\n    NumMatrix(vector<vector<int>>& matrix) {\n        int m = matrix.size();\n        int n = m? matrix[0].size():0;\n        pre.assign(m+1, vector<int>(n+1, 0));\n        for (int i=0;i<m;i++){\n            for (int j=0;j<n;j++){\n                pre[i+1][j+1] = pre[i][j+1] + pre[i+1][j] - pre[i][j] + matrix[i][j];\n            }\n        }\n    }\n    int sumRegion(int r1, int c1, int r2, int c2) {\n        return pre[r2+1][c2+1] - pre[r1][c2+1] - pre[r2+1][c1] + pre[r1][c1];\n    }\n};\n"
    }
  },
  {
    "id": "q113",
    "topicId": "ch04_prefix_diff",
    "track": "core",
    "type": "multiple_choice",
    "xp": 14,
    "leetcodeSlug": "range-addition",
    "handbookRef": {
      "leetcodeId": 370,
      "chapter": "第四章：前缀和与差分数组",
      "section": "4.2 差分数组",
      "orderInSection": 1,
      "mdLine": 602
    },
    "question": "【区间加法】 差分数组 diff 的含义是？",
    "options": [
      "diff[i] = nums[i] - nums[i-1]",
      "diff 只记录最大值",
      "diff 记录前缀和",
      "diff 用来二分查找"
    ],
    "correctIndex": 0,
    "explanation": "对区间 [l,r] 加 val：diff[l]+=val, diff[r+1]-=val，最后对 diff 求前缀和还原。",
    "description": "给定长度为 length 的数组初始为 0，多次对区间 [start,end] 加上增量，返回最终数组。",
    "learning": {
      "pattern": "差分数组：区间更新",
      "coreQuestion": "为什么两处修改就能表示整个区间的加法？",
      "framework": "diff 记录相邻差值；区间加法在边界产生变化；最后前缀还原。",
      "steps": [],
      "pitfalls": [
        "r+1 越界处理",
        "忘记最后还原前缀和"
      ],
      "complexity": "目标通常是时间 O(n) 或 O(n log n)，空间 O(1)~O(n)。",
      "template": "diff 记录相邻差值；区间加法在边界产生变化；最后前缀还原。",
      "insight": "差分的本质是把“影响一段区间”变成“只在边界产生变化”。"
    },
    "codeSnippet": {
      "python": "def getModifiedArray(length, updates):\n    diff = [0]*(length+1)\n    for l, r, val in updates:\n        diff[l] += val\n        if r + 1 < length:\n            diff[r+1] -= val\n    res = [0]*length\n    cur = 0\n    for i in range(length):\n        cur += diff[i]\n        res[i] = cur\n    return res\n",
      "java": "public int[] getModifiedArray(int length, int[][] updates) {\n    int[] diff = new int[length + 1];\n    for (int[] u : updates) {\n        int l = u[0], r = u[1], val = u[2];\n        diff[l] += val;\n        if (r + 1 < length) diff[r + 1] -= val;\n    }\n    int[] res = new int[length];\n    int cur = 0;\n    for (int i = 0; i < length; i++) {\n        cur += diff[i];\n        res[i] = cur;\n    }\n    return res;\n}\n",
      "cpp": "vector<int> getModifiedArray(int length, vector<vector<int>>& updates) {\n    vector<int> diff(length+1, 0);\n    for (auto &u : updates) {\n        int l=u[0], r=u[1], val=u[2];\n        diff[l] += val;\n        if (r + 1 < length) diff[r+1] -= val;\n    }\n    vector<int> res(length);\n    int cur=0;\n    for (int i=0;i<length;i++){\n        cur += diff[i];\n        res[i]=cur;\n    }\n    return res;\n}\n"
    }
  },
  {
    "id": "q114",
    "topicId": "ch07_dynamic_programming",
    "track": "core",
    "type": "multiple_choice",
    "xp": 14,
    "leetcodeSlug": "coin-change-ii",
    "handbookRef": {
      "leetcodeId": 518,
      "chapter": "第七章：动态规划",
      "section": "7.2 背包问题",
      "orderInSection": 2,
      "mdLine": 949
    },
    "question": "【零钱兑换 II】 组合数（不限次数）背包的遍历顺序是？",
    "options": [
      "先遍历 coin 再遍历金额",
      "先遍历金额再遍历 coin",
      "只能 DFS",
      "必须排序后双指针"
    ],
    "correctIndex": 0,
    "explanation": "组合数避免排列重复：外层 coin，内层 amount 从 coin 到 target 递增。",
    "description": "给定硬币面额 coins 与总金额 amount，计算可以凑成 amount 的组合数（每种硬币可无限使用）。",
    "learning": {
      "pattern": "DP：完全背包（组合数）",
      "coreQuestion": "为什么外层遍历 coin 能避免把同一组合当成不同排列？",
      "framework": "dp[j] 表示凑成金额 j 的组合数；对 coin 递增更新 dp。",
      "steps": [],
      "pitfalls": [
        "把组合写成排列导致重复计数",
        "金额循环方向写反"
      ],
      "complexity": "目标通常是时间 O(n) 或 O(n log n)，空间 O(1)~O(n)。",
      "template": "dp[j] 表示凑成金额 j 的组合数；对 coin 递增更新 dp。",
      "insight": "背包的遍历顺序决定“去重口径”：外层 coin = 组合，外层金额 = 排列。"
    },
    "codeSnippet": {
      "python": "def change(amount, coins):\n    dp = [0]*(amount+1)\n    dp[0] = 1\n    for coin in coins:\n        for j in range(coin, amount+1):\n            dp[j] += dp[j-coin]\n    return dp[amount]\n",
      "java": "public int change(int amount, int[] coins) {\n    int[] dp = new int[amount + 1];\n    dp[0] = 1;\n    for (int coin : coins) {\n        for (int j = coin; j <= amount; j++) {\n            dp[j] += dp[j - coin];\n        }\n    }\n    return dp[amount];\n}\n",
      "cpp": "int change(int amount, vector<int>& coins) {\n    vector<int> dp(amount+1, 0);\n    dp[0] = 1;\n    for (int coin : coins) {\n        for (int j = coin; j <= amount; j++) {\n            dp[j] += dp[j-coin];\n        }\n    }\n    return dp[amount];\n}\n"
    }
  },
  {
    "id": "q115",
    "topicId": "ch02_sliding_window",
    "track": "core",
    "type": "multiple_choice",
    "xp": 14,
    "leetcodeSlug": "permutation-in-string",
    "handbookRef": {
      "leetcodeId": 567,
      "chapter": "第二章：滑动窗口算法",
      "section": "2.1 滑动窗口核心模板",
      "orderInSection": 2,
      "mdLine": 317
    },
    "question": "【字符串的排列】 滑动窗口需要维护的核心变量是？",
    "options": [
      "window 计数与 need 计数",
      "只维护 left 指针",
      "只维护 right 指针",
      "只维护排序后的字符串"
    ],
    "correctIndex": 0,
    "explanation": "这是固定长度窗口：移动 right 增加计数，必要时移动 left 缩小，并比较计数是否满足。",
    "description": "给定 s1 和 s2，判断 s2 是否包含 s1 的任意排列作为子串。",
    "learning": {
      "pattern": "滑动窗口：计数匹配",
      "coreQuestion": "如何在 O(n) 内判断某个长度窗口是否满足字符计数相同？",
      "framework": "维护 left/right 和 window 计数；窗口长度达到 |s1| 时比较是否匹配。",
      "steps": [],
      "pitfalls": [
        "窗口长度控制错误",
        "计数更新漏掉 left 侧字符",
        "字符集处理不一致"
      ],
      "complexity": "目标通常是时间 O(n) 或 O(n log n)，空间 O(1)~O(n)。",
      "template": "维护 left/right 和 window 计数；窗口长度达到 |s1| 时比较是否匹配。",
      "insight": "滑窗的本质是“增量维护”：不要每个窗口都重算统计，而是进一个字符、出一个字符。"
    },
    "codeSnippet": {
      "python": "def checkInclusion(s1, s2):\n    from collections import Counter\n    need = Counter(s1)\n    window = Counter()\n    left = 0\n    for right, ch in enumerate(s2):\n        window[ch] += 1\n        if right - left + 1 > len(s1):\n            out = s2[left]\n            window[out] -= 1\n            if window[out] == 0: del window[out]\n            left += 1\n        if right - left + 1 == len(s1) and window == need:\n            return True\n    return False\n",
      "java": "public boolean checkInclusion(String s1, String s2) {\n    int[] need = new int[26];\n    int[] window = new int[26];\n    for (char c : s1.toCharArray()) need[c - 'a']++;\n    int left = 0;\n    for (int right = 0; right < s2.length(); right++) {\n        window[s2.charAt(right) - 'a']++;\n        if (right - left + 1 > s1.length()) {\n            window[s2.charAt(left) - 'a']--;\n            left++;\n        }\n        if (right - left + 1 == s1.length()) {\n            boolean ok = true;\n            for (int i = 0; i < 26; i++) {\n                if (window[i] != need[i]) { ok = false; break; }\n            }\n            if (ok) return true;\n        }\n    }\n    return false;\n}\n",
      "cpp": "bool checkInclusion(string s1, string s2) {\n    vector<int> need(26,0), window(26,0);\n    for (char c: s1) need[c-'a']++;\n    int left=0;\n    for (int right=0; right<(int)s2.size(); right++) {\n        window[s2[right]-'a']++;\n        if (right-left+1 > (int)s1.size()) {\n            window[s2[left]-'a']--;\n            left++;\n        }\n        if (right-left+1 == (int)s1.size()) {\n            if (window == need) return true;\n        }\n    }\n    return false;\n}\n"
    }
  },
  {
    "id": "q116",
    "topicId": "ch08_trees",
    "track": "core",
    "type": "multiple_choice",
    "xp": 14,
    "leetcodeSlug": "insert-into-a-binary-search-tree",
    "handbookRef": {
      "leetcodeId": 701,
      "chapter": "第八章：二叉树算法",
      "section": "8.2 二叉搜索树",
      "orderInSection": 2,
      "mdLine": 1135
    },
    "question": "【BST 插入】 插入操作的递归方向由什么决定？",
    "options": [
      "与当前节点值比较大小",
      "树的高度",
      "节点个数奇偶",
      "中序遍历序号"
    ],
    "correctIndex": 0,
    "explanation": "BST 性质：val < node.val 去左子树，否则去右子树，直到空位置挂新节点。",
    "description": "给定二叉搜索树 root 与插入值 val，返回插入后的 BST 根节点。",
    "learning": {
      "pattern": "BST：利用有序性递归定位",
      "coreQuestion": "如何根据 BST 性质把搜索空间缩小到一条路径？",
      "framework": "比较 val 与 node.val，递归到左/右子树，空节点处创建新节点。",
      "steps": [],
      "pitfalls": [
        "忘记返回 root",
        "等于时放哪边不一致"
      ],
      "complexity": "目标通常是时间 O(n) 或 O(n log n)，空间 O(1)~O(n)。",
      "template": "比较 val 与 node.val，递归到左/右子树，空节点处创建新节点。",
      "insight": "BST 的所有操作都像“二分”：每一步都能排除一半子树。"
    },
    "codeSnippet": {
      "python": "def insertIntoBST(root, val):\n    if not root:\n        return TreeNode(val)\n    if val < root.val:\n        root.left = insertIntoBST(root.left, val)\n    else:\n        root.right = insertIntoBST(root.right, val)\n    return root\n",
      "java": "public TreeNode insertIntoBST(TreeNode root, int val) {\n    if (root == null) return new TreeNode(val);\n    if (val < root.val) root.left = insertIntoBST(root.left, val);\n    else root.right = insertIntoBST(root.right, val);\n    return root;\n}\n",
      "cpp": "TreeNode* insertIntoBST(TreeNode* root, int val) {\n    if (!root) return new TreeNode(val);\n    if (val < root->val) root->left = insertIntoBST(root->left, val);\n    else root->right = insertIntoBST(root->right, val);\n    return root;\n}\n"
    }
  },
  {
    "id": "q117",
    "topicId": "ch06_bfs",
    "track": "core",
    "type": "multiple_choice",
    "question": "【打开转盘锁】 BFS 的“去重”通常用什么结构？",
    "options": [
      "visited 集合（哈希集合）",
      "优先队列",
      "栈",
      "并查集"
    ],
    "correctIndex": 0,
    "explanation": "状态图 BFS 必须记录 visited，否则会在环上反复入队导致爆炸。",
    "xp": 16,
    "learning": {
      "pattern": "BFS：最短路径（状态图）",
      "coreQuestion": "如何生成邻居状态并避免重复访问？",
      "framework": "用 queue 层序扩展状态；对每个状态生成 8 个邻居；用 visited 去重。",
      "steps": [],
      "pitfalls": [
        "忘记把 deadends 加入 visited",
        "邻居生成错误",
        "没有按层计步"
      ],
      "complexity": "目标通常是时间 O(n) 或 O(n log n)，空间 O(1)~O(n)。",
      "template": "用 queue 层序扩展状态；对每个状态生成 8 个邻居；用 visited 去重。",
      "insight": "把题目抽象成图：节点=密码状态，边=拨动一位。BFS 找最短步数。"
    },
    "codeSnippet": {
      "python": "from collections import deque\n\ndef openLock(deadends, target):\n    dead = set(deadends)\n    if '0000' in dead: return -1\n    queue = deque(['0000'])\n    visited = set(['0000'])\n    step = 0\n    while queue:\n        for _ in range(len(queue)):\n            cur = queue.popleft()\n            if cur == target: return step\n            for i in range(4):\n                x = int(cur[i])\n                for d in (-1, 1):\n                    y = (x + d) % 10\n                    nxt = cur[:i] + str(y) + cur[i+1:]\n                    if nxt in dead or nxt in visited: continue\n                    visited.add(nxt)\n                    queue.append(nxt)\n        step += 1\n    return -1\n",
      "java": "public int openLock(String[] deadends, String target) {\n    Set<String> dead = new HashSet<>(Arrays.asList(deadends));\n    if (dead.contains(\"0000\")) return -1;\n    Deque<String> queue = new ArrayDeque<>();\n    Set<String> visited = new HashSet<>();\n    queue.add(\"0000\");\n    visited.add(\"0000\");\n    int step = 0;\n    while (!queue.isEmpty()) {\n        int size = queue.size();\n        for (int s = 0; s < size; s++) {\n            String cur = queue.poll();\n            if (cur.equals(target)) return step;\n            for (int i = 0; i < 4; i++) {\n                char c = cur.charAt(i);\n                for (int d : new int[]{-1, 1}) {\n                    int y = (c - '0' + d + 10) % 10;\n                    String nxt = cur.substring(0, i) + y + cur.substring(i + 1);\n                    if (dead.contains(nxt) || visited.contains(nxt)) continue;\n                    visited.add(nxt);\n                    queue.add(nxt);\n                }\n            }\n        }\n        step++;\n    }\n    return -1;\n}\n",
      "cpp": "int openLock(vector<string>& deadends, string target) {\n    unordered_set<string> dead(deadends.begin(), deadends.end());\n    if (dead.count(\"0000\")) return -1;\n    queue<string> q;\n    unordered_set<string> visited;\n    q.push(\"0000\");\n    visited.insert(\"0000\");\n    int step = 0;\n    while (!q.empty()) {\n        int size = q.size();\n        while (size--) {\n            string cur = q.front(); q.pop();\n            if (cur == target) return step;\n            for (int i = 0; i < 4; i++) {\n                int x = cur[i] - '0';\n                for (int d : {-1, 1}) {\n                    int y = (x + d + 10) % 10;\n                    string nxt = cur;\n                    nxt[i] = char('0' + y);\n                    if (dead.count(nxt) || visited.count(nxt)) continue;\n                    visited.insert(nxt);\n                    q.push(nxt);\n                }\n            }\n        }\n        step++;\n    }\n    return -1;\n}\n"
    },
    "description": "你有一个带四个拨轮的转盘锁，每次可以将某一位拨动 +1 或 -1（循环）。给定 deadends 与 target，求最少拨动次数。",
    "leetcodeSlug": "open-the-lock",
    "handbookRef": {
      "leetcodeId": 752,
      "chapter": "第六章：BFS算法",
      "section": "6.1 BFS核心框架",
      "orderInSection": 2,
      "mdLine": 796
    }
  },
  {
    "id": "q118",
    "topicId": "ch01_two_pointers",
    "track": "core",
    "type": "multiple_choice",
    "xp": 14,
    "leetcodeSlug": "middle-of-the-linked-list",
    "handbookRef": {
      "leetcodeId": 876,
      "chapter": "第一章：双指针技巧",
      "section": "1.1 链表双指针技巧",
      "orderInSection": 4,
      "mdLine": 127
    },
    "question": "【链表的中间结点】 快慢指针的步速关系是？",
    "options": [
      "fast 每次走两步，slow 每次走一步",
      "fast 每次走一步，slow 每次走两步",
      "两者都走两步",
      "slow 不动"
    ],
    "correctIndex": 0,
    "explanation": "当 fast 到达末尾，slow 正好在中点。",
    "description": "给定非空单链表 head，返回链表的中间结点；若有两个中间结点返回第二个。",
    "learning": {
      "pattern": "双指针：快慢指针",
      "coreQuestion": "为何 fast 走两步、slow 走一步会在中点相遇？",
      "framework": "同时移动 fast/slow，fast 到尾时 slow 走了长度的一半。",
      "steps": [],
      "pitfalls": [
        "偶数长度返回哪个中点",
        "空指针判断 fast.next"
      ],
      "complexity": "目标通常是时间 O(n) 或 O(n log n)，空间 O(1)~O(n)。",
      "template": "同时移动 fast/slow，fast 到尾时 slow 走了长度的一半。",
      "insight": "快慢指针是用“速度差”把一个遍历问题变成“相对运动”问题。"
    },
    "codeSnippet": {
      "python": "def middleNode(head):\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n    return slow\n",
      "java": "public ListNode middleNode(ListNode head) {\n    ListNode slow = head, fast = head;\n    while (fast != null && fast.next != null) {\n        slow = slow.next;\n        fast = fast.next.next;\n    }\n    return slow;\n}\n",
      "cpp": "ListNode* middleNode(ListNode* head) {\n    ListNode* slow = head;\n    ListNode* fast = head;\n    while (fast && fast->next) {\n        slow = slow->next;\n        fast = fast->next->next;\n    }\n    return slow;\n}\n"
    }
  },
  {
    "id": "q119",
    "topicId": "ch01_two_pointers",
    "track": "core",
    "type": "multiple_choice",
    "xp": 14,
    "leetcodeSlug": "squares-of-a-sorted-array",
    "handbookRef": {
      "leetcodeId": 977,
      "chapter": "第一章：双指针技巧",
      "section": "1.2 数组双指针技巧",
      "orderInSection": 2,
      "mdLine": 201
    },
    "question": "【有序数组的平方】 为什么可以用双指针从两端向中间？",
    "options": [
      "最大平方一定来自两端的较大绝对值",
      "平方会保持原排序",
      "必须先排序再平方",
      "只能用堆做 TopK"
    ],
    "correctIndex": 0,
    "explanation": "因为负数平方后可能变大；两端绝对值最大，平方最大，倒序填充结果数组即可。",
    "description": "给定按非递减顺序排序的整数数组 nums，返回每个数字的平方组成的新数组，要求也按非递减顺序排序。",
    "learning": {
      "pattern": "双指针：左右夹逼 + 逆向填充",
      "coreQuestion": "如何避免先平方后排序的 O(n log n)？",
      "framework": "left/right 指向两端，比绝对值，放到结果末尾，指针向中间移动。",
      "steps": [],
      "pitfalls": [
        "结果填充方向写反",
        "比较值用绝对值",
        "边界 left<=right"
      ],
      "complexity": "目标通常是时间 O(n) 或 O(n log n)，空间 O(1)~O(n)。",
      "template": "left/right 指向两端，比绝对值，放到结果末尾，指针向中间移动。",
      "insight": "利用原数组的有序性：答案的“最大值”从两端产生，双指针就能线性合并。"
    },
    "codeSnippet": {
      "python": "def sortedSquares(nums):\n    n = len(nums)\n    res = [0]*n\n    left, right = 0, n-1\n    pos = n-1\n    while left <= right:\n        if abs(nums[left]) > abs(nums[right]):\n            res[pos] = nums[left]*nums[left]\n            left += 1\n        else:\n            res[pos] = nums[right]*nums[right]\n            right -= 1\n        pos -= 1\n    return res\n",
      "java": "public int[] sortedSquares(int[] nums) {\n    int n = nums.length;\n    int[] res = new int[n];\n    int left = 0, right = n - 1, pos = n - 1;\n    while (left <= right) {\n        int a = nums[left], b = nums[right];\n        if (Math.abs(a) > Math.abs(b)) {\n            res[pos--] = a * a;\n            left++;\n        } else {\n            res[pos--] = b * b;\n            right--;\n        }\n    }\n    return res;\n}\n",
      "cpp": "vector<int> sortedSquares(vector<int>& nums) {\n    int n = nums.size();\n    vector<int> res(n);\n    int left = 0, right = n - 1, pos = n - 1;\n    while (left <= right) {\n        int a = nums[left], b = nums[right];\n        if (abs(a) > abs(b)) {\n            res[pos--] = a * a;\n            left++;\n        } else {\n            res[pos--] = b * b;\n            right--;\n        }\n    }\n    return res;\n}\n"
    }
  }
];
