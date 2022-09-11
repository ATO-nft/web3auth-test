import { useContext, createContext } from "react";

export type GlobalContent = {
    userAddr: string
    setUserAddr:(c: string) => void
}
  
export const MyGlobalContext = createContext<GlobalContent>({
    userAddr: 'default', // set a default value
    setUserAddr: () => {},
})
  
export const useGlobalContext = () => useContext(MyGlobalContext)