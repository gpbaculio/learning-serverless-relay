import { Suspense } from "react";
import styled from "styled-components";

import Drawer from "./Drawer";

function App() {
  return (
    <Container className='App'>
      <Suspense fallback={<h1>Loading Listings...</h1>}>
        <Drawer />
      </Suspense>
    </Container>
  );
}

export default App;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;
