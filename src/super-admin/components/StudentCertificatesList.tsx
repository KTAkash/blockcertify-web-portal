"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/src/apiHelper/api';
import type { StudentCertificateStatus } from '@/src/interfaces/auth';

function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4 4H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 20H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function StudentCertificatesList() {
  const router = useRouter();
  const [students, setStudents] = useState<StudentCertificateStatus[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingMockData, setUsingMockData] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedStudent, setExpandedStudent] = useState<string | null>(null);
  const [studentCredentials, setStudentCredentials] = useState<Record<string, any[]>>({});
  const [loadingCredentials, setLoadingCredentials] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const loadStudentCertificates = async () => {
      try {
        const data = await apiClient.getStudentCertificateStatus();
        // Filter to show only students with hasIssuedCertificate: true
        const filteredData = data.filter(student => student.hasIssuedCertificate);
        setStudents(filteredData);
      } catch (loadError) {
        console.error('Failed to load student certificates:', loadError);
        // Fallback to mock data for development
        console.log('Using mock data as fallback');
        const mockData: StudentCertificateStatus[] = [
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
        setStudents(mockData);
        setError('Using mock data - API connection failed');
        setUsingMockData(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadStudentCertificates();
  }, []);

  const handleViewCredentials = async (studentId: string, indexNo: string) => {
    if (expandedStudent === studentId) {
      setExpandedStudent(null);
      return;
    }

    setExpandedStudent(studentId);
    setLoadingCredentials(prev => ({ ...prev, [studentId]: true }));

    try {
      const credentials = await apiClient.getStudentCertificates(indexNo);
      setStudentCredentials(prev => ({ ...prev, [studentId]: credentials.certificates || [] }));
    } catch (error) {
      console.error('Failed to load student credentials:', error);
      setStudentCredentials(prev => ({ ...prev, [studentId]: [] }));
    } finally {
      setLoadingCredentials(prev => ({ ...prev, [studentId]: false }));
    }
  };

  const handleCredentialClick = (credential: any) => {
    // Navigate to certificate preview screen with CID and hash
    router.push(`/super-admin/certificate-preview?cid=${encodeURIComponent(credential.cid)}&hash=${encodeURIComponent(credential.hash)}`);
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.indexNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  return (
    <section className="space-y-6" id="student-certificates">
      <div className="rounded-[20px] border border-[#E4DEF2] bg-[#FAF9FC] p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#1D1330] font-[family-name:var(--font-display)]">Student certificates</h2>
            <p className="mt-1 text-sm text-[#7A7290]">
              Students with published certificates across the consortium
            </p>
            {usingMockData && (
              <div className="mt-2 inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-600 font-[family-name:var(--font-display)]">
                ⚠️ Using mock data
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 rounded-xl border border-[#E4DEF2] px-4 py-2.5 pl-10 text-sm focus:border-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A7290]">
                <FilterIcon />
              </div>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-32 animate-pulse rounded-[20px] border border-[#E4DEF2] bg-[#FAF9FC]" />
          ))}
        </div>
      ) : filteredStudents.length === 0 ? (
        <div className="rounded-[20px] border border-[#E4DEF2] bg-[#FAF9FC] p-8 text-center text-sm text-[#7A7290]">
          {error ? (
            <div>
              <div className="font-semibold mb-2 text-amber-600">API Connection Failed</div>
              <div>{error}</div>
              <div className="mt-2 text-xs">No mock data available. Please check API configuration.</div>
            </div>
          ) : (
            'No students with issued certificates found matching your search criteria.'
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredStudents.map((student) => (
            <div key={student.id} className="rounded-[20px] border border-[#E4DEF2] bg-[#FAF9FC] shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E4DEF2] text-[#7C3AED] font-semibold font-[family-name:var(--font-display)]">
                        {student.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-[#1D1330] font-[family-name:var(--font-display)]">
                          {student.name}
                        </h3>
                        <p className="text-sm text-[#7A7290]">{student.email}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      <div className="rounded-xl bg-[#E4DEF2]/50 p-3">
                        <div className="text-xs text-[#7A7290] mb-1">Index No</div>
                        <div className="text-sm font-semibold text-[#1D1330] font-[family-name:var(--font-display)]">{student.indexNo}</div>
                      </div>
                      <div className="rounded-xl bg-[#E4DEF2]/50 p-3">
                        <div className="text-xs text-[#7A7290] mb-1">Total Certificates</div>
                        <div className="text-sm font-semibold text-[#1D1330] font-[family-name:var(--font-display)]">{student.totalCertificates}</div>
                      </div>
                      <div className="rounded-xl bg-[#E4DEF2]/50 p-3">
                        <div className="text-xs text-[#7A7290] mb-1">Issued</div>
                        <div className="text-sm font-semibold text-[#1D1330] font-[family-name:var(--font-display)]">{student.issuedCount}</div>
                      </div>
                      <div className="rounded-xl bg-[#E4DEF2]/50 p-3">
                        <div className="text-xs text-[#7A7290] mb-1">Valid</div>
                        <div className="text-sm font-semibold text-[#1D1330] font-[family-name:var(--font-display)]">{student.validCount}</div>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-4">
                      <div className="rounded-xl bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600 font-[family-name:var(--font-display)]">
                        Revoked: {student.revokedCount}
                      </div>
                      <div className="rounded-xl bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-600 font-[family-name:var(--font-display)]">
                        Expired: {student.expiredCount}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleViewCredentials(student.id, student.indexNo)}
                    className="flex items-center gap-2 rounded-xl border border-[#E4DEF2] px-4 py-2.5 text-sm font-medium text-[#7A7290] hover:bg-[#E4DEF2] transition-colors font-[family-name:var(--font-display)]"
                  >
                    <EyeIcon />
                    {expandedStudent === student.id ? 'Hide Credentials' : 'View Credentials'}
                  </button>
                </div>

                {expandedStudent === student.id && (
                  <div className="mt-6 pt-6 border-t border-[#E4DEF2]">
                    {loadingCredentials[student.id] ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7C3AED]" />
                      </div>
                    ) : studentCredentials[student.id]?.length > 0 ? (
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-[#1D1330] font-[family-name:var(--font-display)]">
                          Credentials ({studentCredentials[student.id].length})
                        </h4>
                        {studentCredentials[student.id].map((cert: any) => (
                          <div 
                            key={cert.certificateId} 
                            className="rounded-xl border border-[#E4DEF2] bg-[#FAF9FC] p-4 cursor-pointer hover:border-[#7C3AED] hover:shadow-md transition-all"
                            onClick={() => handleCredentialClick(cert)}
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E4DEF2] text-[#7C3AED]">
                                <ShieldIcon />
                              </div>
                              <div className="flex-1">
                                <div className="text-sm font-medium text-[#1D1330] font-[family-name:var(--font-display)]">
                                  {cert.certificateTitle}
                                </div>
                                <div className="text-xs text-[#7A7290]">{cert.certificateId}</div>
                              </div>
                              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold font-[family-name:var(--font-display)] ${
                                cert.status === 'Active' 
                                  ? 'bg-emerald-50 text-emerald-600' 
                                  : 'bg-rose-50 text-rose-600'
                              }`}>
                                {cert.status}
                              </span>
                            </div>
                            <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-[#7A7290]">
                              <div>Issuer: {cert.issuedBy}</div>
                              <div>Issued: {cert.issuedAt || 'Not available'}</div>
                            </div>
                            <div className="mt-2 flex items-center gap-2 text-xs text-[#7C3AED] font-medium">
                              <EyeIcon />
                              Click to view certificate
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-sm text-[#7A7290]">
                        No credentials found for this student.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="rounded-[20px] border border-[#E4DEF2] bg-[#FAF9FC] p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="text-sm text-[#7A7290]">
            Showing <span className="font-semibold text-[#1D1330]">{filteredStudents.length}</span> students with issued certificates
          </div>
        </div>
      </div>
    </section>
  );
}