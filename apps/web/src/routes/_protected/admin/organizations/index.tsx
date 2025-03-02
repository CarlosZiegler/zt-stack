import { authClient } from '@/clients/authClient';
import { createFileRoute } from '@tanstack/react-router';
import { OrganizationCard } from '../-components/organization-card';

export const Route = createFileRoute('/_protected/admin/organizations/')({
  component: RouteComponent,
  loader: async () => {
    // Change to trpc
    const [session, organization, organizations] = await Promise.all([
      authClient.getSession(),
      authClient.organization.getFullOrganization(),
      authClient.organization.list(),
    ]);

    return {
      session,
      organization,
      organizations,
    };
  },
});

function RouteComponent() {
  const { session, organization } = Route.useLoaderData();

  return (
    <OrganizationCard
      session={session.data}
      activeOrganization={organization.data}
    />
  );
}
