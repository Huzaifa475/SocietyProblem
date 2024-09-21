import Login from './pages/login/Login.jsx'
import Register from './pages/register/Register.jsx'
import Home from './pages/home/Home.jsx'
import InfoUpload from './pages/information-upload/InfoUpload.jsx'
import Notification from './pages/notification/Notification.jsx'
import Alert from './pages/alert/Alert.jsx'
import Event from './pages/event/Event.jsx'
import Problem from './pages/problem/Problem.jsx'
import Profile from './pages/profile/Profile.jsx'
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
        <Route path='/notification' element={<Notification/>}/>
        <Route path='/alert' element={<Alert/>}/>
        <Route path='/event' element={<Event/>}/>
        <Route path='/problem' element={<Problem/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </>
  )
}

export default App
