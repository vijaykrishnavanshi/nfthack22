import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Spin } from "antd";
import Invoice from "./Invoice/Invoice";
import { getInvoice, payInvoice } from "../util/invoice";
import { useParams } from "react-router-dom";
import { createPaymentNFT } from "../util/nftport";
import { ACTIVE_CHAIN_ID, CHAIN_OPTIONS } from "../util/constants";
import logo from "../assets/logo.png";

function Pay({ match }) {
  const { payId } = useParams();
  const [data, setData] = useState({
    url: "google.com",
    units: "USDC",
    id: 123,
    items: [
      {
        name: "SaaS subscription: 1 year",
        price: 100,
      },
    ],
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();

  const fetchData = async () => {
    console.log("fetch", payId);
    if (!payId) {
      return;
    }

    setLoading(true);
    try {
      const res = await getInvoice(payId);
      setData(res.data);
      console.log("invoice", res.data);
    } catch (e) {
      console.error(e);
      alert("error getting paydata" + e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [payId]);

  const pay = async (payData, useCC) => {
    let res;
    const nftResults = {};
    const { buyerAddress } = payData;

    if (useCC) {
      setLoading(true);
      try {
        res = await payInvoice(buyerAddress, useCC);
        nftResults["payment"] = res;
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    } else {
      const config = {
        pessimistic: true,
        locks: {
          "0x43090E9e8ec709811C777ffa03111Bd1Bb0ca65c": {
            network: 4,
            name: data.title,
          },
        },
        icon: "https://i.ibb.co/YR4nzVS/favicon.png",
        callToAction: {
          default: `${data.title}. ${data.description}. Complete payment for this invoice below:`,
        },
        metadataInputs: [
          {
            name: "Address for NFT receipt",
            type: "text",
            required: true,
          },
          {
            name: "Additional notes",
            type: "text",
            required: false,
          },
        ],
      };
      window.unlockProtocol && window.unlockProtocol.loadCheckoutModal(config);
      // TODO: nft issue
      return;
    }
    setLoading(true);

    const chain = CHAIN_OPTIONS[data.chainId] || ACTIVE_CHAIN_ID;

    const { destination, description, title } = data.properties;

    try {
      // TODO: add payment rollback if NFT mint fails.
      nftResults["buyer"] = await createPaymentNFT(
        chain,
        title,
        description,
        data,
        buyerAddress
      );
      //   https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDM-easy-minting-w-url
      nftResults["issuer"] = await createPaymentNFT(
        chain,
        title,
        description,
        data,
        destination
      );
      setResult(nftResults);
    } catch (e) {
      console.error(e);
      alert("Error issuing NFT: " + e.toString() + ". Please retry payment.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <Spin size="large" />;
      </div>
    );
  }

  if (result) {
    return (
      <div>
        <img src={logo} className="header-logo" />
        <br />
        <br />
        <h1>Transaction complete!</h1>
        <p>
          Both you and the issuer received NFT's in your respective wallet
          addresses.
        </p>
        <p>Full response below:</p>
        <pre>{JSON.stringify(result, null, "\t")}</pre>
      </div>
    );
  }

  return (
    <div>
      <Invoice {...data} {...data.properties} pay={pay} payId={payId} />
    </div>
  );
}

Pay.propTypes = {};

export default Pay;
