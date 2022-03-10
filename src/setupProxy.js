const { createProxyMiddleware } = require("http-proxy-middleware");

const DEFAULT_COINMARKETCAP_ENDPOINT = "https://sandbox-api.coinmarketcap.com";
const DEFAULT_COINMARKETCAP_API_KEY = "b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c";

module.exports = function (app) {
  app.use(
    "/api/coinmarketcap",
    createProxyMiddleware({
      target:
        process.env.REACT_APP_COINMARKETCAP_ENDPOINT ||
        DEFAULT_COINMARKETCAP_ENDPOINT,
      pathRewrite: {
        "^/api/coinmarketcap/": "/", // remove base path
      },
      headers: {
        "X-CMC_PRO_API_KEY":
          process.env.REACT_APP_COINMARKETCAP_API_KEY ||
          DEFAULT_COINMARKETCAP_API_KEY,
      },
      changeOrigin: true,
    })
  );
};
