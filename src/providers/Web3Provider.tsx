import React, { useContext } from "react";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { useEthereum } from "./EthereumProvider";

export const Web3Context: React.Context<Web3 | undefined> = React.createContext<
  Web3 | undefined
>(undefined);

export const Web3Provider: React.FunctionComponent = ({ children }) => {
  const [web3, setWeb3] = useState<Web3 | undefined>();
  const etherum = useEthereum();

  useEffect(() => {
    if (etherum === undefined) {
      return;
    }

    setWeb3(new Web3(etherum));
  }, [etherum]);

  return <Web3Context.Provider value={web3}>{children}</Web3Context.Provider>;
};

export const useWeb3 = (): Web3 | undefined => {
  return useContext(Web3Context);
};
