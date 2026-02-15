# Labuladong 算法学习习题册

## 项目概述

本习题册基于 labuladong 的fucking-algorithm项目整理而成，涵盖了60多篇原创文章的所有核心算法知识点。项目特点是通过**举一反三、通俗易懂**的方式讲解算法，不仅告诉读者"怎么解"，更强调"为什么这样解"，帮助建立系统性的算法思维框架。

## 核心框架思维

### 1. 数据结构与算法的基本框架

所有数据结构的遍历都可以用以下框架概括：

```python
def traverse(treeNode):
    if not treeNode:
        return
    # 前序位置：进入节点时
    traverse(treeNode.left)
    # 中序位置：左子树遍历完
    traverse(treeNode.right)
    # 后序位置：左右子树都遍历完
```

这个框架可以应用到链表、数组、二叉树、图等所有数据结构的遍历中。

---

## 第一章：双指针技巧

### 1.1 链表双指针技巧

#### 题目：LeetCode 141. 环形链表

**题目描述**：给定一个链表，判断链表中是否有环。

**可能出现的问题**：
- 使用快慢指针时，快指针每次走两步，慢指针每次走一步，当两者相遇时说明有环
- 注意边界条件的处理，当链表为空或只有一个节点时直接返回False

**解析**：
快慢指针的核心思想是利用两个指针的步速差异来检测循环。如果存在环，快指针一定会"追上"慢指针。

```python
class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        slow = fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow == fast:
                return True
        return False
```

时间复杂度O(n)，空间复杂度O(1)。

#### 题目：LeetCode 142. 环形链表 II

**题目描述**：给定一个链表，返回链表开始入环的第一个节点。如果链表无环，则返回null。

**可能出现的问题**：
- 第一步快慢指针相遇后，需要将其中一个指针移到头节点，然后两个指针每次走一步，再次相遇的节点就是环的入口
- 这个结论的数学证明是关键，理解为什么慢指针走L+C步时，快指针走了L+C+n*C步

**解析**：
这个问题的关键在于数学推导。设环入口到相遇点的距离为C，相遇点到环入口的距离为L。当快慢指针相遇时，慢指针走了L+C步，快指针走了L+C+nC步（n是圈数）。由于快指针速度是慢指针的2倍，所以2(L+C) = L+C+nC，解得L = (n-1)C+L，n至少为1。

```python
class Solution:
    def detectCycle(self, head: Optional[ListNode]) -> Optional[ListNode]:
        slow = fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow == fast:
                slow = head
                while slow != fast:
                    slow = slow.next
                    fast = fast.next
                return slow
        return None
```

#### 题目：LeetCode 21. 合并两个有序链表

**题目描述**：将两个升序链表合并为一个新的升序链表并返回。

**可能出现的问题**：
- 使用虚拟头节点可以简化边界条件处理
- 需要处理一个链表为空的情况
- 递归解法更加简洁

**解析**：
合并两个有序链表的经典方法是比较两个链表当前节点的值，将较小的节点接入结果链表。

```python
class Solution:
    def mergeTwoLists(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode(0)
        cur = dummy
        while l1 and l2:
            if l1.val < l2.val:
                cur.next = l1
                l1 = l1.next
            else:
                cur.next = l2
                l2 = l2.next
            cur = cur.next
        cur.next = l1 if l1 else l2
        return dummy.next
```

递归版本：
```python
class Solution:
    def mergeTwoLists(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        if not l1: return l2
        if not l2: return l1
        if l1.val < l2.val:
            l1.next = self.mergeTwoLists(l1.next, l2)
            return l1
        else:
            l2.next = self.mergeTwoLists(l1, l2.next)
            return l2
```

#### 题目：LeetCode 876. 链表的中间结点

**题目描述**：给定一个非空单链表，返回链表的中间结点。

**可能出现的问题**：
- 快慢指针是解决这个问题的最优方法
- 当链表有偶数个节点时，返回中间两个中的第二个

**解析**：
使用快慢指针，慢指针每次走一步，快指针每次走两步。当快指针到达末尾时，慢指针恰好在中间。

```python
class Solution:
    def middleNode(self, head: Optional[ListNode]) -> Optional[ListNode]:
        slow = fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
        return slow
```

#### 题目：LeetCode 19. 删除链表的倒数第 N 个结点

**题目描述**：给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。

**可能出现的问题**：
- 需要找到倒数第n个节点的前一个节点才能完成删除
- 虚拟头节点可以避免处理头节点被删除的情况
- 快指针先走n步，然后快慢指针一起走

**解析**：
核心技巧是先让快指针走n步，然后快慢指针一起走，当快指针到达末尾时，慢指针指向的正好是倒数第n个节点的前一个。

```python
class Solution:
    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
        dummy = ListNode(0, head)
        fast = slow = dummy
        for _ in range(n + 1):
            fast = fast.next
        while fast:
            fast = fast.next
            slow = slow.next
        slow.next = slow.next.next
        return dummy.next
```

### 1.2 数组双指针技巧

#### 题目：LeetCode 26. 删除有序数组中的重复项

**题目描述**：给你一个升序排列的数组，原地删除重复出现的元素，使每个元素只出现一次，返回删除后数组的新长度。

