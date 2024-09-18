import Login from './pages/login/Login.jsx'
import Register from './pages/register/Register.jsx'
import Home from './pages/home/Home.jsx'
import InfoUpload from './pages/information-upload/InfoUpload.jsx'
import { Route, Routes } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<Register/>}/>
        <Route path='/information-upload' element={<InfoUpload/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </>
  )
}

export default App
