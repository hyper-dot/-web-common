interface FormDataObject {
  [key: string]: string | File;
}

/**
  Converts FormData object to a plain JavaScript object.
 */
export function formDataToObject(formData: FormData): FormDataObject {
  const object: FormDataObject = {};
  formData.forEach((value: string | File, key: string) => {
    object[key] = value;
  });
  return object;
}

/**
  Extracts File objects from FormData and returns them in an array.
 */
export function formDataToArray(formData: FormData) {
  const fileArray: File[] = [];
  formData.forEach((value) => {
    if (value instanceof File) {
      fileArray.push(value);
    }
  });
  return fileArray;
}
