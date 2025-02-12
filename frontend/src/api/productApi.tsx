import { getParamsGET } from '../modules/functions'

class ProductApi {
    async getProducts() {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/products/get`;
    //   const url = `${process.env.REACT_APP_BACK}/products/get/`;
      const params = getParamsGET();
      const response = await fetch(url, params);
      const json = await response.json();
      return json;
    }

}

export const productApi = new ProductApi();