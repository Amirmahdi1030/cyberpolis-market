"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAccount, useSignMessage } from "wagmi";
import { verifyMessage } from "viem";

type Session = {
  address: `0x${string}`;
  issuedAt: string;
  isNew: boolean; // true on first sign-in ("sign up")
};

type AuthState = {
  session: Session | null;
  status: "idle" | "signing" | "error";
  error?: string;
  signIn: () => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthState | null>(null);

const SESSION_KEY = "cyberpolis.session";
const KNOWN_KEY = "cyberpolis.known-wallets";

// EIP-4361 (SIWE) style message, verified fully client-side for this frontend-only build.
function buildMessage(address: string, nonce: string, isNew: boolean) {
  const domain =
    typeof window !== "undefined" ? window.location.host : "cyberpolis.market";
  const action = isNew ? "Create your Cyberpolis account" : "Sign in to Cyberpolis";
  return [
    `${domain} wants you to sign in with your wallet:`,
    address,
    "",
    action,
    "",
    "This request will not trigger a blockchain transaction or cost gas.",
    `URI: https://${domain}`,
    "Version: 1",
    `Nonce: ${nonce}`,
    `Issued At: ${new Date().toISOString()}`,
  ].join("\n");
}

function knownWallets(): string[] {
  try {
    return JSON.parse(localStorage.getItem(KNOWN_KEY) || "[]");
  } catch {
    return [];
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [session, setSession] = useState<Session | null>(null);
  const [status, setStatus] = useState<AuthState["status"]>("idle");
  const [error, setError] = useState<string | undefined>();

  // Restore a saved session on load.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) setSession(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  // Drop the session if the wallet disconnects or switches accounts.
  useEffect(() => {
    if (!isConnected) return;
    if (
      session &&
      address &&
      session.address.toLowerCase() !== address.toLowerCase()
    ) {
      setSession(null);
      localStorage.removeItem(SESSION_KEY);
    }
  }, [address, isConnected, session]);

  const signIn = useCallback(async () => {
    if (!address) {
      setError("Connect a wallet first.");
      setStatus("error");
      return;
    }
    setStatus("signing");
    setError(undefined);
    try {
      const isNew = !knownWallets().includes(address.toLowerCase());
      const nonce = Math.random().toString(36).slice(2, 12);
      const message = buildMessage(address, nonce, isNew);
      const signature = await signMessageAsync({ message });

      const valid = await verifyMessage({ address, message, signature });
      if (!valid) throw new Error("Signature verification failed.");

      if (isNew) {
        const list = knownWallets();
        list.push(address.toLowerCase());
        localStorage.setItem(KNOWN_KEY, JSON.stringify(list));
      }

      const next: Session = {
        address,
        issuedAt: new Date().toISOString(),
        isNew,
      };
      setSession(next);
      localStorage.setItem(SESSION_KEY, JSON.stringify(next));
      setStatus("idle");
    } catch (e: any) {
      setError(e?.shortMessage || e?.message || "Sign-in was rejected.");
      setStatus("error");
    }
  }, [address, signMessageAsync]);

  const signOut = useCallback(() => {
    setSession(null);
    localStorage.removeItem(SESSION_KEY);
    setStatus("idle");
  }, []);

  const value = useMemo(
    () => ({ session, status, error, signIn, signOut }),
    [session, status, error, signIn, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
