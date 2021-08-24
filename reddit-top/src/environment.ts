import {
  Environment,
  Network,
  RecordSource,
  RequestParameters,
  Store,
  UploadableMap,
  Variables,
  CacheConfig,
  GraphQLResponse,
} from "relay-runtime";

const GRAPHQL_URL = `http://localhost:3001/graphql`;

const getRequestBodyWithUploadables = (
  _request: RequestParameters,
  _variables: Variables,
  uploadables: UploadableMap
) => {
  const formData = new FormData();
  Object.keys(uploadables).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(uploadables, key)) {
      formData.append(key, uploadables[key]);
    }
  });
  return formData;
};

const getRequestBodyWithoutUplodables = (
  request: RequestParameters,
  variables: Variables
) =>
  JSON.stringify({
    query: request.text,
    variables,
  });

const getRequestBody = (
  request: RequestParameters,
  variables: Variables,
  uploadables: UploadableMap | null | undefined
) => {
  if (uploadables)
    return getRequestBodyWithUploadables(request, variables, uploadables);

  return getRequestBodyWithoutUplodables(request, variables);
};

enum operationKind {
  MUTATION = "mutation",
  QUERY = "query",
}

const fetchGraphQL = async (
  request: RequestParameters,
  variables: Variables,
  _cacheConfig: CacheConfig,
  uploadables?: UploadableMap | null | undefined
): Promise<GraphQLResponse> => {
  const body = getRequestBody(request, variables, uploadables);

  const headers = {
    ...(uploadables
      ? { Accept: "*/*" }
      : { Accept: "application/json", "Content-type": "application/json" }),
  };

  const response = await fetch(GRAPHQL_URL, {
    method: "POST",
    credentials: "same-origin",
    headers,
    body,
  });

  const result = await response.json();

  if (process.env.NODE_ENV === "development") {
    if (Array.isArray(result.errors)) {
      console.log(`Error requestName: ${request.name}`);
      console.log(`Error variables: ${JSON.stringify(variables)}`);
      console.log(`Error resultErrors: ${JSON.stringify(result.errors)}`);
    }

    if (request.operationKind === operationKind.MUTATION) {
      console.log(`MUTATION requestName: ${request.name}`);
      console.log(`MUTATION variables: ${JSON.stringify(variables)}`);
      console.log(`MUTATION result: ${JSON.stringify(result)}`);
    }

    if (request.operationKind === operationKind.QUERY) {
      console.log(`QUERY requestName: ${request.name}`);
      console.log(`QUERY variables: ${JSON.stringify(variables)}`);
      console.log(`QUERY result: ${JSON.stringify(result)}`);
    }
  }

  return result;
};

const network = Network.create(fetchGraphQL);

const store = new Store(new RecordSource(), {
  gcReleaseBufferSize: 1,
});

export default new Environment({ network, store });
