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
