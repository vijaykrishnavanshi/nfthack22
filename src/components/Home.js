import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Button } from "antd";
import logo from "../assets/logo_3_2.png";
import ReactRotatingText from "react-rotating-text";
import { useNavigate } from "react-router-dom";
import { APP_DESC } from "../util/constants";
import { CheckCircleOutlined, CheckCircleTwoTone } from "@ant-design/icons";

const CHECKLIST_ITEMS = [
  "Free invoice page hosting on IPFS",
  "Receipts auto-generated as NFTs",
  "No vendor agreements required",
];

function Home(props) {
  const navigate = useNavigate();

  const goToCreate = () => {
    navigate("/create");
  };
  return (
    <div className="hero-section">
      <Row>
        <Col span={12}>
          <div className="hero-slogan-section">
            <div className="hero-slogan">
              <p>
                {APP_DESC} for
                <br />
                <ReactRotatingText
                  items={["businesses", "consultants", "everyone"]}
                />
                .
              </p>
            </div>
            {CHECKLIST_ITEMS.map((item, i) => {
              return (
                <p>
                  <CheckCircleTwoTone twoToneColor="#eb2f96" />
                  &nbsp;
                  {item}
                </p>
              );
            })}
            <br />

            <Button type="primary" size="large" onClick={goToCreate}>
              Create invoice
            </Button>
          </div>
        </Col>
        <Col span={12}>
          <img src={logo} className="hero-image" />
        </Col>
      </Row>
    </div>
  );
}

Home.propTypes = {};

export default Home;
