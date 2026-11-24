'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  ExternalLink, 
  ArrowRight, 
  Clock, 
  BarChart2, 
  Code2, 
  Database, 
  Wrench, 
  Users,
  Search
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getStoredResumes, getActiveResumeId } from '@/lib/storage';
import { SAMPLE_RESUME, SAMPLE_JOB_DESCRIPTIONS } from '@/lib/resumeUtils';
import { analyzeResumeSkills } from '@/lib/skillsAnalyzer';

export default function SkillsAnalysisPage() {
  const [resumes, setResumes] = useState([SAMPLE_RESUME]);
  const [selectedResumeId, setSelectedResumeId] = useState('');
  const [jobDescription, setJobDescription] = useState(SAMPLE_JOB_DESCRIPTIONS[0].text);
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    const list = getStoredResumes();
    setResumes(list);
    const activeId = getActiveResumeId() || list[0]?.id;
    setSelectedResumeId(activeId);

    const initialResume = list.find(r => r.id === activeId) || list[0] || SAMPLE_RESUME;
    const res = analyzeResumeSkills(initialResume, SAMPLE_JOB_DESCRIPTIONS[0].text);
    setAnalysis(res);
  }, []);

  const handleRunAnalysis = () => {
    const currentResume = resumes.find(r => r.id === selectedResumeId) || resumes[0];
    const res = analyzeResumeSkills(currentResume, jobDescription);
    setAnalysis(res);
  };

  const currentResume = resumes.find(r => r.id === selectedResumeId) || resumes[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fc]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 w-full space-y-8">
        
        {/* Header */}
        <div className="pb-4 border-b border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200 mb-2">
              <Cpu className="w-3.5 h-3.5 text-purple-600" />
              <span>Competency & Skill Gap Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Skills Analysis & Gap Benchmark
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Extract user-verified skills, compare with target job descriptions, and view personalized learning paths.
            </p>
          </div>

          <Link
            href="/editor"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 shadow-2xs"
          >
            <span>Update Skills in Editor</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Input Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Active Resume
              </label>
              <select
                value={selectedResumeId}
                onChange={(e) => {
                  setSelectedResumeId(e.target.value);
                  const found = resumes.find(r => r.id === e.target.value);
                  setAnalysis(analyzeResumeSkills(found, jobDescription));
                }}
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 bg-white font-medium text-slate-800"
              >
                {resumes.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.title} ({r.personalInfo?.fullName || 'Untitled'})
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Target Job Description
                </label>
                <div className="flex gap-1 text-[11px] text-slate-500">
                  <span>Presets:</span>
                  {SAMPLE_JOB_DESCRIPTIONS.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setJobDescription(s.text);
                        const curr = resumes.find(r => r.id === selectedResumeId) || resumes[0];
                        setAnalysis(analyzeResumeSkills(curr, s.text));
                      }}
                      className="font-medium text-purple-600 hover:underline"
                    >
                      {s.role.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                rows={3}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-600 leading-relaxed font-sans"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleRunAnalysis}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 shadow-2xs"
            >
              <Search className="w-4 h-4" />
              Analyze Skills Gap
            </button>
          </div>
        </div>

        {/* Dashboard Results */}
        {analysis && (
          <div className="space-y-6">
            
            {/* Top Match Rate Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-2xl bg-purple-50 border-2 border-purple-200 text-purple-700 flex flex-col items-center justify-center shrink-0">
                  <span className="text-2xl font-black">{analysis.matchRate}%</span>
                  <span className="text-[10px] font-bold uppercase text-slate-400">Match</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Skills Compatibility Rating
                  </h2>
                  <p className="text-xs text-slate-500 max-w-xl">
                    Evaluated from {analysis.totalSkillsCount} documented skills on your resume against the target role requirements.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-center min-w-24">
                  <span className="block text-lg font-bold">{analysis.matchedSkills.length}</span>
                  <span className="text-[11px] font-medium">Matched Skills</span>
                </div>
                <div className="p-3 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 text-center min-w-24">
                  <span className="block text-lg font-bold">{analysis.missingSkills.length}</span>
                  <span className="text-[11px] font-medium">Skill Gaps</span>
                </div>
              </div>
            </div>

            {/* Categorized Skills Extracted From Resume */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-5">
              <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-purple-600" />
                    Extracted Skills From Your Resume
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">Strictly compiled from your resume without synthetic additions</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                  {analysis.totalSkillsCount} Skills Total
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                
                {/* Languages */}
                <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
                    <Code2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>Programming Languages</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(analysis.userSkillsByCategory.programmingLanguages || []).map((s, i) => (
                      <span key={i} className="px-2 py-0.5 rounded text-xs font-medium bg-white border border-slate-200 text-slate-700">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Frameworks */}
                <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
                    <Cpu className="w-3.5 h-3.5 text-purple-600" />
                    <span>Frameworks & Libraries</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(analysis.userSkillsByCategory.frameworks || []).map((s, i) => (
                      <span key={i} className="px-2 py-0.5 rounded text-xs font-medium bg-purple-50 border border-purple-100 text-purple-700">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Databases */}
                <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
                    <Database className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Databases & Storage</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(analysis.userSkillsByCategory.databases || []).map((s, i) => (
                      <span key={i} className="px-2 py-0.5 rounded text-xs font-medium bg-white border border-slate-200 text-slate-700">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tools */}
                <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
                    <Wrench className="w-3.5 h-3.5 text-amber-600" />
                    <span>DevOps & Tools</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(analysis.userSkillsByCategory.tools || []).map((s, i) => (
                      <span key={i} className="px-2 py-0.5 rounded text-xs font-medium bg-white border border-slate-200 text-slate-700">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Soft skills */}
                <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-2 md:col-span-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
                    <Users className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Professional & Soft Skills</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(analysis.userSkillsByCategory.softSkills || []).map((s, i) => (
                      <span key={i} className="px-2.5 py-0.5 rounded text-xs font-medium bg-indigo-50 border border-indigo-100 text-indigo-700">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Matched vs Missing Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Matched */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Confirmed Matching Skills ({analysis.matchedSkills.length})
                    </h3>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-600">On Resume</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {analysis.matchedSkills.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {s}
                    </span>
                  ))}
                  {analysis.matchedSkills.length === 0 && (
                    <p className="text-xs text-slate-400 italic">No matching keywords identified.</p>
                  )}
                </div>
              </div>

              {/* Missing Gaps */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Target Role Skill Gaps ({analysis.missingSkills.length})
                    </h3>
                  </div>
                  <span className="text-[11px] font-semibold text-amber-600">Growth Opportunity</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {analysis.missingSkills.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200"
                    >
                      + {s}
                    </span>
                  ))}
                  {analysis.missingSkills.length === 0 && (
                    <p className="text-xs text-emerald-600 font-medium">No gaps detected! Your profile fully addresses this job specification.</p>
                  )}
                </div>
              </div>

            </div>

            {/* Targeted Learning Recommendations */}
            {analysis.recommendations && analysis.recommendations.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-4">
                <div className="pb-3 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-purple-600" />
                    Recommended Learning Paths to Close Your Skill Gaps
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Targeted curricula to master missing technologies and boost your interview readiness
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {analysis.recommendations.map((rec, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-50/70 border border-slate-200 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                            {rec.skillName}
                          </span>
                          <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {rec.duration}
                          </span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-xs">
                          {rec.title}
                        </h4>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          {rec.resource}
                        </p>
                      </div>

                      <div className="pt-3 mt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-medium text-[11px]">{rec.level}</span>
                        <span className="text-purple-600 font-semibold hover:text-purple-700 flex items-center gap-1">
                          Curriculum &rarr;
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
