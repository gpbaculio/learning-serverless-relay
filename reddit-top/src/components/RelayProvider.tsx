import { ReactNode, Suspense } from "react";
import { RelayEnvironmentProvider } from "react-relay";
import { Environment } from "relay-runtime";
import { RelayMockEnvironment } from "relay-test-utils";

import Error from "./Error";
import ErrorBoundary from "./ErrorBoundary";
import Loading from "./Loading";

interface RelayProviderProps {
  children: ReactNode;
  environment: Environment | RelayMockEnvironment;
}

const RelayProvider = ({ environment, children }: RelayProviderProps) => (
  <RelayEnvironmentProvider environment={environment}>
    <ErrorBoundary fallback={<Error />}>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </ErrorBoundary>
  </RelayEnvironmentProvider>
);
export default RelayProvider;
