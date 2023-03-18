export const getProductById = (id: string) => {
  return fetch(
    `http://f231-2001-8a0-f494-3500-8cd7-2bc4-8d3b-9698.ngrok.io/products/stock/${id}`
  ).then((r) => r.json());
};
