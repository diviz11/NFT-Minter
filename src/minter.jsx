import React, { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit"; // Import ConnectButton from Rainbow Kit
// import { mintNFT } from "./utils/interact.js";
import { pinJSONToIPFS } from "./utils/pinata.js";
import { abi as contractABI } from "./contract-abi.json";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { useAccount } from "wagmi";
import { waitForTransaction } from "@wagmi/core";
import { pinFileToIPFS } from "./utils/pinata.js";

const Minter = () => {
  // State variables
  // const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageURI, setImageURI] = useState("");
  const [tokenURI, setTokenURI] = useState("");
  const [txHash, setTxHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [image, setImage] = useState("");
  const [imageIPFS, setImageIPFS] = useState("");

  const contractAddress = "0xe20D8db10561Ad36692c853D7Cb4deC4FaE63b0d"; // Replace with your contract address

  const { address } = useAccount();

  const contractCallInputs = {
    address: contractAddress,
    abi: [...contractABI],
    functionName: "mintNFT",
    args: [address, tokenURI],
  };

  const { config, error: wagmiSimulateError } =
    usePrepareContractWrite(contractCallInputs);

  const { writeAsync } = useContractWrite(config);

  const mintNFT = async (imageURI, name, description) => {
    // making metadata for the NFT
    setStatus("");
    setTokenURI("");
    try {
      setLoading(true);
      const metadata = {
        name: name,
        image: `https://ipfs.io/ipfs/${imageIPFS}`,
        description: description,
      };

      const pinataResponse = await pinJSONToIPFS(metadata);
      const URI = pinataResponse.pinataUrl;
      setTokenURI(URI);

      const txResponse = await writeAsync();
      const tx =
        txResponse && (await waitForTransaction({ hash: txResponse.hash }));
      console.log(tx);
      setLoading(false);
      if (tx?.status == "success") {
        setStatus("Success");
        setTxHash(tx.transactionHash);
        alert("Success you have minted your NFT");
      }
      setImage("");
    } catch (error) {
      throw "😥 Something went wrong: " + error.message;
    }
  };

  const onMintPressed = async () => {
    await mintNFT(imageURI, name, description);
  };

  function uploadFile() {
    document.getElementById("ipfs_file").click();
    setUploaded(true);
  }
  const handleFileSelected = async (e) => {
    if (e.target.files) {
      try {
        setLoading(true);
        //selecting image file
        const _files = e.target.files[0];
        const blob = new Blob([_files], { type: _files.type });
        const imageURL = URL.createObjectURL(blob);
        setImage(imageURL);
        const data = await pinFileToIPFS(blob);
        setImageIPFS(data.IpfsHash); //set ipfshash of the image uploaded

        setLoading(false);
      } catch (err) {
        throw err;
      }
    }
  };

  return (
    <div className="Minter">
      <ConnectButton />
      <h1 id="title">Waifu NFT Minter</h1>
      <p>Provide the information for your NFT:</p>
      <form>
        <div style={{ display: "flex" }}>
          <input
            id="ipfs_file"
            type="file"
            // style={{ display: "none" }}
            onChange={handleFileSelected}
          />
          {loading ? <img src="/Oval.svg" style={{ color: "red" }} /> : <></>}
        </div>
        {image.length > 0 && <img src={image} />}
        <h2>Image URI: </h2>
        <input
          type="text"
          placeholder="e.g. https://ipfs.io/ipfs/zeroTwo..."
          value={
            imageIPFS.length > 0 ? `https://ipfs.io/ipfs/${imageIPFS}` : ``
          }
          onChange={(event) => setImageURI(event.target.value)}
        />
        <h2>Name: </h2>
        <input
          type="text"
          placeholder="e.g. Zero Two"
          onChange={(event) => setName(event.target.value)}
        />
        <h2>Description: </h2>
        <input
          type="text"
          placeholder="e.g. Zero Two is a Klaxosaur hybrid..."
          onChange={(event) => setDescription(event.target.value)}
        />
      </form>
      <button id="mintButton" onClick={() => onMintPressed()}>
        {loading ? (
          <img src="/Oval.svg" style={{ color: "red" }} />
        ) : (
          "Mint NFT"
        )}
      </button>
      {status == "Success" && (
        <a
          target="_blank"
          href={`https://goerli.etherscan.io/tx/${txHash}`}
          style={{ marginLeft: "20px" }}
        >
          Click here to see the transaction
        </a>
      )}
      {tokenURI.length > 0 && (
        <a target="_blank" href={`${tokenURI}`} style={{ marginLeft: "20px" }}>
          Click here to see metaData
        </a>
      )}
    </div>
  );
};

export default Minter;
