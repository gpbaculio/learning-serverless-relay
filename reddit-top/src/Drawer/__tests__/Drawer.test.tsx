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
import { MockDrawerNextViewer, MockDrawerViewer } from "../test.constants";

const { listings: initialMockListings, id: mockViewerId } = MockDrawerViewer();
const { listings: nextMockListings } = MockDrawerNextViewer();

const getNode = (environment: RelayMockEnvironment, nodeId: string) =>
  environment.getStore().getSource().get(nodeId);

describe("Drawer Tests", () => {
  let screen: RenderResult;

  let environment: RelayMockEnvironment;
  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterAll(() => {
    jest.useRealTimers();
  });
  beforeEach(() => {
    Globals.assign({
      skipAnimation: true,
      requestAnimationFrame: (fn) => setTimeout(fn, 16),
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
      const list = getNode(environment, edge.node.id);
      expect(list).toBeTruthy();
      expect(list && list.isRead).toBeFalsy();

      expect(list && list.author).toBeTruthy();
      expect(list && list.title).toBeTruthy();
      expect(list && list.thumbnail).toBeTruthy();

      fireEvent.click(li);

      const mockViewerProxy = getNode(environment, mockViewerId);
      if (mockViewerProxy) {
        const activePostProxy = getNode(
          environment,
          (mockViewerProxy.activePost as { __ref: string }).__ref
        );
        if (activePostProxy && list) {
          expect(activePostProxy).toBeTruthy();
          expect(activePostProxy.author).toEqual(list.author);
          expect(activePostProxy.title).toEqual(list.title);
          expect(activePostProxy.thumbnail).toEqual(list.thumbnail);
        }
      }
      const listOnDismissClick = getNode(environment, edge.node.id);
      expect(listOnDismissClick).toBeTruthy();
      expect(listOnDismissClick && listOnDismissClick.isRead).toBeTruthy();

      expect(screen.queryByTestId(unReadCircleTestId)).toBeFalsy();
    });
  });

  it("should render Drawer lists and handle dismiss when Dismiss Post btn is pressed", () => {
    const ul = screen.getByTestId("@test:listings:ul");

    expect(ul).toBeTruthy();

    initialMockListings.edges.forEach((edge) => {
      const li = screen.getByTestId(`@test:list:${edge.node.id}`);
      expect(li).toBeTruthy();

      const dismissBtn = screen.getByTestId(
        `@test:dismiss:list:${edge.node.id}`
      );

      const list = getNode(environment, edge.node.id);
      expect(list).toBeTruthy();
      expect(list && list.isDismissed).toBeFalsy();

      expect(dismissBtn).toBeTruthy();

      fireEvent.click(dismissBtn);

      jest.advanceTimersByTime(500);

      expect(li).toHaveStyle({
        opacity: 0,
        "font-size": "0px",
        transform: `translateX(-100px)`,
        "padding-top": "0px",
        "padding-right": "0px",
        "padding-bottom": "0px",
        "padding-left": "0px",
      });
      const listOnDismissClick = getNode(environment, edge.node.id);
      expect(listOnDismissClick).toBeTruthy();
      expect(listOnDismissClick && listOnDismissClick.isDismissed).toBeTruthy();
    });
  });

  it("should render Drawer lists and handle dismissing all lists when Dismiss All btn is pressed", () => {
    const ul = screen.getByTestId("@test:listings:ul");

    expect(ul).toBeTruthy();

    initialMockListings.edges.forEach((edge) => {
      const li = screen.getByTestId(`@test:list:${edge.node.id}`);
      expect(li).toBeTruthy();

      const list = getNode(environment, edge.node.id);
      expect(list).toBeTruthy();
      expect(list && list.isDismissed).toBeFalsy();
    });

    const dismissAllBtn = screen.getByTestId(`@test:listings:dismissAllBtn`);
    expect(dismissAllBtn).toBeTruthy();

    fireEvent.click(dismissAllBtn);

    jest.advanceTimersByTime(500);

    initialMockListings.edges.forEach((edge) => {
      const li = screen.getByTestId(`@test:list:${edge.node.id}`);
      expect(li).toBeTruthy();
      expect(li).toHaveStyle({
        opacity: 0,
        "font-size": "0px",
        transform: `translateX(-100px)`,
        "padding-top": "0px",
        "padding-right": "0px",
        "padding-bottom": "0px",
        "padding-left": "0px",
      });
      const listOnDismissClick = getNode(environment, edge.node.id);
      expect(listOnDismissClick).toBeTruthy();
      expect(listOnDismissClick && listOnDismissClick.isDismissed).toBeTruthy();
    });
  });
});
