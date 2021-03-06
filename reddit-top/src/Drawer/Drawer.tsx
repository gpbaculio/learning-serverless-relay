import { useRef, useEffect } from "react";
import {
  useLazyLoadQuery,
  useRelayEnvironment,
  commitLocalUpdate,
} from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import { useSwipeable } from "react-swipeable";

import Header from "./Header";
import Listings from "./Listings";

import { DrawerQuery } from "../__generated__/DrawerQuery.graphql";
import { drawerWidth } from "../App";

interface DrawerProps {
  isDrawerHidden?: boolean;
  hideDrawer?: () => void;
  showDrawer?: () => void;
}

const Drawer = ({ isDrawerHidden, hideDrawer, showDrawer }: DrawerProps) => {
  const environment = useRelayEnvironment();
  const DrawerGraphQL = graphql`
    query DrawerQuery {
      viewer {
        user
        id
        ...ListingsPagination_viewer
      }
    }
  `;
  const { viewer } = useLazyLoadQuery<DrawerQuery>(DrawerGraphQL, {});
  const containerRef = useRef<HTMLDivElement>(null);

  const handlers = useSwipeable({
    onSwipedRight: showDrawer,
    onSwipedLeft: hideDrawer,
    trackMouse: true,
  });

  const styles = useSpring({
    transform: `translateX(${!!isDrawerHidden ? -drawerWidth / 1.2 : 0}px)`,
  });

  useEffect(() => {
    commitLocalUpdate(environment, (store) => {
      const viewerProxy = store.getRoot().getLinkedRecord("viewer");
      if (viewerProxy) {
        const postId = `client:Post:${Math.random()}`;
        const postProxy = store.create(postId, "ActivePost");
        postProxy.setValue("", "thumbnail");
        postProxy.setValue("", "title");
        postProxy.setValue("", "author");
        viewerProxy.setLinkedRecord(postProxy, "activePost");
      }
    });
  }, [environment]);

  return (
    <DrawerContainer {...{ style: styles, ...handlers, ref: containerRef }}>
      <Header />
      {viewer && <Listings viewer={viewer} />}
    </DrawerContainer>
  );
};

export default Drawer;

export const DrawerContainer = styled(animated.div)`
  ${({ theme }) => `background-color:${theme.background};`}
  height: 100%;
  display: flex;
  flex-direction: column;
  min-width: 352px;
  position: absolute;
`;
