import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const pythonBackendUrl = process.env.PYTHON_BACKEND_URL || 'http://127.0.0.1:8000';

    // Forward multipart form data to Python FastAPI backend
    const response = await fetch(`${pythonBackendUrl}/api/v1/scan`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: errorText || 'Failed to scan documents in Python backend' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('[API /api/documents/scan] Error communicating with Python backend:', error);
    return NextResponse.json(
      {
        error: 'Unable to connect to document analysis engine. Please ensure Python backend is running.',
      },
      { status: 503 }
    );
  }
}
