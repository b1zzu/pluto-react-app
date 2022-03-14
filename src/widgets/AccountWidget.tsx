import {
  AccountBalanceWallet as AccountBalanceWalletIcon,
  Login as LoginIcon,
} from "@mui/icons-material";
import { IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { useEthereum } from "../providers/EthereumProvider";
import { useWeb3 } from "../providers/Web3Provider";

export const AccountWidget: React.FunctionComponent = () => {
  const ethereum = useEthereum();
  const web3 = useWeb3();
  const [accounts, setAccounts] = useState<string[]>();
  const [accountsListAnchor, setAccountsListAnchor] =
    React.useState<HTMLElement>();

  useEffect(() => {
    web3?.eth
      .getAccounts()
      .then((a) => setAccounts(a.length !== 0 ? a : undefined));
  }, [web3]);

  const handleConnect = () => {
    web3?.eth
      .requestAccounts()
      .then((a) => setAccounts(a.length !== 0 ? a : undefined));
  };

  const handleAccountListDorpdownOpen = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setAccountsListAnchor(event.currentTarget);
  };

  const handleAccountListDorpdownClose = () => {
    setAccountsListAnchor(undefined);
  };

  if (accounts === undefined) {
    // don't listen for events
    ethereum?.on("accountsChanged", (a) => {});
  } else {
    // listen for accounts change events
    ethereum?.on("accountsChanged", (a) => {
      setAccounts(a.length !== 0 ? a : undefined);
    });
  }

  return (
    <>
      {accounts ? (
        <>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleAccountListDorpdownOpen}
            color="inherit"
          >
            <AccountBalanceWalletIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={accountsListAnchor}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(accountsListAnchor)}
            onClose={handleAccountListDorpdownClose}
          >
            {accounts.map((a) => (
              <MenuItem>{a}</MenuItem>
            ))}
          </Menu>
        </>
      ) : (
        <Tooltip title="Connect to MetaMask">
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={handleConnect}
          >
            <LoginIcon />
          </IconButton>
        </Tooltip>
      )}
    </>
  );
};
