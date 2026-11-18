---
title: "工程阅读词汇"
titleEn: "Words for engineering blogs"
order: 13
level: "B1"
minutes: 34
group: "B1 进阶"
summary: "后端技术文章里反复出现、但可以用普通英语解释的一批词。先掌握词义和搭配，再去读长难句。"
prerequisites:
  - "vocabulary:b1-tech"
recap:
  - "request 是发出的请求，response 是回来的响应。"
  - "error 是错误，failure 是失败这件事。一个 failure 里可以有多个 error。"
  - "default 是没人改动时的取值。timeout 是等到时间上限仍没有结果。"
quiz:
  - type: "choice"
    prompt: "客户端发出的是？"
    choices:
      - "response"
      - "request"
      - "cache"
      - "queue"
    answer: 1
    explain: "request 请求，response 响应。"
  - type: "choice"
    prompt: "cache 的主要作用是？"
    choices:
      - "把数据删掉"
      - "把常用结果暂存起来以便更快读取"
      - "增加延迟"
      - "关闭服务"
    answer: 1
    explain: "缓存是为了少做重复的慢操作。"
  - type: "fill"
    prompt: "默认值：the ____ value"
    answer:
      - "default"
    explain: "default 可以是名词或形容词。"
  - type: "choice"
    prompt: "queue 里的任务通常？"
    choices:
      - "同时抢同一个锁才叫队列"
      - "按顺序等待处理"
      - "一定失败"
      - "不需要重试"
    answer: 1
    explain: "queue 是队列，消息在里面排队。"
  - type: "choice"
    prompt: "retry 的意思是？"
    choices:
      - "第一次尝试"
      - "再试一次"
      - "永久放弃"
      - "记录日志"
    answer: 1
    explain: "retry the request 是重试这次请求。"
entries:
  - head: "server"
    pos: "n."
    ipa: "/ˈsɜːvə/"
    gloss: "服务器"
    collocations:
      - "a web server"
    note: "serve 是“提供服务”，server 是提供服务的机器或程序。"
    examples:
      - en: "The server is down."
        zh: "服务器宕机了。"
      - en: "Restart the server."
        zh: "重启服务器。"
  - head: "client"
    pos: "n."
    ipa: "/ˈklaɪənt/"
    gloss: "客户端"
    collocations:
      - "a web client"
    examples:
      - en: "The client sent a request."
        zh: "客户端发出了一个请求。"
      - en: "Each client has a token."
        zh: "每个客户端有一个令牌。"
  - head: "request"
    pos: "n."
    ipa: "/rɪˈkwest/"
    gloss: "请求"
    collocations:
      - "send a request"
    examples:
      - en: "The request failed."
        zh: "请求失败了。"
      - en: "Send the request again."
        zh: "把请求再发一次。"
  - head: "response"
    pos: "n."
    ipa: "/rɪˈspɒns/"
    gloss: "响应"
    collocations:
      - "a slow response"
    examples:
      - en: "The response was slow."
        zh: "响应很慢。"
      - en: "We got an empty response."
        zh: "我们收到了一个空响应。"
  - head: "database"
    pos: "n."
    ipa: "/ˈdeɪtəbeɪs/"
    gloss: "数据库"
    collocations:
      - "query a database"
    examples:
      - en: "The data is in the database."
        zh: "数据在数据库里。"
      - en: "The database rejected the query."
        zh: "数据库拒绝了这次查询。"
  - head: "error"
    pos: "n."
    ipa: "/ˈerə/"
    gloss: "错误"
    collocations:
      - "an error message"
    note: "美式读 /ˈerər/。"
    examples:
      - en: "The page shows an error."
        zh: "页面显示了一个错误。"
      - en: "Fix the error before you deploy."
        zh: "发布前把错误修好。"
  - head: "log"
    pos: "n."
    ipa: "/lɒɡ/"
    gloss: "日志"
    collocations:
      - "read the logs"
    examples:
      - en: "Check the logs."
        zh: "查看日志。"
      - en: "The log shows a timeout."
        zh: "日志显示超时了。"
  - head: "deploy"
    pos: "v."
    ipa: "/dɪˈplɔɪ/"
    gloss: "部署；发布"
    collocations:
      - "deploy a service"
    examples:
      - en: "We deploy on Tuesday."
        zh: "我们星期二发布。"
      - en: "Do not deploy a failing build."
        zh: "不要发布一个失败的构建。"
  - head: "cache"
    pos: "n."
    ipa: "/kæʃ/"
    gloss: "缓存"
    collocations:
      - "clear the cache"
    examples:
      - en: "Clear the cache."
        zh: "清掉缓存。"
      - en: "The cache returned old data."
        zh: "缓存返回了旧数据。"
  - head: "queue"
    pos: "n."
    ipa: "/kjuː/"
    gloss: "队列"
    collocations:
      - "a message queue"
    examples:
      - en: "The job is in a queue."
        zh: "任务在队列里。"
      - en: "The queue is growing."
        zh: "队列在变长。"
  - head: "timeout"
    pos: "n."
    ipa: "/ˈtaɪmaʊt/"
    gloss: "超时"
    collocations:
      - "a request timeout"
    examples:
      - en: "The request ended with a timeout."
        zh: "请求以超时结束。"
      - en: "Increase the timeout carefully."
        zh: "谨慎地增加超时时间。"
  - head: "default"
    pos: "n./adj."
    ipa: "/dɪˈfɔːlt/"
    gloss: "默认；默认的"
    collocations:
      - "by default"
    examples:
      - en: "The default is 30 seconds."
        zh: "默认值是 30 秒。"
      - en: "By default, the service retries twice."
        zh: "默认情况下，服务会重试两次。"
  - head: "token"
    pos: "n."
    ipa: "/ˈtəʊkən/"
    gloss: "令牌"
    collocations:
      - "an access token"
    examples:
      - en: "The token has expired."
        zh: "令牌过期了。"
      - en: "Send the token with the request."
        zh: "请求里带上令牌。"
  - head: "failure"
    pos: "n."
    ipa: "/ˈfeɪljə/"
    gloss: "失败"
    collocations:
      - "a single failure"
    note: "动词 fail，名词 failure。"
    examples:
      - en: "One failure should not stop the queue."
        zh: "一次失败不应该让整个队列停住。"
      - en: "The failure lasted ten minutes."
        zh: "这次失败持续了十分钟。"
---
## 这一课怎么学

不要把这些词当成只能出现在文档里的术语。每个词都能放进已经学过的句型：The server is down. The request failed. There is a job in the queue. By default, the client retries. 读技术博客时，先找出是谁对谁做了什么，再把这些名词填回主语和宾语。

cache 读起来像 cash，但意思完全不同。cash 是现金，cache 是缓存。queue 的拼写和发音差得远，/kjuː/ 里没有 /w/ 的字母音。
