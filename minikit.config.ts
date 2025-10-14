// MiniKit Configuration for Base Moon Mini App
const ROOT_URL = "https://base-moon-ten.vercel.app";

export const minikitConfig = {
  accountAssociation: {
    // This will be added after account association step
    "header": "",
    "payload": "",
    "signature": ""
  },
  miniapp: {
    version: "1",
    name: "Base Moon",
    subtitle: "Base Airdrop Preparation Tool",
    description: "Tool for preparing wallets for Base airdrops with gamification elements",
    iconUrl: `${ROOT_URL}/logo.png`,
    splashImageUrl: `${ROOT_URL}/splash.png`,
    splashBackgroundColor: "#121212",
    homeUrl: ROOT_URL,
    primaryCategory: "utility",
    tags: ["base", "ethereum", "nft", "token", "smart-contract"],
    // Optional fields that can be added later
    screenshotUrls: [`${ROOT_URL}/preview.png`],
    heroImageUrl: `${ROOT_URL}/preview.png`,
    tagline: "Prepare your wallet for Base airdrops",
    ogTitle: "Base Moon - Farcaster Mini App",
    ogDescription: "Tool for preparing wallets for Base airdrops with gamification elements",
    ogImageUrl: `${ROOT_URL}/preview.png`,
  },
} as const;