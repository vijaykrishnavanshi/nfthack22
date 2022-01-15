import { File } from "https://cdn.jsdelivr.net/npm/nft.storage/dist/bundle.esm.min.js";
import { ipfsUrl } from ".";
import { mintNFT } from "./stor";
import axios from "axios";

export const EXAMPLE_FORM = {
  callbackUrl: "",
  title: "My Invoice",
  itemName: "SaaS Subscription (1 year)",
  destination: "",
  itemCost: 1000,
  description: "",
  logo: "",
  units: "USDC",
};

export const createInvoice = async (payload) => {
  const { title, destination, callbackUrl, items, description, cost } = payload;
  const properties = {
    destination,
    callbackUrl,
    items,
    cost,
  };
  const st = JSON.stringify(payload);
  const blob = new Blob([st], { type: "application/json" });
  const fileData = new File([blob], "invoice.json");

  const res = await mintNFT(title, description, fileData, properties);

  return res;
};

export const getInvoice = (cid) => {
  const url = `${ipfsUrl(cid)}/metadata.json`;
  return axios.get(url);
};

export const payInvoice = async ({}) => {};
