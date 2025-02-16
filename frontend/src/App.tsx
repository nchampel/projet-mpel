import "./App.css";
import Login from "./components/user/loginForm";
import Products from "./pages/product/products";
import { Route, Routes } from "react-router-dom";
import ProductCreate from "./pages/product/productCreate";
import ProductUpdate from "./pages/product/productUpdate";
import Header from "./components/header";
import Signup from "./components/user/signupForm";
import PrivateRoute from "./components/privateRoute";

function App() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex">
        <Routes>
          <Route path={"/"} element={<Products />}></Route>
          <Route path={"/login"} element={<Login />}></Route>
          <Route path={"/signup"} element={<Signup />}></Route>

          <Route element={<PrivateRoute />}>
            <Route path={"/product/create"} element={<ProductCreate />}></Route>
            <Route path={"/product/update"} element={<ProductUpdate />}></Route>
          </Route>
          
        </Routes>
      </div>
    </div>
  );
}

export default App;
