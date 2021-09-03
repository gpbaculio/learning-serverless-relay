/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ListingFragmentGraphQL_listing = {
    readonly id: string;
    readonly title: string | null;
    readonly created: number | null;
    readonly num_comments: number | null;
    readonly thumbnail: string | null;
    readonly author: string | null;
    readonly name: string | null;
    readonly isDismissed: boolean | null;
    readonly isRead: boolean | null;
    readonly " $refType": "ListingFragmentGraphQL_listing";
};
export type ListingFragmentGraphQL_listing$data = ListingFragmentGraphQL_listing;
export type ListingFragmentGraphQL_listing$key = {
    readonly " $data"?: ListingFragmentGraphQL_listing$data;
    readonly " $fragmentRefs": FragmentRefs<"ListingFragmentGraphQL_listing">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ListingFragmentGraphQL_listing",
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
  "type": "List",
  "abstractKey": null
};
(node as any).hash = '9d0ffde6a2e684d2bf33ce87fffc656a';
export default node;
