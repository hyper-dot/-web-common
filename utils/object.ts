/**
 * Removes empty fields (null, undefined, or empty string) from a given object recursively.
 */
export function removeEmptyFields(
  obj: Record<string, any>,
): Record<string, any> {
  for (let key in obj) {
    if (obj[key] === "" || !obj[key]) {
      delete obj[key];
    } else if (Array.isArray(obj[key])) {
      obj[key] = obj[key].filter((item: any) => item !== "");
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      removeEmptyFields(obj[key]);
    }
  }
  return obj;
}
