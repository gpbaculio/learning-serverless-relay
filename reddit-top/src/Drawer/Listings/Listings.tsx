import {
  commitLocalUpdate,
  usePaginationFragment,
  graphql,
  useRelayEnvironment,
} from "react-relay";
import styled from "styled-components";

import Listing from "./Listing";

import { ListingsPaginationQuery } from "../../__generated__/ListingsPaginationQuery.graphql";
import { ListingsPagination_viewer$key } from "../../__generated__/ListingsPagination_viewer.graphql";
import { ListingFragmentGraphQL_listing$data } from "../../__generated__/ListingFragmentGraphQL_listing.graphql";
import { useCallback } from "react";

interface ListingsProps {
  viewer: ListingsPagination_viewer$key;
}

const Listings = ({ viewer }: ListingsProps) => {
  const environment = useRelayEnvironment();
  const { data, hasNext, loadNext, isLoadingNext } = usePaginationFragment<
    ListingsPaginationQuery,
    ListingsPagination_viewer$key
  >(ListingsGraphQL, viewer);

  const setNodeLocalDefaultValues = useCallback(
    (id: string) => {
      commitLocalUpdate(environment, (store) => {
        const list = store.get<ListingFragmentGraphQL_listing$data>(id);
        if (list) {
          list.setValue(false, "isDismissed");
          list.setValue(false, "isRead");
        }
      });
    },
    [environment]
  );

  return (
    <>
      <StyledUl>
        {data.listings &&
          data.listings.edges &&
          data.listings.edges.map((edge, i) => {
            if (edge && edge.node) {
              setNodeLocalDefaultValues(edge.node.id);
              return (
                <Listing key={`${i}:${edge.node.id}`} listing={edge.node} />
              );
            }
            return null;
          })}
        {hasNext && (
          <li>
            <button
              disabled={isLoadingNext}
              onClick={() => {
                loadNext(7);
              }}>
              loadNext
            </button>
          </li>
        )}
      </StyledUl>
    </>
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
