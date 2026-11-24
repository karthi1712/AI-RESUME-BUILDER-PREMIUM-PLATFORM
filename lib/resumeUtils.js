// lib/resumeUtils.js

export const INITIAL_BLANK_RESUME = {
  id: '',
  title: 'Untitled Resume',
  templateId: 'modern-professional',
  accentColor: '#7c3aed',
  updatedAt: new Date().toISOString(),
  personalInfo: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    portfolio: '',
  },
  summary: '',
  education: [],
  experience: [],
  projects: [],
  skills: {
    programmingLanguages: [],
    frameworks: [],
    databases: [],
    tools: [],
    softSkills: []
  },
  certifications: [],
  achievements: []
};

export const SAMPLE_RESUME = {
  id: 'resume-demo-1',
  title: 'Full-Stack Developer Resume',
  templateId: 'modern-professional',
  accentColor: '#7c3aed',
  updatedAt: new Date().toISOString(),
  personalInfo: {
    fullName: 'Alex Morgan',
    jobTitle: 'Senior Full-Stack Software Engineer',
    email: 'alex.morgan@example.com',
    phone: '+1 (555) 342-8901',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexmorgan-dev',
    github: 'github.com/alexmorgan',
    portfolio: 'alexmorgan.dev',
  },
  summary: 'Innovative and results-driven Software Engineer with 5+ years of experience engineering high-performance web applications, scalable REST/GraphQL microservices, and cloud infrastructure. Passionate about clean architecture, developer experience, and modern front-end engineering with React and Next.js.',
  education: [
    {
      id: 'edu-1',
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      specialization: 'Computer Science',
      graduationYear: '2020',
      cgpa: '3.88 / 4.0'
    }
  ],
  experience: [
    {
      id: 'exp-1',
      company: 'Veloce Cloud Systems',
      jobTitle: 'Senior Full-Stack Engineer',
      duration: '2022 - Present',
      location: 'San Francisco, CA',
      responsibilities: [
        'Architected and led the migration of core dashboard to Next.js 14, improving page load speed by 48% and boosting SEO ranking.',
        'Engineered distributed asynchronous queue processing in Node.js and Redis, handling over 2.5 million daily API events.',
        'Spearheaded automated testing strategies with Jest and Playwright, achieving 92% unit and integration test code coverage.',
        'Mentored 6 junior and mid-level software engineers across agile sprints, code reviews, and system design sessions.'
      ]
    },
    {
      id: 'exp-2',
      company: 'Aura Interactive',
      jobTitle: 'Frontend Developer',
      duration: '2020 - 2022',
      location: 'San Jose, CA',
      responsibilities: [
        'Developed modular React design system components utilized across 4 customer-facing enterprise applications.',
        'Optimized complex data visualization charts with D3 and Canvas, eliminating render lag on datasets exceeding 50,000 nodes.',
        'Collaborated closely with product designers and backend teams to implement real-time collaborative workspace features via WebSockets.'
      ]
    }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'DevPulse – Real-Time Observability Hub',
      description: 'Built a lightweight monitoring dashboard displaying serverless telemetry, container metrics, and distributed tracing with interactive drill-downs.',
      technologies: 'Next.js, TypeScript, Tailwind CSS, Go, InfluxDB, Docker',
      url: 'https://github.com/alexmorgan/devpulse'
    },
    {
      id: 'proj-2',
      title: 'Synapse AI Docs Assistant',
      description: 'Created a contextual documentation assistant using semantic vector search and LLMs to assist developers in parsing SDK reference guides in real time.',
      technologies: 'React, Node.js, LangChain, Pinecone, OpenAI API',
      url: 'https://github.com/alexmorgan/synapse-docs'
    }
  ],
  skills: {
    programmingLanguages: ['JavaScript (ES6+)', 'TypeScript', 'Python', 'Go', 'SQL', 'HTML5/CSS3'],
    frameworks: ['React.js', 'Next.js', 'Node.js', 'Express', 'Tailwind CSS', 'Redux Toolkit', 'FastAPI'],
    databases: ['PostgreSQL', 'MongoDB', 'Redis', 'Supabase', 'Prisma'],
    tools: ['Git', 'Docker', 'Kubernetes', 'AWS (S3, Lambda)', 'Postman', 'Figma', 'Jest', 'Vercel'],
    softSkills: ['Technical Leadership', 'Cross-functional Collaboration', 'Problem Solving', 'Agile/Scrum', 'Mentorship']
  },
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect – Associate',
      issuer: 'Amazon Web Services',
      date: '2023',
      url: 'https://aws.amazon.com/verification'
    },
    {
      id: 'cert-2',
      name: 'Meta Certified Professional Front-End Engineer',
      issuer: 'Meta & Coursera',
      date: '2021',
      url: 'https://coursera.org/verify'
    }
  ],
  achievements: [
    {
      id: 'ach-1',
      title: '1st Place – Global Cloud Engineering Hackathon 2023',
      description: 'Built an AI-driven disaster response dispatch coordination system recognized out of 380 global submissions.'
    },
    {
      id: 'ach-2',
      title: 'Top Contributor Award – Open Source JS Ecosystem',
      description: 'Authored and maintain popular React micro-utility libraries with over 450,000 monthly downloads.'
    }
  ]
};

