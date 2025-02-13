import { getParams } from '../modules/functions';

type ValuesProduct = {
  name: string,
  description?: string,
  image?: string,
  price: number,
  stock: number
}
class ProductApi {
    async getProducts(page: number, limit: number) {
      const data = { page, limit };
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/products/get`;
    //   const url = `${process.env.REACT_APP_BACK}/products/get/`;
      const params = getParams(data, "POST");
      const response = await fetch(url, params);
      const json = await response.json();
      return json;
    }
    // async getOneProduct() {
    //   const url = `${import.meta.env.VITE_BACKEND_URL}/api/products/get`;
    //   const params = getParamsGET();
    //   const response = await fetch(url, params);
    //   const json = await response.json();
    //   return json;
    // }

    
    async createProduct(values: ValuesProduct) {
      // const data = { values };
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/products/create`;
    //   const url = `${process.env.REACT_APP_BACK}/products/get/`;
    const params = getParams(values, "POST");
      const response = await fetch(url, params);
      const json = await response.json();
      return json;
    }
    async updateProduct(values: ValuesProduct, _id: string) {
      const data = { ...values, _id };
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/products/update`;
    //   const url = `${process.env.REACT_APP_BACK}/products/get/`;
      const params = getParams(data, "PUT");
      const response = await fetch(url, params);
      const json = await response.json();
      return json;
    }
    async deleteProduct(_id: string) {
      const data = { _id };
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/products/delete`;
    //   const url = `${process.env.REACT_APP_BACK}/products/get/`;
      const params = getParams(data, "DELETE");
      const response = await fetch(url, params);
      const json = await response.json();
      return json;
    }

}

export const productApi = new ProductApi();