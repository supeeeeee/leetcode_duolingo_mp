# Description Fix Report

## Summary
Total issues identified: 45

### Issue Types:
1. **Template descriptions**: 44 descriptions like "本题对应《XXX》" don't describe the actual problem
2. **Duplicate descriptions**: 1 description (q030) is identical to q012, missing two-pointers特色

---

## Changes Required

### 1. Template Descriptions - Must rewrite to describe actual problem

| ID | leetcodeSlug | Issue | Before | After |
|----|--------------|-------|--------|-------|
| q020 | decode-ways | 与 leetcodeSlug 题意不符 | 本题对应《字符串解码计数场景》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 hashmaps 相关方法中完成复杂度优化。 | 给定一个只包含数字的字符串 s，将它按规则解码为字符串。规则：'1'-'9' 单独解码为对应字符，'01'-'26' 组合解码为字母，求解码方式总数。 |
| q030 | trapping-rain-water-two-pointers | 与 q012 描述相同，缺少双指针特色 | 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。 | 使用双指针从两端向中间遍历，计算每个位置能接的雨水面积。 |
| q036 | substring-with-concatenation-of-all-words | 与 leetcodeSlug 题意不符 | 本题对应《串联所有单词的子串》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 sliding_window 相关方法中完成复杂度优化。 | 给定字符串 s 和单词数组 words，s 中所有串联 words 中所有单词的子串起始索引。 |
| q037 | fruit-into-baskets | 与 leetcodeSlug 题意不符 | 本题对应《水果成篮》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 sliding_window 相关方法中完成复杂度优化。 | 给定整数数组 fruits，求最多能采摘的果树数量，使只有两种不同类型的果树。 |
| q038 | longest-repeating-character-replacement | 与 leetcodeSlug 题意不符 | 本题对应《替换后的最长重复字符》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 sliding_window 相关方法中完成复杂度优化。 | 给定字符串 s 和整数 k，最多替换 k 个字符，求相同字符最长子串长度。 |
| q041 | linked-list-cycle | 与 leetcodeSlug 题意不符 | 本题对应《链表有环》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 linked_list 相关方法中完成复杂度优化。 | 给定链表，判断是否存在环。使用快慢指针，若相遇则存在环。 |
| q042 | reorder-list | 与 leetcodeSlug 题意不符 | 本题对应《重排链表》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 linked_list 相关方法中完成复杂度优化。 | 给定单链表，重排为 L0→Ln→L1→Ln-1→L2→Ln-2→... 的形式。 |
| q043 | reverse-nodes-in-k-group | 与 leetcodeSlug 题意不符 | 本题对应《K 个一组翻转链表》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 linked_list 相关方法中完成复杂度优化。 | 每 k 个节点一组反转链表，不足 k 个则保持原顺序。 |
| q044 | copy-list-with-random-pointer | 与 leetcodeSlug 题意不符 | 本题对应《复制带随机指针的链表》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 linked_list 相关方法中完成复杂度优化。 | 给定带随机指针的链表，深拷贝生成新链表。 |
| q045 | sort-list | 与 leetcodeSlug 题意不符 | 本题对应《排序链表》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 linked_list 相关方法中完成复杂度优化。 | 对链表进行 O(n log n) 排序，返回排序后的链表头。 |
| q047 | linked-list-cycle-ii | 与 leetcodeSlug 题意不符 | 本题对应《环形链表 II》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 linked_list 相关方法中完成复杂度优化。 | 给定链表，找出环的入口节点；若不存在环返回 null。 |
| q048 | remove-duplicates-from-sorted-list-ii | 与 leetcodeSlug 题意不符 | 本题对应《删除排序链表重复元素 II》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 linked_list 相关方法中完成复杂度优化。 | 删除排序链表中重复出现的节点，仅保留不重复的节点。 |
| q051 | daily-temperatures | 与 leetcodeSlug 题意不符 | 本题对应《每日温度》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 stack_queue 相关方法中完成复杂度优化。 | 给定每日气温数组，计算每一天需等几天才能等到更温暖的气温。 |
| q052 | largest-rectangle-in-histogram | 与 leetcodeSlug 题意不符 | 本题对应《柱状图最大矩形》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 stack_queue 相关方法中完成复杂度优化。 | 给定 n 个柱子的高度，求能形成的最大矩形面积。 |
| q053 | evaluate-reverse-polish-notation | 与 leetcodeSlug 题意不符 | 本题对应《逆波兰表达式求值》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 stack_queue 相关方法中完成复杂度优化。 | 给定逆波兰表达式，求表达式的值。运算符包括 +、-、*、/。 |
| q054 | decode-string | 与 leetcodeSlug 题意不符 | 本题对应《字符串解码》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 stack_queue 相关方法中完成复杂度优化。 | 给定编码字符串 s，如 3[a2[c]]，解码为 abcabcabc。 |
| q055 | sliding-window-maximum | 与 leetcodeSlug 题意不符 | 本题对应《滑动窗口最大值》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 stack_queue 相关方法中完成复杂度优化。 | 给定数组和滑动窗口大小，求每个窗口内的最大值。 |
| q056 | implement-queue-using-stacks | 与 leetcodeSlug 题意不符 | 本题对应《实现队列用栈》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 stack_queue 相关方法中完成复杂度优化。 | 使用栈实现队列的 push、pop、peek、empty 操作。 |
| q058 | search-in-rotated-sorted-array | 与 leetcodeSlug 题意不符 | 本题对应《搜索旋转排序数组》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 binary_search 相关方法中完成复杂度优化。 | 给定旋转后的排序数组和目标值，用二分查找定位目标位置。 |
| q059 | find-peak-element | 与 leetcodeSlug 题意不符 | 本题对应《寻找峰值》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 binary_search 相关方法中完成复杂度优化。 | 给定数组，找出任意一个峰值元素的下标。峰值比相邻元素都大。 |
| q060 | find-first-and-last-position-of-element-in-sorted-array | 与 leetcodeSlug 题意不符 | 本题对应《在排序数组中查找元素首尾位置》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 binary_search 相关方法中完成复杂度优化。 | 在排序数组中找出目标值的起始和结束位置，若不存在返回 [-1,-1]。 |
| q061 | sqrtx | 与 leetcodeSlug 题意不符 | 本题对应《x 的平方根》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 binary_search 相关方法中完成复杂度优化。 | 求整数 x 的平方根（向下取整），不使用库函数。 |
| q062 | find-minimum-in-rotated-sorted-array | 与 leetcodeSlug 题意不符 | 本题对应《寻找旋转数组最小值》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 binary_search 相关方法中完成复杂度优化。 | 在旋转排序数组中找出最小值，数组原本升序但被旋转。 |
| q063 | koko-eating-bananas | 与 leetcodeSlug 题意不符 | 本题对应《Koko 吃香蕉》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 binary_search 相关方法中完成复杂度优化。 | 给定香蕉堆数组和吃速 k，求 Koko 在 h 小时内吃完的最小 k。 |
| q064 | search-a-2d-matrix | 与 leetcodeSlug 题意不符 | 本题对应《搜索二维矩阵》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 binary_search 相关方法中完成复杂度优化。 | 在行列均升序的二维矩阵中查找目标值，矩阵左到右、上到下递增。 |
| q069 | path-sum | 与 leetcodeSlug 题意不符 | 本题对应《路径总和》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 trees 相关方法中完成复杂度优化。 | 给定二叉树和目标值 sum，判断是否存在根到叶子的路径和等于 sum。 |
| q070 | diameter-of-binary-tree | 与 leetcodeSlug 题意不符 | 本题对应《二叉树直径》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 trees 相关方法中完成复杂度优化。 | 给定二叉树，计算任意两个节点之间最长路径的边数。 |
| q071 | balanced-binary-tree | 与 leetcodeSlug 题意不符 | 本题对应《平衡二叉树》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 trees 相关方法中完成复杂度优化。 | 判断二叉树是否高度平衡，即左右子树高度差不超过 1。 |
| q072 | binary-tree-maximum-path-sum | 与 leetcodeSlug 题意不符 | 本题对应《二叉树最大路径和》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 trees 相关方法中完成复杂度优化。 | 在二叉树中找出最大路径和，路径可从任意节点开始和结束。 |
| q073 | construct-binary-tree-from-preorder-and-inorder-traversal | 与 leetcodeSlug 题意不符 | 本题对应《从前序与中序构造二叉树》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 trees 相关方法中完成复杂度优化。 | 给定前序和中序遍历结果，重建二叉树并返回根节点。 |
| q074 | kth-smallest-element-in-a-bst | 与 leetcodeSlug 题意不符 | 本题对应《二叉搜索树第 K 小》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 trees 相关方法中完成复杂度优化。 | 在二叉搜索树中找出第 k 小的节点值。 |
| q075 | serialize-and-deserialize-binary-tree | 与 leetcodeSlug 题意不符 | 本题对应《序列化二叉树》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 trees 相关方法中完成复杂度优化。 | 将二叉树序列化为字符串，并从字符串反序列化重建原树。 |
| q076 | symmetric-tree | 与 leetcodeSlug 题意不符 | 本题对应《对称二叉树》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 trees 相关方法中完成复杂度优化。 | 判断二叉树是否轴对称，即左右子树互为镜像。 |
| q079 | clone-graph | 与 leetcodeSlug 题意不符 | 本题对应《克隆图》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 graphs 相关方法中完成复杂度优化。 | 给定无向图邻接表，克隆完整图并返回新图的节点。 |
| q080 | rotting-oranges | 与 leetcodeSlug 题意不符 | 本题对应《腐烂的橘子》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 graphs 相关方法中完成复杂度优化。 | 给定腐烂和新鲜橘子网格，求所有橘子腐烂的最短时间。 |
| q081 | word-ladder | 与 leetcodeSlug 题意不符 | 本题对应《单词接龙》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 graphs 相关方法中完成复杂度优化。 | 给定起始词、结束词和词库，求最短转换序列长度，每次只改一个字符。 |
| q082 | surrounded-regions | 与 leetcodeSlug 题意不符 | 本题对应《被围绕的区域》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 graphs 相关方法中完成复杂度优化。 | 将矩阵中所有被 X 包围的 O 改为 X，边界上的 O 保持不变。 |
| q083 | redundant-connection | 与 leetcodeSlug 题意不符 | 本题对应《冗余连接》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 graphs 相关方法中完成复杂度优化。 | 给定无向树，删除一条边使图变成树，求被删除的边。 |
| q084 | network-delay-time | 与 leetcodeSlug 题意不符 | 本题对应《网络延迟时间》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 graphs 相关方法中完成复杂度优化。 | 给定带权有向图和起点，求到所有节点的最短路径最大值。 |
| q090 | partition-equal-subset-sum | 与 leetcodeSlug 题意不符 | 本题对应《分割等和子集》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 dynamic_programming 相关方法中完成复杂度优化。 | 判断数组能否分割成两个元素和相等的子集。 |
| q092 | unique-paths | 与 leetcodeSlug 题意不符 | 本题对应《不同路径》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 dynamic_programming 相关方法中完成复杂度优化。 | 给定 m×n 网格，机器人从左上角到右下角有多少条不同路径（只能右、下移动）。 |
| q093 | longest-palindromic-substring | 与 leetcodeSlug 题意不符 | 本题对应《最长回文子串》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 dynamic_programming 相关方法中完成复杂度优化。 | 在字符串 s 中找出最长回文子串，返回该子串。 |
| q094 | word-break | 与 leetcodeSlug 题意不符 | 本题对应《单词拆分》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 dynamic_programming 相关方法中完成复杂度优化。 | 判断字符串 s 能否由词典中的单词空格分隔拼接而成。 |
| q095 | maximal-square | 与 leetcodeSlug 题意不符 | 本题对应《最大正方形》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 dynamic_programming 相关方法中完成复杂度优化。 | 在只含 0 和 1 的矩阵中，找出全为 1 的最大正方形边长。 |
| q096 | best-time-to-buy-and-sell-stock-with-cooldown | 与 leetcodeSlug 题意不符 | 本题对应《买卖股票含冷冻期》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 dynamic_programming 相关方法中完成复杂度优化。 | 给定股票价格序列冷冻期，计算可获得的最大利润（可交易多次）。 |
| q098 | combination-sum | 与 leetcodeSlug 题意不符 | 本题对应《组合总和》。请依据原题定义实现算法，重点梳理输入输出、边界条件与不变量，并在 backtracking 相关方法中完成复杂度优化。 | 给定数组 candidates 和目标 target，找出和为目标的所有不重复组合。 |

---

## Total: 45 descriptions fixed
