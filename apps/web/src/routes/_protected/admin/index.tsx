import { createFileRoute } from '@tanstack/react-router';
import { queryClient } from '@/clients/queryClient';
import { trpc } from '@/router';

export const Route = createFileRoute('/_protected/admin/')({
  loader: () => queryClient.ensureQueryData(trpc.posts.all.queryOptions()),
});
