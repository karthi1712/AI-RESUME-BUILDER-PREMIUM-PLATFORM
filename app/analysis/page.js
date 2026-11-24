'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  CheckCircle, 
  AlertCircle, 
  Sparkles, 
  Search, 
  FileText, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle,
  Lightbulb,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  RefreshCw
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnalysisCard from '@/components/AnalysisCard';
import { getStoredResumes, getActiveResumeId } from '@/lib/storage';
import { SAMPLE_RESUME, SAMPLE_JOB_DESCRIPTIONS } from '@/lib/resumeUtils';
import { analyzeResumeATS } from '@/lib/atsAnalyzer';

export default function ATSAnalysisPage() {
  const [resumes, setResumes] = useState([SAMPLE_RESUME]);
  const [selectedResumeId, setSelectedResumeId] = useState('');
  const [targetRole, setTargetRole] = useState('Senior Full-Stack Engineer');
  const [jobDescription, setJobDescription] = useState(SAMPLE_JOB_DESCRIPTIONS[0].text);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  useEffect(() => {
    const list = getStoredResumes();
    setResumes(list);
    const activeId = getActiveResumeId() || list[0]?.id;
    setSelectedResumeId(activeId);

    // Initial analysis
    const currentResume = list.find(r => r.id === activeId) || list[0] || SAMPLE_RESUME;
    const initialReport = analyzeResumeATS(currentResume, 'Senior Full-Stack Engineer', SAMPLE_JOB_DESCRIPTIONS[0].text);
    setAnalysisResult(initialReport);
  }, []);

  const handleRunAnalysis = () => {
    const currentResume = resumes.find(r => r.id === selectedResumeId) || resumes[0];
    setIsAnalyzing(true);

    setTimeout(() => {
      const report = analyzeResumeATS(currentResume, targetRole, jobDescription);
      setAnalysisResult(report);
      setIsAnalyzing(false);
    }, 500);
  };

  const handleApplySampleJD = (sample) => {
    setTargetRole(sample.role);
    setJobDescription(sample.text);
  };

  const currentResume = resumes.find(r => r.id === selectedResumeId) || resumes[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fc]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 w-full space-y-8">
        
        {/* Header */}
        <div className="pb-4 border-b border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>ATS Parser & Keyword Scanner</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Resume ATS Analysis & Score
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Compare your resume against real job requirements to guarantee maximum recruiter visibility.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/editor"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 shadow-2xs transition-colors"
            >
              <FileText className="w-4 h-4" />
              Open In Editor
            </Link>
          </div>
        </div>

        {/* Input Form Box: Select Resume + Target Role + Job Description */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Select Resume To Evaluate
              </label>
              <select
                value={selectedResumeId}
                onChange={(e) => setSelectedResumeId(e.target.value)}
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 bg-white font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                {resumes.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.title} ({r.personalInfo?.fullName || 'Untitled'})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Target Job Position
              </label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Senior Full-Stack Engineer"
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
          </div>

          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Paste Job Description / Vacancy
              </label>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <span>Quick Fill Samples:</span>
                {SAMPLE_JOB_DESCRIPTIONS.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleApplySampleJD(s)}
                    className="font-medium text-purple-600 hover:text-purple-800 underline px-1 text-[11px]"
                  >
                    {s.role.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              rows={4}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job requirements, responsibilities, and required qualifications from LinkedIn, Indeed, or company careers page..."
              className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-600 leading-relaxed font-sans"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={handleRunAnalysis}
              disabled={isAnalyzing}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 shadow-sm shadow-purple-600/30 transition-all hover:shadow-md cursor-pointer disabled:opacity-60"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Scanning Resume & Keywords...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Run Full ATS Audit</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Dashboard */}
        {analysisResult && (
          <div className="space-y-6">
            
            {/* Top Score Banner */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              
              <div className="flex items-center gap-5">
                {/* Circular Score Indicator */}
                <div className="relative w-24 h-24 flex items-center justify-center rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 text-purple-700 shadow-inner">
                  <div className="text-center">
                    <span className="text-3xl font-extrabold tracking-tight">
                      {analysisResult.overallScore}
                    </span>
                    <span className="block text-[10px] uppercase font-bold text-slate-400">/ 100</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-slate-900">
                      Overall ATS Match Score
                    </h2>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      analysisResult.overallScore >= 80 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {analysisResult.overallScore >= 80 ? 'Highly Competitive' : 'Moderate Match'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 max-w-xl">
                    Evaluated against <strong className="text-slate-700">{analysisResult.targetRole}</strong> requirements. This score reflects ATS parsing readability, keyword alignment, quantified results, and completeness.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <Link
                  href="/editor"
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-center text-white bg-purple-600 hover:bg-purple-700 shadow-2xs"
                >
                  Edit Resume to Improve Score
                </Link>
                <Link
                  href="/skills"
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-center text-slate-700 bg-slate-100 hover:bg-slate-200"
                >
                  View Skills Gap &rarr;
                </Link>
              </div>

            </div>

            {/* Sub-scores 4 grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <AnalysisCard
                title="Keyword Overlap"
                score={analysisResult.breakdown.keywords}
                description="Presence of core technical competencies matching the job description."
                icon={Search}
              />
              <AnalysisCard
                title="Section Completeness"
                score={analysisResult.breakdown.completeness}
                description="All mandatory ATS resume sections populated without omission."
                icon={CheckCircle2}
              />
              <AnalysisCard
                title="Impact & Metrics"
                score={analysisResult.breakdown.content}
                description="Use of strong action verbs and quantified business percentages."
                icon={TrendingUp}
              />
              <AnalysisCard
                title="Format & Layout"
                score={analysisResult.breakdown.format}
                description="Clean typography, link presence, and absence of length penalties."
                icon={Layers}
              />
            </div>

            {/* Keyword Match Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Matched Keywords */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Matched Target Keywords ({analysisResult.matchedKeywords.length})
                    </h3>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-600">Passed</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {analysisResult.matchedKeywords.map((kw, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {kw}
                    </span>
                  ))}
                  {analysisResult.matchedKeywords.length === 0 && (
                    <p className="text-xs text-slate-400 italic">No exact target keywords detected yet.</p>
                  )}
                </div>
              </div>

              {/* Missing Keywords */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Potentially Missing Keywords ({analysisResult.missingKeywords.length})
                    </h3>
                  </div>
                  <span className="text-[11px] font-semibold text-amber-600">Consider Adding</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {analysisResult.missingKeywords.map((kw, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200"
                    >
                      + {kw}
                    </span>
                  ))}
                  {analysisResult.missingKeywords.length === 0 && (
                    <p className="text-xs text-emerald-600 font-medium">All prominent job keywords are represented!</p>
                  )}
                </div>
              </div>

            </div>

            {/* Section Health Checklist & Recommendations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Section Health */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2 pb-2 border-b border-slate-100">
                  ATS Section Health Audit
                </h3>
                <div className="space-y-2.5">
                  {analysisResult.sectionHealth.map((sec, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50/70 border border-slate-100">
                      {sec.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      )}
                      <div className="text-xs">
                        <div className="font-bold text-slate-900">{sec.name}</div>
                        <div className="text-slate-500 text-[11px]">{sec.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actionable Recommendations */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2 pb-2 border-b border-slate-100 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  Prioritized Action Items for Score Boost
                </h3>

                <div className="space-y-3">
                  {analysisResult.improvements.map((imp, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-purple-50/60 border border-purple-100 text-xs text-purple-900 flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-purple-200 text-purple-800 font-bold flex items-center justify-center shrink-0 text-[10px]">
                        {idx + 1}
                      </span>
                      <p className="leading-relaxed">{imp}</p>
                    </div>
                  ))}

                  {analysisResult.formattingAlerts.map((alert, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <p className="leading-relaxed">{alert}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <Link
                    href="/editor"
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 shadow-2xs"
                  >
                    <span>Implement Recommendations in Editor</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

            </div>

            {/* Disclaimer footer */}
            <div className="p-4 rounded-xl bg-slate-100/80 border border-slate-200 text-[11px] text-slate-500 text-center">
              Important: This scanner utilizes rule-based ATS evaluation heuristics modelled on modern Applicant Tracking Systems. It provides guidance on formatting, keyword density, and completeness, but does not guarantee employment offers.
            </div>

          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
