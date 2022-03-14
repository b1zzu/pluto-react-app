import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Box,
  Typography,
  Link,
  TablePagination,
  Skeleton,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import {
  useCoinMarketCapApi,
  V1CryptoCurrencyLatest,
} from "../api/CoinMarketCapApi";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import { AttachMoney as AttachMoneyIcon } from "@mui/icons-material";
import { PriceChange } from "../components/PriceChange";
import { Price } from "../components/Price";
import {
  NavBreadcrumbs,
  NavBreadcrumbsItem,
} from "../components/NavBreadcrumbs";

export const CryptoTableView: React.FunctionComponent = () => {
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

  return (
    <>
      <NavBreadcrumbs>
        <NavBreadcrumbsItem to="/">Home</NavBreadcrumbsItem>
      </NavBreadcrumbs>
      <Paper sx={{ paddingTop: 2 }}>
        <Box
          sx={{
            paddingBottom: 1,
            paddingLeft: { xs: 2, sm: 4 },
            paddingRight: { xs: 2, sm: 4 },
          }}
        >
          <AttachMoneyIcon
            fontSize="large"
            sx={{ height: 32, width: 32, paddingRight: 1, marginBottom: -0.5 }}
          />
          <Typography
            variant="h4"
            component="div"
            sx={{ display: "inline-block" }}
          >
            Cryptocurrencies
          </Typography>
        </Box>
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
                          <Price value={crypto.quote["USD"].price} />
                        </TableCell>
                        <TableCell sx={{ whiteSpace: "nowrap" }} align="right">
                          <PriceChange
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
