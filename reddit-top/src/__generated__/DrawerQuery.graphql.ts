/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type DrawerQueryVariables = {
    id?: string | null;
};
export type DrawerQueryResponse = {
    readonly viewer: {
        readonly user: string;
        readonly id: string;
        readonly " $fragmentRefs": FragmentRefs<"ListingsPagination_viewer">;
    } | null;
};
export type DrawerQuery = {
    readonly response: DrawerQueryResponse;
    readonly variables: DrawerQueryVariables;
};



/*
query DrawerQuery(
  $id: String
) {
  viewer {
    user
    id
    ...ListingsPagination_viewer_1Bmzm5
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

fragment ListingsPagination_viewer_1Bmzm5 on Viewer {
  listings(first: 7, id: $id) {
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
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "user",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "kind": "Variable",
  "name": "id",
  "variableName": "id"
},
v4 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 7
  },
  (v3/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "DrawerQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "args": [
              (v3/*: any*/)
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
    "name": "DrawerQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "alias": null,
            "args": (v4/*: any*/),
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
                      (v2/*: any*/),
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
            "args": (v4/*: any*/),
            "filters": [
              "id"
            ],
            "handle": "connection",
            "key": "ListingsPagination_viewer_listings",
            "kind": "LinkedHandle",
            "name": "listings"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "23e2e21b7bffce2028f6b7d373d08b77",
    "id": null,
    "metadata": {},
    "name": "DrawerQuery",
    "operationKind": "query",
    "text": "query DrawerQuery(\n  $id: String\n) {\n  viewer {\n    user\n    id\n    ...ListingsPagination_viewer_1Bmzm5\n  }\n}\n\nfragment ListingFragmentGraphQL_listing on List {\n  id\n  title\n  created\n  num_comments\n  thumbnail\n  author\n  name\n}\n\nfragment ListingsPagination_viewer_1Bmzm5 on Viewer {\n  listings(first: 7, id: $id) {\n    pageInfo {\n      startCursor\n      endCursor\n      hasNextPage\n      hasPreviousPage\n    }\n    edges {\n      cursor\n      node {\n        id\n        ...ListingFragmentGraphQL_listing\n        __typename\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '2c30d2fd89fe84e207a8b06bdac063eb';
export default node;
