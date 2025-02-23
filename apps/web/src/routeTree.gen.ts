/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as PublicLayoutImport } from './routes/_public/layout'
import { Route as ProtectedLayoutImport } from './routes/_protected/layout'
import { Route as PublicResetPasswordImport } from './routes/_public/reset-password'
import { Route as PublicRegisterImport } from './routes/_public/register'
import { Route as PublicLoginImport } from './routes/_public/login'
import { Route as PublicForgotPasswordImport } from './routes/_public/forgot-password'
import { Route as PublicTwoFactorIndexImport } from './routes/_public/two-factor/index'
import { Route as ProtectedSettingsIndexImport } from './routes/_protected/settings/index'
import { Route as ProtectedPostsIndexImport } from './routes/_protected/posts/index'
import { Route as ProtectedAdminIndexImport } from './routes/_protected/admin/index'
import { Route as PublicTwoFactorOtpImport } from './routes/_public/two-factor/otp'
import { Route as PublicAcceptInvitationInvitationIdIndexImport } from './routes/_public/accept-invitation/$invitationId/index'
import { Route as ProtectedPostsPostidIndexImport } from './routes/_protected/posts/$postid/index'
import { Route as PublicAcceptInvitationInvitationIdInvitationErrorImport } from './routes/_public/accept-invitation/$invitationId/invitation-error'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const PublicLayoutRoute = PublicLayoutImport.update({
  id: '/_public',
  getParentRoute: () => rootRoute,
} as any)

const ProtectedLayoutRoute = ProtectedLayoutImport.update({
  id: '/_protected',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const PublicResetPasswordRoute = PublicResetPasswordImport.update({
  id: '/reset-password',
  path: '/reset-password',
  getParentRoute: () => PublicLayoutRoute,
} as any)

const PublicRegisterRoute = PublicRegisterImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => PublicLayoutRoute,
} as any)

const PublicLoginRoute = PublicLoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => PublicLayoutRoute,
} as any)

const PublicForgotPasswordRoute = PublicForgotPasswordImport.update({
  id: '/forgot-password',
  path: '/forgot-password',
  getParentRoute: () => PublicLayoutRoute,
} as any)

const PublicTwoFactorIndexRoute = PublicTwoFactorIndexImport.update({
  id: '/two-factor/',
  path: '/two-factor/',
  getParentRoute: () => PublicLayoutRoute,
} as any)

const ProtectedSettingsIndexRoute = ProtectedSettingsIndexImport.update({
  id: '/settings/',
  path: '/settings/',
  getParentRoute: () => ProtectedLayoutRoute,
} as any).lazy(() =>
  import('./routes/_protected/settings/index.lazy').then((d) => d.Route),
)

const ProtectedPostsIndexRoute = ProtectedPostsIndexImport.update({
  id: '/posts/',
  path: '/posts/',
  getParentRoute: () => ProtectedLayoutRoute,
} as any).lazy(() =>
  import('./routes/_protected/posts/index.lazy').then((d) => d.Route),
)

const ProtectedAdminIndexRoute = ProtectedAdminIndexImport.update({
  id: '/admin/',
  path: '/admin/',
  getParentRoute: () => ProtectedLayoutRoute,
} as any).lazy(() =>
  import('./routes/_protected/admin/index.lazy').then((d) => d.Route),
)

const PublicTwoFactorOtpRoute = PublicTwoFactorOtpImport.update({
  id: '/two-factor/otp',
  path: '/two-factor/otp',
  getParentRoute: () => PublicLayoutRoute,
} as any)

const PublicAcceptInvitationInvitationIdIndexRoute =
  PublicAcceptInvitationInvitationIdIndexImport.update({
    id: '/accept-invitation/$invitationId/',
    path: '/accept-invitation/$invitationId/',
    getParentRoute: () => PublicLayoutRoute,
  } as any)

const ProtectedPostsPostidIndexRoute = ProtectedPostsPostidIndexImport.update({
  id: '/posts/$postid/',
  path: '/posts/$postid/',
  getParentRoute: () => ProtectedLayoutRoute,
} as any).lazy(() =>
  import('./routes/_protected/posts/$postid/index.lazy').then((d) => d.Route),
)

