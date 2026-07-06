# Cyberpolis Market — Game Cosmetics NFT Marketplace

A frontend-only Next.js marketplace for in-game cosmetics as NFTs: **skins**
(pants, shirts, hoodies, shoes), **guns** (guns + gun skins), **hair**,
**face**, **character**, **accessory**, plus emotes, pets, vehicles and bundles.

Features:

- Wallet connect (MetaMask / WalletConnect) via **RainbowKit + wagmi + viem**
- **Login & sign up with wallet** — SIWE (EIP-4361) style message, verified client-side
- **Pay with wallet** — sends a real (testnet) transaction on Buy
- Category / subcategory browsing, search, rarity filters, sorting
- Dark Cyberpolis aesthetic (black/charcoal + blue/orange/red accents)
- Offline generative art per item (no external image dependencies)

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Configure (optional)

Edit `.env.local`:

- `NEXT_PUBLIC_WC_PROJECT_ID` — free WalletConnect/Reown project id (MetaMask
  works without it; other wallets need it).
- `NEXT_PUBLIC_TREASURY_ADDRESS` — the address that receives "pay with wallet"
  payments. Use a testnet address you control.

## Notes

- This is a **frontend-only** build: items are mock data, and payments are plain
  native-token transfers on a **testnet** (default chains include Sepolia,
  Polygon Amoy, Base Sepolia). No real smart contracts are deployed yet — that's
  the next phase (ERC-1155 minting + a marketplace contract).
- Stack: Solidity (next phase) + TypeScript / Next.js / React.
