export const request = jest.fn(async (url: string) => {
  if (url.includes('/products/search')) {
    return {
      products: [{ id: 1, title: 'Test Product' }],
      total: 1,
      skip: 0,
      limit: 10,
    };
  }

  if (url.includes('/products/')) {
    const id = url.split('/').pop();
    if (id === '1') {
      return {
        id: 1,
        title: 'Mocked Product',
        description: 'Test description',
      };
    }
    throw new Error('Product not found');
  }

  throw new Error('Network error');
});
