export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  role: string;
  token: string;
  userId: string;
}

export interface AuthSession {
  token: string;
  userId: string;
  role: string;
}

export interface University {
  peerEndpoint: string;
  active: boolean;
  mspId: string;
  name: string;
  id: string;
}

export interface RegisterUniversityRequest {
  name: string;
  username: string;
  password: string;
  mspId: string;
  certPem: string;
  privateKey: string;
  peerEndpoint: string;
  peerTlsCertPem: string;
  peerHostnameOverride: string;
}

export interface StudentSignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  indexNo: string;
  mobileNo: string;
  gender: string;
}

export interface StudentProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  indexNo: string;
  mobileNo: string;
  gender: string;
  role: string;
  createdAt: string;
}

export interface StudentCertificate {
  certificateId: string;
  certificateTitle: string;
  cid: string;
  hash: string;
  issuedBy: string;
  status: string;
  issuedAt: string | null;
}

export interface StudentCertificatesResponse {
  indexNo: string;
  certificates: StudentCertificate[];
}

export interface StudentCertificateStatus {
  id: string;
  name: string;
  email: string;
  indexNo: string;
  totalCertificates: number;
  issuedCount: number;
  validCount: number;
  revokedCount: number;
  expiredCount: number;
  hasIssuedCertificate: boolean;
}
