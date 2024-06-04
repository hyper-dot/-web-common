/**
 * Removes empty fields (null, undefined, or empty string) from a given object recursively.
 */
export function removeEmptyFields(
  obj: Record<string, any>,
): Record<string, any> {
  const cleanedObject: any = {};

  for (const [key, value] of Object.entries(obj)) {
    // Check for falsy values (null, undefined, empty string) except numbers and booleans
    if (
      (value === "" || !value) &&
      typeof value !== "number" &&
      typeof value !== "boolean"
    ) {
      continue; // Skip this property
    }

    // Recursively handle nested objects (if applicable)
    if (typeof value === "object" && value !== null) {
      cleanedObject[key] = removeEmptyFields(value);
    } else {
      // Include non-empty values (including numbers and booleans)
      cleanedObject[key] = value;
    }
  }

  return cleanedObject;
}
