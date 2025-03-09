import { createFileRoute } from '@tanstack/react-router';

import { queryClient } from '@/clients/queryClient';
import { trpc } from '@/router';

import AdminDashboard from './-components/admin-dashboard';

export const Route = createFileRoute('/_protected/admin/')({
  loader: () => queryClient.ensureQueryData(trpc.posts.all.queryOptions()),

  component: RouteComponent,
});

function RouteComponent() {
  return <AdminDashboard />;
}
