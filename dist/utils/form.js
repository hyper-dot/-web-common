"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formDataToArray = exports.formDataToObject = void 0;
/**
  Converts FormData object to a plain JavaScript object.
 */
function formDataToObject(formData) {
    var object = {};
    formData.forEach(function (value, key) {
        object[key] = value;
    });
    return object;
}
exports.formDataToObject = formDataToObject;
/**
  Extracts File objects from FormData and returns them in an array.
 */
function formDataToArray(formData) {
    var fileArray = [];
    formData.forEach(function (value) {
        if (value instanceof File) {
            fileArray.push(value);
        }
    });
    return fileArray;
}
exports.formDataToArray = formDataToArray;
