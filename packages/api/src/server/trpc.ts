import { initTRPC, TRPCError } from '@trpc/server';
import SuperJSON from 'superjson';
import type { AuthInstance } from '@repo/auth/server';
import type { DatabaseInstance } from '@repo/db/client';

export const createTRPCContext = async ({
  auth,
  db,
  headers,
}: {
  auth: AuthInstance;
  db: DatabaseInstance;
  headers: Headers;
}): Promise<{
  db: DatabaseInstance;
  session: AuthInstance['$Infer']['Session'] | null;
  auth: AuthInstance;
}> => {
  const session = await auth.api.getSession({
    headers,
  });
  return {
    db,
    session,
    auth,
  };
};

export const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: SuperJSON,
});

export const router = t.router;

const timingMiddleware = t.middleware(async ({ next, path }) => {
  const start = Date.now();
  let waitMs = 0;
  if (t._config.isDev) {
    // artificial delay in dev 100-500ms
    waitMs = Math.floor(Math.random() * 400) + 100;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }
  const result = await next();
  const end = Date.now();
  console.log(
    `\t[TRPC] /${path} executed after ${end - start}ms${waitMs > 0 ? ` (artificial delay: ${waitMs}ms)` : ''}`,
  );
  return result;
});

export const publicProcedure = t.procedure.use(timingMiddleware);

export const protectedProcedure = publicProcedure.use(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});
