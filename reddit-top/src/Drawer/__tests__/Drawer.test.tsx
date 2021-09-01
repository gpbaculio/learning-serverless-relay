import { cleanup, render, RenderResult, waitFor } from "@testing-library/react";
import {
  createMockEnvironment,
  MockPayloadGenerator,
  RelayMockEnvironment,
} from "relay-test-utils";

import { RelayProvider } from "../../components";
import Drawer from "../Drawer";
import { MockDrawerViewer } from "../test.constants";

const { listings: initialMockListings } = MockDrawerViewer();

describe("Drawer Tests", () => {
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

  it("should render Drawer initial lists and loadMore pagination", () => {
    initialMockListings.edges.forEach((edge) => {
      const li = screen.getByTestId(`@test:list:${edge.node.id}`);
      expect(li).toBeTruthy();
    });
  });
});
