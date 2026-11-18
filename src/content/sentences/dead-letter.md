---
title: "超时与死信队列"
titleEn: "Timeouts and a dead-letter queue"
order: 9
difficulty: 4
style: "技术博客"
minutes: 16
summary: "if 从句后面有两个并列谓语，so that 说明把坏消息移走的目的。"
sentence: "If a request times out, the worker retries it three times and then moves the message to a dead-letter queue so that one bad payload does not block the rest."
translation: "如果一个请求超时，工作者会重试三次，然后把这条消息移到死信队列，以免一份坏数据挡住其余消息。"
grammar:
  - "grammar:adverbial-clauses"
  - "grammar:compound"
  - "grammar:present-simple"
tree:
  - "条件：If a request times out"
  - "主句并列谓语：retries it three times and then moves the message ..."
  - "目的：so that one bad payload does not block the rest"
breakdown:
  - role: "条件"
    en: "If a request times out"
    zh: "如果请求超时"
  - role: "谓语 1"
    en: "the worker retries it three times"
    zh: "工作者把它重试三次"
    note: "it 指 request。"
  - role: "谓语 2"
    en: "moves the message to a dead-letter queue"
    zh: "把消息移到死信队列"
  - role: "目的"
    en: "so that one bad payload does not block the rest"
    zh: "这样一份坏数据就不会挡住其余的"
    note: "the rest 指其余消息。"
paraphrase:
  - en: "A timed-out request is tried three times."
    zh: "超时的请求会被试三次。"
  - en: "After that, the bad message is set aside so the others can continue."
    zh: "之后坏消息被放到一边，其他消息才能继续。"
quiz:
  - type: "choice"
    prompt: "and 连接的是？"
    choices:
      - "if 和 so that"
      - "retries 和 moves"
      - "worker 和 payload"
      - "three 和 rest"
    answer: 1
    explain: "同一个 worker 的两个动作。"
  - type: "choice"
    prompt: "it 指？"
    choices:
      - "worker"
      - "request"
      - "queue"
      - "rest"
    answer: 1
    explain: "retries it：重试这个请求。"
  - type: "choice"
    prompt: "so that 表示？"
    choices:
      - "时间"
      - "目的"
      - "定语"
      - "被动"
    answer: 1
    explain: "目的是不让坏数据阻塞其余消息。"
  - type: "fill"
    prompt: "死信队列的英文是 dead-letter ____。"
    answer:
      - "queue"
    explain: "queue 是队列。"
  - type: "choice"
    prompt: "the rest 最合理的意思是？"
    choices:
      - "其余的工作者"
      - "其余的消息"
      - "三次里的最后一次"
      - "数据库"
    answer: 1
    explain: "one bad payload 对比 the rest of the messages。"
---
## 阅读提示

条件句的主句有两个谓语，主语都是 the worker，第二个主语省略了。then 只是副词，不是新的连词。so that 从 one bad payload 开始，不要把它算进 moves 的宾语。payload 在这里就是那条消息的内容。死信队列是放反复处理失败的消息的地方，这个背景知道之后，句子结构并不比前面的 if 句更复杂。
