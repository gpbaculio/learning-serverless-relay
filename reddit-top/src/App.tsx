import { Suspense } from "react";
import styled, { ThemeProvider } from "styled-components";

import { StyledElements } from "./components";
import Drawer from "./Drawer";
import { DrawerContainer } from "./Drawer/Drawer";
import theme from "./theme";

const { StyledH2 } = StyledElements;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container className='App'>
        <Suspense
          fallback={
            <DrawerContainer>
              <StyledH2>Loading Listings...</StyledH2>
            </DrawerContainer>
          }>
          <Drawer />
        </Suspense>
      </Container>
    </ThemeProvider>
  );
}

export default App;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;
