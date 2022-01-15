import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Pay from "./components/Pay";
import Create from "./components/Create";
import { Layout, Menu, Breadcrumb } from "antd";
import { APP_NAME } from "./util/constants";
import logo from "./assets/logo.png";

import "./App.css";

const { Header, Content, Footer } = Layout;

function App() {
  const path = window.location.pathname;

  const isPayment = path.startsWith("/pay");

  return (
    <div className="App">
      <Layout className="layout">
        {!isPayment && (
          <Header>
            {/* <div className="logo" /> */}
            <img src={logo} className="header-logo" />
            <Menu
              // theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["2"]}
            ></Menu>
          </Header>
        )}
        <Content style={{ padding: "0 50px" }}>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pay/:payId" element={<Pay />} />
              <Route path="/create" element={<Create />} />
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
