/**
 * DevAria mark: a dark tile with a green heartbeat line running through it,
 * for the always-on watch -> diagnose -> fix loop the agents run.
 */
export default function Logo({ className = "h-9 w-9" }) {
  return (
    <svg viewBox="0 0 40 40" className={className} role="img" aria-label="DevAria">
      <defs>
        <linearGradient id="devaria-logo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#10b981" />
          <stop offset="1" stopColor="#2dd4bf" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="38" height="38" rx="8" fill="#111614" stroke="url(#devaria-logo)" strokeWidth="2" />
      <path d="M6 21h7l3-8 5 15 4-11 2 4h7" fill="none" stroke="url(#devaria-logo)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
