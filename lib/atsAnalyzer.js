// lib/atsAnalyzer.js

// Rule-based ATS analysis engine
export function analyzeResumeATS(resume, targetRole = '', jobDescription = '') {
  if (!resume) {
    return {
      overallScore: 0,
      breakdown: { content: 0, keywords: 0, format: 0, completeness: 0 },
      matchedKeywords: [],
      missingKeywords: [],
      strengths: [],
      improvements: [],
      formattingAlerts: [],
      sectionHealth: []
    };
  }

  // 1. Text aggregation
  const allResumeText = [
    resume.personalInfo?.fullName || '',
    resume.personalInfo?.jobTitle || '',
    resume.summary || '',
    ...(resume.experience || []).flatMap(e => [e.company, e.jobTitle, ...(e.responsibilities || [])]),
    ...(resume.education || []).flatMap(ed => [ed.institution, ed.degree, ed.specialization]),
    ...(resume.projects || []).flatMap(p => [p.title, p.description, p.technologies]),
    ...(resume.skills?.programmingLanguages || []),
    ...(resume.skills?.frameworks || []),
    ...(resume.skills?.databases || []),
    ...(resume.skills?.tools || []),
    ...(resume.skills?.softSkills || []),
    ...(resume.certifications || []).map(c => c.name),
    ...(resume.achievements || []).map(a => `${a.title} ${a.description}`)
  ].join(' ').toLowerCase();

  // 2. Keyword analysis against job description or standard role keywords
  let keywordsToCheck = [];
  if (jobDescription && jobDescription.trim().length > 20) {
    // Extract prominent words / skills from job description
    const rawTokens = jobDescription
      .toLowerCase()
      .replace(/[^a-z0-9#+.\s-]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 2);

    const stopwords = new Set([
      'the', 'and', 'with', 'for', 'that', 'this', 'have', 'from', 'they', 'will', 'you',
      'your', 'our', 'are', 'not', 'can', 'has', 'was', 'were', 'been', 'about', 'into',
      'more', 'their', 'which', 'who', 'what', 'work', 'working', 'team', 'teams', 'year',
      'years', 'must', 'role', 'looking', 'seeking', 'join', 'opportunity', 'company', 'candidate',
      'strong', 'good', 'ability', 'required', 'skills', 'experience', 'preferred', 'plus'
    ]);

    const freqMap = {};
    rawTokens.forEach(token => {
      if (!stopwords.has(token) && isNaN(token)) {
        freqMap[token] = (freqMap[token] || 0) + 1;
      }
    });

    keywordsToCheck = Object.entries(freqMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 16)
      .map(entry => entry[0]);
  } else {
    // Standard tech & professional keywords based on target role or defaults
    keywordsToCheck = [
      'react', 'javascript', 'api', 'performance', 'database', 'cloud', 'architecture',
      'testing', 'agile', 'leadership', 'collaboration', 'optimization', 'ci/cd', 'security',
      'git', 'responsive'
    ];
  }

  const matchedKeywords = [];
  const missingKeywords = [];

  keywordsToCheck.forEach(kw => {
    if (allResumeText.includes(kw.toLowerCase())) {
      matchedKeywords.push(kw);
    } else {
      missingKeywords.push(kw);
    }
  });

  const keywordScore = keywordsToCheck.length > 0 
    ? Math.round((matchedKeywords.length / keywordsToCheck.length) * 100) 
    : 80;

  // 3. Section Completeness & Health
  const sectionHealth = [
    {
      name: 'Contact Information',
      passed: !!(resume.personalInfo?.fullName && resume.personalInfo?.email && resume.personalInfo?.phone && resume.personalInfo?.location),
      detail: 'Name, email, phone number, and physical city/location are essential for recruiters.'
    },
    {
      name: 'Professional Summary',
      passed: !!(resume.summary && resume.summary.length >= 60),
      detail: resume.summary?.length >= 60 ? 'Strong elevator pitch summary present.' : 'Summary is too brief or missing.'
    },
    {
      name: 'Work Experience',
      passed: (resume.experience?.length || 0) > 0,
      detail: (resume.experience?.length || 0) > 0 ? `${resume.experience.length} position(s) documented with bullet points.` : 'No work experience listed.'
    },
    {
      name: 'Education',
      passed: (resume.education?.length || 0) > 0,
      detail: (resume.education?.length || 0) > 0 ? 'Degree and academic institution recorded.' : 'Education details missing.'
    },
    {
      name: 'Categorized Skills',
      passed: (
        (resume.skills?.programmingLanguages?.length || 0) +
        (resume.skills?.frameworks?.length || 0) +
        (resume.skills?.tools?.length || 0)
      ) >= 5,
      detail: 'Core technical proficiencies and tooling categorized.'
    },
    {
      name: 'Projects & Portfolio',
      passed: (resume.projects?.length || 0) > 0,
      detail: (resume.projects?.length || 0) > 0 ? `${resume.projects.length} project(s) showcased.` : 'Add hands-on projects to demonstrate practical competency.'
    }
  ];

  const passedSections = sectionHealth.filter(s => s.passed).length;
  const completenessScore = Math.round((passedSections / sectionHealth.length) * 100);

  // 4. Action Verbs & Measurable Metrics in Experience
  const actionVerbs = ['architected', 'spearheaded', 'engineered', 'developed', 'optimized', 'reduced', 'increased', 'led', 'designed', 'automated', 'integrated', 'delivered', 'built', 'boosted', 'collaborated'];
  let actionVerbCount = 0;
  let metricCount = 0;

  const expBullets = (resume.experience || []).flatMap(e => e.responsibilities || []);
  expBullets.forEach(b => {
    const lower = b.toLowerCase();
    actionVerbs.forEach(v => {
      if (lower.includes(v)) actionVerbCount++;
    });
    // Check for numbers or percentages (e.g. 40%, $50k, 100k, 3x)
    if (/\d+[%xXkKMm]|\d+\s*(users|clients|percent|days|hours|teams)/.test(b)) {
      metricCount++;
    }
  });

  let contentScore = 50;
  if (actionVerbCount >= 4) contentScore += 25;
  else if (actionVerbCount >= 2) contentScore += 15;
  if (metricCount >= 2) contentScore += 25;
  else if (metricCount >= 1) contentScore += 15;

  // 5. Formatting & Readability checks
  const formattingAlerts = [];
  let formatScore = 95;

  if (!resume.personalInfo?.linkedin && !resume.personalInfo?.github) {
    formattingAlerts.push('Missing professional links: Consider adding a LinkedIn or GitHub profile link.');
    formatScore -= 10;
  }
  if (resume.summary && resume.summary.length > 500) {
    formattingAlerts.push('Summary length warning: Your professional summary is over 500 characters. Keep it crisp (3-4 sentences max).');
    formatScore -= 10;
  }
  if (expBullets.length > 0 && expBullets.some(b => b.length < 25)) {
    formattingAlerts.push('Vague bullet points detected: Expand short bullet points into action + impact statements.');
    formatScore -= 5;
  }

  // 6. Strengths & Improvements
  const strengths = [];
  const improvements = [];

  if (keywordScore >= 70) {
    strengths.push(`High keyword correlation (${keywordScore}% match) with target industry profile.`);
  } else {
    improvements.push(`Include more targeted industry keywords such as: ${missingKeywords.slice(0, 4).join(', ')}.`);
  }

  if (metricCount >= 2) {
    strengths.push('Excellent use of quantified metrics (% throughput, user counts, latency reductions) in work experience.');
  } else {
    improvements.push('Add quantified achievements (e.g., "Increased performance by 30%", "Saved 5 hours weekly") to make experience stand out.');
  }

  if (passedSections === sectionHealth.length) {
    strengths.push('All standard resume sections are present and thoroughly populated.');
  } else {
    improvements.push('Fill in empty resume sections to avoid ATS parser disqualification penalties.');
  }

  if (resume.skills?.softSkills?.length >= 3) {
    strengths.push('Good balance of hard engineering competencies and interpersonal leadership skills.');
  }

  // Calculate Weighted Overall Score
  const overallScore = Math.min(98, Math.max(25, Math.round(
    (keywordScore * 0.35) +
    (completenessScore * 0.30) +
    (contentScore * 0.20) +
    (formatScore * 0.15)
  )));

  return {
    overallScore,
    targetRole: targetRole || resume.personalInfo?.jobTitle || 'General Professional',
    breakdown: {
      keywords: keywordScore,
      completeness: completenessScore,
      content: contentScore,
      format: formatScore
    },
    matchedKeywords,
    missingKeywords,
    strengths,
    improvements,
    formattingAlerts,
    sectionHealth
  };
}