**可能出现的问题**：
- 原地修改数组，不能使用额外的数组
- 需要返回新长度，后面的元素不重要
- 使用快慢指针，快指针遍历，慢指针指向有效数组的末尾

**解析**：
快慢指针的经典应用。快指针用于遍历数组，慢指针用于维护不重复的元素序列。

```python
class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        if not nums: return 0
        slow = fast = 1
        while fast < len(nums):
            if nums[fast] != nums[slow - 1]:
                nums[slow] = nums[fast]
                slow += 1
            fast += 1
        return slow
```

#### 题目：LeetCode 977. 有序数组的平方

**题目描述**：给你一个按非递减顺序排序的整数数组 nums，返回每个数字的平方组成的新数组，要求也按非递减顺序排序。

**可能出现的问题**：
- 数组本身是排序的，但平方后可能打乱顺序
- 负数的平方可能比正数的平方大
- 需要从数组两端向中间遍历

**解析**：
由于数组是有序的，最大值只可能出现在两端。使用双指针分别指向两端，比较后放入结果数组的末尾。

```python
class Solution:
    def sortedSquares(self, nums: List[int]) -> List[int]:
        n = len(nums)
        left, right = 0, n - 1
        result = [0] * n
        pos = n - 1
        while left <= right:
            if nums[left] * nums[left] > nums[right] * nums[right]:
                result[pos] = nums[left] * nums[left]
                left += 1
            else:
                result[pos] = nums[right] * nums[right]
                right -= 1
            pos -= 1
        return result
```

#### 题目：LeetCode 15. 三数之和

**题目描述**：给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a, b, c ，使得 a + b + c = 0 ？找出所有和为 0 且不重复的三元组。

**可能出现的问题**：
- 需要去重，避免重复的三元组
- 先对数组排序，然后固定一个元素，用双指针找另外两个
- 跳过重复元素是关键

**解析**：
先对数组排序，然后固定第一个元素，使用双指针寻找另外两个元素的和为第一个元素的相反数。

```python
class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        nums.sort()
        n = len(nums)
        result = []
        for i in range(n - 2):
            if i > 0 and nums[i] == nums[i - 1]:
                continue
            if nums[i] > 0:
                break
            left, right = i + 1, n - 1
            while left < right:
                total = nums[i] + nums[left] + nums[right]
                if total < 0:
                    left += 1
                elif total > 0:
                    right -= 1
                else:
                    result.append([nums[i], nums[left], nums[right]])
                    while left < right and nums[left] == nums[left + 1]:
                        left += 1
                    while left < right and nums[right] == nums[right - 1]:
                        right -= 1
                    left += 1
                    right -= 1
        return result
```

---

## 第二章：滑动窗口算法

### 2.1 滑动窗口核心模板

#### 题目：LeetCode 76. 最小覆盖子串

**题目描述**：给你一个字符串 s 和一个字符串 t ，返回 s 中涵盖 t 所有字符的最小子串。

**可能出现的问题**：
- 需要统计t中每个字符的出现次数
- 使用哈希表记录窗口中字符的出现次数
- 当窗口包含t的所有字符时，尝试缩小窗口

**解析**：
这是滑动窗口的经典题目。核心思想是用两个指针维护一个窗口，右指针扩展窗口，左指针缩小窗口，同时用哈希表记录窗口中各字符的数量。

```python
class Solution:
    def minWindow(self, s: str, t: str) -> str:
        from collections import Counter, defaultdict
        need = Counter(t)
        missing = len(t)
        left = 0
        start = 0
        min_len = float('inf')
        
        for right, c in enumerate(s):
            if need[c] > 0:
                missing -= 1
            need[c] -= 1
            
            while missing == 0:
                if right - left + 1 < min_len:
                    min_len = right - left + 1
                    start = left
                need[s[left]] += 1
                if need[s[left]] > 0:
                    missing += 1
                left += 1
        
        return "" if min_len == float('inf') else s[start:start + min_len]
```

#### 题目：LeetCode 567. 字符串的排列

**题目描述**：给你两个字符串 s1 和 s2 ，写一个函数来判断 s2 是否包含 s1 的排列，如果是，返回 true ；否则，返回 false 。

**可能出现的问题**：
- s1的排列说明是s1字符的重排列，长度相同
- 滑动窗口大小固定为s1的长度
- 需要比较两个字符串的字符频率是否相同

**解析**：
固定大小的滑动窗口，每次滑动时更新窗口内字符的频率，然后与目标频率比较。

```python
class Solution:
    def checkInclusion(self, s1: str, s2: str) -> bool:
        from collections import Counter
        need = Counter(s1)
        missing = len(s1)
        left = 0
        
        for right, c in enumerate(s2):
            if need[c] > 0:
                missing -= 1
            need[c] -= 1
            
            if right - left + 1 > len(s1):
                left_c = s2[left]
                need[left_c] += 1
                if need[left_c] > 0:
                    missing += 1
                left += 1
            
            if missing == 0:
                return True
        
        return False
```

#### 题目：LeetCode 438. 找到字符串中所有字母的异位词

