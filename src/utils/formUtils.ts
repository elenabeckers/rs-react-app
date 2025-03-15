import * as Yup from 'yup';
import { countries, MAX_FILE_SIZE } from '../const';
import { FormTypeDTO, FormType } from '../types/form';

export const formDataToFormTypeDTO = async (
  formData: FormData
): Promise<FormTypeDTO> => {
  const formObject: Record<string, FormDataEntryValue> = Object.fromEntries(
    Array.from(formData.entries())
  );

  return {
    name: formObject['name'] as string,
    age: Number(formObject['age']),
    email: formObject['email'] as string,
    password: formObject['password'] as string,
    passwordRepeat: formObject['passwordRepeat'] as string,
    gender: formObject['gender'] as string,
    picture: await fileToBase64(formObject['picture'] as File),
    terms: formObject['terms'] === 'on',
    country: formObject['country'] as string,
  };
};

export const formValidationSchema: Yup.ObjectSchema<FormType> =
  Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .test('first-uppercase', 'First letter must be uppercase', (value) => {
        return value.charAt(0) === value.charAt(0).toUpperCase();
      }),

    age: Yup.number()
      .transform((value, originalValue) =>
        originalValue === '' ? undefined : value
      )
      .required('Age is required')
      .positive('Age must be a positive number')
      .integer('Age must be an integer')
      .typeError('Age must be a number'),

    email: Yup.string()
      .required('Email is required')
      .email('Invalid email address'),

    password: Yup.string()
      .transform((value, originalValue) =>
        originalValue === '' ? undefined : value
      )
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[\W_]/, 'Password must contain at least one special character'),

    passwordRepeat: Yup.string()
      .required('Password repeat is required')
      .oneOf([Yup.ref('password'), ''], 'Passwords must match'),

    gender: Yup.string()
      .transform((value, originalValue) =>
        originalValue === '' ? undefined : value
      )
      .required('Gender is required')
      .oneOf(
        ['male', 'female', 'other'],
        'Gender must be male, female, or other'
      ),

    terms: Yup.boolean()
      .transform((_, originalValue) => {
        return originalValue === 'on' || originalValue ? true : false;
      })
      .required('Terms are required')
      .oneOf([true], 'You must accept the Terms and Conditions agreement'),

    picture: Yup.mixed<FileList | File>()
      .transform((value) => {
        if (value instanceof FileList) {
          return value.length > 0 ? value[0] : null;
        }

        if (value instanceof File) {
          return value.name ? value : null;
        }

        return null;
      })
      .required('Picture is required')
      .test('file-type', 'Only PNG and JPEG are allowed', (value) => {
        return Boolean(
          (value as File).type === 'image/png' ||
            (value as File).type === 'image/jpeg'
        );
      })
      .test('file-size', 'File size must be less than 2MB', (value) => {
        return Boolean((value as File).size <= MAX_FILE_SIZE);
      }),

    country: Yup.string()
      .transform((value, originalValue) =>
        originalValue === '' ? undefined : value
      )
      .required('Country is required')
      .oneOf(countries, 'You must choose the country from the list'),
  });

export const validationErrorsToObject = (
  errors: Yup.ValidationError
): Record<string, string> => {
  const validationErrors: Record<string, string> = {};

  errors.inner.forEach((error: Yup.ValidationError) => {
    if (error.path) {
      validationErrors[error.path] = error.message;
    }
  });

  return validationErrors;
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

const fileFromFileList = (value: File | FileList): File => {
  if (value instanceof FileList) {
    return value[0];
  }
  return value;
};

export const formTypeToFormTypeDTO = async (
  form: FormType
): Promise<FormTypeDTO> => {
  const picture = fileFromFileList(form.picture);

  return {
    ...form,
    picture: await fileToBase64(picture),
  };
};
