import React, { useEffect } from 'react';
import AsyncButton from '../../common/AsyncButton';
import useSearchQuery from '../../../hooks/useSearchQuery';

interface ProductSearchInputProps {
  onSearch: (searchQuery: string) => Promise<void>;
  isLoading: boolean;
}

const INPUT_PLACEHOLDER_TEXT = 'Search for products like Phones, Laptops...';

const ProductSearchInput = ({
  onSearch,
  isLoading,
}: ProductSearchInputProps) => {
  const [searchQuery, setSearchQuery, storeSearchQuery] = useSearchQuery();

  useEffect(() => {
    onSearch(searchQuery.trim());
  }, []);

  const handleSearch = () => {
    onSearch(searchQuery.trim());
    storeSearchQuery(searchQuery.trim());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative">
      <input
        type="search"
        autoFocus
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={searchQuery}
        disabled={isLoading}
        className="w-full p-4 ps-8"
        placeholder={INPUT_PLACEHOLDER_TEXT}
      />
      <AsyncButton
        type="submit"
        onClick={handleSearch}
        disabled={isLoading}
        isLoading={isLoading}
        className="absolute end-2.5 bottom-2.5"
      >
        Search
      </AsyncButton>
    </div>
  );
};

export default ProductSearchInput;
