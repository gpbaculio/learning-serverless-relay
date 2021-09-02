import { useEffect } from "react";
import { useLazyLoadQuery, useRelayEnvironment } from "react-relay";
import { animated, useSpring } from "react-spring";
import { commitLocalUpdate, graphql } from "relay-runtime";
import styled from "styled-components";
import { ActivePostQuery } from "./__generated__/ActivePostQuery.graphql";

interface ActivePostProps {
  isDrawerHidden: boolean;
  drawerWidth: number;
}

const ActivePost = ({ isDrawerHidden, drawerWidth }: ActivePostProps) => {
  const { viewer } = useLazyLoadQuery<ActivePostQuery>(ActivePostGraphQL, {});
  const environment = useRelayEnvironment();

  useEffect(() => {
    commitLocalUpdate(environment, (store) => {
      const viewerProxy = store.getRoot().getLinkedRecord("viewer");
      if (viewerProxy) {
        const postId = `client:Note:${Math.random()}`;
        const postProxy = store.create(postId, "ActivePost");
        postProxy.setValue("", "thumbnail");
        postProxy.setValue("", "title");
        postProxy.setValue("", "author");
        viewerProxy.setLinkedRecord(postProxy, "activePost");
      }
    });
  }, [environment]);

  const style = useSpring({
    marginLeft: `${isDrawerHidden ? 58 : drawerWidth}px`,
  });

  console.log("ActivePost viewer: ", viewer);

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
