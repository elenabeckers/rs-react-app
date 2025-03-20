import { useState } from 'react';
import { SortOrder, SortType } from '../const';

export interface SortConfigInterface {
  type: SortType | '';
  order: SortOrder | '';
}

const useSortConfig = () => {
  const [sortConfig, setSortConfig] = useState<SortConfigInterface>({
    type: '',
    order: '',
  });

  const updateSort = (type: SortType | '', order: SortOrder | '') => {
    if (!order) {
      setSortConfig({ type: '', order });
    } else {
      setSortConfig({ type, order });
    }
  };

  return {
    sortConfig,
    updateSort,
  };
};

export default useSortConfig;
