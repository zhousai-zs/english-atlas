---
title: "周五下午的一次发布"
titleEn: "A Friday-afternoon deploy"
order: 12
difficulty: 4
style: "技术博客"
minutes: 18
summary: "定语从句里插入一个过去分词短语，when 从句说明为什么更难排查。"
sentence: "Engineers who deploy on Friday afternoon often find that a small configuration error, introduced while they were rushing to merge, is harder to debug when fewer people are online."
translation: "星期五下午发布的工程师常常会发现，一个在他们赶着合并时被引入的小配置错误，在在线的人更少的时候更难排查。"
grammar:
  - "grammar:relative-clauses"
  - "grammar:object-clauses"
  - "grammar:participles"
  - "grammar:past-continuous"
  - "grammar:comparison"
tree:
  - "主句：Engineers often find [that 从句]"
  - "├─ 定语：who deploy on Friday afternoon"
  - "that 从句主干：a small configuration error is harder to debug"
  - "├─ 插入：introduced while they were rushing to merge"
  - "└─ 时间：when fewer people are online"
breakdown:
  - role: "主语"
    en: "Engineers who deploy on Friday afternoon"
    zh: "周五下午发布的工程师"
  - role: "谓语"
    en: "often find that"
    zh: "常常发现"
  - role: "从句主语"
    en: "a small configuration error"
    zh: "一个小的配置错误"
  - role: "插入"
    en: "introduced while they were rushing to merge"
    zh: "在他们赶着合并时被引进的"
    note: "introduced 修饰 error。"
  - role: "从句表语"
    en: "is harder to debug when fewer people are online"
    zh: "在线上人更少时更难排查"
paraphrase:
  - en: "Some engineers deploy on Friday afternoon."
    zh: "有些工程师在周五下午发布。"
  - en: "A small config error that entered during a rushed merge is harder to debug when few people are online."
    zh: "赶着合并时混进去的小配置错误，在线上人少时更难查。"
quiz:
  - type: "choice"
    prompt: "find 的宾语从句主语是？"
    choices:
      - "engineers"
      - "a small configuration error"
      - "people"
      - "Friday"
    answer: 1
    explain: "error is harder to debug。"
  - type: "choice"
    prompt: "introduced 的逻辑主语是？"
    choices:
      - "engineers"
      - "error"
      - "merge"
      - "people"
    answer: 1
    explain: "错误是被引入的。"
  - type: "choice"
    prompt: "while they were rushing 用进行时，因为？"
    choices:
      - "合并是一个当时正在进行的背景"
      - "while 只能接名词"
      - "Friday 是将来"
      - "debug 是被动"
    answer: 0
    explain: "were rushing 是过去进行，作 introduced 的时间背景。"
  - type: "fill"
    prompt: "harder 是 hard 的 ____ 级。"
    answer:
      - "比较"
    explain: "harder to debug。"
  - type: "choice"
    prompt: "when fewer people are online 修饰？"
    choices:
      - "deploy"
      - "is harder to debug"
      - "who"
      - "rushing"
    answer: 1
    explain: "更难排查的时间是在线人数更少的时候。"
---
## 阅读提示

逗号之间的 introduced while they were rushing to merge 是插入的分词短语，可以先抽掉。宾语从句就恢复成 a small configuration error is harder to debug when fewer people are online。while 从句的主语 they 指前面的 engineers。were rushing 说明错误是在匆忙合并的过程中进来的，不是星期五本身造成的。
