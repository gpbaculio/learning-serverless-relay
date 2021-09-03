import { useLazyLoadQuery } from "react-relay";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";
import graphql from "babel-plugin-relay/macro";

import { drawerWidth } from "./App";
import { ActivePostQuery } from "./__generated__/ActivePostQuery.graphql";

interface ActivePostProps {
  isDrawerHidden: boolean;
}

const ActivePost = ({ isDrawerHidden }: ActivePostProps) => {
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
  const { viewer } = useLazyLoadQuery<ActivePostQuery>(ActivePostGraphQL, {});

  const style = useSpring({
    marginLeft: `${isDrawerHidden ? 58 : drawerWidth}px`,
  });

  return (
    <Container style={style}>
      {viewer && viewer.activePost && (
        <>
          <Author>{viewer.activePost.author}</Author>
          <Thumbnail src={viewer.activePost.thumbnail as string} />
          <Title>{viewer.activePost.title}</Title>
        </>
      )}
    </Container>
  );
};

export default ActivePost;

const Author = styled.h1`
  font-size: 24px;
  font-weight: 600;
  align-self: flex-start;
`;

const Thumbnail = styled.img`
  object-fit: cover;
  width: 200px;
  height: auto;
`;

const Title = styled.h2`
  font-size: 16px;
  font-weight: 600;
  align-self: flex-start;
`;

const Container = styled(animated.div)`
  display: flex;
  width: 100%;
  flex: 1;
  padding-left: 16px;
  padding-right: 16px;
  flex-direction: column;
  align-items: center;
`;
