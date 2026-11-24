import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Globe, Terminal, GitBranch, Code2 } from 'lucide-react';

export default function TechnicalDev({ data }) {
  if (!data) return null;
  const { personalInfo, summary, experience, education, projects, skills, certifications, achievements } = data;

  return (
    <div className="bg-white text-slate-800 p-8 sm:p-10 text-[13px] leading-relaxed shadow-sm min-h-[1050px] font-sans">
      {/* Dev Header with Terminal Accent */}
      <header className="pb-5 mb-6 border-b-2 border-blue-600">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-700 font-bold">
                $ whoami
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                {personalInfo?.fullName || 'Developer Name'}
              </h1>
            </div>
            <p className="text-sm font-semibold text-blue-600 font-mono mt-1">
              &gt; {personalInfo?.jobTitle || 'Full-Stack Developer'}
            </p>
          </div>

          <div className="font-mono text-xs text-slate-600 space-y-1 sm:text-right">
            {personalInfo?.email && <div>{personalInfo.email}</div>}
            {personalInfo?.phone && <div>{personalInfo.phone}</div>}
            {personalInfo?.location && <div>{personalInfo.location}</div>}
          </div>
        </div>

        {/* Links row */}
        <div className="flex flex-wrap gap-4 mt-3 pt-3 border-t border-slate-100 font-mono text-xs text-slate-700">
          {personalInfo?.github && (
            <span className="flex items-center gap-1.5 text-blue-700">
              <Github className="w-3.5 h-3.5 text-slate-800" />
              {personalInfo.github}
            </span>
          )}
          {personalInfo?.linkedin && (
            <span className="flex items-center gap-1.5 text-blue-700">
              <Linkedin className="w-3.5 h-3.5 text-blue-600" />
              {personalInfo.linkedin}
            </span>
          )}
          {personalInfo?.portfolio && (
            <span className="flex items-center gap-1.5 text-blue-700">
              <Globe className="w-3.5 h-3.5 text-slate-600" />
              {personalInfo.portfolio}
            </span>
          )}
        </div>
      </header>

      {/* Tech Stack Matrix (prominent on top for engineering screeners) */}
      {skills && (
        <section className="mb-6 p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs">
          <div className="flex items-center gap-2 text-blue-400 font-bold uppercase tracking-wider mb-3">
            <Terminal className="w-4 h-4" />
            <span>Technical Capabilities Matrix</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-[12px]">
            {skills.programmingLanguages?.length > 0 && (
              <div>
                <span className="text-blue-300 font-semibold">Languages: </span>
                <span className="text-slate-300">{skills.programmingLanguages.join(', ')}</span>
              </div>
            )}
            {skills.frameworks?.length > 0 && (
              <div>
                <span className="text-blue-300 font-semibold">Frameworks: </span>
                <span className="text-slate-300">{skills.frameworks.join(', ')}</span>
              </div>
            )}
            {skills.databases?.length > 0 && (
              <div>
                <span className="text-blue-300 font-semibold">Databases: </span>
                <span className="text-slate-300">{skills.databases.join(', ')}</span>
              </div>
            )}
            {skills.tools?.length > 0 && (
              <div>
                <span className="text-blue-300 font-semibold">DevOps & Cloud: </span>
                <span className="text-slate-300">{skills.tools.join(', ')}</span>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Summary */}
      {summary && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 flex items-center gap-1.5 border-b pb-1">
            <Code2 className="w-4 h-4 text-blue-600" />
            Engineering Summary
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-1.5 border-b pb-1">
            <GitBranch className="w-4 h-4 text-blue-600" />
            Software Engineering History
          </h2>
          <div className="space-y-4">
            {experience.map((exp, idx) => (
              <div key={exp.id || idx} className="pl-3 border-l-2 border-blue-400">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-slate-900 text-sm">{exp.jobTitle}</h3>
                  <span className="text-xs font-mono text-slate-500">{exp.duration}</span>
                </div>
                <div className="text-xs font-semibold text-blue-700 mb-1.5">
                  {exp.company} {exp.location ? `• ${exp.location}` : ''}
                </div>
                {exp.responsibilities && (
                  <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-slate-700">
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

      {/* Projects with Repository & Tech Focus */}
      {projects && projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-1.5 border-b pb-1">
            <Terminal className="w-4 h-4 text-blue-600" />
            Open Source & Engineering Projects
          </h2>
          <div className="space-y-3">
            {projects.map((proj, idx) => (
              <div key={proj.id || idx} className="p-3 bg-slate-50/80 rounded-lg border border-slate-200">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold text-slate-900 text-xs">{proj.title}</h4>
                  {proj.url && (
                    <span className="text-[11px] font-mono text-blue-600 underline">
                      {proj.url.replace(/^https?:\/\//, '')}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 mb-2">{proj.description}</p>
                {proj.technologies && (
                  <div className="font-mono text-[11px] text-slate-700">
                    <span className="font-semibold text-slate-900">Stack: </span>
                    {proj.technologies}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education & Certs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-3 border-t border-slate-200">
        {education && education.length > 0 && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">Education</h3>
            {education.map((edu, idx) => (
              <div key={edu.id || idx} className="text-xs mb-2">
                <p className="font-bold text-slate-900">{edu.degree} in {edu.specialization}</p>
                <p className="text-slate-600">{edu.institution} ({edu.graduationYear})</p>
                {edu.cgpa && <p className="text-[11px] text-slate-500 font-mono">GPA: {edu.cgpa}</p>}
              </div>
            ))}
          </div>
        )}

        {certifications && certifications.length > 0 && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">Credentials</h3>
            {certifications.map((c, idx) => (
              <div key={c.id || idx} className="text-xs mb-1.5">
                <span className="font-semibold text-slate-800">{c.name}</span>
                <span className="text-slate-500 text-[11px]"> — {c.issuer} ({c.date})</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
