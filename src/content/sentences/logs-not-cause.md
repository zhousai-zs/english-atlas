---
title: "日志里的不是根因"
titleEn: "What the logs show is not the root cause"
order: 13
difficulty: 5
style: "技术博客"
minutes: 18
summary: "what 主语从句开头，but 连接表语，so 引出你仍然要做的事，that 从句修饰 service。"
sentence: "What the logs show is not the root cause but the moment the system failed, so you still have to trace the request back to the service that produced the bad response."
translation: "日志显示的不是根因，而是系统失败的那个时刻，所以你仍然得把请求追溯到产生错误响应的那个服务。"
grammar:
  - "grammar:noun-clauses"
  - "grammar:compound"
  - "grammar:relative-clauses"
  - "grammar:infinitives"
tree:
  - "主语从句：What the logs show"
  - "表语：not the root cause but the moment the system failed"
  - "结果分句：so you still have to trace the request ..."
  - "└─ 定语：that produced the bad response   修饰 service"
breakdown:
  - role: "主语"
    en: "What the logs show"
    zh: "日志所显示的内容"
    note: "what 等于 the thing that。"
  - role: "表语"
    en: "not the root cause but the moment"
    zh: "不是根因，而是那个时刻"
    note: "not A but B。"
  - role: "定语"
    en: "the system failed"
    zh: "系统发生失败的"
    note: "moment 后面省略了 when。"
  - role: "结果"
    en: "so you still have to trace the request back"
    zh: "所以你仍要把请求追溯回去"
  - role: "定语"
    en: "the service that produced the bad response"
    zh: "产生错误响应的服务"
paraphrase:
  - en: "The logs tell you when the system failed, not why the root cause happened."
    zh: "日志告诉你系统何时失败，而不是根因为什么发生。"
  - en: "You must follow the request back to the service that sent the bad response."
    zh: "你得顺着请求找到发出错误响应的服务。"
quiz:
  - type: "choice"
    prompt: "What the logs show 在句中作？"
    choices:
      - "宾语"
      - "主语"
      - "定语"
      - "状语"
    answer: 1
    explain: "它是 is 的主语。"
  - type: "choice"
    prompt: "not A but B 里的 B 是？"
    choices:
      - "the root cause"
      - "the moment the system failed"
      - "the logs"
      - "you"
    answer: 1
    explain: "不是根因，而是那个时刻。"
  - type: "choice"
    prompt: "the moment the system failed 省略了？"
    choices:
      - "that 作主语"
      - "when"
      - "which 作宾语"
      - "because"
    answer: 1
    explain: "the moment when the system failed。"
  - type: "fill"
    prompt: "trace the request ____ to the service：空格里的小品词是？"
    answer:
      - "back"
    explain: "trace back 是追溯。"
  - type: "choice"
    prompt: "that produced 的 that 指？"
    choices:
      - "moment"
      - "request"
      - "service"
      - "cause"
    answer: 2
    explain: "服务产生了错误响应。"
---
## 阅读提示

句首的 What 不是疑问句。它把“日志显示的东西”打包成主语。is 后面的 not ... but ... 先否定再肯定，翻译时保持这个对比。the moment 和 the system failed 之间没有关系词，这是时间名词后省略 when 的常见写法。so 后面是作者给你的下一步，不是日志本身的内容。
