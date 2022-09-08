import * as React from "react";
import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import RPC from "./ethersRPC";
import "./App.css";
import loader from '../../src/loader.svg';

import {
  PlasmicHomepage,
  DefaultHomepageProps
} from "./plasmic/web_3_auth_test/PlasmicHomepage";
import { HTMLElementRefOf } from "@plasmicapp/react-web";

export interface HomepageProps extends DefaultHomepageProps {}

const clientId = String(process.env.REACT_APP_WEB3_AUTH_CLIENT_ID);
const endpoint = String(process.env.REACT_APP_RPC_URL);

function Homepage_(props: HomepageProps, ref: HTMLElementRefOf<"div">) {

const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);
const [addr, setAddr] = useState("");
const [net, setNet] = useState("");
const [bal, setBal] = useState("");
const [loading, setLoading] = useState(false);

useEffect(() => {

  show()


}, [provider]);

useEffect(() => {
  const init = async () => {
    try {

    console.log("CHAIN_NAMESPACES.EIP155:", CHAIN_NAMESPACES.EIP155);
    const web3auth = new Web3Auth({
      clientId: clientId,
      chainConfig: {
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: "0x3", 
        rpcTarget: endpoint,
        displayName: "Ropsten Testnet",
        blockExplorer: "https://ropsten.etherscan.io",
        ticker: "ETH",
        tickerName: "Ethereum",
      },
    });

    setWeb3auth(web3auth);

    await web3auth.initModal();

      if (web3auth.provider) {
        setProvider(web3auth.provider);
      };
      console.log("web3auth.provider 1: ", web3auth.provider)
    } catch (error) {
      console.error(error);
    }
  };

  init();
}, []);

const toggle = async () => {
  console.log("clicked")
  if (provider) {
    await logout();
  } else {
    await login();
  }
}

const show = async () => {
  getAccounts();
  getChainId();
  getBalance();
}

const login = async () => {
  if (!web3auth) {
    console.log("web3auth not initialized yet");
    return;
  }
  const web3authProvider = await web3auth.connect();
  setProvider(web3authProvider);
  console.log("web3authProvider: ", web3authProvider);
};

const logout = async () => {
  if (!web3auth) {
    console.log("web3auth not initialized yet");
    return;
  }
  await web3auth.logout();
  setProvider(null);
  setAddr("");
  setNet("");
  setBal("");
};

const getChainId = async () => {
  if (!provider) {
    console.log("provider not initialized yet");
    return;
  }
  const rpc = new RPC(provider);
  const chainId = await rpc.getChainId();
  console.log(chainId);
  setNet(chainId)
};
const getAccounts = async () => {
  if (!provider) {
    console.log("provider not initialized yet");
    console.log("provider: ", provider)
    return;
  }
  const rpc = new RPC(provider);
  const address = await rpc.getAccounts();
  console.log(address);
  setAddr(address);
};

const getBalance = async () => {
  if (!provider) {
    console.log("provider not initialized yet");
    return;
  }
  const rpc = new RPC(provider);
  const balanceRaw = await rpc.getBalance();
  const balance = balanceRaw + " ETH"
  console.log(balance);
  setBal(balance);
};

const sendTransaction = async () => {

  try {

    setLoading(true);

  if (!provider) {
    console.log("provider not initialized yet");
    return;
  }

  const rpc = new RPC(provider);
  const receipt = await rpc.sendTransaction();
  setLoading(false);

  await show();

  } catch (error) {
    return error as string;
  }
};

return <PlasmicHomepage root={{ ref }} {...props} 
  
  connect={{
    props: {
      children:(!provider ? "Login" : "Logout"),
      onClick: () => toggle()
    } as any
  }}

  address={{
    props: {
      children: (loading === true  ? "" : addr)
    }
  }}

  balance={{
    props: {
      children: (loading === true  ? <img src = {loader} /> : bal)
    }
  }}

  network={{
    props: {
      children: (loading === true  ? "" : net)
    }
  }}

  // action={{
  //   props: {
  //     children:"Show",
  //     onClick: () => show()
  //   } as any
  // }}

  send={{
    props: {
      children:"Send tx",
      onClick: () => sendTransaction()
    } as any
  }}

  // sandbox={{
  //   props: {
  //     children: (loading === true  && <img src = {loader} />)
  //     // children: <div id="divLoader"></div>
  //   }
  // }}
  
  />;
}

const Homepage = React.forwardRef(Homepage_);
export default Homepage;
