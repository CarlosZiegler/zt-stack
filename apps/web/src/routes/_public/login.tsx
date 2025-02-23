import { createFileRoute, Link } from '@tanstack/react-router';
import LoginCredentialsForm from '@/routes/_public/-components/login-form';
import SignInForm from '@/routes/_public/-components/sign-in-form';

export const Route = createFileRoute('/_public/login')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-2 md:p-6 flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
      <SignInForm />
      <div className="mt-4 text-center">
        {"Don't have an account? "}
        <Link to="/register" className="underline">
          Register
        </Link>
        !
      </div>
    </div>
  );
}
