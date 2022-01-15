import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Button } from "antd";
import logo from "../assets/logo_3_2.png";
import ReactRotatingText from "react-rotating-text";
import { useNavigate } from "react-router-dom";

function Home(props) {
  const navigate = useNavigate();

  const goToCreate = () => {
    navigate("/create");
  };
  return (
    <div>
      <Row>
        <Col span={12}>
          <p>NFT-backed invoices for</p>

          <p>
            <ReactRotatingText items={["first", "second", "third"]} />.
          </p>

          <p>powered by Circle.</p>

          <Button type="primary" size="large" onClick={goToCreate}>
            Create
          </Button>
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
