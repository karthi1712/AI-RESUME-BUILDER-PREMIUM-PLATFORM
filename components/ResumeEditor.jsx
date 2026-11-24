'use client';

import React, { useState } from 'react';
import { 
  User, 
  FileText, 
  GraduationCap, 
  Briefcase, 
  FolderGit2, 
  Cpu, 
  Award, 
  Trophy, 
  Plus, 
  Trash2, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Wand2, 
  HelpCircle,
  Link as LinkIcon
} from 'lucide-react';

export default function ResumeEditor({ resume, onChange, onEnhanceSummary }) {
  const [activeTab, setActiveTab] = useState('personal');

  // Input handlers
  const handlePersonalChange = (field, value) => {
    onChange({
      ...resume,
      personalInfo: {
        ...resume.personalInfo,
        [field]: value
      }
    });
  };

  const handleSummaryChange = (val) => {
    onChange({
      ...resume,
      summary: val
    });
  };

  // Education handlers
  const handleAddEducation = () => {
    const newEdu = {
      id: `edu-${Date.now()}`,
      institution: '',
      degree: '',
      specialization: '',
      graduationYear: '',
      cgpa: ''
    };
    onChange({
      ...resume,
      education: [...(resume.education || []), newEdu]
    });
  };

  const handleUpdateEducation = (index, field, value) => {
    const list = [...(resume.education || [])];
    list[index] = { ...list[index], [field]: value };
    onChange({ ...resume, education: list });
  };

  const handleRemoveEducation = (index) => {
    const list = [...(resume.education || [])];
    list.splice(index, 1);
    onChange({ ...resume, education: list });
  };

  // Experience handlers
  const handleAddExperience = () => {
    const newExp = {
      id: `exp-${Date.now()}`,
      company: '',
      jobTitle: '',
      duration: '',
      location: '',
      responsibilities: ['Architected and implemented high-impact features with modern tech stack.']
    };
    onChange({
      ...resume,
      experience: [...(resume.experience || []), newExp]
    });
  };

  const handleUpdateExperience = (index, field, value) => {
    const list = [...(resume.experience || [])];
    list[index] = { ...list[index], [field]: value };
    onChange({ ...resume, experience: list });
  };

  const handleRemoveExperience = (index) => {
    const list = [...(resume.experience || [])];
    list.splice(index, 1);
    onChange({ ...resume, experience: list });
  };

  const handleAddResponsibility = (expIndex) => {
    const list = [...(resume.experience || [])];
    const resps = [...(list[expIndex].responsibilities || []), 'Collaborated with engineering stakeholders to improve delivery speed and reliability.'];
    list[expIndex] = { ...list[expIndex], responsibilities: resps };
    onChange({ ...resume, experience: list });
  };

  const handleUpdateResponsibility = (expIndex, respIndex, value) => {
    const list = [...(resume.experience || [])];
    const resps = [...(list[expIndex].responsibilities || [])];
    resps[respIndex] = value;
    list[expIndex] = { ...list[expIndex], responsibilities: resps };
    onChange({ ...resume, experience: list });
  };

  const handleRemoveResponsibility = (expIndex, respIndex) => {
    const list = [...(resume.experience || [])];
    const resps = [...(list[expIndex].responsibilities || [])];
    resps.splice(respIndex, 1);
    list[expIndex] = { ...list[expIndex], responsibilities: resps };
    onChange({ ...resume, experience: list });
  };

  // Projects handlers
  const handleAddProject = () => {
    const newProj = {
      id: `proj-${Date.now()}`,
      title: '',
      description: '',
      technologies: '',
      url: ''
    };
    onChange({
      ...resume,
      projects: [...(resume.projects || []), newProj]
    });
  };

  const handleUpdateProject = (index, field, value) => {
    const list = [...(resume.projects || [])];
    list[index] = { ...list[index], [field]: value };
    onChange({ ...resume, projects: list });
  };

  const handleRemoveProject = (index) => {
    const list = [...(resume.projects || [])];
    list.splice(index, 1);
    onChange({ ...resume, projects: list });
  };

  // Skills tag handlers
  const [skillInputs, setSkillInputs] = useState({
    programmingLanguages: '',
    frameworks: '',
    databases: '',
    tools: '',
    softSkills: ''
  });

  const handleAddSkillTag = (category) => {
    const val = skillInputs[category]?.trim();
    if (!val) return;
    const current = resume.skills?.[category] || [];
    if (!current.includes(val)) {
      onChange({
        ...resume,
        skills: {
          ...resume.skills,
          [category]: [...current, val]
        }
      });
    }
    setSkillInputs({ ...skillInputs, [category]: '' });
  };

  const handleRemoveSkillTag = (category, tag) => {
    const current = resume.skills?.[category] || [];
    onChange({
      ...resume,
      skills: {
        ...resume.skills,
        [category]: current.filter(t => t !== tag)
      }
    });
  };

  // Certifications handlers
  const handleAddCertification = () => {
    const newCert = {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      date: '',
      url: ''
    };
    onChange({
      ...resume,
      certifications: [...(resume.certifications || []), newCert]
    });
  };

  const handleUpdateCertification = (index, field, value) => {
    const list = [...(resume.certifications || [])];
    list[index] = { ...list[index], [field]: value };
    onChange({ ...resume, certifications: list });
  };

  const handleRemoveCertification = (index) => {
    const list = [...(resume.certifications || [])];
    list.splice(index, 1);
    onChange({ ...resume, certifications: list });
  };

  // Achievements handlers
  const handleAddAchievement = () => {
    const newAch = {
      id: `ach-${Date.now()}`,
      title: '',
      description: ''
    };
    onChange({
      ...resume,
      achievements: [...(resume.achievements || []), newAch]
    });
  };

  const handleUpdateAchievement = (index, field, value) => {
    const list = [...(resume.achievements || [])];
    list[index] = { ...list[index], [field]: value };
    onChange({ ...resume, achievements: list });
  };

  const handleRemoveAchievement = (index) => {
    const list = [...(resume.achievements || [])];
    list.splice(index, 1);
    onChange({ ...resume, achievements: list });
  };

  // AI Polish helpers
  const handleQuickAiPolishSummary = () => {
    if (!resume.summary || resume.summary.length < 15) {
      const generated = `High-impact and results-oriented ${resume.personalInfo?.jobTitle || 'Professional'} with hands-on expertise building scalable architectures, streamlining core workflows, and delivering user-centric digital products. Demonstrated ability to lead technical initiatives and collaborate across multidisciplinary teams.`;
      handleSummaryChange(generated);
    } else {
      const polished = resume.summary
        .replace(/worked on/gi, 'architected and engineered')
        .replace(/helped/gi, 'spearheaded cross-functional efforts to optimize')
        .replace(/made/gi, 'delivered high-performance')
        + ' Proven track record of driving operational efficiency and elevated engineering standards.';
      handleSummaryChange(polished);
    }
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'summary', label: 'Summary', icon: FileText },
    { id: 'experience', label: 'Experience', icon: Briefcase, count: resume.experience?.length },
    { id: 'education', label: 'Education', icon: GraduationCap, count: resume.education?.length },
    { id: 'projects', label: 'Projects', icon: FolderGit2, count: resume.projects?.length },
    { id: 'skills', label: 'Skills', icon: Cpu },
    { id: 'certifications', label: 'Certifications', icon: Award, count: resume.certifications?.length },
    { id: 'achievements', label: 'Achievements', icon: Trophy, count: resume.achievements?.length },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col h-full">
      {/* Tab navigation pills */}
      <div className="border-b border-slate-200/80 bg-slate-50/70 p-2 overflow-x-auto">
        <div className="flex gap-1.5 min-w-max">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-purple-700 text-purple-100' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Editor Content Area */}
      <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
        
        {/* 1. PERSONAL INFO TAB */}
        {activeTab === 'personal' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <User className="w-4 h-4 text-purple-600" />
                Personal Information
              </h3>
              <span className="text-xs text-slate-400">Essential for recruiter contact</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={resume.personalInfo?.fullName || ''}
                  onChange={(e) => handlePersonalChange('fullName', e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Target Job Title</label>
                <input
                  type="text"
                  value={resume.personalInfo?.jobTitle || ''}
                  onChange={(e) => handlePersonalChange('jobTitle', e.target.value)}
                  placeholder="e.g. Senior Full-Stack Engineer"
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={resume.personalInfo?.email || ''}
                  onChange={(e) => handlePersonalChange('email', e.target.value)}
                  placeholder="alex.morgan@example.com"
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={resume.personalInfo?.phone || ''}
                  onChange={(e) => handlePersonalChange('phone', e.target.value)}
                  placeholder="+1 (555) 234-5678"
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Location / City</label>
                <input
                  type="text"
                  value={resume.personalInfo?.location || ''}
                  onChange={(e) => handlePersonalChange('location', e.target.value)}
                  placeholder="San Francisco, CA"
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">LinkedIn Profile</label>
                <input
                  type="text"
                  value={resume.personalInfo?.linkedin || ''}
                  onChange={(e) => handlePersonalChange('linkedin', e.target.value)}
                  placeholder="linkedin.com/in/alexmorgan"
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">GitHub Profile</label>
                <input
                  type="text"
                  value={resume.personalInfo?.github || ''}
                  onChange={(e) => handlePersonalChange('github', e.target.value)}
                  placeholder="github.com/alexmorgan"
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Portfolio / Website</label>
                <input
                  type="text"
                  value={resume.personalInfo?.portfolio || ''}
                  onChange={(e) => handlePersonalChange('portfolio', e.target.value)}
                  placeholder="alexmorgan.dev"
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {/* 2. SUMMARY TAB */}
        {activeTab === 'summary' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-600" />
                  Professional Summary
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">3-4 punchy sentences highlighting your core impact and strengths</p>
              </div>

              <button
                type="button"
                onClick={handleQuickAiPolishSummary}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                AI Smart Polish
              </button>
            </div>

            <div>
              <textarea
                rows={6}
                value={resume.summary || ''}
                onChange={(e) => handleSummaryChange(e.target.value)}
                placeholder="Results-driven Software Engineer with 5+ years of experience engineering high-performance web applications, scalable microservices, and modern user experiences..."
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent leading-relaxed"
              />
              <div className="flex justify-between items-center text-xs text-slate-400 mt-1">
                <span>Recommended: 50 - 100 words</span>
                <span>{(resume.summary || '').split(/\s+/).filter(Boolean).length} words</span>
              </div>
            </div>
          </div>
        )}

        {/* 3. EXPERIENCE TAB */}
        {activeTab === 'experience' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-purple-600" />
                  Work Experience
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Focus on achievements and quantified business outcomes</p>
              </div>

              <button
                type="button"
                onClick={handleAddExperience}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 shadow-xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Position
              </button>
            </div>

            {(!resume.experience || resume.experience.length === 0) ? (
              <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl">
                <Briefcase className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs text-slate-500 mb-3">No work experiences added yet.</p>
                <button
                  onClick={handleAddExperience}
                  className="px-3 py-1.5 text-xs font-semibold text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100"
                >
                  + Add First Role
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {resume.experience.map((exp, expIdx) => (
                  <div key={exp.id || expIdx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Role #{expIdx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveExperience(expIdx)}
                        className="text-xs text-rose-600 hover:text-rose-700 font-medium flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Company Name</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => handleUpdateExperience(expIdx, 'company', e.target.value)}
                          placeholder="e.g. Veloce Cloud Systems"
                          className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Job Title</label>
                        <input
                          type="text"
                          value={exp.jobTitle}
                          onChange={(e) => handleUpdateExperience(expIdx, 'jobTitle', e.target.value)}
                          placeholder="e.g. Senior Full-Stack Engineer"
                          className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Duration / Dates</label>
                        <input
                          type="text"
                          value={exp.duration}
                          onChange={(e) => handleUpdateExperience(expIdx, 'duration', e.target.value)}
                          placeholder="e.g. 2022 - Present"
                          className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Location</label>
                        <input
                          type="text"
                          value={exp.location || ''}
                          onChange={(e) => handleUpdateExperience(expIdx, 'location', e.target.value)}
                          placeholder="e.g. San Francisco, CA (or Remote)"
                          className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                        />
                      </div>
                    </div>

                    {/* Bullet Points */}
                    <div className="pt-2 border-t border-slate-200/80">
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-[11px] font-bold text-slate-700">Key Responsibilities & Bullet Points</label>
                        <button
                          type="button"
                          onClick={() => handleAddResponsibility(expIdx)}
                          className="text-[11px] font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" />
                          Add Bullet
                        </button>
                      </div>

                      <div className="space-y-2">
                        {(exp.responsibilities || []).map((resp, respIdx) => (
                          <div key={respIdx} className="flex items-center gap-2">
                            <span className="text-slate-400 text-xs">•</span>
                            <input
                              type="text"
                              value={resp}
                              onChange={(e) => handleUpdateResponsibility(expIdx, respIdx, e.target.value)}
                              placeholder="e.g. Engineered distributed queue processing, handling over 2.5 million daily events..."
                              className="flex-1 text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveResponsibility(expIdx, respIdx)}
                              className="text-slate-400 hover:text-rose-500 p-1"
                              title="Delete bullet point"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 4. EDUCATION TAB */}
        {activeTab === 'education' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-purple-600" />
                Education History
              </h3>
              <button
                type="button"
                onClick={handleAddEducation}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Degree
              </button>
            </div>

            {(!resume.education || resume.education.length === 0) ? (
              <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl">
                <GraduationCap className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs text-slate-500 mb-3">No education listed yet.</p>
                <button
                  onClick={handleAddEducation}
                  className="px-3 py-1.5 text-xs font-semibold text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100"
                >
                  + Add Degree
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {resume.education.map((edu, idx) => (
                  <div key={edu.id || idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-700">Degree #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveEducation(idx)}
                        className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">University / College</label>
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => handleUpdateEducation(idx, 'institution', e.target.value)}
                          placeholder="University of California, Berkeley"
                          className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Degree Type</label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => handleUpdateEducation(idx, 'degree', e.target.value)}
                          placeholder="Bachelor of Science"
                          className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Major / Specialization</label>
                        <input
                          type="text"
                          value={edu.specialization}
                          onChange={(e) => handleUpdateEducation(idx, 'specialization', e.target.value)}
                          placeholder="Computer Science"
                          className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">Grad Year</label>
                          <input
                            type="text"
                            value={edu.graduationYear}
                            onChange={(e) => handleUpdateEducation(idx, 'graduationYear', e.target.value)}
                            placeholder="2020"
                            className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">GPA / Score</label>
                          <input
                            type="text"
                            value={edu.cgpa || ''}
                            onChange={(e) => handleUpdateEducation(idx, 'cgpa', e.target.value)}
                            placeholder="3.85 / 4.0"
                            className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 5. PROJECTS TAB */}
        {activeTab === 'projects' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-purple-600" />
                Featured Projects
              </h3>
              <button
                type="button"
                onClick={handleAddProject}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Project
              </button>
            </div>

            {(!resume.projects || resume.projects.length === 0) ? (
              <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl">
                <FolderGit2 className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs text-slate-500 mb-3">No projects added yet.</p>
                <button
                  onClick={handleAddProject}
                  className="px-3 py-1.5 text-xs font-semibold text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100"
                >
                  + Add Project
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {resume.projects.map((proj, idx) => (
                  <div key={proj.id || idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-700">Project #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveProject(idx)}
                        className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Project Title</label>
                        <input
                          type="text"
                          value={proj.title}
                          onChange={(e) => handleUpdateProject(idx, 'title', e.target.value)}
                          placeholder="DevPulse – Observability Hub"
                          className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Project URL / GitHub</label>
                        <input
                          type="text"
                          value={proj.url || ''}
                          onChange={(e) => handleUpdateProject(idx, 'url', e.target.value)}
                          placeholder="https://github.com/..."
                          className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Technologies Used</label>
                      <input
                        type="text"
                        value={proj.technologies || ''}
                        onChange={(e) => handleUpdateProject(idx, 'technologies', e.target.value)}
                        placeholder="Next.js, TypeScript, Go, Docker, InfluxDB"
                        className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Description & Impact</label>
                      <textarea
                        rows={2}
                        value={proj.description}
                        onChange={(e) => handleUpdateProject(idx, 'description', e.target.value)}
                        placeholder="Built a lightweight monitoring dashboard displaying serverless telemetry and tracing..."
                        className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 6. SKILLS TAB */}
        {activeTab === 'skills' && (
          <div className="space-y-5">
            <div className="pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-purple-600" />
                Categorized Skills
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Type a skill name and press Enter or click Add</p>
            </div>

            {[
              { key: 'programmingLanguages', label: 'Programming Languages', placeholder: 'e.g. JavaScript, Python, Go, SQL' },
              { key: 'frameworks', label: 'Frameworks & Libraries', placeholder: 'e.g. React.js, Next.js, Node.js, FastAPI' },
              { key: 'databases', label: 'Databases & Storage', placeholder: 'e.g. PostgreSQL, Redis, MongoDB' },
              { key: 'tools', label: 'DevOps & Tools', placeholder: 'e.g. Git, Docker, AWS, Jest, Figma' },
              { key: 'softSkills', label: 'Soft Skills & Leadership', placeholder: 'e.g. Agile Leadership, Mentorship, Problem Solving' },
            ].map(({ key, label, placeholder }) => (
              <div key={key} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <label className="block text-xs font-bold text-slate-800 mb-2">{label}</label>
                
                {/* Current tags */}
                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  {(resume.skills?.[key] || []).map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-white text-slate-700 border border-slate-200 shadow-2xs"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkillTag(key, tag)}
                        className="text-slate-400 hover:text-rose-500"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {(!resume.skills?.[key] || resume.skills[key].length === 0) && (
                    <span className="text-xs text-slate-400 italic">No {label.toLowerCase()} added yet.</span>
                  )}
                </div>

                {/* Add tag input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={skillInputs[key]}
                    onChange={(e) => setSkillInputs({ ...skillInputs, [key]: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSkillTag(key);
                      }
                    }}
                    placeholder={placeholder}
                    className="flex-1 text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddSkillTag(key)}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-900 text-white"
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 7. CERTIFICATIONS TAB */}
        {activeTab === 'certifications' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-4 h-4 text-purple-600" />
                Certifications
              </h3>
              <button
                type="button"
                onClick={handleAddCertification}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Certification
              </button>
            </div>

            {(!resume.certifications || resume.certifications.length === 0) ? (
              <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl">
                <Award className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs text-slate-500 mb-3">No certifications added yet.</p>
                <button
                  onClick={handleAddCertification}
                  className="px-3 py-1.5 text-xs font-semibold text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100"
                >
                  + Add Certification
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {resume.certifications.map((cert, idx) => (
                  <div key={cert.id || idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-700">Certificate #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCertification(idx)}
                        className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Certificate Title</label>
                        <input
                          type="text"
                          value={cert.name}
                          onChange={(e) => handleUpdateCertification(idx, 'name', e.target.value)}
                          placeholder="AWS Certified Solutions Architect"
                          className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Issue Date</label>
                        <input
                          type="text"
                          value={cert.date}
                          onChange={(e) => handleUpdateCertification(idx, 'date', e.target.value)}
                          placeholder="2023"
                          className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Issuer / Authority</label>
                      <input
                        type="text"
                        value={cert.issuer}
                        onChange={(e) => handleUpdateCertification(idx, 'issuer', e.target.value)}
                        placeholder="Amazon Web Services"
                        className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 8. ACHIEVEMENTS TAB */}
        {activeTab === 'achievements' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-purple-600" />
                Honors & Key Achievements
              </h3>
              <button
                type="button"
                onClick={handleAddAchievement}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Achievement
              </button>
            </div>

            {(!resume.achievements || resume.achievements.length === 0) ? (
              <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl">
                <Trophy className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs text-slate-500 mb-3">No honors or achievements added yet.</p>
                <button
                  onClick={handleAddAchievement}
                  className="px-3 py-1.5 text-xs font-semibold text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100"
                >
                  + Add Achievement
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {resume.achievements.map((ach, idx) => (
                  <div key={ach.id || idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-700">Achievement #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveAchievement(idx)}
                        className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Remove
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Title</label>
                      <input
                        type="text"
                        value={ach.title}
                        onChange={(e) => handleUpdateAchievement(idx, 'title', e.target.value)}
                        placeholder="1st Place – Global Hackathon 2023"
                        className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={ach.description}
                        onChange={(e) => handleUpdateAchievement(idx, 'description', e.target.value)}
                        placeholder="Built an automated triage coordination system recognized out of 380 submissions..."
                        className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
