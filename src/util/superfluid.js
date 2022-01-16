import SuperfluidSDK from "@superfluid-finance/js-sdk";
import { Web3Provider } from "@ethersproject/providers";

const SECONDS_PER_DAY = 3600 * 24;

export const RATE_MAP = {
  day: SECONDS_PER_DAY,
  week: SECONDS_PER_DAY * 7,
  month: SECONDS_PER_DAY * 30,
};

// TODO: replace with map
export const RINKEBY_USDC = "0xbe49ac1EadAc65dccf204D4Df81d650B50122aB2";

export const createFlow = async (recipient, flowRate, token) => {
  token = token || RINKEBY_USDC;
  flowRate = flowRate || 385802469135802;
  console.log("createFlow", recipient, token, flowRate);
  const walletAddress = await window.ethereum.request({
    method: "eth_requestAccounts",
    params: [
      {
        eth_accounts: {},
      },
    ],
  });
  const sf = new SuperfluidSDK.Framework({
    ethers: new Web3Provider(window.ethereum),
    tokens: ["ETHx"],
  });
  await sf.initialize();
  const userAccount = sf.user({
    address: walletAddress[0],
    token,
  });

  await userAccount.flow({
    recipient, // ex: "0xA8f3447922d786045CB582B0C825723B744a54df", recipient eth address
    flowRate,
  });

  const details = await userAccount.details();
  console.log(details);
  return details;
};

export const getDetails = async (token) => {
  token = token || RINKEBY_USDC;
  const walletAddress = await window.ethereum.request({
    method: "eth_requestAccounts",
    params: [
      {
        eth_accounts: {},
      },
    ],
  });
  const sf = new SuperfluidSDK.Framework({
    ethers: new Web3Provider(window.ethereum),
    tokens: ["ETHx"],
  });
  await sf.initialize();
  console.log("addr", walletAddress[0]);
  const userAccount = sf.user({
    address: walletAddress[0],
    token,
  });

  const details = await userAccount.details();
  console.log(details);
  return details;
};

export const cancelFlow = async (recipient, token) => {
  const walletAddress = await window.ethereum.request({
    method: "eth_requestAccounts",
    params: [
      {
        eth_accounts: {},
      },
    ],
  });
  const sf = new SuperfluidSDK.Framework({
    ethers: new Web3Provider(window.ethereum),
    tokens: ["ETHx"],
  });
  await sf.initialize();
  const userAccount = sf.user({
    address: walletAddress[0],
    token,
  });

  await userAccount.flow({
    recipient, // ex: "0xA8f3447922d786045CB582B0C825723B744a54df", recipient eth address
    flowRate: 0,
  });

  const details = await userAccount.details();
  console.log(details);
  return details;
};
