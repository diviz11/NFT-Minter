import { pinJSONToIPFS } from "./pinata.js";
import contractABI from "../contract-abi.json";
import { useContractWrite } from "wagmi";


const mintNFT = async (imageURI, name, description) => {

  const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"; // Replace with your contract address
 
  const metadata = new Object();
  metadata.name = name;
  metadata.image = imageURI;
  metadata.description = description;

  const pinataResponse = await pinJSONToIPFS(metadata);
  const tokenURI = pinataResponse.pinataUrl;

  const { data, isError, isLoading, write } = useContractWrite(
    {
      addressOrName: contractAddress,
      contractInterface: contractABI,
    },
    "mintNFT",
    {
      args: ["0xd50A5c68D48B05a5cEC3b2a8EE61994044394659", tokenURI],
    }
  );

  // if (imageURI.trim() == "" || name.trim() == "" || description.trim() == "") {
  //   return {
  //     success: false,
  //     status: "❗Please make sure all fields are completed before minting.",
  //   };
  // }

  // Make metadata

  // Pin the JSON metadata to IPFS
  
  // if (!pinataResponse.success) {
  //   return {
  //     success: false,
  //     status: "😢 Something went wrong while uploading your tokenURI.",
  //   };
  // }

  // const { data: signer } = useSigner()

  // const contract = useContract({
  //   addressOrName: contractAddress,
  //   contractInterface: contractABI,
  //   signerOrProvider: signer,
  // })

  // console.log(address);
  // console.log(signer);
  // console.log(contract);

  // Use the selected wallet from Rainbow Kit
  // const selectedWallet = wagmiConfig.wagmi.selectedWallet;
  // if (!selectedWallet) {
  //   return {
  //     success: false,
  //     status: "❗ Please connect your wallet before minting.",
  //   };
  // }
  // const signer = selectedWallet.getSigner();

  // const contract = new ethers.Contract(contractAddress, contractABI, signer);

  // const transactionParameters = {
  //   to: contractAddress,
  //   data: contract.interface.encodeFunctionData("mintNFT", [
  //     address, tokenURI
  //   ]),
  // };

  try {
    const txResponse = await write();

    // Wait for the transaction to be mined
    // await txResponse.wait();

    return {
      success: true,
      status:
        "✅ Transaction successful: " + txResponse.isSuccess + txResponse.data,
    };
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    };
  }
};
