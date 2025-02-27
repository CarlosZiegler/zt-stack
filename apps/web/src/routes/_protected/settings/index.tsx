import { createFileRoute } from '@tanstack/react-router';
import { authClient } from '@/clients/authClient';

export const Route = createFileRoute('/_protected/settings/')({
  loader: async () => {
    // Change to trpc
    const [
      session,
      activeSessions,
      deviceSessions,
      organization,
      organizations,
    ] = await Promise.all([
      authClient.getSession(),
      authClient.listSessions(),
      authClient.multiSession.listDeviceSessions(),
      authClient.organization.getFullOrganization(),
      authClient.organization.list(),
    ]);

    return {
      session,
      activeSessions,
      deviceSessions,
      organization,
      organizations,
    };
  },
});
