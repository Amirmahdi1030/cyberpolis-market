"use client";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, polygon, base, sepolia, polygonAmoy, baseSepolia } from "wagmi/chains";

// WalletConnect project id (injected wallets like MetaMask work regardless).
const projectId =
  process.env.NEXT_PUBLIC_WC_PROJECT_ID || "demo-placeholder-projectid";

export const config = getDefaultConfig({
  appName: "Cyberpolis Market",
  projectId,
  // Testnets first so "pay with wallet" is safe to try without real funds.
  chains: [sepolia, polygonAmoy, baseSepolia, mainnet, polygon, base],
  ssr: true,
});

// Where "pay with wallet" sends funds. Override via env for your own testnet address.
export const TREASURY_ADDRESS = (process.env.NEXT_PUBLIC_TREASURY_ADDRESS ||
  "0x0000000000000000000000000000000000000000") as `0x${string}`;
