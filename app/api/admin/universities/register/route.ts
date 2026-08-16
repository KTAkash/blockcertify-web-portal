import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('POST /api/admin/universities/register called');
  try {
    const body = await request.json();
    console.log('Request body:', body);
    const backendBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8060';
    const backendUrl = `${backendBaseUrl}/api/admin/universities/register`;
    console.log('Forwarding to backend URL:', backendUrl);
    
    const requestHeaders = new Headers(request.headers);
    const headers = new Headers();
    
    // Copy headers from original request
    requestHeaders.forEach((value, key) => {
      if (key.toLowerCase() !== 'host' && key.toLowerCase() !== 'content-length') {
        headers.set(key, value);
      }
    });
    console.log('Forwarding headers:', Object.fromEntries(headers));

    const backendResponse = await fetch(backendUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
    console.log('Backend response status:', backendResponse.status);

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json().catch(() => ({}));
      console.error('Backend error response:', errorData);
      return NextResponse.json(errorData, { status: backendResponse.status });
    }

    const data = await backendResponse.json();
    console.log('Backend response data:', data);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Register university API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
