'use client';

import { useEffect, useRef, useState } from 'react';
import { Inter, Space_Grotesk } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { apiClient, authStorage } from '../../src/apiHelper/api';

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

type Mode = 'signin' | 'signup';

export default function Home() {
  const [mode, setMode] = useState<Mode>('signin');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const isSignUp = mode === 'signup';

  useEffect(() => {
    setError(null);
    setFeedback(null);
  }, [mode]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setFeedback(null);

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      setError('Username and password are required.');
      return;
    }

    setIsSubmitting(true);

    try {
      if (!isSignUp) {
        console.log('Calling login API with:', { username: trimmedUsername });
        const response = await apiClient.login({
          username: trimmedUsername,
          password: trimmedPassword,
        });
        console.log('Login response received:', response);

        authStorage.setSession({
          token: response.token,
          userId: response.userId,
          role: response.role,
        });

        router.replace('/dashboard');
      }
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
      <div className="relative h-[580px] w-[920px] max-w-full overflow-hidden rounded-[20px] bg-[#FAF9FC] shadow-[0_30px_60px_-20px_rgba(30,14,66,0.35),0_0_0_1px_rgba(30,14,66,0.04)] max-[720px]:h-auto max-[720px]:min-h-[640px]">
        <Face
          active={!isSignUp}
          type="signin"
          onToggle={() => setMode('signup')}
          username={username}
          password={password}
          name={name}
          feedback={feedback}
          error={error}
          isSubmitting={isSubmitting}
          onUsernameChange={setUsername}
          onPasswordChange={setPassword}
          onNameChange={setName}
          onSubmit={handleSubmit}
        />
        <Face
          active={isSignUp}
          type="signup"
          onToggle={() => setMode('signin')}
          username={username}
          password={password}
          name={name}
          feedback={feedback}
          error={error}
          isSubmitting={isSubmitting}
          onUsernameChange={setUsername}
          onPasswordChange={setPassword}
          onNameChange={setName}
          onSubmit={handleSubmit}
        />
        <Pivot isSignUp={isSignUp} onSignUp={() => setMode('signup')} onSignIn={() => setMode('signin')} />
      </div>
    </div>
  );
}

