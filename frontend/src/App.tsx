// import { useState } from 'react'

import './App.css'
import { Typography } from '@mui/material'
import Login from './components/loginForm'
import Products from './pages/products'
import { Route, Routes } from 'react-router-dom'
import ProductCreate from './pages/productCreate'
import ProductUpdate from './pages/productUpdate'

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <Typography variant="h5" className="mb-2 font-semibold text-gray-800">
          Bienvenue dans l'application de gestion de produits
        </Typography>
        {/* <Login /> */}
        <Routes>
          
        <Route
              path={"/"}
              element={
                <Products />
              }
            ></Route>
        <Route
              path={"/product/create"}
              element={
                <ProductCreate />
              }
            ></Route>
        <Route
              path={"/product/update"}
              element={
                <ProductUpdate />
              }
            ></Route>
        </Routes>
        
        </>
  )
}

export default App
