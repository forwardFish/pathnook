'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Activity,
  CreditCard,
  Home,
  Menu,
  Shield,
  Sparkles,
  UserRound,
  Users,
  X,
} from 'lucide-react';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { href: '/dashboard', icon: Home, label: 'Overview' },
    { href: '/dashboard/children', icon: Users, label: 'Children' },
    { href: '/dashboard/general', icon: UserRound, label: 'Parent Account' },
    { href: '/dashboard/tutor', icon: Sparkles, label: 'Tutor Workspace' },
    { href: '/dashboard/activity', icon: Activity, label: 'Activity' },
    { href: '/dashboard/security', icon: Shield, label: 'Security' },
    { href: '/dashboard/billing', icon: CreditCard, label: 'Billing' }
  ];
  const currentLabel =
    navItems.find(
      (item) =>
        pathname === item.href ||
        (item.href !== '/dashboard' && pathname.startsWith(item.href))
    )?.label || 'Dashboard';

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-76px)] w-full max-w-[1180px] flex-col px-4 pb-8 pt-6 sm:px-6 lg:px-8">
      <div className="lg:hidden">
        <div className="pn-card mb-4 flex items-center justify-between px-4 py-4">
          <div>
            <p className="pn-kicker">Dashboard</p>
            <p className="mt-1 text-lg font-black text-[#111827]">{currentLabel}</p>
          </div>
          <Button
            className="rounded-[1rem]"
            variant="outline"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-1 gap-6">
        <aside
          className={`${
            isSidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
          } fixed inset-y-24 left-4 z-40 w-[min(20rem,calc(100vw-2rem))] transition-all duration-300 lg:static lg:w-72 lg:translate-x-0 lg:opacity-100`}
        >
          <div className="pn-surface h-full p-3">
            <div className="rounded-[1.5rem] border border-[var(--pn-border)] bg-white p-4">
              <p className="pn-kicker">Parent Workspace</p>
              <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-[#111827]">
                Household dashboard
              </h2>
              <p className="mt-2 text-sm leading-7 text-[var(--pn-muted)]">
                Diagnoses, uploads, billing, activity, and follow-through in one place.
              </p>

              <nav className="mt-6 grid gap-2">
                {navItems.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== '/dashboard' && pathname.startsWith(item.href));

                  return (
                    <Link key={item.href} href={item.href} onClick={() => setIsSidebarOpen(false)}>
                      <div
                        className={`flex items-center gap-3 rounded-[1rem] px-4 py-3 text-sm font-semibold transition ${
                          isActive
                            ? 'bg-[linear-gradient(90deg,var(--pn-indigo),var(--pn-violet))] text-white shadow-[0_18px_48px_rgba(124,58,237,0.22)]'
                            : 'text-[var(--pn-muted-2)] hover:bg-[var(--pn-soft)] hover:text-[var(--pn-text)]'
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <div className="hidden lg:block">
            <div className="pn-card mb-6 flex items-center justify-between px-6 py-5">
              <div>
                <p className="pn-kicker">Dashboard</p>
                <h1 className="mt-1 text-3xl font-black tracking-[-0.04em] text-[#111827]">
                  {currentLabel}
                </h1>
              </div>
              <div className="rounded-full border border-[var(--pn-soft-border)] bg-[var(--pn-soft)] px-4 py-2 text-sm font-semibold text-[var(--pn-violet)]">
                Pathnook household workspace
              </div>
            </div>
          </div>
          <div className="space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
