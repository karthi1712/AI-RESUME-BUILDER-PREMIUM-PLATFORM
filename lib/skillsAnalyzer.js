// lib/skillsAnalyzer.js

// Predefined taxonomy dictionary for skill categorization & learning paths
const SKILL_TAXONOMY = {
  programmingLanguages: [
    'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'go', 'golang', 'rust',
    'ruby', 'php', 'swift', 'kotlin', 'sql', 'html', 'css', 'bash', 'shell', 'r', 'dart'
  ],
  frameworks: [
    'react', 'react.js', 'next.js', 'vue', 'vue.js', 'angular', 'svelte', 'node.js',
    'express', 'express.js', 'fastapi', 'django', 'flask', 'spring', 'spring boot',
    'tailwind', 'tailwind css', 'bootstrap', 'redux', 'graphql', 'nest.js', 'laravel'
  ],
  databases: [
    'postgresql', 'postgres', 'mongodb', 'mysql', 'redis', 'elasticsearch', 'supabase',
    'firebase', 'dynamodb', 'sqlite', 'cassandra', 'oracle', 'prisma'
  ],
  tools: [
    'git', 'github', 'docker', 'kubernetes', 'aws', 'gcp', 'azure', 'ci/cd', 'jenkins',
    'postman', 'figma', 'jira', 'linux', 'webpack', 'vite', 'terraform', 'jest',
    'cypress', 'playwright', 'vercel'
  ],
  softSkills: [
    'leadership', 'teamwork', 'communication', 'problem solving', 'critical thinking',
    'agile', 'scrum', 'mentorship', 'time management', 'cross-functional collaboration',
    'adaptability', 'project management'
  ]
};

// Learning recommendations map for missing skills
const LEARNING_RESOURCES = {
  'docker': {
    title: 'Containerization & Docker Fundamentals',
    level: 'Intermediate',
    duration: '6 hours',
    resource: 'Docker Official Docs & Interactive Labs'
  },
  'kubernetes': {
    title: 'Kubernetes for Cloud-Native Engineers',
    level: 'Advanced',
    duration: '12 hours',
    resource: 'Kubernetes Hands-on Workshop'
  },
  'aws': {
    title: 'AWS Cloud Architecture Practitioner',
    level: 'Intermediate',
    duration: '15 hours',
    resource: 'AWS Skill Builder & Free Cloud Quests'
  },
  'typescript': {
    title: 'TypeScript for Production Web Apps',
    level: 'Beginner to Pro',
    duration: '8 hours',
    resource: 'Total TypeScript Core Curriculum'
  },
  'postgresql': {
    title: 'Advanced Relational Database Design & Indexing',
    level: 'Intermediate',
    duration: '10 hours',
    resource: 'Use The Index, Luke! & Postgres Guide'
  },
  'next.js': {
    title: 'Next.js App Router Masterclass',
    level: 'Intermediate',
    duration: '8 hours',
    resource: 'Next.js Official Interactive Learn Portal'
  },
  'redis': {
    title: 'High-Throughput In-Memory Caching with Redis',
    level: 'Intermediate',
    duration: '4 hours',
    resource: 'Redis University (RU101)'
  },
  'testing': {
    title: 'Test-Driven Development (TDD) with Jest & RTL',
    level: 'Intermediate',
    duration: '6 hours',
    resource: 'TestingJavaScript by Kent C. Dodds'
  },
  'graphql': {
    title: 'GraphQL API Design & Apollo Client Integration',
    level: 'Intermediate',
    duration: '5 hours',
    resource: 'Odyssey by Apollo GraphQL'
  },
  'python': {
    title: 'Python for Scalable Backend Microservices',
    level: 'Beginner to Intermediate',
    duration: '14 hours',
    resource: 'Python.org & Real Python Tutorials'
  }
};

export function analyzeResumeSkills(resume, jobDescription = '') {
  if (!resume) return null;

  // 1. Extract existing skills strictly from user's resume (Do NOT invent non-provided skills)
  const rawLanguages = resume.skills?.programmingLanguages || [];
  const rawFrameworks = resume.skills?.frameworks || [];
  const rawDatabases = resume.skills?.databases || [];
  const rawTools = resume.skills?.tools || [];
  const rawSoftSkills = resume.skills?.softSkills || [];

  // Also scan user's project descriptions or summary for explicit technical mentions
  const resumeText = [
    resume.summary || '',
    ...(resume.experience || []).flatMap(e => [e.company, e.jobTitle, ...(e.responsibilities || [])]),
    ...(resume.projects || []).flatMap(p => [p.title, p.description, p.technologies || ''])
  ].join(' ').toLowerCase();

  // Combine unique extracted user skills
  const allUserSkills = Array.from(new Set([
    ...rawLanguages,
    ...rawFrameworks,
    ...rawDatabases,
    ...rawTools,
    ...rawSoftSkills
  ])).filter(Boolean);

  // 2. Identify skills required in the Job Description (if provided)
  const requiredInJD = [];
  if (jobDescription && jobDescription.trim().length > 15) {
    const jdLower = jobDescription.toLowerCase();
    
    // Check against taxonomy keys
    Object.values(SKILL_TAXONOMY).flat().forEach(skill => {
      // Regex check with word boundaries
      const regex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      if (regex.test(jdLower)) {
        if (!requiredInJD.includes(skill)) {
          requiredInJD.push(skill);
        }
      }
    });
  }

  // 3. Compare matching vs missing
  const matchedSkills = [];
  const missingSkills = [];

  const userSkillsNormalized = allUserSkills.map(s => s.toLowerCase().trim());

  if (requiredInJD.length > 0) {
    requiredInJD.forEach(skill => {
      const isFound = userSkillsNormalized.some(us => us.includes(skill) || skill.includes(us)) ||
                      resumeText.includes(skill);
      if (isFound) {
        matchedSkills.push(skill);
      } else {
        missingSkills.push(skill);
      }
    });
  } else {
    // If no JD is entered, show user skills as active and suggest standard industry complementary skills
    const complementaryDefaults = ['docker', 'aws', 'typescript', 'postgresql', 'testing'];
    complementaryDefaults.forEach(def => {
      const isFound = userSkillsNormalized.some(us => us.includes(def) || def.includes(us)) || resumeText.includes(def);
      if (!isFound) {
        missingSkills.push(def);
      }
    });
  }

  // 4. Generate specific learning recommendations for detected missing skills
  const recommendations = missingSkills.slice(0, 5).map(skill => {
    const lower = skill.toLowerCase();
    const matchedResourceKey = Object.keys(LEARNING_RESOURCES).find(k => lower.includes(k) || k.includes(lower));
    if (matchedResourceKey) {
      return {
        skillName: skill.toUpperCase(),
        ...LEARNING_RESOURCES[matchedResourceKey]
      };
    }
    return {
      skillName: skill.toUpperCase(),
      title: `Mastering ${skill} for Modern Teams`,
      level: 'Recommended Skill',
      duration: '5-8 hours',
      resource: `Official documentation and practice tutorials for ${skill}`
    };
  });

  // Calculate Match Percentage
  const matchRate = requiredInJD.length > 0
    ? Math.round((matchedSkills.length / requiredInJD.length) * 100)
    : 85;

  return {
    totalSkillsCount: allUserSkills.length,
    userSkillsByCategory: {
      programmingLanguages: rawLanguages,
      frameworks: rawFrameworks,
      databases: rawDatabases,
      tools: rawTools,
      softSkills: rawSoftSkills
    },
    allUserSkills,
    requiredInJD,
    matchedSkills,
    missingSkills,
    matchRate,
    recommendations
  };
}
