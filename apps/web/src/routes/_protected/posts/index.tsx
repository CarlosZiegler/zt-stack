import { TrashIcon } from '@radix-ui/react-icons';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, stripSearchParams } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import type { inferRouterOutputs } from '@trpc/server';

import type { AppRouter } from '@repo/api/server';
import { useTranslation } from '@repo/intl/react';

import { queryClient } from '@/clients/queryClient';
import { trpc } from '@/router';
import CreatePostButton from '@/routes/_protected/posts/-components/create-post';
import DeletePostButton from '@/routes/_protected/posts/-components/delete-post';
import {
  postsSearchDefaults,
  postsSearchSchema,
} from '@/validations/posts-link-options';

export const Route = createFileRoute('/_protected/posts/')({
  loader: () => queryClient.ensureQueryData(trpc.posts.all.queryOptions()),
  validateSearch: postsSearchSchema,
  search: {
    middlewares: [stripSearchParams(postsSearchDefaults)],
  },

  component: RouteComponent,
});

function PostItem({
  post,
}: {
  post: inferRouterOutputs<AppRouter>['posts']['all'][number];
}) {
  return (
    <Link
      to='/posts/$postid'
      params={{ postid: post.id }}
      className='border border-gray-500 bg-elevated p-4 w-full flex items-center justify-between gap-x-3 rounded-xl hover:brightness-90'
    >
      <div className='flex flex-col gap-y-1'>
        <div className='text-lg font-bold line-clamp-3'>{post.title}</div>
        <div className='italic text-sm'>{post.createdAt.toLocaleString()}</div>
      </div>

      <DeletePostButton postId={post.id}>
        <TrashIcon />
      </DeletePostButton>
    </Link>
  );
}

function RouteComponent() {
  const { t } = useTranslation();
  const { data: posts } = useQuery(trpc.posts.all.queryOptions());

  return (
    <div className='flex flex-col md:p-4 w-full max-w-6xl mx-auto'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl'>{t('POSTS_TITLE')}</h1>
        <CreatePostButton />
      </div>
      <hr className='mt-4 border-b-2 border-gray-400' />
      <div className='flex gap-x-3 gap-y-3 flex-wrap mt-6'>
        {posts?.length
          ? posts.map((p) => <PostItem key={p.id} post={p} />)
          : t('NO_POSTS_AVAILABLE')}
      </div>
    </div>
  );
}
