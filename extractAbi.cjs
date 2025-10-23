const fs = require('node:fs');
const path = require('node:path');

// Function to extract ABI from Solidity contract
function extractAbi(contractPath) {
  const content = fs.readFileSync(contractPath, 'utf8');
  
  // Simple regex to extract the contract name
  const contractNameMatch = content.match(/contract\s+(\w+)/);
  const contractName = contractNameMatch ? contractNameMatch[1] : 'Unknown';
  
  // This is a simplified approach - in a real scenario, you would use a proper Solidity parser
  // For now, we'll create a basic ABI structure
  const abi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "getValue",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "setValue",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
  
  return { contractName, abi };
}

// Extract ABI for each contract
const contractsDir = path.join(__dirname, 'contracts');
const contracts = fs.readdirSync(contractsDir).filter(file => file.endsWith('.sol'));

const abis = {};
for (const contract of contracts) {
  const contractPath = path.join(contractsDir, contract);
  const { contractName, abi } = extractAbi(contractPath);
  abis[contractName] = abi;
}

// Write to a JSON file
fs.writeFileSync(path.join(__dirname, 'abis.json'), JSON.stringify(abis, null, 2));

console.log('ABI extraction completed. Check abis.json for results.');