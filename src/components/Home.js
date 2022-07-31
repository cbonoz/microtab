import React from "react";
import { Row, Col, Button } from "antd";
import logo from "../assets/logo_3_2.png";
import ReactRotatingText from "react-rotating-text";
import { useNavigate } from "react-router-dom";
import { APP_DESC } from "../util/constants";
import { CheckCircleOutlined, CheckCircleTwoTone } from "@ant-design/icons";

const CHECKLIST_ITEMS = [
  "Code-free payment requests. No API integrations required.",
  "Microtab fees collected only when you get paid. Not when you request.",
  "NFT minted on every invoice fulfillment."
];

function Home({login, account}) {
  const navigate = useNavigate();

  const goToCreate = () => {
    account ? login() : navigate("/create");
  };

  return (
    <div className="hero-section">
      <Row>
        <Col span={12}>
          <div className="hero-slogan-section">
            <div className="hero-slogan">
              <p>
                {APP_DESC} for&nbsp;
                <ReactRotatingText
                  items={["businesses", "individuals", "everyone"]}
                />
                .
              </p>
            </div>
            {/* // "#eb2f96" */}
            {CHECKLIST_ITEMS.map((item, i) => {
              return (
                <p>
                  <CheckCircleTwoTone twoToneColor="#00aa00" />
                  &nbsp;
                  {item}
                </p>
              );
            })}
            <br />

            <Button type="primary" size="large" onClick={goToCreate}>
              {account ? 'Create invoice request' : 'Connect Wallet'}
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
