export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-ink-950">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-white/40 sm:flex-row">
        <p>© {new Date().getFullYear()} Cyberpolis — game cosmetics NFT market.</p>
        <p className="text-white/30">
          Testnet demo · not financial advice · prices are simulated.
        </p>
      </div>
    </footer>
  );
}
