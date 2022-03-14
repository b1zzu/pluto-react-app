# Pluto React App

This is a sample project that lists Cryptocurrencies from the [CoinMarketCap API](https://coinmarketcap.com/api/documentation/v1/). The project is powered by [Create React App](https://create-react-app.dev/), [Material UI](https://mui.com/) and [React Router](https://reactrouterdotcom.fly.dev/).

## Try it out

### Prerequisistes

- Node.js >= 12

### Getting start

1. Obtain a CoinMarketCap Pro API Key from https://pro.coinmarketcap.com/

   > Note: If you don't configure the CoinMarketCap Pro API Key the project will fallback to the CoinMarketCap Sandbox API and will therefore expose only mock data

2. Create a `.env` file in the project root with the CoinMarketCap API endpoint and key like this:

   ```
   REACT_APP_COINMARKETCAP_ENDPOINT=https://pro-api.coinmarketcap.com
   REACT_APP_COINMARKETCAP_API_KEY=your-coinmarketcap-private-key
   ```

   the result will look like this:

   ```
   $ ls -a
   .  ..  config-overrides.js  .env  .git  .gitignore  package.json  package-lock.json  .prettierrc  public  README.md  src  tsconfig.json
   $ cat .env
   REACT_APP_COINMARKETCAP_ENDPOINT=https://pro-api.coinmarketcap.com
   REACT_APP_COINMARKETCAP_API_KEY=your-coinmarketcap-private-key
   ```

3. Install all the project dependencies:

   ```
   npm install
   ```

4. Start the project locally:

   ```
   npm start
   ```

   > If the project will not open automatically in your default browser go to http://localhost:3000/

   ![image](https://user-images.githubusercontent.com/7964685/158197203-79ac0839-10f7-46ae-b085-1cdce16c3563.png)

### Connect to the MetaMask wallet

**Requirements:**

- MetaMask Browser extension installed
- At least one account in MetaMask
- And MetaMask must be unlocked

1. Click on the Login icon in the top-right corner of the App
2. A MetaMask pop-up will open where you can select the account to connect
3. After connecting an Account always in the top-right corner you can open the drop-down with your account address
