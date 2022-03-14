import { Typography } from "@mui/material";

export const Price: React.FunctionComponent<{
  value: number;
  symbol?: string;
}> = (props) => {
  return (
    <Typography component="span">
      {props.value.toLocaleString()} <b>{props.symbol || "$"}</b>
    </Typography>
  );
};
