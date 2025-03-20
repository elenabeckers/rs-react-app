import { useState, useEffect } from 'react';
import { Country } from './types';
import CountryList from './components/CountryList';
import SearchInput from './components/SearchInput';
import {
  filterCountriesByName,
  filterCountriesByRegion,
  sortCountriesByName,
  sortCountriesByPopulation,
} from './api';
import { SortOrder, SortType } from './const';
import useSortConfig from './hooks/useSortConfig';
import CountryFilteringPanel from './components/CountryFilteringPanel';
import useLoadingCountries from './hooks/useLoadingCountries';

function App() {
  const { countries, regions, isLoading } = useLoadingCountries();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');

  const { sortConfig, updateSort } = useSortConfig();
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);

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

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold m-6">Country Explorer</h1>
      <div className="w-full max-w-md mb-4">
        <SearchInput value={searchTerm} onChange={setSearchTerm} />
      </div>
      <div className="flex space-x-4">
        <CountryFilteringPanel
          region={selectedRegion}
          onRegionChange={setSelectedRegion}
          regionList={regions}
          sortConfig={sortConfig}
          onSort={updateSort}
        />
      </div>
      <p className="mt-4 text-gray-600">
        {filteredCountries.length} countries was founded
      </p>
      <CountryList countries={filteredCountries} isLoading={isLoading} />
    </div>
  );
}

export default App;
