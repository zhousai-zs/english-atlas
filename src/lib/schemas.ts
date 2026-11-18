import { z } from 'zod';

export const examplePair = z.object({
  en: z.string().min(2),
  zh: z.string().min(1),
  note: z.string().optional(),
});

export const mistake = z.object({
  wrong: z.string().min(2),
  right: z.string().min(2),
  why: z.string().min(8),
});

export const quizQuestion = z
  .object({
    type: z.enum(['choice', 'fill']),
    prompt: z.string().min(4),
    choices: z.array(z.string().min(1)).optional(),
    answer: z.union([z.number().int(), z.array(z.string().min(1)).min(1)]),
    explain: z.string().min(8),
  })
  .superRefine((question, ctx) => {
    if (question.type === 'choice') {
      if (!question.choices || question.choices.length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['choices'],
          message: '选择题至少要有 3 个选项',
        });
      }
      if (typeof question.answer !== 'number') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['answer'],
          message: '选择题的答案必须是选项下标',
        });
      } else if (question.choices && (question.answer < 0 || question.answer >= question.choices.length)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['answer'],
          message: '选择题答案下标超出范围',
        });
      }
    } else if (!Array.isArray(question.answer)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['answer'],
        message: '填空题答案必须是可接受字符串列表',
      });
    }
  });

export const lessonSchema = z.object({
  title: z.string().min(2),
  titleEn: z.string().min(2),
  order: z.number().int().positive(),
  level: z.enum(['入门', 'A1', 'A2', 'B1', 'B2']),
  minutes: z.number().int().min(8).max(50),
  group: z.string().min(1),
  summary: z.string().min(24),
  prerequisites: z.array(z.string()).default([]),
  formula: z.string().min(8),
  examples: z.array(examplePair).min(8),
  mistakes: z.array(mistake).min(2).max(4),
  recap: z.array(z.string().min(10)).min(3),
  quiz: z.array(quizQuestion).length(5),
});

export const wordEntry = z.object({
  head: z.string().min(1),
  pos: z.string().min(1),
  ipa: z.string().min(1),
  gloss: z.string().min(1),
  note: z.string().optional(),
  collocations: z.array(z.string().min(1)).default([]),
  examples: z.array(examplePair).min(1).max(3),
});

export const vocabSchema = z.object({
  title: z.string().min(2),
  titleEn: z.string().min(2),
  order: z.number().int().positive(),
  level: z.enum(['A1', 'A2', 'B1', 'B2']),
  minutes: z.number().int().min(10).max(50),
  group: z.string().min(1),
  summary: z.string().min(24),
  prerequisites: z.array(z.string()).default([]),
  entries: z.array(wordEntry).min(8),
  recap: z.array(z.string().min(10)).min(2),
  quiz: z.array(quizQuestion).length(5),
});

export const sentenceSchema = z.object({
  title: z.string().min(2),
  titleEn: z.string().min(2),
  order: z.number().int().positive(),
  difficulty: z.number().int().min(1).max(5),
  style: z.enum(['日常说明', '新闻', '科普', '技术博客']),
  minutes: z.number().int().min(8).max(40),
  summary: z.string().min(16),
  sentence: z.string().min(20),
  translation: z.string().min(8),
  grammar: z.array(z.string().min(3)).min(1),
  tree: z.array(z.string().min(3)).min(3),
  breakdown: z
    .array(
      z.object({
        role: z.string().min(1),
        en: z.string().min(1),
        zh: z.string().min(1),
        note: z.string().optional(),
      }),
    )
    .min(3),
  paraphrase: z
    .array(
      z.object({
        en: z.string().min(2),
        zh: z.string().min(2),
      }),
    )
    .min(2),
  quiz: z.array(quizQuestion).length(5),
});

export const pathSchema = z.object({
  title: z.string().min(2),
  summary: z.string().min(24),
  stages: z
    .array(
      z.object({
        id: z.string().min(2),
        title: z.string().min(2),
        difficulty: z.string().min(2),
        pace: z.string().min(4),
        hours: z.string().min(2),
        prerequisite: z.string().min(2),
        summary: z.string().min(24),
        lessons: z.array(z.string().min(3)).min(1),
      }),
    )
    .length(7),
});

export const resourceSchema = z.object({
  title: z.string().min(2),
  summary: z.string().min(24),
  groups: z
    .array(
      z.object({
        title: z.string().min(2),
        intro: z.string().min(12),
        items: z
          .array(
            z.object({
              name: z.string().min(2),
              url: z.string().url(),
              cost: z.enum(['免费', '部分免费', '付费']),
              stage: z.enum(['入门', '初级', '中级', '进阶', '全程']),
              note: z.string().min(16),
            }),
          )
          .min(2),
      }),
    )
    .min(6),
});

export type QuizQuestion = z.infer<typeof quizQuestion>;
export type ExamplePair = z.infer<typeof examplePair>;
export type Mistake = z.infer<typeof mistake>;
