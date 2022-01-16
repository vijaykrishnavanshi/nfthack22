export const ipfsUrl = (cid, fileName) => {
  let url = `https://ipfs.io/ipfs/${cid}`;
  if (fileName) {
    return `${url}/${fileName}`;
  }
  return url;
};

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const createJsonFile = (payload, fileName) => {
  const st = JSON.stringify(payload);
  const blob = new Blob([st], { type: "application/json" });
  const fileData = new File([blob], fileName);
  return fileData;
};

export const getDateStringFromTimestamp = (ts) => {
  return new Date(ts).toLocaleDateString();
};

export const col = (k) => ({
  title: capitalize(k),
  dataIndex: k,
  key: k,
});
