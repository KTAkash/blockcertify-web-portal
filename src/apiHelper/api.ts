import { API_CONFIG } from '../config/config';
import { LoginRequest, LoginResponse, AuthSession, University, RegisterUniversityRequest } from '../interfaces/auth';

const TOKEN_KEY = 'blockcertify-token';

export const authStorage = {
  setSession: (session: AuthSession) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(TOKEN_KEY, JSON.stringify(session));
    }
  },
  getSession: (): AuthSession | null => {
    if (typeof window === 'undefined') return null;
    const item = localStorage.getItem(TOKEN_KEY);
    if (!item) return null;
    try {
      return JSON.parse(item);
    } catch {
      return null;
    }
  },
  removeSession: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY);
    }
  },
  getToken: (): string | null => {
    const session = authStorage.getSession();
    return session?.token || null;
  },
};

export const apiClient = {
  async login(request: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(API_CONFIG.AUTH_LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      let errorMessage = 'Login failed';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        // ignore
      }
      throw new Error(errorMessage);
    }

    return response.json();
  },

  async getUniversities(): Promise<University[]> {
    const session = authStorage.getSession();
    const headers = new Headers();
    
    if (session) {
      headers.set('Authorization', `Bearer ${session.token}`);
    }
    
    headers.set('Content-Type', 'application/json');

    const response = await fetch('/api/admin/universities', {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error('Failed to fetch universities');
    }

    return response.json();
  },

  async registerUniversity(requestData: RegisterUniversityRequest): Promise<University> {
    const session = authStorage.getSession();
    const headers = new Headers();
    
    if (session) {
      headers.set('Authorization', `Bearer ${session.token}`);
    }
    
    headers.set('Content-Type', 'application/json');

    const response = await fetch('/api/admin/universities/register', {
      method: 'POST',
      headers,
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      let errorMessage = 'Failed to register university';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        // ignore
      }
      throw new Error(errorMessage);
    }

    return response.json();
  },

  async deleteUniversity(id: string): Promise<void> {
    const session = authStorage.getSession();
    const headers = new Headers();
    
    if (session) {
      headers.set('Authorization', `Bearer ${session.token}`);
    }
    
    headers.set('Content-Type', 'application/json');

    const response = await fetch(`/api/admin/universities/${id}`, {
      method: 'DELETE',
      headers,
    });

    if (!response.ok) {
      let errorMessage = 'Failed to delete university';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        // ignore
      }
      throw new Error(errorMessage);
    }
  },

  async reactivateUniversity(id: string): Promise<University> {
    const session = authStorage.getSession();
    const headers = new Headers();
    
    if (session) {
      headers.set('Authorization', `Bearer ${session.token}`);
    }
    
    headers.set('Content-Type', 'application/json');

    const response = await fetch(`/api/admin/universities/${id}/reactivate`, {
      method: 'PATCH',
      headers,
    });

    if (!response.ok) {
      let errorMessage = 'Failed to reactivate university';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        // ignore
      }
      throw new Error(errorMessage);
    }

    return response.json();
  },

  async deactivateUniversity(id: string): Promise<University> {
    const session = authStorage.getSession();
    const headers = new Headers();
    
    if (session) {
      headers.set('Authorization', `Bearer ${session.token}`);
    }
    
    headers.set('Content-Type', 'application/json');

    const response = await fetch(`/api/admin/universities/${id}/deactivate`, {
      method: 'PATCH',
      headers,
    });

    if (!response.ok) {
      let errorMessage = 'Failed to deactivate university';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        // ignore
      }
      throw new Error(errorMessage);
    }

    return response.json();
  },

  async uploadFile(formData: FormData): Promise<any> {
    const session = authStorage.getSession();
    const headers = new Headers();

    if (session) {
      headers.set('Authorization', `Bearer ${session.token}`);
    }

    const response = await fetch('/api/files/upload', {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      let errorMessage = 'File upload failed';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        // ignore
      }
      throw new Error(errorMessage);
    }

    const contentType = response.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      const data = await response.json();
      console.log('Upload JSON response:', data);
      return data;
    }

    const text = await response.text();
    console.log('Upload text response:', text);
    return text;
  },

  async previewFile(cid: string, hash: string): Promise<Blob> {
    const session = authStorage.getSession();
    const headers = new Headers();

    if (session) {
      headers.set('Authorization', `Bearer ${session.token}`);
    }

    const response = await fetch(`/api/files/${cid}/preview?hash=${hash}`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      let errorMessage = 'File preview failed';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        // ignore
      }
      throw new Error(errorMessage);
    }

    return response.blob();
  },

  async deleteFile(cid: string): Promise<void> {
    const session = authStorage.getSession();
    const headers = new Headers();

    if (session) {
      headers.set('Authorization', `Bearer ${session.token}`);
    }

    const response = await fetch(`/api/files/${cid}`, {
      method: 'DELETE',
      headers,
    });

    if (!response.ok) {
      let errorMessage = 'File deletion failed';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        // ignore
      }
      throw new Error(errorMessage);
    }
  },

  async getStudents(): Promise<any[]> {
    const session = authStorage.getSession();
    const headers = new Headers();

    if (session) {
      headers.set('Authorization', `Bearer ${session.token}`);
    }

    headers.set('Content-Type', 'application/json');

    const response = await fetch('/api/students', {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      let errorMessage = 'Failed to fetch students';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        // ignore
      }
      throw new Error(errorMessage);
    }

    return response.json();
  },

  async addStudent(studentData: { name: string; email: string; indexNo: string }): Promise<any> {
    const session = authStorage.getSession();
    const headers = new Headers();

    if (session) {
      headers.set('Authorization', `Bearer ${session.token}`);
    }

    headers.set('Content-Type', 'application/json');

    const response = await fetch('/api/students', {
      method: 'POST',
      headers,
      body: JSON.stringify(studentData),
    });

    if (!response.ok) {
      let errorMessage = 'Failed to add student';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        // ignore
      }
      throw new Error(errorMessage);
    }

    return response.json();
  },

  async updateStudent(id: string, studentData: { name: string; email: string; indexNo: string }): Promise<any> {
    const session = authStorage.getSession();
    const headers = new Headers();

    if (session) {
      headers.set('Authorization', `Bearer ${session.token}`);
    }

    headers.set('Content-Type', 'application/json');

    const response = await fetch(`/api/students/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(studentData),
    });

    if (!response.ok) {
      let errorMessage = 'Failed to update student';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        // ignore
      }
      throw new Error(errorMessage);
    }

    return response.json();
  },

  async deleteStudent(id: string): Promise<void> {
    const session = authStorage.getSession();
    const headers = new Headers();

    if (session) {
      headers.set('Authorization', `Bearer ${session.token}`);
    }

    headers.set('Content-Type', 'application/json');

    const response = await fetch(`/api/students/${id}`, {
      method: 'DELETE',
      headers,
    });

    if (!response.ok) {
      let errorMessage = 'Failed to delete student';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        // ignore
      }
      throw new Error(errorMessage);
    }
  },

  async getCertificates(): Promise<any[]> {
    const session = authStorage.getSession();
    const headers = new Headers();

    if (session) {
      headers.set('Authorization', `Bearer ${session.token}`);
    }

    headers.set('Content-Type', 'application/json');

    const response = await fetch('/api/certificates', {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      let errorMessage = 'Failed to fetch certificates';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        // ignore
      }
      throw new Error(errorMessage);
    }

    return response.json();
  },

  async getCertificatesByStudentId(studentId: string): Promise<any[]> {
    const session = authStorage.getSession();
    const headers = new Headers();

    if (session) {
      headers.set('Authorization', `Bearer ${session.token}`);
    }

    headers.set('Content-Type', 'application/json');

    const response = await fetch(`/api/certificates/student/${studentId}`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      let errorMessage = 'Failed to fetch certificates for student';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        // ignore
      }
      throw new Error(errorMessage);
    }

    return response.json();
  },

  async issueCertificate(certificateData: {
    studentId: string;
    certificateTitle: string;
    cid: string;
    hash: string;
    status: string;
  }): Promise<any> {
    const session = authStorage.getSession();
    const headers = new Headers();

    if (session) {
      headers.set('Authorization', `Bearer ${session.token}`);
    }

    headers.set('Content-Type', 'application/json');

    const response = await fetch('/api/certificates', {
      method: 'POST',
      headers,
      body: JSON.stringify(certificateData),
    });

    if (!response.ok) {
      let errorMessage = 'Failed to issue certificate';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        // ignore
      }
      throw new Error(errorMessage);
    }

    return response.json();
  },

  async commitToBlockchain(certificateData: {
    certificateId: string;
    studentId: string;
    cid: string;
    hash: string;
    status: string;
  }): Promise<any> {
    const session = authStorage.getSession();
    const headers = new Headers();

    if (session) {
      headers.set('Authorization', `Bearer ${session.token}`);
    }

    headers.set('Content-Type', 'application/json');

    const response = await fetch('/api/certificates/blockchain', {
      method: 'POST',
      headers,
      body: JSON.stringify(certificateData),
    });

    if (!response.ok) {
      let errorMessage = 'Failed to commit certificate to blockchain';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        // ignore
      }
      throw new Error(errorMessage);
    }

    return response.json();
  },

  async updateCertificate(id: string, certificateData: {
    certificateId: string;
    studentId: string;
    certificateTitle: string;
    cid: string;
    hash: string;
    status: string;
  }): Promise<any> {
    const session = authStorage.getSession();
    const headers = new Headers();

    if (session) {
      headers.set('Authorization', `Bearer ${session.token}`);
    }

    headers.set('Content-Type', 'application/json');

    const response = await fetch(`/api/certificates/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(certificateData),
    });

    if (!response.ok) {
      let errorMessage = 'Failed to update certificate';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        // ignore
      }
      throw new Error(errorMessage);
    }

    return response.json();
  },

  async deleteCertificate(id: string): Promise<void> {
    const session = authStorage.getSession();
    const headers = new Headers();

    if (session) {
      headers.set('Authorization', `Bearer ${session.token}`);
    }

    headers.set('Content-Type', 'application/json');

    const response = await fetch(`/api/certificates/${id}`, {
      method: 'DELETE',
      headers,
    });

    if (!response.ok) {
      let errorMessage = 'Failed to delete certificate';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        // ignore
      }
      throw new Error(errorMessage);
    }
  },

  async fetch<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> {
    const session = authStorage.getSession();
    const headers = new Headers(options.headers);
    
    if (session) {
      headers.set('Authorization', `Bearer ${session.token}`);
    }
    
    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }

    // Use proxy for backend API calls
    const proxyUrl = `${API_CONFIG.PROXY}${url}`;
    const response = await fetch(proxyUrl, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error('Request failed');
    }

    return response.json();
  },
};
