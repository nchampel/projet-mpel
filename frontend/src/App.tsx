// import { useState } from 'react'

import './App.css'
import { Button, Grid2, TextField, Typography } from '@mui/material'
import Login from './components/loginForm'
import Products from './pages/products'

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <Typography variant="h5" className="mb-2 font-semibold text-gray-800">
          Titre
        </Typography>
        {/* <Login /> */}
        <Products />
        </>
  )
}

export default App
