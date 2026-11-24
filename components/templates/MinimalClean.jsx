import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

export default function MinimalClean({ data }) {
  if (!data) return null;
  const { personalInfo, summary, experience, education, projects, skills, certifications, achievements } = data;

  return (
    <div className="bg-white text-zinc-900 p-8 sm:p-12 text-[13px] leading-relaxed font-sans shadow-sm min-h-[1050px]">
      {/* Top Header */}
      <header className="mb-8 pb-6 border-b border-zinc-200">
        <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-zinc-950 uppercase">
          {personalInfo?.fullName || 'Your Full Name'}
        </h1>
        <p className="text-sm font-normal text-zinc-500 mt-1 uppercase tracking-widest">
          {personalInfo?.jobTitle || 'Your Job Title'}
        </p>

        {/* Contact details */}
        <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-4 text-xs text-zinc-600">
          {personalInfo?.email && <span>{personalInfo.email}</span>}
          {personalInfo?.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo?.location && <span>• {personalInfo.location}</span>}
          {personalInfo?.linkedin && <span>• {personalInfo.linkedin}</span>}
          {personalInfo?.github && <span>• {personalInfo.github}</span>}
          {personalInfo?.portfolio && <span>• {personalInfo.portfolio}</span>}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-8">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-2">
            Profile
          </h2>
          <p className="text-zinc-700 text-sm leading-relaxed max-w-3xl">
            {summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-4 pb-1 border-b border-zinc-100">
            Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp, idx) => (
              <div key={exp.id || idx}>
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-semibold text-zinc-900 text-sm">{exp.jobTitle}</span>
                  <span className="text-xs text-zinc-400 font-mono">{exp.duration}</span>
                </div>
                <div className="text-xs text-zinc-600 mb-2.5">
                  <span className="font-medium text-zinc-800">{exp.company}</span>
                  {exp.location && <span> — {exp.location}</span>}
                </div>
                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <ul className="list-disc list-outside ml-4 space-y-1.5 text-xs text-zinc-600 leading-relaxed">
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

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-4 pb-1 border-b border-zinc-100">
            Selected Works & Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projects.map((proj, idx) => (
              <div key={proj.id || idx} className="p-3.5 border border-zinc-200/80 rounded">
                <h3 className="font-medium text-zinc-900 text-xs mb-1">{proj.title}</h3>
                <p className="text-xs text-zinc-600 mb-2 leading-relaxed">{proj.description}</p>
                {proj.technologies && (
                  <p className="text-[11px] text-zinc-400 font-mono">
                    {proj.technologies}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills Grid */}
      {skills && (
        <section className="mb-8">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-3 pb-1 border-b border-zinc-100">
            Core Competencies
          </h2>
          <div className="space-y-2 text-xs">
            {skills.programmingLanguages?.length > 0 && (
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <span className="w-32 font-medium text-zinc-500 shrink-0">Languages:</span>
                <span className="text-zinc-800">{skills.programmingLanguages.join(', ')}</span>
              </div>
            )}
            {skills.frameworks?.length > 0 && (
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <span className="w-32 font-medium text-zinc-500 shrink-0">Frameworks:</span>
                <span className="text-zinc-800">{skills.frameworks.join(', ')}</span>
              </div>
            )}
            {skills.databases?.length > 0 && (
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <span className="w-32 font-medium text-zinc-500 shrink-0">Databases:</span>
                <span className="text-zinc-800">{skills.databases.join(', ')}</span>
              </div>
            )}
            {skills.tools?.length > 0 && (
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <span className="w-32 font-medium text-zinc-500 shrink-0">Tools & Infra:</span>
                <span className="text-zinc-800">{skills.tools.join(', ')}</span>
              </div>
            )}
            {skills.softSkills?.length > 0 && (
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <span className="w-32 font-medium text-zinc-500 shrink-0">Leadership:</span>
                <span className="text-zinc-800">{skills.softSkills.join(', ')}</span>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Two-col Footer: Education & Certs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-zinc-100">
        {education && education.length > 0 && (
          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-2">
              Education
            </h2>
            {education.map((edu, idx) => (
              <div key={edu.id || idx} className="text-xs mb-2">
                <div className="font-semibold text-zinc-900">{edu.degree}</div>
                <div className="text-zinc-600">{edu.institution}</div>
                <div className="text-zinc-400 text-[11px]">{edu.graduationYear} {edu.cgpa ? `• GPA ${edu.cgpa}` : ''}</div>
              </div>
            ))}
          </div>
        )}

        {certifications && certifications.length > 0 && (
          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-2">
              Certifications
            </h2>
            {certifications.map((cert, idx) => (
              <div key={cert.id || idx} className="text-xs mb-1.5">
                <span className="font-medium text-zinc-800">{cert.name}</span>
                <span className="text-zinc-400 text-[11px]"> — {cert.issuer} ({cert.date})</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
