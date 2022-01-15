export const NFT_KEY = process.env.REACT_APP_NFT_KEY; // your API key from https://nft.storage/manage)
export const COVALENT_KEY = process.env.REACT_APP_COVALENT_KEY; // covalent api key
export const NFT_PORT_KEY = process.env.REACT_APP_NFT_PORT_KEY; // nft port key

console.log("hashes", NFT_KEY, COVALENT_KEY, NFT_PORT_KEY);

export const APP_NAME = "NFTpay";
export const APP_DESC = "NFT-backed invoices";

export const CHAIN_OPTIONS = {
  1: { name: "Ethereum", url: "https://etherscan.io/tx/" },
  42: { name: "Kovan", url: "https://kovan.etherscan.io/tx/" },
};
