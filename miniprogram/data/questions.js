module.exports = [
  {
    "id": "q001",
    "topicId": "arrays",
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
    "leetcodeSlug": "two-sum"
  },
  {
    "id": "q002",
    "topicId": "arrays",
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
      "python": "# TODO: 买卖股票的最佳时机 (best-time-to-buy-and-sell-stock)\n# INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\ndef solve(*args, **kwargs):\n    raise NotImplementedError('TODO: implement best-time-to-buy-and-sell-stock')",
      "java": "// TODO: 买卖股票的最佳时机 (best-time-to-buy-and-sell-stock)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\n    public Object solve() {\n        throw new UnsupportedOperationException(\"TODO: implement best-time-to-buy-and-sell-stock\");\n    }\n}",
      "cpp": "// TODO: 买卖股票的最佳时机 (best-time-to-buy-and-sell-stock)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\npublic:\n    void solve() {\n        throw std::logic_error(\"TODO: implement best-time-to-buy-and-sell-stock\");\n    }\n};"
    },
    "description": "给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。设计一个算法来计算你所能获取的最大利润。你只能选择某一天买入这只股票，并选择在未来的某一个不同的日子卖出该股票。",
    "leetcodeSlug": "best-time-to-buy-and-sell-stock"
  },
  {
    "id": "q003",
    "topicId": "arrays",
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
      "python": "# TODO: 除自身以外数组的乘积 (product-of-array-except-self)\n# INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\ndef solve(*args, **kwargs):\n    raise NotImplementedError('TODO: implement product-of-array-except-self')",
      "java": "// TODO: 除自身以外数组的乘积 (product-of-array-except-self)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\n    public Object solve() {\n        throw new UnsupportedOperationException(\"TODO: implement product-of-array-except-self\");\n    }\n}",
      "cpp": "// TODO: 除自身以外数组的乘积 (product-of-array-except-self)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\npublic:\n    void solve() {\n        throw std::logic_error(\"TODO: implement product-of-array-except-self\");\n    }\n};"
    },
    "description": "给你一个整数数组 nums，返回一个数组 answer ，其中 answer[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积。请不要使用除法，且在 O(n) 时间复杂度内完成。",
    "leetcodeSlug": "product-of-array-except-self"
  },
  {
    "id": "q004",
    "topicId": "arrays",
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
      "python": "# TODO: 最大子数组和 (maximum-subarray)\n# INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\ndef solve(*args, **kwargs):\n    raise NotImplementedError('TODO: implement maximum-subarray')",
      "java": "// TODO: 最大子数组和 (maximum-subarray)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\n    public Object solve() {\n        throw new UnsupportedOperationException(\"TODO: implement maximum-subarray\");\n    }\n}",
      "cpp": "// TODO: 最大子数组和 (maximum-subarray)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\npublic:\n    void solve() {\n        throw std::logic_error(\"TODO: implement maximum-subarray\");\n    }\n};"
    },
    "description": "给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。",
    "leetcodeSlug": "maximum-subarray"
  },
  {
    "id": "q005",
    "topicId": "arrays",
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
    "leetcodeSlug": "merge-intervals"
  },
  {
    "id": "q006",
    "topicId": "arrays",
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
      "python": "# TODO: 轮转数组 (rotate-array)\n# INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\ndef solve(*args, **kwargs):\n    raise NotImplementedError('TODO: implement rotate-array')",
      "java": "// TODO: 轮转数组 (rotate-array)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\n    public Object solve() {\n        throw new UnsupportedOperationException(\"TODO: implement rotate-array\");\n    }\n}",
      "cpp": "// TODO: 轮转数组 (rotate-array)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\npublic:\n    void solve() {\n        throw std::logic_error(\"TODO: implement rotate-array\");\n    }\n};"
    },
    "description": "给你一个数组，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。尝试使用 O(1) 额外空间完成。",
    "leetcodeSlug": "rotate-array"
  },
  {
    "id": "q007",
    "topicId": "arrays",
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
      "python": "# TODO: 移动零 (move-zeroes)\n# INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\ndef solve(*args, **kwargs):\n    raise NotImplementedError('TODO: implement move-zeroes')",
      "java": "// TODO: 移动零 (move-zeroes)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\n    public Object solve() {\n        throw new UnsupportedOperationException(\"TODO: implement move-zeroes\");\n    }\n}",
      "cpp": "// TODO: 移动零 (move-zeroes)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\npublic:\n    void solve() {\n        throw std::logic_error(\"TODO: implement move-zeroes\");\n    }\n};"
    },
    "description": "给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。必须在原数组上操作。",
    "leetcodeSlug": "move-zeroes"
  },
  {
    "id": "q008",
    "topicId": "arrays",
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
      "python": "# TODO: 多数元素 (majority-element)\n# INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\ndef solve(*args, **kwargs):\n    raise NotImplementedError('TODO: implement majority-element')",
      "java": "// TODO: 多数元素 (majority-element)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\n    public Object solve() {\n        throw new UnsupportedOperationException(\"TODO: implement majority-element\");\n    }\n}",
      "cpp": "// TODO: 多数元素 (majority-element)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\npublic:\n    void solve() {\n        throw std::logic_error(\"TODO: implement majority-element\");\n    }\n};"
    },
    "description": "给定一个大小为 n 的数组 nums ，返回其中的多数元素。多数元素是指在数组中出现次数大于 ⌊ n/2 ⌋ 的元素。",
    "leetcodeSlug": "majority-element"
  },
  {
    "id": "q009",
    "topicId": "arrays",
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
      "python": "# TODO: 下一个排列 (next-permutation)\n# INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\ndef solve(*args, **kwargs):\n    raise NotImplementedError('TODO: implement next-permutation')",
      "java": "// TODO: 下一个排列 (next-permutation)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\n    public Object solve() {\n        throw new UnsupportedOperationException(\"TODO: implement next-permutation\");\n    }\n}",
      "cpp": "// TODO: 下一个排列 (next-permutation)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\npublic:\n    void solve() {\n        throw std::logic_error(\"TODO: implement next-permutation\");\n    }\n};"
    },
    "description": "给你一个整数数组 nums ，找出 nums 的下一个字典序更大的排列。如果不存在下一个更大的排列，则将数组重新按升序排列。",
    "leetcodeSlug": "next-permutation"
  },
  {
    "id": "q010",
    "topicId": "arrays",
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
      "python": "# TODO: 颜色分类 (sort-colors)\n# INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\ndef solve(*args, **kwargs):\n    raise NotImplementedError('TODO: implement sort-colors')",
      "java": "// TODO: 颜色分类 (sort-colors)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\n    public Object solve() {\n        throw new UnsupportedOperationException(\"TODO: implement sort-colors\");\n    }\n}",
      "cpp": "// TODO: 颜色分类 (sort-colors)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\npublic:\n    void solve() {\n        throw std::logic_error(\"TODO: implement sort-colors\");\n    }\n};"
    },
    "description": "给定一个包含红色、白色和蓝色、共 n 个元素的数组 nums ，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。",
    "leetcodeSlug": "sort-colors"
  },
  {
    "id": "q011",
    "topicId": "arrays",
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
      "python": "# TODO: 缺失的第一个正数 (first-missing-positive)\n# INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\ndef solve(*args, **kwargs):\n    raise NotImplementedError('TODO: implement first-missing-positive')",
      "java": "// TODO: 缺失的第一个正数 (first-missing-positive)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\n    public Object solve() {\n        throw new UnsupportedOperationException(\"TODO: implement first-missing-positive\");\n    }\n}",
      "cpp": "// TODO: 缺失的第一个正数 (first-missing-positive)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\npublic:\n    void solve() {\n        throw std::logic_error(\"TODO: implement first-missing-positive\");\n    }\n};"
    },
    "description": "给你一个未排序的整数数组 nums ，请你找出其中没有出现的最小的正整数。请你设计并实现时间复杂度为 O(n) 且仅使用常数级别额外空间的算法。",
    "leetcodeSlug": "first-missing-positive"
  },
  {
    "id": "q012",
    "topicId": "arrays",
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
      "python": "# TODO: 接雨水 (trapping-rain-water)\n# INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\ndef solve(*args, **kwargs):\n    raise NotImplementedError('TODO: implement trapping-rain-water')",
      "java": "// TODO: 接雨水 (trapping-rain-water)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\n    public Object solve() {\n        throw new UnsupportedOperationException(\"TODO: implement trapping-rain-water\");\n    }\n}",
      "cpp": "// TODO: 接雨水 (trapping-rain-water)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\npublic:\n    void solve() {\n        throw std::logic_error(\"TODO: implement trapping-rain-water\");\n    }\n};"
    },
    "description": "给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。",
    "leetcodeSlug": "trapping-rain-water"
  },
  {
    "id": "q013",
    "topicId": "hashmaps",
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
    "leetcodeSlug": "group-anagrams"
  },
  {
    "id": "q014",
    "topicId": "hashmaps",
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
      "python": "# TODO: 有效的字母异位词 (valid-anagram)\n# INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\ndef solve(*args, **kwargs):\n    raise NotImplementedError('TODO: implement valid-anagram')",
      "java": "// TODO: 有效的字母异位词 (valid-anagram)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\n    public Object solve() {\n        throw new UnsupportedOperationException(\"TODO: implement valid-anagram\");\n    }\n}",
      "cpp": "// TODO: 有效的字母异位词 (valid-anagram)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\npublic:\n    void solve() {\n        throw std::logic_error(\"TODO: implement valid-anagram\");\n    }\n};"
    },
    "description": "给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。",
    "leetcodeSlug": "valid-anagram"
  },
  {
    "id": "q015",
    "topicId": "hashmaps",
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
      "python": "# TODO: 和为 K 的子数组 (subarray-sum-equals-k)\n# INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\ndef solve(*args, **kwargs):\n    raise NotImplementedError('TODO: implement subarray-sum-equals-k')",
      "java": "// TODO: 和为 K 的子数组 (subarray-sum-equals-k)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\n    public Object solve() {\n        throw new UnsupportedOperationException(\"TODO: implement subarray-sum-equals-k\");\n    }\n}",
      "cpp": "// TODO: 和为 K 的子数组 (subarray-sum-equals-k)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\npublic:\n    void solve() {\n        throw std::logic_error(\"TODO: implement subarray-sum-equals-k\");\n    }\n};"
    },
    "description": "给你一个整数数组 nums 和一个整数 k ，请你统计并返回该数组中和为 k 的连续子数组的个数。",
    "leetcodeSlug": "subarray-sum-equals-k"
  },
  {
    "id": "q016",
    "topicId": "hashmaps",
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
      "python": "# TODO: 最长连续序列 (longest-consecutive-sequence)\n# INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\ndef solve(*args, **kwargs):\n    raise NotImplementedError('TODO: implement longest-consecutive-sequence')",
      "java": "// TODO: 最长连续序列 (longest-consecutive-sequence)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\n    public Object solve() {\n        throw new UnsupportedOperationException(\"TODO: implement longest-consecutive-sequence\");\n    }\n}",
      "cpp": "// TODO: 最长连续序列 (longest-consecutive-sequence)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\npublic:\n    void solve() {\n        throw std::logic_error(\"TODO: implement longest-consecutive-sequence\");\n    }\n};"
    },
    "description": "给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。请设计并实现时间复杂度为 O(n) 的算法。",
    "leetcodeSlug": "longest-consecutive-sequence"
  },
  {
    "id": "q017",
    "topicId": "hashmaps",
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
    "leetcodeSlug": "lru-cache"
  },
  {
    "id": "q018",
    "topicId": "hashmaps",
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
      "python": "# TODO: 前 K 个高频元素 (top-k-frequent-elements)\n# INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\ndef solve(*args, **kwargs):\n    raise NotImplementedError('TODO: implement top-k-frequent-elements')",
      "java": "// TODO: 前 K 个高频元素 (top-k-frequent-elements)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\n    public Object solve() {\n        throw new UnsupportedOperationException(\"TODO: implement top-k-frequent-elements\");\n    }\n}",
      "cpp": "// TODO: 前 K 个高频元素 (top-k-frequent-elements)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\npublic:\n    void solve() {\n        throw std::logic_error(\"TODO: implement top-k-frequent-elements\");\n    }\n};"
    },
    "description": "给你一个整数数组 nums 和一个整数 k ，请你返回其中出现频率前 k 高的元素。你可以按任意顺序返回答案。",
    "leetcodeSlug": "top-k-frequent-elements"
  },
  {
    "id": "q019",
    "topicId": "hashmaps",
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
      "python": "# TODO: 四数相加 II (4sum-ii)\n# INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\ndef solve(*args, **kwargs):\n    raise NotImplementedError('TODO: implement 4sum-ii')",
      "java": "// TODO: 四数相加 II (4sum-ii)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\n    public Object solve() {\n        throw new UnsupportedOperationException(\"TODO: implement 4sum-ii\");\n    }\n}",
      "cpp": "// TODO: 四数相加 II (4sum-ii)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\npublic:\n    void solve() {\n        throw std::logic_error(\"TODO: implement 4sum-ii\");\n    }\n};"
    },
    "description": "给你四个整数数组 nums1、nums2、nums3 和 nums4 ，数组长度都是 n ，请你计算有多少个元组 (i, j, k, l) 能满足四个数组对应元素之和为 0。",
    "leetcodeSlug": "4sum-ii"
  },
  {
    "id": "q020",
    "topicId": "hashmaps",
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
      "python": "# TODO: 字符串解码计数场景 (decode-ways)\n# INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\ndef solve(*args, **kwargs):\n    raise NotImplementedError('TODO: implement decode-ways')",
      "java": "// TODO: 字符串解码计数场景 (decode-ways)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\n    public Object solve() {\n        throw new UnsupportedOperationException(\"TODO: implement decode-ways\");\n    }\n}",
      "cpp": "// TODO: 字符串解码计数场景 (decode-ways)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\npublic:\n    void solve() {\n        throw std::logic_error(\"TODO: implement decode-ways\");\n    }\n};"
    },
    "description": "本题对应《字符串解码计数场景》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 hashmaps 相关方法中完成复杂度优化。",
    "leetcodeSlug": "decode-ways"
  },
  {
    "id": "q021",
    "topicId": "hashmaps",
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
      "python": "# TODO: 快乐数 (happy-number)\n# INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\ndef solve(*args, **kwargs):\n    raise NotImplementedError('TODO: implement happy-number')",
      "java": "// TODO: 快乐数 (happy-number)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\n    public Object solve() {\n        throw new UnsupportedOperationException(\"TODO: implement happy-number\");\n    }\n}",
      "cpp": "// TODO: 快乐数 (happy-number)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\npublic:\n    void solve() {\n        throw std::logic_error(\"TODO: implement happy-number\");\n    }\n};"
    },
    "description": "编写一个算法来判断一个数 n 是不是快乐数。快乐数定义为：对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和，最终变更为 1。",
    "leetcodeSlug": "happy-number"
  },
  {
    "id": "q022",
    "topicId": "hashmaps",
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
      "python": "# TODO: 同构字符串 (isomorphic-strings)\n# INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\ndef solve(*args, **kwargs):\n    raise NotImplementedError('TODO: implement isomorphic-strings')",
      "java": "// TODO: 同构字符串 (isomorphic-strings)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\n    public Object solve() {\n        throw new UnsupportedOperationException(\"TODO: implement isomorphic-strings\");\n    }\n}",
      "cpp": "// TODO: 同构字符串 (isomorphic-strings)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\npublic:\n    void solve() {\n        throw std::logic_error(\"TODO: implement isomorphic-strings\");\n    }\n};"
    },
    "description": "给定两个字符串 s 和 t ，判断它们是否是同构的。如果 s 中的字符可以按某种替换规则得到 t ，则两个字符串同构。",
    "leetcodeSlug": "isomorphic-strings"
  },
  {
    "id": "q023",
    "topicId": "two_pointers",
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
    "leetcodeSlug": "3sum"
  },
  {
    "id": "q024",
    "topicId": "two_pointers",
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
      "python": "# TODO: 盛最多水的容器 (container-with-most-water)\n# INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\ndef solve(*args, **kwargs):\n    raise NotImplementedError('TODO: implement container-with-most-water')",
      "java": "// TODO: 盛最多水的容器 (container-with-most-water)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\n    public Object solve() {\n        throw new UnsupportedOperationException(\"TODO: implement container-with-most-water\");\n    }\n}",
      "cpp": "// TODO: 盛最多水的容器 (container-with-most-water)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\npublic:\n    void solve() {\n        throw std::logic_error(\"TODO: implement container-with-most-water\");\n    }\n};"
    },
    "description": "给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。",
    "leetcodeSlug": "container-with-most-water"
  },
  {
    "id": "q025",
    "topicId": "two_pointers",
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
      "python": "# TODO: 删除有序数组重复项 (remove-duplicates-from-sorted-array)\n# INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\ndef solve(*args, **kwargs):\n    raise NotImplementedError('TODO: implement remove-duplicates-from-sorted-array')",
      "java": "// TODO: 删除有序数组重复项 (remove-duplicates-from-sorted-array)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\n    public Object solve() {\n        throw new UnsupportedOperationException(\"TODO: implement remove-duplicates-from-sorted-array\");\n    }\n}",
      "cpp": "// TODO: 删除有序数组重复项 (remove-duplicates-from-sorted-array)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\npublic:\n    void solve() {\n        throw std::logic_error(\"TODO: implement remove-duplicates-from-sorted-array\");\n    }\n};"
    },
    "description": "给你一个升序排列的数组 nums ，请你原地删除重复出现的元素，使每个元素只出现一次 ，返回删除后数组的新长度。",
    "leetcodeSlug": "remove-duplicates-from-sorted-array"
  },
  {
    "id": "q026",
    "topicId": "two_pointers",
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
    "leetcodeSlug": "palindrome-linked-list"
  },
  {
    "id": "q027",
    "topicId": "two_pointers",
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
    "leetcodeSlug": "two-sum-ii-input-array-is-sorted"
  },
  {
    "id": "q028",
    "topicId": "two_pointers",
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
    "leetcodeSlug": "remove-nth-node-from-end-of-list"
  },
  {
    "id": "q029",
    "topicId": "two_pointers",
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
    "leetcodeSlug": "intersection-of-two-linked-lists"
  },
  {
    "id": "q030",
    "topicId": "two_pointers",
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
      "python": "# TODO: 接雨水双指针 (trapping-rain-water-two-pointers)\n# INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\ndef solve(*args, **kwargs):\n    raise NotImplementedError('TODO: implement trapping-rain-water-two-pointers')",
      "java": "// TODO: 接雨水双指针 (trapping-rain-water-two-pointers)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\n    public Object solve() {\n        throw new UnsupportedOperationException(\"TODO: implement trapping-rain-water-two-pointers\");\n    }\n}",
      "cpp": "// TODO: 接雨水双指针 (trapping-rain-water-two-pointers)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\npublic:\n    void solve() {\n        throw std::logic_error(\"TODO: implement trapping-rain-water-two-pointers\");\n    }\n};"
    },
    "description": "给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。",
    "leetcodeSlug": "trapping-rain-water-two-pointers"
  },
  {
    "id": "q031",
    "topicId": "sliding_window",
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
    "leetcodeSlug": "longest-substring-without-repeating-characters"
  },
  {
    "id": "q032",
    "topicId": "sliding_window",
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
      "python": "JavaScript:\nfunction minWindow(s, t) {\n  const need = new Map();\n  for (const c of t) need.set(c, (need.get(c)||0)+1);\n  let needCnt = t.length, l = 0, start = 0, len = Infinity;\n  for (let r = 0; r < s.length; r++) {\n    const c = s[r];\n    if (need.has(c)) { if (need.get(c) > 0) needCnt--; need.set(c, need.get(c)-1); }\n    while (needCnt === 0) {\n      if (r - l + 1 < len) { len = r - l + 1; start = l; }\n      const lc = s[l++];\n      if (need.has(lc)) { need.set(lc, need.get(lc)+1); if (need.get(lc) > 0) needCnt++; }\n    }\n  }\n  return len === Infinity ? '' : s.slice(start, start + len);\n}",
      "java": "// 最小覆盖子串\nint solve(int[] arr) {\n    int left = 0, ans = 0;\n    for (int right = 0; right < arr.length; right++) {\n        while (left <= right && false) {\n            left++;\n        }\n        ans = Math.max(ans, right - left + 1);\n    }\n    return ans;\n}",
      "cpp": "// 最小覆盖子串\nint solve(vector<int>& arr) {\n    int left = 0, ans = 0;\n    for (int right = 0; right < (int)arr.size(); right++) {\n        while (left <= right && false) left++;\n        ans = max(ans, right - left + 1);\n    }\n    return ans;\n}"
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
    "leetcodeSlug": "minimum-window-substring"
  },
  {
    "id": "q033",
    "topicId": "sliding_window",
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
      "python": "# TODO: 找到字符串中所有字母异位词 (find-all-anagrams-in-a-string)\n# INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\ndef solve(*args, **kwargs):\n    raise NotImplementedError('TODO: implement find-all-anagrams-in-a-string')",
      "java": "// TODO: 找到字符串中所有字母异位词 (find-all-anagrams-in-a-string)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\n    public Object solve() {\n        throw new UnsupportedOperationException(\"TODO: implement find-all-anagrams-in-a-string\");\n    }\n}",
      "cpp": "// TODO: 找到字符串中所有字母异位词 (find-all-anagrams-in-a-string)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\npublic:\n    void solve() {\n        throw std::logic_error(\"TODO: implement find-all-anagrams-in-a-string\");\n    }\n};"
    },
    "description": "给定两个字符串 s 和 p，找到 s 中所有 p 的异位词的子串，返回这些子串的起始索引。",
    "leetcodeSlug": "find-all-anagrams-in-a-string"
  },
  {
    "id": "q034",
    "topicId": "sliding_window",
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
      "python": "# TODO: 长度最小的子数组 (minimum-size-subarray-sum)\n# INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\ndef solve(*args, **kwargs):\n    raise NotImplementedError('TODO: implement minimum-size-subarray-sum')",
      "java": "// TODO: 长度最小的子数组 (minimum-size-subarray-sum)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\n    public Object solve() {\n        throw new UnsupportedOperationException(\"TODO: implement minimum-size-subarray-sum\");\n    }\n}",
      "cpp": "// TODO: 长度最小的子数组 (minimum-size-subarray-sum)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\npublic:\n    void solve() {\n        throw std::logic_error(\"TODO: implement minimum-size-subarray-sum\");\n    }\n};"
    },
    "description": "给定一个含有 n 个正整数的数组和一个正整数 target 。找出该数组中满足其和 ≥ target 的长度最小的连续子数组，并返回其长度。",
    "leetcodeSlug": "minimum-size-subarray-sum"
  },
  {
    "id": "q035",
    "topicId": "sliding_window",
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
      "python": "# TODO: 最大连续 1（可翻转 k 次） (max-consecutive-ones-iii)\n# INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\ndef solve(*args, **kwargs):\n    raise NotImplementedError('TODO: implement max-consecutive-ones-iii')",
      "java": "// TODO: 最大连续 1（可翻转 k 次） (max-consecutive-ones-iii)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\n    public Object solve() {\n        throw new UnsupportedOperationException(\"TODO: implement max-consecutive-ones-iii\");\n    }\n}",
      "cpp": "// TODO: 最大连续 1（可翻转 k 次） (max-consecutive-ones-iii)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\npublic:\n    void solve() {\n        throw std::logic_error(\"TODO: implement max-consecutive-ones-iii\");\n    }\n};"
    },
    "description": "给定一个二进制数组 nums 和一个整数 k，如果可以翻转最多 k 个 0 ，则返回数组中连续 1 的最大个数。",
    "leetcodeSlug": "max-consecutive-ones-iii"
  },
  {
    "id": "q036",
    "topicId": "sliding_window",
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
      "python": "# TODO: 串联所有单词的子串 (substring-with-concatenation-of-all-words)\n# INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\ndef solve(*args, **kwargs):\n    raise NotImplementedError('TODO: implement substring-with-concatenation-of-all-words')",
      "java": "// TODO: 串联所有单词的子串 (substring-with-concatenation-of-all-words)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\n    public Object solve() {\n        throw new UnsupportedOperationException(\"TODO: implement substring-with-concatenation-of-all-words\");\n    }\n}",
      "cpp": "// TODO: 串联所有单词的子串 (substring-with-concatenation-of-all-words)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\npublic:\n    void solve() {\n        throw std::logic_error(\"TODO: implement substring-with-concatenation-of-all-words\");\n    }\n};"
    },
    "description": "本题对应《串联所有单词的子串》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 sliding_window 相关方法中完成复杂度优化。",
    "leetcodeSlug": "substring-with-concatenation-of-all-words"
  },
  {
    "id": "q037",
    "topicId": "sliding_window",
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
      "python": "# TODO: 水果成篮 (fruit-into-baskets)\n# INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\ndef solve(*args, **kwargs):\n    raise NotImplementedError('TODO: implement fruit-into-baskets')",
      "java": "// TODO: 水果成篮 (fruit-into-baskets)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\n    public Object solve() {\n        throw new UnsupportedOperationException(\"TODO: implement fruit-into-baskets\");\n    }\n}",
      "cpp": "// TODO: 水果成篮 (fruit-into-baskets)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\npublic:\n    void solve() {\n        throw std::logic_error(\"TODO: implement fruit-into-baskets\");\n    }\n};"
    },
    "description": "本题对应《水果成篮》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 sliding_window 相关方法中完成复杂度优化。",
    "leetcodeSlug": "fruit-into-baskets"
  },
  {
    "id": "q038",
    "topicId": "sliding_window",
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
      "python": "# TODO: 替换后的最长重复字符 (longest-repeating-character-replacement)\n# INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\ndef solve(*args, **kwargs):\n    raise NotImplementedError('TODO: implement longest-repeating-character-replacement')",
      "java": "// TODO: 替换后的最长重复字符 (longest-repeating-character-replacement)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\n    public Object solve() {\n        throw new UnsupportedOperationException(\"TODO: implement longest-repeating-character-replacement\");\n    }\n}",
      "cpp": "// TODO: 替换后的最长重复字符 (longest-repeating-character-replacement)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\npublic:\n    void solve() {\n        throw std::logic_error(\"TODO: implement longest-repeating-character-replacement\");\n    }\n};"
    },
    "description": "本题对应《替换后的最长重复字符》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 sliding_window 相关方法中完成复杂度优化。",
    "leetcodeSlug": "longest-repeating-character-replacement"
  },
  {
    "id": "q039",
    "topicId": "linked_list",
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
    "leetcodeSlug": "reverse-linked-list"
  },
  {
    "id": "q040",
    "topicId": "linked_list",
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
      "python": "# 合并两个有序链表\ndef solve(head):\n    dummy = ListNode(0, head)\n    prev, cur = None, head\n    while cur:\n        nxt = cur.next\n        # 典型链表操作：先存 nxt，再改指针\n        cur.next = prev\n        prev, cur = cur, nxt\n    return prev",
      "java": "// 合并两个有序链表\nListNode solve(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n        ListNode nxt = cur.next;\n        cur.next = prev;\n        prev = cur;\n        cur = nxt;\n    }\n    return prev;\n}",
      "cpp": "// 合并两个有序链表\nListNode* solve(ListNode* head) {\n    ListNode* prev = nullptr;\n    while (head) {\n        ListNode* nxt = head->next;\n        head->next = prev;\n        prev = head;\n        head = nxt;\n    }\n    return prev;\n}"
    },
    "description": "将两个升序链表合并为一个新的升序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。",
    "leetcodeSlug": "merge-two-sorted-lists"
  },
  {
    "id": "q041",
    "topicId": "linked_list",
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
      "python": "# 链表有环\ndef solve(head):\n    dummy = ListNode(0, head)\n    prev, cur = None, head\n    while cur:\n        nxt = cur.next\n        # 典型链表操作：先存 nxt，再改指针\n        cur.next = prev\n        prev, cur = cur, nxt\n    return prev",
      "java": "// 链表有环\nListNode solve(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n        ListNode nxt = cur.next;\n        cur.next = prev;\n        prev = cur;\n        cur = nxt;\n    }\n    return prev;\n}",
      "cpp": "// 链表有环\nListNode* solve(ListNode* head) {\n    ListNode* prev = nullptr;\n    while (head) {\n        ListNode* nxt = head->next;\n        head->next = prev;\n        prev = head;\n        head = nxt;\n    }\n    return prev;\n}"
    },
    "description": "本题对应《链表有环》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 linked_list 相关方法中完成复杂度优化。",
    "leetcodeSlug": "linked-list-cycle"
  },
  {
    "id": "q042",
    "topicId": "linked_list",
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
    "leetcodeSlug": "reorder-list"
  },
  {
    "id": "q043",
    "topicId": "linked_list",
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
    "leetcodeSlug": "reverse-nodes-in-k-group"
  },
  {
    "id": "q044",
    "topicId": "linked_list",
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
    "leetcodeSlug": "copy-list-with-random-pointer"
  },
  {
    "id": "q045",
    "topicId": "linked_list",
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
    "leetcodeSlug": "sort-list"
  },
  {
    "id": "q046",
    "topicId": "linked_list",
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
    "leetcodeSlug": "palindrome-linked-list-review"
  },
  {
    "id": "q047",
    "topicId": "linked_list",
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
      "python": "# 环形链表 II\ndef solve(head):\n    dummy = ListNode(0, head)\n    prev, cur = None, head\n    while cur:\n        nxt = cur.next\n        # 典型链表操作：先存 nxt，再改指针\n        cur.next = prev\n        prev, cur = cur, nxt\n    return prev",
      "java": "// 环形链表 II\nListNode solve(ListNode head) {\n    ListNode prev = null, cur = head;\n    while (cur != null) {\n        ListNode nxt = cur.next;\n        cur.next = prev;\n        prev = cur;\n        cur = nxt;\n    }\n    return prev;\n}",
      "cpp": "// 环形链表 II\nListNode* solve(ListNode* head) {\n    ListNode* prev = nullptr;\n    while (head) {\n        ListNode* nxt = head->next;\n        head->next = prev;\n        prev = head;\n        head = nxt;\n    }\n    return prev;\n}"
    },
    "description": "本题对应《环形链表 II》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 linked_list 相关方法中完成复杂度优化。",
    "leetcodeSlug": "linked-list-cycle-ii"
  },
  {
    "id": "q048",
    "topicId": "linked_list",
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
    "leetcodeSlug": "remove-duplicates-from-sorted-list-ii"
  },
  {
    "id": "q049",
    "topicId": "stack_queue",
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
    "leetcodeSlug": "valid-parentheses"
  },
  {
    "id": "q050",
    "topicId": "stack_queue",
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
    "leetcodeSlug": "min-stack"
  },
  {
    "id": "q051",
    "topicId": "stack_queue",
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
    "leetcodeSlug": "daily-temperatures"
  },
  {
    "id": "q052",
    "topicId": "stack_queue",
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
      "python": "def solve(tokens):\n    st = []\n    for t in tokens:\n        if t in [\"+\", \"-\", \"*\", \"/\"]:\n            b, a = st.pop(), st.pop()\n            if t == \"+\": st.append(a + b)\n            elif t == \"-\": st.append(a - b)\n            elif t == \"*\": st.append(a * b)\n            else: st.append(int(a / b))\n        else:\n            st.append(int(t))\n    return st[-1]",
      "java": "int solve(String[] tokens) {\n    Deque<Integer> st = new ArrayDeque<>();\n    for (String t : tokens) {\n        if (t.equals(\"+\") || t.equals(\"-\") || t.equals(\"*\") || t.equals(\"/\")) {\n            int b = st.pop(), a = st.pop();\n            if (t.equals(\"+\")) st.push(a + b);\n            else if (t.equals(\"-\")) st.push(a - b);\n            else if (t.equals(\"*\")) st.push(a * b);\n            else st.push(a / b);\n        } else st.push(Integer.parseInt(t));\n    }\n    return st.peek();\n}",
      "cpp": "int solve(vector<string>& tokens) {\n    stack<int> st;\n    for (auto &t : tokens) {\n        if (t == \"+\" || t == \"-\" || t == \"*\" || t == \"/\") {\n            int b = st.top(); st.pop();\n            int a = st.top(); st.pop();\n            if (t == \"+\") st.push(a + b);\n            else if (t == \"-\") st.push(a - b);\n            else if (t == \"*\") st.push(a * b);\n            else st.push(a / b);\n        } else st.push(stoi(t));\n    }\n    return st.top();\n}"
    },
    "leetcodeSlug": "largest-rectangle-in-histogram"
  },
  {
    "id": "q053",
    "topicId": "stack_queue",
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
    "leetcodeSlug": "evaluate-reverse-polish-notation"
  },
  {
    "id": "q054",
    "topicId": "stack_queue",
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
    "leetcodeSlug": "decode-string"
  },
  {
    "id": "q055",
    "topicId": "stack_queue",
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
    "leetcodeSlug": "sliding-window-maximum"
  },
  {
    "id": "q056",
    "topicId": "stack_queue",
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
    "leetcodeSlug": "implement-queue-using-stacks"
  },
  {
    "id": "q057",
    "topicId": "binary_search",
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
    "leetcodeSlug": "binary-search"
  },
  {
    "id": "q058",
    "topicId": "binary_search",
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
    "leetcodeSlug": "search-in-rotated-sorted-array"
  },
  {
    "id": "q059",
    "topicId": "binary_search",
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
    "leetcodeSlug": "find-peak-element"
  },
  {
    "id": "q060",
    "topicId": "binary_search",
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
    "leetcodeSlug": "find-first-and-last-position-of-element-in-sorted-array"
  },
  {
    "id": "q061",
    "topicId": "binary_search",
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
    "leetcodeSlug": "sqrtx"
  },
  {
    "id": "q062",
    "topicId": "binary_search",
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
      "python": "def solve(nums, target):\n    l, r = 0, len(nums) - 1\n    while l <= r:\n        m = l + (r - l) // 2\n        if nums[m] == target: return m\n        if nums[m] < target: l = m + 1\n        else: r = m - 1\n    return -1",
      "java": "int solve(int[] nums, int target) {\n    int l = 0, r = nums.length - 1;\n    while (l <= r) {\n        int m = l + (r - l) / 2;\n        if (nums[m] == target) return m;\n        if (nums[m] < target) l = m + 1;\n        else r = m - 1;\n    }\n    return -1;\n}",
      "cpp": "int solve(vector<int>& nums, int target) {\n    int l = 0, r = (int)nums.size() - 1;\n    while (l <= r) {\n        int m = l + (r - l) / 2;\n        if (nums[m] == target) return m;\n        if (nums[m] < target) l = m + 1;\n        else r = m - 1;\n    }\n    return -1;\n}"
    },
    "leetcodeSlug": "find-minimum-in-rotated-sorted-array"
  },
  {
    "id": "q063",
    "topicId": "binary_search",
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
    "leetcodeSlug": "koko-eating-bananas"
  },
  {
    "id": "q064",
    "topicId": "binary_search",
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
    "leetcodeSlug": "search-a-2d-matrix"
  },
  {
    "id": "q065",
    "topicId": "trees",
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
    "leetcodeSlug": "binary-tree-level-order-traversal"
  },
  {
    "id": "q066",
    "topicId": "trees",
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
      "python": "def dfs(root):\n    if not root: return 0\n    left = dfs(root.left)\n    right = dfs(root.right)\n    return 1 + max(left, right)",
      "java": "int dfs(TreeNode root) {\n    if (root == null) return 0;\n    int left = dfs(root.left);\n    int right = dfs(root.right);\n    return 1 + Math.max(left, right);\n}",
      "cpp": "int dfs(TreeNode* root) {\n    if (!root) return 0;\n    int left = dfs(root->left);\n    int right = dfs(root->right);\n    return 1 + max(left, right);\n}"
    },
    "leetcodeSlug": "validate-binary-search-tree"
  },
  {
    "id": "q067",
    "topicId": "trees",
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
    "leetcodeSlug": "lowest-common-ancestor-of-a-binary-tree"
  },
  {
    "id": "q068",
    "topicId": "trees",
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
    "leetcodeSlug": "invert-binary-tree"
  },
  {
    "id": "q069",
    "topicId": "trees",
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
    "leetcodeSlug": "path-sum"
  },
  {
    "id": "q070",
    "topicId": "trees",
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
    "leetcodeSlug": "diameter-of-binary-tree"
  },
  {
    "id": "q071",
    "topicId": "trees",
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
    "leetcodeSlug": "balanced-binary-tree"
  },
  {
    "id": "q072",
    "topicId": "trees",
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
    "leetcodeSlug": "binary-tree-maximum-path-sum"
  },
  {
    "id": "q073",
    "topicId": "trees",
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
    "leetcodeSlug": "construct-binary-tree-from-preorder-and-inorder-traversal"
  },
  {
    "id": "q074",
    "topicId": "trees",
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
    "leetcodeSlug": "kth-smallest-element-in-a-bst"
  },
  {
    "id": "q075",
    "topicId": "trees",
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
    "leetcodeSlug": "serialize-and-deserialize-binary-tree"
  },
  {
    "id": "q076",
    "topicId": "trees",
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
    "leetcodeSlug": "symmetric-tree"
  },
  {
    "id": "q077",
    "topicId": "graphs",
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
      "python": "from collections import deque\ndef bfs(start, graph):\n    q = deque([start])\n    vis = {start}\n    while q:\n        x = q.popleft()\n        for y in graph[x]:\n            if y not in vis:\n                vis.add(y)\n                q.append(y)",
      "java": "void bfs(int start, List<Integer>[] g) {\n    Queue<Integer> q = new LinkedList<>();\n    boolean[] vis = new boolean[g.length];\n    q.offer(start); vis[start] = true;\n    while (!q.isEmpty()) {\n        int x = q.poll();\n        for (int y : g[x]) if (!vis[y]) { vis[y] = true; q.offer(y); }\n    }\n}",
      "cpp": "void bfs(int start, vector<vector<int>>& g) {\n    queue<int> q; vector<int> vis(g.size());\n    q.push(start); vis[start] = 1;\n    while (!q.empty()) {\n        int x = q.front(); q.pop();\n        for (int y : g[x]) if (!vis[y]) { vis[y] = 1; q.push(y); }\n    }\n}"
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
    "leetcodeSlug": "number-of-islands"
  },
  {
    "id": "q078",
    "topicId": "graphs",
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
      "python": "from collections import deque\ndef bfs(start, graph):\n    q = deque([start])\n    vis = {start}\n    while q:\n        x = q.popleft()\n        for y in graph[x]:\n            if y not in vis:\n                vis.add(y)\n                q.append(y)",
      "java": "void bfs(int start, List<Integer>[] g) {\n    Queue<Integer> q = new LinkedList<>();\n    boolean[] vis = new boolean[g.length];\n    q.offer(start); vis[start] = true;\n    while (!q.isEmpty()) {\n        int x = q.poll();\n        for (int y : g[x]) if (!vis[y]) { vis[y] = true; q.offer(y); }\n    }\n}",
      "cpp": "void bfs(int start, vector<vector<int>>& g) {\n    queue<int> q; vector<int> vis(g.size());\n    q.push(start); vis[start] = 1;\n    while (!q.empty()) {\n        int x = q.front(); q.pop();\n        for (int y : g[x]) if (!vis[y]) { vis[y] = 1; q.push(y); }\n    }\n}"
    },
    "leetcodeSlug": "course-schedule"
  },
  {
    "id": "q079",
    "topicId": "graphs",
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
    "leetcodeSlug": "clone-graph"
  },
  {
    "id": "q080",
    "topicId": "graphs",
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
    "leetcodeSlug": "rotting-oranges"
  },
  {
    "id": "q081",
    "topicId": "graphs",
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
    "leetcodeSlug": "word-ladder"
  },
  {
    "id": "q082",
    "topicId": "graphs",
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
    "leetcodeSlug": "surrounded-regions"
  },
  {
    "id": "q083",
    "topicId": "graphs",
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
    "leetcodeSlug": "redundant-connection"
  },
  {
    "id": "q084",
    "topicId": "graphs",
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
    "leetcodeSlug": "network-delay-time"
  },
  {
    "id": "q085",
    "topicId": "dynamic_programming",
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
    "leetcodeSlug": "climbing-stairs"
  },
  {
    "id": "q086",
    "topicId": "dynamic_programming",
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
      "python": "# TODO: 打家劫舍 (house-robber)\n# INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\ndef solve(*args, **kwargs):\n    raise NotImplementedError('TODO: implement house-robber')",
      "java": "// TODO: 打家劫舍 (house-robber)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\n    public Object solve() {\n        throw new UnsupportedOperationException(\"TODO: implement house-robber\");\n    }\n}",
      "cpp": "// TODO: 打家劫舍 (house-robber)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\npublic:\n    void solve() {\n        throw std::logic_error(\"TODO: implement house-robber\");\n    }\n};"
    },
    "leetcodeSlug": "house-robber"
  },
  {
    "id": "q087",
    "topicId": "dynamic_programming",
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
    "leetcodeSlug": "coin-change"
  },
  {
    "id": "q088",
    "topicId": "dynamic_programming",
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
      "python": "# TODO: 最长递增子序列 (longest-increasing-subsequence)\n# INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\ndef solve(*args, **kwargs):\n    raise NotImplementedError('TODO: implement longest-increasing-subsequence')",
      "java": "// TODO: 最长递增子序列 (longest-increasing-subsequence)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\n    public Object solve() {\n        throw new UnsupportedOperationException(\"TODO: implement longest-increasing-subsequence\");\n    }\n}",
      "cpp": "// TODO: 最长递增子序列 (longest-increasing-subsequence)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\npublic:\n    void solve() {\n        throw std::logic_error(\"TODO: implement longest-increasing-subsequence\");\n    }\n};"
    },
    "leetcodeSlug": "longest-increasing-subsequence"
  },
  {
    "id": "q089",
    "topicId": "dynamic_programming",
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
      "python": "# TODO: 最长公共子序列 (longest-common-subsequence)\n# INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\ndef solve(*args, **kwargs):\n    raise NotImplementedError('TODO: implement longest-common-subsequence')",
      "java": "// TODO: 最长公共子序列 (longest-common-subsequence)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\n    public Object solve() {\n        throw new UnsupportedOperationException(\"TODO: implement longest-common-subsequence\");\n    }\n}",
      "cpp": "// TODO: 最长公共子序列 (longest-common-subsequence)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\npublic:\n    void solve() {\n        throw std::logic_error(\"TODO: implement longest-common-subsequence\");\n    }\n};"
    },
    "leetcodeSlug": "longest-common-subsequence"
  },
  {
    "id": "q090",
    "topicId": "dynamic_programming",
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
      "python": "# TODO: 分割等和子集 (partition-equal-subset-sum)\n# INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\ndef solve(*args, **kwargs):\n    raise NotImplementedError('TODO: implement partition-equal-subset-sum')",
      "java": "// TODO: 分割等和子集 (partition-equal-subset-sum)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\n    public Object solve() {\n        throw new UnsupportedOperationException(\"TODO: implement partition-equal-subset-sum\");\n    }\n}",
      "cpp": "// TODO: 分割等和子集 (partition-equal-subset-sum)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\npublic:\n    void solve() {\n        throw std::logic_error(\"TODO: implement partition-equal-subset-sum\");\n    }\n};"
    },
    "leetcodeSlug": "partition-equal-subset-sum"
  },
  {
    "id": "q091",
    "topicId": "dynamic_programming",
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
      "python": "# TODO: 编辑距离 (edit-distance)\n# INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\ndef solve(*args, **kwargs):\n    raise NotImplementedError('TODO: implement edit-distance')",
      "java": "// TODO: 编辑距离 (edit-distance)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\n    public Object solve() {\n        throw new UnsupportedOperationException(\"TODO: implement edit-distance\");\n    }\n}",
      "cpp": "// TODO: 编辑距离 (edit-distance)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\npublic:\n    void solve() {\n        throw std::logic_error(\"TODO: implement edit-distance\");\n    }\n};"
    },
    "leetcodeSlug": "edit-distance"
  },
  {
    "id": "q092",
    "topicId": "dynamic_programming",
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
      "python": "# TODO: 不同路径 (unique-paths)\n# INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\ndef solve(*args, **kwargs):\n    raise NotImplementedError('TODO: implement unique-paths')",
      "java": "// TODO: 不同路径 (unique-paths)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\n    public Object solve() {\n        throw new UnsupportedOperationException(\"TODO: implement unique-paths\");\n    }\n}",
      "cpp": "// TODO: 不同路径 (unique-paths)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\npublic:\n    void solve() {\n        throw std::logic_error(\"TODO: implement unique-paths\");\n    }\n};"
    },
    "leetcodeSlug": "unique-paths"
  },
  {
    "id": "q093",
    "topicId": "dynamic_programming",
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
    "leetcodeSlug": "longest-palindromic-substring"
  },
  {
    "id": "q094",
    "topicId": "dynamic_programming",
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
      "python": "# TODO: 单词拆分 (word-break)\n# INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\ndef solve(*args, **kwargs):\n    raise NotImplementedError('TODO: implement word-break')",
      "java": "// TODO: 单词拆分 (word-break)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\n    public Object solve() {\n        throw new UnsupportedOperationException(\"TODO: implement word-break\");\n    }\n}",
      "cpp": "// TODO: 单词拆分 (word-break)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\npublic:\n    void solve() {\n        throw std::logic_error(\"TODO: implement word-break\");\n    }\n};"
    },
    "leetcodeSlug": "word-break"
  },
  {
    "id": "q095",
    "topicId": "dynamic_programming",
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
      "python": "# TODO: 最大正方形 (maximal-square)\n# INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\ndef solve(*args, **kwargs):\n    raise NotImplementedError('TODO: implement maximal-square')",
      "java": "// TODO: 最大正方形 (maximal-square)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\n    public Object solve() {\n        throw new UnsupportedOperationException(\"TODO: implement maximal-square\");\n    }\n}",
      "cpp": "// TODO: 最大正方形 (maximal-square)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\npublic:\n    void solve() {\n        throw std::logic_error(\"TODO: implement maximal-square\");\n    }\n};"
    },
    "leetcodeSlug": "maximal-square"
  },
  {
    "id": "q096",
    "topicId": "dynamic_programming",
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
      "python": "# TODO: 买卖股票含冷冻期 (best-time-to-buy-and-sell-stock-with-cooldown)\n# INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\ndef solve(*args, **kwargs):\n    raise NotImplementedError('TODO: implement best-time-to-buy-and-sell-stock-with-cooldown')",
      "java": "// TODO: 买卖股票含冷冻期 (best-time-to-buy-and-sell-stock-with-cooldown)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\n    public Object solve() {\n        throw new UnsupportedOperationException(\"TODO: implement best-time-to-buy-and-sell-stock-with-cooldown\");\n    }\n}",
      "cpp": "// TODO: 买卖股票含冷冻期 (best-time-to-buy-and-sell-stock-with-cooldown)\n// INTENTIONAL_MISMATCH_PLACEHOLDER: 原代码与题意不一致，待按题目补全。\nclass Solution {\npublic:\n    void solve() {\n        throw std::logic_error(\"TODO: implement best-time-to-buy-and-sell-stock-with-cooldown\");\n    }\n};"
    },
    "leetcodeSlug": "best-time-to-buy-and-sell-stock-with-cooldown"
  },
  {
    "id": "q097",
    "topicId": "backtracking",
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
      "python": "def backtrack(path, used, nums, ans):\n    if len(path) == len(nums):\n        ans.append(path[:]); return\n    for i, x in enumerate(nums):\n        if used[i]: continue\n        used[i] = True\n        path.append(x)\n        backtrack(path, used, nums, ans)\n        path.pop()\n        used[i] = False",
      "java": "void backtrack(List<Integer> path, boolean[] used, int[] nums, List<List<Integer>> ans) {\n    if (path.size() == nums.length) { ans.add(new ArrayList<>(path)); return; }\n    for (int i = 0; i < nums.length; i++) {\n        if (used[i]) continue;\n        used[i] = true;\n        path.add(nums[i]);\n        backtrack(path, used, nums, ans);\n        path.remove(path.size() - 1);\n        used[i] = false;\n    }\n}",
      "cpp": "void backtrack(vector<int>& path, vector<int>& used, vector<int>& nums, vector<vector<int>>& ans) {\n    if (path.size() == nums.size()) { ans.push_back(path); return; }\n    for (int i = 0; i < (int)nums.size(); i++) {\n        if (used[i]) continue;\n        used[i] = 1;\n        path.push_back(nums[i]);\n        backtrack(path, used, nums, ans);\n        path.pop_back();\n        used[i] = 0;\n    }\n}"
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
    "leetcodeSlug": "permutations"
  },
  {
    "id": "q098",
    "topicId": "backtracking",
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
    "leetcodeSlug": "combination-sum"
  },
  {
    "id": "q099",
    "topicId": "backtracking",
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
      "python": "def backtrack(path, used, nums, ans):\n    if len(path) == len(nums):\n        ans.append(path[:]); return\n    for i, x in enumerate(nums):\n        if used[i]: continue\n        used[i] = True\n        path.append(x)\n        backtrack(path, used, nums, ans)\n        path.pop()\n        used[i] = False",
      "java": "void backtrack(List<Integer> path, boolean[] used, int[] nums, List<List<Integer>> ans) {\n    if (path.size() == nums.length) { ans.add(new ArrayList<>(path)); return; }\n    for (int i = 0; i < nums.length; i++) {\n        if (used[i]) continue;\n        used[i] = true;\n        path.add(nums[i]);\n        backtrack(path, used, nums, ans);\n        path.remove(path.size() - 1);\n        used[i] = false;\n    }\n}",
      "cpp": "void backtrack(vector<int>& path, vector<int>& used, vector<int>& nums, vector<vector<int>>& ans) {\n    if (path.size() == nums.size()) { ans.push_back(path); return; }\n    for (int i = 0; i < (int)nums.size(); i++) {\n        if (used[i]) continue;\n        used[i] = 1;\n        path.push_back(nums[i]);\n        backtrack(path, used, nums, ans);\n        path.pop_back();\n        used[i] = 0;\n    }\n}"
    },
    "leetcodeSlug": "n-queens"
  },
  {
    "id": "q100",
    "topicId": "heap",
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
    "leetcodeSlug": "top-k-frequent-elements-review"
  }
]
