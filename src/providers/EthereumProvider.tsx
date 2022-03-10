import detectEthereumProvider from "@metamask/detect-provider";
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { AbstractProvider } from "web3-core";

interface Ethereum extends AbstractProvider {
  on(event: "accountsChanged", f: (accounts: string[]) => void): void;
}

export const EthereumContext: React.Context<Ethereum | undefined> =
  React.createContext<Ethereum | undefined>(undefined);

export const EthereumProvider: React.FunctionComponent = ({ children }) => {
  const [ethereum, setEtherum] = useState<Ethereum | undefined>();

  useEffect(() => {
    detectEthereumProvider().then((e) => {
      console.log(e);
      setEtherum(e as Ethereum);
    });
  });

  return (
    <EthereumContext.Provider value={ethereum}>
      {children}
    </EthereumContext.Provider>
  );
};

export const useEthereum = (): Ethereum | undefined => {
  return useContext(EthereumContext);
};
