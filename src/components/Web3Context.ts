import { useContext, createContext } from "react";
import { Web3Auth } from "@web3auth/web3auth";

/* 

const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);
const [addr, setAddr] = useState("");
const [shortenAddr, setShortenAddr] = useState("");
const [etherscanLink, setEtherscanLink] = useState("");
const [txHash, setTxHash] = useState("");
const [net, setNet] = useState("");
const [bal, setBal] = useState("");
const [firstName, setFirstName] = useState("anon");
const [pfp, setPfp] = useState(loader); 

*/

export type GlobalContent = {
    userAddr: string
    setUserAddr:(c: string) => void
    userShortenAddr: string
    setShortenAddr:(c: string) => void
    web3auth: Web3Auth | null
    setWeb3auth:(c: Web3Auth | null) => void
}
  
export const Web3Context = createContext<GlobalContent>({
    userAddr: "", // set a default value
    setUserAddr: () => {},
    userShortenAddr: "", // set a default value
    setShortenAddr: () => {},
    web3auth: null, // set a default value
    setWeb3auth: () => {},
})
  
export const useGlobalContext = () => useContext(Web3Context)