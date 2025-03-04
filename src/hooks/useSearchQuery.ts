import { useEffect, useState } from 'react';

const STORAGE_KEY = 'searchQuery';

export const useSearchQuery = () => {
  const [searchQuery, setSearchQuery] = useState<string | undefined>();

  useEffect(() => {
    const savedQuery = localStorage.getItem(STORAGE_KEY);
    setSearchQuery(savedQuery || undefined);
  }, []);

  const storeSearchQuery = (query: string) => {
    setSearchQuery(query);
    localStorage.setItem(STORAGE_KEY, query);
  };

  return [searchQuery, storeSearchQuery] as const;
};
