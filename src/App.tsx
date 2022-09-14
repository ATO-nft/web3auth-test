import { useState } from "react";
import Homepage from "./components/Homepage";
import { Web3Context } from './components/Web3Context'
import { Web3Auth } from "@web3auth/web3auth";
import { SafeEventEmitterProvider } from "@web3auth/base";
import loader from './loader.svg';

function Index() {

  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);

  const [userAddr, setUserAddr] = useState<string>("")
  const [userShortenAddr, setShortenAddr] = useState<string>("")
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);
  const [etherscanLink, setEtherscanLink] = useState("");
  const [txHash, setTxHash] = useState("");
  const [net, setNet] = useState("");
  const [bal, setBal] = useState("");
  const [firstName, setFirstName] = useState("anon");
  const [pfp, setPfp] = useState(loader); 
  
  return (
    <Web3Context.Provider value={{
        userAddr, setUserAddr,
        userShortenAddr, setShortenAddr,
        web3auth, setWeb3auth,
        provider, setProvider,
        etherscanLink, setEtherscanLink,
        txHash, setTxHash,
        net, setNet,
        bal, setBal,
        firstName, setFirstName,
        pfp, setPfp
      }}>
      <Homepage />
    </Web3Context.Provider>
  );
}

export default Index;