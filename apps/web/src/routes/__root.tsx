import { Toaster } from '@repo/ui/components/sonner';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import React from 'react';
import { ThemeProvider } from 'next-themes';
import { MainNavbar } from './-components/layout/main-navbar';
import { authClient } from '@/clients/authClient';
import { Button } from '@repo/ui/components/button';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';

export const Route = createRootRoute({
  component: RootComponent,
});

// https://tanstack.com/router/v1/docs/framework/react/devtools
const TanStackRouterDevtools = import.meta.env.PROD
  ? () => null
  : React.lazy(() =>
      import('@tanstack/router-devtools').then((res) => ({
        default: res.TanStackRouterDevtools,
      })),
    );

function RootComponent() {
  const { data: session } = authClient.useSession();
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen flex flex-col">
        <MainNavbar />

        {/* Theme toggle for logged-in users */}
        {session?.user && (
          <div className="absolute top-4 right-4 z-50">
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
              }
              className="rounded-full"
              aria-label="Toggle theme"
            >
              {resolvedTheme === 'dark' ? (
                <MoonIcon className="h-5 w-5 text-yellow-300" />
              ) : (
                <SunIcon className="h-5 w-5 text-amber-500" />
              )}
            </Button>
          </div>
        )}

        <main className="flex-1">
          <Outlet />
        </main>
        <Toaster />
      </div>
      <React.Suspense>
        <TanStackRouterDevtools position="bottom-right" />
      </React.Suspense>
    </ThemeProvider>
  );
}