**题目描述**：给定两个字符串 s 和 p ，找到 s 中所有 p 的异位词，返回这些异位词的起始索引。

**可能出现的问题**：
- 异位词就是字符重排列，长度相同
- 需要返回所有符合条件的起始索引
- 滑动窗口的大小固定为p的长度

**解析**：
与上一题类似，但需要记录所有匹配的起始位置。

```python
class Solution:
    def findAnagrams(self, s: str, p: str) -> List[int]:
        from collections import Counter
        need = Counter(p)
        missing = len(p)
        left = 0
        result = []
        
        for right, c in enumerate(s):
            if need[c] > 0:
                missing -= 1
            need[c] -= 1
            
            if right - left + 1 > len(p):
                left_c = s[left]
                need[left_c] += 1
                if need[left_c] > 0:
                    missing += 1
                left += 1
            
            if missing == 0:
                result.append(left)
        
        return result
```

#### 题目：LeetCode 3. 无重复字符的最长子串

**题目描述**：给定一个字符串 s ，请你找出其中不含有重复字符的最长子串的长度。

**可能出现的问题**：
- 需要记录每个字符最近出现的位置
- 当出现重复字符时，左指针需要移动到重复字符的下一个位置

**解析**：
使用滑动窗口配合哈希表（记录字符最近出现的位置）来维护无重复字符的最长子串。

```python
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        from collections import defaultdict
        window = defaultdict(int)
        left = 0
        max_len = 0
        
        for right, c in enumerate(s):
            if window[c] > 0:
                left = max(left, window[c])
            window[c] = right + 1
            max_len = max(max_len, right - left + 1)
        
        return max_len
```

---

## 第三章：二分搜索

### 3.1 二分搜索核心模板

#### 题目：LeetCode 704. 二分查找

**题目描述**：给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target ，写一个函数搜索 nums 中的 target ，如果目标值存在返回下标，否则返回 -1。

**可能出现的问题**：
- 边界条件的处理：循环条件使用left <= right
- 中间值的计算：left + (right - left) // 2防止溢出
- 返回值的选择：找到返回下标，否则返回-1

**解析**：
标准的二分查找模板，需要熟练掌握。

```python
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        left, right = 0, len(nums) - 1
        while left <= right:
            mid = left + (right - left) // 2
            if nums[mid] == target:
                return mid
            elif nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
        return -1
```

#### 题目：LeetCode 35. 搜索插入位置

**题目描述**：给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

**可能出现的问题**：
- 当目标值不存在时，返回的是它应该插入的位置
- 这个位置恰好是第一个大于等于目标值的位置

**解析**：
修改标准的二分查找，当找到目标值时直接返回，当循环结束时，left的位置就是插入位置。

```python
class Solution:
    def searchInsert(self, nums: List[int], target: int) -> int:
        left, right = 0, len(nums) - 1
        while left <= right:
            mid = left + (right - left) // 2
            if nums[mid] == target:
                return mid
            elif nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
        return left
```

#### 题目：LeetCode 33. 搜索旋转排序数组

**题目描述**：整数数组 nums 按升序排列，数组中的值互不相同。给你一个整数 target ，如果 nums 中存在这个目标值，则返回其索引，否则返回 -1。

**可能出现的问题**：
- 旋转数组的特点：一部分是有序的，另一部分也是有序的
- 需要判断mid位于哪一部分有序区间
- 判断target是否在有序区间内

**解析**：
旋转数组虽然被旋转，但总有一半是有序的。每次判断target与mid的关系，以及target与有序区间端点的关系。

```python
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        left, right = 0, len(nums) - 1
        while left <= right:
            mid = (left + right) // 2
            if nums[mid] == target:
                return mid
            # 判断左半部分是否有序
            if nums[left] <= nums[mid]:
                if nums[left] <= target < nums[mid]:
                    right = mid - 1
                else:
                    left = mid + 1
            # 右半部分有序
            else:
                if nums[mid] < target <= nums[right]:
                    left = mid + 1
                else:
                    right = mid - 1
        return -1
```

#### 题目：LeetCode 153. 寻找旋转排序数组中的最小值

**题目描述**：已知一个长度为 n 的数组 nums 预先按升序排序过，并在未知的 k 个点上进行了旋转。请找出数组中的最小元素。

**可能出现的问题**：
- 旋转数组的最小值位于"旋转点"
- 最小值右边的元素都大于等于最小值
- 可以通过比较mid和right来判断最小值的位置

**解析**：
使用二分查找，比较mid和right的元素大小。如果mid > right，说明最小值在mid右侧；如果mid <= right，说明最小值在mid左侧（包括mid）。

```python
class Solution:
    def findMin(self, nums: List[int]) -> int:
        left, right = 0, len(nums) - 1
        while left < right:
            mid = (left + right) // 2
            if nums[mid] > nums[right]:
                left = mid + 1
            else:
                right = mid
        return nums[left]
```

---

## 第四章：前缀和与差分数组

### 4.1 前缀和数组

#### 题目：LeetCode 560. 和为 K 的子数组

**题目描述**：给定一个整数数组和一个整数 k ，返回该数组中 子数组 和为 k 的个数。

