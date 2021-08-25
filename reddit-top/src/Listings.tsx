import { usePaginationFragment } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { animated, useSpring } from "react-spring";
import { useState } from "react";
import styled from "styled-components";

import { ListingsPaginationQuery } from "./__generated__/ListingsPaginationQuery.graphql";
import { ListingsPagination_viewer$key } from "./__generated__/ListingsPagination_viewer.graphql";

interface ListingsProps {
  viewer: ListingsPagination_viewer$key;
}

const Listings = ({ viewer }: ListingsProps) => {
  const { data, hasNext, loadNext, isLoadingNext, refetch } =
    usePaginationFragment<
      ListingsPaginationQuery,
      ListingsPagination_viewer$key
    >(ListingsGraphQL, viewer);

  return (
    <>
      <ul>
        {data?.listings &&
          data?.listings.edges?.map((d, i) => (
            <List key={`${i}:${d?.node?.author}`} author={d?.node?.author} />
          ))}
      </ul>
      {hasNext && (
        <button
          disabled={isLoadingNext}
          onClick={() => {
            loadNext(20);
          }}>
          loadNext
        </button>
      )}
    </>
  );
};

export default Listings;

interface ListProps {
  author: string | null | undefined;
}

const List = ({ author }: ListProps) => {
  const [hide, setHide] = useState(false);

  const styles = useSpring({
    height: `${hide ? 0 : 20}px`,
    opacity: hide ? 0 : 1,
    width: hide ? `0px` : "100%",
    fontSize: `${hide ? 0 : 18}px`,
    transform: `translateX(${hide ? -100 : 0}px)`,
    backgroundColor: hide ? `transparent` : "green",
    config: {
      duration: 500,
    },
  });

  return (
    <StyledAnimatedLi
      style={styles}
      onClick={() => {
        setHide(true);
      }}>
      {author}
    </StyledAnimatedLi>
  );
};

const StyledAnimatedLi = styled(animated.li)`
  cursor: pointer;
`;

const ListingsGraphQL = graphql`
  fragment ListingsPagination_viewer on Viewer
  @argumentDefinitions(
    id: { type: "String", defaultValue: null }
    count: { type: "Int", defaultValue: 7 }
    cursor: { type: "String", defaultValue: null }
  )
  @refetchable(queryName: "ListingsPaginationQuery") {
    listings(first: $count, after: $cursor, id: $id)
      @connection(key: "ListingsPagination_viewer_listings") {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        node {
          id
          title
          created
          num_comments
          thumbnail
          author
          name
        }
      }
    }
  }
`;
