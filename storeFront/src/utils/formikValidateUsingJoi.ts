// import Joi from "joi";
// import { JoiErrorsType } from "./types";
// import { FormikErrors } from "formik";

// export function formikValidateUsingJoi(formValidationSchema: Joi.ObjectSchema) {
//   return function validate(
//     values: Joi.ObjectSchema
//   ): FormikErrors<JoiErrorsType | null> {
//     const schema = Joi.object(formValidationSchema);

//     const { error } = schema.validate(values, { abortEarly: false });

//     if (!error) {
//       return null;
//     }

//     const errors: FormikErrors<JoiErrorsType> = {};
//     for (const detail of error.details) {
//       const errorKey = detail.path[0];
//       errors[errorKey] = detail.message;
//     }
//     return errors;
//   };
// }

// export default formikValidateUsingJoi;

import Joi from "joi";
import { FormikErrors } from "formik";

// Define the type for the Joi validation schema
export interface JoiValidationSchema {
  [key: string]: Joi.Schema;
}

// Define a mapped type for the errors returned by Joi validation
type MappedJoiFormikErrors<T> = {
  [K in keyof T]?: string;
};

// Define the type for the errors returned by Joi validation
export type JoiFormikErrors<T> = FormikErrors<MappedJoiFormikErrors<T>>;

// Modify the function to include the generic type for the schema
export function formikValidateUsingJoi<T>(
  formValidationSchema: JoiValidationSchema
) {
  return function validate(values: T): JoiFormikErrors<T> {
    const schema = Joi.object(formValidationSchema);

    const { error } = schema.validate(values, { abortEarly: false });

    if (!error) {
      return {} as JoiFormikErrors<T>;
    }

    const errors: MappedJoiFormikErrors<T> = {};

    for (const detail of error.details) {
      const errorKey = detail.path[0] as keyof T;
      if (errorKey) {
        errors[errorKey] = detail.message;
      }
    }

    return errors as JoiFormikErrors<T>;
  };
}

export default formikValidateUsingJoi;
