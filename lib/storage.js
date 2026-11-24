// lib/storage.js
import { SAMPLE_RESUME } from './resumeUtils';

const RESUMES_KEY = 'resumeai_saved_resumes';
const USER_KEY = 'resumeai_auth_user';
const SUBSCRIPTION_KEY = 'resumeai_user_subscription';
const ACTIVE_RESUME_ID_KEY = 'resumeai_active_resume_id';

export function isBrowser() {
  return typeof window !== 'undefined';
}

export function getStoredResumes() {
  if (!isBrowser()) return [SAMPLE_RESUME];
  try {
    const raw = localStorage.getItem(RESUMES_KEY);
    if (!raw) {
      // Seed with sample resume
      const initial = [SAMPLE_RESUME];
      localStorage.setItem(RESUMES_KEY, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [SAMPLE_RESUME];
  } catch (e) {
    console.error('Error reading resumes from localStorage', e);
    return [SAMPLE_RESUME];
  }
}

export function saveResume(resume) {
  if (!isBrowser() || !resume) return;
  try {
    const resumes = getStoredResumes();
    const resumeToSave = {
      ...resume,
      id: resume.id || `resume-${Date.now()}`,
      updatedAt: new Date().toISOString()
    };
    const index = resumes.findIndex(r => r.id === resumeToSave.id);
    let updated;
    if (index >= 0) {
      updated = [...resumes];
      updated[index] = resumeToSave;
    } else {
      updated = [resumeToSave, ...resumes];
    }
    localStorage.setItem(RESUMES_KEY, JSON.stringify(updated));
    setActiveResumeId(resumeToSave.id);
    return resumeToSave;
  } catch (e) {
    console.error('Error saving resume to localStorage', e);
    return resume;
  }
}

export function getResumeById(id) {
  const resumes = getStoredResumes();
  return resumes.find(r => r.id === id) || resumes[0] || SAMPLE_RESUME;
}

export function deleteResume(id) {
  if (!isBrowser()) return;
  try {
    const resumes = getStoredResumes();
    const filtered = resumes.filter(r => r.id !== id);
    localStorage.setItem(RESUMES_KEY, JSON.stringify(filtered.length > 0 ? filtered : [SAMPLE_RESUME]));
    return filtered;
  } catch (e) {
    console.error('Error deleting resume from localStorage', e);
  }
}

export function duplicateResume(id) {
  const original = getResumeById(id);
  if (!original) return null;
  const duplicate = {
    ...JSON.parse(JSON.stringify(original)),
    id: `resume-${Date.now()}`,
    title: `${original.title} (Copy)`,
    updatedAt: new Date().toISOString()
  };
  return saveResume(duplicate);
}

export function getActiveResumeId() {
  if (!isBrowser()) return SAMPLE_RESUME.id;
  return localStorage.getItem(ACTIVE_RESUME_ID_KEY) || SAMPLE_RESUME.id;
}

export function setActiveResumeId(id) {
  if (!isBrowser()) return;
  localStorage.setItem(ACTIVE_RESUME_ID_KEY, id);
}

// User Auth simulation
export function getStoredUser() {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) {
      // Default logged in demo user for seamless college demo
      const defaultUser = {
        name: 'Alex Morgan',
        email: 'alex.morgan@example.com',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        role: 'Pro Member',
        joinedDate: 'Jan 2024'
      };
      localStorage.setItem(USER_KEY, JSON.stringify(defaultUser));
      return defaultUser;
    }
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

export function setStoredUser(user) {
  if (!isBrowser()) return;
  if (!user) {
    localStorage.removeItem(USER_KEY);
  } else {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
}

export function logoutUser() {
  if (!isBrowser()) return;
  localStorage.removeItem(USER_KEY);
}

// Subscription simulation
export function getStoredSubscription() {
  if (!isBrowser()) return { plan: 'Pro', billing: 'Monthly', status: 'Active', renewDate: 'Dec 24, 2026' };
  try {
    const raw = localStorage.getItem(SUBSCRIPTION_KEY);
    if (!raw) {
      const defaultSub = { plan: 'Pro', billing: 'Monthly', status: 'Active', renewDate: 'Dec 24, 2026' };
      localStorage.setItem(SUBSCRIPTION_KEY, JSON.stringify(defaultSub));
      return defaultSub;
    }
    return JSON.parse(raw);
  } catch (e) {
    return { plan: 'Pro', billing: 'Monthly', status: 'Active', renewDate: 'Dec 24, 2026' };
  }
}

export function setStoredSubscription(sub) {
  if (!isBrowser()) return;
  localStorage.setItem(SUBSCRIPTION_KEY, JSON.stringify(sub));
}
