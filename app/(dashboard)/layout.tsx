'use client';

import Link from 'next/link';
import { useState, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { FamilyLogo } from '@/components/branding/family-logo';
import { LandingFooter } from '@/components/landing/landing-footer';
import { LandingHeader } from '@/components/landing/landing-header';
import {
  CreditCard,
  Home,
  LogOut,
  Shield,
  Users
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { signOut } from '@/app/(login)/actions';
import { usePathname, useRouter } from 'next/navigation';
import { User } from '@/lib/db/schema';
import useSWR, { mutate } from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function UserMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: user } = useSWR<User>('/api/user', fetcher);
  const router = useRouter();
  const canAccessAdminReview = ['admin', 'owner', 'reviewer'].includes(
    user?.role?.toLowerCase() || ''
  );

  async function handleSignOut() {
    await signOut();
    mutate('/api/user');
    router.push('/');
  }

  if (!user) {
    return (
      <>
        <Link
          href="/pricing"
          className="text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          Pricing
        </Link>
        <Button asChild className="rounded-full">
          <Link href="/sign-up">Sign Up</Link>
        </Button>
      </>
    );
  }

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer size-9">
          <AvatarImage alt={user.name || ''} />
          <AvatarFallback>
            {user.email
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex flex-col gap-1">
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/dashboard" className="flex w-full items-center">
            <Home className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/dashboard/children" className="flex w-full items-center">
            <Users className="mr-2 h-4 w-4" />
            <span>Children</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/dashboard/billing" className="flex w-full items-center">
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
          </Link>
        </DropdownMenuItem>
        {canAccessAdminReview ? (
          <DropdownMenuItem className="cursor-pointer">
            <Link href="/admin/review" className="flex w-full items-center">
              <Shield className="mr-2 h-4 w-4" />
              <span>Admin Review</span>
            </Link>
          </DropdownMenuItem>
        ) : null}
        <form action={handleSignOut} className="w-full">
          <button type="submit" className="flex w-full">
            <DropdownMenuItem className="w-full flex-1 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Header() {
  return (
    <header className="pn-topbar">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <FamilyLogo size="sm" showSubtitle={false} textClassName="text-[#2f3455]" />
        <div className="flex items-center space-x-4">
          <Link
            href="/pricing"
            className="hidden rounded-full px-4 py-2 text-sm font-semibold text-[var(--pn-muted-2)] transition hover:bg-white/70 hover:text-[var(--pn-text)] sm:inline"
          >
            Pricing
          </Link>
          <Suspense fallback={<div className="h-9" />}>
            <UserMenu />
          </Suspense>
        </div>
      </div>
    </header>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isMarketingRoute =
    pathname === '/' ||
    pathname === '/pricing' ||
    pathname === '/sample-report' ||
    pathname === '/contact' ||
    pathname === '/help' ||
    pathname === '/faq' ||
    pathname === '/data-deletion' ||
    pathname.startsWith('/legal/');
  const showHeader = !isMarketingRoute;

  return (
    <section className="pn-page-shell flex min-h-screen flex-col">
      {isMarketingRoute ? <LandingHeader /> : null}
      {showHeader ? <Header /> : null}
      {isMarketingRoute && pathname !== '/' ? (
        <div className="pt-24 sm:pt-28">{children}</div>
      ) : (
        children
      )}
      {isMarketingRoute ? <LandingFooter /> : null}
    </section>
  );
}
