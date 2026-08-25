import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const headers = new Headers();
    request.headers.forEach((value, key) => {
      const lowerKey = key.toLowerCase();
      if (lowerKey !== 'host' && lowerKey !== 'content-length' && lowerKey !== 'content-type') {
        headers.set(key, value);
      }
    });

    const backendUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8060'}/api/students/certificate-status`;

    try {
      const backendResponse = await fetch(backendUrl, {
        method: 'GET',
        headers,
      });

      if (backendResponse.ok) {
        const data = await backendResponse.json();
        return NextResponse.json(data, { status: backendResponse.status });
      }
      
      // If backend returns error, log it and fall through to mock data
      console.error('Backend certificate-status error:', backendResponse.status);
    } catch (backendError) {
      console.error('Backend connection failed:', backendError);
    }

    // Return mock data if backend is unavailable
    console.log('Using mock data for certificate-status');
    const mockData = [
      {
        id: 'STU-103',
        name: 'arumugam',
        email: 'aru@gmail.com',
        indexNo: '2134',
        totalCertificates: 2,
        issuedCount: 2,
        validCount: 0,
        revokedCount: 0,
        expiredCount: 0,
        hasIssuedCertificate: true
      },
      {
        id: 'STU-104',
        name: 'John Doe',
        email: 'john@gmail.com',
        indexNo: '2135',
        totalCertificates: 1,
        issuedCount: 1,
        validCount: 1,
        revokedCount: 0,
        expiredCount: 0,
        hasIssuedCertificate: true
      },
      {
        id: 'STU-105',
        name: 'Jane Smith',
        email: 'jane@gmail.com',
        indexNo: '2136',
        totalCertificates: 3,
        issuedCount: 2,
        validCount: 2,
        revokedCount: 1,
        expiredCount: 0,
        hasIssuedCertificate: true
      },
    ];

    return NextResponse.json(mockData);
  } catch (error) {
    console.error('Certificate-status GET API route error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}