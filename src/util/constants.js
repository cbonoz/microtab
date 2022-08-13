export const COVALENT_KEY = process.env.REACT_APP_COVALENT_KEY; // covalent api key
export const NFT_PORT_KEY = process.env.REACT_APP_NFT_PORT_KEY; // nft port key

export const APP_NAME = "Microtab";
export const APP_DESC = "Micro-invoicing on Solana"

export const CHAIN_OPTIONS = {
  1: {
    name: "Solana",
    url: "https://explorer.solana.com/",
    rpc: "https://rpc.ankr.com/solana",
    id: '0x1'
  },
  2: {
    name: "Solana Testnet",
    url: "https://explorer.solana.com/",
    rpc: "https://rpc.ankr.com/solana",
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

export const IPFS_BASE_URL = "https://ipfs.io/ipfs"

console.log("config", COVALENT_KEY, NFT_PORT_KEY, ACTIVE_CHAIN);
