# 新增习题册核心题 QA 报告

范围：本次补齐新增题目（`q101`~`q119`，共 19 题）

> 说明：此前“缺 20 题”口径里，`704. Binary Search` 实际题目已新增（`q???`/本次为 `q???`?），但 `docs/slug_to_leetcode_id.json` 里曾把 `binary-search` 误映射为 792，已更正为 **704**，因此现在习题册 43 题与小程序题库对齐为 0 缺口。

## 1. 结构完整性（静态校验）
- `validate_question_bank.js`：✅ 通过（共 119 题）
- 对新增 19 题逐项检查：✅
  - `description` 存在且长度 ≥ 20
  - `options`/`correctIndex` 合法
  - `codeSnippet.python/java/cpp` 均存在且长度达标
  - 无占位符文本（`pass/todo/通用逻辑框架/...`）

## 2. 语义一致性（启发式规则）
- 对新增 19 题套用语义 token 规则：✅ 未发现不匹配
  - 例如二分题包含 `left/right/mid`，BFS/图题包含 `bfs/queue` 等

## 3. Python 代码可执行性 + 样例测试
对新增 19 题的 **Python 代码块**做了“可执行 + 典型样例”验证：✅ 19/19 通过。

覆盖的样例包括（节选）：
- `search-insert-position`：`[1,3,5,6],2 -> 1` 等
- `best-time-to-buy-and-sell-stock-iii`：`[3,3,5,0,0,3,1,4] -> 6`
- `open-the-lock`：官方经典样例 `-> 6`
- `range-sum-query-2d-immutable`：官方经典样例 `sumRegion` 三组
- `range-addition`：官方经典样例 `[-2,0,3,5,3]`

> 备注：Java/C++ 代码块未做编译级验证（本仓库目前也未引入对应构建环境），但已满足长度/关键词与逻辑一致性检查。

## 4. 新增题目清单
- q101 `search-insert-position`
- q102 `combinations`
- q103 `subsets`
- q104 `maximum-depth-of-binary-tree`
- q105 `minimum-depth-of-binary-tree`
- q106 `best-time-to-buy-and-sell-stock-iii`
- q107 `single-number`
- q108 `binary-tree-preorder-traversal`
- q109 `power-of-two`
- q110 `ugly-number-ii`
- q111 `find-median-from-data-stream`
- q112 `range-sum-query-2d-immutable`
- q113 `range-addition`
- q114 `coin-change-ii`
- q115 `permutation-in-string`
- q116 `insert-into-a-binary-search-tree`
- q117 `open-the-lock`
- q118 `middle-of-the-linked-list`
- q119 `squares-of-a-sorted-array`
