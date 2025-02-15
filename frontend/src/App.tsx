// import { useState } from 'react'

import "./App.css";
import Login from "./components/user/loginForm";
import Products from "./pages/products";
import { Route, Routes } from "react-router-dom";
import ProductCreate from "./pages/productCreate";
import ProductUpdate from "./pages/productUpdate";
import Header from "./components/header";
import Signup from "./components/user/signupForm";

function App() {
  // const [count, setCount] = useState(0);

  return (
    // <div>
    <div className="h-screen flex flex-col">
      <Header />
      {/* <Login /> */}
      {/* <div> */}
      <div className="flex-grow flex">
        {/* <div className="flex-1 overflow-y-auto"> */}
        <Routes>
          <Route path={"/"} element={<Products />}></Route>
          <Route path={"/product/create"} element={<ProductCreate />}></Route>
          <Route path={"/product/update"} element={<ProductUpdate />}></Route>
          <Route path={"/login"} element={<Login />}></Route>
          <Route path={"/signup"} element={<Signup />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
