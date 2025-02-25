import { createLazyFileRoute } from '@tanstack/react-router';
import SettingsDashboard from './-components/settings-dashboard';

export const Route = createLazyFileRoute('/_protected/settings/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <SettingsDashboard />;
}
