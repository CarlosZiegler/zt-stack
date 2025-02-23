import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import { trpc } from '@/router';
import AdminDashboard from './-components/admin-dashboard';

export const Route = createLazyFileRoute('/_protected/admin/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: posts } = useQuery(trpc.posts.all.queryOptions());

  return <AdminDashboard />;
}
