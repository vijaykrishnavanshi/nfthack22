import { Button } from "antd";
import React from "react";
import logo from "../../assets/logo.png";
import { APP_NAME } from "../../util/constants";

import "./Invoice.css";

const IMG_WIDTH = "200px";

const DEMO_NUMBER =
  Date.now().toString(36) + Math.random().toString(36).substring(2);

// github.com/sparksuite/simple-html-invoice-template
function Invoice({
  name,
  description,
  units,
  callbackUrl,
  ref,
  pay,
  imgData,
  logoUrl,
  payId,
  properties,
}) {
  const invoiceNumber = payId || DEMO_NUMBER;

  const items = (properties || {}).items || [];

  const total = items
    .map((item) => item.cost)
    .reduce(function (a, b) {
      return a + b;
    }, 0);

  const currency = units || "Eth";

  return (
    <div class="invoice-box" ref={ref}>
      {/* <p>
        <b>Transaction Complete! Please print this page.</b>
      </p> */}
      <table cellpadding="0" cellspacing="0">
        <tr class="top">
          <td colspan="2">
            <table>
              <tr>
                <td class="title">
                  <img
                    src={logoUrl || logo}
                    style={{ width: "100%", maxWidth: IMG_WIDTH }}
                  />
                </td>

                <td>
                  NFT Voucher #: {invoiceNumber}
                  <br />
                  Created: {new Date().toISOString().slice(0, 10)}
                  <br />
                  Active Until:{" "}
                  {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                    .toISOString()
                    .slice(0, 10)}
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr class="information">
          <td colspan="2">
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

        <tr class="heading">
          <td>Payment Method</td>

          <td>Check #</td>
        </tr>

        <tr class="details">
          <td>{currency}</td>

          <td>
            {/* {payId} */}
            {total} {currency}
          </td>
        </tr>

        <tr class="heading">
          <td>Item</td>

          <td>Price</td>
        </tr>

        {items.map(({ name: itemName, cost }, i) => (
          <tr class="item" key={i}>
            <td>{itemName}</td>

            <td>
              {cost} {}
            </td>
          </tr>
        ))}

        <tr class="total">
          <td>
            {imgData && <img className="img-invoice" src={imgData} />}

            {/* <a href={url} target="_blank">
              View NFT
            </a> */}
            {pay && (
              <Button
                type="primary"
                size="large"
                className="standard-button"
                onClick={pay}
              >
                Complete Payment
              </Button>
            )}
          </td>

          <td>
            Total: {total} {currency}
          </td>
        </tr>
      </table>
    </div>
  );
}

export default Invoice;
