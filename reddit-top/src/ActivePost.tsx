import { useLazyLoadQuery } from "react-relay";
import { animated, useSpring } from "react-spring";
import { graphql } from "relay-runtime";
import styled from "styled-components";

import { drawerWidth } from "./App";
import { ActivePostQuery } from "./__generated__/ActivePostQuery.graphql";

interface ActivePostProps {
  isDrawerHidden: boolean;
}

const ActivePost = ({ isDrawerHidden }: ActivePostProps) => {
  const { viewer } = useLazyLoadQuery<ActivePostQuery>(ActivePostGraphQL, {});

  const style = useSpring({
    marginLeft: `${isDrawerHidden ? 58 : drawerWidth}px`,
  });

  return <Container style={style}>ActivePost</Container>;
};

export default ActivePost;

const Container = styled(animated.div)`
  display: flex;
  width: 100%;
  flex: 1;
  background-color: red;
`;

const ActivePostGraphQL = graphql`
  query ActivePostQuery {
    viewer {
      id
      activePost {
        thumbnail
        title
        author
      }
    }
  }
`;
