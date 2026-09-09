import { NextResponse } from 'next/server';
import { testEmailOctopusConnection } from '@/lib/email/emailoctopus';

export async function GET() {
  try {
    const status = await testEmailOctopusConnection();
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      service: 'EmailOctopus v2 API',
      ...status,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to check EmailOctopus connection',
      },
      { status: 500 }
    );
  }
}
