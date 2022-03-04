import { Axios, AxiosResponse } from "axios";
import { SupportLanguage } from "prettier";
import React, { useContext } from "react";

export type V1CryptoCurrencyListingsLatestParams = {
  start?: number;
  limit?: number;
  price_min?: number;
  price_max?: number;
  market_cap_min?: number;
  market_cap_max?: number;
  volume_24h_min?: number;
  volume_24h_max?: number;
  circulating_supply_min?: number;
  circulating_supply_max?: number;
  percent_change_24h_min?: number;
  percent_change_24h_max?: number;
  convert?: string;
  convert_id?: string;
  sort?: string;
  sort_dir?: string;
  cryptocurrency_type?: string;
  tag?: string;
  aux?: string;
};

export type V2CryptocurrencyInfoParams = {
  id?: string;
  slug?: string;
  symbol?: string;
  address?: string;
  aux?: string;
};

export type V2CryptocurrencyQuotesLatestParams = {
  id?: string;
  slug?: string;
  symbol?: string;
  convert?: string;
  convert_id?: string;
  aux?: string;
  skip_invalid?: string;
};

export interface V1Response<T> {
  data: T;
  status: V1ResponseStatus;
}

export type V1ResponseStatus = {
  timestamp: string;
  error_code: number;
  error_message: string;
  elapsed: number;
  credit_count: number;
};

export type V1CryptoCurrencyQuote = {
  price: number;
  volume_24h: number;
  volume_change_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  market_cap: number;
  market_cap_dominance: number;
  fully_diluted_market_cap: number;
  last_updated: string;
};

export type V1CryptoCurrencyLatest = {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  cmc_rank: number;
  num_market_pairs: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  last_updated: string;
  date_added: string;
  tags: string[];
  platform: null;
  quote: { [key: string]: V1CryptoCurrencyQuote };
};

export type V2CryptoCurrencyInfo = {
  id?: number;
  name?: string;
  symbol?: string;
  category?: string;
  slug?: string;
  logo?: string;
  description?: string;
  date_added?: string;
  date_launched?: string;
  notice?: string;
  tags?: string[];
  platform?: {
    id: number;
    name: string;
    symbol: string;
    slug: string;
    token_address: string;
  };
  self_reported_circulating_supply?: number;
  self_reported_market_cap?: number;
  self_reported_tags?: number;
  urls?: {
    website: string[];
    technical_doc: string[];
    explorer: string[];
    source_code: string[];
    message_board: string[];
    chat: string[];
    announcement: string[];
    reddit: string[];
    twitter: string[];
  };
};

export type V2CryptoCurrencyQuotes = {
  id?: number;
  name?: string;
  symbol?: string;
  slug?: string;
  is_active?: 0 | 1;
  is_fiat?: 0 | 1;
  cmc_rank?: number;
  num_market_pairs?: number;
  circulating_supply?: number;
  total_supply?: number;
  market_cap_by_total_supply?: number;
  max_supply?: number;
  date_added?: string;
  tags?: string[];
  platform?: {
    id: number;
    name: string;
    symbol: string;
    slug: string;
    token_address: string;
  };
  last_updated?: string;
  self_reported_circulating_supply?: number;
  self_reported_market_cap?: number;
  quote?: {
    [key: string]: {
      price: number;
      volume_24h: number;
      volume_change_24h: number;
      volume_24h_reported: number;
      volume_7d: number;
      volume_7d_reported: number;
      volume_30d: number;
      volume_30d_reported: number;
      market_cap: number;
      market_cap_dominance: number;
      fully_diluted_market_cap: number;
      percent_change_1h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      last_updated: string;
    };
  };
};

export class CoinMarketCapApi {
  private axios: Axios;

  constructor() {
    this.axios = new Axios({
      baseURL: "/api/coinmarketcap",
      responseType: "json",
      transformResponse: [
        function transformResponse(data) {
          return JSON.parse(data);
        },
      ],
      headers: {
        Accept: "application/json",
      },
    });
  }

  /**
   * See: https://coinmarketcap.com/api/documentation/v1/#operation/getV1CryptocurrencyListingsLatest
   */
  getV1CryptocurrencyListingsLatest(
    params?: V1CryptoCurrencyListingsLatestParams
  ): Promise<AxiosResponse<V1Response<V1CryptoCurrencyLatest[]>>> {
    return this.axios.get("/v1/cryptocurrency/listings/latest", {
      params: params,
    });
  }

  /**
   * See: https://coinmarketcap.com/api/documentation/v1/#operation/getV2CryptocurrencyInfo
   */
  getV2CryptocurrencyInfo(
    params?: V2CryptocurrencyInfoParams
  ): Promise<
    AxiosResponse<V1Response<{ [key: number]: V2CryptoCurrencyInfo }>>
  > {
    return this.axios.get("/v1/cryptocurrency/info", {
      params: params,
    });
  }

  /**
   * See: https://coinmarketcap.com/api/documentation/v1/#operation/getV2CryptocurrencyQuotesLatest
   */
  getV2CryptocurrencyQuotesLatest(
    params?: V2CryptocurrencyQuotesLatestParams
  ): Promise<
    AxiosResponse<V1Response<{ [key: number]: V2CryptoCurrencyQuotes }>>
  > {
    return this.axios.get("/v2/cryptocurrency/quotes/latest", {
      params: params,
    });
  }
}

export const CoinMarketCapApiContext: React.Context<
  CoinMarketCapApi | undefined
> = React.createContext<CoinMarketCapApi | undefined>(undefined);

export const CoinMarketCapApiProvider: React.FunctionComponent = ({
  children,
}) => {
  const api = new CoinMarketCapApi();
  return (
    <CoinMarketCapApiContext.Provider value={api}>
      {children}
    </CoinMarketCapApiContext.Provider>
  );
};

export const useCoinMarketCapApi = (): CoinMarketCapApi => {
  const config = useContext(CoinMarketCapApiContext);
  if (config === undefined) {
    throw new Error("must be used inside an CoinMarketCapApiContextProvider");
  }
  return config;
};
