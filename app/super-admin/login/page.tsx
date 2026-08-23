'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Inter, Space_Grotesk } from 'next/font/google';
import { apiClient, authStorage } from '@/src/apiHelper/api';

const display = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
});

const body = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
});

export default function SuperAdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      setError('Username and password are required.');
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Calling login API with:', { username: trimmedUsername });
      const response = await apiClient.login({
        username: trimmedUsername,
        password: trimmedPassword,
      });
      console.log('Login response received:', response);
      console.log('User role:', response.role);

      // Check if the user has super-admin role (handle both 'SUPER_ADMIN' and 'super-admin' formats)
      const normalizedRole = response.role?.toLowerCase().replace('_', '-');
      if (!response.role || normalizedRole !== 'super-admin') {
        setError(`Access denied. Super-admin privileges required. Your role: ${response.role || 'none'}`);
        setIsSubmitting(false);
        return;
      }

      authStorage.setSession({
        token: response.token,
        userId: response.userId,
        role: response.role,
      });

      router.replace('/super-admin');
    } catch (error) {
      console.error('Login failed with error:', error);
      setError('Invalid username or password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`${display.variable} ${body.variable} flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_20%_20%,#efeafc_0%,#e2dbf6_45%,#d6cdf1_100%)] p-6 font-[family-name:var(--font-body)]`}
    >
      <div className="relative h-[500px] w-[500px] max-w-full overflow-hidden rounded-[20px] bg-[#FAF9FC] shadow-[0_30px_60px_-20px_rgba(30,14,66,0.35),0_0_0_1px_rgba(30,14,66,0.04)] p-12">
        <p className="mb-2 font-[family-name:var(--font-display)] text-xs font-semibold uppercase tracking-[0.16em] text-[#7C3AED]">
          Super Admin
        </p>
        <h1 className="mb-8 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[#1D1330]">
          Sign in
        </h1>

        {error && (
          <div className="mb-5 rounded-[12px] border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Field id="username" label="Username" type="text" value={username} onChange={setUsername} />
          <Field id="password" label="Password" type="password" value={password} onChange={setPassword} />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-[10px] bg-[#5B21B6] py-3.5 font-[family-name:var(--font-display)] text-sm font-semibold text-white transition-colors hover:bg-[#4C1D95] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Please wait...' : 'Sign in'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-[13px] text-[#7A7290] hover:text-[#7C3AED]">
            ← Back to main login
          </a>
        </div>
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  type = 'text',
  value,
  onChange,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative mb-5">
      <input
        id={id}
        type={type}
        placeholder=" "
        required
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="peer w-full border-0 border-b-[1.5px] border-[#E4DEF2] bg-transparent px-0.5 pb-2 pt-3.5 text-sm text-[#1D1330] outline-none transition-colors focus:border-[#7C3AED]"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-0.5 top-3.5 text-sm text-[#7A7290] transition-all duration-150 peer-focus:-top-0.5 peer-focus:text-[11px] peer-focus:font-medium peer-focus:text-[#7C3AED] peer-[:not(:placeholder-shown)]:-top-0.5 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:font-medium peer-[:not(:placeholder-shown)]:text-[#7C3AED]"
      >
        {label}
      </label>
    </div>
  );
}
