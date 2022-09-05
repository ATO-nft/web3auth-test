import * as React from "react";
import {useState} from "react"; 
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { ethers } from "ethers";

import {
  PlasmicHomepage,
  DefaultHomepageProps
} from "./plasmic/web_3_auth_test/PlasmicHomepage";
import { HTMLElementRefOf } from "@plasmicapp/react-web";

export interface HomepageProps extends DefaultHomepageProps {}

function Homepage_(props: HomepageProps, ref: HTMLElementRefOf<"div">) {

  const web3auth = new Web3Auth({
    clientId: "",
    chainConfig: {
      chainNamespace: "eip155",
      chainId: "0x5", 
      rpcTarget: "https://eth-goerli.gateway.pokt.network/v1/lb/6306fd3fea87cf003a87b590",
      displayName: "Goerli Testnet",
      blockExplorer: "https://goerli.etherscan.io", // rinkeby, goerli
      ticker: "ETH",
      tickerName: "Ethereum",
    },
  });

  const [addr, setAddr] = useState("Please connect.")

  async function connect() {

    console.log("clicked")


    // await web3auth.initModal();

    // const web3authProvider = web3auth.connect();

    //const provider = new ethers.providers.Web3Provider(web3authProvider); // web3auth.provider

    setAddr("0xFrancis")

  }

  function click() {

    console.log("clicked")
    setAddr("default")

  }


  return <PlasmicHomepage root={{ ref }} {...props} 
  
  action={{
    props: {
      onClick: () => click()
     }
  }}

  connect={{
    props: {
      children: "Connect",
      onClick: () => connect()
     }
  }}

  address={{
    props: {
      children: addr
    }
  }}

  // balance={{
  //   props: {
  //     children: null
  //   }
  // }}

  // network={{
  //   props: {
  //     children: null
  //   }
  // }}
  
  />;
}

const Homepage = React.forwardRef(Homepage_);
export default Homepage;
