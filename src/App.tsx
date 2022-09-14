import { useState } from "react";
import Homepage from "./components/Homepage";
import { Web3Context } from './components/Web3Context'
import { Web3Auth } from "@web3auth/web3auth";

function Index() {

  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);

  const [userAddr, setUserAddr] = useState<string>("")
  const [userShortenAddr, setShortenAddr] = useState<string>("")

  return (
    <Web3Context.Provider value={{ userAddr, setUserAddr, userShortenAddr, setShortenAddr, web3auth, setWeb3auth }}>
      <Homepage />
    </Web3Context.Provider>
  );
}

export default Index;