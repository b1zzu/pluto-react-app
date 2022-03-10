import {
  List,
  ListItemIcon,
  ListItemText,
  ListItem,
  Paper,
  Toolbar,
  Typography,
  Link,
  Breadcrumbs,
  SvgIcon,
  IconButton,
  Grid,
  Skeleton,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link as RouterLink } from "react-router-dom";
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
  ArrowBackIos as ArrowBackIosIcon,
} from "@mui/icons-material";
import { Change } from "./CryptoTableView";

type LinksViewProps = {
  links?: string[];
  icon: typeof SvgIcon;
};

const LinksView: React.FunctionComponent<LinksViewProps> = (props) => {
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
  const navigate = useNavigate();
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

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ paddingLeft: 1, paddingBottom: 1 }}
      >
        <IconButton aria-label="delete" size="small" onClick={handleBackClick}>
          <ArrowBackIosIcon fontSize="inherit" />
        </IconButton>
        <Link component={RouterLink} underline="hover" color="inherit" to="/">
          Cryptos
        </Link>
        <Typography color="text.primary">{cryptoInfo.name}</Typography>
      </Breadcrumbs>
      <Paper sx={{ paddingTop: 1 }}>
        <Toolbar sx={{ paddingBottom: 1 }}>
          <Box sx={{ paddingTop: 1.5, paddingBottom: 1, paddingRight: 2 }}>
            {cryptoInfo.logo ? (
              <img
                style={{ height: 32, width: 32 }}
                src={cryptoInfo.logo.replace("64x64", "32x32")}
                alt={""}
              />
            ) : (
              <Skeleton variant="circular" width={40} height={40} />
            )}
          </Box>
          <Typography variant="h4" sx={{ paddingRight: 1 }}>
            {cryptoInfo.name ? (
              cryptoInfo.name
            ) : (
              <Skeleton sx={{ minWidth: 64 }} />
            )}
          </Typography>
          <Typography color={"text.secondary"} variant="h4">
            {cryptoInfo.symbol ? (
              cryptoInfo.symbol
            ) : (
              <Skeleton sx={{ minWidth: 32 }} />
            )}
          </Typography>
        </Toolbar>

        <Box
          sx={{
            paddingLeft: { xs: 2, sm: 4 },
            paddingRight: { xs: 2, sm: 4 },
            paddingBottom: 3,
          }}
        >
          <Grid container spacing={2} sx={{ paddingBottom: 2 }}>
            <Grid item xs={6}>
              {cryptoQuote.quote ? (
                <>
                  <Typography
                    sx={{ fontWeight: "bold", paddingRight: 2 }}
                    component="span"
                  >
                    Price:
                  </Typography>
                  <Typography paragraph={false} component="span">
                    {(cryptoQuote.quote?.["USD"].price || 0).toLocaleString()}{" "}
                    <b>$</b>
                  </Typography>
                </>
              ) : (
                <Typography>
                  <Skeleton />
                </Typography>
              )}
            </Grid>
            <Grid item xs={6}>
              {cryptoQuote.quote ? (
                <>
                  <Typography
                    sx={{ fontWeight: "bold", paddingRight: 2 }}
                    component="span"
                  >
                    24h %:
                  </Typography>
                  <Change
                    value={cryptoQuote.quote?.["USD"].percent_change_24h || 0}
                  />
                </>
              ) : (
                <Typography>
                  <Skeleton />
                </Typography>
              )}
            </Grid>
          </Grid>
          <Typography paragraph variant="body1">
            {cryptoInfo.description || <Skeleton height={96} />}
          </Typography>
          <List disablePadding>
            <LinksView links={cryptoInfo.urls?.website} icon={LanguageIcon} />
            <LinksView
              links={cryptoInfo.urls?.technical_doc}
              icon={ArticlIcon}
            />
            <LinksView links={cryptoInfo.urls?.explorer} icon={ExploreIcon} />
            <LinksView links={cryptoInfo.urls?.source_code} icon={CodeIcon} />
            <LinksView
              links={cryptoInfo.urls?.message_board}
              icon={MessageIcon}
            />
            <LinksView links={cryptoInfo.urls?.chat} icon={ChatIcon} />
            <LinksView
              links={cryptoInfo.urls?.announcement}
              icon={NotificationsIcon}
            />
            <LinksView links={cryptoInfo.urls?.reddit} icon={RedditIcon} />
            <LinksView links={cryptoInfo.urls?.twitter} icon={TwitterIcon} />
          </List>
        </Box>
      </Paper>
    </>
  );
};
