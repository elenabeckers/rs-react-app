import { useState } from 'react';

const STORAGE_KEY = 'searchQuery';

const useSearchQuery = (initialValue = '') => {
  const [searchQuery, setSearchQuery] = useState(
    () => localStorage.getItem(STORAGE_KEY) || initialValue
  );

  const storeSearchQuery = (query: string) => {
    setSearchQuery(query);
    localStorage.setItem(STORAGE_KEY, query);
  };

  return [searchQuery, storeSearchQuery] as const;
};

export default useSearchQuery;