const PublicAcceptInvitationInvitationIdInvitationErrorRoute =
  PublicAcceptInvitationInvitationIdInvitationErrorImport.update({
    id: '/accept-invitation/$invitationId/invitation-error',
    path: '/accept-invitation/$invitationId/invitation-error',
    getParentRoute: () => PublicLayoutRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/_protected': {
      id: '/_protected'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof ProtectedLayoutImport
      parentRoute: typeof rootRoute
    }
    '/_public': {
      id: '/_public'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof PublicLayoutImport
      parentRoute: typeof rootRoute
    }
    '/_public/forgot-password': {
      id: '/_public/forgot-password'
      path: '/forgot-password'
      fullPath: '/forgot-password'
      preLoaderRoute: typeof PublicForgotPasswordImport
      parentRoute: typeof PublicLayoutImport
    }
    '/_public/login': {
      id: '/_public/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof PublicLoginImport
      parentRoute: typeof PublicLayoutImport
    }
    '/_public/register': {
      id: '/_public/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof PublicRegisterImport
      parentRoute: typeof PublicLayoutImport
    }
    '/_public/reset-password': {
      id: '/_public/reset-password'
      path: '/reset-password'
      fullPath: '/reset-password'
      preLoaderRoute: typeof PublicResetPasswordImport
      parentRoute: typeof PublicLayoutImport
    }
    '/_public/two-factor/otp': {
      id: '/_public/two-factor/otp'
      path: '/two-factor/otp'
      fullPath: '/two-factor/otp'
      preLoaderRoute: typeof PublicTwoFactorOtpImport
      parentRoute: typeof PublicLayoutImport
    }
    '/_protected/admin/': {
      id: '/_protected/admin/'
      path: '/admin'
      fullPath: '/admin'
      preLoaderRoute: typeof ProtectedAdminIndexImport
      parentRoute: typeof ProtectedLayoutImport
    }
    '/_protected/posts/': {
      id: '/_protected/posts/'
      path: '/posts'
      fullPath: '/posts'
      preLoaderRoute: typeof ProtectedPostsIndexImport
      parentRoute: typeof ProtectedLayoutImport
    }
    '/_protected/settings/': {
      id: '/_protected/settings/'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof ProtectedSettingsIndexImport
      parentRoute: typeof ProtectedLayoutImport
    }
    '/_public/two-factor/': {
      id: '/_public/two-factor/'
      path: '/two-factor'
      fullPath: '/two-factor'
      preLoaderRoute: typeof PublicTwoFactorIndexImport
      parentRoute: typeof PublicLayoutImport
    }
    '/_public/accept-invitation/$invitationId/invitation-error': {
      id: '/_public/accept-invitation/$invitationId/invitation-error'
      path: '/accept-invitation/$invitationId/invitation-error'
      fullPath: '/accept-invitation/$invitationId/invitation-error'
      preLoaderRoute: typeof PublicAcceptInvitationInvitationIdInvitationErrorImport
      parentRoute: typeof PublicLayoutImport
    }
    '/_protected/posts/$postid/': {
      id: '/_protected/posts/$postid/'
      path: '/posts/$postid'
      fullPath: '/posts/$postid'
      preLoaderRoute: typeof ProtectedPostsPostidIndexImport
      parentRoute: typeof ProtectedLayoutImport
    }
    '/_public/accept-invitation/$invitationId/': {
      id: '/_public/accept-invitation/$invitationId/'
      path: '/accept-invitation/$invitationId'
      fullPath: '/accept-invitation/$invitationId'
      preLoaderRoute: typeof PublicAcceptInvitationInvitationIdIndexImport
      parentRoute: typeof PublicLayoutImport
    }
  }
}

// Create and export the route tree

interface ProtectedLayoutRouteChildren {
  ProtectedAdminIndexRoute: typeof ProtectedAdminIndexRoute
  ProtectedPostsIndexRoute: typeof ProtectedPostsIndexRoute
  ProtectedSettingsIndexRoute: typeof ProtectedSettingsIndexRoute
  ProtectedPostsPostidIndexRoute: typeof ProtectedPostsPostidIndexRoute
}

const ProtectedLayoutRouteChildren: ProtectedLayoutRouteChildren = {
  ProtectedAdminIndexRoute: ProtectedAdminIndexRoute,
  ProtectedPostsIndexRoute: ProtectedPostsIndexRoute,
  ProtectedSettingsIndexRoute: ProtectedSettingsIndexRoute,
  ProtectedPostsPostidIndexRoute: ProtectedPostsPostidIndexRoute,
}

