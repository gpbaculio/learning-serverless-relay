import { useState } from "react";
import { graphql, useFragment } from "react-relay";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";

import { ListingFragmentGraphQL_listing$key } from "../../__generated__/ListingFragmentGraphQL_listing.graphql";

interface ListProps {
  listing: ListingFragmentGraphQL_listing$key;
}

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
      {node.author}
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
