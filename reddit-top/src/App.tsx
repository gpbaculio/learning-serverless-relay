import { Suspense, useCallback, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import ActivePost from "./ActivePost";

import { StyledElements } from "./components";
import Drawer from "./Drawer";
import { DrawerContainer } from "./Drawer/Drawer";
import theme from "./theme";

const { StyledH2 } = StyledElements;

export const drawerWidth = 352;

function App() {
  const [isDrawerHidden, setIsDrawerHidden] = useState(false);

  const hideDrawer = useCallback(() => {
    setIsDrawerHidden(true);
  }, [setIsDrawerHidden]);

  const showDrawer = useCallback(() => {
    setIsDrawerHidden(false);
  }, [setIsDrawerHidden]);

  return (
    <ThemeProvider theme={theme}>
      <Container className='App'>
        <Suspense
          fallback={
            <DrawerContainer>
              <StyledH2 data-testid='@test:fallback:drawer:loading'>
                Loading...
              </StyledH2>
            </DrawerContainer>
          }>
          <Drawer
            isDrawerHidden={isDrawerHidden}
            hideDrawer={hideDrawer}
            showDrawer={showDrawer}
          />
        </Suspense>
        <ActivePost isDrawerHidden={isDrawerHidden} />
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
