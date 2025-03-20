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

const CountryFilteringPanel = ({
  region,
  regionList,
  onRegionChange,
  sortConfig,
  onSort,
}: CountryFilteringPanelProps) => {
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
        onChange={(value) => onSort(SortType.Name, value as SortOrder)}
        options={SortingOptions}
      />

      <Select
        label="Sort By Population:"
        placeholder="No Sorting"
        value={sortConfig.type === SortType.Population ? sortConfig.order : ''}
        onChange={(value) => onSort(SortType.Population, value as SortOrder)}
        options={SortingOptions}
      />
    </>
  );
};

export default CountryFilteringPanel;