**可能出现的问题**：
- 子数组是连续的
- 需要快速计算任意区间的和
- 使用前缀和配合哈希表来统计

**解析**：
前缀和的经典应用。对于每个位置i，计算前缀和pre[i]，需要找前面有多少个前缀和等于pre[i] - k。

```python
class Solution:
    def subarraySum(self, nums: List[int], k: int) -> int:
        from collections import defaultdict
        prefix_sum = defaultdict(int)
        prefix_sum[0] = 1
        pre = 0
        count = 0
        for num in nums:
            pre += num
            count += prefix_sum[pre - k]
            prefix_sum[pre] += 1
        return count
```

#### 题目：LeetCode 304. 二维区域和检索 - 矩阵不可变

**题目描述**：给定一个二维矩阵 matrix，处理多个查询，每个查询由左上角 (row1, col1) 和右下角 (row2, col2) 定义。返回矩阵区域内元素的总和。

**可能出现的问题**：
- 需要预处理一个二维前缀和数组
- 通过容斥原理计算任意子矩阵的和

**解析**：
构建二维前缀和dp，其中dp[i][j]表示从(0,0)到(i-1,j-1)这个子矩阵的元素和。

```python
class NumMatrix:
    def __init__(self, matrix: List[List[int]]):
        if not matrix or not matrix[0]:
            return
        m, n = len(matrix), len(matrix[0])
        self.prefix = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(m):
            for j in range(n):
                self.prefix[i + 1][j + 1] = self.prefix[i][j + 1] + self.prefix[i + 1][j] - self.prefix[i][j] + matrix[i][j]
    
    def sumRegion(self, row1: int, col1: int, row2: int, col2: int) -> int:
        return self.prefix[row2 + 1][col2 + 1] - self.prefix[row1][col2 + 1] - self.prefix[row2 + 1][col1] + self.prefix[row1][col1]
```

### 4.2 差分数组

#### 题目：LeetCode 370. 区间加法

**题目描述**：假设你有一个长度为 n 的数组，初始值全部为 0。给你 m 个操作，每个操作表示为 [startIndex, endIndex, inc]，表示将子数组 startIndex...endIndex 的每个元素增加 inc。返回修改后的数组。

**可能出现的问题**：
- 如果直接对每个操作遍历数组，时间复杂度是O(m*n)
- 使用差分数组可以在O(m+n)时间内完成
- 差分数组的核心是记录相邻元素的差值

**解析**：
使用差分数组diff，对每个操作在diff[startIndex] += inc，diff[endIndex+1] -= inc，然后对diff求前缀和得到原数组。

```python
class Solution:
    def getModifiedArray(self, length: int, updates: List[List[int]]) -> List[int]:
        diff = [0] * (length + 1)
        for start, end, inc in updates:
            diff[start] += inc
            diff[end + 1] -= inc
        result = [0] * length
        result[0] = diff[0]
        for i in range(1, length):
            result[i] = result[i - 1] + diff[i]
        return result
```

---

## 第五章：回溯算法

### 5.1 回溯算法核心框架

#### 题目：LeetCode 46. 全排列

**题目描述**：给定一个不含重复数字的数组，返回其所有可能的全排列。

**可能出现的问题**：
- 需要记录哪些元素已经被使用
- 使用交换法可以避免使用额外的visited数组
- 回溯的三个要素：路径、选择列表、结束条件

**解析**：
经典的回溯问题。通过交换将当前元素放到路径末尾，然后递归处理剩余元素。

```python
class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        result = []
        def backtrack(first=0):
            if first == len(nums):
                result.append(nums[:])
                return
            for i in range(first, len(nums)):
                nums[first], nums[i] = nums[i], nums[first]
                backtrack(first + 1)
                nums[first], nums[i] = nums[i], nums[first]
        backtrack()
        return result
```

#### 题目：LeetCode 78. 子集

**题目描述**：给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。

**可能出现的问题**：
- 子集问题可以转化为组合问题
- 每个元素都有选和不选两种选择
- 递归或者迭代都可以解决

**解析**：
每个元素都有"选"和"不选"两种选择，递归遍历所有可能。

```python
class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        result = []
        subset = []
        def backtrack(start):
            result.append(subset[:])
            for i in range(start, len(nums)):
                subset.append(nums[i])
                backtrack(i + 1)
                subset.pop()
        backtrack(0)
        return result
```

#### 题目：LeetCode 77. 组合

**题目描述**：给定两个整数 n 和 k，返回所有所有可能的 k 个数的组合。

**可能出现的问题**：
- 组合是有序的，{1,2}和{2,1}是同一个组合
- 需要控制递归的深度为k
- 通过start参数控制选择范围

**解析**：
组合问题与子集问题类似，但需要控制路径长度为k。

```python
class Solution:
    def combine(self, n: int, k: int) -> List[List[int]]:
        result = []
        path = []
        def backtrack(start):
            if len(path) == k:
                result.append(path[:])
                return
            for i in range(start, n + 1):
                path.append(i)
                backtrack(i + 1)
                path.pop()
        backtrack(1)
        return result
```

#### 题目：LeetCode 51. N 皇后

