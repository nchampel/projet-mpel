export type Product = {
  _id: string;
  nom: string;
  description: string;
  image: string;
  prix: number;
  stock: number;
};
export type ProductDB = {
  totalPages: number;
  products: Product[];
};
