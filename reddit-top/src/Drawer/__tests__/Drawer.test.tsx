import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import {
  createMockEnvironment,
  MockPayloadGenerator,
  RelayMockEnvironment,
} from "relay-test-utils";
import { Globals } from "react-spring";

import { RelayProvider } from "../../components";
import Drawer from "../Drawer";
import { listUpdater } from "../Listings/helpers";
import { MockDrawerNextViewer, MockDrawerViewer } from "../test.constants";
import {
  ListingFragmentGraphQL_listing,
  ListingFragmentGraphQL_listing$data,
} from "../../__generated__/ListingFragmentGraphQL_listing.graphql";
import { Record } from "relay-runtime";

const { listings: initialMockListings } = MockDrawerViewer();
const { listings: nextMockListings } = MockDrawerNextViewer();

describe("Drawer Tests", () => {
  let screen: RenderResult;

  let environment: RelayMockEnvironment;

  beforeEach(() => {
    Globals.assign({
      skipAnimation: true,
    });
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
    const ul = screen.getByTestId("@test:listings:ul");

    expect(ul).toBeTruthy();

    initialMockListings.edges.forEach((edge) => {
      const li = screen.getByTestId(`@test:list:${edge.node.id}`);
      expect(li).toBeTruthy();
    });

    fireEvent.scroll(ul, { target: { scrollY: 800 } });

    const paginationLoader = screen.getByTestId("@test:listings:isLoadingNext");

    expect(paginationLoader).toBeTruthy();

    act(() => {
      environment.mock.resolveMostRecentOperation((operation) =>
        MockPayloadGenerator.generate(operation, {
          Viewer: MockDrawerNextViewer,
        })
      );
    });

    nextMockListings.edges.forEach((edge) => {
      const li = screen.getByTestId(`@test:list:${edge.node.id}`);
      expect(li).toBeTruthy();
    });
  });

  it("should render Drawer lists and handle read indicator when a list pressed", () => {
    const ul = screen.getByTestId("@test:listings:ul");

    expect(ul).toBeTruthy();

    initialMockListings.edges.forEach((edge) => {
      const li = screen.getByTestId(`@test:list:${edge.node.id}`);
      expect(li).toBeTruthy();

      const unReadCircleTestId = `@test:list:${edge.node.id}:unreadcircle`;
      const listUnreadCircle = screen.getByTestId(unReadCircleTestId);
      expect(listUnreadCircle).toBeTruthy();

      fireEvent.click(li);

      expect(screen.queryByTestId(unReadCircleTestId)).toBeFalsy();
    });
  });

  it("should render Drawer lists and handle dismiss when Dismiss Post btn is pressed", async () => {
    const ul = screen.getByTestId("@test:listings:ul");

    expect(ul).toBeTruthy();

    initialMockListings.edges.forEach((edge) => {
      const li = screen.getByTestId(`@test:list:${edge.node.id}`);
      expect(li).toBeTruthy();

      const dismissBtn = screen.getByTestId(
        `@test:dismiss:list:${edge.node.id}`
      );

      const list = environment
        .getStore()
        .getSource()
        .get<ListingFragmentGraphQL_listing$data>(edge.node.id);
      expect(list).toBeTruthy();
      expect(list && list.isDismissed).toBeFalsy();

      expect(dismissBtn).toBeTruthy();
      fireEvent.click(dismissBtn);

      const listOnDismissClick = environment
        .getStore()
        .getSource()
        .get<ListingFragmentGraphQL_listing$data>(edge.node.id);
      expect(listOnDismissClick).toBeTruthy();
      expect(listOnDismissClick && listOnDismissClick.isDismissed).toBeTruthy();
    });
  });
});
