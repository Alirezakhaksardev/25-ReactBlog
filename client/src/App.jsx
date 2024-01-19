import React from 'react'
import Navbar from './components/Navbar/Navbar'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000"
axios.defaults.headers.post["Content-Type"] = "application/json"
axios.defaults.headers.post["Accept"] = "application/json"
axios.defaults.withCredentials = true; 

function App() {
  return (
    <>
      <BrowserRouter >
        <Navbar />
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App