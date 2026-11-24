import { NextResponse } from 'next/server';
import { analyzeResumeATS } from '@/lib/atsAnalyzer';

export async function POST(request) {
  try {
    const body = await request.json();
    const { resume, targetRole, jobDescription } = body;

    if (!resume) {
      return NextResponse.json({ error: 'Resume payload is required' }, { status: 400 });
    }

    const report = analyzeResumeATS(resume, targetRole, jobDescription);
    return NextResponse.json({ success: true, report });
  } catch (error) {
    console.error('API Error in analyze-ats:', error);
    return NextResponse.json({ error: 'Failed to process ATS evaluation' }, { status: 500 });
  }
}
