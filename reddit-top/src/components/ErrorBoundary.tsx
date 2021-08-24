import { cloneElement, Component, ReactElement } from "react";

export interface ErrorBoundaryProps {
  children?: ReactElement;
  fallback?: ReactElement;
}

class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state = { hasError: false, error: null };
  static getDerivedStateFromError = (
    error: ErrorBoundary
  ): Record<string, unknown> => {
    console.log("error: ", error);
    return {
      hasError: true,
      error,
    };
  };

  public render(): ReactElement | null {
    const { hasError, error } = this.state;
    const { fallback, children } = this.props;
    if (hasError && fallback)
      return cloneElement(fallback, { error: true, message: error });
    if (children) return children;
    return null;
  }
}

export default ErrorBoundary;
