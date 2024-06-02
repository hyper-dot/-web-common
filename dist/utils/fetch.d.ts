type TRequest = {
    endpoint: string;
    token?: string;
    payload?: any;
    origin?: boolean;
};
/**
 * A class for handling HTTP requests.
 */
export declare class RequestHandler {
    /**
     * The URL of the backend server.
     */
    private backendUrl;
    /**
     * Constructs a new RequestHandler instance.
     * @param {string} backendUrl - The URL of the backend server.
     */
    constructor(backendUrl: string);
    /**
     * Performs a GET request to the specified endpoint.
     * @param {TRequest} request - The request object.
     * @returns {Promise<any>} The response data.
     */
    get(request: TRequest): Promise<any>;
    /**
     * Performs a POST request to the specified endpoint.
     * @param {TRequest} request - The request object.
     * @returns {Promise<any>} The response data.
     */
    post(request: TRequest): Promise<any>;
    /**
     * Performs a PATCH request to the specified endpoint.
     * @param {TRequest} request - The request object.
     * @returns {Promise<any>} The response data.
     */
    patch(request: TRequest): Promise<any>;
    /**
     * Performs a DELETE request to the specified endpoint.
     * @param {TRequest} request - The request object.
     * @returns {Promise<void>} A promise that resolves when the request is successful.
     */
    delete(request: TRequest): Promise<void>;
}
export {};
