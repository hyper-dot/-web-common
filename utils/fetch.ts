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
   * @param {TRequest} request - The request object.
   * @returns {Promise<any>} The response data.
   */
  public async get(request: TRequest): Promise<any> {
    const { token, endpoint, origin } = request;
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
   * @param {TRequest} request - The request object.
   * @returns {Promise<any>} The response data.
   */
  public async post(request: TRequest): Promise<any> {
    const { payload, endpoint, token, origin } = request;
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
   * @param {TRequest} request - The request object.
   * @returns {Promise<any>} The response data.
   */
  public async patch(request: TRequest): Promise<any> {
    const { payload, token, endpoint, origin } = request;
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
   * @param {TRequest} request - The request object.
   * @returns {Promise<void>} A promise that resolves when the request is successful.
   */
  public async delete(request: TRequest): Promise<void> {
    const { token, endpoint, origin } = request;
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
