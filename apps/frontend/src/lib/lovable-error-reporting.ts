type LovableEvents = {
  captureException?: (
    error: unknown,
    context?: Record<string, unknown>,
    options?: { mechanism: string; handled: boolean; severity: string },
  ) => void;
};

declare global {
  interface Window {
    __lovableEvents?: LovableEvents;
    __lovableReportRuntimeError?: (payload: {
      message: string;
      stack?: string;
      filename?: string;
    }) => void;
  }
}

export function reportLovableError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  window.__lovableEvents?.captureException?.(
    error,
    { source: 'react_error_boundary', route: window.location.pathname, ...context },
    { mechanism: 'react_error_boundary', handled: false, severity: 'error' },
  );
  window.__lovableReportRuntimeError?.({
    message: error instanceof Error ? error.message : String(error),
    ...(error instanceof Error && error.stack ? { stack: error.stack } : {}),
    filename: window.location.pathname,
  });
}
