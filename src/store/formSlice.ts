import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

export type ValidationErrors = Partial<Record<keyof Form, string>>;

export interface Form {
  name: string;
  age: string;
  email: string;
  password: string;
  passwordRepeat: string;
  gender: string;
  terms: boolean;
  picture: string;
  country: string;
}

export interface FormState {
  uncontrolledForm: {
    form: Form;
    errors: ValidationErrors;
    isNewData: boolean;
  };
}

const initialState: FormState = {
  uncontrolledForm: {
    form: {
      name: '',
      age: '',
      email: '',
      password: '',
      passwordRepeat: '',
      gender: '',
      picture: '',
      terms: false,
      country: '',
    },
    errors: {},
    isNewData: false,
  },
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    saveUncontrolledForm: (state, action: PayloadAction<Form>) => {
      state.uncontrolledForm.form = action.payload;
      state.uncontrolledForm.isNewData = true;
    },
    setUncontrolledFromErrors: (
      state,
      action: PayloadAction<ValidationErrors>
    ) => {
      state.uncontrolledForm.errors = action.payload;
    },
    setUncontrolledFromNewData: (state, action: PayloadAction<boolean>) => {
      state.uncontrolledForm.isNewData = action.payload;
    },
  },
});

export const {
  saveUncontrolledForm,
  setUncontrolledFromErrors,
  setUncontrolledFromNewData,
} = formSlice.actions;

export const selectUncontrolledFormData = (state: RootState) =>
  state.form.uncontrolledForm.form;

export const selectUncontrolledFormErrors = (state: RootState) =>
  state.form.uncontrolledForm.errors;

export const selectUncontrolledFormNewData = (state: RootState) =>
  state.form.uncontrolledForm.isNewData;

export default formSlice.reducer;
