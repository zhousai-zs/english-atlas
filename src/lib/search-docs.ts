import type { Catalog } from './catalog';
import { url } from './url';

export interface SearchDoc {
  ref: string;
  href: string;
  section: string;
  title: string;
  titleEn: string;
  summary: string;
  text: string;
}

const FIELD_END = /[。．.!?！？;；:：…]$/;

function plain(value: string): string {
  return value
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_>~|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function punctuate(value: string): string {
  if (!value || FIELD_END.test(value)) return value;
  const han = (value.match(/[\u4e00-\u9fff]/g) ?? []).length;
  const latin = (value.match(/[A-Za-z]/g) ?? []).length;
  return `${value}${han > latin ? '。' : '.'}`;
}

function joinFields(parts: Array<string | undefined>): string {
  return parts
    .flatMap((part) => (part ?? '').split(/\n+/))
    .map((line) => punctuate(plain(line)))
    .filter(Boolean)
    .join(' ');
}

export function buildSearchDocs(catalog: Catalog): SearchDoc[] {
  const docs: SearchDoc[] = [];
  const push = (doc: SearchDoc) => {
    docs.push({ ...doc, summary: punctuate(plain(doc.summary)), text: doc.text.slice(0, 8000) });
  };

  push({
    ref: 'path',
    href: url('path'),
    section: '学习路径',
    title: catalog.path.data.title,
    titleEn: 'Learning path',
    summary: catalog.path.data.summary,
    text: joinFields([
      catalog.path.body,
      ...catalog.path.data.stages.flatMap((stage) => [stage.title, stage.summary, stage.difficulty, stage.pace, stage.prerequisite]),
    ]),
  });

  for (const item of catalog.pronunciation) {
    push({
      ref: `pronunciation:${item.id}`,
      href: url(`pronunciation/${item.id}`),
      section: '发音',
      title: item.data.title,
      titleEn: item.data.titleEn,
      summary: item.data.summary,
      text: joinFields([
        item.body,
        item.data.formula,
        ...item.data.recap,
        ...item.data.examples.flatMap((ex) => [ex.en, ex.zh, ex.note]),
      ]),
    });
  }
  for (const item of catalog.grammar) {
    push({
      ref: `grammar:${item.id}`,
      href: url(`grammar/${item.id}`),
      section: '语法',
      title: item.data.title,
      titleEn: item.data.titleEn,
      summary: item.data.summary,
      text: joinFields([
        item.body,
        item.data.formula,
        ...item.data.recap,
        ...item.data.examples.flatMap((ex) => [ex.en, ex.zh, ex.note]),
      ]),
    });
  }
  for (const item of catalog.vocabulary) {
    push({
      ref: `vocabulary:${item.id}`,
      href: url(`vocabulary/${item.id}`),
      section: '词汇',
      title: item.data.title,
      titleEn: item.data.titleEn,
      summary: item.data.summary,
      text: joinFields([
        item.body,
        ...item.data.recap,
        ...item.data.entries.flatMap((entry) => [
          entry.head,
          entry.pos,
          entry.ipa,
          entry.gloss,
          entry.note,
          ...entry.collocations,
          ...entry.examples.flatMap((ex) => [ex.en, ex.zh, ex.note]),
        ]),
      ]),
    });
  }
  push({
    ref: `analysis:${catalog.analysis.id}`,
    href: url(`sentences/${catalog.analysis.id}`),
    section: '长难句',
    title: catalog.analysis.data.title,
    titleEn: catalog.analysis.data.titleEn,
    summary: catalog.analysis.data.summary,
    text: joinFields([
      catalog.analysis.body,
      catalog.analysis.data.formula,
      ...catalog.analysis.data.recap,
      ...catalog.analysis.data.examples.flatMap((ex) => [ex.en, ex.zh, ex.note]),
    ]),
  });
  for (const item of catalog.sentences) {
    push({
      ref: `sentences:${item.id}`,
      href: url(`sentences/${item.id}`),
      section: '长难句',
      title: item.data.title,
      titleEn: item.data.titleEn,
      summary: item.data.summary,
      text: joinFields([
        item.body,
        item.data.sentence,
        item.data.translation,
        ...item.data.tree,
        ...item.data.breakdown.flatMap((part) => [part.role, part.en, part.zh, part.note]),
        ...item.data.paraphrase.flatMap((part) => [part.en, part.zh]),
      ]),
    });
  }
  push({
    ref: 'resources:library',
    href: url('resources'),
    section: '学习资料',
    title: catalog.resources.data.title,
    titleEn: 'Resources',
    summary: catalog.resources.data.summary,
    text: joinFields([
      catalog.resources.body,
      ...catalog.resources.data.groups.flatMap((group) => [
        group.title,
        group.intro,
        ...group.items.flatMap((item) => [item.name, item.note, item.url]),
      ]),
    ]),
  });

  return docs;
}
