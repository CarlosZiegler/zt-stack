import { linkOptions } from '@tanstack/react-router';
import * as z from 'zod';

export const postsSearchSchema = z.object({
  searchString: z.string().default(''),
  sortDirection: z.enum(['asc', 'desc']).default('asc'),
});

export const postsSearchDefaults: z.infer<typeof postsSearchSchema> = {
  searchString: '',
  sortDirection: 'asc',
};

export const postsLinkOptions = linkOptions({
  to: '/posts',
  search: postsSearchDefaults,
});
