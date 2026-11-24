'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  User, 
  Mail, 
  Shield, 
  Trash2, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  Database
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getStoredUser, setStoredUser, getStoredResumes, saveResume } from '@/lib/storage';
import { SAMPLE_RESUME } from '@/lib/resumeUtils';

export default function SettingsPage() {
  const [user, setUser] = useState({ name: '', email: '', role: 'Pro Member' });
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const u = getStoredUser();
    if (u) setUser(u);
  }, []);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setStoredUser(user);
    setStatusMessage('Profile updated successfully!');
    setTimeout(() => setStatusMessage(''), 3000);
  };

  const handleResetData = () => {
    if (confirm('Are you sure you want to restore default demo resume data? Any unsaved edits will be replaced with clean sample data.')) {
      localStorage.clear();
      saveResume(SAMPLE_RESUME);
      setStoredUser({
        name: 'Alex Morgan',
        email: 'alex.morgan@example.com',
        role: 'Pro Member',
        joinedDate: 'Nov 2026'
      });
      alert('Local storage refreshed with clean sample data.');
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fc]">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full space-y-8">
        
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Account & Application Settings
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Configure profile preferences, manage local data persistence, and control application defaults.
          </p>
        </div>

        {statusMessage && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-5">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <User className="w-4 h-4 text-purple-600" />
              User Profile
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Your display name and account email</p>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4 max-w-lg">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={user.name || ''}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                value={user.email || ''}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Account Role</label>
              <input
                type="text"
                disabled
                value={user.role || 'Pro Member'}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 shadow-2xs"
              >
                Save Profile
              </button>
            </div>
          </form>
        </div>

        {/* Data Persistence & Reset */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Database className="w-4 h-4 text-slate-600" />
              Demo Data Management
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Reset demo state, restore default test candidates, or wipe test cache.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <h3 className="text-xs font-bold text-slate-800">Restore Default Demo Resumes</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Resets all local drafts to the official high-performing sample profiles.
              </p>
            </div>
            <button
              type="button"
              onClick={handleResetData}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-rose-600 bg-white hover:bg-rose-50 border border-rose-200 shadow-2xs whitespace-nowrap"
            >
              Reset Data to Default
            </button>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
