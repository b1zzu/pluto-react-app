import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { CryptoTableView } from "./views/CryptoTableView";
import { CryptoView } from "./views/CryptoView";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CoinMarketCapApiProvider } from "./api/CoinMarketCapApi";
import { EthereumProvider } from "./providers/EthereumProvider";
import { Web3Provider } from "./providers/Web3Provider";

ReactDOM.render(
  <React.StrictMode>
    <CoinMarketCapApiProvider>
      <EthereumProvider>
        <Web3Provider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />}>
                <Route path="" element={<CryptoTableView />} />
                <Route path="crypto/:id" element={<CryptoView />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Web3Provider>
      </EthereumProvider>
    </CoinMarketCapApiProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
