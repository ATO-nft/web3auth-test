import { useContext, createContext } from "react";

export type GlobalContent = {
    userAddr: string
    setUserAddr:(c: string) => void
    userShortenAddr: string
    setShortenAddr:(c: string) => void
}
  
export const MyGlobalContext = createContext<GlobalContent>({
    userAddr: 'default', // set a default value
    setUserAddr: () => {},
    userShortenAddr: 'default', // set a default value
    setShortenAddr: () => {},
})
  
export const useGlobalContext = () => useContext(MyGlobalContext)