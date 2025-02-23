import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import { trpc } from '@/router';
import SettingsDashboard from './-components/settings-dashboard';

export const Route = createLazyFileRoute('/_protected/settings/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <SettingsDashboard />;
}
