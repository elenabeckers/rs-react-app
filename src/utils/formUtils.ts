import * as Yup from 'yup';
import { countries } from '../const';
import { Form } from '../store/formSlice';

const MAX_FILE_SIZE = 2 * 1024 * 1024;

const parseValue = (
  key: string,
  value: FormDataEntryValue
): string | boolean => {
  if (key === 'terms') {
    return value === 'on';
  }

  return value ? String(value) : '';
};

export const convertFormDataToFormState = async (
  formData: FormData
): Promise<Form> => {
  const formObject: Record<string, FormDataEntryValue> = Object.fromEntries(
    Array.from(formData.entries())
  );

  return {
    name: parseValue('name', formObject['name']) as string,
    age: parseValue('age', formObject['age']) as string,
    email: parseValue('email', formObject['email']) as string,
    password: parseValue('password', formObject['password']) as string,
    passwordRepeat: parseValue(
      'passwordRepeat',
      formObject['passwordRepeat']
    ) as string,
    gender: parseValue('gender', formObject['gender']) as string,
    picture: await fileToBase64(formObject['picture'] as File),
    terms: parseValue('terms', formObject['terms']) as boolean,
    country: parseValue('country', formObject['country']) as string,
  };
};

export const formValidationSchema = Yup.object().shape({
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

  terms: Yup.boolean().oneOf([true], 'You must accept the terms'),
  picture: Yup.string()
    .transform((value, originalValue) =>
      originalValue.length < 100 ? undefined : value
    )
    .required('You must upload a picture')
    .test('file-type', 'Only PNG and JPEG are allowed', (value) => {
      return (
        value.startsWith('data:image/png') ||
        value.startsWith('data:image/jpeg')
      );
    })
    .test('file-size', 'File size must be less than 2MB', (value) => {
      const byteSize =
        (value.length * 3) / 4 -
        (value.endsWith('==') ? 2 : value.endsWith('=') ? 1 : 0);
      return byteSize <= MAX_FILE_SIZE;
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

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};