function Face({
  active,
  type,
  onToggle,
  username,
  password,
  name,
  feedback,
  error,
  isSubmitting,
  onUsernameChange,
  onPasswordChange,
  onNameChange,
  onSubmit,
}: {
  active: boolean;
  type: Mode;
  onToggle: () => void;
  username: string;
  password: string;
  name: string;
  feedback: string | null;
  error: string | null;
  isSubmitting: boolean;
  onUsernameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onNameChange: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) {
  const isSignin = type === 'signin';
  const sideClasses = isSignin
    ? 'left-0 px-14 pl-16 max-[720px]:px-8'
    : 'right-0 px-14 pr-16 max-[720px]:px-8';

  return (
    <div
      className={`absolute top-0 z-20 flex h-full w-[56%] items-center justify-center transition-all duration-500 ease-[cubic-bezier(.65,0,.35,1)] max-[720px]:relative max-[720px]:w-full max-[720px]:py-12 ${sideClasses} ${
        active
          ? 'translate-x-0 opacity-100'
          : 'pointer-events-none opacity-0 max-[720px]:hidden'
      }`}
    >
      <form className="w-full max-w-[340px]" onSubmit={onSubmit}>
        <p className="mb-2 font-[family-name:var(--font-display)] text-xs font-semibold uppercase tracking-[0.16em] text-[#7C3AED]">
          {isSignin ? 'Welcome back' : 'Get started'}
        </p>
        <h1 className="mb-6 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[#1D1330]">
          {isSignin ? 'Sign in' : 'Create account'}
        </h1>

        {(error || feedback) && (
          <div
            className={`mb-5 rounded-[12px] border px-4 py-3 text-sm ${
              error
                ? 'border-rose-200 bg-rose-50 text-rose-700'
                : 'border-emerald-200 bg-emerald-50 text-emerald-700'
            }`}
          >
            {error ?? feedback}
          </div>
        )}

        {isSignin ? (
          <>
            <Field id="si-username" label="Username" type="text" value={username} onChange={onUsernameChange} />
            <Field id="si-password" label="Password" type="password" value={password} onChange={onPasswordChange} />
            <a href="#" className="mb-6 block text-right text-[12.5px] text-[#7A7290] hover:text-[#7C3AED]">
              Forgot your password?
            </a>
          </>
        ) : (
          <>
            <Field id="su-name" label="Full name" value={name} onChange={onNameChange} />
            <Field id="su-email" label="Email address" type="email" value={username} onChange={onUsernameChange} />
            <Field id="su-password" label="Password" type="password" value={password} onChange={onPasswordChange} />
          </>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-[10px] bg-[#5B21B6] py-3.5 font-[family-name:var(--font-display)] text-sm font-semibold text-white transition-colors hover:bg-[#4C1D95] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? 'Please wait...' : isSignin ? 'Sign in' : 'Create account'}
        </button>

        <button
          type="button"
          onClick={onToggle}
          className="mt-5 hidden w-full text-center text-[13px] text-[#7A7290] max-[720px]:block"
        >
          {isSignin ? (
            <>
              New here? <span className="font-medium text-[#7C3AED]">Create account</span>
            </>
          ) : (
            <>
              Already have an account? <span className="font-medium text-[#7C3AED]">Sign in</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

function SocialButton({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <a
      href="#"
      aria-label={`Continue with ${label}`}
      className="flex h-[42px] w-[42px] items-center justify-center rounded-[10px] border border-[#E4DEF2] text-[#1D1330] transition-all hover:-translate-y-0.5 hover:border-[#7C3AED] hover:text-[#7C3AED]"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        {children}
      </svg>
    </a>
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

function Pivot({
  isSignUp,
  onSignUp,
  onSignIn,
}: {
  isSignUp: boolean;
  onSignUp: () => void;
  onSignIn: () => void;
}) {
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
    <div
      ref={containerRef}
      className={`absolute right-0 top-0 z-10 h-full w-[44%] overflow-hidden transition-transform duration-500 ease-[cubic-bezier(.65,0,.35,1)] max-[720px]:hidden ${
        isSignUp ? '-translate-x-[127.3%]' : 'translate-x-0'
      }`}
    >
      <div
        className={`absolute -left-[25%] top-0 h-full w-[150%] bg-gradient-to-br from-[#120B24] via-[#1E1436] to-[#4C1D95] transition-transform duration-500 ease-[cubic-bezier(.65,0,.35,1)] ${
          isSignUp ? 'skew-x-[9deg]' : '-skew-x-[9deg]'
        }`}
      />
      <canvas ref={canvasRef} className="absolute left-0 top-0 h-full w-full" />

      <PivotPanel
        show={!isSignUp}
        heading="New to the platform?"
        body="Create an account to set up your workspace and start where you left off, every time."
        cta="Create account"
        onClick={onSignUp}
        shiftDir="neg"
      />
      <PivotPanel
        show={isSignUp}
        heading="Already have an account?"
        body="Sign back in to pick up your work exactly where you left it."
        cta="Sign in"
        onClick={onSignIn}
        shiftDir="pos"
      />
    </div>
  );
}

function PivotPanel({
  show,
  heading,
  body,
  cta,
  onClick,
  shiftDir,
}: {
  show: boolean;
  heading: string;
  body: string;
  cta: string;
  onClick: () => void;
  shiftDir: 'pos' | 'neg';
}) {
  const hiddenShift = shiftDir === 'pos' ? 'translate-x-6' : '-translate-x-6';

  return (
    <div
      className={`absolute left-0 top-0 flex h-full w-full flex-col items-start justify-center px-11 text-white transition-all duration-[450ms] ease-[cubic-bezier(.65,0,.35,1)] ${
        show ? 'pointer-events-auto translate-x-0 opacity-100' : `pointer-events-none opacity-0 ${hiddenShift}`
      }`}
    >
      <span className="mb-4 text-sm text-[#9F75F2]">&#9670;</span>
      <h2 className="mb-3.5 max-w-[260px] font-[family-name:var(--font-display)] text-2xl font-semibold leading-tight">
        {heading}
      </h2>
      <p className="mb-7 max-w-[260px] text-[13.5px] leading-relaxed text-[#D9CCF7]">{body}</p>
      <button
        type="button"
        onClick={onClick}
        className="rounded-[10px] border-[1.5px] border-white/35 px-6 py-3 font-[family-name:var(--font-display)] text-[13px] font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/10"
      >
        {cta}
      </button>
    </div>
  );
}