export const TEMPLATES_CONFIG = [
  {
    id: 'modern-professional',
    name: 'Modern Professional',
    description: 'Clean contemporary design with structured section dividers, subtle accents, and optimal whitespace.',
    tier: 'Free',
    isPremium: false,
    badge: 'Popular',
    category: 'General / Tech',
    color: '#7c3aed'
  },
  {
    id: 'minimal-clean',
    name: 'Minimal Clean',
    description: 'Ultra-refined typography, minimalist monochromatic hierarchy inspired by modern design agencies.',
    tier: 'Free',
    isPremium: false,
    badge: 'Recommended',
    category: 'Design & Product',
    color: '#18181b'
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Prestigious, authoritative layout with navy & gold accents tailored for managerial and executive roles.',
    tier: 'Premium',
    isPremium: true,
    badge: 'Executive',
    category: 'Leadership / Business',
    color: '#1e3a8a'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Modern two-column asymmetric layout with vibrant accents ideal for UI/UX, marketing, and creative fields.',
    tier: 'Premium',
    isPremium: true,
    badge: 'Creative',
    category: 'Marketing & Design',
    color: '#0d9488'
  },
  {
    id: 'technical-dev',
    name: 'Technical Developer',
    description: 'Engineered specifically for coders, featuring technology stack chips, GitHub highlights, and project stats.',
    tier: 'Free',
    isPremium: false,
    badge: 'Developer',
    category: 'Engineering / Data',
    color: '#2563eb'
  },
  {
    id: 'classic-ats',
    name: 'Classic ATS',
    description: 'High-parsing single-column layout strictly formatted to maximize robotic ATS parser compliance.',
    tier: 'Free',
    isPremium: false,
    badge: 'ATS 99%',
    category: 'Strict ATS Standard',
    color: '#334155'
  }
];

export function calculateCompleteness(resume) {
  if (!resume) return 0;
  let score = 0;
  let totalWeights = 0;

  const checks = [
    { weight: 20, check: () => !!resume.personalInfo?.fullName && !!resume.personalInfo?.email && !!resume.personalInfo?.phone },
    { weight: 15, check: () => !!resume.summary && resume.summary.length > 50 },
    { weight: 20, check: () => resume.experience && resume.experience.length > 0 },
    { weight: 15, check: () => resume.education && resume.education.length > 0 },
    { weight: 15, check: () => {
      const s = resume.skills || {};
      const count = (s.programmingLanguages?.length || 0) + (s.frameworks?.length || 0) + (s.databases?.length || 0) + (s.tools?.length || 0) + (s.softSkills?.length || 0);
      return count >= 5;
    }},
    { weight: 10, check: () => resume.projects && resume.projects.length > 0 },
    { weight: 5, check: () => (resume.certifications && resume.certifications.length > 0) || (resume.achievements && resume.achievements.length > 0) },
  ];

  checks.forEach(item => {
    totalWeights += item.weight;
    if (item.check()) {
      score += item.weight;
    }
  });

  return Math.round((score / totalWeights) * 100);
}

export const SAMPLE_JOB_DESCRIPTIONS = [
  {
    role: 'Senior Full-Stack Engineer',
    company: 'NextGen Cloud',
    text: `We are looking for a Senior Full-Stack Software Engineer with experience in React, Next.js, TypeScript, and Node.js.
Requirements:
- 4+ years building scalable web applications with React, Next.js, and modern JavaScript.
- Strong backend experience with Node.js, Express, REST APIs, GraphQL, and microservices architecture.
- Solid experience with relational and NoSQL databases like PostgreSQL, Redis, and MongoDB.
- Familiarity with cloud providers (AWS, Docker, Kubernetes, CI/CD pipelines).
- Experience leading agile teams, conducting code reviews, and maintaining unit test coverage (Jest, Playwright).
- Excellent communication, cross-functional teamwork, and architectural problem-solving skills.`
  },
  {
    role: 'Frontend Developer',
    company: 'Starlight Design Studio',
    text: `Starlight is seeking a passionate Frontend Developer to craft beautiful, responsive user interfaces.
Requirements:
- Deep expertise in JavaScript, React.js, Tailwind CSS, HTML5, and CSS3.
- Proven experience with state management, responsive web design, and WebSockets.
- Experience writing reusable design system components and ensuring accessibility (WCAG).
- Familiarity with Git, Figma, performance optimization, and front-end automated testing.
- Creative mindset, attention to micro-interactions, and strong collaboration with UX designers.`
  },
  {
    role: 'Data Scientist / ML Engineer',
    company: 'Acuity Analytics',
    text: `Seeking an ML Engineer with strong Python, machine learning, and data engineering foundation.
Requirements:
- Proficiency in Python, SQL, pandas, NumPy, scikit-learn, and PyTorch or TensorFlow.
- Experience deploying machine learning models into production via FastAPI or Docker.
- Experience with cloud pipelines on AWS or GCP.
- Background in statistics, predictive modeling, data visualization, and large language models (LLMs).`
  }
];
