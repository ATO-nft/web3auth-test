import * as React from "react";
import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import RPC from "./web3RPC";
import "./App.css";

import {
  PlasmicHomepage,
  DefaultHomepageProps
} from "./plasmic/web_3_auth_test/PlasmicHomepage";
import { HTMLElementRefOf } from "@plasmicapp/react-web";

export interface HomepageProps extends DefaultHomepageProps {}

const clientId = String(process.env.REACT_APP_WEB3_AUTH_CLIENT_ID);

function Homepage_(props: HomepageProps, ref: HTMLElementRefOf<"div">) {

const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);
const [addr, setAddr] = useState("");
const [net, setNet] = useState("");
const [bal, setBal] = useState("");

useEffect(() => {
  const init = async () => {
    try {

    const web3auth = new Web3Auth({
      clientId,
      chainConfig: {
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: "0x5",
        rpcTarget: process.env.REACT_APP_RPC_URL, // This is the public RPC we have added, please pass on your own endpoint while creating an app
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

// const getUserInfo = async () => {
//   if (!web3auth) {
//     console.log("web3auth not initialized yet");
//     return;
//   }
//   const user = await web3auth.getUserInfo();
//   console.log(user);
// };

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
  if (chainId === "5") {
    setNet("Goerli Testnet")
  }
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
  if (!provider) {
    console.log("provider not initialized yet");
    return;
  }
  const rpc = new RPC(provider);
  const receipt = await rpc.sendTransaction();
  console.log(receipt);
};

// const signMessage = async () => {
//   if (!provider) {
//     console.log("provider not initialized yet");
//     return;
//   }
//   const rpc = new RPC(provider);
//   const signedMessage = await rpc.signMessage();
//   console.log(signedMessage);
// };

// const getPrivateKey = async () => {
//   if (!provider) {
//     console.log("provider not initialized yet");
//     return;
//   }
//   const rpc = new RPC(provider);
//   const privateKey = await rpc.getPrivateKey();
//   console.log(privateKey);
// };
// const loggedInView = (
//   <>
//      <button onClick={getUserInfo} className="card">
//       Get User Info
//     </button>
//     <button onClick={getChainId} className="card">
//       Get Chain ID
//     </button>
//     <button onClick={getAccounts} className="card">
//       Get Accounts
//     </button>
//     <button onClick={getBalance} className="card">
//       Get Balance
//     </button>
//     <button onClick={sendTransaction} className="card">
//       Send Transaction
//     </button>
//     <button onClick={signMessage} className="card">
//       Sign Message
//     </button>
//     <button onClick={getPrivateKey} className="card">
//       Get Private Key
//     </button>
//     <button onClick={logout} className="card">
//       Log Out
//     </button> 

//     <div id="console" style={{ whiteSpace: "pre-line" }}>
//       <p style={{ whiteSpace: "pre-line" }}></p>
//     </div>
//   </>
// );

// const unloggedInView = (
//   <button onClick={login} className="card">
//     Login
//   </button>
// );

console.log("provider: ", provider)
console.log("web3auth: ", web3auth)

return <PlasmicHomepage root={{ ref }} {...props} 
  
  connect={{
    props: {
      children:(!provider ? "Login" : "Logout"),
      onClick: () => toggle()
    } as any
  }}

  address={{
    props: {
      children: addr
    }
  }}

  balance={{
    props: {
      children: bal
    }
  }}

  network={{
    props: {
      children: net
    }
  }}

  action={{
    props: {
      children:"Show",
      onClick: () => show()
    } as any
  }}

  send={{
    props: {
      children:"Send tx",
      onClick: () => sendTransaction()
    } as any
  }}
  
  />;
}

const Homepage = React.forwardRef(Homepage_);
export default Homepage;
