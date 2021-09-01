import { render } from "@testing-library/react";
import { createMockEnvironment } from "relay-test-utils";

import { RelayProvider } from "../components";
import App from "../App";

test("should render App", () => {
  const environment = createMockEnvironment();

  const screen = render(
    <RelayProvider environment={environment}>
      <App />
    </RelayProvider>
  );

  expect(screen).toBeTruthy();
});
