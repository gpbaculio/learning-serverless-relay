import { usePaginationFragment } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";

import { ListingsPaginationQuery } from "./__generated__/ListingsPaginationQuery.graphql";
import { ListingsPagination_viewer$key } from "./__generated__/ListingsPagination_viewer.graphql";

interface ListingsProps {
  viewer: ListingsPagination_viewer$key;
}

const Listings = ({ viewer }: ListingsProps) => {
  const { data, hasNext, loadNext, isLoadingNext } = usePaginationFragment<
    ListingsPaginationQuery,
    ListingsPagination_viewer$key
  >(ListingsGraphQL, viewer);

  return (
    <ul>
      {data?.listings &&
        data?.listings.edges?.map((d) => (
          <li key={d?.node?.author}>{d?.node?.author}</li>
        ))}
    </ul>
  );
};

export default Listings;

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
          title
          created
          num_comments
          thumbnail
          author
        }
      }
    }
  }
`;
