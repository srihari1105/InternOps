import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import api from '../lib/axios';
import useAuthStore from '../store/auth';

const UPTOSKILLS_LOGO = '/UptoSkills.webp';

export default function Login() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');

  const loginMut = useMutation({
    mutationFn: (creds) =>
      api.post('/auth/login', creds).then((res) => res.data),
    onSuccess: (data) => {
      setAuth({ accessToken: data.accessToken, user: data.user });
      navigate('/');
    },
    onError: (err) => setError(err.response?.data?.error || 'Login failed'),
  });

  const validate = () => {
    if (!email.trim()) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Enter a valid email';
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters';
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const err = validate();

    if (err) return setError(err);

    setError('');
    loginMut.mutate({ email, password });
  };

  return (
    <div className="relative h-screen w-full overflow-hidden flex flex-col lg:flex-row bg-gradient-to-br from-slate-950 via-indigo-950 to-blue-950 text-white">
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 66L0 50V16L28 0l28 16v34L28 66zm0 0v34M0 50l28 16M56 50L28 66M0 16l28 16M56 16L28 32' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '56px 100px',
        }}
      />

      <div className="absolute -top-28 -left-24 w-96 h-96 bg-indigo-500/25 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-24 w-[30rem] h-[30rem] bg-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute top-1/3 left-1/2 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl" />

      {/* Left Side (Credentials Form) */}
      <div className="relative w-full lg:w-1/2 h-full flex flex-col justify-center items-center px-6 py-5 bg-black/10">
        <div className="w-full max-w-md animate-pop-in">
          {/* Brand */}
          <div className="text-center mb-5 text-white">
            <div className="flex flex-col items-center gap-4">
              <div className="inline-flex items-center justify-center rounded-[2rem] bg-white/[0.055] border border-white/10 px-5 py-3 shadow-2xl shadow-indigo-950/40 backdrop-blur-xl">
                <img
                  src={UPTOSKILLS_LOGO}
                  alt="UptoSkills"
                  className="w-[250px] h-auto object-contain"
                />
              </div>

              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                  InternOps
                </h1>

                <p className="text-white/70 text-sm mt-1">
                  Workforce &amp; Intern Management Platform
                </p>
              </div>
            </div>
          </div>

          {/* Card */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.08] backdrop-blur-xl shadow-2xl p-6 md:p-7">
            <div className="mb-5">
              <p className="text-xs uppercase tracking-[0.22em] text-indigo-200 font-extrabold mb-2">
                Secure Login
              </p>

              <h2 className="text-2xl font-extrabold text-white tracking-tight">
                Welcome back
              </h2>

              <p className="text-white/65 text-sm mt-1">
                Log in to your dashboard
              </p>
            </div>

            {error && (
              <div className="bg-red-500/15 border border-red-300/25 text-red-100 text-sm rounded-2xl px-4 py-3 mb-4 animate-fade-in font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-white/65 mb-2">
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/45"
                    aria-hidden="true"
                  />

                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/10 border border-white/15 text-white placeholder-white/40 focus:bg-white/[0.14] focus:border-indigo-300/70 focus:ring-2 focus:ring-indigo-300/25 outline-none transition shadow-inner"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-white/65 mb-2">
                  Password
                </label>

                <div className="relative">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/45"
                    aria-hidden="true"
                  />

                  <input
                    type={show ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-12 py-3 rounded-2xl bg-white/10 border border-white/15 text-white placeholder-white/40 focus:bg-white/[0.14] focus:border-indigo-300/70 focus:ring-2 focus:ring-indigo-300/25 outline-none transition shadow-inner"
                  />

                  <button
                    type="button"
                    onClick={() => setShow((s) => !s)}
                    aria-label={show ? 'Hide password' : 'Show password'}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/45 hover:text-white transition"
                  >
                    {show ? (
                      <EyeOff className="w-5 h-5" aria-hidden="true" />
                    ) : (
                      <Eye className="w-5 h-5" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loginMut.isPending}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-blue-500 to-violet-600 hover:shadow-xl hover:shadow-indigo-950/40 text-white font-extrabold transition-all hover:-translate-y-0.5 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:translate-y-0"
              >
                {loginMut.isPending ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Logging in...
                  </span>
                ) : (
                  'Log In'
                )}
              </button>
            </form>

            <div className="mt-4 text-center">
              <Link
                to="/forgot-password"
                className="text-white/70 hover:text-white text-sm font-semibold underline-offset-2 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <p className="text-center text-white/45 text-xs mt-4">
            © {new Date().getFullYear()} InternOps · Secure role-based access
          </p>
        </div>
      </div>

      {/* Right Side (Notice Board & Branding) */}
      <div className="relative hidden lg:flex w-full lg:w-1/2 h-full flex-col justify-center px-8 lg:px-12 bg-white/[0.04] border-l border-white/10">
        <div className="max-w-md mx-auto w-full space-y-5">
          <div className="inline-flex items-center gap-2 bg-indigo-400/10 text-indigo-200 border border-indigo-300/15 px-3 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider">
            <span>📢 InternOps Notice Board</span>
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Portal Announcements
            </h2>

            <p className="text-white/65 text-sm leading-relaxed">
              Stay up to date with tasks, program updates, and team schedules
              here.
            </p>
          </div>

          <div className="bg-white/[0.08] backdrop-blur-xl rounded-3xl border border-white/10 p-5 space-y-4 shadow-2xl">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="text-indigo-300">⚡</span> Latest News
            </h3>

            <div className="space-y-4 divide-y divide-white/10">
              <div className="pt-4 first:pt-0">
                <p className="text-xs text-indigo-200 font-extrabold uppercase tracking-wider">
                  Weekly Reminder
                </p>

                <p className="text-sm text-white/75 mt-1 leading-relaxed">
                  Remember to submit your weekly task remarks and proof
                  screenshots by Friday at 5:00 PM.
                </p>
              </div>

              <div className="pt-4">
                <p className="text-xs text-emerald-300 font-extrabold uppercase tracking-wider">
                  AI Assistant Online
                </p>

                <p className="text-sm text-white/75 mt-1 leading-relaxed">
                  The brand new AI Assistant is online. Select your role to get
                  assistance with ratings, proof uploads, and platform queries.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-3">
              <p className="text-base font-extrabold text-white">Secure</p>
              <p className="text-[11px] text-white/45 mt-0.5">Access</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-3">
              <p className="text-base font-extrabold text-white">Role</p>
              <p className="text-[11px] text-white/45 mt-0.5">Based</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-3">
              <p className="text-base font-extrabold text-white">Live</p>
              <p className="text-[11px] text-white/45 mt-0.5">Updates</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
