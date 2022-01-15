import { NFTStorage, File } from "nft.storage";
import { NFT_KEY } from "./constants";

const endpoint = "https://api.nft.storage"; // the default

const storage = new NFTStorage({ endpoint, token: NFT_KEY });

async function mintNFT(name, description, fileData, properties) {
  const metadata = await storage.store({
    name, // name of NFT
    description, // "Using the nft.storage metadata API to create ERC-1155 compatible metadata.",
    image: fileData,
    // image: new File([await fs.promises.readFile("pinpie.jpg")], "pinpie.jpg", {
    //   type: "image/jpg",
    // }),
    // "Any custom data can appear in properties, files are automatically uploaded.",
    properties,
  });
  console.log("IPFS URL for the metadata:", metadata.url);
  console.log("metadata.json contents:\n", metadata.data);
  console.log(
    "metadata.json contents with IPFS gateway URLs:\n",
    metadata.embed()
  );
  return metadata;
}
