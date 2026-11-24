'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  PlusCircle, 
  Layers, 
  CheckCircle, 
  Cpu, 
  CreditCard, 
  Settings, 
  LogOut, 
  Sparkles,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { getStoredUser, logoutUser, getStoredSubscription } from '@/lib/storage';

export default function Sidebar({ mobileOpen = false, setMobileOpen = () => {} }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    setUser(getStoredUser());
    setSubscription(getStoredSubscription());
  }, []);

  const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Create Resume', href: '/editor', icon: PlusCircle, highlight: true },
    { label: 'Templates', href: '/templates', icon: Layers },
    { label: 'ATS Analysis', href: '/analysis', icon: CheckCircle },
    { label: 'Skills Analysis', href: '/skills', icon: Cpu },
    { label: 'Subscription', href: '/subscription', icon: CreditCard, badge: subscription?.plan || 'Pro' },
    { label: 'Settings', href: '/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logoutUser();
    router.push('/login');
  };

  const content = (
    <div className="flex flex-col h-full bg-white border-r border-slate-200/90 text-slate-800">
      {/* Brand */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-sm shadow-purple-600/30">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            Resume<span className="text-purple-600">AI</span>
          </span>
        </Link>
        <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
          PRO
        </span>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Menu
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-purple-600 text-white shadow-sm shadow-purple-600/20 font-semibold'
                  : item.highlight
                  ? 'text-purple-600 hover:bg-purple-50/80 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight ? 'text-purple-600' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && !isActive && (
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-purple-100 text-purple-700">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* User profile & Logout */}
      <div className="p-3 border-t border-slate-100">
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 mb-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
              {user?.name ? user.name.charAt(0) : 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">
                {user?.name || 'Alex Morgan'}
              </p>
              <p className="text-xs text-slate-500 truncate">
                {user?.email || 'alex.morgan@example.com'}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-between px-3.5 py-2 rounded-lg text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop fixed sidebar */}
      <aside className="hidden lg:block w-64 h-screen sticky top-0 shrink-0 z-30">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" 
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-72 max-w-xs h-full bg-white shadow-xl z-10">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
