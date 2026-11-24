import './globals.css';

export const metadata = {
  title: 'ResumeAI – AI Resume Builder & Premium Career Platform',
  description: 'Create professional, ATS-friendly resumes in minutes with smart tools, ATS scoring, and modern designer templates.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#fafafb] text-slate-900 antialiased selection:bg-purple-100 selection:text-purple-700">
        {children}
      </body>
    </html>
  );
}
