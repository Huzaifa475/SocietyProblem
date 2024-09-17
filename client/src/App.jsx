import Register from './pages/register/Register.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>

      <Routes>
        <Route path='/' element={<Register/>}/>
      </Routes>
      
    </>
  )
}

export default App
