import { selectCountries } from '../store/countriesSlice';
import { useSelector } from 'react-redux';

const CountrySelect = () => {
  const countries = useSelector(selectCountries);

  return (
    <div>
      <input
        list="countries"
        id="country"
        name="country"
        className="w-full"
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
