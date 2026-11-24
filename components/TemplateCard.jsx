import React from 'react';
import Link from 'next/link';
import { Lock, Check, Sparkles, ArrowRight, Eye } from 'lucide-react';

export default function TemplateCard({ 
  template, 
  isActive = false, 
  onSelect, 
  onPreview,
  userSubscription = 'Pro' 
}) {
  const isLocked = template.isPremium && userSubscription === 'Free';

  return (
    <div className={`group relative bg-white rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col ${
      isActive 
        ? 'border-purple-600 ring-2 ring-purple-600/20 shadow-md' 
        : 'border-slate-200/90 hover:border-slate-300 hover:shadow-md'
    }`}>
      {/* Visual mockup representation */}
      <div className="relative h-64 bg-slate-100 p-4 overflow-hidden border-b border-slate-100 flex items-center justify-center">
        
        {/* Abstract mini resume mockup styled to match template */}
        <div className="w-44 h-56 bg-white rounded shadow-sm p-3 text-[5px] space-y-1.5 transition-transform duration-300 group-hover:scale-105 border border-slate-200/60 overflow-hidden pointer-events-none select-none">
          {/* Mockup header */}
          <div className={`pb-1 border-b ${template.id === 'technical-dev' ? 'border-blue-500' : 'border-slate-200'}`}>
            <div className="w-16 h-1.5 rounded-xs" style={{ backgroundColor: template.color }}></div>
            <div className="w-24 h-1 bg-slate-300 rounded-xs mt-1"></div>
          </div>
          {/* Mockup body */}
          <div className="space-y-1 pt-0.5">
            <div className="w-10 h-1 bg-slate-400 rounded-xs"></div>
            <div className="w-full h-0.5 bg-slate-200 rounded-xs"></div>
            <div className="w-5/6 h-0.5 bg-slate-200 rounded-xs"></div>
          </div>
          <div className="space-y-1 pt-1">
            <div className="w-12 h-1 bg-slate-400 rounded-xs"></div>
            <div className="w-full h-0.5 bg-slate-200 rounded-xs"></div>
            <div className="w-4/5 h-0.5 bg-slate-200 rounded-xs"></div>
          </div>
          <div className="space-y-1 pt-1">
            <div className="w-14 h-1 bg-slate-400 rounded-xs"></div>
            <div className="flex gap-1">
              <div className="w-6 h-1.5 rounded-xs bg-slate-200"></div>
              <div className="w-8 h-1.5 rounded-xs bg-slate-200"></div>
              <div className="w-5 h-1.5 rounded-xs bg-slate-200"></div>
            </div>
          </div>
        </div>

        {/* Badges on top */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-slate-800 border border-slate-200 shadow-2xs">
            {template.badge}
          </span>
          {template.isPremium ? (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
              {isLocked && <Lock className="w-2.5 h-2.5" />}
              Premium
            </span>
          ) : (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              Free
            </span>
          )}
        </div>

        {/* Quick action overlay on hover */}
        <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-2xs">
          <button
            type="button"
            onClick={() => onPreview && onPreview(template)}
            className="px-3 py-1.5 rounded-lg bg-white text-slate-800 text-xs font-semibold shadow-md hover:bg-slate-50 flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            Quick Preview
          </button>
        </div>
      </div>

      {/* Info & action footer */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-bold text-slate-900 text-sm">
              {template.name}
            </h3>
            <span className="text-[11px] text-slate-400">{template.category}</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-4">
            {template.description}
          </p>
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          {isLocked ? (
            <Link
              href="/subscription"
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition-colors"
            >
              <Lock className="w-3.5 h-3.5 text-amber-600" />
              Upgrade to Unlock
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => onSelect && onSelect(template.id)}
              className={`w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-purple-50 text-purple-700 border border-purple-200'
                  : 'bg-purple-600 hover:bg-purple-700 text-white shadow-2xs hover:shadow-xs'
              }`}
            >
              {isActive ? (
                <>
                  <Check className="w-3.5 h-3.5 text-purple-700" />
                  Active Template
                </>
              ) : (
                <>
                  <span>Use Template</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
