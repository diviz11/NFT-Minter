// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WaifuNFT is ERC721, Ownable {
    uint256 public constant MAX_SUPPLY = 3000;
    uint256 public totalSupply = 0;

    struct CharacterInfo {
        string tokenURI;
        address owner;
    }

    constructor(address initialOwner) ERC721("Anime URI NFT", "WIN") Ownable(initialOwner) {}

    mapping(uint256 => CharacterInfo) public characterInfo;

    function mintNFT(address recipient, string memory tokenURI) public onlyOwner {
        require(totalSupply < MAX_SUPPLY, "Maximum supply reached");
        uint256 tokenId = totalSupply + 1;
        _mint(recipient, tokenId);
        characterInfo[tokenId] = CharacterInfo({
            tokenURI: tokenURI,
            owner: recipient
        });
        totalSupply++;
    }

    function changeImage(uint256 tokenId, string memory newTokenURI) public {
        require(ownerOf(tokenId) == msg.sender, "Not the owner");
        characterInfo[tokenId].tokenURI = newTokenURI;
    }
}
