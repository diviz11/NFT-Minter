const key = "6133f4fa5668b91ba948";
const secret =
  "6540bb11dbfd3f67648500eb5ce494441c7e558ce2f88390b222841234a4b989";
import axios from "axios";
// Use the api keys by providing the strings directly

export const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    })
    .then(function (response) {
      console.log(response);
      return {
        success: true,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      };
    })
    .catch(function (error) {
      console.log(error);
      return {
        success: false,
        message: error.message,
      };
    });
};

export const pinFileToIPFS = async (file) => {
  const formData = new FormData();

  // const file = fs.createReadStream(src)
  formData.append("file", file);

  const pinataMetadata = JSON.stringify({
    name: "waifu",
  });
  formData.append("pinataMetadata", pinataMetadata);

  const pinataOptions = JSON.stringify({
    cidVersion: 0,
  });
  formData.append("pinataOptions", pinataOptions);

  try {
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxBodyLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzM2E5OTAyMi0wMzU3LTRjM2ItODIyNy1hMjRlOWExMjAwOWIiLCJlbWFpbCI6ImQuYWtrc2hhdEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNjEzM2Y0ZmE1NjY4YjkxYmE5NDgiLCJzY29wZWRLZXlTZWNyZXQiOiI2NTQwYmIxMWRiZmQzZjY3NjQ4NTAwZWI1Y2U0OTQ0NDFjN2U1NThjZTJmODgzOTBiMjIyODQxMjM0YTRiOTg5IiwiaWF0IjoxNjk4MTU3NDUxfQ.YtrAzQd4wwFg_Hd2AblBlzG4QQIXNYeG9Uwi6auxzGM`,
        },
      }
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
