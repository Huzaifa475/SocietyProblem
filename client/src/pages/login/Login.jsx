import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast'
import axios from 'axios'
import './index.css'

function Login() {

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handleLogin = async () => {
    let res;
    try {
      res = await axios({
        method: 'post',
        url: '/api/v1/users/login',
        data: {
          name,
          password
        }
      })
      toast.success(res?.data?.message);
      setTimeout(() => {
        navigate("/home")
      }, 500)
    } catch (error) {
      if (error.response) {
        if (error.response?.data?.message)
          toast.error(error.response?.data?.message);
        else
          toast.error(error.request?.statusText);
      }
      else if (error.request) {
        toast.error(error.request?.statusText);
      }
    }

    setName('');
    setPassword('');
  }

  const handleClick = () => {
    setShowPassword(prev => !prev);
  }
  return (
    <div className='login-container'>
      <div className='login-main-container'>
        <div className='login-title'>
          <span>LogIn</span>
        </div>
        <div className='login-name-field'>
          <span>Name</span>
          <input type="text" placeholder='Jan Doe' value={name} onChange={(e) => setName(e.target.value)} autoComplete='off' />
        </div>
        <div className='login-password-field'>
          <span>Password</span>
          <div className=''>
            <input type={showPassword ? "text" : "password"} placeholder='xyz123' value={password} onChange={(e) => setPassword(e.target.value)} autoComplete='off' />
            <button onClick={handleClick}><FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} /></button>
          </div>
        </div>
        <div className='login-button'>
          <button onClick={handleLogin}>LogIn</button>
          <Toaster />
        </div>
        <div className='signup-button'>
          <span>Create New Account?</span>
          <Link to="/signup" relative='path'>SignUp</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
