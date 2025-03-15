'use client';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import CountrySelect from '../components/CountrySelect';
import { useForm } from 'react-hook-form';
import { saveReactHookForm } from '../store/formSlice';
import {
  formTypeToFormTypeDTO,
  formValidationSchema,
} from '../utils/formUtils';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormType } from '../types/form';

const ReactHookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormType>({
    resolver: yupResolver(formValidationSchema),
    mode: 'onChange',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: FormType) => {
    const form = await formTypeToFormTypeDTO(data);
    dispatch(saveReactHookForm(form));
    navigate('/');
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
          React Hook Form
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <div>
            <label htmlFor="name">Name</label>
            <input id="name" type="text" {...register('name')} />
            <p className="error">{errors.name?.message}</p>
          </div>
          <div>
            <label htmlFor="age">Age</label>
            <input id="age" type="text" {...register('age')} />
            <p className="error">{errors.age?.message}</p>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" {...register('email')} />
            <p className="error">{errors.email?.message}</p>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input id="password" type="text" {...register('password')} />
            <p className="error">{errors.password?.message}</p>
          </div>
          <div>
            <label htmlFor="passwordRepeat">Repeat Your Password</label>
            <input
              id="passwordRepeat"
              type="text"
              {...register('passwordRepeat')}
            />
            <p className="error">{errors.passwordRepeat?.message}</p>
          </div>
          <div>
            <label htmlFor="gender">Gender: </label>
            <select id="gender" {...register('gender')} defaultValue="">
              <option value="" disabled>
                Select
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <p className="error">{errors.gender?.message}</p>
          </div>
          <div className="flex items-center flex-col py-4">
            <input
              id="terms"
              type="checkbox"
              {...register('terms')}
              className="mb-2"
            />
            <label htmlFor="terms">Accept Terms and Conditions agreement</label>
            <p className="error">{errors.terms?.message}</p>
          </div>

          <div>
            <label htmlFor="picture">Upload Picture</label>
            <input
              id="picture"
              type="file"
              accept="image/png, image/jpeg"
              multiple={false}
              {...register('picture')}
            />
            <p className="error">{errors.picture?.message}</p>
          </div>
          <div>
            <label htmlFor="country">Select a Country</label>
            <CountrySelect register={register} />
            <p className="error">{errors.country?.message}</p>
          </div>
          <button type="submit" className="mt-8" disabled={!isValid}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReactHookForm;
