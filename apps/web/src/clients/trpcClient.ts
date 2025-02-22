import { createTrpcClient } from '@repo/api/client';
import { env } from '@/env';

export const trpcClient = createTrpcClient({ apiUrl: env.PUBLIC_API_URL });
