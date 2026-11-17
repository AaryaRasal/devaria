import { ChevronDown, Github, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { api } from "../api";
import { usePoll } from "../hooks";
import { ADMIN_NAV, NAV } from "../nav";
import Logo from "./Logo";

const MORE_KEY = "devaria.nav.more";

function readMoreOpen(pathname) {
  if (NAV.more.some((it) => pathname.startsWith(it.to))) return true;
  try {
    return localStorage.getItem(MORE_KEY) === "1";
  } catch {
    return false;
  }
}

function NavItem({ item, counts, onNavigate }) {
  const count = item.badge ? counts?.[item.badge] : 0;
  return (
    <li>
      <NavLink
        to={item.to}
        end={item.to === "/"}
        onClick={onNavigate}
        className={({ isActive }) =>
          `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
            isActive ? "bg-indigo-500/10 font-medium text-indigo-300 shadow-[inset_3px_0_0_#10b981]" : "text-slate-400 hover:bg-indigo-500/[0.06] hover:text-indigo-300"
          }`
        }
      >
        <item.icon className="h-4 w-4" />
        <span className="flex-1">{item.label}</span>
        {count > 0 && (
          <span className="rounded-full bg-amber-500/20 px-1.5 text-[11px] font-semibold text-amber-300">{count}</span>
        )}
      </NavLink>
    </li>
  );
}

/** Who is signed in, with their role and a sign-out button (or a sign-in link). */
function Account({ me }) {
  if (!me?.github_login) return null;
  const signOut = async () => {
    await api.post("/api/auth/logout");
    window.location.assign("/deploy");
  };
  if (!me.signed_in) {
    return (
      <a href="/api/auth/github/login?next=/deploy"
        className="mx-3 mb-1 flex items-center gap-2 rounded-xl border border-white/[0.06] px-3 py-2.5 text-xs text-slate-300 hover:bg-white/[0.04]">
        <Github className="h-4 w-4" /> {me.account_status === "pending" ? `@${me.pending_login} · waiting for approval` : "Sign in with GitHub"}
      </a>
    );
  }
  return (
    <div className="mx-3 mb-1 flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2">
      {me.avatar_url ? <img src={me.avatar_url} alt="" className="h-7 w-7 rounded-full" /> : <Github className="h-5 w-5 text-slate-400" />}
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium text-slate-100">@{me.login}</p>
        <p className="text-[11px] text-slate-500">{me.is_admin ? "Admin" : "Member"}</p>
      </div>
      <button onClick={signOut} title="Sign out" aria-label="Sign out" className="rounded-md p-1.5 text-slate-400 hover:bg-white/[0.06] hover:text-slate-200">
        <LogOut className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}


function Brand() {
  return (
    <div className="flex items-center gap-2.5">
      <Logo className="h-8 w-8 shrink-0" />
      <div className="leading-tight">
        <p className="font-display text-[17px] font-bold tracking-tight text-navy">Dev<span className="text-indigo-400">Aria</span></p>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">agentic devops</p>
      </div>
    </div>
  );
}

function EnvBadge({ env }) {
  return (
    <span className="flex items-center gap-2 rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5 font-mono text-[11px] text-slate-400">
      {env?.mode === "live" ? "LIVE STACK" : "SIMULATED"}
      <span className={`flex items-center gap-1.5 font-medium ${env?.healthy ? "text-emerald-300" : "text-rose-300"}`}>
        <span className={`h-1.5 w-1.5 rounded-full ${env?.healthy ? "bg-emerald-400" : "animate-pulseDot bg-rose-400"}`} />
        {env ? (env.healthy ? "healthy" : "degraded") : "…"}
      </span>
    </span>
  );
}

/** Small account chip for the top bar. */
function AccountChip({ me }) {
  if (!me?.github_login) return null;
  const signOut = async () => {
    await api.post("/api/auth/logout");
    window.location.assign("/deploy");
  };
  if (!me.signed_in) {
    return (
      <a href="/api/auth/github/login?next=/deploy" className="flex items-center gap-2 rounded-md border border-white/[0.08] px-2.5 py-1.5 text-xs text-slate-300 hover:bg-white/[0.04]">
        <Github className="h-4 w-4" /> {me.account_status === "pending" ? `@${me.pending_login} · waiting` : "Sign in"}
      </a>
    );
  }
  return (
    <div className="flex items-center gap-2 rounded-md border border-white/[0.08] bg-white/[0.03] py-1 pl-1 pr-1.5">
      {me.avatar_url ? <img src={me.avatar_url} alt="" className="h-6 w-6 rounded" /> : <Github className="h-5 w-5 text-slate-400" />}
      <span className="text-xs text-slate-200">@{me.login}</span>
      <span className="font-mono text-[10px] uppercase text-slate-500">{me.is_admin ? "admin" : "member"}</span>
      <button onClick={signOut} title="Sign out" aria-label="Sign out" className="rounded p-1 text-slate-400 hover:bg-white/[0.06] hover:text-slate-200">
        <LogOut className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

/** One tab in the top navigation strip. */
function TopTab({ item, counts }) {
  const count = item.badge ? counts?.[item.badge] : 0;
  return (
    <NavLink
      to={item.to}
      end={item.to === "/"}
      className={({ isActive }) =>
        `relative flex shrink-0 items-center gap-2 px-3 py-3 text-[13px] transition ${
          isActive
            ? "font-medium text-indigo-300 after:absolute after:inset-x-2 after:-bottom-px after:h-0.5 after:rounded-full after:bg-indigo-400"
            : "text-slate-400 hover:text-slate-100"
        }`
      }
    >
      <item.icon className="h-4 w-4" />
      {item.label}
      {count > 0 && <span className="rounded bg-amber-500/20 px-1.5 font-mono text-[10px] font-semibold text-amber-300">{count}</span>}
    </NavLink>
  );
}

/** "More tools" dropdown in the top strip. */
function MoreMenu({ counts }) {
  const loc = useLocation();
  const [open, setOpen] = useState(false);
  const active = NAV.more.some((it) => loc.pathname.startsWith(it.to));
  return (
    <div className="relative shrink-0" onMouseLeave={() => setOpen(false)}>
      <button onClick={() => setOpen((v) => !v)} aria-expanded={open}
        className={`flex items-center gap-1.5 px-3 py-3 text-[13px] ${active ? "font-medium text-indigo-300" : "text-slate-400 hover:text-slate-100"}`}>
        More tools <ChevronDown className={`h-3.5 w-3.5 transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-40 w-60 rounded-md border border-white/[0.08] bg-ink-850 p-1.5 shadow-card">
          {NAV.more.map((it) => (
            <NavLink key={it.to} to={it.to} onClick={() => setOpen(false)}
              className={({ isActive }) => `flex items-center gap-2.5 rounded px-2.5 py-2 text-sm ${isActive ? "bg-indigo-500/10 text-indigo-300" : "text-slate-300 hover:bg-white/[0.05]"}`}>
              <it.icon className="h-4 w-4" /> {it.label}
              {it.badge && counts?.[it.badge] > 0 && <span className="ml-auto font-mono text-[10px] text-amber-300">{counts[it.badge]}</span>}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

/** Drawer menu used on small screens. */
function MobileMenu({ me, counts, env, onNavigate }) {
  const loc = useLocation();
  const [moreOpen, setMoreOpen] = useState(() => readMoreOpen(loc.pathname));
  const toggleMore = () => {
    setMoreOpen((v) => {
      try {
        localStorage.setItem(MORE_KEY, v ? "0" : "1");
      } catch {
        /* storage unavailable */
      }
      return !v;
    });
  };
  return (
    <div className="flex h-full flex-col">
      <div className="px-5 py-5"><Brand /></div>
      <nav className="flex-1 overflow-y-auto px-3 pb-4">
        <ul className="space-y-0.5">
          {NAV.main.map((it) => <NavItem key={it.to} item={it} counts={counts} onNavigate={onNavigate} />)}
          {me?.is_admin && me?.github_login && ADMIN_NAV.map((it) => <NavItem key={it.to} item={it} counts={counts} onNavigate={onNavigate} />)}
        </ul>
        <button onClick={toggleMore} aria-expanded={moreOpen}
          className="mt-5 flex w-full items-center justify-between px-3 pb-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 hover:text-slate-300">
          More tools
          <ChevronDown className={`h-3.5 w-3.5 transition ${moreOpen ? "rotate-180" : ""}`} />
        </button>
        {moreOpen && (
          <ul className="space-y-0.5">
            {NAV.more.map((it) => <NavItem key={it.to} item={it} counts={counts} onNavigate={onNavigate} />)}
          </ul>
        )}
      </nav>
      <Account me={me} />
      <div className="m-3"><EnvBadge env={env} /></div>
    </div>
  );
}

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  const { data } = usePoll("/api/overview", 5000);
  const { data: me } = usePoll("/api/auth/me", 30000);
  const counts = { ...(data?.kpis || {}), pending_users: me?.pending_users };
  const env = data?.environment;
  const showAdmin = me?.is_admin && me?.github_login;
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-white/[0.07] bg-ink-950/85 backdrop-blur">
        <div className="mx-auto flex max-w-[1320px] items-center gap-4 px-4 py-3 sm:px-6">
          <button onClick={() => setOpen(true)} aria-label="Open menu" className="text-slate-300 lg:hidden">
            <Menu className="h-5 w-5" />
          </button>
          <Brand />
          <div className="ml-auto hidden items-center gap-2 lg:flex">
            <EnvBadge env={env} />
            <AccountChip me={me} />
          </div>
        </div>
        <nav className="mx-auto hidden max-w-[1320px] items-center border-t border-white/[0.05] px-3 sm:px-4 lg:flex">
          {NAV.main.map((it) => <TopTab key={it.to} item={it} counts={counts} />)}
          {showAdmin && ADMIN_NAV.map((it) => <TopTab key={it.to} item={it} counts={counts} />)}
          <div className="ml-auto"><MoreMenu counts={counts} /></div>
        </nav>
      </header>
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/70" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 border-r border-white/10 bg-ink-900">
            <button className="absolute right-3 top-5 text-slate-400" onClick={() => setOpen(false)} aria-label="Close menu">
              <X className="h-5 w-5" />
            </button>
            <MobileMenu me={me} counts={counts} env={env} onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}
      <main key={loc.pathname} className="mx-auto min-w-0 max-w-[1320px] px-4 py-6 sm:px-6 lg:py-8">{children}</main>
    </div>
  );
}
