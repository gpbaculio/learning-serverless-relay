/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type ActivePostQueryVariables = {};
export type ActivePostQueryResponse = {
    readonly viewer: {
        readonly id: string;
        readonly activePost: {
            readonly thumbnail: string | null;
            readonly title: string | null;
            readonly author: string | null;
        } | null;
    } | null;
};
export type ActivePostQuery = {
    readonly response: ActivePostQueryResponse;
    readonly variables: ActivePostQueryVariables;
};



/*
query ActivePostQuery {
  viewer {
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
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
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "kind": "ClientExtension",
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ActivePost",
            "kind": "LinkedField",
            "name": "activePost",
            "plural": false,
            "selections": [
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
                "name": "title",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "author",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ]
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ActivePostQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ActivePostQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "9c785db85384cadcbccdc288ba3ea33a",
    "id": null,
    "metadata": {},
    "name": "ActivePostQuery",
    "operationKind": "query",
    "text": "query ActivePostQuery {\n  viewer {\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '5b7b9ae599cc6f024d8e27596cae2405';
export default node;
