"use client";

import { useAccount } from "wagmi";
import { useAuth } from "./AuthProvider";
import { short } from "@/lib/format";

// "Login & sign up with wallet" — a single button that adapts to state.
export function AuthButton() {
  const { isConnected } = useAccount();
  const { session, status, signIn, signOut, error } = useAuth();

  if (!isConnected) return null;

  if (session) {
    return (
      <div className="flex items-center gap-2">
        <span className="hidden rounded-lg border border-accent-blue/30 bg-accent-blue/10 px-2.5 py-1.5 text-xs font-medium text-accent-blue sm:inline">
          ✓ {short(session.address)}
        </span>
        <button
          onClick={signOut}
          className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/60 transition hover:border-white/25 hover:text-white"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end">
      <button
        onClick={signIn}
        disabled={status === "signing"}
        className="rounded-lg bg-gradient-to-r from-accent-blue to-accent-red px-3.5 py-1.5 text-xs font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
      >
        {status === "signing" ? "Check wallet…" : "Sign in / Sign up"}
      </button>
      {error && (
        <span className="mt-1 max-w-[180px] text-right text-[10px] text-accent-red/80">
          {error}
        </span>
      )}
    </div>
  );
}
