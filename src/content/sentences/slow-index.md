---
title: "索引为什么突然变慢"
titleEn: "Why an indexed query becomes slow"
order: 14
difficulty: 5
style: "技术博客"
minutes: 18
summary: "although 让步，when 条件，because 解释数据库改选扫描方式。"
sentence: "Although the query uses an index, it becomes slow when the filter matches most of the rows, because the database then chooses a sequential scan instead of the index."
translation: "尽管这个查询使用了索引，当过滤条件匹配大多数行时它仍会变慢，因为数据库那时会选择顺序扫描，而不是使用索引。"
grammar:
  - "grammar:adverbial-clauses"
  - "grammar:present-simple"
tree:
  - "让步：Although the query uses an index"
  - "主句：it becomes slow"
  - "时间/条件：when the filter matches most of the rows"
  - "原因：because the database then chooses a sequential scan instead of the index"
breakdown:
  - role: "让步"
    en: "Although the query uses an index"
    zh: "尽管查询用了索引"
    note: "不再加 but。"
  - role: "主句"
    en: "it becomes slow"
    zh: "它会变慢"
    note: "it 指 the query。"
  - role: "条件"
    en: "when the filter matches most of the rows"
    zh: "当过滤条件匹配大多数行时"
  - role: "原因"
    en: "because the database then chooses a sequential scan"
    zh: "因为数据库那时选择顺序扫描"
  - role: "对比"
    en: "instead of the index"
    zh: "而不是走索引"
paraphrase:
  - en: "Having an index does not guarantee a fast query."
    zh: "有索引并不保证查询就快。"
  - en: "If the filter matches most rows, a full scan can be the database’s choice."
    zh: "如果过滤条件命中大多数行，数据库可能改用全表扫描。"
quiz:
  - type: "choice"
    prompt: "it 指？"
    choices:
      - "index"
      - "query"
      - "filter"
      - "database"
    answer: 1
    explain: "变慢的是查询本身，it 回指 the query。"
  - type: "choice"
    prompt: "although 和 but 能一起用吗？"
    choices:
      - "能"
      - "不能"
      - "只有否定句能"
      - "只有 when 能"
    answer: 1
    explain: "Although ..., it becomes slow. 不要再加 but。"
  - type: "choice"
    prompt: "then 在 because 从句里指？"
    choices:
      - "下个星期"
      - "在匹配大多数行的那种情况下"
      - "索引被删除之后"
      - "用户点击之后"
    answer: 1
    explain: "then 回指 when 所说的情况。"
  - type: "fill"
    prompt: "instead of 后面的 the index 是被 ____ 的选择。写“放弃”或“取代”。"
    answer:
      - "放弃"
      - "取代"
    explain: "数据库不选索引，改选顺序扫描。"
  - type: "choice"
    prompt: "主句谓语是？"
    choices:
      - "uses"
      - "becomes"
      - "matches"
      - "chooses"
    answer: 1
    explain: "it becomes slow。其余动词在从句里。"
---
## 阅读提示

三个从属连词各管一段：Although 管 uses，when 管 matches，because 管 chooses。主句只剩 it becomes slow。then 是副词，意思是“在那种情况下”，不要译成“然后”就结束。instead of the index 说明被放弃的方案。这样读，句子就不再是一长串动词。
