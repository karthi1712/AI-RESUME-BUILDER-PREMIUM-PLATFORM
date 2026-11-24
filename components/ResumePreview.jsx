'use client';

import React from 'react';
import { getTemplateComponent } from './templates';

export default function ResumePreview({ resume, scale = 1 }) {
  if (!resume) return null;
  const TemplateComponent = getTemplateComponent(resume.templateId);

  return (
    <div 
      className="origin-top transition-transform duration-150 mx-auto"
      style={{ transform: `scale(${scale})` }}
    >
      <div 
        id="resume-preview-container"
        className="w-[210mm] min-h-[297mm] bg-white text-slate-900 shadow-xl border border-slate-200/80 rounded-sm overflow-hidden"
      >
        <TemplateComponent data={resume} />
      </div>
    </div>
  );
}
