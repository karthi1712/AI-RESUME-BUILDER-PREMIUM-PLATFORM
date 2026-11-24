# ResumeAI – AI Resume Builder & Premium Career Platform

A modern, responsive, ATS-friendly AI Resume Builder SaaS web application built with **Next.js (App Router)**, **React.js**, **Tailwind CSS**, and **Lucide React**.

![ResumeAI Platform](https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&auto=format&fit=crop&q=80)

---

## ✨ Key Features

- **Interactive Two-Column Resume Editor**: Real-time live preview update with zoom and responsive mobile mode.
- **6 Designer ATS-Compliant Templates**:
  1. *Modern Professional* (Structured contemporary tech layout)
  2. *Minimal Clean* (Linear/Notion-inspired monochromatic typography)
  3. *Executive* (Navy/gold accent corporate leadership format)
  4. *Creative* (Teal asymmetric sidebar layout for UI/UX & marketing)
  5. *Technical Developer* (Code-styled chips, GitHub links, and tech stack matrices)
  6. *Classic ATS* (High-parsing single-column standard format)
- **Automated ATS Scoring Engine**:
  - Overall ATS readiness percentage score.
  - Job description keyword comparison (matched vs. missing keywords).
  - Section completeness checklist.
  - Action-oriented recommendations.
- **Skills Gap Analysis & Learning Paths**:
  - Automatic extraction of user skills by category (Languages, Frameworks, Databases, Tools, Soft Skills).
  - Target role skills gap detection.
  - Curated course and learning path recommendations.
- **High-Resolution Vector PDF Export**:
  - One-click export via `html2canvas` and `jspdf` preserving crisp typography.
  - Print dialog integration.
- **User Dashboard & Multi-Resume Management**:
  - Save, edit, duplicate, and delete multiple drafts.
  - Completeness meters and last modified trackers.
- **Local Persistence & MongoDB Ready**:
  - Instant client-side persistence in browser `localStorage`.
  - Next.js server-side API route handlers for ATS analysis and resumes.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Library**: React 18 (JavaScript & JSX)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Exporting**: html2canvas & jspdf
- **Persistence**: LocalStorage with Next.js API Routes

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📄 License
MIT License. Created for professional and academic demonstration.
