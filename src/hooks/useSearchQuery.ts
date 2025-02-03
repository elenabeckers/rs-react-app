import { useState } from 'react';

const STORAGE_KEY = 'searchQuery';

const useSearchQuery = (initialValue = '') => {
  const [searchQuery, setSearchQuery] = useState(
    () => localStorage.getItem(STORAGE_KEY) || initialValue
  );

  const storeSearchQuery = (value: string) => {
    setSearchQuery(value);
    localStorage.setItem(STORAGE_KEY, value);
  };

  return [searchQuery, setSearchQuery, storeSearchQuery] as const;
};

export default useSearchQuery;
