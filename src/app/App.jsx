import './App.css'
import ButtonAppBar from '../pages/ButtonAppBar/ButtonAppBar'
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'

function App() {

  const [login, setLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('amwd-token');
    if (token) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  })

  return (
    <>
      {
        login ?
          <ButtonAppBar />
          :
          <Routes>
            <Route path='*' element={<Navigate to={'/login'} />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
      }
    </>
  )
}

export default App
