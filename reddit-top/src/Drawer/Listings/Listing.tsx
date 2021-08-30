import { useState } from "react";
import { graphql, useFragment } from "react-relay";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";

import { ListingFragmentGraphQL_listing$key } from "../../__generated__/ListingFragmentGraphQL_listing.graphql";

import { timeAgo } from "./helpers";

interface ListProps {
  listing: ListingFragmentGraphQL_listing$key;
}

const UnReadCircle = styled.div`
  ${({ theme }) => `background-color:${theme.circle};`}
  width: 10px;
  height: 10px;
  border-radius: 5px;
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: row;
`;

const Author = styled.span`
  ${({ theme }) => `color:${theme.white};`}
  font-size: 18px;
  margin-left: 12px;
  margin-right: 12px;
`;

const Listing = ({ listing }: ListProps) => {
  const [read, setRead] = useState(false);
  const [dismiss, setDimiss] = useState(false);

  const node = useFragment(ListingFragmentGraphQL, listing);

  const style = useSpring({
    height: `${dismiss ? 0 : 20}px`,
    opacity: dismiss ? 0 : 1,
    width: dismiss ? `0px` : "100%",
    fontSize: `${dismiss ? 0 : 18}px`,
    transform: `translateX(${dismiss ? -100 : 0}px)`,
    backgroundColor: dismiss ? `transparent` : "green",
    config: {
      duration: 500,
    },
  });
  console.log("node: ", node);

  return (
    <StyledAnimatedLi
      style={style}
      onClick={() => {
        setDimiss(true);
      }}>
      <TopSection>
        {!read && <UnReadCircle />}
        <Author>{node.author}</Author>
        <span>{timeAgo(new Date((node.created as number) * 1000))}</span>
      </TopSection>
    </StyledAnimatedLi>
  );
};

export default Listing;

const StyledAnimatedLi = styled(animated.li)`
  cursor: pointer;
  list-style: none;
`;

const ListingFragmentGraphQL = graphql`
  fragment ListingFragmentGraphQL_listing on List {
    id
    title
    created
    num_comments
    thumbnail
    author
    name
  }
`;
