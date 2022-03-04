import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <Container
      maxWidth="md"
      sx={{
        paddingTop: { xs: 1, sm: 1.5, md: 3 },
        paddingBottom: { xs: 1, sm: 1.5, md: 3 },
        paddingLeft: { xs: 1, sm: 2, md: 4 },
        paddingRight: { xs: 1, sm: 2, md: 4 },
      }}
    >
      <Outlet />
    </Container>
  );
}

export default App;
