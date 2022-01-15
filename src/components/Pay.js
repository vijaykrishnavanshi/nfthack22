import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Spin } from "antd";
import Invoice from "./Invoice/Invoice";

function Pay({ payId }) {
  const [data, setData] = useState({
    amount: 100,
    url: "google.com",
    id: 123,
    items: [
      {
        name: "SaaS subscription: 1 year",
        price: 100,
        units: "USDC",
      },
    ],
  });
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!payId) {
      return;
    }

    setLoading(true);
    try {
      const res = {}; // TODO
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

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div>
      <Invoice {...data} />
    </div>
  );
}

Pay.propTypes = {};

export default Pay;
