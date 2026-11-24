import React from 'react';

export default function AnalysisCard({ title, score, description, status = 'good', icon: Icon }) {
  const statusColors = {
    excellent: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    good: 'text-blue-600 bg-blue-50 border-blue-200',
    warning: 'text-amber-600 bg-amber-50 border-amber-200',
    danger: 'text-rose-600 bg-rose-50 border-rose-200',
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </span>
        {Icon && (
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2 mb-1.5">
        <span className="text-3xl font-extrabold tracking-tight text-slate-900">
          {score}
        </span>
        {typeof score === 'number' && <span className="text-xs text-slate-400 font-medium">/ 100</span>}
      </div>

      {description && (
        <p className="text-xs text-slate-500 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
