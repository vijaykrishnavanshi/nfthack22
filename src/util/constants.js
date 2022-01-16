export const NFT_KEY = process.env.REACT_APP_NFT_KEY; // your API key from https://nft.storage/manage)
export const COVALENT_KEY = process.env.REACT_APP_COVALENT_KEY; // covalent api key
export const NFT_PORT_KEY = process.env.REACT_APP_NFT_PORT_KEY; // nft port key

console.log("hashes", NFT_KEY, COVALENT_KEY, NFT_PORT_KEY);

export const APP_NAME = "NFTpay";
export const APP_DESC = "NFT-backed invoices";

export const CIRCLE_BASE_URL =
  process.env.REACT_APP_CIRCLE_URL || "https://api-sandbox.circle.com";

export const CHAIN_OPTIONS = {
  1: { name: "ethereum", url: "https://etherscan.io/tx/", id: 1 },
  42: { name: "kovan", url: "https://kovan.etherscan.io/tx/", id:42 },
  4: { name: "rinkeby", url: "https://rinkeby.etherscan.io/tx/", id:4 },
};

export const ACTIVE_CHAIN_ID = CHAIN_OPTIONS['4'];
