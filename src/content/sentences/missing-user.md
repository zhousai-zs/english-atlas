---
title: "不存在的用户编号"
titleEn: "A user id that is not in the database"
order: 8
difficulty: 3
style: "技术博客"
minutes: 14
summary: "when 从句里含一个 that 定语从句，修饰 user id。"
sentence: "The API returns a 404 error when the client requests a user id that does not exist in the database."
translation: "当客户端请求的用户编号在数据库里不存在时，这个 API 会返回 404 错误。"
grammar:
  - "grammar:adverbial-clauses"
  - "grammar:relative-clauses"
  - "grammar:present-simple"
tree:
  - "主句：The API returns a 404 error"
  - "时间从句：when the client requests a user id"
  - "└─ 定语从句：that does not exist in the database   修饰 user id"
breakdown:
  - role: "主句"
    en: "The API returns a 404 error"
    zh: "API 返回 404 错误"
  - role: "时间"
    en: "when the client requests a user id"
    zh: "当客户端请求一个用户编号时"
  - role: "定语"
    en: "that does not exist in the database"
    zh: "这个编号在数据库中不存在"
    note: "that 是 exist 的主语，不能省略。"
paraphrase:
  - en: "The client asks for a user id."
    zh: "客户端来要一个用户编号。"
  - en: "If that id is absent from the database, the API answers with 404."
    zh: "如果数据库里没有这个编号，API 就用 404 回答。"
quiz:
  - type: "choice"
    prompt: "returns 的主语是？"
    choices:
      - "the client"
      - "the API"
      - "a user id"
      - "the database"
    answer: 1
    explain: "API 返回错误。"
  - type: "choice"
    prompt: "that 在从句里作？"
    choices:
      - "requests 的宾语"
      - "exist 的主语"
      - "error 的定语"
      - "when 的宾语"
    answer: 1
    explain: "the id does not exist。作主语不能省。"
  - type: "choice"
    prompt: "does not exist 否定的是？"
    choices:
      - "API"
      - "client"
      - "user id 的存在"
      - "404"
    answer: 2
    explain: "不存在的是用户编号，不是 API。"
  - type: "fill"
    prompt: "404 在句中是 error 的 ____ 语。写“定”即可。"
    answer:
      - "定"
    explain: "a 404 error，404 修饰 error。"
  - type: "choice"
    prompt: "when 从句用现在时，因为？"
    choices:
      - "事情已经在昨天发生"
      - "这里说的是一般规则"
      - "when 后面不能用动词"
      - "database 是复数"
    answer: 1
    explain: "描述接口行为用一般现在时。"
---
## 阅读提示

这是技术博客里很典型的规则句。主句先给结果，when 再给条件。a user id 后面的 that 从句一定要跟紧，否则会误会成“客户端不存在”。不存在的是编号。翻译时可以把 when 改成“如果”，中文更像一条接口说明。