**题目描述**：按照国际象棋的规则，皇后可以攻击与之处在同一行或同一列或同一斜线上的棋子。设计一种算法，打印 N 皇后不同的摆法的方式。

**可能出现的问题**：
- 需要检测列、对角线、反对角线上的皇后冲突
- 使用三个集合分别记录列、主对角线、副对角线的占用情况
- 深度优先搜索逐行放置皇后

**解析**：
N皇后问题的核心是如何高效地检测皇后之间的冲突。使用集合记录已放置皇后的列、主对角线和副对角线。

```python
class Solution:
    def solveNQueens(self, n: int) -> List[List[str]]:
        result = []
        cols = set()
        pos_diags = set()  # row + col
        neg_diags = set()  # row - col
        board = [['.' for _ in range(n)] for _ in range(n)]
        
        def backtrack(row):
            if row == n:
                result.append([''.join(row) for row in board])
                return
            for col in range(n):
                if col in cols or (row + col) in pos_diags or (row - col) in neg_diags:
                    continue
                cols.add(col)
                pos_diags.add(row + col)
                neg_diags.add(row - col)
                board[row][col] = 'Q'
                backtrack(row + 1)
                board[row][col] = '.'
                cols.remove(col)
                pos_diags.remove(row + col)
                neg_diags.remove(row - col)
        
        backtrack(0)
        return result
```

---

## 第六章：BFS算法

### 6.1 BFS核心框架

#### 题目：LeetCode 111. 二叉树的最小深度

**题目描述**：给定一个二叉树，找出其最小深度。最小深度是从根节点到最近叶子节点的最短路径的节点数量。

**可能出现的问题**：
- BFS适合求解最短路径问题
- 需要找到第一个叶子节点所在的层
- 队列中需要同时保存节点和深度

**解析**：
BFS天然适合求最短路径问题，因为BFS是按层遍历的。

```python
class Solution:
    def minDepth(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        from collections import deque
        queue = deque([(root, 1)])
        while queue:
            node, depth = queue.popleft()
            if not node.left and not node.right:
                return depth
            if node.left:
                queue.append((node.left, depth + 1))
            if node.right:
                queue.append((node.right, depth + 1))
        return 0
```

#### 题目：LeetCode 752. 打开转盘锁

**题目描述**：你有一个带有四个圆形拨轮的转盘锁。每个拨轮有10个数字： '0' - '9' 。每个拨轮可以向前或向后转动一次。锁的初始状态是 '0000' ，给定一个包含死亡数字的列表 deadends，如果锁的状态出现在 deadends 中，则锁将永久锁住，无法转动。给定目标 target，求从初始状态到目标状态所需的最少转动次数。

**可能出现的问题**：
- 状态空间最多10^4个，可以进行BFS
- 需要处理死亡数字，不能转动到这些状态
- 使用visited集合避免重复访问

**解析**：
将每个锁的状态看成一个节点，每次转动一个拨轮产生新状态，使用BFS求最短路径。

```python
class Solution:
    def openLock(self, deadends: List[str], target: String) -> int:
        if target == "0000":
            return 0
        dead = set(deadends)
        if "0000" in dead:
            return -1
        from collections import deque
        queue = deque(["0000"])
        visited = {"0000"}
        steps = 0
        while queue:
            steps += 1
            for _ in range(len(queue)):
                s = queue.popleft()
                for i in range(4):
                    for d in [-1, 1]:
                        new_s = list(s)
                        new_s[i] = str((int(new_s[i]) + d + 10) % 10)
                        new_s = ''.join(new_s)
                        if new_s == target:
                            return steps
                        if new_s in dead or new_s in visited:
                            continue
                        visited.add(new_s)
                        queue.append(new_s)
        return -1
```

---

## 第七章：动态规划

### 7.1 动态规划核心框架

#### 题目：LeetCode 300. 最长递增子序列

**题目描述**：给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。

**可能出现的问题**：
- 子序列不要求连续，但需要保持相对顺序
- DP解法时间复杂度O(n^2)
- 可以使用二分搜索优化到O(n log n)

**解析**：
dp[i]表示以nums[i]结尾的最长递增子序列长度，状态转移方程为dp[i] = max(dp[j] + 1) where j < i and nums[j] < nums[i]。

```python
class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        if not nums:
            return 0
        n = len(nums)
        dp = [1] * n
        for i in range(n):
            for j in range(i):
                if nums[j] < nums[i]:
                    dp[i] = max(dp[i], dp[j] + 1)
        return max(dp)
```

二分搜索优化版本：
```python
class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        from bisect import bisect_left
        tails = []
        for num in nums:
            idx = bisect_left(tails, num)
            if idx == len(tails):
                tails.append(num)
            else:
                tails[idx] = num
        return len(tails)
```

#### 题目：LeetCode 53. 最大子数组和

**题目描述**：给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回最大和。

**可能出现的问题**：
- 连续子数组，所以必须相邻
- 使用动态规划时关注以每个位置结尾的最大子数组和
- Kadane算法是经典解法

**解析**：
dp[i]表示以nums[i]结尾的最大子数组和，状态转移方程为dp[i] = max(nums[i], dp[i-1] + nums[i])。

