import { selectCountries } from '../store/countriesSlice';
import { useSelector } from 'react-redux';
import { UseFormRegister } from 'react-hook-form';
import { FormType } from '../types/form';
interface CountrySelectProps {
  register?: UseFormRegister<FormType>;
}

const CountrySelect = ({ register }: CountrySelectProps) => {
  const countries = useSelector(selectCountries);

  return (
    <div>
      <input
        list="countries"
        id="country"
        className="w-full"
        {...(register ? register('country') : { name: 'country' })}
      ></input>
      <datalist id="countries">
        {countries.map((country: string) => (
          <option value={country} key={country}></option>
        ))}
      </datalist>
    </div>
  );
};

export default CountrySelect;
