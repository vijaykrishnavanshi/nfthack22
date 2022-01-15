export const ipfsUrl = (cid) => `/${cid}`; // TODO

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const col = (k) => ({
  title: capitalize(k),
  dataIndex: k,
  key: k,
});
