'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  PlusCircle, 
  FileText, 
  CreditCard, 
  Clock, 
  Layers, 
  Trash2, 
  Copy, 
  Download, 
  CheckCircle, 
  Edit3, 
  Menu,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import DashboardCard from '@/components/DashboardCard';
import { 
  getStoredResumes, 
  getStoredUser, 
  getStoredSubscription, 
  saveResume, 
  deleteResume, 
  duplicateResume, 
  setActiveResumeId 
} from '@/lib/storage';
import { calculateCompleteness, TEMPLATES_CONFIG, INITIAL_BLANK_RESUME, SAMPLE_RESUME } from '@/lib/resumeUtils';
import { downloadResumePDF } from '@/lib/pdfGenerator';

export default function DashboardPage() {
  const router = useRouter();
  const [resumes, setResumes] = useState([]);
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const [downloadingId, setDownloadingId] = useState(null);

  useEffect(() => {
    setResumes(getStoredResumes());
    setUser(getStoredUser());
    setSubscription(getStoredSubscription());
  }, []);

  const handleCreateNew = () => {
    const newResume = {
      ...INITIAL_BLANK_RESUME,
      id: `resume-${Date.now()}`,
      title: 'New Resume Draft',
      updatedAt: new Date().toISOString()
    };
    saveResume(newResume);
    setActiveResumeId(newResume.id);
    router.push('/editor');
  };

  const handleEditResume = (id) => {
    setActiveResumeId(id);
    router.push('/editor');
  };

  const handleDuplicate = (id) => {
    const duplicated = duplicateResume(id);
    if (duplicated) {
      setResumes(getStoredResumes());
    }
  };

  const handleDelete = (id, title) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      const remaining = deleteResume(id);
      setResumes(remaining || []);
    }
  };

  const handleQuickDownload = async (resumeItem) => {
    setDownloadingId(resumeItem.id);
    setActiveResumeId(resumeItem.id);
    // Open editor or trigger download
    router.push('/editor');
  };

  const lastEdited = resumes[0];

  return (
    <div className="min-h-screen flex bg-[#f8f9fc]">
      {/* Sidebar Navigation */}
      <Sidebar mobileOpen={mobileSidebar} setMobileOpen={setMobileSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Mobile Bar */}
        <header className="lg:hidden h-16 bg-white border-b border-slate-200 px-4 flex items-center justify-between sticky top-0 z-20">
          <button
            onClick={() => setMobileSidebar(true)}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-bold text-slate-900">Dashboard</span>
          <button
            onClick={handleCreateNew}
            className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg"
          >
            <PlusCircle className="w-5 h-5" />
          </button>
        </header>

        {/* Dashboard Main Area */}
        <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full space-y-8">
          
          {/* Welcome Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Welcome back, {user?.name || 'Alex'} 👋
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Manage your resumes, track ATS compatibility, and export job-ready applications.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/templates"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/90 shadow-2xs transition-all"
              >
                <Layers className="w-4 h-4 text-slate-500" />
                Browse Templates
              </Link>
              <button
                type="button"
                onClick={handleCreateNew}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 shadow-sm shadow-purple-600/30 transition-all hover:shadow-md cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                Create New Resume
              </button>
            </div>
          </div>

          {/* Metrics Overview Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <DashboardCard
              title="Total Resumes"
              value={resumes.length}
              subtitle="Saved drafts & versions"
              icon={FileText}
              color="purple"
            />
            <DashboardCard
              title="Last Edited"
              value={lastEdited ? lastEdited.title : 'None'}
              subtitle={lastEdited ? new Date(lastEdited.updatedAt).toLocaleDateString() : 'Ready to start'}
              icon={Clock}
              color="blue"
            />
            <DashboardCard
              title="Plan Status"
              value={subscription?.plan || 'Pro'}
              subtitle="Unlimited PDF & ATS Scans"
              icon={CreditCard}
              color="emerald"
            />
            <DashboardCard
              title="Average ATS Score"
              value="86%"
              trend="+14% higher than average"
              subtitle="Across verified templates"
              icon={ShieldCheck}
              color="amber"
            />
          </div>

          {/* Resumes List Section */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
            <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  My Resumes ({resumes.length})
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Pick a resume to edit, duplicate, scan for ATS compatibility, or export to PDF
                </p>
              </div>

              <Link
                href="/analysis"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-700 hover:text-purple-900"
              >
                <CheckCircle className="w-4 h-4 text-purple-600" />
                Run Batch ATS Audit &rarr;
              </Link>
            </div>

            {/* Resume Rows / Cards */}
            <div className="divide-y divide-slate-100">
              {resumes.map((item) => {
                const comp = calculateCompleteness(item);
                const template = TEMPLATES_CONFIG.find(t => t.id === item.templateId) || TEMPLATES_CONFIG[0];
                return (
                  <div 
                    key={item.id}
                    className="p-5 sm:p-6 hover:bg-slate-50/70 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                  >
                    {/* Left: Info */}
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2.5">
                          <h3 className="font-bold text-slate-900 text-sm hover:text-purple-600 transition-colors cursor-pointer" onClick={() => handleEditResume(item.id)}>
                            {item.title}
                          </h3>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                            {template.name}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">
                          Target: <strong className="text-slate-700">{item.personalInfo?.jobTitle || 'General'}</strong> • Last edited {new Date(item.updatedAt || Date.now()).toLocaleDateString()}
                        </p>
                        
                        {/* Completeness meter */}
                        <div className="flex items-center gap-2 pt-1">
                          <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${comp > 80 ? 'bg-emerald-500' : comp > 50 ? 'bg-amber-500' : 'bg-purple-600'}`}
                              style={{ width: `${comp}%` }}
                            />
                          </div>
                          <span className="text-[11px] font-medium text-slate-500">{comp}% Complete</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center flex-wrap gap-2 pt-2 lg:pt-0">
                      <button
                        type="button"
                        onClick={() => handleEditResume(item.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 shadow-2xs transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        Edit Resume
                      </button>

                      <Link
                        href={`/analysis?id=${item.id}`}
                        onClick={() => setActiveResumeId(item.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        ATS Scan
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleDuplicate(item.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                        title="Duplicate draft"
                      >
                        <Copy className="w-4 h-4" />
                      </button>

                      {resumes.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id, item.title)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete resume"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick CTA Banner for College Demo */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-900 to-indigo-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
            <div className="space-y-1 text-center md:text-left">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-purple-200 bg-purple-800/80 px-2.5 py-0.5 rounded-full">
                <Sparkles className="w-3 h-3 text-purple-300" />
                Recruiter Screening Insights
              </span>
              <h3 className="text-lg font-bold">
                Does your resume match your dream job description?
              </h3>
              <p className="text-xs text-purple-200 max-w-xl">
                Paste any job vacancy from LinkedIn or Indeed to calculate keyword overlap, formatting score, and missing technical skills.
              </p>
            </div>

            <Link
              href="/analysis"
              className="px-5 py-2.5 rounded-xl font-semibold text-xs text-purple-900 bg-white hover:bg-purple-50 shadow-sm transition-all whitespace-nowrap"
            >
              Analyze Resume Now &rarr;
            </Link>
          </div>

        </main>
      </div>
    </div>
  );
}
