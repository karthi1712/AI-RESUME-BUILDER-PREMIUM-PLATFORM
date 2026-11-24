import { NextResponse } from 'next/server';
import { SAMPLE_RESUME } from '@/lib/resumeUtils';

export async function GET() {
  // Returns default demo resume list
  return NextResponse.json({
    success: true,
    resumes: [SAMPLE_RESUME]
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const resume = body.resume || body;
    return NextResponse.json({
      success: true,
      message: 'Resume received successfully',
      resumeId: resume.id || `resume-${Date.now()}`
    });
  } catch (e) {
    return NextResponse.json({ error: 'Invalid resume payload' }, { status: 400 });
  }
}
