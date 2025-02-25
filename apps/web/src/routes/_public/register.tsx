import { createFileRoute, Link } from '@tanstack/react-router';
import { SignUpForm } from '@/routes/_public/-components/sign-up-form';
import { useTranslation } from '@repo/intl/react';

export const Route = createFileRoute('/_public/register')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation();

  return (
    <div className="p-2 md:p-6 flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
      <SignUpForm />
      <div className="mt-4 text-center">
        {t('ALREADY_HAVE_ACCOUNT')}{' '}
        <Link to="/login" className="underline">
          {t('LOG_IN')}
        </Link>
        !
      </div>
    </div>
  );
}
