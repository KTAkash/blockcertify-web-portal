'use client';

import { useState, useRef, useEffect } from 'react';
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

export default function AdminLogin() {
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

      // Check if the user has UNIVERSITY role (handle both 'UNIVERSITY' and 'university' formats)
      const normalizedRole = response.role?.toLowerCase().replace('_', '-');
      if (!response.role || normalizedRole !== 'university') {
        setError(`Access denied. University admin privileges required. Your role: ${response.role || 'none'}`);
        setIsSubmitting(false);
        return;
      }

      authStorage.setSession({
        token: response.token,
        userId: response.userId,
        role: response.role,
      });

      router.replace('/admin');
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
      <div className="relative h-[650px] w-[920px] max-w-full overflow-hidden rounded-[20px] bg-[#FAF9FC] shadow-[0_30px_60px_-20px_rgba(30,14,66,0.35),0_0_0_1px_rgba(30,14,66,0.04)] max-[720px]:h-auto max-[720px]:min-h-[640px]">
        {/* Animation Background */}
        <div className="absolute right-0 top-0 z-10 h-full w-[44%] overflow-hidden max-[720px]:hidden">
          <div className="absolute -left-[25%] top-0 h-full w-[150%] bg-gradient-to-br from-[#120B24] via-[#1E1436] to-[#4C1D95] -skew-x-[9deg]" />
          <CanvasAnimation />
          
          <div className="absolute left-0 top-0 flex h-full w-full flex-col items-start justify-center px-11 text-white">
            <span className="mb-4 text-sm text-[#9F75F2]">&#9670;</span>
            <h2 className="mb-3.5 max-w-[260px] font-[family-name:var(--font-display)] text-2xl font-semibold leading-tight">
              University Admin
            </h2>
            <p className="mb-7 max-w-[260px] text-[13.5px] leading-relaxed text-[#D9CCF7]">
              Sign in to manage your university's certificate issuance and student verification.
            </p>
          </div>
        </div>

        {/* Login Form */}
        <div className="absolute top-0 z-20 flex h-full w-[56%] items-center justify-center overflow-y-auto left-0 px-14 pl-16 max-[720px]:relative max-[720px]:w-full max-[720px]:py-12 max-[720px]:px-8">
          <form className="w-full max-w-[340px]" onSubmit={handleSubmit}>
            <p className="mb-1 font-[family-name:var(--font-display)] text-xs font-semibold uppercase tracking-[0.16em] text-[#7C3AED]">
              University Admin
            </p>
            <h1 className="mb-4 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[#1D1330]">
              Sign in
            </h1>

            {error && (
              <div className="mb-3 rounded-[12px] border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                {error}
              </div>
            )}

            <Field id="username" label="Username" type="text" value={username} onChange={setUsername} />
            <Field id="password" label="Password" type="password" value={password} onChange={setPassword} />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-[10px] bg-[#5B21B6] py-3 font-[family-name:var(--font-display)] text-sm font-semibold text-white transition-colors hover:bg-[#4C1D95] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? 'Please wait...' : 'Sign in'}
            </button>

            <div className="mt-6 text-center">
              <a href="/" className="text-[13px] text-[#7A7290] hover:text-[#7C3AED]">
                ← Back to main login
              </a>
            </div>
          </form>
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
    <div className="relative mb-3">
      <input
        id={id}
        type={type}
        placeholder=" "
        required
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="peer w-full border-0 border-b-[1.5px] border-[#E4DEF2] bg-transparent px-0.5 pb-1.5 pt-2.5 text-sm text-[#1D1330] outline-none transition-colors focus:border-[#7C3AED]"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-0.5 top-2.5 text-sm text-[#7A7290] transition-all duration-150 peer-focus:-top-0.5 peer-focus:text-[11px] peer-focus:font-medium peer-focus:text-[#7C3AED] peer-[:not(:placeholder-shown)]:-top-0.5 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:font-medium peer-[:not(:placeholder-shown)]:text-[#7C3AED]"
      >
        {label}
      </label>
    </div>
  );
}

function CanvasAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let nodes: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    let frameId = 0;

    const resize = () => {
      w = container.clientWidth;
      h = container.clientHeight;
      canvas.width = w;
      canvas.height = h;
    };

    const makeNodes = (count: number) => {
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 1,
      }));
    };

    const step = () => {
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 130;
          if (dist < maxDist) {
            ctx.strokeStyle = `rgba(217, 204, 247, ${0.16 * (1 - dist / maxDist)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(159, 117, 242, 0.85)';
        ctx.fill();
      }

      frameId = requestAnimationFrame(step);
    };

    resize();
    makeNodes(38);
    step();

    const handleResize = () => resize();
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute left-0 top-0 h-full w-full">
      <canvas ref={canvasRef} className="absolute left-0 top-0 h-full w-full" />
    </div>
  );
}