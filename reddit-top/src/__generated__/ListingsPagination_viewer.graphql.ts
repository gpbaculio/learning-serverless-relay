/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import ListingsPaginationQuery from "./ListingsPaginationQuery.graphql";
import { FragmentRefs } from "relay-runtime";
export type ListingsPagination_viewer = {
    readonly listings: {
        readonly pageInfo: {
            readonly startCursor: string | null;
            readonly endCursor: string | null;
            readonly hasNextPage: boolean;
            readonly hasPreviousPage: boolean;
        };
        readonly edges: ReadonlyArray<{
            readonly cursor: string;
            readonly node: {
                readonly id: string;
                readonly " $fragmentRefs": FragmentRefs<"ListingFragmentGraphQL_listing">;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "ListingsPagination_viewer";
};
export type ListingsPagination_viewer$data = ListingsPagination_viewer;
export type ListingsPagination_viewer$key = {
    readonly " $data"?: ListingsPagination_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"ListingsPagination_viewer">;
};



const node: ReaderFragment = (function(){
var v0 = [
  "listings"
];
return {
  "argumentDefinitions": [
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
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "count",
        "cursor": "cursor",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "count",
          "cursor": "cursor"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [
        "viewer"
      ],
      "operation": ListingsPaginationQuery
    }
  },
  "name": "ListingsPagination_viewer",
  "selections": [
    {
      "alias": "listings",
      "args": [
        {
          "kind": "Variable",
          "name": "id",
          "variableName": "id"
        }
      ],
      "concreteType": "ListingConnection",
      "kind": "LinkedField",
      "name": "__ListingsPagination_viewer_listings_connection",
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
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "id",
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
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ListingFragmentGraphQL_listing"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
})();
(node as any).hash = '2872500cd646d1ef0ed8326106ab133e';
export default node;
