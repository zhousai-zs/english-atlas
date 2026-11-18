---
title: "拆分单体之后"
titleEn: "After the monolith was split"
order: 15
difficulty: 5
style: "技术博客"
minutes: 18
summary: "不定式作目的，定语从句修饰 services，which 指拆分这件事带来的两个后果。"
sentence: "To keep deploys safe, the team decided to split the monolith into services that own their own data, which removed a shared database bottleneck but made transactions across services harder to reason about."
translation: "为了让发布更安全，团队决定把单体拆成各自拥有数据的多个服务；这消除了共享数据库这个瓶颈，但也让跨服务事务更难推理。"
grammar:
  - "grammar:infinitives"
  - "grammar:relative-clauses"
  - "grammar:compound"
  - "grammar:comparison"
tree:
  - "目的：To keep deploys safe"
  - "主句：the team decided to split the monolith into services"
  - "├─ 定语：that own their own data   修饰 services"
  - "└─ which 从句：removed ... but made ..."
  - "    which 指“拆成各自拥有数据的服务”这件事"
breakdown:
  - role: "目的"
    en: "To keep deploys safe"
    zh: "为了让发布保持安全"
  - role: "主句"
    en: "the team decided to split the monolith into services"
    zh: "团队决定把单体拆成多个服务"
  - role: "定语"
    en: "that own their own data"
    zh: "这些服务各自拥有自己的数据"
  - role: "结果 1"
    en: "which removed a shared database bottleneck"
    zh: "这消除了共享数据库的瓶颈"
  - role: "结果 2"
    en: "but made transactions across services harder to reason about"
    zh: "但让跨服务事务更难推理"
    note: "harder 是宾补。"
paraphrase:
  - en: "The team split one large application into services, and each service owns its data."
    zh: "团队把一个大应用拆成多个服务，每个服务拥有自己的数据。"
  - en: "The shared database was no longer a bottleneck, but cross-service transactions became harder to understand."
    zh: "共享数据库不再是瓶颈，但跨服务事务变得更难理解。"
quiz:
  - type: "choice"
    prompt: "To keep deploys safe 是？"
    choices:
      - "主句谓语"
      - "目的状语"
      - "定语从句"
      - "被动"
    answer: 1
    explain: "to do 放在句首常表示目的。"
  - type: "choice"
    prompt: "that own their own data 修饰？"
    choices:
      - "team"
      - "monolith"
      - "services"
      - "bottleneck"
    answer: 2
    explain: "服务拥有自己的数据。"
  - type: "choice"
    prompt: "which 的两个谓语是？"
    choices:
      - "decided 和 split"
      - "removed 和 made"
      - "own 和 removed"
      - "keep 和 made"
    answer: 1
    explain: "removed ... but made ..."
  - type: "fill"
    prompt: "make + 宾语 + 形容词：made transactions ____。"
    answer:
      - "harder"
    explain: "harder to reason about 是宾补。"
  - type: "choice"
    prompt: "but 在 which 从句里连接的是？"
    choices:
      - "两个相反的结果"
      - "team 和 services"
      - "safe 和 data"
      - "to keep 和 to split"
    answer: 0
    explain: "消除了瓶颈，但增加了推理难度。"
---
## 阅读提示

句首的 To keep deploys safe 还没有主语，真正的主语是 the team。decided to split 是谓语。services 后面的 that 从句要先吃掉，which 才接得上。which 指的不是某一个 service，而是“拆分并让服务各自拥有数据”这个决定带来的局面。but 告诉你 which 的两个结果方向相反：瓶颈没了，推理变难了。reason about 是“对某件事进行推理”，about 不能丢掉。
