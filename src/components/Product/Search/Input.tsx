import React, { useEffect, useState } from 'react';
import AsyncButton from '../../common/AsyncButton';

interface ProductSearchInputProps {
  onSearch: (searchTerm: string) => Promise<void>;
  isLoading: boolean;
}

const INPUT_PLACEHOLDER_TEXT = 'Search for products like Phones, Laptops...';

const ProductSearchInput = ({
  onSearch,
  isLoading,
}: ProductSearchInputProps) => {
  const [searchTerm, setSearchTerm] = useState<string>(
    localStorage.getItem('searchTerm') ?? ''
  );

  useEffect(() => {
    onSearch(searchTerm.trim());
  }, []);

  const handleSearch = () => {
    onSearch(searchTerm.trim());
    localStorage.setItem('searchTerm', searchTerm.trim());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
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
        value={searchTerm}
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
