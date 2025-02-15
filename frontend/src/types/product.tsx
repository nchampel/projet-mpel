export type Product = {
  _id: string;
  nom: string;
  description: string;
  image: string;
  prix: number;
  stock: number;
};
export type ProductDB = {
  // page: number;
  // limit: number;
  // totalProducts: number;
  totalPages: number;
  products: Product[];
};