const ProtectedLayoutRouteWithChildren = ProtectedLayoutRoute._addFileChildren(
  ProtectedLayoutRouteChildren,
)

interface PublicLayoutRouteChildren {
  PublicForgotPasswordRoute: typeof PublicForgotPasswordRoute
  PublicLoginRoute: typeof PublicLoginRoute
  PublicRegisterRoute: typeof PublicRegisterRoute
  PublicResetPasswordRoute: typeof PublicResetPasswordRoute
  PublicTwoFactorOtpRoute: typeof PublicTwoFactorOtpRoute
  PublicTwoFactorIndexRoute: typeof PublicTwoFactorIndexRoute
  PublicAcceptInvitationInvitationIdInvitationErrorRoute: typeof PublicAcceptInvitationInvitationIdInvitationErrorRoute
  PublicAcceptInvitationInvitationIdIndexRoute: typeof PublicAcceptInvitationInvitationIdIndexRoute
}

const PublicLayoutRouteChildren: PublicLayoutRouteChildren = {
  PublicForgotPasswordRoute: PublicForgotPasswordRoute,
  PublicLoginRoute: PublicLoginRoute,
  PublicRegisterRoute: PublicRegisterRoute,
  PublicResetPasswordRoute: PublicResetPasswordRoute,
  PublicTwoFactorOtpRoute: PublicTwoFactorOtpRoute,
  PublicTwoFactorIndexRoute: PublicTwoFactorIndexRoute,
  PublicAcceptInvitationInvitationIdInvitationErrorRoute:
    PublicAcceptInvitationInvitationIdInvitationErrorRoute,
  PublicAcceptInvitationInvitationIdIndexRoute:
    PublicAcceptInvitationInvitationIdIndexRoute,
}

