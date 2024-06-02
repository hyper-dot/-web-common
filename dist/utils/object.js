"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeEmptyFields = void 0;
/**
 * Removes empty fields (null, undefined, or empty string) from a given object recursively.
 */
function removeEmptyFields(obj) {
    for (var key in obj) {
        if (obj[key] === "" || !obj[key]) {
            delete obj[key];
        }
        else if (Array.isArray(obj[key])) {
            obj[key] = obj[key].filter(function (item) { return item !== ""; });
        }
        else if (typeof obj[key] === "object" && obj[key] !== null) {
            removeEmptyFields(obj[key]);
        }
    }
    return obj;
}
exports.removeEmptyFields = removeEmptyFields;
