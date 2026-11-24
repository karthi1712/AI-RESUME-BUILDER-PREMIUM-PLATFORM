import ModernProfessional from './ModernProfessional';
import MinimalClean from './MinimalClean';
import Executive from './Executive';
import Creative from './Creative';
import TechnicalDev from './TechnicalDev';
import ClassicATS from './ClassicATS';

export const TEMPLATE_COMPONENTS = {
  'modern-professional': ModernProfessional,
  'minimal-clean': MinimalClean,
  'executive': Executive,
  'creative': Creative,
  'technical-dev': TechnicalDev,
  'classic-ats': ClassicATS
};

export function getTemplateComponent(templateId) {
  return TEMPLATE_COMPONENTS[templateId] || ModernProfessional;
}
