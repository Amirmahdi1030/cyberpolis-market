"use client";

import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { TREASURY_ADDRESS } from "@/lib/wagmi";
import { useAuth } from "./AuthProvider";
import { Item } from "@/lib/items";

export function BuyButton({ item }: { item: Item }) {
  const { isConnected } = useAccount();
  const { session } = useAuth();
  const {
    data: hash,
    sendTransaction,
    isPending,
    error,
    reset,
  } = useSendTransaction();
  const { isLoading: confirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  if (!isConnected) {
    return (
      <div className="space-y-2">
        <p className="text-sm text-white/50">Connect a wallet to buy.</p>
        <ConnectButton />
      </div>
    );
  }

  const pay = () => {
    reset();
    sendTransaction({
      to: TREASURY_ADDRESS,
      value: parseEther(String(item.price)),
    });
  };

  if (isSuccess) {
    return (
      <div className="rounded-xl border border-accent-blue/30 bg-accent-blue/10 p-4">
        <p className="font-semibold text-accent-blue">✓ Purchase confirmed</p>
        <p className="mt-1 break-all text-xs text-white/50">Tx: {hash}</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <button
        onClick={pay}
        disabled={isPending || confirming}
        className="w-full rounded-xl bg-gradient-to-r from-accent-blue to-accent-red px-5 py-3 font-display text-base font-bold text-white transition hover:opacity-90 disabled:opacity-50"
      >
        {isPending
          ? "Confirm in wallet…"
          : confirming
          ? "Processing…"
          : `Buy now · ${item.price} ETH`}
      </button>
      {!session && (
        <p className="text-center text-[11px] text-white/40">
          Tip: sign in with your wallet to track purchases.
        </p>
      )}
      {error && (
        <p className="text-center text-xs text-accent-red/80">
          {(error as any)?.shortMessage || "Transaction rejected."}
        </p>
      )}
    </div>
  );
}
