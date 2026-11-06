export type ApiErrorCode =
  | 'UNAUTHENTICATED'
  | 'FORBIDDEN'
  | 'BAD_REQUEST'
  | 'NOT_FOUND'
  | 'RATE_LIMITED'
  | 'INTERNAL_ERROR';

export type ApiErrorResponse = {
  error: string;
  code?: ApiErrorCode;
};

export type ApiSuccessResponse<T> = {
  data: T;
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export function apiError(message: string, code?: ApiErrorCode): ApiErrorResponse {
  return code ? { error: message, code } : { error: message };
}

export function isApiErrorResponse(value: unknown): value is ApiErrorResponse {
  return (
    typeof value === 'object' &&
    value !== null &&
    'error' in value &&
    typeof value.error === 'string'
  );
}