const PublicLayoutRouteWithChildren = PublicLayoutRoute._addFileChildren(
  PublicLayoutRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '': typeof PublicLayoutRouteWithChildren
  '/forgot-password': typeof PublicForgotPasswordRoute
  '/login': typeof PublicLoginRoute
  '/register': typeof PublicRegisterRoute
  '/reset-password': typeof PublicResetPasswordRoute
  '/two-factor/otp': typeof PublicTwoFactorOtpRoute
  '/admin': typeof ProtectedAdminIndexRoute
  '/posts': typeof ProtectedPostsIndexRoute
  '/settings': typeof ProtectedSettingsIndexRoute
  '/two-factor': typeof PublicTwoFactorIndexRoute
  '/accept-invitation/$invitationId/invitation-error': typeof PublicAcceptInvitationInvitationIdInvitationErrorRoute
  '/posts/$postid': typeof ProtectedPostsPostidIndexRoute
  '/accept-invitation/$invitationId': typeof PublicAcceptInvitationInvitationIdIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '': typeof PublicLayoutRouteWithChildren
  '/forgot-password': typeof PublicForgotPasswordRoute
  '/login': typeof PublicLoginRoute
  '/register': typeof PublicRegisterRoute
  '/reset-password': typeof PublicResetPasswordRoute
  '/two-factor/otp': typeof PublicTwoFactorOtpRoute
  '/admin': typeof ProtectedAdminIndexRoute
  '/posts': typeof ProtectedPostsIndexRoute
  '/settings': typeof ProtectedSettingsIndexRoute
  '/two-factor': typeof PublicTwoFactorIndexRoute
  '/accept-invitation/$invitationId/invitation-error': typeof PublicAcceptInvitationInvitationIdInvitationErrorRoute
  '/posts/$postid': typeof ProtectedPostsPostidIndexRoute
  '/accept-invitation/$invitationId': typeof PublicAcceptInvitationInvitationIdIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/_protected': typeof ProtectedLayoutRouteWithChildren
  '/_public': typeof PublicLayoutRouteWithChildren
  '/_public/forgot-password': typeof PublicForgotPasswordRoute
  '/_public/login': typeof PublicLoginRoute
  '/_public/register': typeof PublicRegisterRoute
  '/_public/reset-password': typeof PublicResetPasswordRoute
  '/_public/two-factor/otp': typeof PublicTwoFactorOtpRoute
  '/_protected/admin/': typeof ProtectedAdminIndexRoute
  '/_protected/posts/': typeof ProtectedPostsIndexRoute
  '/_protected/settings/': typeof ProtectedSettingsIndexRoute
  '/_public/two-factor/': typeof PublicTwoFactorIndexRoute
  '/_public/accept-invitation/$invitationId/invitation-error': typeof PublicAcceptInvitationInvitationIdInvitationErrorRoute
  '/_protected/posts/$postid/': typeof ProtectedPostsPostidIndexRoute
  '/_public/accept-invitation/$invitationId/': typeof PublicAcceptInvitationInvitationIdIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/forgot-password'
    | '/login'
    | '/register'
    | '/reset-password'
    | '/two-factor/otp'
    | '/admin'
    | '/posts'
    | '/settings'
    | '/two-factor'
    | '/accept-invitation/$invitationId/invitation-error'
    | '/posts/$postid'
    | '/accept-invitation/$invitationId'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/forgot-password'
    | '/login'
    | '/register'
    | '/reset-password'
    | '/two-factor/otp'
    | '/admin'
    | '/posts'
    | '/settings'
    | '/two-factor'
    | '/accept-invitation/$invitationId/invitation-error'
    | '/posts/$postid'
    | '/accept-invitation/$invitationId'
  id:
    | '__root__'
    | '/'
    | '/_protected'
    | '/_public'
    | '/_public/forgot-password'
    | '/_public/login'
    | '/_public/register'
    | '/_public/reset-password'
    | '/_public/two-factor/otp'
    | '/_protected/admin/'
    | '/_protected/posts/'
    | '/_protected/settings/'
    | '/_public/two-factor/'
    | '/_public/accept-invitation/$invitationId/invitation-error'
    | '/_protected/posts/$postid/'
    | '/_public/accept-invitation/$invitationId/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  ProtectedLayoutRoute: typeof ProtectedLayoutRouteWithChildren
  PublicLayoutRoute: typeof PublicLayoutRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  ProtectedLayoutRoute: ProtectedLayoutRouteWithChildren,
  PublicLayoutRoute: PublicLayoutRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_protected",
        "/_public"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/_protected": {
      "filePath": "_protected/layout.tsx",
      "children": [
        "/_protected/admin/",
        "/_protected/posts/",
        "/_protected/settings/",
        "/_protected/posts/$postid/"
      ]
    },
    "/_public": {
      "filePath": "_public/layout.tsx",
      "children": [
        "/_public/forgot-password",
        "/_public/login",
        "/_public/register",
        "/_public/reset-password",
        "/_public/two-factor/otp",
        "/_public/two-factor/",
        "/_public/accept-invitation/$invitationId/invitation-error",
        "/_public/accept-invitation/$invitationId/"
      ]
    },
    "/_public/forgot-password": {
      "filePath": "_public/forgot-password.tsx",
      "parent": "/_public"
    },
    "/_public/login": {
      "filePath": "_public/login.tsx",
      "parent": "/_public"
    },
    "/_public/register": {
      "filePath": "_public/register.tsx",
      "parent": "/_public"
    },
    "/_public/reset-password": {
      "filePath": "_public/reset-password.tsx",
      "parent": "/_public"
    },
    "/_public/two-factor/otp": {
      "filePath": "_public/two-factor/otp.tsx",
      "parent": "/_public"
    },
    "/_protected/admin/": {
      "filePath": "_protected/admin/index.tsx",
      "parent": "/_protected"
    },
    "/_protected/posts/": {
      "filePath": "_protected/posts/index.tsx",
      "parent": "/_protected"
    },
    "/_protected/settings/": {
      "filePath": "_protected/settings/index.tsx",
      "parent": "/_protected"
    },
    "/_public/two-factor/": {
      "filePath": "_public/two-factor/index.tsx",
      "parent": "/_public"
    },
    "/_public/accept-invitation/$invitationId/invitation-error": {
      "filePath": "_public/accept-invitation/$invitationId/invitation-error.tsx",
      "parent": "/_public"
    },
    "/_protected/posts/$postid/": {
      "filePath": "_protected/posts/$postid/index.tsx",
      "parent": "/_protected"
    },
    "/_public/accept-invitation/$invitationId/": {
      "filePath": "_public/accept-invitation/$invitationId/index.tsx",
      "parent": "/_public"
    }
  }
}
ROUTE_MANIFEST_END */
