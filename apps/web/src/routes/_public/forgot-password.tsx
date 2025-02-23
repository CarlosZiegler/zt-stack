import { createFileRoute, Link } from '@tanstack/react-router';
import ForgotPasswordForm from './-components/forgot-password';

export const Route = createFileRoute('/_public/forgot-password')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-2 md:p-6 flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
      <ForgotPasswordForm />

      <div className="mt-4 text-center">
        {"Don't have an account? "}
        <Link to="/login" className="underline">
          Login
        </Link>
        !
      </div>
    </div>
  );
}
