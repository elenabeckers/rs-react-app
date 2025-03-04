import React, { useEffect, useState } from 'react';
import AsyncButton from '../../common/AsyncButton';
import { usePageLoader } from '../../../hooks/usePageLoader';

interface ProductSearchInputProps {
  initialValue?: string;
  onSearch: (searchQuery: string) => void;
}

const INPUT_PLACEHOLDER_TEXT = 'Search for products like Phones, Laptops...';

const ProductSearchInput = ({
  initialValue = '',
  onSearch,
}: ProductSearchInputProps) => {
  const [searchQuery, setSearchQuery] = useState(initialValue);

  useEffect(() => {
    setSearchQuery(initialValue);
  }, [initialValue]);

  const isLoading = usePageLoader();

  const handleSearch = () => {
    onSearch(searchQuery.trim());
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
        data-testid="search-input"
      />
      <AsyncButton
        type="submit"
        onClick={handleSearch}
        disabled={isLoading}
        isLoading={isLoading}
        className="absolute end-2.5 bottom-2.5"
        aria-label="Search"
      >
        Search
      </AsyncButton>
    </div>
  );
};

export default ProductSearchInput;
