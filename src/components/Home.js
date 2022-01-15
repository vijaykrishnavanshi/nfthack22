import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Button } from "antd";
import logo from "../assets/logo_3_2.png";
import ReactRotatingText from "react-rotating-text";
import { useNavigate } from "react-router-dom";
import { APP_DESC } from "../util/constants";

function Home(props) {
  const navigate = useNavigate();

  const goToCreate = () => {
    navigate("/create");
  };
  return (
    <div className="hero-section">
      <Row>
        <Col span={12}>
          <div className="hero-slogan">
            <p>
              {APP_DESC} for
              <br />
              <ReactRotatingText
                items={["businesses", "consultants", "everyone"]}
              />
              .
            </p>
            {/* <p>powered by Circle.</p> */}

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
