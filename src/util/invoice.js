import { File } from "https://cdn.jsdelivr.net/npm/nft.storage/dist/bundle.esm.min.js";
import { createJsonFile, ipfsUrl } from ".";
import { mintNFT } from "./stor";
import axios from "axios";
import { createPayment } from "./circle";

export const EXAMPLE_FORM = {
  callbackUrl: "",
  title: "My Invoice",
  itemName: "SaaS Subscription (1 year)",
  destination: "",
  itemCost: 1000,
  description: "",
  logoUrl: "",
  units: "USDC",
};

export const createInvoice = async (payload) => {
  const fileData = createJsonFile(payload, "invoice.json");
  const res = await mintNFT(
    payload.title,
    payload.description,
    fileData,
    payload
  );
  return res;
};

export const getInvoice = (cid) => {
  const url = `${ipfsUrl(cid)}/metadata.json`;
  return axios.get(url);
};

export const payInvoice = async (data, useCC) => {
  if (useCC) {
    return createPayment(data);
  }
};
