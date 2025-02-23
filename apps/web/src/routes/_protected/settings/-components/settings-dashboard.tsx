import { use } from 'react';
import AccountSwitcher from './account-switch';
import { OrganizationCard } from './organization-card';
import UserCard from './user-card';
import { authClient } from '@/clients/authClient';
import { Route } from '../index.lazy';
export default function DashboardPage() {
  const { activeSessions, session, organization, deviceSessions } =
    Route.useLoaderData();

  return (
    <div className="w-full">
      <div className="flex gap-4 flex-col">
        <AccountSwitcher
          sessions={JSON.parse(JSON.stringify(deviceSessions.data))}
        />
        <UserCard
          session={JSON.parse(JSON.stringify(session.data))}
          activeSessions={JSON.parse(JSON.stringify(activeSessions.data))}
        />
        <OrganizationCard
          session={JSON.parse(JSON.stringify(session.data))}
          activeOrganization={JSON.parse(JSON.stringify(organization.data))}
        />
      </div>
    </div>
  );
}
