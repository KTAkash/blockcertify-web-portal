import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const params = await context.params;
  return handleProxyRequest(request, params.path);
}

export async function POST(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const params = await context.params;
  return handleProxyRequest(request, params.path);
}

export async function PUT(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const params = await context.params;
  return handleProxyRequest(request, params.path);
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const params = await context.params;
  return handleProxyRequest(request, params.path);
}

export async function PATCH(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const params = await context.params;
  return handleProxyRequest(request, params.path);
}

async function handleProxyRequest(request: NextRequest, pathSegments: string[]) {
  try {
    const backendUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8060'}/${pathSegments.join('/')}${request.nextUrl.search}`;
    
    const requestHeaders = new Headers(request.headers);
    const headers = new Headers();
    
    // Copy headers from original request except host and content-length
    requestHeaders.forEach((value, key) => {
      if (key.toLowerCase() !== 'host' && key.toLowerCase() !== 'content-length') {
        headers.set(key, value);
      }
    });

    const body = request.method !== 'GET' && request.method !== 'HEAD' 
      ? await request.text() 
      : undefined;

    const backendResponse = await fetch(backendUrl, {
      method: request.method,
      headers,
      body,
    });

    const responseHeaders = new Headers(backendResponse.headers);
    
    return new NextResponse(backendResponse.body, {
      status: backendResponse.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error('Proxy API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
