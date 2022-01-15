import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Input, Select, Table } from "antd";
import { CHAIN_OPTIONS } from "../util/constants";
import { getTransactions } from "../util/covalent";
import { col } from "../util";

const { Option } = Select;

const COLUMNS = [
  col("tx_hash"),
  col("from_address"),
  col("to_address"),
  col("value"),
  col("gas_spent"),
];

function History(props) {
  const [address, setAddress] = useState();
  const [chainId, setChainId] = useState(1);
  const [loading, setLoading] = useState();
  const [data, setData] = useState();

  const fetchHistory = async () => {
    if (!address || !chainId) {
      alert("Address and chainId are required");
      return;
    }

    setLoading(true);
    try {
      const res = await getTransactions(chainId, address);
      setData(res.data.items);
    } catch (e) {
      console.error(e);
      alert("error getting paydata" + e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        prefix="Address"
      ></Input>
      <br />
      <p></p>
      <Select
        defaultValue="1"
        style={{ width: 120 }}
        onChange={(v) => setChainId(v)}
      >
        {Object.keys(CHAIN_OPTIONS).map((cId, i) => {
          return (
            <Option key={i} value={cId}>
              {CHAIN_OPTIONS[cId]}
            </Option>
          );
        })}
      </Select>
      &nbsp;
      <Button onClick={fetchHistory} disabled={loading} loading={loading}>
        View transactions
      </Button>
      <br />
      <hr />
      {data && (
        <div>
          <Table dataSource={data} columns={COLUMNS} />;
        </div>
      )}
    </div>
  );
}

History.propTypes = {};

export default History;
