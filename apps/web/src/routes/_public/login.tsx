import { createFileRoute, Link } from '@tanstack/react-router';
import LoginCredentialsForm from '@/routes/_public/-components/login-form';
import SignInForm from '@/routes/_public/-components/sign-in-form';
import { useTranslation } from '@repo/intl/react';

export const Route = createFileRoute('/_public/login')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation();

  return (
    <div className="p-2 md:p-6 flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
      <SignInForm />
      <div className="mt-4 text-center">
        {t('DONT_HAVE_ACCOUNT')}{' '}
        <Link to="/register" className="underline">
          {t('REGISTER')}
        </Link>
        !
      </div>
    </div>
  );
}
