'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  ArrowLeft, 
  Save, 
  Download, 
  Printer, 
  Sparkles, 
  Layers, 
  Palette, 
  Check, 
  Eye, 
  Edit3, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  CheckCircle2,
  Cpu,
  CheckCircle
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import ResumeEditor from '@/components/ResumeEditor';
import ResumePreview from '@/components/ResumePreview';
import { 
  getStoredResumes, 
  saveResume, 
  getResumeById, 
  getActiveResumeId, 
  setActiveResumeId 
} from '@/lib/storage';
import { SAMPLE_RESUME, INITIAL_BLANK_RESUME, TEMPLATES_CONFIG, calculateCompleteness } from '@/lib/resumeUtils';
import { downloadResumePDF } from '@/lib/pdfGenerator';

export default function EditorPage() {
  const [resume, setResume] = useState(SAMPLE_RESUME);
  const [scale, setScale] = useState(0.85);
  const [mobileView, setMobileView] = useState('editor'); // 'editor' | 'preview'
  const [saveStatus, setSaveStatus] = useState('All changes saved');
  const [isDownloading, setIsDownloading] = useState(false);
  const [isTemplateMenuOpen, setIsTemplateMenuOpen] = useState(false);

  // Initialize resume from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const activeId = getActiveResumeId();
      const loaded = getResumeById(activeId);
      if (loaded) {
        setResume(loaded);
      }
      
      // Auto adjust scale based on screen width
      if (window.innerWidth < 1024) {
        setScale(0.65);
      } else if (window.innerWidth < 1400) {
        setScale(0.8);
      } else {
        setScale(0.9);
      }
    }
  }, []);

  // Update resume state and debounce save
  const handleResumeChange = (updated) => {
    setResume(updated);
    setSaveStatus('Saving...');
    saveResume(updated);
    setTimeout(() => {
      setSaveStatus('All changes saved');
    }, 400);
  };

  const handleSelectTemplate = (templateId) => {
    const updated = { ...resume, templateId };
    handleResumeChange(updated);
    setIsTemplateMenuOpen(false);
  };

  const handleSelectColor = (color) => {
    const updated = { ...resume, accentColor: color };
    handleResumeChange(updated);
  };

  const handleLoadSample = () => {
    if (confirm('Load demo profile data? This will overwrite your current draft.')) {
      handleResumeChange({
        ...SAMPLE_RESUME,
        id: resume.id || `resume-${Date.now()}`
      });
    }
  };

  const handleClearResume = () => {
    if (confirm('Reset resume to a blank draft?')) {
      handleResumeChange({
        ...INITIAL_BLANK_RESUME,
        id: resume.id || `resume-${Date.now()}`
      });
    }
  };

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    const filename = `${(resume.personalInfo?.fullName || 'Resume').replace(/\s+/g, '_')}_CV.pdf`;
    await downloadResumePDF('resume-preview-container', filename);
    setIsDownloading(false);
  };

  const completeness = calculateCompleteness(resume);

  const accentColors = [
    { label: 'Purple', hex: '#7c3aed' },
    { label: 'Blue', hex: '#2563eb' },
    { label: 'Teal', hex: '#0d9488' },
    { label: 'Navy', hex: '#1e3a8a' },
    { label: 'Dark', hex: '#18181b' },
    { label: 'Rose', hex: '#e11d48' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fc]">
      {/* Top Main Navigation */}
      <Navbar />

      {/* Editor Sub-Header Toolbar */}
      <div className="bg-white border-b border-slate-200/90 sticky top-16 z-40 px-4 sm:px-6 py-2.5 shadow-2xs">
        <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          
          {/* Left: Back + Resume Title + Save indicator */}
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Return to Dashboard"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>

            <div className="flex flex-col">
              <input
                type="text"
                value={resume.title || 'Untitled Resume'}
                onChange={(e) => handleResumeChange({ ...resume, title: e.target.value })}
                className="text-sm font-bold text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-purple-600 focus:outline-none transition-colors px-1 py-0.5 rounded"
                placeholder="Resume Title"
              />
              <div className="flex items-center gap-2 text-[11px] text-slate-500 px-1">
                <span className="flex items-center gap-1 text-emerald-600">
                  <CheckCircle2 className="w-3 h-3" />
                  {saveStatus}
                </span>
                <span>•</span>
                <span>Completeness: <strong className="text-purple-700">{completeness}%</strong></span>
              </div>
            </div>
          </div>

          {/* Middle: Template Picker & Accent Color & Utility Links */}
          <div className="flex items-center flex-wrap gap-2">
            
            {/* Template Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsTemplateMenuOpen(!isTemplateMenuOpen)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200/80 text-slate-800 border border-slate-200 transition-colors"
              >
                <Layers className="w-3.5 h-3.5 text-purple-600" />
                <span>Template:</span>
                <span className="text-purple-700">
                  {TEMPLATES_CONFIG.find(t => t.id === resume.templateId)?.name || 'Modern'}
                </span>
              </button>

              {isTemplateMenuOpen && (
                <div className="absolute left-0 mt-1 w-64 rounded-xl bg-white shadow-xl border border-slate-200 p-2 z-50 space-y-1">
                  <div className="px-2 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Select Resume Design
                  </div>
                  {TEMPLATES_CONFIG.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => handleSelectTemplate(t.id)}
                      className={`w-full text-left px-2.5 py-2 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                        resume.templateId === t.id
                          ? 'bg-purple-50 text-purple-700 font-bold'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div>
                        <p>{t.name}</p>
                        <p className="text-[10px] text-slate-400 font-normal">{t.badge}</p>
                      </div>
                      {resume.templateId === t.id && <Check className="w-4 h-4 text-purple-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Accent Color picker */}
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-50 border border-slate-200">
              <Palette className="w-3.5 h-3.5 text-slate-500" />
              <div className="flex items-center gap-1">
                {accentColors.map((c) => (
                  <button
                    key={c.hex}
                    type="button"
                    onClick={() => handleSelectColor(c.hex)}
                    style={{ backgroundColor: c.hex }}
                    className={`w-4 h-4 rounded-full transition-transform ${
                      resume.accentColor === c.hex ? 'scale-125 ring-2 ring-purple-600 ring-offset-1' : 'hover:scale-110'
                    }`}
                    title={c.label}
                  />
                ))}
              </div>
            </div>

            {/* Quick Demo & Clear draft buttons */}
            <button
              type="button"
              onClick={handleLoadSample}
              className="text-xs font-medium text-purple-700 hover:text-purple-900 px-2.5 py-1.5 rounded-lg hover:bg-purple-50 transition-colors"
            >
              Load Sample
            </button>
            <button
              type="button"
              onClick={handleClearResume}
              className="text-xs font-medium text-slate-500 hover:text-rose-600 px-2.5 py-1.5 rounded-lg hover:bg-rose-50 transition-colors"
            >
              Reset Blank
            </button>

            {/* Direct Link to ATS Scanner for this resume */}
            <Link
              href="/analysis"
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
            >
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              ATS Score
            </Link>
          </div>

          {/* Right: Zoom controls, Mobile toggle, PDF & Print Actions */}
          <div className="flex items-center justify-between sm:justify-end gap-2">
            
            {/* Mobile View Toggle */}
            <div className="flex lg:hidden bg-slate-100 p-0.5 rounded-lg text-xs">
              <button
                type="button"
                onClick={() => setMobileView('editor')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-medium transition-colors ${
                  mobileView === 'editor' ? 'bg-white text-purple-700 shadow-2xs font-bold' : 'text-slate-600'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                Edit
              </button>
              <button
                type="button"
                onClick={() => setMobileView('preview')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-medium transition-colors ${
                  mobileView === 'preview' ? 'bg-white text-purple-700 shadow-2xs font-bold' : 'text-slate-600'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                Preview
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="hidden xl:flex items-center gap-1 bg-slate-100 px-1.5 py-1 rounded-lg text-xs text-slate-600">
              <button
                type="button"
                onClick={() => setScale(Math.max(0.4, scale - 0.05))}
                className="p-1 hover:text-slate-900 rounded"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-[11px] px-1">{Math.round(scale * 100)}%</span>
              <button
                type="button"
                onClick={() => setScale(Math.min(1.2, scale + 0.05))}
                className="p-1 hover:text-slate-900 rounded"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setScale(0.85)}
                className="p-1 hover:text-slate-900 rounded ml-1 border-l border-slate-300"
                title="Reset Zoom"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>

            {/* Print button */}
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300/80 transition-colors"
              title="Open Browser Print Dialog"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>

            {/* Download PDF button */}
            <button
              type="button"
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 shadow-sm shadow-purple-600/30 transition-all hover:shadow-md disabled:opacity-70 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isDownloading ? 'Generating PDF...' : 'Download PDF'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Two-Column Work Area */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-140px)] min-h-[700px]">
          
          {/* Left Column: Form Editor (5 cols on lg) */}
          <div className={`lg:col-span-5 h-full ${mobileView === 'preview' ? 'hidden lg:block' : 'block'}`}>
            <ResumeEditor 
              resume={resume} 
              onChange={handleResumeChange} 
            />
          </div>

          {/* Right Column: Live Sticky/Scrollable Preview (7 cols on lg) */}
          <div className={`lg:col-span-7 h-full overflow-y-auto bg-slate-200/60 rounded-2xl border border-slate-300/80 p-4 sm:p-6 flex justify-center items-start ${
            mobileView === 'editor' ? 'hidden lg:flex' : 'flex'
          }`}>
            <ResumePreview 
              resume={resume} 
              scale={scale} 
            />
          </div>

        </div>
      </main>
    </div>
  );
}
