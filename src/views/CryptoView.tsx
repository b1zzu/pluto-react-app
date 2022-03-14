import {
  List,
  ListItemIcon,
  ListItemText,
  ListItem,
  Paper,
  Typography,
  Link,
  SvgIcon,
  Grid,
  Skeleton,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useCoinMarketCapApi,
  V2CryptoCurrencyInfo,
  V2CryptoCurrencyQuotes,
} from "../api/CoinMarketCapApi";
import {
  Language as LanguageIcon,
  Article as ArticlIcon,
  Explore as ExploreIcon,
  Code as CodeIcon,
  Message as MessageIcon,
  Chat as ChatIcon,
  Notifications as NotificationsIcon,
  Reddit as RedditIcon,
  Twitter as TwitterIcon,
} from "@mui/icons-material";
import { PriceChange } from "../components/PriceChange";
import { Price } from "../components/Price";
import {
  NavBreadcrumbs,
  NavBreadcrumbsItem,
} from "../components/NavBreadcrumbs";

const CryptoViewRow: React.FunctionComponent = (props) => {
  return (
    <Box
      sx={{
        paddingBottom: 2,
        paddingLeft: { xs: 2, sm: 4 },
        paddingRight: { xs: 2, sm: 4 },
      }}
    >
      {props.children}
    </Box>
  );
};

type CryptoViewHeadProps = {
  logo?: string;
  name?: string;
  symbol?: string;
};

const CryptoViewHead: React.FunctionComponent<CryptoViewHeadProps> = (
  props
) => {
  return (
    <>
      <Box
        sx={{
          paddingRight: 2,
          display: "inline-block",
        }}
      >
        {props.logo ? (
          <img
            style={{ height: 32, width: 32, marginBottom: -4 }}
            src={props.logo.replace("64x64", "32x32")}
            alt={""}
          />
        ) : (
          <Skeleton variant="circular" width={40} height={40} />
        )}
      </Box>
      <Typography
        variant="h4"
        component="div"
        sx={{ paddingRight: 1, display: "inline-block" }}
      >
        {props.name || <Skeleton height={38} width={128} />}
      </Typography>
      <Typography
        color={"text.secondary"}
        variant="h4"
        component="div"
        sx={{ display: "inline-block" }}
      >
        {props.symbol || <Skeleton height={38} width={128} />}
      </Typography>
    </>
  );
};

type CryptoViewQuoteProps = {
  usd_price?: number;
  usd_percent_change_24h?: number;
};

const CryptoViewQuote: React.FunctionComponent<CryptoViewQuoteProps> = (
  props
) => {
  return (
    <Grid container>
      <Grid item xs={6} sx={{ display: "inline-block" }}>
        {props.usd_price ? (
          <>
            <Typography
              sx={{ fontWeight: "bold", paddingRight: 2 }}
              component="span"
            >
              Price:
            </Typography>
            <Price value={props.usd_price} />
          </>
        ) : (
          <Typography>
            <Skeleton width={160} />
          </Typography>
        )}
      </Grid>
      <Grid item xs={6} sx={{ display: "inline-block" }}>
        {props.usd_percent_change_24h ? (
          <>
            <Typography
              sx={{ fontWeight: "bold", paddingRight: 2 }}
              component="span"
            >
              24h %:
            </Typography>
            <PriceChange value={props.usd_percent_change_24h} />
          </>
        ) : (
          <Typography>
            <Skeleton width={160} />
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

type CryptoViewLinksProps = {
  links?: string[];
  icon: typeof SvgIcon;
};

const CryptoViewLinks: React.FunctionComponent<CryptoViewLinksProps> = (
  props
) => {
  return (
    <>
      {props.links ? (
        props.links.map((link) => (
          <ListItem key={link} disableGutters disablePadding>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <props.icon fontSize="small" />
            </ListItemIcon>
            <ListItemText sx={{ overflow: "hidden" }}>
              <Link
                href={link}
                target="_blank"
                underline="hover"
                color="inherit"
              >
                {link}
              </Link>
            </ListItemText>
          </ListItem>
        ))
      ) : (
        <ListItem disableGutters disablePadding>
          <ListItemText>
            <Skeleton />
          </ListItemText>
        </ListItem>
      )}
    </>
  );
};

export const CryptoView: React.FunctionComponent = () => {
  const { id } = useParams();

  const coinMarketCapApi = useCoinMarketCapApi();
  const [cryptoInfo, setCrypto] = useState<V2CryptoCurrencyInfo>({});
  const [cryptoQuote, setCryptoQuote] = useState<V2CryptoCurrencyQuotes>({});

  useEffect(() => {
    if (id === undefined) {
      return;
    }

    coinMarketCapApi.getV2CryptocurrencyInfo({ id: id }).then((result) => {
      setCrypto(result.data.data[parseInt(id)]);
    });

    coinMarketCapApi
      .getV2CryptocurrencyQuotesLatest({ id: id })
      .then((result) => {
        setCryptoQuote(result.data.data[parseInt(id)]);
      });
  }, [coinMarketCapApi, id]);

  const breadcrumbs: {
    label: string;
    to?: string;
  }[] = [{ label: "Home", to: "/" }];
  if (cryptoInfo?.name) {
    breadcrumbs.push({ label: cryptoInfo.name });
  }

  return (
    <>
      <NavBreadcrumbs>
        <NavBreadcrumbsItem to="/">Home</NavBreadcrumbsItem>
        {cryptoInfo?.name && (
          <NavBreadcrumbsItem>{cryptoInfo.name}</NavBreadcrumbsItem>
        )}
      </NavBreadcrumbs>
      <Paper sx={{ paddingTop: 2 }}>
        <CryptoViewRow>
          <CryptoViewHead
            logo={cryptoInfo.logo}
            name={cryptoInfo.name}
            symbol={cryptoInfo.symbol}
          />
        </CryptoViewRow>
        <CryptoViewRow>
          <CryptoViewQuote
            usd_price={cryptoQuote.quote?.["USD"].price}
            usd_percent_change_24h={
              cryptoQuote.quote?.["USD"].percent_change_24h
            }
          />
        </CryptoViewRow>
        <CryptoViewRow>
          <Typography paragraph variant="body1" marginBottom={0}>
            {cryptoInfo.description || <Skeleton height={96} />}
          </Typography>
        </CryptoViewRow>
        <CryptoViewRow>
          <List disablePadding>
            <CryptoViewLinks
              links={cryptoInfo.urls?.website}
              icon={LanguageIcon}
            />
            <CryptoViewLinks
              links={cryptoInfo.urls?.technical_doc}
              icon={ArticlIcon}
            />
            <CryptoViewLinks
              links={cryptoInfo.urls?.explorer}
              icon={ExploreIcon}
            />
            <CryptoViewLinks
              links={cryptoInfo.urls?.source_code}
              icon={CodeIcon}
            />
            <CryptoViewLinks
              links={cryptoInfo.urls?.message_board}
              icon={MessageIcon}
            />
            <CryptoViewLinks links={cryptoInfo.urls?.chat} icon={ChatIcon} />
            <CryptoViewLinks
              links={cryptoInfo.urls?.announcement}
              icon={NotificationsIcon}
            />
            <CryptoViewLinks
              links={cryptoInfo.urls?.reddit}
              icon={RedditIcon}
            />
            <CryptoViewLinks
              links={cryptoInfo.urls?.twitter}
              icon={TwitterIcon}
            />
          </List>
        </CryptoViewRow>
      </Paper>
    </>
  );
};
