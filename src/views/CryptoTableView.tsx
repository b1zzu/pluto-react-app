import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Toolbar,
  Typography,
  Link,
  Breadcrumbs,
  TablePagination,
  IconButton,
  Skeleton,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import {
  useCoinMarketCapApi,
  V1CryptoCurrencyLatest,
} from "../api/CoinMarketCapApi";
import {
  Link as RouterLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  AttachMoney as AttachMoneyIcon,
  ArrowBackIos as ArrowBackIosIcon,
} from "@mui/icons-material";

export const Change: React.FunctionComponent<{ value: number }> = (props) => {
  const color = props.value >= 0 ? "green" : "red";
  return (
    <Typography color={color} component="span">
      {props.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}{" "}
      <b>%</b>
    </Typography>
  );
};

export const CryptoTableView: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const tableHeadRef = useRef<HTMLTableSectionElement>(null);

  const coinMarketCapApi = useCoinMarketCapApi();
  const [cryptos, setCryptos] = useState<
    V1CryptoCurrencyLatest[] | undefined
  >();

  const page = parseInt(searchParams.get("page") || "0");
  const rows = parseInt(searchParams.get("rows") || "10");

  // Load the cryptos from coinmakercap
  useEffect(() => {
    coinMarketCapApi
      .getV1CryptocurrencyListingsLatest({
        start: page * rows + 1,
        limit: rows,
      })
      .then((result) => {
        setCryptos(result.data.data);
      });
  }, [coinMarketCapApi, page, rows]);

  const scrollTop = () => {
    tableHeadRef.current?.scrollIntoView();
  };

  const handlePageChange = (_event: unknown, page: number) => {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
    setCryptos(undefined);
    scrollTop();
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    searchParams.set("page", "0");
    searchParams.set("rows", event.target.value);
    setSearchParams(searchParams);
    scrollTop();
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" sx={{ paddingBottom: 1 }}>
        <IconButton aria-label="delete" size="small" onClick={handleBackClick}>
          <ArrowBackIosIcon fontSize="inherit" />
        </IconButton>
        <Link component={RouterLink} underline="hover" color="inherit" to="/">
          Cryptos
        </Link>
      </Breadcrumbs>
      <Paper sx={{paddingTop: 1}}>
        <Toolbar>
          <AttachMoneyIcon fontSize="large" />
          <Typography variant="h4">Cryptocurrencies</Typography>
        </Toolbar>
        <TableContainer>
          <Table>
            <TableHead ref={tableHeadRef}>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">24h %</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cryptos
                ? cryptos.map((crypto) => {
                    return (
                      <TableRow key={crypto.id}>
                        <TableCell>
                          <Link
                            color="inherit"
                            underline="none"
                            component={RouterLink}
                            to={`crypto/${crypto.id}`}
                          >
                            <b>{crypto.name}</b> {crypto.symbol}
                          </Link>
                        </TableCell>
                        <TableCell sx={{ whiteSpace: "nowrap" }} align="right">
                          {crypto.quote["USD"].price.toLocaleString()} <b>$</b>
                        </TableCell>
                        <TableCell sx={{ whiteSpace: "nowrap" }} align="right">
                          <Change
                            value={crypto.quote["USD"].percent_change_24h}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })
                : Array.from(Array(rows).keys()).map((i) => {
                    return (
                      <TableRow key={i}>
                        <TableCell>
                          <Skeleton variant="text" />
                        </TableCell>
                        <TableCell>
                          <Skeleton variant="text" />
                        </TableCell>
                        <TableCell>
                          <Skeleton variant="text" />
                        </TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={-1}
          rowsPerPage={rows}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Paper>
    </>
  );
};