```python
class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        n = len(nums)
        dp = [0] * n
        dp[0] = nums[0]
        for i in range(1, n):
            dp[i] = max(nums[i], dp[i-1] + nums[i])
        return max(dp)
```

空间优化版本：
```python
class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        cur = max_sum = nums[0]
        for i in range(1, len(nums)):
            cur = max(nums[i], cur + nums[i])
            max_sum = max(max_sum, cur)
        return max_sum
```

### 7.2 背包问题

#### 题目：LeetCode 416. 分割等和子集

**题目描述**：给定一个只包含正整数的非空数组。是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。

**可能出现的问题**：
- 这是一个01背包问题
- 背包容量是总和的一半
- 需要判断是否存在子集的和恰好等于target

**解析**：
将问题转化为：是否存在子集，其和等于总和的一半。使用01背包的思路求解。

```python
class Solution:
    def canPartition(self, nums: List[int]) -> bool:
        total = sum(nums)
        if total % 2 != 0:
            return False
        target = total // 2
        n = len(nums)
        dp = [False] * (target + 1)
        dp[0] = True
        for num in nums:
            for j in range(target, num - 1, -1):
                dp[j] = dp[j] or dp[j - num]
        return dp[target]
```

#### 题目：LeetCode 518. 零钱兑换 II

**题目描述**：给定不同面额的硬币和一个总金额，计算可以凑成总金额的硬币组合数。

**可能出现的问题**：
- 这是完全背包问题
- 组合问题，需要考虑顺序无关
- 外层循环遍历硬币，内层循环遍历金额

**解析**：
完全背包问题，求组合数。外层循环遍历物品，内层循环遍历背包容量。

```python
class Solution:
    def change(self, amount: int, coins: List[int]) -> int:
        dp = [0] * (amount + 1)
        dp[0] = 1
        for coin in coins:
            for j in range(coin, amount + 1):
                dp[j] += dp[j - coin]
        return dp[amount]
```

### 7.3 股票买卖系列

#### 题目：LeetCode 121. 买卖股票的最佳时机

**题目描述**：给定一个数组 prices ，它的第 i 个元素表示第 i 天股票的价格。只能进行一次买卖（买入一次，卖出一次），求最大利润。

**可能出现的问题**：
- 需要找到最低价格和最高价格
- 最低价格必须在最高价格之前
- 一次遍历即可完成

**解析**：
维护到目前为止的最低价格和最大利润。

```python
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        min_price = float('inf')
        max_profit = 0
        for price in prices:
            min_price = min(min_price, price)
            max_profit = max(max_profit, price - min_price)
        return max_profit
```

#### 题目：LeetCode 123. 买卖股票的最佳时机 III

**题目描述**：最多可以完成两笔交易，设计一个算法来计算你所能获取的最大利润。

**可能出现的问题**：
- 最多两笔交易，意味着可以买卖两次，或者买卖一次，或者不买卖
- 需要记录买卖状态
- 可以使用状态机来简化问题

**解析**：
使用四个变量分别记录：第一天结束时买入第一支股票的利润，第一天结束时卖出第一支股票的利润，第一天结束时买入第二支股票的利润，第一天结束时卖出第二支股票的利润。

```python
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        if not prices:
            return 0
        buy1 = sell1 = buy2 = sell2 = 0
        for price in prices:
            buy1 = max(buy1, -price)
            sell1 = max(sell1, buy1 + price)
            buy2 = max(buy2, sell1 - price)
            sell2 = max(sell2, buy2 + price)
        return sell2
```

---

## 第八章：二叉树算法

### 8.1 二叉树遍历框架

#### 题目：LeetCode 144. 二叉树的前序遍历

**题目描述**：给你二叉树的根节点 root ，返回它节点值的前序遍历。

**可能出现的问题**：
- 前序遍历：根-左-右
- 递归实现简洁明了
- 迭代实现需要使用栈

**解析**：
递归版本：
```python
class Solution:
    def preorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        result = []
        def traverse(node):
            if not node:
                return
            result.append(node.val)
            traverse(node.left)
            traverse(node.right)
        traverse(root)
        return result
```

迭代版本：
```python
class Solution:
    def preorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        if not root:
            return []
        result = []
        stack = [root]
        while stack:
            node = stack.pop()
            result.append(node.val)
            if node.right:
                stack.append(node.right)
            if node.left:
                stack.append(node.left)
        return result
```

#### 题目：LeetCode 104. 二叉树的最大深度

**题目描述**：给定一个二叉树，找出其最大深度。二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

**可能出现的问题**：
- 递归返回左子树和右子树的最大深度
- 最大深度 = max(left_depth, right_depth) + 1
- 空树的深度为0

**解析**：
```python
class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        left_depth = self.maxDepth(root.left)
        right_depth = self.maxDepth(root.right)
        return max(left_depth, right_depth) + 1
```

### 8.2 二叉搜索树

#### 题目：LeetCode 98. 验证二叉搜索树

**题目描述**：给你一个二叉树的根节点，判断其是否是一个有效的二叉搜索树。

**可能出现的问题**：
- 二叉搜索树的中序遍历是升序的
- 需要验证每个节点的左子树都小于该节点，右子树都大于该节点
- 使用中序遍历验证

