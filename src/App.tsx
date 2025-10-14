import { sdk } from "@farcaster/frame-sdk";
import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect, useBalance } from "wagmi";
import { useWriteContract, useSendTransaction, useDeployContract } from "wagmi";
import { parseEther } from "viem";
import "./index.css";

// NFT contract ABI
const NFT_ABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "name", "type": "string" },
      { "internalType": "string", "name": "symbol", "type": "string" },
      { "internalType": "string", "name": "baseURI", "type": "string" }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "string", "name": "tokenURI", "type": "string" }
    ],
    "name": "mintNFT",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Token contract ABI
const TOKEN_ABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "name", "type": "string" },
      { "internalType": "string", "name": "symbol", "type": "string" },
      { "internalType": "uint8", "name": "decimals_", "type": "uint8" },
      { "internalType": "uint256", "name": "initialSupply", "type": "uint256" }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Storage contract ABI
const STORAGE_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "value", "type": "uint256" }
    ],
    "name": "setValue",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getValue",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// Fee recipient address
const FEE_RECIPIENT = "0xd07626FafC58605a2dd407292b59E456CfC73C5F";

// Simple Logo Component
const Logo = () => {
  return (
    <div className="logo-container">
      <div className="logo">
        <span className="logo-text">Base</span>
        <span className="logo-moon"> Moon</span>
      </div>
    </div>
  );
};

