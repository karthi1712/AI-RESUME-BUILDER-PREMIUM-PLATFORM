import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Globe, ExternalLink } from 'lucide-react';

export default function ModernProfessional({ data }) {
  if (!data) return null;
  const { personalInfo, summary, experience, education, projects, skills, certifications, achievements, accentColor = '#7c3aed' } = data;

  return (
    <div className="bg-white text-slate-800 p-8 sm:p-10 text-[13px] leading-relaxed font-sans shadow-sm min-h-[1050px]">
      {/* Header */}
      <header className="border-b pb-6 mb-6" style={{ borderColor: `${accentColor}30` }}>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900" style={{ color: accentColor }}>
              {personalInfo?.fullName || 'Your Full Name'}
            </h1>
            <p className="text-base font-medium text-slate-600 mt-1">
              {personalInfo?.jobTitle || 'Your Target Job Title'}
            </p>
          </div>
          <div className="text-xs text-slate-500 flex flex-wrap gap-x-4 gap-y-1.5 sm:justify-end">
            {personalInfo?.email && (
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                {personalInfo.email}
              </span>
            )}
            {personalInfo?.phone && (
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                {personalInfo.phone}
              </span>
            )}
            {personalInfo?.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {personalInfo.location}
              </span>
            )}
          </div>
        </div>

        {/* Links row */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
          {personalInfo?.linkedin && (
            <span className="flex items-center gap-1 text-slate-700">
              <Linkedin className="w-3.5 h-3.5 text-slate-500" />
              {personalInfo.linkedin}
            </span>
          )}
          {personalInfo?.github && (
            <span className="flex items-center gap-1 text-slate-700">
              <Github className="w-3.5 h-3.5 text-slate-500" />
              {personalInfo.github}
            </span>
          )}
          {personalInfo?.portfolio && (
            <span className="flex items-center gap-1 text-slate-700">
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              {personalInfo.portfolio}
            </span>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-1 mb-2.5 flex items-center gap-2 border-b border-slate-200">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
            Professional Summary
          </h2>
          <p className="text-slate-700 leading-normal text-justify">
            {summary}
          </p>
        </section>
      )}

      {/* Main Grid: Left Main Flow (Experience, Projects) & Right Flow (Skills, Education, Certs) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Experience & Projects */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Experience */}
          {experience && experience.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-1 mb-3 flex items-center gap-2 border-b border-slate-200">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
                Work Experience
              </h2>
              <div className="space-y-4">
                {experience.map((exp, idx) => (
                  <div key={exp.id || idx} className="relative pl-3 border-l-2" style={{ borderColor: `${accentColor}40` }}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-slate-900 text-sm">{exp.jobTitle}</h3>
                      <span className="text-xs font-medium text-slate-500">{exp.duration}</span>
                    </div>
                    <div className="text-xs font-semibold text-slate-700 mb-2 flex items-center justify-between">
                      <span>{exp.company}</span>
                      {exp.location && <span className="text-slate-400 font-normal">{exp.location}</span>}
                    </div>
                    {exp.responsibilities && exp.responsibilities.length > 0 && (
                      <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-slate-700 leading-relaxed">
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
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-1 mb-3 flex items-center gap-2 border-b border-slate-200">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
                Key Projects
              </h2>
              <div className="space-y-3.5">
                {projects.map((proj, idx) => (
                  <div key={proj.id || idx} className="p-3 rounded-lg bg-slate-50/70 border border-slate-100">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                        {proj.title}
                        {proj.url && <ExternalLink className="w-3 h-3 text-slate-400" />}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-600 mb-2">{proj.description}</p>
                    {proj.technologies && (
                      <p className="text-[11px] text-slate-500">
                        <strong className="text-slate-700">Technologies:</strong> {proj.technologies}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>

        {/* Right 1 Col: Skills, Education, Certifications */}
        <div className="space-y-6">

          {/* Skills */}
          {skills && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-1 mb-3 flex items-center gap-2 border-b border-slate-200">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
                Skills & Tech Stack
              </h2>
              
              <div className="space-y-3 text-xs">
                {skills.programmingLanguages?.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-slate-700 mb-1.5">Languages</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.programmingLanguages.map((s, i) => (
                        <span key={i} className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {skills.frameworks?.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-slate-700 mb-1.5">Frameworks & Libraries</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.frameworks.map((s, i) => (
                        <span key={i} className="px-2 py-0.5 rounded text-[11px] font-medium bg-purple-50 text-purple-700 border border-purple-100">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {skills.databases?.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-slate-700 mb-1.5">Databases</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.databases.map((s, i) => (
                        <span key={i} className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {skills.tools?.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-slate-700 mb-1.5">Cloud & Tools</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.tools.map((s, i) => (
                        <span key={i} className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {skills.softSkills?.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-slate-700 mb-1.5">Professional Skills</h4>
                    <p className="text-xs text-slate-600 leading-normal">
                      {skills.softSkills.join(' • ')}
                    </p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-1 mb-3 flex items-center gap-2 border-b border-slate-200">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu, idx) => (
                  <div key={edu.id || idx} className="text-xs">
                    <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                    <p className="text-slate-700">{edu.specialization}</p>
                    <p className="text-slate-500">{edu.institution}</p>
                    <div className="flex justify-between text-[11px] text-slate-400 mt-0.5">
                      <span>Graduation: {edu.graduationYear}</span>
                      {edu.cgpa && <span className="font-medium text-slate-600">GPA: {edu.cgpa}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-1 mb-2.5 flex items-center gap-2 border-b border-slate-200">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
                Certifications
              </h2>
              <div className="space-y-2 text-xs">
                {certifications.map((cert, idx) => (
                  <div key={cert.id || idx}>
                    <p className="font-semibold text-slate-800">{cert.name}</p>
                    <p className="text-[11px] text-slate-500">{cert.issuer} {cert.date ? `• ${cert.date}` : ''}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Achievements */}
          {achievements && achievements.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-1 mb-2.5 flex items-center gap-2 border-b border-slate-200">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
                Achievements
              </h2>
              <div className="space-y-2 text-xs">
                {achievements.map((ach, idx) => (
                  <div key={ach.id || idx}>
                    <p className="font-semibold text-slate-800">{ach.title}</p>
                    <p className="text-[11px] text-slate-600">{ach.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>

      </div>
    </div>
  );
}
