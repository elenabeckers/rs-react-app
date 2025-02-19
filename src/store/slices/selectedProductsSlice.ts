import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../services/product.types';

interface SelectedProductsState {
  products: Product[];
}

const initialState: SelectedProductsState = {
  products: [],
};

const selectedProductsSlice = createSlice({
  name: 'selectedProducts',
  initialState,
  reducers: {
    toggleItem: (state, action: PayloadAction<Product>) => {
      const product = action.payload;

      const exists = state.products.find((item) => item.id === product.id);
      if (exists) {
        state.products = state.products.filter(
          (item) => item.id !== product.id
        );
      } else {
        state.products.push(product);
      }
    },
    clearAll: (state) => {
      state.products = [];
    },
  },
});

export const { toggleItem, clearAll } = selectedProductsSlice.actions;
export default selectedProductsSlice.reducer;
