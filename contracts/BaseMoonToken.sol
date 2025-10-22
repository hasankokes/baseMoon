// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BaseMoonToken is ERC20, Ownable {
    uint8 private _decimals;
    address public feeRecipient;
    uint256 public constant CREATION_FEE = 0.0002 ether;

    constructor(
        string memory name,
        string memory symbol,
        uint8 decimals_,
        uint256 initialSupply
    ) payable ERC20(name, symbol) {
        _decimals = decimals_;
        _mint(msg.sender, initialSupply * 10 ** decimals_);
        
        // Set the fee recipient (could be passed as parameter or hardcoded)
        feeRecipient = 0xd07626FafC58605a2dd407292b59E456CfC73C5F;
        
        // Handle fee payment during contract creation
        if (msg.value >= CREATION_FEE) {
            payable(feeRecipient).transfer(CREATION_FEE);
        } else {
            revert("Insufficient fee sent for token creation");
        }
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount * 10 ** _decimals);
    }

    function burn(uint256 amount) public {
        _burn(msg.sender, amount * 10 ** _decimals);
    }

    function decimals() public view override returns (uint8) {
        return _decimals;
    }
    
    // Allow the contract to receive ETH
    receive() external payable {}
}