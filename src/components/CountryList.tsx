import { memo } from 'react';
import useVisitedCountries from '../hooks/useVisitedCountries';
import { Country } from '../types';
import CountryListItem from './CountryListItem';
import Loader from './Loader';

interface CountryListProps {
  countries: Country[];
  isLoading: boolean;
}

const CountryList = memo(function CountryList({
  countries,
  isLoading,
}: CountryListProps) {
  const { visitedCountries, visitCountry } = useVisitedCountries();

  if (isLoading) return <Loader />;

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4 max-w-6xl mx-auto">
      {countries?.map((country) => {
        const isVisited = Boolean(visitedCountries?.has(country.name.common));
        return (
          <CountryListItem
            key={country.name.common}
            country={country}
            isVisited={isVisited}
            onClick={visitCountry}
          />
        );
      })}
    </ul>
  );
});

export default CountryList;
