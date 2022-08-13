export const APP_NAME = "Microtab";
export const APP_DESC = "Micro-invoicing on Solana"

export const CHAIN_OPTIONS = {
  1: {
    name: "Solana",
    url: "https://explorer.solana.com/",
    rpc: "https://api.mainnet-beta.solana.com",
    cluster: 'mainnet-beta',
    id: '0x1'
  },
  2: {
    name: "Solana Testnet",
    url: "https://explorer.solana.com/",
    rpc: "https://api.testnet.solana.com",
    cluster: 'testnet',
    id: '0x2',
  },
};

export const CHAIN_IDS = Object.keys(CHAIN_OPTIONS)

export const ACTIVE_CHAIN = CHAIN_OPTIONS["2"];

export const EXAMPLE_FORM = {
  title: "SaaS agreement for 2022",
  description: "Please agree to the included invoice document and amount.",
  payerAddress: "5dvPTySxLNAjLnrpaYQyMq7ttRrVidaMAz96PYF9tnuK",
  remittanceAddress: "",
  amount: 0.1,
  currency: 'SOL',
  files: [],
};


// Paste your NFT.Storage API key into the quotes:
export const NFT_STORAGE_KEY = process.env.REACT_APP_NFT_KEY;

export const IPFS_BASE_URL = "https://ipfs.io/ipfs"

console.log("config", ACTIVE_CHAIN);
