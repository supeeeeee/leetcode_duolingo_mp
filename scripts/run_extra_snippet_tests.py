#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Run correctness tests for EXTRA (扩展) questions.

- Loads miniprogram/data/questions.js
- Filters track == 'extra'
- Executes Python snippets and runs per-slug test cases (best-effort)
- Outputs a markdown report to docs/EXTRA_SNIPPET_TEST_REPORT.md

Notes
- This is an MVP harness with no external dependencies.
- Many EXTRA questions are advanced / involve custom classes or I/O;
  those are listed as UNCOVERED with a reason.
"""

from __future__ import annotations

import json
import traceback
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Callable


REPO_ROOT = Path(__file__).resolve().parents[1]
QUESTIONS_PATH = REPO_ROOT / "miniprogram/data/questions.js"
REPORT_PATH = REPO_ROOT / "docs/EXTRA_SNIPPET_TEST_REPORT.md"


def load_questions() -> list[dict[str, Any]]:
    text = QUESTIONS_PATH.read_text(encoding="utf-8")
    arr = text[text.find("[") : text.rfind("]") + 1]
    return json.loads(arr)


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


# LeetCode 133 graph node
class Node:
    def __init__(self, val=0, neighbors=None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []


# LeetCode 138 random pointer list node
class RandomNode:
    def __init__(self, val=0, next=None, random=None):
        self.val = val
        self.next = next
        self.random = random


def list_to_nodes(a):
    head = None
    for v in reversed(a):
        head = ListNode(v, head)
    return head


def nodes_to_list(head, limit: int = 10_000):
    out = []
    n = 0
    while head:
        out.append(head.val)
        head = head.next
        n += 1
        if n > limit:
            raise AssertionError("linked list too long / cycle suspected")
    return out


def tree_from_level(values):
    """Build binary tree from level-order list with None as missing."""
    if not values:
        return None
    nodes = [None if v is None else TreeNode(v) for v in values]
    kids = nodes[::-1]
    root = kids.pop()
    for node in nodes:
        if node is not None:
            if kids:
                node.left = kids.pop()
            if kids:
                node.right = kids.pop()
    return root


def tree_to_level(root):
    if not root:
        return []
    out: list[Any] = []
    q: list[Any] = [root]
    while q:
        node = q.pop(0)
        if node is None:
            out.append(None)
            continue
        out.append(node.val)
        q.append(node.left)
        q.append(node.right)
    while out and out[-1] is None:
        out.pop()
    return out


def exec_snippet(snippet: str) -> dict[str, Any]:
    ns: dict[str, Any] = {
        "TreeNode": TreeNode,
        "ListNode": ListNode,
        "Node": Node,
        "RandomNode": RandomNode,
    }
    exec(snippet, ns, ns)
    return ns


@dataclass
class Case:
    name: str
    run: Callable[[dict[str, Any]], None]


def assert_eq(got, expected, msg: str = ""):
    if got != expected:
        raise AssertionError(f"{msg} got={got!r} expected={expected!r}")


def assert_set_eq(got, expected, msg: str = ""):
    if set(got) != set(expected):
        raise AssertionError(f"{msg} got={got!r} expected={expected!r}")


def build_cases() -> dict[str, list[Case]]:
    c: dict[str, list[Case]] = {}

    # Array / hash / two pointers
    c["two-sum"] = [Case("basic", lambda ns: assert_eq(ns["twoSum"]([2, 7, 11, 15], 9), [0, 1]))]

    c["two-sum-ii-input-array-is-sorted"] = [
        Case("basic", lambda ns: assert_eq(ns["twoSum"]([2, 7, 11, 15], 9), [1, 2]))
    ]

    c["move-zeroes"] = [
        Case(
            "basic",
            lambda ns: (lambda a: (ns["moveZeroes"](a), assert_eq(a, [1, 3, 12, 0, 0])))([0, 1, 0, 3, 12]),
        )
    ]

    c["rotate-array"] = [
        Case(
            "basic",
            lambda ns: (lambda a: (ns["rotate"](a, 3), assert_eq(a, [5, 6, 7, 1, 2, 3, 4])))([1, 2, 3, 4, 5, 6, 7]),
        )
    ]

    c["product-of-array-except-self"] = [
        Case("basic", lambda ns: assert_eq(ns["productExceptSelf"]([1, 2, 3, 4]), [24, 12, 8, 6]))
    ]

    c["group-anagrams"] = [
        Case(
            "basic",
            lambda ns: (
                lambda res: assert_set_eq(
                    [tuple(sorted(x)) for x in res],
                    [tuple(sorted(x)) for x in [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]],
                )
            )(ns["groupAnagrams"](["eat", "tea", "tan", "ate", "nat", "bat"])),
        )
    ]

    c["valid-anagram"] = [
        Case("true", lambda ns: assert_eq(ns["isAnagram"]("anagram", "nagaram"), True)),
        Case("false", lambda ns: assert_eq(ns["isAnagram"]("rat", "car"), False)),
    ]

    c["happy-number"] = [
        Case("19", lambda ns: assert_eq(ns["isHappy"](19), True)),
        Case("2", lambda ns: assert_eq(ns["isHappy"](2), False)),
    ]

    c["isomorphic-strings"] = [
        Case("egg-add", lambda ns: assert_eq(ns["isIsomorphic"]("egg", "add"), True)),
        Case("foo-bar", lambda ns: assert_eq(ns["isIsomorphic"]("foo", "bar"), False)),
    ]

    c["majority-element"] = [Case("basic", lambda ns: assert_eq(ns["majorityElement"]([2, 2, 1, 1, 1, 2, 2]), 2))]

    c["top-k-frequent-elements"] = [
        Case("basic", lambda ns: assert_set_eq(ns["topKFrequent"]([1, 1, 1, 2, 2, 3], 2), [1, 2]))
    ]
    c["top-k-frequent-elements-review"] = c["top-k-frequent-elements"]

    c["longest-consecutive-sequence"] = [Case("basic", lambda ns: assert_eq(ns["longestConsecutive"]([100, 4, 200, 1, 3, 2]), 4))]

    c["4sum-ii"] = [
        Case(
            "basic",
            lambda ns: assert_eq(ns["fourSumCount"]([1, 2], [-2, -1], [-1, 2], [0, 2]), 2),
        )
    ]

    c["container-with-most-water"] = [Case("basic", lambda ns: assert_eq(ns["maxArea"]([1, 8, 6, 2, 5, 4, 8, 3, 7]), 49))]

    c["trapping-rain-water-two-pointers"] = [Case("basic", lambda ns: assert_eq(ns["trap"]([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]), 6))]

    c["sort-colors"] = [
        Case(
            "basic",
            lambda ns: (lambda a: (ns["sortColors"](a), assert_eq(a, [0, 0, 1, 1, 2, 2])))([2, 0, 2, 1, 1, 0]),
        )
    ]

    c["next-permutation"] = [
        Case(
            "basic",
            lambda ns: (lambda a: (ns["nextPermutation"](a), assert_eq(a, [1, 3, 2])))([1, 2, 3]),
        ),
        Case(
            "wrap",
            lambda ns: (lambda a: (ns["nextPermutation"](a), assert_eq(a, [1, 2, 3])))([3, 2, 1]),
        ),
    ]

    c["merge-intervals"] = [
        Case("basic", lambda ns: assert_eq(ns["merge"]([[1, 3], [2, 6], [8, 10], [15, 18]]), [[1, 6], [8, 10], [15, 18]]))
    ]

    # Sliding window / binary search
    c["minimum-size-subarray-sum"] = [Case("basic", lambda ns: assert_eq(ns["minSubArrayLen"](7, [2, 3, 1, 2, 4, 3]), 2))]

    c["fruit-into-baskets"] = [Case("basic", lambda ns: assert_eq(ns["totalFruit"]([1, 2, 1]), 3))]

    c["longest-repeating-character-replacement"] = [
        Case("basic", lambda ns: assert_eq(ns["characterReplacement"]("ABAB", 2), 4)),
        Case("classic", lambda ns: assert_eq(ns["characterReplacement"]("AABABBA", 1), 4)),
    ]

    c["max-consecutive-ones-iii"] = [Case("basic", lambda ns: assert_eq(ns["longestOnes"]([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2), 6))]

    c["find-first-and-last-position-of-element-in-sorted-array"] = [
        Case("found", lambda ns: assert_eq(ns["searchRange"]([5, 7, 7, 8, 8, 10], 8), [3, 4])),
        Case("missing", lambda ns: assert_eq(ns["searchRange"]([5, 7, 7, 8, 8, 10], 6), [-1, -1])),
    ]

    c["find-peak-element"] = [Case("basic", lambda ns: assert_eq(ns["findPeakElement"]([1, 2, 3, 1]), 2))]

    c["search-a-2d-matrix"] = [
        Case("true", lambda ns: assert_eq(ns["searchMatrix"]([[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 3), True)),
        Case("false", lambda ns: assert_eq(ns["searchMatrix"]([[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 13), False)),
    ]

    c["koko-eating-bananas"] = [
        Case("basic", lambda ns: assert_eq(ns["minEatingSpeed"]([3, 6, 7, 11], 8), 4)),
        Case("tight", lambda ns: assert_eq(ns["minEatingSpeed"]([30, 11, 23, 4, 20], 5), 30)),
    ]

    c["sqrtx"] = [
        Case("8", lambda ns: assert_eq(ns["mySqrt"](8), 2)),
        Case("4", lambda ns: assert_eq(ns["mySqrt"](4), 2)),
    ]

    # DP
    c["climbing-stairs"] = [Case("5", lambda ns: assert_eq(ns["climbStairs"](5), 8))]

    c["house-robber"] = [
        Case("basic", lambda ns: assert_eq(ns["rob"]([1, 2, 3, 1]), 4)),
        Case("classic", lambda ns: assert_eq(ns["rob"]([2, 7, 9, 3, 1]), 12)),
    ]

    c["best-time-to-buy-and-sell-stock-with-cooldown"] = [Case("basic", lambda ns: assert_eq(ns["maxProfit"]([1, 2, 3, 0, 2]), 3))]

    c["coin-change"] = [
        Case("basic", lambda ns: assert_eq(ns["coinChange"]([1, 2, 5], 11), 3)),
        Case("impossible", lambda ns: assert_eq(ns["coinChange"]([2], 3), -1)),
    ]

    c["unique-paths"] = [Case("3x7", lambda ns: assert_eq(ns["uniquePaths"](3, 7), 28))]

    c["word-break"] = [
        Case("true", lambda ns: assert_eq(ns["wordBreak"]("leetcode", ["leet", "code"]), True)),
        Case("false", lambda ns: assert_eq(ns["wordBreak"]("catsandog", ["cats", "dog", "sand", "and", "cat"]), False)),
    ]

    c["longest-common-subsequence"] = [Case("basic", lambda ns: assert_eq(ns["longestCommonSubsequence"]("abcde", "ace"), 3))]

    c["maximal-square"] = [
        Case(
            "basic",
            lambda ns: assert_eq(
                ns["maximalSquare"](
                    [
                        ["1", "0", "1", "0", "0"],
                        ["1", "0", "1", "1", "1"],
                        ["1", "1", "1", "1", "1"],
                        ["1", "0", "0", "1", "0"],
                    ]
                ),
                4,
            ),
        )
    ]

    c["decode-ways"] = [
        Case("12", lambda ns: assert_eq(ns["numDecodings"]("12"), 2)),
        Case("226", lambda ns: assert_eq(ns["numDecodings"]("226"), 3)),
        Case("06", lambda ns: assert_eq(ns["numDecodings"]("06"), 0)),
    ]

    c["edit-distance"] = [
        Case("horse-ros", lambda ns: assert_eq(ns["minDistance"]("horse", "ros"), 3)),
        Case("intention", lambda ns: assert_eq(ns["minDistance"]("intention", "execution"), 5)),
    ]

    # Stack / queue / string
    c["valid-parentheses"] = [
        Case("ok", lambda ns: assert_eq(ns["isValid"]("()[]{}"), True)),
        Case("bad", lambda ns: assert_eq(ns["isValid"]("(]"), False)),
    ]

    c["min-stack"] = [
        Case(
            "sequence",
            lambda ns: (
                (lambda MinStack: (
                    (lambda st: (
                        st.push(-2),
                        st.push(0),
                        st.push(-3),
                        assert_eq(st.getMin(), -3),
                        st.pop(),
                        assert_eq(st.top(), 0),
                        assert_eq(st.getMin(), -2),
                    ))(MinStack())
                ))(ns["MinStack"])
            ),
        )
    ]

    c["evaluate-reverse-polish-notation"] = [
        Case("basic", lambda ns: assert_eq(ns["evalRPN"](["2", "1", "+", "3", "*"]), 9))
    ]

    c["decode-string"] = [
        Case("basic", lambda ns: assert_eq(ns["decodeString"]("3[a]2[bc]"), "aaabcbc")),
        Case("nested", lambda ns: assert_eq(ns["decodeString"]("3[a2[c]]"), "accaccacc")),
    ]

    c["daily-temperatures"] = [Case("basic", lambda ns: assert_eq(ns["dailyTemperatures"]([73, 74, 75, 71, 69, 72, 76, 73]), [1, 1, 4, 2, 1, 1, 0, 0]))]

    c["implement-queue-using-stacks"] = [
        Case(
            "basic",
            lambda ns: (
                (lambda MyQueue: (
                    (lambda q: (
                        q.push(1),
                        q.push(2),
                        assert_eq(q.peek(), 1),
                        assert_eq(q.pop(), 1),
                        assert_eq(q.empty(), False),
                    ))(MyQueue())
                ))(ns["MyQueue"])
            ),
        )
    ]

    # Linked list
    c["reverse-linked-list"] = [Case("basic", lambda ns: assert_eq(nodes_to_list(ns["reverseList"](list_to_nodes([1, 2, 3, 4, 5]))), [5, 4, 3, 2, 1]))]

    c["reorder-list"] = [
        Case(
            "basic",
            lambda ns: (lambda head: (ns["reorderList"](head), assert_eq(nodes_to_list(head), [1, 5, 2, 4, 3])))(list_to_nodes([1, 2, 3, 4, 5])),
        )
    ]

    c["palindrome-linked-list"] = [
        Case("true", lambda ns: assert_eq(ns["isPalindrome"](list_to_nodes([1, 2, 2, 1])), True)),
        Case("false", lambda ns: assert_eq(ns["isPalindrome"](list_to_nodes([1, 2])), False)),
    ]
    c["palindrome-linked-list-review"] = c["palindrome-linked-list"]

    def _intersection(ns):
        getIntersectionNode = ns["getIntersectionNode"]
        # shared tail
        shared = list_to_nodes([8, 4, 5])
        # A: 4->1->shared
        headA = ListNode(4, ListNode(1, shared))
        # B: 5->6->1->shared
        headB = ListNode(5, ListNode(6, ListNode(1, shared)))
        inter = getIntersectionNode(headA, headB)
        if inter is not shared:
            raise AssertionError("should return intersection node")

    c["intersection-of-two-linked-lists"] = [Case("basic", _intersection)]

    c["remove-duplicates-from-sorted-list-ii"] = [Case("basic", lambda ns: assert_eq(nodes_to_list(ns["deleteDuplicates"](list_to_nodes([1, 2, 3, 3, 4, 4, 5]))), [1, 2, 5]))]

    # Trees
    c["invert-binary-tree"] = [Case("basic", lambda ns: assert_eq(tree_to_level(ns["invertTree"](tree_from_level([4, 2, 7, 1, 3, 6, 9]))), [4, 7, 2, 9, 6, 3, 1]))]

    c["symmetric-tree"] = [
        Case("true", lambda ns: assert_eq(ns["isSymmetric"](tree_from_level([1, 2, 2, 3, 4, 4, 3])), True)),
        Case("false", lambda ns: assert_eq(ns["isSymmetric"](tree_from_level([1, 2, 2, None, 3, None, 3])), False)),
    ]

    c["diameter-of-binary-tree"] = [Case("basic", lambda ns: assert_eq(ns["diameterOfBinaryTree"](tree_from_level([1, 2, 3, 4, 5])), 3))]

    c["balanced-binary-tree"] = [
        Case("true", lambda ns: assert_eq(ns["isBalanced"](tree_from_level([3, 9, 20, None, None, 15, 7])), True)),
        Case("false", lambda ns: assert_eq(ns["isBalanced"](tree_from_level([1, 2, 2, 3, 3, None, None, 4, 4])), False)),
    ]

    c["path-sum"] = [
        Case("true", lambda ns: assert_eq(ns["hasPathSum"](tree_from_level([5, 4, 8, 11, None, 13, 4, 7, 2, None, None, None, 1]), 22), True)),
        Case("false", lambda ns: assert_eq(ns["hasPathSum"](tree_from_level([1, 2, 3]), 5), False)),
    ]

    c["binary-tree-level-order-traversal"] = [Case("basic", lambda ns: assert_eq(ns["levelOrder"](tree_from_level([3, 9, 20, None, None, 15, 7])), [[3], [9, 20], [15, 7]]))]

    c["lowest-common-ancestor-of-a-binary-tree"] = [
        Case(
            "basic",
            lambda ns: (
                lambda root: assert_eq(
                    ns["lowestCommonAncestor"](root, root.left, root.right).val,
                    3,
                )
            )(tree_from_level([3, 5, 1, 6, 2, 0, 8, None, None, 7, 4])),
        )
    ]

    # --- Uncovered → now covered cases ---

    c["first-missing-positive"] = [
        Case("basic", lambda ns: assert_eq(ns["firstMissingPositive"]([3, 4, -1, 1]), 2)),
        Case("all_present", lambda ns: assert_eq(ns["firstMissingPositive"]([1, 2, 0]), 3)),
    ]

    c["binary-tree-maximum-path-sum"] = [
        Case(
            "classic",
            lambda ns: assert_eq(ns["maxPathSum"](tree_from_level([-10, 9, 20, None, None, 15, 7])), 42),
        )
    ]

    def _clone_graph(ns):
        cloneGraph = ns["cloneGraph"]
        # Build 1-2-3-4 cycle
        n1 = Node(1)
        n2 = Node(2)
        n3 = Node(3)
        n4 = Node(4)
        n1.neighbors = [n2, n4]
        n2.neighbors = [n1, n3]
        n3.neighbors = [n2, n4]
        n4.neighbors = [n1, n3]
        c1 = cloneGraph(n1)
        if c1 is n1:
            raise AssertionError("clone should be a different object")
        if c1.val != 1:
            raise AssertionError("clone root val mismatch")
        # Check neighbor vals set
        got = sorted([x.val for x in c1.neighbors])
        assert_eq(got, [2, 4])
        # Ensure deep copy: none of the cloned nodes are original nodes
        seen = set()
        stack = [c1]
        while stack:
            x = stack.pop()
            if id(x) in seen:
                continue
            seen.add(id(x))
            if x in [n1, n2, n3, n4]:
                raise AssertionError("clone shares node with original")
            for y in x.neighbors:
                stack.append(y)

    c["clone-graph"] = [Case("cycle", _clone_graph)]

    c["combination-sum"] = [
        Case(
            "basic",
            lambda ns: assert_set_eq(
                [tuple(x) for x in ns["combinationSum"]([2, 3, 6, 7], 7)],
                [tuple(x) for x in [[2, 2, 3], [7]]],
            ),
        )
    ]

    c["construct-binary-tree-from-preorder-and-inorder-traversal"] = [
        Case(
            "basic",
            lambda ns: assert_eq(
                tree_to_level(ns["buildTree"]([3, 9, 20, 15, 7], [9, 3, 15, 20, 7])),
                [3, 9, 20, None, None, 15, 7],
            ),
        )
    ]

    def _copy_random(ns):
        copyRandomList = ns["copyRandomList"]
        a = RandomNode(7)
        b = RandomNode(13)
        c1 = RandomNode(11)
        d = RandomNode(10)
        e = RandomNode(1)
        a.next = b; b.next = c1; c1.next = d; d.next = e
        b.random = a
        c1.random = e
        d.random = c1
        e.random = a
        head2 = copyRandomList(a)
        # Verify sequence values
        vals = []
        cur = head2
        while cur:
            vals.append(cur.val)
            cur = cur.next
        assert_eq(vals, [7, 13, 11, 10, 1])
        # Verify random pointers by index mapping
        # Build index for original and clone
        orig = [a, b, c1, d, e]
        clone = []
        cur = head2
        while cur:
            clone.append(cur)
            cur = cur.next
        if any(clone[i] is orig[i] for i in range(5)):
            raise AssertionError("clone shares node objects")
        pos_orig = {id(node): i for i, node in enumerate(orig)}
        pos_clone = {id(node): i for i, node in enumerate(clone)}
        for i in range(5):
            ro = orig[i].random
            rc = clone[i].random
            if ro is None:
                if rc is not None:
                    raise AssertionError("random should be None")
            else:
                assert_eq(pos_clone[id(rc)], pos_orig[id(ro)])

    c["copy-list-with-random-pointer"] = [Case("classic", _copy_random)]

    c["kth-smallest-element-in-a-bst"] = [
        Case(
            "basic",
            lambda ns: assert_eq(ns["kthSmallest"](tree_from_level([3, 1, 4, None, 2]), 1), 1),
        ),
        Case(
            "k3",
            lambda ns: assert_eq(ns["kthSmallest"](tree_from_level([5, 3, 6, 2, 4, None, None, 1]), 3), 3),
        ),
    ]

    c["longest-palindromic-substring"] = [
        Case(
            "babad",
            lambda ns: (
                (lambda ans: (
                    (ans in ["bab", "aba"]) or (_ for _ in ()).throw(AssertionError(f"got={ans}"))
                ))(ns["longestPalindrome"]("babad"))
            ),
        ),
        Case("cbbd", lambda ns: assert_eq(ns["longestPalindrome"]("cbbd"), "bb")),
    ]

    c["lru-cache"] = [
        Case(
            "api",
            lambda ns: (
                (lambda LRUCache: (
                    (lambda cache: (
                        cache.put(1, 1),
                        cache.put(2, 2),
                        assert_eq(cache.get(1), 1),
                        cache.put(3, 3),
                        assert_eq(cache.get(2), -1),
                        cache.put(4, 4),
                        assert_eq(cache.get(1), -1),
                        assert_eq(cache.get(3), 3),
                        assert_eq(cache.get(4), 4),
                    ))(LRUCache(2))
                ))(ns["LRUCache"])
            ),
        )
    ]

    c["network-delay-time"] = [
        Case(
            "classic",
            lambda ns: assert_eq(ns["networkDelayTime"]([[2, 1, 1], [2, 3, 1], [3, 4, 1]], 4, 2), 2),
        ),
        Case("impossible", lambda ns: assert_eq(ns["networkDelayTime"]([[1, 2, 1]], 2, 1), 1)),
    ]

    c["redundant-connection"] = [
        Case(
            "classic",
            lambda ns: assert_eq(ns["findRedundantConnection"]([[1, 2], [1, 3], [2, 3]]), [2, 3]),
        )
    ]

    c["reverse-nodes-in-k-group"] = [
        Case(
            "k2",
            lambda ns: assert_eq(
                nodes_to_list(ns["reverseKGroup"](list_to_nodes([1, 2, 3, 4, 5]), 2)),
                [2, 1, 4, 3, 5],
            ),
        )
    ]

    c["rotting-oranges"] = [
        Case(
            "classic",
            lambda ns: assert_eq(ns["orangesRotting"]([[2, 1, 1], [1, 1, 0], [0, 1, 1]]), 4),
        ),
        Case(
            "impossible",
            lambda ns: assert_eq(ns["orangesRotting"]([[2, 1, 1], [0, 1, 1], [1, 0, 1]]), -1),
        ),
    ]

    c["serialize-and-deserialize-binary-tree"] = [
        Case(
            "roundtrip",
            lambda ns: (
                (lambda codec: (
                    (lambda root: assert_eq(tree_to_level(codec.deserialize(codec.serialize(root))), tree_to_level(root)))(
                        tree_from_level([1, 2, 3, None, None, 4, 5])
                    )
                ))(ns["Codec"]())
            ),
        )
    ]

    c["sliding-window-maximum"] = [
        Case(
            "classic",
            lambda ns: assert_eq(ns["maxSlidingWindow"]([1, 3, -1, -3, 5, 3, 6, 7], 3), [3, 3, 5, 5, 6, 7]),
        )
    ]

    c["sort-list"] = [
        Case(
            "basic",
            lambda ns: assert_eq(nodes_to_list(ns["sortList"](list_to_nodes([4, 2, 1, 3]))), [1, 2, 3, 4]),
        )
    ]

    c["substring-with-concatenation-of-all-words"] = [
        Case(
            "classic",
            lambda ns: assert_eq(sorted(ns["findSubstring"]("barfoothefoobarman", ["foo", "bar"])), [0, 9]),
        )
    ]

    c["surrounded-regions"] = [
        Case(
            "classic",
            lambda ns: (
                (lambda b: (ns["solve"](b), assert_eq(b, [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]])))(
                    [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]
                )
            ),
        )
    ]

    c["word-ladder"] = [
        Case(
            "classic",
            lambda ns: assert_eq(ns["ladderLength"]("hit", "cog", ["hot","dot","dog","lot","log","cog"]), 5),
        ),
        Case(
            "none",
            lambda ns: assert_eq(ns["ladderLength"]("hit", "cog", ["hot","dot","dog","lot","log"]), 0),
        ),
    ]

    return c


UNCOVERED_REASONS: dict[str, str] = {
    # Keep this for future extra additions
}


def main() -> int:
    questions = load_questions()
    extra = [q for q in questions if q.get("track") == "extra"]

    cases = build_cases()

    passed: list[str] = []
    failed: list[tuple[str, str]] = []
    uncovered: list[tuple[str, str]] = []

    for q in extra:
        slug = q.get("leetcodeSlug")
        snippet = (q.get("codeSnippet") or {}).get("python")

        if not slug:
            uncovered.append(("<missing-slug>", "missing leetcodeSlug"))
            continue

        if slug not in cases:
            uncovered.append((slug, UNCOVERED_REASONS.get(slug, "no test cases yet")))
            continue

        if not snippet or not snippet.strip():
            uncovered.append((slug, "missing python codeSnippet"))
            continue

        try:
            ns = exec_snippet(snippet)
            for case in cases[slug]:
                case.run(ns)
            passed.append(slug)
        except Exception as e:  # noqa: BLE001
            tb = traceback.format_exc(limit=8)
            failed.append((slug, f"{type(e).__name__}: {e}\n```\n{tb}\n```"))

    passed = sorted(set(passed))
    failed = sorted(failed, key=lambda x: x[0])
    uncovered = sorted(uncovered, key=lambda x: x[0])

    lines: list[str] = []
    lines.append("# EXTRA Snippet Test Report\n")
    lines.append(f"- Total extra slugs: **{len(extra)}**")
    lines.append(f"- Covered by tests: **{len(cases)}**")
    lines.append(f"- Passed: **{len(passed)}**")
    lines.append(f"- Failed: **{len(failed)}**")
    lines.append(f"- Uncovered: **{len(uncovered)}**\n")

    lines.append("## ✅ Passed\n")
    for slug in passed:
        lines.append(f"- {slug}")

    lines.append("\n## ❌ Failed\n")
    if not failed:
        lines.append("(none)")
    else:
        for slug, detail in failed:
            lines.append(f"### {slug}\n")
            lines.append(detail)
            lines.append("")

    lines.append("\n## ⚠️ Uncovered\n")
    for slug, reason in uncovered:
        lines.append(f"- {slug}: {reason}")

    REPORT_PATH.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Wrote {REPORT_PATH}")

    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
