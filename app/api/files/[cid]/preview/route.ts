import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ cid: string }> }
) {
  try {
    const { cid } = await params;
    const { searchParams } = new URL(request.url);
    const hash = searchParams.get('hash');

    const headers = new Headers();
    request.headers.forEach((value, key) => {
      const lowerKey = key.toLowerCase();
      if (lowerKey !== 'host' && lowerKey !== 'content-length' && lowerKey !== 'content-type') {
        headers.set(key, value);
      }
    });

    const previewParams = hash ? `?hash=${encodeURIComponent(hash)}` : '';
    const backendUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8060'}/api/files/${cid}/preview${previewParams}`;

    const backendResponse = await fetch(backendUrl, {
      method: 'GET',
      headers,
    });

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json().catch(() => ({}));
      return NextResponse.json(errorData, { status: backendResponse.status });
    }

    const contentType = backendResponse.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      const data = await backendResponse.json();
      return NextResponse.json(data, { status: backendResponse.status });
    }

    const blob = await backendResponse.blob();
    return new NextResponse(blob, {
      status: backendResponse.status,
      headers: {
        'content-type': contentType || 'application/octet-stream',
      },
    });
  } catch (error) {
    console.error('File preview API route error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
