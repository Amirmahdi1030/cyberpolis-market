"use client";

import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { AuthButton } from "./AuthButton";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-ink-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent-blue via-accent-red to-accent-orange font-display text-sm font-black text-white">
              C
            </span>
            <span className="font-display text-lg font-black tracking-tight text-white">
              CYBERPOLIS<span className="text-accent-blue">.MARKET</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-5 text-sm text-white/60 md:flex">
            <Link href="/marketplace" className="transition hover:text-white">
              Marketplace
            </Link>
            <Link
              href="/category/character"
              className="transition hover:text-white"
            >
              Characters
            </Link>
            <Link href="/category/guns" className="transition hover:text-white">
              Guns
            </Link>
            <Link
              href="/category/bundles"
              className="transition hover:text-white"
            >
              Bundles
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <AuthButton />
          <ConnectButton
            showBalance={false}
            accountStatus="avatar"
            chainStatus="icon"
          />
        </div>
      </div>
    </header>
  );
}
