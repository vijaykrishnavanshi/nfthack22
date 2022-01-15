import React, { useState } from "react";
import { Button, Input, Row, Col, Radio, Steps } from "antd";
import TextArea from "antd/lib/input/TextArea";
// import {
//   createInvoice,
//   CATEGORIES,
//   EXAMPLE_TASK,
//   invoiceUrl,
// } from "../util/invoice";
import { ipfsUrl, isValidHttpUrl } from "../util";
import { createInvoice, EXAMPLE_PAYLOAD } from "../util/invoice";

const { Step } = Steps;

function CreateInvoice(props) {
  const [data, setData] = useState({ ...EXAMPLE_PAYLOAD });
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();

  const updateData = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const isValid = (data) => {
    return data.invoiceName && data.title && data.description;
  };
  const isValidData = isValid(data);

  const create = async () => {
    if (!isValidData) {
      alert("Title, description, and url are required");
      return;
    }
    setError(undefined);
    setLoading(true);

    const instructions = "Complete the associated tasks to earn a reward.";

    try {
      const res = await createInvoice(
        data.invoiceName,
        `${data.category} for ${data.url}`,
        instructions,
        data.category,
        [data], // could be a longer list of tasks.,
        1 // default reward.
      );
      setResult(res);
      try {
        // await postInvoice(res.invoice);
      } catch (e) {
        console.error("error posting invoice", e);
      }
    } catch (e) {
      console.error("error creating invoice", e);
    } finally {
      setLoading(false);
    }
  };

  const getStep = () => {
    if (!!result) {
      return 2;
    } else if (isValidData) {
      return 1;
    }
    return 0;
  };

  return (
    <div>
      <Row>
        <Col span={16}>
          <div className="create-form white boxed">
            <h2>Create new invoice</h2>
            <br />

            <h3 className="vertical-margin">Invoice title:</h3>
            <Input
              placeholder="Title of the invoice"
              value={data.invoiceName}
              prefix="Invoice:"
              onChange={(e) => updateData("invoiceName", e.target.value)}
            />

            {/* TODO: add configurable amount of items */}
            <h3 className="vertical-margin">General information:</h3>
            <Input
              placeholder="Title of the invoice"
              value={data.title}
              prefix="Invoice title:"
              onChange={(e) => updateData("title", e.target.value)}
            />

            <TextArea
              aria-label="Description"
              onChange={(e) => updateData("description", e.target.value)}
              placeholder="Description of the invoice"
              prefix="Description"
              value={data.description}
            />
            <Input
              value={data.url}
              placeholder="Location where the user should be returned"
              prefix="Callback url:"
              onChange={(e) => updateData("url", e.target.value)}
            />

            <br />
            <br />

            <Button
              type="primary"
              className="standard-button"
              onClick={create}
              disabled={loading || !isValidData}
              loading={loading}
            >
              Create invoice!
            </Button>
            {!error && !result && loading && (
              <span>&nbsp;Note this may take a few moments.</span>
            )}
            <br />
            <br />
            {error && <div className="error-text">{error}</div>}
            {result && (
              <div>
                <div className="success-text">Created invoice!</div>
                <a href={ipfsUrl(result.invoice.id)} target="_blank">
                  View invoice
                </a>
                {/* <div>{JSON.stringify(result, null, "\t")}</div> */}
              </div>
            )}
          </div>
        </Col>
        <Col span={1}></Col>
        <Col span={7}>
          <div className="white boxed">
            <Steps
              className="standard-margin"
              direction="vertical"
              size="small"
              current={getStep()}
            >
              <Step title="Fill in fields" description="Enter required data." />
              <Step
                title="Create invoice"
                description="Requires authorizing a create invoice operation."
              />
              <Step
                title="Wait for feedback"
                description="Your invoice will be live for others to complete."
              />
            </Steps>
          </div>
        </Col>
      </Row>
    </div>
  );
}

CreateInvoice.propTypes = {};

export default CreateInvoice;