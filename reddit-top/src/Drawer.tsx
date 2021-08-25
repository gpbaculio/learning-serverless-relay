import { useEffect, useRef, useState } from "react";
import { graphql } from "babel-plugin-relay/macro";
import { useLazyLoadQuery } from "react-relay";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import { useSwipeable } from "react-swipeable";

import Listings from "./Listings";

import { DrawerQuery } from "./__generated__/DrawerQuery.graphql";

const Drawer = () => {
  const { viewer } = useLazyLoadQuery<DrawerQuery>(DrawerGraphQL, {});
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [hideDrawer, setHideDrawer] = useState(false);

  const handlers = useSwipeable({
    onSwipedRight: () => {
      setHideDrawer(false);
    },
    onSwipedLeft: () => {
      setHideDrawer(true);
    },
    trackMouse: true,
  });

  useEffect(() => {
    if (containerRef && containerRef.current) {
      const { width } = containerRef.current.getBoundingClientRect();
      setContainerWidth(width);
    }
  }, [containerRef]);

  const styles = useSpring({
    transform: `translateX(${hideDrawer ? -containerWidth / 1.2 : 0}px)`,
  });

  return (
    <Container {...{ style: styles, ...handlers, ref: containerRef }}>
      {viewer && <Listings viewer={viewer} />}
    </Container>
  );
};

export default Drawer;

const DrawerGraphQL = graphql`
  query DrawerQuery($id: String) {
    viewer {
      user
      id
      ...ListingsPagination_viewer @arguments(id: $id)
    }
  }
`;

const Container = styled(animated.div)`
  height: 100%;
  background-color: red;
  overflow-y: scroll;
`;
