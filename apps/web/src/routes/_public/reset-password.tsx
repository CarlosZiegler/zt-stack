import { createFileRoute, Link } from '@tanstack/react-router';

import ResetPasswordForm from './-components/reset-password';

export const Route = createFileRoute('/_public/reset-password')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-2 md:p-6 flex flex-col items-center">
      <div className="border p-4 md:p-8 w-full max-w-md rounded-lg bg-elevated">
        <ResetPasswordForm />

        <div className="mt-4 text-center">
          {"Don't have an account? "}
          <Link to="/login" className="underline">
            Login
          </Link>
          !
        </div>
      </div>
    </div>
  );
}
