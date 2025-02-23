import { Link } from '@tanstack/react-router';
import { authClient } from '@/clients/authClient';
import UserAvatar from '@/routes/-components/layout/nav/user-avatar';
import { postsLinkOptions } from '@/validations/posts-link-options';

const activeClassName = 'underline decoration-2 opacity-70';

export function Navbar() {
  const { data: session, isPending } = authClient.useSession();

  return (
    <div className="px-2 md:px-4 flex items-center justify-between text-lg bg-nav h-12">
      <div className="flex gap-x-4">
        <Link
          to="/"
          activeProps={{ className: activeClassName }}
          activeOptions={{ exact: true }}
        >
          Home
        </Link>
        <Link
          to="/admin"
          activeProps={{ className: activeClassName }}
          activeOptions={{ exact: true }}
        >
          Admin
        </Link>
        <Link
          to="/settings"
          activeProps={{ className: activeClassName }}
          activeOptions={{ exact: true }}
        >
          Settings
        </Link>
        {session?.user ? (
          <Link
            {...postsLinkOptions}
            activeProps={{ className: activeClassName }}
          >
            Posts
          </Link>
        ) : null}
      </div>
      {isPending ? null : session?.user ? (
        <UserAvatar user={session.user} />
      ) : (
        <div className="flex gap-x-2 justify-between">
          <Link
            to="/login"
            activeProps={{ className: activeClassName }}
            activeOptions={{ exact: true }}
          >
            Login
          </Link>
          <span>|</span>
          <Link
            to="/register"
            activeProps={{ className: activeClassName }}
            activeOptions={{ exact: true }}
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
}
