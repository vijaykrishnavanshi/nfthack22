import { Button, Tooltip, Modal, Input } from "antd";
import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { APP_NAME } from "../../util/constants";
import PaymentForm from "../PaymentForm";

import "./Invoice.css";
import "react-credit-cards/es/styles-compiled.css";
import { getDateStringFromTimestamp } from "../../util";

const IMG_WIDTH = "200px";

const DEMO_NUMBER =
  Date.now().toString(36) + Math.random().toString(36).substring(2);

// github.com/sparksuite/simple-html-invoice-template
function Invoice({
  name,
  description,
  units,
  callbackUrl,
  destination,
  ref,
  createdAt,
  pay,
  imgData,
  logoUrl,
  payId,
  properties,
}) {
  const [circleModal, setCircleModal] = useState();
  const [buyerAddress, setBuyerAddress] = useState();
  const [payData, setPayData] = useState({
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  });

  const invoiceNumber = payId || DEMO_NUMBER;
  const items = (properties || {}).items || [];
  const total = items
    .map((item) => item.cost)
    .reduce(function (a, b) {
      return a + b;
    }, 0);

  const currency = units || "Eth";

  return (
    <div className="invoice-box" ref={ref}>
      {/* <p>
        <b>Transaction Complete! Please print this page.</b>
      </p> */}
      <table cellPadding="0" cellSpacing="0">
        <tbody>
          <tr className="top">
            <td colSpan="2">
              <table>
                <tr>
                  <td className="title">
                    <img
                      src={logoUrl || logo}
                      style={{ width: "100%", maxWidth: IMG_WIDTH }}
                    />
                  </td>

                  <td>
                    NFT Voucher #:&nbsp;
                    <Tooltip
                      placement="top"
                      title={<span>{invoiceNumber}</span>}
                    >
                      {invoiceNumber.slice(0, 16)}
                    </Tooltip>
                    <br />
                    Created:{" "}
                    {getDateStringFromTimestamp(createdAt || Date.now())}
                    <br />
                    Active Until:{" "}
                    {getDateStringFromTimestamp(
                      Date.now() + 30 * 24 * 60 * 60 * 1000
                    )}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr className="information">
            <td colSpan="2">
              <table>
                <tr>
                  <td>
                    Fulfilled by {APP_NAME}, Inc.
                    <br />
                    {name}
                    {/* 12345 Sunny Road */}
                    <br />
                    {description}
                    {/* Sunnyville, CA 12345 */}
                  </td>

                  <td>
                    Acme Corp.
                    <br />
                    John Doe
                    <br />
                    {APP_NAME}@gmail.com
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr className="heading">
            <td>Payment Method</td>

            <td>Check #</td>
          </tr>

          <tr className="details">
            <td>{currency}</td>

            <td>
              {/* {payId} */}
              {total} {currency}
            </td>
          </tr>

          <tr className="heading">
            <td>Item</td>

            <td>Price</td>
          </tr>

          {items.map(({ name: itemName, cost }, i) => (
            <tr className="item" key={i}>
              <td>{itemName}</td>

              <td>
                {cost} {}
              </td>
            </tr>
          ))}

          <tr className="total">
            <td>
              {imgData && <img className="img-invoice" src={imgData} />}

              {/* <a href={url} target="_blank">
              View NFT
            </a> */}
              <br />
              <br />
              <span>
                <Button
                  type="primary"
                  size="large"
                  className="standard-button"
                  onClick={() => pay({}, false)}
                >
                  Pay with wallet
                </Button>
                &nbsp;
                <Button
                  //   type="primary"
                  size="large"
                  className="standard-button"
                  onClick={() => setCircleModal(true)}
                >
                  Pay with Credit Card
                </Button>
              </span>
            </td>

            <td>
              Total: {total} {currency}
            </td>
          </tr>
        </tbody>
      </table>

      <Modal
        title="Pay invoice with credit card"
        visible={circleModal}
        onOk={() => pay({ buyerAddress }, true)}
        onCancel={() => setCircleModal(false)}
      >
        <PaymentForm
          amount={`${total} ${currency}`}
          data={payData}
          setData={setPayData}
          address={destination || "XXX"}
        />
        <p>Enter the address to receive your NFT receipt</p>

        <Input
          value={buyerAddress}
          prefix="NFT address:"
          onChange={(e) => setBuyerAddress(e.target.value)}
          placeholder="Address"
        />
      </Modal>
    </div>
  );
}

export default Invoice;
