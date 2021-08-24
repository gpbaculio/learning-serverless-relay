/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type AppGraphQLQueryVariables = {};
export type AppGraphQLQueryResponse = {
    readonly viewer: string | null;
};
export type AppGraphQLQuery = {
    readonly response: AppGraphQLQueryResponse;
    readonly variables: AppGraphQLQueryVariables;
};



/*
query AppGraphQLQuery {
  viewer
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "viewer",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AppGraphQLQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AppGraphQLQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "859e1fe4295fcc1e0bdd4ebbaa32a0d7",
    "id": null,
    "metadata": {},
    "name": "AppGraphQLQuery",
    "operationKind": "query",
    "text": "query AppGraphQLQuery {\n  viewer\n}\n"
  }
};
})();
(node as any).hash = '369000d607f725a487b81e90f97548d6';
export default node;
