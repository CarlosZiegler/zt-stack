import { Route } from '../index';
import AccountSwitcher from './account-switch';
import UserCard from './user-card';

export default function DashboardPage() {
  const { activeSessions, session, deviceSessions } = Route.useLoaderData();

  return (
    <div className="w-full p-4">
      <div className="flex gap-4 flex-col">
        <AccountSwitcher
          sessions={JSON.parse(JSON.stringify(deviceSessions.data))}
        />
        <UserCard
          session={JSON.parse(JSON.stringify(session.data))}
          activeSessions={JSON.parse(JSON.stringify(activeSessions.data))}
        />
      </div>
    </div>
  );
}
