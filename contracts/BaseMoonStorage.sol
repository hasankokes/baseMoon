// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BaseMoonStorage {
    uint256 private _value;
    address private _owner;
    address public feeRecipient;
    uint256 public constant CREATION_FEE = 0.0001 ether;

    event ValueChanged(uint256 value);

    constructor() payable {
        _owner = msg.sender;
        
        // Set the fee recipient
        feeRecipient = 0xd07626FafC58605a2dd407292b59E456CfC73C5F;
        
        // Handle fee payment during contract creation
        if (msg.value >= CREATION_FEE) {
            payable(feeRecipient).transfer(CREATION_FEE);
        } else {
            revert("Insufficient fee sent for storage contract creation");
        }
    }

    modifier onlyOwner() {
        require(msg.sender == _owner, "Not owner");
        _;
    }

    function setValue(uint256 value) public onlyOwner {
        _value = value;
        emit ValueChanged(value);
    }

    function getValue() public view returns (uint256) {
        return _value;
    }

    function getOwner() public view returns (address) {
        return _owner;
    }
    
    // Allow the contract to receive ETH
    receive() external payable {}
}