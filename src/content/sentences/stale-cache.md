---
title: "缓存没有失效"
titleEn: "A cache that was not invalidated"
order: 10
difficulty: 4
style: "技术博客"
minutes: 16
summary: "because 从句说明原因，until 从句说明旧数据持续到什么时候。"
sentence: "Because the cache was not invalidated after the schema change, the service kept returning stale data until the nodes were restarted."
translation: "由于模式变更之后缓存没有失效，服务一直返回陈旧数据，直到节点被重新启动。"
grammar:
  - "grammar:adverbial-clauses"
  - "grammar:passive"
  - "grammar:past-simple"
tree:
  - "原因：Because the cache was not invalidated after the schema change"
  - "主句：the service kept returning stale data"
  - "时间终点：until the nodes were restarted"
breakdown:
  - role: "原因"
    en: "Because the cache was not invalidated"
    zh: "因为缓存没有被失效"
    note: "invalidate 是“使缓存作废”。"
  - role: "时间"
    en: "after the schema change"
    zh: "在模式变更之后"
    note: "修饰 invalidated。"
  - role: "主句"
    en: "the service kept returning stale data"
    zh: "服务一直在返回过期数据"
    note: "keep doing 表示持续。"
  - role: "终点"
    en: "until the nodes were restarted"
    zh: "直到节点被重启"
    note: "were restarted 是被动。"
paraphrase:
  - en: "The schema changed, but the cache still held old data."
    zh: "模式变了，缓存里仍是旧数据。"
  - en: "The service continued to serve that old data until someone restarted the nodes."
    zh: "服务继续提供旧数据，直到节点重启。"
quiz:
  - type: "choice"
    prompt: "was not invalidated 的主语是？"
    choices:
      - "the service"
      - "the cache"
      - "the schema"
      - "the nodes"
    answer: 1
    explain: "缓存没有被标记失效。"
  - type: "choice"
    prompt: "kept returning 的意思是？"
    choices:
      - "只返回了一次"
      - "持续返回"
      - "拒绝返回"
      - "开始缓存"
    answer: 1
    explain: "keep doing 是继续做。"
  - type: "choice"
    prompt: "until 表示？"
    choices:
      - "原因"
      - "动作持续到这个点"
      - "定语"
      - "比较"
    answer: 1
    explain: "一直到节点重启为止。"
  - type: "fill"
    prompt: "stale data 是 ____ 数据。"
    answer:
      - "陈旧"
      - "过期"
      - "旧"
    explain: "stale 是不新鲜的、过期的。"
  - type: "choice"
    prompt: "were restarted 为什么用被动？"
    choices:
      - "节点自己发出了重启命令作为主语重点"
      - "句子没有说是谁重启的，节点是承受者"
      - "restart 是不及物"
      - "until 要求被动"
    answer: 1
    explain: "节点是被重启的。"
---
## 阅读提示

Because 从句虽然长，主句的主语 the service 要到逗号后面才出现。after the schema change 离 cache 近，但它修饰的是 invalidated 的时间，不是 schema 的定语。until 从句修饰 kept returning，给出这段错误行为的终点。stale 是技术文章里形容缓存的常用词，意思是内容已经过时。
