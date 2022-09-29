/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { useEffect, useState } from "react";
// import { ethers } from "ethers";
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import RPC from "./ethersRPC";
import "./App.css";
import { shortenAddress} from '@usedapp/core'
import loader from '../../src/loader.svg';
import Confetti from 'react-confetti';
import YouTube, { YouTubeProps } from 'react-youtube';

import { useGlobalContext } from './MyGlobalContext'

import {
  PlasmicHomepage,
  DefaultHomepageProps
} from "./plasmic/web_3_auth_test/PlasmicHomepage";
import { HTMLElementRefOf } from "@plasmicapp/react-web";
import userEvent from "@testing-library/user-event";
import { receiveMessageOnPort } from "worker_threads";
import { flushSync } from "react-dom";

export interface HomepageProps extends DefaultHomepageProps {}

const clientId = String(process.env.REACT_APP_WEB3_AUTH_CLIENT_ID);
const endpoint = String(process.env.REACT_APP_RPC_URL);
const faucet = String(process.env.REACT_APP_FAUCET_PRIVATE_KEY);

function Homepage_(props: HomepageProps, ref: HTMLElementRefOf<"div">) {

const { userAddr, setUserAddr, userShortenAddr, setShortenAddr } = useGlobalContext()

const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);
// const [addr, setAddr] = useState("");
// const [shortenAddr, setShortenAddr] = useState("");
const [etherscanLink, setEtherscanLink] = useState("");
const [txHash, setTxHash] = useState("");
const [net, setNet] = useState("");
const [bal, setBal] = useState("");
// const [balWei, setBalWei] = useState(0);
const [loading, setLoading] = useState(false);
const [party, setParty] = useState(false);
const [freeMoney, setFreeMoney] = useState(false);
const [firstName, setFirstName] = useState("anon");
const [pfp, setPfp] = useState(loader); 
const [pleaseLogin, setPleaseLogin] = useState(false)

// const onPlayerReady: YouTubeProps['onReady'] = (event) => {
//   // access to player in all event handlers via event.target
//   event.target.playVideo();
// }

// const opts: YouTubeProps['opts'] = {
//   height: '150',
//   width: '300',
//   playerVars: {
//     // https://developers.google.com/youtube/player_parameters
//     autoplay: 1,
//   },
// };

