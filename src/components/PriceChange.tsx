import { Typography } from "@mui/material";

export const PriceChange: React.FunctionComponent<{ value: number }> = (
  props
) => {
  const color = props.value >= 0 ? "green" : "red";
  return (
    <Typography color={color} component="span">
      {props.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}{" "}
      <b>%</b>
    </Typography>
  );
};
