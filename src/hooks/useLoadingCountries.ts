import { useEffect, useMemo, useState } from 'react';
import { Country } from '../types';

const useLoadingCountries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCountries = async () => {
      setIsLoading(true);
      const response = await fetch('https://restcountries.com/v3.1/all');
      const list: Country[] = await response.json();
      setCountries(list);
      setIsLoading(false);
    };

    fetchCountries();
  }, []);

  const regions = useMemo(() => {
    if (!countries) return [];

    return Array.from(
      new Set(countries.map((country) => country.region))
    ).filter(Boolean);
  }, [countries]);

  return {
    countries,
    regions,
    isLoading,
  };
};

export default useLoadingCountries;
