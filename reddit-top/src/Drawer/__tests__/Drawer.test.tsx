import { cleanup, render, RenderResult, waitFor } from "@testing-library/react";
import {
  createMockEnvironment,
  MockPayloadGenerator,
  RelayMockEnvironment,
} from "relay-test-utils";

import { RelayProvider } from "../../components";
import Drawer from "../Drawer";
import { MockDrawerViewer } from "../test.constants";

describe("Nearby Filters", () => {
  let screen: RenderResult;

  let environment: RelayMockEnvironment;

  beforeEach(() => {
    environment = createMockEnvironment();

    environment.mock.queueOperationResolver((operation) =>
      MockPayloadGenerator.generate(operation, {
        Viewer: MockDrawerViewer,
      })
    );

    return waitFor(() => {
      screen = render(
        <RelayProvider {...{ environment }}>
          <Drawer />
        </RelayProvider>
      );
    });
  });

  afterEach(cleanup);

  it("should render Drawer", () => {
    expect(screen).toMatchSnapshot();
  });
});
