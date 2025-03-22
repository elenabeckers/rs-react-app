import { useCallback, useEffect, useState } from 'react';
import { getVisitedCountries, storeVisitedCountries } from '../api';

const useVisitedCountries = () => {
  const [visitedCountries, setVisitedCountries] = useState<Set<string> | null>(
    null
  );

  useEffect(() => {
    setVisitedCountries(getVisitedCountries());
  }, []);

  useEffect(() => {
    if (visitedCountries) {
      storeVisitedCountries(visitedCountries);
    }
  }, [visitedCountries]);

  const visitCountry = useCallback(
    (countryName: string) => {
      setVisitedCountries((prev) => {
        if (prev?.has(countryName)) {
          return prev;
        } else {
          const newVisited = new Set(prev);
          newVisited.add(countryName);
          return newVisited;
        }
      });
    },
    [setVisitedCountries]
  );

  return {
    visitedCountries,
    visitCountry,
  };
};

export default useVisitedCountries;
