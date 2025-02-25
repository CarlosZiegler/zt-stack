import { createLazyFileRoute } from '@tanstack/react-router';
import AdminDashboard from './-components/admin-dashboard';

export const Route = createLazyFileRoute('/_protected/admin/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <AdminDashboard />;
}
