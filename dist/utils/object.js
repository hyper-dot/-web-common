"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeEmptyFields = void 0;
/**
 * Removes empty fields (null, undefined, or empty string) from a given object recursively.
 */
function removeEmptyFields(obj) {
    var cleanedObject = {};
    for (var _i = 0, _a = Object.entries(obj); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        // Check for falsy values (null, undefined, empty string) except numbers and booleans
        if ((value === "" || !value) &&
            typeof value !== "number" &&
            typeof value !== "boolean") {
            continue; // Skip this property
        }
        // Recursively handle nested objects (if applicable)
        if (typeof value === "object" && value !== null) {
            cleanedObject[key] = removeEmptyFields(value);
        }
        else {
            // Include non-empty values (including numbers and booleans)
            cleanedObject[key] = value;
        }
    }
    return cleanedObject;
}
exports.removeEmptyFields = removeEmptyFields;
