import React, { useEffect, useState } from "react";

import { Route, Routes, useNavigate } from "react-router-dom";

import Home from "./components/Home";
import CreateMicrotab from "./components/CreateMicrotab";
import { Layout, Menu, Breadcrumb, Button } from "antd";
import { ACTIVE_CHAIN, APP_NAME } from "./util/constants";
import History from "./components/History";
import logo from "./assets/logo.png";

import "./App.css";
import RPC from "./util/solana";
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { abbreviate } from "./util";
import PayInvoice from "./components/PayInvoice";

const { Header, Content, Footer } = Layout;

const clientId = 'BF23CxKGELU4eb1K4ZRH6Y4zyso0WE3uh1lqMtEGcpj_NOuGL4A5rZ4pkLHSLnmu9ZIuIlnYJVNHW_AyLwf0ORs'

// https://web3auth.io/docs/integration-builder?lang=react&chain=sol&customAuthentication=yes&whitelabel=no&dynamicConstructorParams=no&usingEmailPasswordless=no&rnWorkflowMode=expo&evmFramework=web3&customLogin=yes#step-3
function App() {
  const [account, setAccount] = useState()
  const [loading, setLoading] = useState()
  const [web3auth, setWeb3auth] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {

      const web3auth = new Web3Auth({
        clientId,
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.SOLANA,
          chainId: ACTIVE_CHAIN.id, // Please use 0x1 for Mainnet, 0x2 for Testnet, 0x3 for Devnet
          rpcTarget: ACTIVE_CHAIN.rpc, // This is the public RPC we have added, please pass on your own endpoint while creating an app
        },
      });

      setWeb3auth(web3auth);

      await web3auth.initModal();
        if (web3auth.provider) {
          setProvider(web3auth.provider);
        };
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  useEffect(() => {
    if (provider) {
      getAccounts()
    }
  }, [provider])

  const login = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();
    console.log(user);
  };

  const logout = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setProvider(null);
    setAccount(undefined)
  };

  const getAccounts = async (p) => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    console.log('address', address);
    setAccount(address[0])
  };

  const getBalance = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const balance = await rpc.getBalance();
    console.log(balance);
  };

  const sendTransaction = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.sendTransaction();
    console.log('sendTransaction', receipt);
  };

  const signMessage = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const signedMessage = await rpc.signMessage();
    console.log(signedMessage);
  };

  const getPrivateKey = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const privateKey = await rpc.getPrivateKey();
    console.log(privateKey);
  };
  const navigate = useNavigate();
  const path = window.location.pathname;

  const isInvoice = path.startsWith("/invoice");

  return (
    <div className="App">
      <Layout className="layout">
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

            {!isInvoice && (
              <>
                <Menu.Item key={1} onClick={() => navigate("/create")}>
                  Create invoice
                </Menu.Item>
              </>
            )}
            {!account && <span>
              <Button type="primary" onClick={login}  loading={loading} disabled={loading}>Connect Wallet</Button>
            </span> }
            {account && <span>
              Hello: {abbreviate(account)} (<a href="#" onClick={e => {
                e.preventDefault()
                logout()
              }}>logout</a>)</span>}
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home login={login} account={account} />} />
              <Route path="/invoice/:invoiceId" element={<PayInvoice sendTransaction={sendTransaction} getPrivateKey={getPrivateKey} account={account} provider={provider} />} />
              <Route path="/create" element={<CreateMicrotab account={account} provider={provider} />} />
              {/* <Route path="/history" element={<History />} /> */}
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          {APP_NAME} ©2022 - A Solana-powered invoice platform
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
