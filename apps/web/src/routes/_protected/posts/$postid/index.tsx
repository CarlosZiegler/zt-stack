import { ArrowLeftIcon, ReloadIcon } from '@radix-ui/react-icons';
import { Link, createFileRoute } from '@tanstack/react-router';

import { useTranslation } from '@repo/intl/react';
import { Button } from '@repo/ui/components/button';

import { queryClient } from '@/clients/queryClient';
import { trpc } from '@/router';
import { postsLinkOptions } from '@/validations/posts-link-options';

export const Route = createFileRoute('/_protected/posts/$postid/')({
  loader: ({ params }) =>
    queryClient.ensureQueryData(
      trpc.posts.one.queryOptions({ id: params.postid })
    ),
  errorComponent: ({ error, reset }) => {
    const { t } = useTranslation();
    return (
      <div className='flex flex-col items-center w-full gap-y-3'>
        <div>{error.message}</div>
        <div className='flex gap-2'>
          <Button asChild variant='outline' className='w-full'>
            <Link {...postsLinkOptions}>
              <ArrowLeftIcon />
              {t('GO_BACK')}
            </Link>
          </Button>
          <Button
            variant='secondary'
            onClick={() => {
              // Reset the router error boundary
              reset();
            }}
            className='w-full'
          >
            {t('RETRY')} <ReloadIcon />
          </Button>
        </div>
      </div>
    );
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation();
  const post = Route.useLoaderData();

  return (
    <div className='flex flex-col px-4 w-full max-w-6xl mx-auto break-words'>
      <div className='text-center p-5 rounded-2xl'>
        <h1 className='text-2xl md:text-4xl font-bold'>{post.title}</h1>
        <p className='text-sm text-gray-500 mt-2'>
          {t('CREATED_BY')}{' '}
          <span className='font-medium'>{post.author.name}</span>,{' '}
          {post.createdAt.toLocaleString()}
        </p>
      </div>
      <hr className='border border-gray-500 mt-3' />
      <Button
        asChild
        variant='link'
        className='w-12 border border-gray-500 mt-6'
      >
        <Link {...postsLinkOptions}>
          <ArrowLeftIcon />
        </Link>
      </Button>

      <div className='bg-elevated shadow rounded-2xl p-6 w-full min-h-96 border border-gray-500 break-words mt-6'>
        <p className='leading-relaxed whitespace-break-spaces'>
          {post.content ?? t('NO_CONTENT_AVAILABLE')}
        </p>
      </div>
    </div>
  );
}
