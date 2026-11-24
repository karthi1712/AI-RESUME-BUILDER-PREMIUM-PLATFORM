import React from 'react';

export default function ClassicATS({ data }) {
  if (!data) return null;
  const { personalInfo, summary, experience, education, projects, skills, certifications, achievements } = data;

  return (
    <div className="bg-white text-black p-8 sm:p-12 text-[13px] leading-normal font-sans shadow-sm min-h-[1050px]">
      {/* Standard Centered ATS Header */}
      <header className="text-center pb-4 mb-4 border-b border-black">
        <h1 className="text-2xl font-bold uppercase tracking-wider text-black">
          {personalInfo?.fullName || 'YOUR FULL NAME'}
        </h1>
        <p className="text-xs font-semibold uppercase tracking-wider text-neutral-800 mt-1">
          {personalInfo?.jobTitle || 'TARGET JOB TITLE'}
        </p>

        <div className="flex flex-wrap justify-center gap-x-3 text-xs text-neutral-800 mt-2">
          {personalInfo?.location && <span>{personalInfo.location}</span>}
          {personalInfo?.phone && <span>| {personalInfo.phone}</span>}
          {personalInfo?.email && <span>| {personalInfo.email}</span>}
          {personalInfo?.linkedin && <span>| {personalInfo.linkedin}</span>}
          {personalInfo?.github && <span>| {personalInfo.github}</span>}
        </div>
      </header>

      {/* Professional Summary */}
      {summary && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-xs leading-relaxed text-justify">
            {summary}
          </p>
        </section>
      )}

      {/* Technical Skills (Strict ATS format) */}
      {skills && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5">
            CORE SKILLS & COMPETENCIES
          </h2>
          <div className="space-y-1 text-xs">
            {skills.programmingLanguages?.length > 0 && (
              <div>
                <strong>Programming Languages: </strong>
                <span>{skills.programmingLanguages.join(', ')}</span>
              </div>
            )}
            {skills.frameworks?.length > 0 && (
              <div>
                <strong>Frameworks & Libraries: </strong>
                <span>{skills.frameworks.join(', ')}</span>
              </div>
            )}
            {skills.databases?.length > 0 && (
              <div>
                <strong>Databases & Storage: </strong>
                <span>{skills.databases.join(', ')}</span>
              </div>
            )}
            {skills.tools?.length > 0 && (
              <div>
                <strong>Tools & Infrastructure: </strong>
                <span>{skills.tools.join(', ')}</span>
              </div>
            )}
            {skills.softSkills?.length > 0 && (
              <div>
                <strong>Professional Strengths: </strong>
                <span>{skills.softSkills.join(', ')}</span>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Work Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-2">
            PROFESSIONAL EXPERIENCE
          </h2>
          <div className="space-y-3.5">
            {experience.map((exp, idx) => (
              <div key={exp.id || idx}>
                <div className="flex justify-between items-baseline font-bold text-xs">
                  <span>{exp.company}</span>
                  <span className="font-normal">{exp.duration}</span>
                </div>
                <div className="flex justify-between items-baseline text-xs italic mb-1">
                  <span>{exp.jobTitle}</span>
                  <span>{exp.location}</span>
                </div>
                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <ul className="list-disc list-outside ml-5 space-y-1 text-xs leading-relaxed">
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
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-2">
            TECHNICAL PROJECTS
          </h2>
          <div className="space-y-2.5">
            {projects.map((proj, idx) => (
              <div key={proj.id || idx} className="text-xs">
                <div className="flex justify-between items-baseline font-bold">
                  <span>{proj.title}</span>
                  {proj.url && <span className="font-normal">{proj.url}</span>}
                </div>
                <p className="leading-relaxed">{proj.description}</p>
                {proj.technologies && (
                  <p className="italic text-[11px]">
                    <strong>Environment:</strong> {proj.technologies}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5">
            EDUCATION
          </h2>
          <div className="space-y-2">
            {education.map((edu, idx) => (
              <div key={edu.id || idx} className="text-xs">
                <div className="flex justify-between items-baseline font-bold">
                  <span>{edu.institution}</span>
                  <span className="font-normal">{edu.graduationYear}</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span>{edu.degree} in {edu.specialization}</span>
                  {edu.cgpa && <span>GPA: {edu.cgpa}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <section className="mb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5">
            CERTIFICATIONS & HONORS
          </h2>
          <ul className="list-disc list-outside ml-5 space-y-0.5 text-xs">
            {certifications.map((c, idx) => (
              <li key={c.id || idx}>
                <strong>{c.name}</strong> – {c.issuer} ({c.date})
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
