import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import './index.css'
import toast, { Toaster } from 'react-hot-toast'

function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    const handleRegister = async () => {
        let res;
        try {
            res = await axios({
                method: 'post',
                url: '/api/v1/users/register',
                data: {
                    name: name.toLowerCase(),
                    email,
                    password
                }
            })
            toast.success(res?.data?.message)
            setTimeout(() => {
                navigate('/', {replace: true})
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
        setEmail('');
        setPassword('');
    }

    const handleClick = () => {
        setShowPassword(prev => !prev);
    }
    return (
        <div className='signup-container'>
            <div className='signup-main-container'>
                <div className='signup-img-container'>
                </div>
                <div className='register'>
                    <div className='signup-title'>
                        <span>SignUp</span>
                    </div>
                    <div className='default-property default'>
                        <span>Name</span>
                        <input type="text" placeholder='Jane Doe' value={name} onChange={(e) => setName(e.target.value)} autoComplete='off' />
                    </div>
                    <div className='default-property default'>
                        <span>Email</span>
                        <input type="text" placeholder='abc@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)} autoComplete='off' />
                    </div>
                    <div className='default-property'>
                        <span>Password</span>
                        <div className='password'>
                            <input type={showPassword ? "text" : "password"} placeholder='xyz123' value={password} onChange={(e) => setPassword(e.target.value)} autoComplete='off' />
                            <button onClick={handleClick}><FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className="white-icon" /></button>
                        </div>
                    </div>
                    <div className='sign-up'>
                        <div className='signup-button'>
                            <button onClick={handleRegister}>SignUp</button>
                            <Toaster />
                        </div>
                    </div>
                    <div className='login-button'>
                        <span>Already have an account?</span>
                        <Link to="/" relative="path" className='link'>LogIn</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