**解析**：
方法1：利用BST中序遍历是升序的性质。
```python
class Solution:
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        prev = float('-inf')
        def inorder(node):
            nonlocal prev
            if not node:
                return True
            if not inorder(node.left):
                return False
            if node.val <= prev:
                return False
            prev = node.val
            return inorder(node.right)
        return inorder(root)
```

方法2：限定节点值的范围。
```python
class Solution:
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        def validate(node, low, high):
            if not node:
                return True
            if node.val <= low or node.val >= high:
                return False
            return validate(node.left, low, node.val) and validate(node.right, node.val, high)
        return validate(root, float('-inf'), float('inf'))
```

#### 题目：LeetCode 701. 二叉搜索树中的插入操作

**题目描述**：给定二叉搜索树（BST）和要插入树中的值，将值插入BST。返回插入后的BST根节点。

**可能出现的问题**：
- BST的插入总是找到合适的位置
- 递归实现简洁
- 可以改变树的结构

**解析**：
```python
class Solution:
    def insertIntoBST(self, root: Optional[TreeNode], val: int) -> Optional[TreeNode]:
        if not root:
            return TreeNode(val)
        if val < root.val:
            root.left = self.insertIntoBST(root.left, val)
        else:
            root.right = self.insertIntoBST(root.right, val)
        return root
```

---

## 第九章：图算法

### 9.1 拓扑排序

#### 题目：LeetCode 207. 课程表

**题目描述**：你这个学期必须选修 numCourses 门课程，记为从 0 到 numCourses - 1。在选修某些课程之前，你需要一些先修课程。返回可行的修课顺序。如果有多个答案，返回任意一个。

**可能出现的问题**：
- 判断是否存在环
- 使用邻接表表示图
- 可以使用Kahn算法（BFS）或DFS进行拓扑排序

**解析**：
Kahn算法：计算每个节点的入度，使用队列处理入度为0的节点。

```python
class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        from collections import deque
        indegree = [0] * numCourses
        graph = [[] for _ in range(numCourses)]
        
        for dest, src in prerequisites:
            graph[src].append(dest)
            indegree[dest] += 1
        
        queue = deque([i for i in range(numCourses) if indegree[i] == 0])
        count = 0
        
        while queue:
            node = queue.popleft()
            count += 1
            for neighbor in graph[node]:
                indegree[neighbor] -= 1
                if indegree[neighbor] == 0:
                    queue.append(neighbor)
        
        return count == numCourses
```

### 9.2 并查集

#### 题目：LeetCode 200. 岛屿数量

**题目描述**：给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，计算网格中岛屿的数量。

**可能出现的问题**：
- 岛屿是上下左右相连的陆地
- 可以使用DFS、BFS或并查集解决
- 需要避免重复计算

**解析**：
DFS版本（更直观）：
```python
class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        if not grid:
            return 0
        m, n = len(grid), len(grid[0])
        count = 0
        
        def dfs(i, j):
            if i < 0 or i >= m or j < 0 or j >= n or grid[i][j] != '1':
                return
            grid[i][j] = '0'
            dfs(i + 1, j)
            dfs(i - 1, j)
            dfs(i, j + 1)
            dfs(i, j - 1)
        
        for i in range(m):
            for j in range(n):
                if grid[i][j] == '1':
                    count += 1
                    dfs(i, j)
        return count
```

---

## 第十章：单调栈与单调队列

### 10.1 单调栈

#### 题目：LeetCode 42. 接雨水

**题目描述**：给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。

**可能出现的问题**：
- 每个位置能接的雨水取决于左右两边最高柱子的最小值
- 单调栈可以解决这类"下一个更大元素"的问题
- 需要计算每个位置可以接多少雨水

**解析**：
使用单调递减栈，遍历每个柱子，当遇到比栈顶大的柱子时，说明找到了右边界，开始计算雨水。

```python
class Solution:
    def trap(self, height: List[int]) -> int:
        stack = []
        water = 0
        for i, h in enumerate(height):
            while stack and height[stack[-1]] < h:
                top = stack.pop()
                if not stack:
                    break
                distance = i - stack[-1] - 1
                bounded_height = min(h, height[stack[-1]]) - height[top]
                water += distance * bounded_height
            stack.append(i)
        return water
```

#### 题目：LeetCode 84. 柱状图中最大的矩形

**题目描述**：给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，柱子的宽度为 1。求在该柱状图中，能够勾勒出来的矩形的最大面积。

**可能出现的问题**：
- 对于每个柱子，需要找到它左边和右边第一个比它矮的柱子
- 单调递增栈可以解决这类问题
- 面积 = 高度 * 宽度

**解析**：
```python
class Solution:
    def largestRectangleArea(self, heights: List[int]) -> int:
        stack = []
        max_area = 0
        extended = heights + [0]
        for i, h in enumerate(extended):
            while stack and h < extended[stack[-1]]:
                height = extended[stack.pop()]
                width = i if not stack else i - stack[-1] - 1
                max_area = max(max_area, height * width)
            stack.append(i)
        return max_area
```

---

