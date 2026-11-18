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

export function buildSearchDocs(catalog: Catalog): SearchDoc[] {
  const docs: SearchDoc[] = [];
  const push = (doc: SearchDoc) => {
    docs.push({ ...doc, text: plain(doc.text).slice(0, 8000) });
  };

  push({
    ref: 'path',
    href: url('path'),
    section: '学习路径',
    title: catalog.path.data.title,
    titleEn: 'Learning path',
    summary: catalog.path.data.summary,
    text: `${catalog.path.body ?? ''}\n${catalog.path.data.stages.map((stage) => `${stage.title} ${stage.summary} ${stage.difficulty} ${stage.pace}`).join('\n')}`,
  });

  for (const item of catalog.pronunciation) {
    push({
      ref: `pronunciation:${item.id}`,
      href: url(`pronunciation/${item.id}`),
      section: '发音',
      title: item.data.title,
      titleEn: item.data.titleEn,
      summary: item.data.summary,
      text: [item.body, item.data.formula, item.data.recap.join(' '), ...item.data.examples.flatMap((ex) => [ex.en, ex.zh, ex.note ?? ''])].join('\n'),
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
      text: [item.body, item.data.formula, item.data.recap.join(' '), ...item.data.examples.flatMap((ex) => [ex.en, ex.zh, ex.note ?? ''])].join('\n'),
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
      text: [
        item.body,
        item.data.recap.join(' '),
        ...item.data.entries.flatMap((entry) => [entry.head, entry.pos, entry.ipa, entry.gloss, entry.note ?? '', ...entry.collocations, ...entry.examples.flatMap((ex) => [ex.en, ex.zh])]),
      ].join('\n'),
    });
  }
  push({
    ref: `analysis:${catalog.analysis.id}`,
    href: url(`sentences/${catalog.analysis.id}`),
    section: '长难句',
    title: catalog.analysis.data.title,
    titleEn: catalog.analysis.data.titleEn,
    summary: catalog.analysis.data.summary,
    text: [catalog.analysis.body, catalog.analysis.data.formula, ...catalog.analysis.data.examples.flatMap((ex) => [ex.en, ex.zh])].join('\n'),
  });
  for (const item of catalog.sentences) {
    push({
      ref: `sentences:${item.id}`,
      href: url(`sentences/${item.id}`),
      section: '长难句',
      title: item.data.title,
      titleEn: item.data.titleEn,
      summary: item.data.summary,
      text: [
        item.body,
        item.data.sentence,
        item.data.translation,
        item.data.tree.join('\n'),
        ...item.data.breakdown.flatMap((part) => [part.role, part.en, part.zh, part.note ?? '']),
        ...item.data.paraphrase.flatMap((part) => [part.en, part.zh]),
      ].join('\n'),
    });
  }
  push({
    ref: 'resources:library',
    href: url('resources'),
    section: '学习资料',
    title: catalog.resources.data.title,
    titleEn: 'Resources',
    summary: catalog.resources.data.summary,
    text: [
      catalog.resources.body,
      ...catalog.resources.data.groups.flatMap((group) => [group.title, group.intro, ...group.items.flatMap((item) => [item.name, item.note, item.url])]),
    ].join('\n'),
  });

  return docs;
}
