'use client';
import { FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import CountrySelect from '../components/CountrySelect';
import {
  saveUncontrolledForm,
  selectUncontrolledFormErrors,
  setUncontrolledFromErrors,
} from '../store/formSlice';
import {
  formDataToFormTypeDTO,
  formValidationSchema,
  validationErrorsToObject,
} from '../utils/formUtils';
import { ValidationError } from 'yup';

const UncontrolledForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const errors = useSelector(selectUncontrolledFormErrors);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    try {
      const formObject = Object.fromEntries(formData.entries());
      await formValidationSchema.validate(formObject, { abortEarly: false });
      const formDTO = await formDataToFormTypeDTO(formData);

      dispatch(saveUncontrolledForm(formDTO));
      dispatch(setUncontrolledFromErrors({}));
      navigate('/');
    } catch (err) {
      if (err instanceof ValidationError) {
        const validationErrors = validationErrorsToObject(err);
        dispatch(setUncontrolledFromErrors(validationErrors));
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 pb-20 my-20">
        <Link
          to="/"
          className="text-blue-600 hover:underline mb-4 inline-block"
        >
          ← Go Back
        </Link>
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          Uncontrolled Form
        </h2>
        <form onSubmit={onSubmit} className="space-y-2">
          <div>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" />
            <p className="error">{errors.name}</p>
          </div>
          <div>
            <label htmlFor="age">Age</label>
            <input id="age" name="age" type="number" />
            <p className="error">{errors.age}</p>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" />
            <p className="error">{errors.email}</p>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="text" />
            <p className="error">{errors.password}</p>
          </div>
          <div>
            <label htmlFor="passwordRepeat">Repeat Your Password</label>
            <input id="passwordRepeat" name="passwordRepeat" type="text" />
            <p className="error">{errors.passwordRepeat}</p>
          </div>
          <div>
            <label htmlFor="gender">Gender: </label>
            <select id="gender" name="gender" defaultValue="">
              <option value="" disabled>
                Select
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <p className="error">{errors.gender}</p>
          </div>
          <div className="flex items-center flex-col py-4">
            <input id="terms" name="terms" type="checkbox" className="mb-2" />
            <label htmlFor="terms">Accept Terms and Conditions agreement</label>
            <p className="error">{errors.terms}</p>
          </div>
          <div>
            <label htmlFor="picture">Upload Picture</label>
            <input
              id="picture"
              name="picture"
              type="file"
              multiple={false}
              accept="image/png, image/jpeg"
            />
            <p className="error">{errors.picture}</p>
          </div>
          <div>
            <label htmlFor="country">Select a Country</label>
            <CountrySelect />
            <p className="error">{errors.country}</p>
          </div>
          <button type="submit" className="mt-8">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UncontrolledForm;
