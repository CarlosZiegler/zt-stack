import { useSuspenseQuery } from '@tanstack/react-query';
import { authGetListSessionsQueryOptions } from '../index';
import UserCard from './user-card';

export default function DashboardPage() {
  const activeSessions = useSuspenseQuery(authGetListSessionsQueryOptions);

  return (
    <div className="w-full p-4">
      <div className="flex gap-4 flex-col">
        <UserCard activeSessions={activeSessions?.data} />
      </div>
    </div>
  );
}
