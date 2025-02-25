import { Link } from '@tanstack/react-router';
import { authClient } from '@/clients/authClient';
import UserAvatar from '@/routes/-components/layout/nav/user-avatar';
import { postsLinkOptions } from '@/validations/posts-link-options';
import { useTranslation } from '@repo/intl/react';

const activeClassName = 'underline decoration-2 opacity-70';

export function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const { t } = useTranslation();

  return (
    <div className="px-2 md:px-4 flex items-center justify-between text-lg bg-blue-500 text-white h-12">
      <div className="flex gap-x-4">
        <Link
          to="/"
          activeProps={{ className: activeClassName }}
          activeOptions={{ exact: true }}
        >
          {t('HOME')}
        </Link>

        {session?.user
          ? [
              <Link
                key="posts"
                {...postsLinkOptions}
                activeProps={{ className: activeClassName }}
              >
                {t('POSTS')}
              </Link>,
              <Link
                key="admin"
                to="/admin"
                activeProps={{ className: activeClassName }}
                activeOptions={{ exact: true }}
              >
                {t('ADMIN')}
              </Link>,
              <Link
                key="settings"
                to="/settings"
                activeProps={{ className: activeClassName }}
                activeOptions={{ exact: true }}
              >
                {t('SETTINGS')}
              </Link>,
            ]
          : null}
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
            {t('LOGIN')}
          </Link>
          <span>|</span>
          <Link
            to="/register"
            activeProps={{ className: activeClassName }}
            activeOptions={{ exact: true }}
          >
            {t('REGISTER')}
          </Link>
        </div>
      )}
    </div>
  );
}
