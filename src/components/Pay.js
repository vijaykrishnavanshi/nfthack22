import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Spin } from "antd";
import Invoice from "./Invoice/Invoice";
import { getInvoice, payInvoice } from "../util/invoice";
import { useParams } from "react-router-dom";

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

  const pay = async () => {
    setLoading(true);
    try {
      const res = await payInvoice(res.data);
      setResult(res);
    } catch (e) {
      console.error(e);
      alert("error completing payment" + e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spin size="large" />;
  }

  if (result) {
    return (
      <div>
        <h1>Transaction complete!</h1>
        {JSON.stringify(result)}
      </div>
    );
  }

  return (
    <div>
      <Invoice {...data} pay={pay} payId={payId}/>
    </div>
  );
}

Pay.propTypes = {};

export default Pay;
