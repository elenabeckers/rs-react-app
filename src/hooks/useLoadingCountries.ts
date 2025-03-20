import { useEffect, useState } from 'react';
import { Country } from '../types';

const useLoadingCountries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [regions, setRegions] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCountries = async () => {
      setIsLoading(true);
      const response = await fetch('https://restcountries.com/v3.1/all');
      const list: Country[] = await response.json();
      setCountries(list);

      const uniqueRegions = Array.from(
        new Set(list.map((country) => country.region))
      ).filter(Boolean);

      setRegions(uniqueRegions);
      setIsLoading(false);
    };

    fetchCountries();
  }, []);

  return {
    countries,
    regions,
    isLoading,
  };
};

export default useLoadingCountries;
