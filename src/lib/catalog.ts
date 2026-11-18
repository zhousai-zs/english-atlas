import { getCollection, type CollectionEntry } from 'astro:content';
import { pad, url } from './url';

export function byOrder<T extends { id: string; data: { order: number } }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.data.order - b.data.order || a.id.localeCompare(b.id));
}

export function groupBy<T extends { data: { group: string } }>(items: T[]): { name: string; items: T[] }[] {
  const groups: { name: string; items: T[] }[] = [];
  for (const item of items) {
    const last = groups.at(-1);
    if (!last || last.name !== item.data.group) groups.push({ name: item.data.group, items: [item] });
    else last.items.push(item);
  }
  return groups;
}

export interface LessonLink {
  ref: string;
  title: string;
  href: string;
  summary: string;
}

function assertUniqueOrder(items: { id: string; data: { order: number } }[], label: string) {
  const seen = new Set<number>();
  for (const item of items) {
    if (seen.has(item.data.order)) throw new Error(`${label} 课程序号重复：${item.data.order}（${item.id}）`);
    seen.add(item.data.order);
  }
}

export async function loadCatalog() {
  const [pronunciation, grammar, vocabulary, sentences, analysisItems, resourceItems, pathItems] = await Promise.all([
    getCollection('pronunciation'),
    getCollection('grammar'),
    getCollection('vocabulary'),
    getCollection('sentences'),
    getCollection('analysis'),
    getCollection('resources'),
    getCollection('path'),
  ]);

  const catalog = {
    pronunciation: byOrder(pronunciation),
    grammar: byOrder(grammar),
    vocabulary: byOrder(vocabulary),
    sentences: byOrder(sentences),
    analysis: analysisItems[0],
    resources: resourceItems[0],
    path: pathItems[0],
  };

  if (!catalog.analysis || analysisItems.length !== 1) throw new Error('长难句方法课必须且只能有一篇');
  if (!catalog.resources || resourceItems.length !== 1) throw new Error('学习资料必须且只能有一篇');
  if (!catalog.path || pathItems.length !== 1) throw new Error('学习路径必须且只能有一篇');
  if (catalog.pronunciation.length < 4) throw new Error(`发音课数量不足：${catalog.pronunciation.length}`);
  if (catalog.grammar.length < 28 || catalog.grammar.length > 35) {
    throw new Error(`语法课应在 28–35 之间，当前 ${catalog.grammar.length}`);
  }
  if (catalog.vocabulary.length < 16 || catalog.vocabulary.length > 20) {
    throw new Error(`词汇单元应在 16–20 之间，当前 ${catalog.vocabulary.length}`);
  }
  if (catalog.sentences.length < 15) throw new Error(`长难句应至少 15 篇，当前 ${catalog.sentences.length}`);

  assertUniqueOrder(catalog.pronunciation, '发音');
  assertUniqueOrder(catalog.grammar, '语法');
  assertUniqueOrder(catalog.vocabulary, '词汇');
  assertUniqueOrder(catalog.sentences, '长难句');

  const links = indexLessons(catalog);
  for (const stage of catalog.path.data.stages) {
    for (const ref of stage.lessons) {
      if (!links.has(ref)) throw new Error(`学习路径引用了不存在的课文：${ref}`);
    }
  }
  for (const item of [...catalog.pronunciation, ...catalog.grammar, ...catalog.vocabulary]) {
    for (const ref of item.data.prerequisites) {
      if (!links.has(ref)) throw new Error(`${item.id} 的先修课不存在：${ref}`);
    }
  }
  for (const item of catalog.sentences) {
    for (const ref of item.data.grammar) {
      if (!links.has(ref)) throw new Error(`长难句 ${item.id} 引用了不存在的语法课：${ref}`);
    }
  }

  return { ...catalog, links };
}

type CatalogCore = {
  pronunciation: CollectionEntry<'pronunciation'>[];
  grammar: CollectionEntry<'grammar'>[];
  vocabulary: CollectionEntry<'vocabulary'>[];
  sentences: CollectionEntry<'sentences'>[];
  analysis: CollectionEntry<'analysis'>;
  resources: CollectionEntry<'resources'>;
  path: CollectionEntry<'path'>;
};

export function indexLessons(catalog: CatalogCore): Map<string, LessonLink> {
  const map = new Map<string, LessonLink>();
  const add = (ref: string, title: string, href: string, summary: string) => {
    map.set(ref, { ref, title, href, summary });
  };
  for (const item of catalog.pronunciation) {
    add(`pronunciation:${item.id}`, item.data.title, url(`pronunciation/${item.id}`), item.data.summary);
  }
  for (const item of catalog.grammar) {
    add(`grammar:${item.id}`, item.data.title, url(`grammar/${item.id}`), item.data.summary);
  }
  for (const item of catalog.vocabulary) {
    add(`vocabulary:${item.id}`, item.data.title, url(`vocabulary/${item.id}`), item.data.summary);
  }
  for (const item of catalog.sentences) {
    add(`sentences:${item.id}`, item.data.title, url(`sentences/${item.id}`), item.data.summary);
  }
  add(`analysis:${catalog.analysis.id}`, catalog.analysis.data.title, url(`sentences/${catalog.analysis.id}`), catalog.analysis.data.summary);
  add('resources:library', catalog.resources.data.title, url('resources'), catalog.resources.data.summary);
  return map;
}

export function mustGet(links: Map<string, LessonLink>, ref: string): LessonLink {
  const item = links.get(ref);
  if (!item) throw new Error(`找不到课文：${ref}`);
  return item;
}

export function neighbors<T extends { id: string; data: { title: string } }>(items: T[], id: string, section: string) {
  const index = items.findIndex((item) => item.id === id);
  const link = (item?: T) => (item ? { href: url(`${section}/${item.id}`), title: item.data.title } : undefined);
  return { prev: link(items[index - 1]), next: link(items[index + 1]) };
}

export function lessonLabel(order: number, title: string): string {
  return `${pad(order)} ${title}`;
}

export type Catalog = Awaited<ReturnType<typeof loadCatalog>>;