## 第十一章：位运算技巧

### 11.1 常用位操作

#### 题目：LeetCode 136. 只出现一次的数字

**题目描述**：给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。

**可能出现的问题**：
- 异或运算的性质：a ^ a = 0，a ^ 0 = a，异或满足交换律和结合律
- 所有元素异或的结果就是只出现一次的元素

**解析**：
```python
class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        result = 0
        for num in nums:
            result ^= num
        return result
```

#### 题目：LeetCode 231. 2 的幂

**题目描述**：给定一个整数 n，写一个函数判断它是否是 2 的幂。

**可能出现的问题**：
- 2的幂的二进制表示只有一位是1
- n & (n - 1) 可以消除最低位的1
- 如果消除后为0，则说明只有一个1

**解析**：
```python
class Solution:
    def isPowerOfTwo(self, n: int) -> bool:
        return n > 0 and (n & (n - 1)) == 0
```

---

## 第十二章：经典面试题

### 12.1 丑数系列

#### 题目：LeetCode 264. 丑数 II

**题目描述**：编写一个程序，找出前 n 个丑数。丑数就是只包含质因数 2、3 和 5 的正整数。

**可能出现的问题**：
- 每个丑数都可以由之前的丑数乘以2、3或5得到
- 使用三个指针分别指向下一个需要乘以2、3、5的丑数位置
- 使用动态规划避免重复

**解析**：
```python
class Solution:
    def nthUglyNumber(self, n: int) -> int:
        dp = [1] * n
        i2 = i3 = i5 = 0
        for i in range(1, n):
            next2, next3, next5 = dp[i2] * 2, dp[i3] * 3, dp[i5] * 5
            dp[i] = min(next2, next3, next5)
            if dp[i] == next2:
                i2 += 1
            if dp[i] == next3:
                i3 += 1
            if dp[i] == next5:
                i5 += 1
        return dp[-1]
```

### 12.2 堆的应用

#### 题目：LeetCode 295. 数据流的中位数

**题目描述**：中位数是有序整数列表的中间值。如果列表的大小是奇数，中位数就是中间那个数；如果列表的大小是偶数，中位数就是中间两个数的平均值。

**可能出现的问题**：
- 需要支持插入操作和获取中位数操作
- 使用两个堆：最大堆存放较小的一半，最小堆存放较大的一半
- 保持两个堆的大小平衡

**解析**：
```python
from heapq import heappush, heappushpop

class MedianFinder:
    def __init__(self):
        self.small = []  # 最大堆，存储较小的一半
        self.large = []  # 最小堆，存储较大的一半
    
    def addNum(self, num: float) -> None:
        if not self.small or num <= -self.small[0]:
            heappush(self.small, -num)
            if len(self.small) > len(self.large) + 1:
                heappush(self.large, -heappop(self.small))
        else:
            heappush(self.large, num)
            if len(self.large) > len(self.small):
                heappush(self.small, -heappop(self.large))
    
    def findMedian(self) -> float:
        if len(self.small) == len(self.large):
            return (-self.small[0] + self.large[0]) / 2
        else:
            return -self.small[0]
```

---

## 学习建议

### 1. 学习路线规划

**初学者路线**：
1. 先掌握基础数据结构（数组、链表、栈、队列）
2. 学习简单算法（排序、查找）
3. 进阶到递归、回溯
4. 最后学习动态规划和图算法

**速成路线**：
1. 重点掌握核心框架（双指针、滑动窗口、二分查找）
2. 熟练掌握几种经典题型（背包问题、BFS最短路径）
3. 多练习高频面试题

### 2. 刷题方法

**分专题练习**：
- 每个专题集中练习10-20道题
- 先看思路框架，再自己实现
- 最后对比多种解法

**重视思维训练**：
- 不要死记硬背代码
- 理解每种算法背后的思维模式
- 学会举一反三

**定期复盘**：
- 标记错题和重点题
- 定期回顾已学内容
- 建立自己的知识体系

### 3. 进阶技巧

**时间复杂度分析**：
- 学会分析算法的时间空间复杂度
- 了解各种排序和查找算法的复杂度
- 能够选择最适合的算法

**代码优化**：
- 从暴力解法逐步优化
- 使用适当的数据结构
- 注意边界条件的处理

**解题模板**：
- 建立自己的解题模板库
- 针对不同题型准备模板
- 比赛中可以快速套用

## 总结

本习题册涵盖了labuladong算法项目的所有核心内容，包括：

1. **双指针技巧**：链表和数组中的各种双指针应用
2. **滑动窗口**：解决子串、子数组问题
3. **二分查找**：各种变形和应用场景
4. **前缀和与差分数组**：区间查询和区间修改
5. **回溯算法**：排列、组合、子集问题
6. **BFS算法**：最短路径和层序遍历
7. **动态规划**：子序列、背包、股票问题
8. **二叉树算法**：遍历和BST操作
9. **图算法**：拓扑排序和并查集
10. **单调栈/队列**：接雨水、矩形面积问题
11. **位运算**：巧妙的位操作技巧

通过系统学习和大量练习，可以掌握这些核心算法，建立完整的算法知识体系，提高解决实际问题的能力。