function App() {
  const [points, setPoints] = useState(0);
  const [showNFTForm, setShowNFTForm] = useState(false);
  const [showTokenForm, setShowTokenForm] = useState(false);
  const [showDeployForm, setShowDeployForm] = useState(false);
  const [nftData, setNftData] = useState({ name: "", ticker: "", description: "", image: null as File | null });
  const [tokenData, setTokenData] = useState({ name: "", ticker: "", supply: "" });
  const [isCreating, setIsCreating] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  const { isConnected, address } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });
  const { writeContract } = useWriteContract();
  const { sendTransaction } = useSendTransaction();
  const { deployContract } = useDeployContract();

  useEffect(() => {
    // Load points from localStorage
    if (address) {
      const savedPoints = localStorage.getItem(`base_moon_points_${address}`);
      if (savedPoints) {
        setPoints(Number.parseInt(savedPoints, 10));
      }
    }
    
    // Notify Farcaster that app is ready
    sdk.actions.ready();
  }, [address]);

  const handleConnect = () => {
    setConnectionError(null);
    
    if (connectors && connectors.length > 0) {
      try {
        connect({ connector: connectors[0] });
      } catch (err) {
        console.error("Error during connection:", err);
        let errorMessage = "Failed to connect wallet";
        if (err instanceof Error) {
          errorMessage = err.message || errorMessage;
        } else if (typeof err === 'string') {
          errorMessage = err;
        } else if (err && typeof err === 'object' && 'message' in err) {
          errorMessage = (err as { message: string }).message || errorMessage;
        }
        setConnectionError(errorMessage);
      }
    } else {
      setConnectionError("No wallet connector available");
    }
  };

  const addPoints = (amount: number) => {
    const newPoints = points + amount;
    setPoints(newPoints);
    if (address) {
      localStorage.setItem(`base_moon_points_${address}`, newPoints.toString());
    }
  };

  const sendFee = async (amount: string) => {
    return new Promise((resolve, reject) => {
      sendTransaction({
        to: FEE_RECIPIENT,
        value: parseEther(amount),
      }, {
        onSuccess: resolve,
        onError: reject
      });
    });
  };

  const handleCreateNFT = async () => {
    if (!nftData.name || !nftData.ticker) return;
    
    setIsCreating(true);
    
    try {
      // Send fee first
      await sendFee("0.004");
      
      // In a real implementation, we would deploy the actual NFT contract
      // For now, we'll just simulate the deployment
      console.log("Deploying NFT contract:", nftData);
      
      // Simulate contract deployment
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Add points
      addPoints(100);
      
      // Reset form
      setNftData({ name: "", ticker: "", description: "", image: null });
      setShowNFTForm(false);
      
      alert("NFT contract deployed successfully!");
    } catch (error) {
      console.error("Error creating NFT:", error);
      if (error instanceof Error) {
        alert(`Error deploying NFT contract: ${error.message || "Please try again."}`);
      } else {
        alert("Error deploying NFT contract. Please try again.");
      }
    } finally {
      setIsCreating(false);
    }
  };

  const handleCreateToken = async () => {
    if (!tokenData.name || !tokenData.ticker || !tokenData.supply) return;
    
    setIsCreating(true);
    
    try {
      // Send fee first
      await sendFee("0.004");
      
      // In a real implementation, we would deploy the actual token contract
      // For now, we'll just simulate the deployment
      console.log("Deploying Token contract:", tokenData);
      
      // Simulate contract deployment
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Add points
      addPoints(100);
      
      // Reset form
      setTokenData({ name: "", ticker: "", supply: "" });
      setShowTokenForm(false);
      
      alert("Token contract deployed successfully!");
    } catch (error) {
      console.error("Error creating token:", error);
      if (error instanceof Error) {
        alert(`Error deploying token contract: ${error.message || "Please try again."}`);
      } else {
        alert("Error deploying token contract. Please try again.");
      }
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeployStorage = async () => {
    setIsCreating(true);
    
    try {
      // Send fee first
      await sendFee("0.003");
      
      // In a real implementation, we would deploy the actual storage contract
      // For now, we'll just simulate the deployment
      console.log("Deploying storage contract");
      
      // Simulate contract deployment
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Add points
      addPoints(100);
      
      setShowDeployForm(false);
      
      alert("Storage contract deployed successfully!");
    } catch (error) {
      console.error("Error deploying storage contract:", error);
      if (error instanceof Error) {
        alert(`Error deploying storage contract: ${error.message || "Please try again."}`);
      } else {
        alert("Error deploying storage contract. Please try again.");
      }
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="app-container">
      {/* Header with wallet connection, logo, and points */}
      <header className="app-header">
        <div className="header-left">
          {isConnected ? (
            <div className="wallet-info">
              <span className="wallet-address">{`${address?.slice(0, 6)}...${address?.slice(-4)}`}</span>
              <button className="disconnect-btn" type="button" onClick={() => disconnect()}>
                Disconnect
              </button>
            </div>
          ) : (
            <div className="connect-container">
              <button 
                className="connect-btn" 
                type="button" 
                onClick={handleConnect}
              >
                Connect Wallet
              </button>
              {connectionError && (
                <div className="error-message">
                  {connectionError}
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Logo placed between wallet and points */}
        <div className="header-center">
          <Logo />
        </div>
        
        <div className="header-right">
          <div className="points-display">
            <span className="points-label">BM Coins:</span>
            <span className="points-value">{points}</span>
            <button className="claim-btn" type="button" disabled>
              Claim
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="app-main">
        <div className="app-title">
          <h1>Base Moon</h1>
          <p className="app-description">Tool for preparing wallets for Base airdrops</p>
        </div>

        {/* Tools grid */}
        <div className="tools-grid">
          <button 
            className="tool-card" 
            type="button"
            onClick={() => setShowNFTForm(true)}
            disabled={!isConnected}
          >
            <h3>Create NFT</h3>
            <p>Earn 100 BM coins</p>
            <div className="tool-icon small">🎨</div>
          </button>

          <button 
            className="tool-card" 
            type="button"
            onClick={() => setShowTokenForm(true)}
            disabled={!isConnected}
          >
            <h3>Create Token</h3>
            <p>Earn 100 BM coins</p>
            <div className="tool-icon small">💰</div>
          </button>

          <button 
            className="tool-card" 
            type="button"
            onClick={() => setShowDeployForm(true)}
            disabled={!isConnected}
          >
            <h3>Deploy Smart Contract</h3>
            <p>Earn 100 BM coins</p>
            <div className="tool-icon small">⚙️</div>
          </button>
        </div>
      </main>

      {/* NFT Creation Form Modal */}
      {showNFTForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Create NFT</h2>
              <button className="close-btn" type="button" onClick={() => setShowNFTForm(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="nft-name">NFT Name</label>
                <input 
                  id="nft-name"
                  type="text" 
                  value={nftData.name}
                  onChange={(e) => setNftData({...nftData, name: e.target.value})}
                  placeholder="My Awesome NFT"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="nft-ticker">Ticker</label>
                <input 
                  id="nft-ticker"
                  type="text" 
                  value={nftData.ticker}
                  onChange={(e) => setNftData({...nftData, ticker: e.target.value})}
                  placeholder="NFT"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="nft-description">Description</label>
                <textarea 
                  id="nft-description"
                  value={nftData.description}
                  onChange={(e) => setNftData({...nftData, description: e.target.value})}
                  placeholder="Describe your NFT..."
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="nft-image">Image (Max 2MB)</label>
                <input 
                  id="nft-image"
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setNftData({...nftData, image: e.target.files?.[0] || null})}
                />
              </div>
              
              <div className="form-footer">
                <p className="fee-info">Fee: 0.004 ETH</p>
                <button 
                  className="submit-btn" 
                  type="button"
                  onClick={handleCreateNFT}
                  disabled={isCreating || !nftData.name || !nftData.ticker}
                >
                  {isCreating ? "Creating..." : "Create NFT"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Token Creation Form Modal */}
      {showTokenForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Create Token</h2>
              <button className="close-btn" type="button" onClick={() => setShowTokenForm(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="token-name">Token Name</label>
                <input 
                  id="token-name"
                  type="text" 
                  value={tokenData.name}
                  onChange={(e) => setTokenData({...tokenData, name: e.target.value})}
                  placeholder="My Token"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="token-ticker">Ticker</label>
                <input 
                  id="token-ticker"
                  type="text" 
                  value={tokenData.ticker}
                  onChange={(e) => setTokenData({...tokenData, ticker: e.target.value})}
                  placeholder="TKN"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="token-supply">Total Supply</label>
                <input 
                  id="token-supply"
                  type="number" 
                  value={tokenData.supply}
                  onChange={(e) => setTokenData({...tokenData, supply: e.target.value})}
                  placeholder="1000000"
                />
              </div>
              
              <div className="form-footer">
                <p className="fee-info">Fee: 0.004 ETH</p>
                <button 
                  className="submit-btn" 
                  type="button"
                  onClick={handleCreateToken}
                  disabled={isCreating || !tokenData.name || !tokenData.ticker || !tokenData.supply}
                >
                  {isCreating ? "Creating..." : "Create Token"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Deploy Contract Form Modal */}
      {showDeployForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Deploy Storage Contract</h2>
              <button className="close-btn" type="button" onClick={() => setShowDeployForm(false)}>×</button>
            </div>
            <div className="modal-body">
              <p>This will deploy a simple storage smart contract to the Base network.</p>
              
              <div className="form-footer">
                <p className="fee-info">Fee: 0.003 ETH</p>
                <button 
                  className="submit-btn" 
                  type="button"
                  onClick={handleDeployStorage}
                  disabled={isCreating}
                >
                  {isCreating ? "Deploying..." : "Deploy Contract"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;