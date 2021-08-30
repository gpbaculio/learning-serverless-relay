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
    }
  ],
  "type": "List",
  "abstractKey": null
};
(node as any).hash = 'f1882fa93de0f3be783cb53ff374e58e';
export default node;
