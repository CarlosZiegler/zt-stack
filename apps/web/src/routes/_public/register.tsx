import { createFileRoute, Link } from '@tanstack/react-router';
import { SignUpForm } from '@/routes/_public/-components/sign-up-form';

export const Route = createFileRoute('/_public/register')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-2 md:p-6 flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
      <SignUpForm />
      <div className="mt-4 text-center">
        Already have an account?{' '}
        <Link to="/login" className="underline">
          Log in
        </Link>
        !
      </div>
    </div>
  );
}
