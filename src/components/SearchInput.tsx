import { memo } from 'react';

interface SearchInputProps {
  value: string;
  onChange: (searchTerm: string) => void;
}

const SearchInput = memo(function SearchInput({
  value,
  onChange,
}: SearchInputProps) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search country by Name"
      className="w-full p-4 ps-8"
    />
  );
});

export default SearchInput;
