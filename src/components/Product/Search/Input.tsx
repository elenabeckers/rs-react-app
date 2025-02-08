import React, { useState } from 'react';
import AsyncButton from '../../common/AsyncButton';

interface ProductSearchInputProps {
  initialValue?: string;
  onSearch: (searchQuery: string) => void;
  isLoading: boolean;
}

const INPUT_PLACEHOLDER_TEXT = 'Search for products like Phones, Laptops...';

const ProductSearchInput = ({
  initialValue = '',
  onSearch,
  isLoading,
}: ProductSearchInputProps) => {
  const [searchQuery, setSearchQuery] = useState(initialValue);

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