useEffect(() => {
  show();
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
  getUserInfo();
}

const login = async () => {
  if (!web3auth) {
    // console.log("web3auth not initialized yet");
    return;
  }
  const web3authProvider = await web3auth.connect();
  setProvider(web3authProvider);
  // console.log("web3authProvider: ", web3authProvider);
  await show();
  setPleaseLogin(false);
};

const logout = async () => {
  if (!web3auth) {
    // console.log("web3auth not initialized yet");
    return;
  }
  await web3auth.logout();
  setProvider(null);
  // setAddr("");
  setUserAddr("")
  setShortenAddr("");
  setEtherscanLink("");
  setNet("");
  setBal("");
  setFirstName("anon")
  // setBalWei(0);
};

const getChainId = async () => {
  if (!provider) {
    // console.log("provider not initialized yet");
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
    // console.log("provider not initialized yet");
    return;
  }
  const rpc = new RPC(provider);
  const address = await rpc.getAccounts();
  setEtherscanLink("https://ropsten.etherscan.io/address/" + address);
  // setAddr(address);
  setUserAddr(address)
  const setShortenAddrString = shortenAddress(String(address))
  setShortenAddr(setShortenAddrString)
  setUserAddr(address)

};

const getBalance = async () => {
  if (!provider) {
    // console.log("provider not initialized yet");
    return;
  }
  const rpc = new RPC(provider);
  const balanceRaw = await rpc.getBalance();
  const balanceFormatted = Number(balanceRaw).toFixed(5);
  const balance = String(balanceFormatted) + " ETH"
  setBal(balance);
  // setBalWei(balanceRaw as any * 10 ** 18);
};

const sendTransaction = async () => {

  console.log("Let's go!");
  // const txGasCost = 7 * 10 ** 16;

  // if (provider === null) {
  //   return;
  // }

  try {
    // if (balWei * 10 ** 18 < txGasCost ) {
      await getFreeMoney();
      
    // } 

  } catch (error) {
    return error as string;
  }

  console.log("Minting...");

  try {
    setLoading(true);
    setFreeMoney(true); // 有啦！ 
  if (!provider) {
    // console.log("provider not initialized yet");
    return;
  }
  const rpc = new RPC(provider);  

  const name = "Thistle";
  const symbol = "THISTLE";
  const uri = "https://ipfs.io/ipfs/bafybeich4dqhadr2sai2pzxpayjqd62fgt46wdz425zha6aam7ikaluv2q/metadata.json"

  const tx = await rpc.mint(name, symbol, uri);

  await show();
  setTxHash("https://ropsten.etherscan.io/tx/" + tx )
  console.log("txHash: ", tx)
  setParty(true);
  setLoading(false);
  setTimeout( () => {
    setParty(false)
    setFreeMoney(false)
  
  }, 15000
    
  );
  console.log("done")

  } catch (error) {
    return error as string;
  }
};

const getFreeMoney = async () => {
  try {
    setLoading(true);
  if (!provider) {
    // console.log("provider not initialized yet");
    return;
  }
  const rpc = new RPC(provider);
  await rpc.getFreeMoney(faucet, userAddr);
  setLoading(false);
  await show();
  } catch (error) {
    return error as string;
  }
};

const getUserInfo = async () => {
  if (!web3auth) {
    // console.log("web3auth not initialized yet");
    return;
  }
  const user = await web3auth.getUserInfo();
  if (user) {
    const str = user.name as any
    const first = str.split(' ')[0]
    setFirstName(first)
    setPfp(user.profileImage as any)
  }
  // console.log(user);
};

const giveBack = async () => {
  setLoading(true);

  if (!provider) {
    // console.log("provider not initialized yet");
    return;
  }
  if (!web3auth) {
    // console.log("provider not initialized yet");
    return;
  }
  const rpc = new RPC(provider);
  // await rpc.getFreeMoney(faucet, userAddr);
  const result = await rpc.giveBack();
  console.log(result)
  getBalance()
  setLoading(false);
};

return <PlasmicHomepage  
  
  root={{
    wrapChildren: (children) => (
      <>
        {children}

        {freeMoney === true ? <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={88}
          gravity={0.025}
          run={true}
          tweenDuration={1000}
          /> : <></>}

        {party === true ? <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={500}
          gravity={0.1}
          run={true}
          tweenDuration={1000}
          /> : <></>}
        </>
      )
    }
  }

  {...props}

  pfp={
    (provider && {
      props: {
        src: pfp
      }}
    )
  }

  // tv={{
  //   render: () => (loading === true  || txHash ? 
  //     <YouTube style={{display:"none"}} videoId="UGCXKmAB3YQ" opts={opts} onReady={onPlayerReady} /> : ""
  //   )
  // }}
  
  flush={{
    props: {
      // children:(!provider ? "Login " : "Logout"),
      onClick: () => giveBack(),
      // 
      // render: () => null
    },
    render: () => (txHash ? "" : null) // don't work as expected
  }}

  title={{
    props: {
      children: (!provider ? "Web3Auth test" : "Hello " + firstName + "!" + (txHash && " 🌈"))
    }
  }}

  connect={{
    props: {
      children:(!provider ? "Login " : "Logout"),
      onClick: () => toggle()
    } as any
  }}

  sandbox={{
    props: {
      children: (loading === true ? 

      <><img src={loader} alt={loader} /> 
      {/* <YouTube style={{display:"none"}} videoId="TB54dZkzZOY" opts={opts} onReady={onPlayerReady} /></>  : */}
      {/* <YouTube style={{display:"none"}} videoId="rcAv1cGAeXE" opts={opts} onReady={onPlayerReady} /> */}
      </>  :

      <div style={{color:"white", textAlign:"center"}}>
        <p style={{fontSize: 24}}><strong>{net}</strong></p>
        <p style={{fontSize: 24}}><strong><a target = "blank" href ={etherscanLink}>{userShortenAddr}</a></strong></p>
        <p style={{fontSize: 24}}><strong>{bal}</strong></p>
      </div>)

    }
  }}

  send={{
    props: {
      children: "Mint",
      onClick: (provider ? () => sendTransaction() : () => setPleaseLogin(true))
    } as any
  }}  

  latestTx={{
    props: {
      children: (!txHash ? (pleaseLogin === true && <p style={{color:"red", fontWeight: 'bold'}}>Please login first.</p>) : <a target = "blank" href = {txHash} style={{fontWeight: 'bold'}} >View your latest transaction</a>),
    }
  }}

/>

;}

const Homepage = React.forwardRef(Homepage_);
export default Homepage;