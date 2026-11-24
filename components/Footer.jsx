import React from 'react';
import Link from 'next/link';
import { Sparkles, Github, Twitter, Linkedin, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-md shadow-purple-600/20">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Resume<span className="text-purple-600">AI</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
              Premium AI-powered resume builder designed to help students, recent graduates, and senior professionals craft ATS-optimized resumes that land high-tier interviews.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                ATS Engine v2.4 Active
              </span>
            </div>
          </div>

          {/* Col 1 */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 tracking-wider uppercase mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/editor" className="hover:text-purple-600 transition-colors">Resume Builder</Link></li>
              <li><Link href="/templates" className="hover:text-purple-600 transition-colors">Resume Templates</Link></li>
              <li><Link href="/analysis" className="hover:text-purple-600 transition-colors">ATS Scanner</Link></li>
              <li><Link href="/skills" className="hover:text-purple-600 transition-colors">Skills Analysis</Link></li>
              <li><Link href="/subscription" className="hover:text-purple-600 transition-colors">Pricing & Plans</Link></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 tracking-wider uppercase mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/analysis" className="hover:text-purple-600 transition-colors">ATS Optimization Guide</Link></li>
              <li><Link href="/templates" className="hover:text-purple-600 transition-colors">Software Engineer CV</Link></li>
              <li><Link href="/templates" className="hover:text-purple-600 transition-colors">Product Manager CV</Link></li>
              <li><Link href="/subscription" className="hover:text-purple-600 transition-colors">Student Discounts</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 tracking-wider uppercase mb-3">Legal & Company</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/settings" className="hover:text-purple-600 transition-colors">Account Settings</Link></li>
              <li><span className="text-slate-400 cursor-not-allowed">Privacy Policy</span></li>
              <li><span className="text-slate-400 cursor-not-allowed">Terms of Service</span></li>
              <li><span className="text-slate-400 cursor-not-allowed">Security Protocol</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-12 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ResumeAI Platform. Crafted for academic and professional excellence.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Next.js App Router</span>
            <span>•</span>
            <span>Tailwind CSS</span>
            <span>•</span>
            <span>ATS Engine</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
