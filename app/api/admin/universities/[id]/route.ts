import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  console.log('DELETE /api/admin/universities/[id] called with id:', resolvedParams.id);
  try {
    const backendBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8060';
    const backendUrl = `${backendBaseUrl}/api/admin/universities/${resolvedParams.id}`;
    console.log('Forwarding to backend URL:', backendUrl);
    
    const requestHeaders = new Headers(request.headers);
    const headers = new Headers();
    
    requestHeaders.forEach((value, key) => {
      if (key.toLowerCase() !== 'host' && key.toLowerCase() !== 'content-length') {
        headers.set(key, value);
      }
    });
    console.log('Forwarding headers:', Object.fromEntries(headers));

    const backendResponse = await fetch(backendUrl, {
      method: 'DELETE',
      headers,
    });
    console.log('Backend response status:', backendResponse.status);

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json().catch(() => ({}));
      console.error('Backend error response:', errorData);
      return NextResponse.json(errorData, { status: backendResponse.status });
    }

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error('Proxy delete error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
