export const ipfsUrl = (cid, fileName) => {
  let url = `https://ipfs.io/ipfs/${cid}`;
  if (fileName) {
    return `${url}/${fileName}`;
  }
  return url;
};

export const invoiceUrl = (cid) => `${window.location.origin}/pay/${cid}`

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const createJsonFile = (payload, fileName) => {
  const st = JSON.stringify(payload);
  const blob = new Blob([st], { type: "application/json" });
  const fileData = new File([blob], fileName);
  return fileData;
};

export const getDateStringFromTimestamp = (ts, showTime) => {
  const d = new Date(ts);
  if (showTime) {
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
  }
  return d.toLocaleDateString();
};

export const col = (k) => ({
  title: capitalize(k),
  dataIndex: k,
  key: k,
});
