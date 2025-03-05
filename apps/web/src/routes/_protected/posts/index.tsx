import { createFileRoute, stripSearchParams } from '@tanstack/react-router';
import { queryClient } from '@/clients/queryClient';
import { trpc } from '@/router';
import {
  postsSearchDefaults,
  postsSearchSchema,
} from '@/validations/posts-link-options';

export const Route = createFileRoute('/_protected/posts/')({
  loader: () => queryClient.ensureQueryData(trpc.posts.all.queryOptions()),
  validateSearch: postsSearchSchema,
  search: {
    middlewares: [stripSearchParams(postsSearchDefaults)],
  },
});
