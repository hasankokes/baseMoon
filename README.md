# Base Moon - Farcaster Mini App

A Farcaster mini app for preparing wallets for Base airdrops with gamification elements.

## Features

- **Wallet Connection**: Connect your Ethereum wallet (MetaMask, etc.)
- **Points System**: Earn BM coins for completing tasks
- **NFT Creation**: Create custom NFTs with name, ticker, description, and image
- **Token Creation**: Create custom tokens with name, ticker, and supply
- **Smart Contract Deployment**: Deploy simple storage contracts to Base network
- **Persistent Points**: Points are saved per wallet address using localStorage

## Tools

1. **Create NFT**: Earn 100 BM coins
   - Fee: 0.0004 ETH
   - Create custom NFTs with name, ticker, description, and image

2. **Create Token**: Earn 100 BM coins
   - Fee: 0.0004 ETH
   - Create custom tokens with name, ticker, and supply

3. **Deploy Smart Contract**: Earn 100 BM coins
   - Fee: 0.0003 ETH
   - Deploy a simple storage contract to the Base network

## Technologies Used

- React + TypeScript
- Vite
- Wagmi for wallet integration
- Viem for Ethereum interactions
- Farcaster Frame SDK
- CSS3 with modern gradients and animations

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to the provided local URL (typically http://localhost:5173)

## Deployment

To build for production:
```bash
npm run build
```

The build files will be output to the `dist` directory.

## Farcaster Assets

This app includes the required assets for Farcaster mini app integration:
- `public/logo.png` (192x192) - App icon
- `public/splash.png` (400x400) - Splash screen
- `public/.well-known/farcaster.json` - Manifest file

SVG versions of the assets are provided in the `public` directory. To create the required PNG files:
1. Convert `public/logo.svg` to a 192x192 PNG
2. Convert `public/splash.svg` to a 400x400 PNG
3. Replace the placeholder PNG files

See `ASSETS_INSTRUCTIONS.md` for detailed conversion instructions.

## Smart Contracts

The app includes sample smart contracts in the `contracts` directory:
- BaseMoonNFT.sol - ERC721 NFT contract
- BaseMoonToken.sol - ERC20 Token contract
- BaseMoonStorage.sol - Simple storage contract

## Farcaster Integration

This app is designed as a Farcaster mini app and includes:
- Proper manifest file at `public/.well-known/farcaster.json`
- Farcaster Frame SDK integration
- Responsive design for mobile Farcaster clients

## License

MIT