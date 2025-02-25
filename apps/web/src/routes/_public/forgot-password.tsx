import { createFileRoute, Link } from '@tanstack/react-router';
import ForgotPasswordForm from './-components/forgot-password';
import { useTranslation } from '@repo/intl/react';

export const Route = createFileRoute('/_public/forgot-password')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation();

  return (
    <div className="p-2 md:p-6 flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
      <ForgotPasswordForm />

      <div className="mt-4 text-center">
        {t('DONT_HAVE_ACCOUNT')}{' '}
        <Link to="/login" className="underline">
          {t('LOGIN')}
        </Link>
        !
      </div>
    </div>
  );
}
