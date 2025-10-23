# Base Moon

Base Moon is a tool for preparing wallets for Base airdrops by creating NFTs, tokens, and smart contracts on the Base network.

## Features

- Create NFTs on Base (0.0002 ETH fee)
- Create Tokens on Base (0.0002 ETH fee)
- Deploy Storage contracts on Base (0.0001 ETH fee)
- Earn BM coins for each successful deployment
- Works exclusively on Base Mainnet

## Prerequisites

- Node.js (v16 or higher)
- A Web3 wallet (MetaMask recommended)
- ETH on Base Mainnet for contract deployment fees

## Installation

```bash
npm install
```

## Building Contracts

To build the contracts and extract bytecode for deployment:

```bash
# Compile the Solidity contracts
npm run build:contracts

# Extract bytecode from artifacts
npm run extract:bytecode
```

## Development

```bash
npm run dev
```

## Building for Production

```bash
npm run build
```

## Contract Deployment

The application allows users to deploy three types of contracts:

1. **BaseMoonNFT** - An ERC-721 NFT contract (0.0002 ETH fee)
2. **BaseMoonToken** - An ERC-20 token contract (0.0002 ETH fee)
3. **BaseMoonStorage** - A simple storage contract (0.0001 ETH fee)

Each contract deployment includes a fee that is sent to a designated fee recipient address.

## How It Works

1. Connect your wallet (must be on Base Mainnet)
2. Choose one of the three contract deployment options
3. Fill in the required information
4. Confirm the transaction in your wallet
5. Earn 100 BM coins for each successful deployment

## Network Requirements

This application only works on Base Mainnet (chain ID: 8453). If you're on a different network, you'll need to switch to Base Mainnet in your wallet.

## Fees

- NFT Creation: 0.0002 ETH
- Token Creation: 0.0002 ETH
- Storage Contract Deployment: 0.0001 ETH

These fees are included in the contract deployment transaction and are sent to the contract's fee recipient.

## Troubleshooting

If you're experiencing issues with contract deployment:

1. Ensure you're on Base Mainnet
2. Check that you have sufficient ETH for the deployment fee
3. Make sure the contracts have been compiled and bytecode is available
4. Verify that your wallet is properly connected

## Development Notes

The application uses:
- React for the frontend
- Wagmi for wallet integration
- Viem for Ethereum interactions
- Hardhat for contract compilation

For actual contract deployment to work, the contracts must be compiled to generate bytecode, which is then used in the deployment process.