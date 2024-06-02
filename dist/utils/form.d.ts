interface FormDataObject {
    [key: string]: string | File;
}
/**
  Converts FormData object to a plain JavaScript object.
 */
export declare function formDataToObject(formData: FormData): FormDataObject;
/**
  Extracts File objects from FormData and returns them in an array.
 */
export declare function formDataToArray(formData: FormData): File[];
export {};
