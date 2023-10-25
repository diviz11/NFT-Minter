
# NFT Minter

![App Screenshot](https://github.com/diviz11/NFT-Minter/assets/97678842/d506b2e7-1156-4a3e-927d-16fcd1131c59)
![App Screenshot](https://github.com/diviz11/NFT-Minter/assets/97678842/03a9e3b2-2485-497b-a186-c966b7ac0365)

We will dive into the world of blockchain and NFTs by minting our very own NFT collection. NFTs are unique digital assets that represent ownership or proof of authenticity of a digital item, such as art, collectables, or even virtual real estate, using blockchain technology.

* Mint a collection of our favourite television characters. Find images of our favorite television characters and deploy a smart contract that will mint an NFT for each character.
* Set a maximum limit of 3000 NFTs for our collection.
* Implement functionality to allow the owner of an NFT to change its image.


## Table of Contents
- [Table of Contents](#table-of-contents)
- [Demo](#demo)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Important Note](#important-note)
- [Deployment](#deployment)
- [Challenges Faced](#challenges-faced)
- [Acknowledgements](#acknowledgements)
## Demo

You can watch a video demonstration of this project by clicking the link below:

[Watch Video Demo](https://drive.google.com/file/d/1NzuTzVGYysIb8LmAhdYzqPOosatAsIE9/view?usp=sharing)

This video demo provides a visual overview of the project's functionality and how to use it effectively.

## Usage

To use the minting functionality, you'll need to deploy your own instance of the contract. Follow these steps to deploy the contract using Remix:

1. Copy the contract source code from `contracts/myNFT.sol` to Remix.
2. Ensure that the compiler version in Remix is compatible with the contract code.
3. Deploy the contract through Remix and specify the desired network (e.g., Rinkeby, Ropsten, etc.).
4. Once deployed, copy the contract address of your instance.

Now you have your own deployed contract instance with minting capabilities. You'll need to modify the contract ABI accordingly for interaction.

**Note**: Ensure that you are the owner of the deployed contract to access minting functionality.
#
After deploying your own instance of the contract, you need to modify the contract ABI to interact with your deployed contract. Here's how to do it:

1. Download the contract ABI JSON file from [Contract ABI](https://example.com/contract-abi.json).
2. Open the ABI file and update the contract address with the address of your deployed contract.
3. Now you can use the updated ABI to interact with your deployed contract for minting and other functionalities.

Remember that only the owner of the deployed contract can access minting functionality.


    
## Dependencies

Before you can run this dApp, you need to set up some dependencies and tools. Here's what you'll need:

- [Alchemy](https://alchemyapi.io/) for interacting with Ethereum
- [Pinata API](https://pinata.cloud/) for managing IPFS assets
- [Rainbow Kit](https://example.com/rainbow-kit-docs) for wallet integration

Follow the installation and configuration instructions for each of these tools to ensure the app works correctly.

### Important Note

**Please Create Your Own API Keys and Credentials**

This project utilizes API keys and credentials for services such as Pinata and Alchemy to ensure proper functionality. I want to stress the importance of not using my personal API keys and credentials. Instead, it is recommend that you create your own keys and credentials by following the documentation of each respective service:

- [Pinata API](https://pinata.cloud/)
- [Alchemy](https://alchemyapi.io/)

By using your own API keys and credentials, you not only protect our security and privacy but also ensure a secure and separate environment for your own project. 

**Caution**: If you use my API keys or credentials, it may result in unintended errors or issues due to security restrictions.



## Deployment

To deploy this project run 

```bash
  cd waifu-nft
```
```bash
  npm install
```
```bash
  npm run dev
```
##  Challenges Faced

While developing this project, I encountered a challenge related to metadata handling and rendering on NFT marketplaces like OpenSea test nets. The issue arises from the structure of the metadata file, which is structured as JSON data but lacks a file extension.

**Issue**: Metadata not recognized as JSON.

**Explanation**: On some platforms, the absence of a file extension can lead to difficulties in identifying the metadata as JSON, resulting in the metadata not being displayed correctly.

Additionally, as this project was built in React rather than Next.js, which is typically recommended for blockchain development, there were challenges in integrating web3.js for blockchain interactions. Although the project functions well in its current state, addressing this challenge could enhance the overall user experience.

I would like to acknowledge the limitations and challenges faced during development, and I'm actively exploring solutions to address these issues in future updates.

## Acknowledgements

I would like to extend our gratitude to the [GDSC NITK Recruitments 2023](https://github.com/WebClub-NITK/GDSC-NITK-Recruitments-2023) for providing the recruitment task that inspired this project. 

Your recruitment task has been a valuable experience for me, and I appreciate the opportunity to showcase my abilities.
