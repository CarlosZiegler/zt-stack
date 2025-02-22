import { createTRPCClient, httpBatchLink } from '@trpc/client';
import SuperJSON from 'superjson';
import urlJoin from 'url-join';
import type { AppRouter } from '../server';

export interface APIClientOptions {
  apiUrl: string;
}

export const createTrpcClient = ({ apiUrl }: APIClientOptions) => {
  return createTRPCClient<AppRouter>({
    links: [
      httpBatchLink({
        url: urlJoin(apiUrl, 'trpc'),
        transformer: SuperJSON,
        fetch(url, options) {
          return fetch(url, {
            ...options,
            /**
             * https://trpc.io/docs/client/cors
             *
             * This is required if you are deploying your frontend (web)
             * and backend (server) on two different domains.
             */
            credentials: 'include',
          });
        },
      }),
    ],
  });
};
