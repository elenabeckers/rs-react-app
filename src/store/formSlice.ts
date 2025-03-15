import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { FormTypeDTO, ValidationErrors } from '../types/form';

export interface FormState {
  uncontrolledForm: {
    form: FormTypeDTO;
    errors: ValidationErrors;
    isNewData: boolean;
  };
  reactHookForm: {
    form: FormTypeDTO;
    isNewData: boolean;
  };
}

const initialState: FormState = {
  uncontrolledForm: {
    form: {
      name: '',
      age: 0,
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
  reactHookForm: {
    form: {
      name: '',
      age: 0,
      email: '',
      password: '',
      passwordRepeat: '',
      gender: '',
      picture: '',
      terms: false,
      country: '',
    },
    isNewData: false,
  },
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    saveUncontrolledForm: (state, action: PayloadAction<FormTypeDTO>) => {
      state.uncontrolledForm.form = action.payload;
      state.uncontrolledForm.isNewData = true;
    },
    setUncontrolledFromErrors: (
      state,
      action: PayloadAction<ValidationErrors>
    ) => {
      state.uncontrolledForm.errors = action.payload;
    },
    setUncontrolledFromIsNewData: (state, action: PayloadAction<boolean>) => {
      state.uncontrolledForm.isNewData = action.payload;
    },
    saveReactHookForm: (state, action: PayloadAction<FormTypeDTO>) => {
      state.reactHookForm.form = action.payload;
      state.reactHookForm.isNewData = true;
    },
    setReactHookIsNewData: (state, action: PayloadAction<boolean>) => {
      state.reactHookForm.isNewData = action.payload;
    },
  },
});

export const {
  saveUncontrolledForm,
  setUncontrolledFromErrors,
  setUncontrolledFromIsNewData,
  saveReactHookForm,
  setReactHookIsNewData,
} = formSlice.actions;

export const selectUncontrolledFormData = (state: RootState) =>
  state.form.uncontrolledForm.form;

export const selectUncontrolledFormErrors = (state: RootState) =>
  state.form.uncontrolledForm.errors;

export const selectUncontrolledFormIsNewData = (state: RootState) =>
  state.form.uncontrolledForm.isNewData;

export const selectReactHookFormFormData = (state: RootState) =>
  state.form.reactHookForm.form;

export const selectReactHookFormIsNewData = (state: RootState) =>
  state.form.reactHookForm.isNewData;

export default formSlice.reducer;
