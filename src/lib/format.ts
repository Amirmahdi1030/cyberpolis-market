export function short(addr?: string) {
  if (!addr) return "";
  return addr.slice(0, 6) + "…" + addr.slice(-4);
}

export function eth(n: number) {
  return `${n} ETH`;
}
