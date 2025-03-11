import { Link, createFileRoute } from '@tanstack/react-router';

import { ArrowRight, Building2, Lock, Users } from 'lucide-react';

import { Button } from '@repo/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';

import { authClient } from '@/clients/authClient';
import { postsLinkOptions } from '@/validations/posts-link-options';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: session } = authClient.useSession();

  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <section className='py-20 px-4 md:px-6 text-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800'>
        <div className='max-w-5xl mx-auto'>
          <h1 className='text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400'>
            Powerful User Management Platform
          </h1>
          <p className='text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
            A complete solution for authentication, user management, and
            organization control
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            {!session?.user ? (
              <>
                <Button asChild size='lg' className='font-semibold'>
                  <Link to='/login'>
                    Get Started <ArrowRight className='ml-2 h-4 w-4' />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant='outline'
                  size='lg'
                  className='font-semibold'
                >
                  <Link to='/register'>Create Account</Link>
                </Button>
              </>
            ) : (
              <Button asChild size='lg' className='font-semibold'>
                <Link {...postsLinkOptions}>
                  Go to Dashboard <ArrowRight className='ml-2 h-4 w-4' />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-16 px-4 md:px-6 bg-white dark:bg-gray-800'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white'>
            Key Features
          </h2>

          <div className='grid md:grid-cols-3 gap-8'>
            <Card>
              <CardHeader>
                <Users className='h-8 w-8 mb-2 text-blue-600 dark:text-blue-400' />
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Complete user authentication and profile management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className='text-gray-600 dark:text-gray-300'>
                  Secure login, registration, and profile management with
                  support for multiple authentication methods.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Building2 className='h-8 w-8 mb-2 text-blue-600 dark:text-blue-400' />
                <CardTitle>Organization Control</CardTitle>
                <CardDescription>
                  Manage teams and organizational structure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className='text-gray-600 dark:text-gray-300'>
                  Create and manage organizations with team hierarchies, roles,
                  and permissions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Lock className='h-8 w-8 mb-2 text-blue-600 dark:text-blue-400' />
                <CardTitle>Advanced Security</CardTitle>
                <CardDescription>
                  Enterprise-grade security features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className='text-gray-600 dark:text-gray-300'>
                  Multi-factor authentication, session management, and device
                  tracking for maximum security.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!session?.user && (
        <section className='py-16 px-4 md:px-6 bg-blue-50 dark:bg-gray-900'>
          <div className='max-w-4xl mx-auto text-center'>
            <h2 className='text-3xl font-bold mb-4 text-gray-900 dark:text-white'>
              Ready to get started?
            </h2>
            <p className='text-xl mb-8 text-gray-600 dark:text-gray-300'>
              Join thousands of organizations that trust our platform
            </p>
            <Button asChild size='lg' className='font-semibold'>
              <Link to='/register'>
                Sign Up Now <ArrowRight className='ml-2 h-4 w-4' />
              </Link>
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}
