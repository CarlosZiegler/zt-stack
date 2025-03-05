import { scan } from 'react-scan';
import './style.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createRouter } from '@/router';
import { initI18n } from '@repo/intl/i18n';
import { Toaster } from '@repo/ui/components/sonner';
import { RouterProvider } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';

 scan({
  enabled: true,
});

initI18n({
  lng: 'en',
  fallbackLng: 'en',
});

const rootElement = document.getElementById('app')!;

  const router = createRouter();

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        themes={['light', 'dark']}
        disableTransitionOnChange
      >
        <RouterProvider router={router} />
        <Toaster
          toastOptions={{
            classNames: {
              // !important to override: https://github.com/shadcn-ui/ui/issues/3579
              error: '!border-none !bg-toast-error !text-foreground',
              info: '!border-none !bg-toast-info !text-foreground',
              loading: '!border-none !bg-toast-loading !text-foreground',
              success: '!border-none !bg-toast-success !text-foreground',
              warning: '!border-none !bg-toast-warning !text-foreground',
            },
          }}
        />
      </ThemeProvider>
    </React.StrictMode>,
  );
}
