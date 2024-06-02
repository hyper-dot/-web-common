import { throwExceptions } from "./exceptions";

/**
 * The URL of the backend server obtained from environment variables.
 */
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

/**
 * Type definition for request parameters.
 */
export type TRequest = {
  /** The endpoint to which the request is made. */
  endpoint: string;
  /** Optional token for authorization. */
  token?: string;
  /** Optional payload to send with the request. */
  payload?: any;
  /** If set to true, the request will be sent to the origin instead of another server. */
  origin?: boolean;
};

/**
 * Performs a GET request to the backend server.
 * @param {TRequest} options - The request options.
 * @returns {Promise<any>} The response data.
 */
export const getRequest = async ({
  endpoint,
  token,
}: TRequest): Promise<any> => {
  const res = await fetch(`${BACKEND_URL}${endpoint}`, {
    headers: { Authorization: `bearer ${token}` },
  });
  if (!res.ok) return throwExceptions(res);
  const data = await res.json();
  return data;
};

/**
 * Performs a POST request to the backend server.
 * @param {TRequest} options - The request options.
 * @returns {Promise<any>} The response data.
 */
export const postRequest = async ({
  endpoint,
  token,
  payload,
  origin,
}: TRequest): Promise<any> => {
  const isFormData = payload instanceof FormData;
  const headers: { [key: string]: string } = {
    Authorization: `Bearer ${token}`,
  };
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }
  const url = origin ? endpoint : `${BACKEND_URL}${endpoint}`;
  const res = await fetch(url, {
    method: "POST",
    body: isFormData ? payload : JSON.stringify(payload),
    headers,
  });
  if (!res.ok) {
    return throwExceptions(res);
  }
  try {
    const text = await res.text();
    return text ? JSON.parse(text) : {};
  } catch (err) {
    console.log(err);
    return;
  }
};

/**
 * Performs a PATCH request to the backend server.
 * @param {TRequest} options - The request options.
 * @returns {Promise<any>} The response data.
 */
export const patchRequest = async ({
  endpoint,
  token,
  payload,
}: TRequest): Promise<any> => {
  const isFormData = payload instanceof FormData;
  const headers: { [key: string]: string } = {
    Authorization: `Bearer ${token}`,
  };
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }
  const res = await fetch(`${BACKEND_URL}${endpoint}`, {
    method: "PATCH",
    body: isFormData ? payload : JSON.stringify(payload),
    headers,
  });
  if (!res.ok) return throwExceptions(res);
  try {
    const text = await res.text();
    return text ? JSON.parse(text) : {};
  } catch (err) {
    console.log(err);
    return;
  }
};

/**
 * Performs a DELETE request to the backend server.
 * @param {TRequest} options - The request options.
 * @returns {Promise<void>} A promise that resolves when the request is successful.
 */
export const deleteRequest = async ({
  token,
  endpoint,
}: TRequest): Promise<void> => {
  const res = await fetch(`${BACKEND_URL}${endpoint}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
  });
  if (!res.ok) return throwExceptions(res);
  return;
};
