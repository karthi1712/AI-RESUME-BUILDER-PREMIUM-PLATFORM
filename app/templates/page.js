'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Sparkles, 
  Layers, 
  Check, 
  Lock, 
  ArrowRight, 
  Eye, 
  X, 
  ArrowLeft,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TemplateCard from '@/components/TemplateCard';
import ResumePreview from '@/components/ResumePreview';
import { TEMPLATES_CONFIG, SAMPLE_RESUME } from '@/lib/resumeUtils';
import { 
  getStoredResumes, 
  saveResume, 
  getActiveResumeId, 
  getResumeById, 
  getStoredSubscription 
} from '@/lib/storage';

export default function TemplatesPage() {
  const router = useRouter();
  const [filter, setFilter] = useState('all');
  const [activeResume, setActiveResume] = useState(SAMPLE_RESUME);
  const [subscription, setSubscription] = useState({ plan: 'Pro' });
  const [previewTemplate, setPreviewTemplate] = useState(null);

  useEffect(() => {
    const activeId = getActiveResumeId();
    const loaded = getResumeById(activeId);
    if (loaded) setActiveResume(loaded);
    setSubscription(getStoredSubscription());
  }, []);

  const handleSelectTemplate = (templateId) => {
    const updated = {
      ...activeResume,
      templateId: templateId
    };
    saveResume(updated);
    router.push('/editor');
  };

  const filteredTemplates = TEMPLATES_CONFIG.filter((t) => {
    if (filter === 'free') return !t.isPremium;
    if (filter === 'premium') return t.isPremium;
    if (filter === 'ats') return t.id === 'classic-ats' || t.id === 'modern-professional';
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfbfd]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
            <Layers className="w-3.5 h-3.5 text-purple-600" />
            <span>6 ATS-Approved Layouts</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Professional Resume Templates
          </h1>
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
            Switch between modern, technical, executive, and minimal templates instantly. Your resume content and data are preserved seamlessly.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {[
            { id: 'all', label: 'All Templates' },
            { id: 'free', label: 'Free Templates' },
            { id: 'premium', label: 'Pro & Executive' },
            { id: 'ats', label: 'High ATS Parsers' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                filter === tab.id
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              isActive={activeResume.templateId === template.id}
              onSelect={handleSelectTemplate}
              onPreview={(t) => setPreviewTemplate(t)}
              userSubscription={subscription?.plan || 'Pro'}
            />
          ))}
        </div>

        {/* ATS Guarantee Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                100% Applicant Tracking System (ATS) Friendly Architecture
              </h3>
              <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
                All templates follow standardized section titles, clean single or structured column flows, and accessible font hierarchies tested against standard enterprise ATS parsers.
              </p>
            </div>
          </div>
          <Link
            href="/editor"
            className="px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-purple-600 hover:bg-purple-700 shadow-2xs transition-colors whitespace-nowrap"
          >
            Launch in Editor &rarr;
          </Link>
        </div>

      </main>

      {/* Full Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <span>{previewTemplate.name} Template Preview</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                    {previewTemplate.badge}
                  </span>
                </h3>
                <p className="text-xs text-slate-500">{previewTemplate.description}</p>
              </div>
              <button
                type="button"
                onClick={() => setPreviewTemplate(null)}
                className="p-1.5 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Preview Body */}
            <div className="flex-1 overflow-y-auto p-6 bg-slate-100 flex justify-center">
              <div className="origin-top" style={{ transform: 'scale(0.75)' }}>
                <ResumePreview 
                  resume={{ ...activeResume, templateId: previewTemplate.id }} 
                  scale={1} 
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 bg-white flex items-center justify-between">
              <button
                type="button"
                onClick={() => setPreviewTemplate(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Close Preview
              </button>
              <button
                type="button"
                onClick={() => handleSelectTemplate(previewTemplate.id)}
                className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 shadow-sm flex items-center gap-1.5"
              >
                <span>Apply & Open Editor</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
