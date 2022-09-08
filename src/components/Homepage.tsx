import * as React from "react";
import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import RPC from "./ethersRPC";
import "./App.css";
import { shortenAddress} from '@usedapp/core'
import loader from '../../src/loader.svg';
import Confetti from 'react-confetti';

import {
  PlasmicHomepage,
  DefaultHomepageProps
} from "./plasmic/web_3_auth_test/PlasmicHomepage";
import { HTMLElementRefOf } from "@plasmicapp/react-web";

export interface HomepageProps extends DefaultHomepageProps {}

const clientId = String(process.env.REACT_APP_WEB3_AUTH_CLIENT_ID);
const endpoint = String(process.env.REACT_APP_RPC_URL);
const faucet = String(process.env.REACT_APP_FAUCET_PRIVATE_KEY);

function Homepage_(props: HomepageProps, ref: HTMLElementRefOf<"div">) {

const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);
const [addr, setAddr] = useState("");
const [etherscanLink, setEtherscanLink] = useState("");
const [net, setNet] = useState("");
const [bal, setBal] = useState("");
const [loading, setLoading] = useState(false);
const [party, setParty] = useState(false);

useEffect(() => {
  show()
}, [provider]);

useEffect(() => {
  const init = async () => {
    try {

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
    } catch (error) {
      console.error(error);
    }
  };

  init();
}, []);

const toggle = async () => {
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
  await show();
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
  if (chainId === 3) {
    setNet("Ropsten Testnet");
  } else {
    setNet(chainId);
  }
  
};

const getAccounts = async () => {
  if (!provider) {
    console.log("provider not initialized yet");
    return;
  }
  const rpc = new RPC(provider);
  const address = await rpc.getAccounts();
  setEtherscanLink("https://ropsten.etherscan.io/address/"+ address);
  setAddr(shortenAddress(address));
};

const getBalance = async () => {
  if (!provider) {
    console.log("provider not initialized yet");
    return;
  }
  const rpc = new RPC(provider);
  const balanceRaw = await rpc.getBalance();
  const num1 = Number(balanceRaw).toFixed(5);
  const balance = String(num1) + " ETH"
  setBal(balance);
};

const sendTransaction = async () => {

  try {
    await getFreeMoney();
  } catch (error) {
    return error as string;
  }

  console.log("start sendTransaction")

  try {
    setLoading(true);
  if (!provider) {
    console.log("provider not initialized yet");
    setLoading(false);
    return;
  }
  const rpc = new RPC(provider);  
  console.log("const rpc = new RPC(provider);")

  await rpc.sendTransaction();
  setLoading(false);
  await show();
  setParty(true);
  setTimeout( () => {
    setParty(false)}, 10000
  
  );

  } catch (error) {
    return error as string;
  }
};

const getFreeMoney = async () => {
  console.log("clicked")
  try {
    setLoading(true);
  if (!provider) {
    console.log("provider not initialized yet");
    return;
  }
  const rpc = new RPC(provider);
  await rpc.getFreeMoney(faucet, addr);
  setLoading(false);
  await show();

  } catch (error) {
    return error as string;
  }
  console.log("finished")
};

return <PlasmicHomepage  
  
root={{
  wrapChildren: (children) => (
    <>
      {children}
      {party === true ? <Confetti
          width={window.innerWidth}
          height={window.innerHeight - 10}
          numberOfPieces={500}
          gravity={0.1}
          run={true}
          tweenDuration={1000}
          /> : <></>}
    </>
  )
}}

{...props}

  connect={{
    props: {
      children:(!provider ? "Login" : "Logout"),
      onClick: () => toggle()
    } as any
  }}

  sandbox={{
    props: {
      children: (loading === true ? 

      <img src={loader} alt={loader} /> : 

      <div style={{color:"white"}}>
        <p style={{fontSize: 24}}>Network: <strong>{net}</strong></p>
        <p style={{fontSize: 24}}>Your address: <strong><a target = "blank" href ={etherscanLink}>{addr}</a></strong></p>
        <p style={{fontSize: 24}}>Balance: <strong>{bal}</strong></p>
      </div>)
    }
  }}

  send={{
    props: {
      children:"Send",
      onClick: () => sendTransaction()
    } as any
  }}  

/>

;}

const Homepage = React.forwardRef(Homepage_);
export default Homepage;
