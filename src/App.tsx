import { useState, useEffect } from 'react';
import { Country } from './types';
import CountryList from './components/CountryList';
import SearchInput from './components/SearchInput';
import {
  filterCountriesByName,
  filterCountriesByRegion,
  getVisitedCountries,
  sortCountriesByName,
  sortCountriesByPopulation,
  storeVisitedCountries,
} from './api';
import Select from './components/Select';
import { SortOrder, SortType } from './const';

interface SortConfigInterface {
  type: SortType | '';
  order: SortOrder | '';
}

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [visitedCountries, setVisitedCountries] = useState<Set<string> | null>(
    null
  );

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');

  const [sortConfig, setSortConfig] = useState<SortConfigInterface>({
    type: '',
    order: '',
  });

  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCountries = async () => {
      setIsLoading(true);
      const response = await fetch('https://restcountries.com/v3.1/all');
      const list: Country[] = await response.json();
      setCountries(list);
      setFilteredCountries(list);

      const uniqueRegions = Array.from(
        new Set(list.map((country) => country.region))
      ).filter(Boolean);

      setVisitedCountries(getVisitedCountries());

      setRegions(uniqueRegions);
      setIsLoading(false);
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (visitedCountries) {
      storeVisitedCountries(visitedCountries);
    }
  }, [visitedCountries]);

  useEffect(() => {
    if (!countries.length) return;

    let filtered = countries;

    if (searchTerm) {
      filtered = filterCountriesByName(filtered, searchTerm);
    }

    if (selectedRegion) {
      filtered = filterCountriesByRegion(filtered, selectedRegion);
    }

    switch (sortConfig.type) {
      case SortType.Name:
        filtered = sortCountriesByName(filtered, sortConfig.order as SortOrder);
        break;
      case SortType.Population:
        filtered = sortCountriesByPopulation(
          filtered,
          sortConfig.order as SortOrder
        );
        break;
    }

    setFilteredCountries(filtered);
  }, [
    searchTerm,
    selectedRegion,
    sortConfig.type,
    sortConfig.order,
    countries,
  ]);

  const visitCountry = (countryName: string) => {
    setVisitedCountries((prev) => {
      if (prev?.has(countryName)) {
        return prev;
      } else {
        const newVisited = new Set(prev);
        newVisited.add(countryName);
        return newVisited;
      }
    });
  };

  const onSortChange = (type: SortType | '', order: SortOrder | '') => {
    if (!order) {
      setSortConfig({ type: '', order });
    } else {
      setSortConfig({ type, order });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold m-6">Country Explorer</h1>
      <div className="w-full max-w-md mb-4">
        <SearchInput value={searchTerm} onChange={setSearchTerm} />
      </div>
      <div className="flex space-x-4">
        <Select
          label="Sort By Region:"
          value={selectedRegion}
          onChange={setSelectedRegion}
          options={regions}
          placeholder="All Regions"
        />
        <Select
          label="Sort By Name:"
          placeholder="No Sorting"
          value={sortConfig.type === SortType.Name ? sortConfig.order : ''}
          onChange={(value) => onSortChange(SortType.Name, value as SortOrder)}
          options={[SortOrder.Asc, SortOrder.Desc]}
        />

        <Select
          label="Sort By Population:"
          placeholder="No Sorting"
          value={
            sortConfig.type === SortType.Population ? sortConfig.order : ''
          }
          onChange={(value) =>
            onSortChange(SortType.Population, value as SortOrder)
          }
          options={[SortOrder.Asc, SortOrder.Desc]}
        />
      </div>
      <p className="mt-4 text-gray-600">
        {filteredCountries.length} countries was founded
      </p>
      <CountryList
        countries={filteredCountries}
        isLoading={isLoading}
        visitedCountries={visitedCountries}
        onClick={visitCountry}
      />
    </div>
  );
}

export default App;
