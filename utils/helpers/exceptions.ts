class HttpError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = "HttpError";
  }
}

export const throwExceptions = async (res: Response) => {
  let errorMessage: any;

  const { message } = await res.json();

  if (typeof message === "object") {
    errorMessage = message[0];
  } else {
    errorMessage = message;
  }

  switch (res.status) {
    case 400:
      throw new HttpError(errorMessage || "Invalid request.", 400);
    case 401:
      throw new HttpError(errorMessage || "Unauthorized: Please log in.", 401);
    case 403:
      throw new HttpError(errorMessage || "Access forbidden.", 403);
    case 404:
      throw new HttpError(errorMessage || "Resource not found.", 404);
    case 405:
      throw new HttpError(errorMessage || "Method not allowed.", 405);
    case 408:
      throw new HttpError(errorMessage || "Request timeout.", 408);
    case 500:
      throw new HttpError(errorMessage || "Server error.", 500);
    case 502:
      throw new HttpError(errorMessage || "Bad gateway.", 502);
    case 503:
      throw new HttpError(errorMessage || "Service unavailable.", 503);
    case 504:
      throw new HttpError(errorMessage || "Gateway timeout.", 504);
    default:
      if (res.status >= 400 && res.status < 500) {
        throw new HttpError(errorMessage || "Invalid request.", res.status);
      } else if (res.status >= 500 && res.status < 600) {
        throw new HttpError(
          errorMessage || "Something went wrong on the server",
          res.status,
        );
      } else {
        throw new HttpError("Unexpected error.", res.status);
      }
  }
};
