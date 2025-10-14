// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BaseMoonStorage {
    uint256 private _value;
    address private _owner;

    event ValueChanged(uint256 value);

    constructor() {
        _owner = msg.sender;
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
}