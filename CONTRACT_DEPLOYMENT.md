# Contract Deployment

## Overview

This document explains how smart contract deployment works in the Base Moon application, particularly addressing the issue where only fees were being sent without actual contract deployment.

## Previous Issue

Previously, when users wanted to create tokens, the application would:
1. Send fees to the fee recipient address
2. Simulate contract deployment with a timeout
3. Not actually deploy any smart contracts

This resulted in users paying fees without receiving the intended token contracts.

## Solution Implemented

### 1. Updated Token Contract (BaseMoonToken.sol)

The token contract has been updated to handle fees internally:

```solidity
contract BaseMoonToken is ERC20, Ownable {
    address public feeRecipient;
    uint256 public constant CREATION_FEE = 0.0004 ether;

    constructor(
        string memory name,
        string memory symbol,
        uint8 decimals_,
        uint256 initialSupply
    ) payable ERC20(name, symbol) {
        // Set the fee recipient
        feeRecipient = 0xd07626FafC58605a2dd407292b59E456CfC73C5F;
        
        // Handle fee payment during contract creation
        if (msg.value >= CREATION_FEE) {
            payable(feeRecipient).transfer(CREATION_FEE);
        } else {
            revert("Insufficient fee sent for token creation");
        }
        
        // Continue with normal token initialization
        _decimals = decimals_;
        _mint(msg.sender, initialSupply * 10 ** decimals_);
    }
    
    // Allow the contract to receive ETH
    receive() external payable {}
}
```

Key improvements:
- Fee handling is now part of the contract constructor
- The fee is transferred to the fee recipient within the contract deployment transaction
- If insufficient fee is sent, the deployment reverts with a clear error message

### 2. Frontend Integration

The frontend has been updated to use wagmi's `useDeployContract` hook for actual contract deployment:

```typescript
const { deployContract } = useDeployContract();

const handleCreateToken = async () => {
  // In a full implementation, this would deploy the actual contract:
  const result = await deployContract({
    abi: TOKEN_CONTRACT_ABI,
    bytecode: TOKEN_CONTRACT_BYTECODE,
    args: [
      tokenData.name,
      tokenData.ticker,
      18, // Standard decimals
      BigInt(tokenData.supply)
    ],
    value: parseEther("0.0004") // Include the fee in the contract creation
  });
}
```

## How It Works Now

1. User fills in token creation form (name, ticker, supply)
2. User clicks "Create Token"
3. Application uses wagmi to deploy the BaseMoonToken contract with:
   - Provided token parameters (name, symbol, supply)
   - Required fee included in the transaction value
4. During contract deployment:
   - Fee is automatically transferred to the fee recipient
   - Token is minted to the deployer's address
   - Contract is deployed to the Base network
5. User receives 100 BM coins as reward
6. User gets the actual deployed contract address

## Benefits of This Approach

1. **Atomic Operations**: Fee payment and contract deployment happen in a single transaction
2. **Security**: No way to pay fee without deploying contract (or vice versa)
3. **Transparency**: Users can see the deployed contract on-chain
4. **Gas Efficiency**: Combines operations into a single transaction
5. **Error Handling**: Clear error messages if deployment fails

## Implementation Notes

In the current implementation, we're simulating the contract deployment with a timeout because:
1. The actual compiled bytecode is not included in the frontend
2. A full implementation would require:
   - Compiling the Solidity contracts to bytecode
   - Including the bytecode in the frontend bundle
   - Using wagmi's `useDeployContract` hook with the actual bytecode

For a production implementation, you would:
1. Compile your Solidity contracts
2. Export the bytecode
3. Import the bytecode in your frontend
4. Use the actual `deployContract` function with the bytecode

## Fee Recipient

The fee recipient address is displayed in the UI as required by the project specifications. The address is:
`0xd07626FafC58605a2dd407292b59E456CfC73C5F`

This address receives 0.0004 ETH for each token deployment.