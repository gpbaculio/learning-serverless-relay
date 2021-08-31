/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type ListingsPaginationQueryVariables = {
    count?: number | null;
    cursor?: string | null;
    id?: string | null;
};
export type ListingsPaginationQueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"ListingsPagination_viewer">;
    } | null;
};
export type ListingsPaginationQuery = {
    readonly response: ListingsPaginationQueryResponse;
    readonly variables: ListingsPaginationQueryVariables;
};



/*
query ListingsPaginationQuery(
  $count: Int = 7
  $cursor: String
  $id: String
) {
  viewer {
    ...ListingsPagination_viewer_3T5kGn
    id
  }
}

fragment ListingFragmentGraphQL_listing on List {
  id
  title
  created
  num_comments
  thumbnail
  author
  name
}

fragment ListingsPagination_viewer_3T5kGn on Viewer {
  listings(first: $count, after: $cursor, id: $id) {
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
        __typename
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": 7,
    "kind": "LocalArgument",
    "name": "count"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "cursor"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = {
  "kind": "Variable",
  "name": "id",
  "variableName": "id"
},
v2 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "count"
  },
  (v1/*: any*/)
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ListingsPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": [
              {
                "kind": "Variable",
                "name": "count",
                "variableName": "count"
              },
              {
                "kind": "Variable",
                "name": "cursor",
                "variableName": "cursor"
              },
              (v1/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "ListingsPagination_viewer"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ListingsPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "ListingConnection",
            "kind": "LinkedField",
            "name": "listings",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "PageInfo",
                "kind": "LinkedField",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "startCursor",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endCursor",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasNextPage",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasPreviousPage",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ListingEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "cursor",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "List",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "title",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "created",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "num_comments",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "thumbnail",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "author",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "name",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      },
                      {
                        "kind": "ClientExtension",
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isDismissed",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isRead",
                            "storageKey": null
                          }
                        ]
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v2/*: any*/),
            "filters": [
              "id"
            ],
            "handle": "connection",
            "key": "ListingsPagination_viewer_listings",
            "kind": "LinkedHandle",
            "name": "listings"
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a9b6f47bb808c3db5da6c8f122cba1ae",
    "id": null,
    "metadata": {},
    "name": "ListingsPaginationQuery",
    "operationKind": "query",
    "text": "query ListingsPaginationQuery(\n  $count: Int = 7\n  $cursor: String\n  $id: String\n) {\n  viewer {\n    ...ListingsPagination_viewer_3T5kGn\n    id\n  }\n}\n\nfragment ListingFragmentGraphQL_listing on List {\n  id\n  title\n  created\n  num_comments\n  thumbnail\n  author\n  name\n}\n\nfragment ListingsPagination_viewer_3T5kGn on Viewer {\n  listings(first: $count, after: $cursor, id: $id) {\n    pageInfo {\n      startCursor\n      endCursor\n      hasNextPage\n      hasPreviousPage\n    }\n    edges {\n      cursor\n      node {\n        id\n        ...ListingFragmentGraphQL_listing\n        __typename\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '2872500cd646d1ef0ed8326106ab133e';
export default node;
