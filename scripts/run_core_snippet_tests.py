#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Run correctness tests for CORE (handbook) questions.

- Loads miniprogram/data/questions.js
- Filters track == 'core'
- Executes Python snippets and runs per-slug test cases
- Outputs a markdown report to docs/CORE_SNIPPET_TEST_REPORT.md

This is an MVP test harness (no external deps).
"""

from __future__ import annotations

import json
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Callable


def load_questions() -> list[dict[str, Any]]:
    text = Path("miniprogram/data/questions.js").read_text(encoding="utf-8")
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


def list_to_nodes(a):
    head = None
    for v in reversed(a):
        head = ListNode(v, head)
    return head


def nodes_to_list(head):
    out = []
    while head:
        out.append(head.val)
        head = head.next
    return out


def exec_snippet(snippet: str) -> dict[str, Any]:
    ns: dict[str, Any] = {
        "TreeNode": TreeNode,
        "ListNode": ListNode,
    }
    exec(snippet, ns, ns)
    return ns


@dataclass
class Case:
    name: str
    run: Callable[[dict[str, Any]], None]


def assert_eq(got, expected, msg=""):
    if got != expected:
        raise AssertionError(f"{msg} got={got!r} expected={expected!r}")


def build_cases() -> dict[str, list[Case]]:
    c: dict[str, list[Case]] = {}

    c["two-sum"] = [
        Case(
            "basic",
            lambda ns: assert_eq(
                ns["twoSum"]([2, 7, 11, 15], 9), [0, 1], "twoSum"
            ),
        )
    ]

    c["best-time-to-buy-and-sell-stock"] = [
        Case("basic", lambda ns: assert_eq(ns["maxProfit"]([7, 1, 5, 3, 6, 4]), 5)),
        Case("decreasing", lambda ns: assert_eq(ns["maxProfit"]([7, 6, 4, 3, 1]), 0)),
    ]

    c["best-time-to-buy-and-sell-stock-iii"] = [
        Case("classic", lambda ns: assert_eq(ns["maxProfit"]([3, 3, 5, 0, 0, 3, 1, 4]), 6)),
        Case("increasing", lambda ns: assert_eq(ns["maxProfit"]([1, 2, 3, 4, 5]), 4)),
    ]

    c["linked-list-cycle"] = [
        Case(
            "has_cycle",
            lambda ns: (
                (lambda head: (setattr(head.next.next.next, "next", head.next), None))[1]
                if False
                else None
            ),
        )
    ]
    # We'll implement linked list cycle tests with manual linking:
    def _cycle_true(ns):
        hasCycle = ns["hasCycle"]
        a = ListNode(3)
        b = ListNode(2)
        c1 = ListNode(0)
        d = ListNode(-4)
        a.next = b
        b.next = c1
        c1.next = d
        d.next = b
        assert_eq(hasCycle(a), True)

    def _cycle_false(ns):
        hasCycle = ns["hasCycle"]
        head = list_to_nodes([1, 2, 3])
        assert_eq(hasCycle(head), False)

    c["linked-list-cycle"] = [Case("true", _cycle_true), Case("false", _cycle_false)]

    def _cycle2(ns):
        detectCycle = ns["detectCycle"]
        a = ListNode(3)
        b = ListNode(2)
        c1 = ListNode(0)
        d = ListNode(-4)
        a.next = b
        b.next = c1
        c1.next = d
        d.next = b
        entry = detectCycle(a)
        if entry is None or entry is not b:
            raise AssertionError("detectCycle should return entry node")

    def _cycle2_none(ns):
        detectCycle = ns["detectCycle"]
        head = list_to_nodes([1, 2, 3])
        assert_eq(detectCycle(head), None)

    c["linked-list-cycle-ii"] = [Case("entry", _cycle2), Case("none", _cycle2_none)]

    c["merge-two-sorted-lists"] = [
        Case(
            "basic",
            lambda ns: assert_eq(
                nodes_to_list(
                    ns["mergeTwoLists"](list_to_nodes([1, 2, 4]), list_to_nodes([1, 3, 4]))
                ),
                [1, 1, 2, 3, 4, 4],
            ),
        )
    ]

    c["remove-nth-node-from-end-of-list"] = [
        Case(
            "basic",
            lambda ns: assert_eq(
                nodes_to_list(ns["removeNthFromEnd"](list_to_nodes([1, 2, 3, 4, 5]), 2)),
                [1, 2, 3, 5],
            ),
        )
    ]

    c["middle-of-the-linked-list"] = [
        Case(
            "odd",
            lambda ns: assert_eq(nodes_to_list(ns["middleNode"](list_to_nodes([1, 2, 3, 4, 5]))), [3, 4, 5]),
        ),
        Case(
            "even_second",
            lambda ns: assert_eq(nodes_to_list(ns["middleNode"](list_to_nodes([1, 2, 3, 4, 5, 6]))), [4, 5, 6]),
        ),
    ]

    c["remove-duplicates-from-sorted-array"] = [
        Case(
            "basic",
            lambda ns: (
                (lambda a: (
                    (lambda k: assert_eq(a[:k], [0, 1, 2, 3, 4]))(ns["removeDuplicates"](a))
                ))([0, 0, 1, 1, 1, 2, 2, 3, 3, 4])
            ),
        )
    ]

    c["3sum"] = [
        Case(
            "basic",
            lambda ns: (
                (lambda res: (
                    (lambda s: (
                        (lambda _: None)()
                    ))(set(tuple(x) for x in map(lambda t: tuple(sorted(t)), res)))
                ))(ns["threeSum"]([-1, 0, 1, 2, -1, -4]))
            ),
        )
    ]
    # Validate 3sum by set equality
    def _three_sum(ns):
        res = ns["threeSum"]([-1, 0, 1, 2, -1, -4])
        got = set(tuple(sorted(x)) for x in res)
        exp = {(-1, -1, 2), (-1, 0, 1)}
        assert_eq(got, exp)

    c["3sum"] = [Case("classic", _three_sum)]

    c["search-in-rotated-sorted-array"] = [
        Case(
            "basic",
            lambda ns: assert_eq(ns["search"]([4, 5, 6, 7, 0, 1, 2], 0), 4),
        ),
        Case(
            "missing",
            lambda ns: assert_eq(ns["search"]([4, 5, 6, 7, 0, 1, 2], 3), -1),
        ),
    ]

    c["search-insert-position"] = [
        Case("hit", lambda ns: assert_eq(ns["searchInsert"]([1, 3, 5, 6], 5), 2)),
        Case("insert", lambda ns: assert_eq(ns["searchInsert"]([1, 3, 5, 6], 2), 1)),
    ]

    c["binary-search"] = [
        Case("hit", lambda ns: assert_eq(ns["search"]([-1, 0, 3, 5, 9, 12], 9), 4)),
        Case("miss", lambda ns: assert_eq(ns["search"]([-1, 0, 3, 5, 9, 12], 2), -1)),
    ]

    c["find-minimum-in-rotated-sorted-array"] = [
        Case("basic", lambda ns: assert_eq(ns["findMin"]([3, 4, 5, 1, 2]), 1)),
        Case("single", lambda ns: assert_eq(ns["findMin"]([1]), 1)),
        Case("already_sorted", lambda ns: assert_eq(ns["findMin"]([1, 2, 3, 4, 5]), 1)),
    ]

    c["subarray-sum-equals-k"] = [
        Case("basic", lambda ns: assert_eq(ns["subarraySum"]([1, 1, 1], 2), 2)),
        Case("neg", lambda ns: assert_eq(ns["subarraySum"]([1, -1, 0], 0), 3)),
    ]

    c["minimum-window-substring"] = [
        Case("classic", lambda ns: assert_eq(ns["minWindow"]("ADOBECODEBANC", "ABC"), "BANC")),
        Case("none", lambda ns: assert_eq(ns["minWindow"]("a", "aa"), "")),
    ]

    c["longest-substring-without-repeating-characters"] = [
        Case("abc", lambda ns: assert_eq(ns["lengthOfLongestSubstring"]("abcabcbb"), 3)),
        Case("bb", lambda ns: assert_eq(ns["lengthOfLongestSubstring"]("bbbbb"), 1)),
    ]

    c["find-all-anagrams-in-a-string"] = [
        Case("basic", lambda ns: assert_eq(ns["findAnagrams"]("cbaebabacd", "abc"), [0, 6])),
    ]

    c["permutation-in-string"] = [
        Case("true", lambda ns: assert_eq(ns["checkInclusion"]("ab", "eidbaooo"), True)),
        Case("false", lambda ns: assert_eq(ns["checkInclusion"]("ab", "eidboaoo"), False)),
    ]

    c["combinations"] = [
        Case(
            "n4k2",
            lambda ns: assert_eq(
                set(tuple(x) for x in ns["combine"](4, 2)),
                {(1, 2), (1, 3), (1, 4), (2, 3), (2, 4), (3, 4)},
            ),
        )
    ]

    c["subsets"] = [
        Case(
            "[1,2]",
            lambda ns: assert_eq(
                set(tuple(x) for x in ns["subsets"]([1, 2])),
                {(), (1,), (2,), (1, 2)},
            ),
        )
    ]

    c["permutations"] = [
        Case(
            "[1,2,3]",
            lambda ns: assert_eq(len(ns["permute"]([1, 2, 3])), 6),
        )
    ]

    c["n-queens"] = [
        Case(
            "n=4",
            lambda ns: assert_eq(len(ns["solveNQueens"](4)), 2),
        )
    ]

    c["number-of-islands"] = [
        Case(
            "basic",
            lambda ns: assert_eq(
                ns["numIslands"](
                    [
                        ["1", "1", "1", "1", "0"],
                        ["1", "1", "0", "1", "0"],
                        ["1", "1", "0", "0", "0"],
                        ["0", "0", "0", "0", "0"],
                    ]
                ),
                1,
            ),
        ),
        Case(
            "two",
            lambda ns: assert_eq(
                ns["numIslands"](
                    [
                        ["1", "1", "0", "0", "0"],
                        ["1", "1", "0", "0", "0"],
                        ["0", "0", "1", "0", "0"],
                        ["0", "0", "0", "1", "1"],
                    ]
                ),
                3,
            ),
        ),
    ]

    c["course-schedule"] = [
        Case(
            "possible",
            lambda ns: assert_eq(ns["canFinish"](2, [[1, 0]]), True),
        ),
        Case(
            "cycle",
            lambda ns: assert_eq(ns["canFinish"](2, [[1, 0], [0, 1]]), False),
        ),
    ]

    c["open-the-lock"] = [
        Case(
            "classic",
            lambda ns: assert_eq(
                ns["openLock"](["0201", "0101", "0102", "1212", "2002"], "0202"), 6
            ),
        ),
        Case("dead_start", lambda ns: assert_eq(ns["openLock"](["0000"], "8888"), -1)),
    ]

    c["minimum-depth-of-binary-tree"] = [
        Case(
            "chain",
            lambda ns: (
                (lambda root: assert_eq(ns["minDepth"](root), 3))(
                    TreeNode(1, TreeNode(2, TreeNode(3), None), None)
                )
            ),
        )
    ]

    c["maximum-depth-of-binary-tree"] = [
        Case(
            "basic",
            lambda ns: (
                (lambda root: assert_eq(ns["maxDepth"](root), 3))(
                    TreeNode(1, TreeNode(2), TreeNode(3, TreeNode(4), None))
                )
            ),
        )
    ]

    c["binary-tree-preorder-traversal"] = [
        Case(
            "basic",
            lambda ns: (
                (lambda root: assert_eq(ns["preorderTraversal"](root), [1, 2, 3]))(
                    TreeNode(1, None, TreeNode(2, TreeNode(3), None))
                )
            ),
        )
    ]

    c["validate-binary-search-tree"] = [
        Case(
            "true",
            lambda ns: (
                (lambda root: assert_eq(ns["isValidBST"](root), True))(
                    TreeNode(2, TreeNode(1), TreeNode(3))
                )
            ),
        ),
        Case(
            "false",
            lambda ns: (
                (lambda root: assert_eq(ns["isValidBST"](root), False))(
                    TreeNode(5, TreeNode(1), TreeNode(4, TreeNode(3), TreeNode(6)))
                )
            ),
        ),
    ]

    c["insert-into-a-binary-search-tree"] = [
        Case(
            "insert",
            lambda ns: (
                (lambda root: (
                    ns["insertIntoBST"](root, 5),
                    assert_eq(root.right.left.val, 5),
                ))(
                    TreeNode(4, TreeNode(2, TreeNode(1), TreeNode(3)), TreeNode(7))
                )
            ),
        )
    ]

    c["trapping-rain-water"] = [
        Case("classic", lambda ns: assert_eq(ns["trap"]([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]), 6)),
    ]

    c["maximum-subarray"] = [
        Case("classic", lambda ns: assert_eq(ns["maxSubArray"]([-2, 1, -3, 4, -1, 2, 1, -5, 4]), 6)),
    ]

    c["longest-increasing-subsequence"] = [
        Case("classic", lambda ns: assert_eq(ns["lengthOfLIS"]([10, 9, 2, 5, 3, 7, 101, 18]), 4)),
    ]

    c["partition-equal-subset-sum"] = [
        Case("true", lambda ns: assert_eq(ns["canPartition"]([1, 5, 11, 5]), True)),
        Case("false", lambda ns: assert_eq(ns["canPartition"]([1, 2, 3, 5]), False)),
    ]

    c["coin-change-ii"] = [
        Case("amount5", lambda ns: assert_eq(ns["change"](5, [1, 2, 5]), 4)),
    ]

    c["largest-rectangle-in-histogram"] = [
        Case("classic", lambda ns: assert_eq(ns["largestRectangleArea"]([2, 1, 5, 6, 2, 3]), 10)),
    ]

    c["range-sum-query-2d-immutable"] = [
        Case(
            "classic",
            lambda ns: (
                (lambda m: (
                    assert_eq(m.sumRegion(2, 1, 4, 3), 8),
                    assert_eq(m.sumRegion(1, 1, 2, 2), 11),
                    assert_eq(m.sumRegion(1, 2, 2, 4), 12),
                ))(
                    ns["NumMatrix"](
                        [
                            [3, 0, 1, 4, 2],
                            [5, 6, 3, 2, 1],
                            [1, 2, 0, 1, 5],
                            [4, 1, 0, 1, 7],
                            [1, 0, 3, 0, 5],
                        ]
                    )
                )
            ),
        )
    ]

    c["range-addition"] = [
        Case(
            "classic",
            lambda ns: assert_eq(
                ns["getModifiedArray"](5, [[1, 3, 2], [2, 4, 3], [0, 2, -2]]),
                [-2, 0, 3, 5, 3],
            ),
        )
    ]

    c["power-of-two"] = [
        Case("true", lambda ns: assert_eq(ns["isPowerOfTwo"](16), True)),
        Case("false", lambda ns: assert_eq(ns["isPowerOfTwo"](3), False)),
    ]

    c["single-number"] = [
        Case("basic", lambda ns: assert_eq(ns["singleNumber"]([4, 1, 2, 1, 2]), 4)),
    ]

    c["ugly-number-ii"] = [
        Case("n10", lambda ns: assert_eq(ns["nthUglyNumber"](10), 12)),
    ]

    c["find-median-from-data-stream"] = [
        Case(
            "basic",
            lambda ns: (
                (lambda mf: (
                    mf.addNum(1),
                    mf.addNum(2),
                    assert_eq(mf.findMedian(), 1.5),
                    mf.addNum(3),
                    assert_eq(mf.findMedian(), 2),
                ))(ns["MedianFinder"]())
            ),
        )
    ]

    c["squares-of-a-sorted-array"] = [
        Case("basic", lambda ns: assert_eq(ns["sortedSquares"]([-4, -1, 0, 3, 10]), [0, 1, 9, 16, 100])),
    ]

    return c


def main() -> int:
    questions = load_questions()
    core = [q for q in questions if q.get("track") == "core"]
    cases = build_cases()

    passed = []
    failed = []
    skipped = []

    for q in core:
        slug = q.get("leetcodeSlug")
        qid = q.get("id")
        snippet = q.get("codeSnippet", {}).get("python", "")

        if slug not in cases:
            skipped.append((qid, slug, "no test cases"))
            continue

        try:
            ns = exec_snippet(snippet)
        except Exception as e:
            failed.append((qid, slug, f"exec error: {e}"))
            continue

        ok = True
        for case in cases[slug]:
            try:
                case.run(ns)
            except Exception as e:
                ok = False
                failed.append((qid, slug, f"case {case.name}: {e}"))
                break
        if ok:
            passed.append((qid, slug, len(cases[slug])))

    report = []
    report.append("# Core 题目 Python Snippet 测试报告\n")
    report.append(f"- Core 题数：{len(core)}\n")
    report.append(f"- 有测试用例覆盖：{len(passed) + len(failed)}\n")
    report.append(f"- 通过：{len(passed)}\n")
    report.append(f"- 失败：{len(failed)}\n")
    report.append(f"- 未覆盖（无用例）：{len(skipped)}\n")

    if failed:
        report.append("\n## 失败列表\n")
        for qid, slug, reason in failed:
            report.append(f"- {qid} `{slug}` — {reason}\n")

    if skipped:
        report.append("\n## 未覆盖列表（需补用例）\n")
        for qid, slug, reason in skipped:
            report.append(f"- {qid} `{slug}` — {reason}\n")

    report_path = Path("docs/CORE_SNIPPET_TEST_REPORT.md")
    report_path.write_text("".join(report), encoding="utf-8")

    print(report_path.as_posix())
    print(f"passed={len(passed)} failed={len(failed)} skipped={len(skipped)}")

    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
