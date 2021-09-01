import {
  usePaginationFragment,
  graphql,
  useRelayEnvironment,
} from "react-relay";
import styled from "styled-components";

import Listing from "./Listing";

import { ListingsPaginationQuery } from "../../__generated__/ListingsPaginationQuery.graphql";
import { ListingsPagination_viewer$key } from "../../__generated__/ListingsPagination_viewer.graphql";
import { useCallback, useEffect } from "react";
import { listUpdater } from "./helpers";
import { useRef } from "react";
import { StyledH2 } from "../../components/StyledElements";

interface ListingsProps {
  viewer: ListingsPagination_viewer$key;
}

const Listings = ({ viewer }: ListingsProps) => {
  const ulRef = useRef<HTMLUListElement>(null);
  const environment = useRelayEnvironment();
  const { data, hasNext, loadNext, isLoadingNext } = usePaginationFragment<
    ListingsPaginationQuery,
    ListingsPagination_viewer$key
  >(ListingsGraphQL, viewer);

  const setNodeLocalDefaultValues = useCallback(
    (id: string) => {
      listUpdater(environment, false, ["isDismissed", "isRead"], id);
    },
    [environment]
  );

  useEffect(() => {
    let ulRefValue: HTMLUListElement | null = null;

    const onScroll = () => {
      if (ulRefValue) {
        const isBottom =
          ulRefValue.scrollHeight - ulRefValue.scrollTop ===
          ulRefValue.clientHeight;
        if (isBottom && !isLoadingNext && hasNext) {
          loadNext(7);
        }
      }
    };

    if (ulRef && ulRef.current) {
      ulRefValue = ulRef.current;
      ulRefValue.addEventListener("scroll", onScroll);
    }

    return () => {
      if (ulRefValue) {
        ulRefValue.removeEventListener("scroll", onScroll);
      }
    };
  }, [ulRef, isLoadingNext, hasNext, loadNext]);

  return (
    <StyledUl ref={ulRef} data-testid='@test:listings:ul'>
      {data.listings &&
        data.listings.edges &&
        data.listings.edges.map((edge, i) => {
          if (edge && edge.node) {
            setNodeLocalDefaultValues(edge.node.id);
            return <Listing key={`${i}:${edge.node.id}`} listing={edge.node} />;
          }
          return null;
        })}
      {isLoadingNext && (
        <li>
          <StyledH2 data-testid='@test:listings:isLoadingNext'>
            Loading...
          </StyledH2>
        </li>
      )}
    </StyledUl>
  );
};

export default Listings;

const StyledUl = styled.ul`
  padding: 0;
  margin: 0;
  overflow-y: scroll;
  flex: 1;
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
          ...ListingFragmentGraphQL_listing
        }
      }
    }
  }
`;
