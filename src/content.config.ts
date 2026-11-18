import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { lessonSchema, pathSchema, resourceSchema, sentenceSchema, vocabSchema } from './lib/schemas';

const lesson = (base: string) =>
  defineCollection({
    loader: glob({ pattern: '*.md', base }),
    schema: lessonSchema,
  });

export const collections = {
  pronunciation: lesson('./src/content/pronunciation'),
  grammar: lesson('./src/content/grammar'),
  analysis: lesson('./src/content/analysis'),
  vocabulary: defineCollection({
    loader: glob({ pattern: '*.md', base: './src/content/vocabulary' }),
    schema: vocabSchema,
  }),
  sentences: defineCollection({
    loader: glob({ pattern: '*.md', base: './src/content/sentences' }),
    schema: sentenceSchema,
  }),
  path: defineCollection({
    loader: glob({ pattern: '*.md', base: './src/content/path' }),
    schema: pathSchema,
  }),
  resources: defineCollection({
    loader: glob({ pattern: '*.md', base: './src/content/resources' }),
    schema: resourceSchema,
  }),
};
