import React from 'react';
import AsyncButton from '../../common/AsyncButton';

interface ProductSearchInputProps {
  onSearch: (searchTerm: string) => Promise<void>;
  isLoading: boolean;
}

interface ProductSearchInputState {
  searchTerm: string;
}

const INPUT_PLACEHOLDER_TEXT = 'Search for products like Phones, Laptops...';

class ProductSearchInput extends React.Component<
  ProductSearchInputProps,
  ProductSearchInputState
> {
  state: ProductSearchInputState = {
    searchTerm: localStorage.getItem('searchTerm') ?? '',
  };

  componentDidMount() {
    this.props.onSearch(this.state.searchTerm.trim());
  }

  onSearch = () => {
    this.props.onSearch(this.state.searchTerm.trim());
    localStorage.setItem('searchTerm', this.state.searchTerm.trim());
  };

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: e.target.value });
  };

  onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      this.onSearch();
    }
  };

  render() {
    const { isLoading } = this.props;
    const { searchTerm } = this.state;

    return (
      <div className="relative">
        <input
          type="search"
          autoFocus
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          value={searchTerm}
          disabled={isLoading}
          className="w-full p-4 ps-8"
          placeholder={INPUT_PLACEHOLDER_TEXT}
        />
        <AsyncButton
          type="submit"
          onClick={this.onSearch}
          disabled={isLoading}
          isLoading={isLoading}
          className="absolute end-2.5 bottom-2.5"
        >
          Search
        </AsyncButton>
      </div>
    );
  }
}

export default ProductSearchInput;
