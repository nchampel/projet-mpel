import { getParams } from '../modules/functions';

type ValuesUser = {
  email: string,
  password: string
}
class UserApi {
    async login(values : ValuesUser) {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`;
    //   const url = `${process.env.REACT_APP_BACK}/products/get/`;
      const params = getParams(values, "POST");
      const response = await fetch(url, params);
      const json = await response.json();
      return json;
    }
    
    async signup(values: ValuesUser) {
      // const data = { values };V
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`;
    //   const url = `${process.env.REACT_APP_BACK}/products/get/`;
    const params = getParams(values, "POST");
      const response = await fetch(url, params);
      const json = await response.json();
      return json;
    }
    async checkAuth() {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/auth/check`;
    //   const url = `${process.env.REACT_APP_BACK}/products/get/`;
    const params = getParams({}, "POST");
      const response = await fetch(url, params);
      const json = await response.json();
      return json;
    }
    

}

export const userApi = new UserApi();