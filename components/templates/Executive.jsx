import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Award, Briefcase, GraduationCap } from 'lucide-react';

export default function Executive({ data }) {
  if (!data) return null;
  const { personalInfo, summary, experience, education, projects, skills, certifications, achievements } = data;

  return (
    <div className="bg-white text-slate-900 p-8 sm:p-11 text-[13px] leading-relaxed shadow-sm min-h-[1050px] font-serif">
      {/* Executive Navy Header */}
      <header className="border-b-2 border-amber-600/60 pb-6 mb-7 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-serif">
          {personalInfo?.fullName || 'Your Full Name'}
        </h1>
        <p className="text-sm font-sans uppercase tracking-widest text-blue-900 font-semibold mt-1">
          {personalInfo?.jobTitle || 'Executive Officer / Lead Architect'}
        </p>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 mt-3.5 text-xs font-sans text-slate-600">
          {personalInfo?.email && <span>{personalInfo.email}</span>}
          {personalInfo?.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo?.location && <span>• {personalInfo.location}</span>}
          {personalInfo?.linkedin && <span>• {personalInfo.linkedin}</span>}
          {personalInfo?.portfolio && <span>• {personalInfo.portfolio}</span>}
        </div>
      </header>

      {/* Executive Summary */}
      {summary && (
        <section className="mb-7 bg-slate-50/80 p-4 rounded-lg border-l-4 border-blue-900">
          <h2 className="text-xs font-sans font-bold uppercase tracking-wider text-blue-950 mb-1.5 flex items-center gap-2">
            <Briefcase className="w-3.5 h-3.5 text-blue-900" />
            Executive Profile
          </h2>
          <p className="text-slate-800 text-sm leading-relaxed italic font-serif">
            &ldquo;{summary}&rdquo;
          </p>
        </section>
      )}

      {/* Core Competencies (Skills) Bar */}
      {skills && (
        <section className="mb-7 font-sans">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2 pb-1 border-b border-slate-200">
            Strategic Competencies & Expertise
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {skills.softSkills?.slice(0, 4).map((s, i) => (
              <div key={i} className="p-2 bg-slate-100 rounded text-center font-medium text-slate-800">
                {s}
              </div>
            ))}
            {skills.frameworks?.slice(0, 4).map((s, i) => (
              <div key={i} className="p-2 bg-blue-50 text-blue-900 border border-blue-100 rounded text-center font-medium">
                {s}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Professional Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-7">
          <h2 className="text-xs font-sans font-bold uppercase tracking-wider text-slate-900 pb-1 mb-4 border-b-2 border-slate-200">
            Professional Experience & Career History
          </h2>
          <div className="space-y-5">
            {experience.map((exp, idx) => (
              <div key={exp.id || idx}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-slate-950 text-sm font-sans">{exp.jobTitle}</h3>
                  <span className="text-xs font-sans text-slate-500 font-medium">{exp.duration}</span>
                </div>
                <div className="text-xs font-sans font-semibold text-blue-900 mb-2 flex items-center justify-between">
                  <span>{exp.company}</span>
                  {exp.location && <span className="text-slate-500 font-normal italic font-serif">{exp.location}</span>}
                </div>
                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-slate-700 leading-relaxed font-sans">
                    {exp.responsibilities.map((r, rIdx) => (
                      <li key={rIdx}>{r}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Grid: Education & Notable Achievements */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 font-sans border-t border-slate-200">
        {education && education.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-blue-900" />
              Academic Credentials
            </h2>
            {education.map((edu, idx) => (
              <div key={edu.id || idx} className="text-xs mb-3">
                <div className="font-bold text-slate-900">{edu.degree}</div>
                <div className="text-slate-700">{edu.specialization}</div>
                <div className="text-slate-500 text-[11px]">{edu.institution} • {edu.graduationYear}</div>
              </div>
            ))}
          </div>
        )}

        {achievements && achievements.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-600" />
              Key Honours & Board Roles
            </h2>
            {achievements.map((ach, idx) => (
              <div key={ach.id || idx} className="text-xs mb-2.5">
                <div className="font-semibold text-slate-900">{ach.title}</div>
                <div className="text-slate-600 text-[11px]">{ach.description}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
