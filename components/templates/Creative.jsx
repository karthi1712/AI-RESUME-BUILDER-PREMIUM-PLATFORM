import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Globe, Sparkles } from 'lucide-react';

export default function Creative({ data }) {
  if (!data) return null;
  const { personalInfo, summary, experience, education, projects, skills, certifications, achievements } = data;

  return (
    <div className="bg-white text-slate-800 shadow-sm min-h-[1050px] font-sans flex flex-col md:flex-row">
      {/* Left Sidebar Accent Column */}
      <aside className="w-full md:w-72 bg-teal-900 text-teal-50 p-6 sm:p-7 shrink-0 space-y-6">
        <div>
          <div className="w-16 h-16 rounded-2xl bg-teal-800 border-2 border-teal-400/40 flex items-center justify-center text-teal-200 mb-4 shadow-inner">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            {personalInfo?.fullName || 'Your Full Name'}
          </h1>
          <p className="text-xs font-semibold text-teal-300 uppercase tracking-wider mt-1">
            {personalInfo?.jobTitle || 'Creative Technologist'}
          </p>
        </div>

        {/* Contact Links */}
        <div className="space-y-2.5 text-xs text-teal-100/90 pt-3 border-t border-teal-800">
          {personalInfo?.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span className="truncate">{personalInfo.email}</span>
            </div>
          )}
          {personalInfo?.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo?.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo?.linkedin && (
            <div className="flex items-center gap-2">
              <Linkedin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span className="truncate">{personalInfo.linkedin}</span>
            </div>
          )}
          {personalInfo?.github && (
            <div className="flex items-center gap-2">
              <Github className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span className="truncate">{personalInfo.github}</span>
            </div>
          )}
        </div>

        {/* Skills sidebar tags */}
        {skills && (
          <div className="pt-3 border-t border-teal-800 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-teal-300">
              Expertise & Tools
            </h3>
            
            {skills.frameworks?.length > 0 && (
              <div>
                <p className="text-[11px] text-teal-300 mb-1 font-semibold">Frameworks</p>
                <div className="flex flex-wrap gap-1">
                  {skills.frameworks.map((f, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-teal-800/80 text-teal-100 border border-teal-700">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {skills.programmingLanguages?.length > 0 && (
              <div>
                <p className="text-[11px] text-teal-300 mb-1 font-semibold">Languages</p>
                <div className="flex flex-wrap gap-1">
                  {skills.programmingLanguages.map((l, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-teal-800/80 text-teal-100 border border-teal-700">
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Education in sidebar */}
        {education && education.length > 0 && (
          <div className="pt-3 border-t border-teal-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-teal-300 mb-2">
              Education
            </h3>
            {education.map((edu, idx) => (
              <div key={edu.id || idx} className="text-xs mb-2">
                <p className="font-bold text-white">{edu.degree}</p>
                <p className="text-teal-200 text-[11px]">{edu.specialization}</p>
                <p className="text-teal-400 text-[10px]">{edu.institution} ({edu.graduationYear})</p>
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-8 space-y-6">
        {/* Bio */}
        {summary && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-teal-800 pb-1 mb-2 border-b-2 border-teal-100">
              About Me
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {summary}
            </p>
          </section>
        )}

        {/* Work Experience */}
        {experience && experience.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-teal-800 pb-1 mb-3 border-b-2 border-teal-100">
              Work History
            </h2>
            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div key={exp.id || idx} className="border-l-2 border-teal-500 pl-3">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm">{exp.jobTitle}</h3>
                    <span className="text-[11px] font-semibold text-teal-700">{exp.duration}</span>
                  </div>
                  <p className="text-xs font-medium text-slate-600 mb-1.5">{exp.company} {exp.location ? `• ${exp.location}` : ''}</p>
                  {exp.responsibilities && (
                    <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-slate-600">
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

        {/* Creative Projects */}
        {projects && projects.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-teal-800 pb-1 mb-3 border-b-2 border-teal-100">
              Featured Projects & Products
            </h2>
            <div className="space-y-3">
              {projects.map((proj, idx) => (
                <div key={proj.id || idx} className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <h4 className="font-bold text-slate-900 text-xs mb-1">{proj.title}</h4>
                  <p className="text-xs text-slate-600 mb-1.5">{proj.description}</p>
                  {proj.technologies && (
                    <span className="text-[11px] font-mono text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                      {proj.technologies}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
