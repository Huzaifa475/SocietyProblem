import Login from './pages/login/Login.jsx'
import Register from './pages/register/Register.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<Register/>}/>
      </Routes>
    </>
  )
}

export default App
