"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwExceptions = void 0;
var HttpError = /** @class */ (function (_super) {
    __extends(HttpError, _super);
    function HttpError(message, statusCode) {
        var _this = _super.call(this, message) || this;
        _this.statusCode = statusCode;
        _this.name = "HttpError";
        return _this;
    }
    return HttpError;
}(Error));
var throwExceptions = function (res) { return __awaiter(void 0, void 0, void 0, function () {
    var errorMessage, message;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, res.json()];
            case 1:
                message = (_a.sent()).message;
                if (typeof message === "object") {
                    errorMessage = message[0];
                }
                else {
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
                        }
                        else if (res.status >= 500 && res.status < 600) {
                            throw new HttpError(errorMessage || "Something went wrong on the server", res.status);
                        }
                        else {
                            throw new HttpError("Unexpected error.", res.status);
                        }
                }
                return [2 /*return*/];
        }
    });
}); };
exports.throwExceptions = throwExceptions;
