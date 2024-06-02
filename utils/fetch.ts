import { throwExceptions } from "./helpers/exceptions";

type TRequest = {
  endpoint: string;
  token?: string;
  payload?: any;
  origin?: boolean;
};

/**
 * A class for handling HTTP requests.
 */
export class RequestHandler {
  /**
   * The URL of the backend server.
   */
  private backendUrl: string;

  /**
   * Constructs a new RequestHandler instance.
   * @param {string} backendUrl - The URL of the backend server.
   */
  constructor(backendUrl: string) {
    this.backendUrl = backendUrl;
  }

  /**
   * Performs a GET request to the specified endpoint.
   * @param {string} endpoint - The endpoint to which the request is made.
   * @param {string} [token] - Optional token for authorization.
   * @returns {Promise<any>} The response data.
   */
  public async get({ token, endpoint, origin }: TRequest): Promise<any> {
    const url = origin ? endpoint : `${this.backendUrl}${endpoint}`;
    const res = await fetch(url, {
      headers: { Authorization: `bearer ${token}` },
    });
    if (!res.ok) return throwExceptions(res);
    const data = await res.json();
    return data;
  }

  /**
   * Performs a POST request to the specified endpoint.
   * @param {string} endpoint - The endpoint to which the request is made.
   * @param {string} [token] - Optional token for authorization.
   * @param {any} [payload] - Optional payload to send with the request.
   * @param {boolean} [origin] - If set to true, the request will be sent to the origin instead of another server.
   * @returns {Promise<any>} The response data.
   */
  public async post({
    payload,
    endpoint,
    token,
    origin,
  }: TRequest): Promise<any> {
    const isFormData = payload instanceof FormData;
    const headers: { [key: string]: string } = {
      Authorization: `Bearer ${token}`,
    };
    if (!isFormData) {
      headers["Content-Type"] = "application/json";
    }
    const url = origin ? endpoint : `${this.backendUrl}${endpoint}`;
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
  }

  /**
   * Performs a PATCH request to the specified endpoint.
   * @param {string} endpoint - The endpoint to which the request is made.
   * @param {string} [token] - Optional token for authorization.
   * @param {any} [payload] - Optional payload to send with the request.
   * @returns {Promise<any>} The response data.
   */
  public async patch({ payload, token, endpoint }: TRequest): Promise<any> {
    const isFormData = payload instanceof FormData;
    const url = origin ? endpoint : `${this.backendUrl}${endpoint}`;
    const headers: { [key: string]: string } = {
      Authorization: `Bearer ${token}`,
    };
    if (!isFormData) {
      headers["Content-Type"] = "application/json";
    }
    const res = await fetch(url, {
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
  }

  /**
   * Performs a DELETE request to the specified endpoint.
   * @param {string} endpoint - The endpoint to which the request is made.
   * @param {string} [token] - Optional token for authorization.
   * @returns {Promise<void>} A promise that resolves when the request is successful.
   */
  public async delete({ token, endpoint }: TRequest): Promise<void> {
    const url = origin ? endpoint : `${this.backendUrl}${endpoint}`;
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    });
    if (!res.ok) return throwExceptions(res);
    return;
  }
}
