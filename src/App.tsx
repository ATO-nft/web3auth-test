import { useState } from "react";
import Homepage from "./components/Homepage";
import { MyGlobalContext } from './components/MyGlobalContext'

// const getUserAddr = (userType: string):string => {
//   return "address"
// }

function Index() {

  const [userAddr, setUserAddr] = useState<string>("")

  return (
    <MyGlobalContext.Provider value={{ userAddr, setUserAddr }}>
      <Homepage />
    </MyGlobalContext.Provider>
  );
}

export default Index;