// import { Web3Storage } from "web3.storage";
import axios from "axios";
import { Web3Storage } from "web3.storage/dist/bundle.esm.min.js"; // webpack 4
import { NFT_STORAGE_KEY } from "./constants";

// Import the NFTStorage class and File constructor from the 'nft.storage' package
import { NFTStorage} from "nft.storage/dist/bundle.esm.min.js";

const API_KEY = process.env.REACT_APP_STORAGE_KEY;
if (!API_KEY) {
  alert('REACT_APP_STORAGE_KEY environment variable is required')
}

function getAccessToken() {
  return API_KEY;
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}

export const ipfsUrl = (cid, fileName) => {
    let url = `https://ipfs.io/ipfs/${cid}`;
    if (fileName) {
      return `${url}/${fileName}`;
    }
    return url;
  };


export async function storeFiles(files) {
  console.log('store', files)
  const client = makeStorageClient();
  const cid = await client.put(files);
  console.log("stored files with cid:", cid);
  return cid;
}

export function fetchMetadata(cid) {
  const url = `${ipfsUrl(cid)}/metadata.json`
  return axios.get(url)
}

export async function retrieveFiles(cid) {
  const client = makeStorageClient();
  const res = await client.get(cid);
  console.log(`Got a response! [${res.status}] ${res.statusText}`);
  if (!res.ok) {
    throw new Error(`failed to get ${cid}`);
  }

  // request succeeded! do something with the response object here...

  return res;
}




async function loadImage(url) {
  const config = { url, method: "get", responseType: "blob" }
  const response = await axios.request(config)
  return response.data // the blob
}


export async function storeNFT(name, description, imageUrl) {
    // load the file from disk

    const url = imageUrl || 'https://upload.wikimedia.org/wikipedia/commons/c/c6/Celebration_fireworks.jpg'
  
    // https://stackoverflow.com/questions/6850276/how-to-convert-dataurl-to-file-object-in-javascript
    const blob = await loadImage(url)
    const image = new File([blob], "receipt.jpg", {
      type: "image/jpeg",
      lastModified: new Date(),
    });

    // create a new NFTStorage client using our API key
    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })

    // call client.store, passing in the image & metadata
    return nftstorage.store({
        image,
        name,
        description,
    })
}
