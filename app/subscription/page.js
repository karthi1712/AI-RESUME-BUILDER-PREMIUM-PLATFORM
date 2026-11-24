'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Check, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Crown, 
  ArrowRight, 
  HelpCircle,
  CreditCard,
  CheckCircle2
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getStoredSubscription, setStoredSubscription } from '@/lib/storage';

export default function SubscriptionPage() {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'yearly'
  const [currentSub, setCurrentSub] = useState({ plan: 'Pro', billing: 'Monthly', status: 'Active' });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    setCurrentSub(getStoredSubscription());
  }, []);

  const handleSelectPlan = (planName) => {
    const newSub = {
      plan: planName,
      billing: billingCycle === 'monthly' ? 'Monthly' : 'Yearly',
      status: 'Active',
      renewDate: 'Nov 24, 2027'
    };
    setStoredSubscription(newSub);
    setCurrentSub(newSub);
    setSuccessMessage(`Plan updated to ${planName} successfully!`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const plans = [
    {
      name: 'Free',
      tagline: 'Ideal for students writing their very first resume',
      monthlyPrice: 0,
      yearlyPrice: 0,
      badge: 'Starter',
      popular: false,
      features: [
        'Basic resume editor',
        '2 Free standard templates (Modern & Minimal)',
        'Standard PDF export',
        'Single saved resume draft',
        'Basic ATS formatting checks',
      ],
      notIncluded: [
        'Executive & Creative templates',
        'Advanced ATS keyword gap scan',
        'In-depth skills gap analysis & learning paths',
        'AI bullet point optimizer',
      ]
    },
    {
      name: 'Pro',
      tagline: 'Best for active job seekers targeting tech & corporate roles',
      monthlyPrice: 12,
      yearlyPrice: 99,
      badge: 'Most Popular',
      popular: true,
      features: [
        'All 6 professional & ATS resume templates',
        'Unlimited resume drafts & versions',
        'Comprehensive ATS score & keyword match scanner',
        'Deep skills analysis & target role benchmarking',
        'Targeted learning resource recommendations',
        'High-resolution vector PDF & print export',
        'AI smart bullet enhancer & summary polisher',
      ],
      notIncluded: [
        'Dedicated 1-on-1 human executive CV review',
      ]
    },
    {
      name: 'Premium',
      tagline: 'For senior leaders, executives, and high-frequency applicants',
      monthlyPrice: 24,
      yearlyPrice: 199,
      badge: 'Executive',
      popular: false,
      features: [
        'Everything in Pro tier',
        'Priority ATS scoring algorithm tuning',
        'Executive & C-suite tailored styling options',
        'Multi-role resume variant management',
        'Unlimited AI content expansions',
        'Early access to next-gen templates & features',
        'Priority support & verified ATS certification badge',
      ],
      notIncluded: []
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fc]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
            <Crown className="w-3.5 h-3.5 text-purple-600" />
            <span>Simple, Transparent Pricing</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Invest in Your Career Acceleration
          </h1>
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
            Upgrade your plan to unlock full ATS analysis, premium templates, and deep skills gap benchmarks. Cancel or switch at any time.
          </p>

          {/* Billing switcher */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <div className="bg-slate-200/70 p-1 rounded-xl flex items-center text-xs font-semibold">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  billingCycle === 'monthly' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Monthly Billing
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('yearly')}
                className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                  billingCycle === 'yearly' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>Annual Billing</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                  Save 30%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Success toast */}
        {successMessage && (
          <div className="max-w-md mx-auto p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 text-center flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Current Active Plan Badge */}
        <div className="max-w-xl mx-auto p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Current Active Membership</p>
              <p className="text-sm font-bold text-slate-900">
                {currentSub.plan} Tier ({currentSub.status})
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            Active
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((p) => {
            const isCurrent = currentSub.plan === p.name;
            const price = billingCycle === 'monthly' ? p.monthlyPrice : Math.round(p.yearlyPrice / 12);
            return (
              <div
                key={p.name}
                className={`bg-white rounded-3xl p-7 border transition-all flex flex-col justify-between relative ${
                  p.popular
                    ? 'border-purple-600 ring-2 ring-purple-600/20 shadow-xl'
                    : 'border-slate-200/90 hover:border-slate-300 shadow-xs'
                }`}
              >
                {p.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-purple-600 text-white text-[11px] font-bold uppercase tracking-wider shadow-sm">
                    {p.badge}
                  </div>
                )}

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold text-slate-900">{p.name}</h3>
                    {!p.popular && (
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed min-h-8 mb-6">
                    {p.tagline}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-slate-100">
                    <span className="text-4xl font-black text-slate-900 tracking-tight">
                      ${price}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">/ month</span>
                    {billingCycle === 'yearly' && p.yearlyPrice > 0 && (
                      <span className="text-[10px] text-slate-400 block ml-2">
                        (${p.yearlyPrice}/yr billed annually)
                      </span>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Included Features:
                    </span>
                    {p.features.map((f, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                    {p.notIncluded.map((f, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-400 line-through">
                        <span className="w-4 h-4 text-center shrink-0">•</span>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => handleSelectPlan(p.name)}
                    disabled={isCurrent}
                    className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      isCurrent
                        ? 'bg-slate-100 text-slate-500 cursor-default'
                        : p.popular
                        ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-600/30'
                        : 'bg-slate-900 hover:bg-black text-white'
                    }`}
                  >
                    {isCurrent ? (
                      <span>Current Plan</span>
                    ) : (
                      <>
                        <span>Switch to {p.name}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs p-6 sm:p-8 overflow-x-auto">
          <h3 className="text-base font-bold text-slate-900 mb-6 text-center">
            Comprehensive Plan Comparison Matrix
          </h3>
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="pb-3">Capability</th>
                <th className="pb-3 text-center">Free</th>
                <th className="pb-3 text-center text-purple-700 font-bold">Pro</th>
                <th className="pb-3 text-center">Premium</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-3 font-medium">Templates Included</td>
                <td className="py-3 text-center">2 Templates</td>
                <td className="py-3 text-center font-semibold text-purple-700">All 6 Templates</td>
                <td className="py-3 text-center font-semibold">All 6 + VIP Styles</td>
              </tr>
              <tr>
                <td className="py-3 font-medium">ATS Keyword Gap Scanner</td>
                <td className="py-3 text-center">Basic</td>
                <td className="py-3 text-center font-semibold text-purple-700">Unlimited Full Audits</td>
                <td className="py-3 text-center font-semibold">Priority Parsing</td>
              </tr>
              <tr>
                <td className="py-3 font-medium">Skills Gap Benchmark & Paths</td>
                <td className="py-3 text-center">—</td>
                <td className="py-3 text-center font-semibold text-purple-700">Full Access</td>
                <td className="py-3 text-center font-semibold">Full Access + Custom</td>
              </tr>
              <tr>
                <td className="py-3 font-medium">PDF Vector Export</td>
                <td className="py-3 text-center">Standard</td>
                <td className="py-3 text-center font-semibold text-purple-700">Retina Crisp</td>
                <td className="py-3 text-center font-semibold">Retina Crisp</td>
              </tr>
              <tr>
                <td className="py-3 font-medium">Saved Resume Drafts</td>
                <td className="py-3 text-center">1 Draft</td>
                <td className="py-3 text-center font-semibold text-purple-700">Unlimited</td>
                <td className="py-3 text-center font-semibold">Unlimited</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Demo Disclaimer */}
        <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-100 text-center text-xs text-purple-900">
          Demo Prototype Notice: Payments are simulated for presentation purposes. Clicking &quot;Switch to Plan&quot; instantly updates your local state without real credit card transactions.
        </div>

      </main>

      <Footer />
    </div>
  );
}
