export interface FormType {
  name: string;
  age: number;
  email: string;
  password: string;
  passwordRepeat: string;
  gender: string;
  terms: boolean;
  picture: FileList | File;
  country: string;
}

export type FormTypeDTO = Omit<FormType, 'picture'> & { picture: string };

export type ValidationErrors = Partial<Record<keyof FormType, string>>;
