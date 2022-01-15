import React from "react";
import logo from "../../assets/logo.png";
import { APP_NAME } from "../../util/constants";

import "./Invoice.css";

const IMG_WIDTH = "200px";

const DEMO_NUMBER =
  Date.now().toString(36) + Math.random().toString(36).substring(2);

// github.com/sparksuite/simple-html-invoice-template
function Invoice({ amount, url, ref, items, imgData, id: idNumber }) {
  const invoiceNumber = idNumber || DEMO_NUMBER;

  return (
    <div class="invoice-box" ref={ref}>
      <p>
        <b>Transaction Complete! Please print this page.</b>
      </p>
      <table cellpadding="0" cellspacing="0">
        <tr class="top">
          <td colspan="2">
            <table>
              <tr>
                <td class="title">
                  <img
                    src={logo}
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
                  {APP_NAME}, Inc.
                  <br />
                  12345 Sunny Road
                  <br />
                  Sunnyville, CA 12345
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
          <td>USDC</td>

          <td>{amount} USDC</td>
        </tr>

        <tr class="heading">
          <td>Item</td>

          <td>Price</td>
        </tr>

        {items.map(({ name, price, units }, i) => (
          <tr class="item" key={i}>
            <td>{name}</td>

            <td>
              {price} {units || "Eth"}
            </td>
          </tr>
        ))}

        <tr class="total">
          <td>
            {imgData && <img className="img-invoice" src={imgData} />}

            <a href={url} target="_blank">
              View NFT
            </a>
          </td>

          <td>Total: {amount} USDC</td>
        </tr>
      </table>
    </div>
  );
}

export default Invoice;
