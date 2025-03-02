import { createFileRoute } from '@tanstack/react-router';
import SettingsDashboard from './-components/settings-dashboard';
import { authClient } from '@/clients/authClient';
import { queryOptions } from '@tanstack/react-query';
import { queryClient } from '@/clients/queryClient';

export const authGetListSessionsQueryOptions = queryOptions({
  queryKey: ['auth', 'list-sessions'],
  queryFn: () => authClient.listSessions(),
  staleTime: 0,
  select: (data) => data.data,
});

export const Route = createFileRoute('/_protected/account/')({
  component: RouteComponent,
  loader: async () =>
    queryClient.ensureQueryData(authGetListSessionsQueryOptions),
});

function RouteComponent() {
  return <SettingsDashboard />;
}
