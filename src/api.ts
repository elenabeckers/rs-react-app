import { SortOrder } from './const';
import { Country } from './types';

export const getCountries = async (): Promise<Country[]> =>
  (await fetch('https://restcountries.com/v3.1/all')).json();

export const getVisitedCountries = (): Set<string> => {
  const storedCountries = localStorage.getItem('visitedCountries');
  return storedCountries ? new Set(JSON.parse(storedCountries)) : new Set();
};

export const storeVisitedCountries = (countries: Set<string>) => {
  localStorage.setItem(
    'visitedCountries',
    JSON.stringify(Array.from(countries))
  );
};

export const filterCountriesByName = (countries: Country[], name: string) =>
  countries.filter((country) =>
    country.name.common.toLowerCase().includes(name.toLowerCase())
  );

export const filterCountriesByRegion = (countries: Country[], region: string) =>
  countries.filter((country) => country.region === region || region === '');

export const sortCountriesByName = (countries: Country[], order: SortOrder) =>
  [...countries].sort((a, b) =>
    order === SortOrder.Asc
      ? a.name.common.localeCompare(b.name.common)
      : b.name.common.localeCompare(a.name.common)
  );

export const sortCountriesByPopulation = (
  countries: Country[],
  order: SortOrder
) =>
  [...countries].sort((a, b) =>
    order === SortOrder.Asc
      ? a.population - b.population
      : b.population - a.population
  );
