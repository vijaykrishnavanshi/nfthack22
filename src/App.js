import React, { useState } from "react";

import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Pay from "./components/Pay";
import CreateInvoice from "./components/CreateInvoice";
import { Layout, Menu, Breadcrumb } from "antd";
import { APP_NAME } from "./util/constants";
import logo from "./assets/logo.png";

import "./App.css";
import History from "./components/History";

const { Header, Content, Footer } = Layout;

function App() {
  const [account, setAccount] = useState();

  const navigate = useNavigate();
  const path = window.location.pathname;

  const isPayment = path.startsWith("/pay");

  return (
    <div className="App">
      <Layout className="layout">
        {!isPayment && (
          <Header>
            {/* <div className="logo" /> */}

            <Menu
              // theme="dark"
              mode="horizontal"
              defaultSelectedKeys={[]}
            >
              <Menu.Item key={0}>
                <img
                  src={logo}
                  className="header-logo pointer"
                  onClick={() => navigate("/")}
                />
              </Menu.Item>
              <Menu.Item key={1} onClick={() => navigate("/history")}>
                History
              </Menu.Item>
            </Menu>
          </Header>
        )}
        <Content style={{ padding: "0 50px" }}>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pay/:payId" element={<Pay />} />
              <Route path="/create" element={<CreateInvoice />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          {APP_NAME} ©2022 - Created for NFTHack2022
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
