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
      throw new Error(errorMessage || "Invalid request.");
    case 401:
      throw new Error(errorMessage || "Unauthorized: Please log in.");
    case 403:
      throw new Error(errorMessage || "Access forbidden.");
    case 404:
      throw new Error(errorMessage || "Resource not found.");
    case 405:
      throw new Error(errorMessage || "Method not allowed.");
    case 408:
      throw new Error(errorMessage || "Request timeout.");
    case 500:
      throw new Error(errorMessage || "Server error.");
    case 502:
      throw new Error(errorMessage || "Bad gateway.");
    case 503:
      throw new Error(errorMessage || "Service unavailable.");
    case 504:
      throw new Error(errorMessage || "Gateway timeout.");
    default:
      if (res.status >= 400 && res.status < 500) {
        throw new Error(errorMessage || "Invalid request.");
      } else if (res.status >= 500 && res.status < 600) {
        throw new Error(errorMessage || "Something went wrong on the server");
      } else {
        throw new Error("Unexpected error.");
      }
  }
};
