---
title: "先校验令牌再写库"
titleEn: "Validate the token before the handler"
order: 11
difficulty: 4
style: "技术博客"
minutes: 16
summary: "定语从句修饰 function，which 指前面整件事，that 从句修饰 code。"
sentence: "The function that validates the token runs before the handler, which means an expired token never reaches the code that writes to the database."
translation: "校验令牌的函数在处理器之前运行，这意味着过期的令牌永远到不了写数据库的那段代码。"
grammar:
  - "grammar:relative-clauses"
  - "grammar:adverbial-clauses"
  - "grammar:present-simple"
tree:
  - "主句：The function runs before the handler"
  - "├─ 定语：that validates the token   修饰 function"
  - "└─ which means [后面整句]"
  - "    which 指“函数先于处理器运行”"
  - "    定语：that writes to the database   修饰 code"
breakdown:
  - role: "主语"
    en: "The function that validates the token"
    zh: "校验令牌的那个函数"
    note: "that 作 validates 的主语。"
  - role: "谓语"
    en: "runs before the handler"
    zh: "在处理器之前运行"
  - role: "which"
    en: "which means ..."
    zh: "这意味着"
    note: "指前半句整件事。"
  - role: "结果"
    en: "an expired token never reaches the code"
    zh: "过期令牌到不了那段代码"
  - role: "定语"
    en: "that writes to the database"
    zh: "负责写数据库的"
    note: "修饰 code。"
paraphrase:
  - en: "Token validation happens before the handler."
    zh: "令牌校验发生在处理器之前。"
  - en: "Therefore an expired token cannot get as far as the database write."
    zh: "所以过期令牌走不到写数据库那一步。"
quiz:
  - type: "choice"
    prompt: "第一个 that 能不能省略？"
    choices:
      - "能，因为它作宾语"
      - "不能，因为它是 validates 的主语"
      - "不能，因为有逗号"
      - "能，因为 which 已经出现"
    answer: 1
    explain: "关系词作主语不可省略。"
  - type: "choice"
    prompt: "which means 的 which 指？"
    choices:
      - "token"
      - "handler"
      - "前面整个主句"
      - "database"
    answer: 2
    explain: "和 which is why 一样，可以指整句。"
  - type: "choice"
    prompt: "writes to the database 修饰？"
    choices:
      - "token"
      - "handler"
      - "code"
      - "function"
    answer: 2
    explain: "the code that writes..."
  - type: "fill"
    prompt: "过期的令牌：an ____ token"
    answer:
      - "expired"
    explain: "expired 是过去分词作定语。"
  - type: "choice"
    prompt: "never reaches 的主语是？"
    choices:
      - "function"
      - "handler"
      - "token"
      - "code"
    answer: 2
    explain: "令牌到不了代码那里。"
---
## 阅读提示

这句有两个 that，职责不同。第一个紧跟 function，告诉你是哪一个函数。第二个紧跟 code，告诉你是哪一段代码。中间的 which means 是作者在解释前半句的后果，翻译时可以断开：“校验函数先运行。因此过期令牌到不了写库代码。”
