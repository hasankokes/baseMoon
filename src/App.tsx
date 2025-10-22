import { sdk } from "@farcaster/frame-sdk";
import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import "./index.css";

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

  const { isConnected, address, chain } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  // Check if user is on the correct network (Base mainnet)
  const isCorrectNetwork = chain?.id === 8453; // Base mainnet chain ID

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
        } else if (typeof err === "string") {
          errorMessage = err;
        } else if (err && typeof err === "object" && "message" in err) {
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

  const handleCreateNFT = async () => {
    if (!nftData.name || !nftData.ticker) return;

    setIsCreating(true);

    try {
      // In a real implementation, we would deploy the actual NFT contract
      // For now, we'll just simulate the deployment with the correct fee
      console.log("Deploying NFT contract:", nftData);

      // Note: In a full implementation, this would deploy the actual contract:
      /*
      const result = await deployContract({
        abi: NFT_CONTRACT_ABI,
        bytecode: NFT_CONTRACT_BYTECODE,
        args: [
          nftData.name,
          nftData.ticker,
          "" // baseURI - could be added to the form
        ],
        value: parseEther("0.0002") // Updated fee amount
      });
      */

      // Simulate contract deployment
      await new Promise((resolve) => setTimeout(resolve, 2000));

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
      // In a real implementation, we would deploy the actual token contract
      // For now, we'll just simulate the deployment with the correct fee
      console.log("Deploying Token contract:", tokenData);

      // Note: In a full implementation, this would deploy the actual contract:
      /*
      const result = await deployContract({
        abi: TOKEN_CONTRACT_ABI,
        bytecode: TOKEN_CONTRACT_BYTECODE,
        args: [
          tokenData.name,
          tokenData.ticker,
          18, // Standard decimals
          BigInt(tokenData.supply)
        ],
        value: parseEther("0.0002") // Updated fee amount
      });
      */

      // Simulate contract deployment
      await new Promise((resolve) => setTimeout(resolve, 2000));

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
      // In a real implementation, we would deploy the actual storage contract
      // For now, we'll just simulate the deployment with the correct fee
      console.log("Deploying storage contract");

      // Note: In a full implementation, this would deploy the actual contract:
      /*
      const result = await deployContract({
        abi: STORAGE_CONTRACT_ABI,
        bytecode: STORAGE_CONTRACT_BYTECODE,
        args: [],
        value: parseEther("0.0001") // Updated fee amount
      });
      */

      // Simulate contract deployment
      await new Promise((resolve) => setTimeout(resolve, 2000));

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
              {!isCorrectNetwork && <div className="network-warning">Please switch to Base Mainnet</div>}
              <button className="disconnect-btn" type="button" onClick={() => disconnect()}>
                Disconnect
              </button>
            </div>
          ) : (
            <div className="connect-container">
              <button className="connect-btn" type="button" onClick={handleConnect}>
                Connect Wallet
              </button>
              {connectionError && <div className="error-message">{connectionError}</div>}
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

        {/* Network warning */}
        {isConnected && !isCorrectNetwork && (
          <div className="network-warning-banner">
            <p>This app only works on Base Mainnet. Please switch networks in your wallet.</p>
          </div>
        )}

        {/* Tools grid */}
        <div className="tools-grid">
          <button
            className="tool-card"
            type="button"
            onClick={() => setShowNFTForm(true)}
            disabled={!isConnected || !isCorrectNetwork}
          >
            <h3>Create NFT</h3>
            <p>Earn 100 BM coins</p>
            <div className="tool-icon small">🎨</div>
          </button>

          <button
            className="tool-card"
            type="button"
            onClick={() => setShowTokenForm(true)}
            disabled={!isConnected || !isCorrectNetwork}
          >
            <h3>Create Token</h3>
            <p>Earn 100 BM coins</p>
            <div className="tool-icon small">💰</div>
          </button>

          <button
            className="tool-card"
            type="button"
            onClick={() => setShowDeployForm(true)}
            disabled={!isConnected || !isCorrectNetwork}
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
              <button className="close-btn" type="button" onClick={() => setShowNFTForm(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="nft-name">NFT Name</label>
                <input
                  id="nft-name"
                  type="text"
                  value={nftData.name}
                  onChange={(e) => setNftData({ ...nftData, name: e.target.value })}
                  placeholder="My Awesome NFT"
                />
              </div>

              <div className="form-group">
                <label htmlFor="nft-ticker">Ticker</label>
                <input
                  id="nft-ticker"
                  type="text"
                  value={nftData.ticker}
                  onChange={(e) => setNftData({ ...nftData, ticker: e.target.value })}
                  placeholder="NFT"
                />
              </div>

              <div className="form-group">
                <label htmlFor="nft-description">Description</label>
                <textarea
                  id="nft-description"
                  value={nftData.description}
                  onChange={(e) => setNftData({ ...nftData, description: e.target.value })}
                  placeholder="Describe your NFT..."
                />
              </div>

              <div className="form-group">
                <label htmlFor="nft-image">Image (Max 2MB)</label>
                <input
                  id="nft-image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNftData({ ...nftData, image: e.target.files?.[0] || null })}
                />
              </div>

              <div className="form-footer">
                <p className="fee-info">Fee: 0.0002 ETH (included in contract deployment)</p>
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
              <button className="close-btn" type="button" onClick={() => setShowTokenForm(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="token-name">Token Name</label>
                <input
                  id="token-name"
                  type="text"
                  value={tokenData.name}
                  onChange={(e) => setTokenData({ ...tokenData, name: e.target.value })}
                  placeholder="My Token"
                />
              </div>

              <div className="form-group">
                <label htmlFor="token-ticker">Ticker</label>
                <input
                  id="token-ticker"
                  type="text"
                  value={tokenData.ticker}
                  onChange={(e) => setTokenData({ ...tokenData, ticker: e.target.value })}
                  placeholder="TKN"
                />
              </div>

              <div className="form-group">
                <label htmlFor="token-supply">Total Supply</label>
                <input
                  id="token-supply"
                  type="number"
                  value={tokenData.supply}
                  onChange={(e) => setTokenData({ ...tokenData, supply: e.target.value })}
                  placeholder="1000000"
                />
              </div>

              <div className="form-footer">
                <p className="fee-info">Fee: 0.0002 ETH (included in contract deployment)</p>
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
              <button className="close-btn" type="button" onClick={() => setShowDeployForm(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <p>This will deploy a simple storage smart contract to the Base network.</p>

              <div className="form-footer">
                <p className="fee-info">Fee: 0.0001 ETH (included in contract deployment)</p>
                <button className="submit-btn" type="button" onClick={handleDeployStorage} disabled={isCreating}>
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
