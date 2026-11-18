import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const banned = [/lorem ipsum/i, /coming soon/i, /待补充/, /占位符/, /\bTODO\b/, /\bFIXME\b/, /此处省略/, /稍后补充/, /内容建设中/];

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full, acc);
    else if (/\.(md|astro|ts|css|mjs|svg)$/.test(name)) acc.push(full);
  }
  return acc;
}

const files = [...walk(path.join(root, 'src')), path.join(root, 'README.md')];
const problems = [];

for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  for (const pattern of banned) {
    if (pattern.test(text)) problems.push(`${path.relative(root, file)} 含有未完成标记 ${pattern}`);
  }
}

function count(dir) {
  const full = path.join(root, 'src/content', dir);
  if (!fs.existsSync(full)) return 0;
  return fs.readdirSync(full).filter((name) => name.endsWith('.md')).length;
}

const expect = [
  ['pronunciation', 4],
  ['grammar', 28],
  ['vocabulary', 16],
  ['sentences', 15],
  ['analysis', 1],
  ['path', 1],
  ['resources', 1],
];
for (const [dir, min] of expect) {
  const found = count(dir);
  if (found < min) problems.push(`${dir} 只有 ${found} 篇，至少需要 ${min} 篇`);
}

function bodyOf(file) {
  const text = fs.readFileSync(file, 'utf8');
  const match = text.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/);
  return match ? match[1].trim() : '';
}

function checkBodies(dir, heading, min) {
  const full = path.join(root, 'src/content', dir);
  if (!fs.existsSync(full)) return;
  for (const name of fs.readdirSync(full).filter((item) => item.endsWith('.md'))) {
    const body = bodyOf(path.join(full, name));
    if (!body.includes(heading)) problems.push(`${dir}/${name} 缺少「${heading}」`);
    if (body.length < min) problems.push(`${dir}/${name} 正文太短（${body.length}）`);
  }
}

checkBodies('grammar', '## 规则与用法', 280);
checkBodies('pronunciation', '## 规则与用法', 280);
checkBodies('analysis', '## 规则与用法', 280);
checkBodies('vocabulary', '## 这一课怎么学', 120);
checkBodies('sentences', '## 阅读提示', 80);
checkBodies('path', '## 怎么走这条路径', 200);
checkBodies('resources', '## 先说清楚', 120);

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log('content check ok');
