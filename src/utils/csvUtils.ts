export const convertProductsToCSV = (
  products: { id: number; title: string; description: string }[]
) => {
  const headers = ['ID', 'Title', 'Product URL'];

  return [
    headers,
    ...products.map((product) => [
      product.id,
      product.title,
      `${window.location.origin}/details/${product.id}`,
    ]),
  ]
    .map((e) => e.join(','))
    .join('\n');
};

export const downloadCSV = (scvData: string, fileName: string) => {
  const blob = new Blob([scvData], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  link.click();
};
