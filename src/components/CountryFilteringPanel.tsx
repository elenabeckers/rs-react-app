import { memo, useCallback } from 'react';
import { SortingOptions, SortOrder, SortType } from '../const';
import { SortConfigInterface } from '../hooks/useSortConfig';
import Select from './Select';

interface CountryFilteringPanelProps {
  region: string;
  regionList: string[];
  onRegionChange: (region: string) => void;
  sortConfig: SortConfigInterface;
  onSort: (type: SortType | '', order: SortOrder | '') => void;
}

const CountryFilteringPanel = memo(function CountryFilteringPanel({
  region,
  regionList,
  onRegionChange,
  sortConfig,
  onSort,
}: CountryFilteringPanelProps) {
  const handleSortByName = useCallback(
    (value: string) => onSort(SortType.Name, value as SortOrder),
    [onSort]
  );

  const handleSortByPopulation = useCallback(
    (value: string) => onSort(SortType.Population, value as SortOrder),
    [onSort]
  );

  return (
    <>
      <Select
        label="Sort By Region:"
        value={region}
        onChange={onRegionChange}
        options={regionList}
        placeholder="All Regions"
      />
      <Select
        label="Sort By Name:"
        placeholder="No Sorting"
        value={sortConfig.type === SortType.Name ? sortConfig.order : ''}
        onChange={handleSortByName}
        options={SortingOptions}
      />

      <Select
        label="Sort By Population:"
        placeholder="No Sorting"
        value={sortConfig.type === SortType.Population ? sortConfig.order : ''}
        onChange={handleSortByPopulation}
        options={SortingOptions}
      />
    </>
  );
});

export default CountryFilteringPanel;
