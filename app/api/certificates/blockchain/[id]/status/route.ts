import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { id } = params;

    const headers = new Headers();
    request.headers.forEach((value, key) => {
      const lowerKey = key.toLowerCase();
      if (lowerKey !== 'host' && lowerKey !== 'content-length') {
        headers.set(key, value);
      }
    });
    headers.set('Content-Type', 'application/json');

    const backendUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8060'}/api/certificates/blockchain/${id}/status`;

    const backendResponse = await fetch(backendUrl, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(body),
    });

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json().catch(() => ({}));
      return NextResponse.json(errorData, { status: backendResponse.status });
    }

    const data = await backendResponse.json();
    return NextResponse.json(data, { status: backendResponse.status });
  } catch (error) {
    console.error('Certificate status PATCH API route error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
