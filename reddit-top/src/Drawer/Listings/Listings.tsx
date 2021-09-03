import { useCallback, useEffect, useRef } from "react";
import {
  usePaginationFragment,
  graphql,
  useRelayEnvironment,
  commitLocalUpdate,
} from "react-relay";
import styled from "styled-components";

import Listing from "./Listing";

import { ListingsPaginationQuery } from "../../__generated__/ListingsPaginationQuery.graphql";
import { ListingsPagination_viewer$key } from "../../__generated__/ListingsPagination_viewer.graphql";
import { ListKToUpdate } from "./helpers";
import { StyledH2 } from "../../components/StyledElements";
import { ListingFragmentGraphQL_listing$data } from "../../__generated__/ListingFragmentGraphQL_listing.graphql";

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

  const updateListNode = useCallback(
    (id: string, value: boolean, k: ListKToUpdate | ListKToUpdate[]) => {
      commitLocalUpdate(environment, (store) => {
        const list = store.get<ListingFragmentGraphQL_listing$data>(id);
        if (list) {
          if (typeof k === "string") {
            list.setValue(value, k);
          } else {
            k.forEach((j) => {
              if (typeof list.getValue(j) === "undefined") {
                list.setValue(value, j);
              }
            });
          }
        }
      });
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

  const onDismissAll = useCallback(() => {
    if (data && data.listings && data.listings.edges) {
      const getNode = (id: string) =>
        environment
          .getStore()
          .getSource()
          .get<ListingFragmentGraphQL_listing$data>(id);

      const nodes =
        data &&
        data.listings &&
        data.listings.edges
          .filter((edge) => edge && edge.node && edge.node.id)
          .map((edge) => getNode(edge!.node!.id));

      if (nodes && nodes.length) {
        const isNotDismissedIds = nodes
          .filter((node) => !node!.isDismissed)
          .map((n) => n && n.id);
        if (isNotDismissedIds.length) {
          isNotDismissedIds.forEach((id) => {
            updateListNode(`${id}`, true, "isDismissed");
          });
        }
      }
    }
  }, [data, environment, updateListNode]);

  return (
    <>
      <StyledUl ref={ulRef} data-testid='@test:listings:ul'>
        {data.listings &&
          data.listings.edges &&
          data.listings.edges.map((edge, i) => {
            if (edge && edge.node) {
              updateListNode(edge.node.id, false, ["isDismissed", "isRead"]);
              return (
                <Listing key={`${i}:${edge.node.id}`} listing={edge.node} />
              );
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
      <StyledButton
        data-testid='@test:listings:dismissAllBtn'
        onClick={onDismissAll}>
        Dismiss All
      </StyledButton>
    </>
  );
};

export default Listings;

const StyledButton = styled.button`
  ${({ theme }) => `
    background-color:${theme.background};
    color: ${theme.orange};
  `}
  padding-top: 16px;
  padding-bottom: 16px;
  border: none;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    background-color: #323232;
  }
`;

const StyledUl = styled.ul`
  padding-left: 0;
  margin: 0;
  overflow-y: scroll;
  flex: 1;
`;

const ListingsGraphQL = graphql`
  fragment ListingsPagination_viewer on Viewer
  @argumentDefinitions(
    count: { type: "Int", defaultValue: 7 }
    cursor: { type: "String", defaultValue: null }
  )
  @refetchable(queryName: "ListingsPaginationQuery") {
    listings(first: $count, after: $cursor)
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
