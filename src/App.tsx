import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useWeb3 } from "./providers/Web3Provider";
import { AccountWidget } from "./widgets/AccountWidget";

function App() {
  const web3 = useWeb3();

  console.log(web3);

  return (
    <>
      <AppBar position="static" sx={{ minWidth: 375 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            React App
          </Typography>
          <AccountWidget />
        </Toolbar>
      </AppBar>
      <Container
        maxWidth="md"
        sx={{
          paddingTop: { xs: 1, sm: 1.5, md: 3 },
          paddingBottom: { xs: 1, sm: 1.5, md: 3 },
          paddingLeft: { xs: 1, sm: 2, md: 4 },
          paddingRight: { xs: 1, sm: 2, md: 4 },
          minWidth: 375,
        }}
      >
        <Outlet />
      </Container>
    </>
  );
}

export default App;
