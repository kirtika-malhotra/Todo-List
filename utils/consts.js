/**
 * Enum for error codes
 * @readonly
 * @enum {int}
 */
export const ErrorCode = Object.freeze({
  DB_CONN_ERR: 1,
  HTTP_BAD_REQ: 400,
  HTTP_NOT_AUTH: 401,
  HTTP_FORBIDDEN: 403,
  HTTP_NOT_FOUND: 404,
  HTTP_SERVER_ERROR: 500,
});

export const errorWrapper = (message) => ({ errors: { message } });