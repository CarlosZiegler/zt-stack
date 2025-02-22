import { pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import * as z from 'zod';
import { user } from './auth';

export const post = pgTable('post', (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  title: t.varchar({ length: 256 }).notNull(),
  content: t.text().notNull(),
  createdAt: t.timestamp().defaultNow().notNull(),
  createdBy: t
    .text()
    .references(() => user.id)
    .notNull(),
}));

export const CreatePostSchema = createInsertSchema(post, {
  title: z.string().max(256),
  content: z.string().max(512),
}).omit({
  id: true,
  createdAt: true,
  createdBy: true,
});
