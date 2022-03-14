import { Breadcrumbs, IconButton, Link, Typography } from "@mui/material";
import { ArrowBackIos as ArrowBackIosIcon } from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";

type NavBreadcrumbsItemProps = {
  to?: string;
};

export const NavBreadcrumbsItem: React.FunctionComponent<
  NavBreadcrumbsItemProps
> = (props) => {
  return props.to ? (
    <Link
      component={RouterLink}
      underline="hover"
      color="inherit"
      to={props.to}
    >
      {props.children}
    </Link>
  ) : (
    <Typography color="text.primary">{props.children}</Typography>
  );
};

export const NavBreadcrumbs: React.FunctionComponent = (props) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      sx={{ paddingLeft: 1, paddingBottom: 1 }}
    >
      <IconButton aria-label="delete" size="small" onClick={handleBackClick}>
        <ArrowBackIosIcon fontSize="inherit" />
      </IconButton>
      {props.children}
    </Breadcrumbs>
  );
};
