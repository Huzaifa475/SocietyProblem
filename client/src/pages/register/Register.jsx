import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import './index.css'

function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    const handleRegister = async () => {
        try {
            res = await axios({
                method: 'post',
                url: 'http://localhost/5000/api/v1/users/register',
                data: {
                    name,
                    email,
                    password
                }
            })
            setTimeout(() => {
                navigate('/login')
            }, 500)
        } catch (error) {
            console.log(error);
        }
    }

    const handleLogin = () => {
        navigate('/login');
    }
    return (
        <div className='container'>
            <div className='main-container'>
                <div className='img-container'>
                </div>
                <div className='register'>
                    <div className='title'>
                        <span>SignUp</span>
                    </div>
                    <div className='default-property'>
                        <span>Name</span>
                        <input type="text" placeholder='Jen Doe'/>
                    </div>
                    <div className='default-property'>
                        <span>Email</span>
                        <input type="text" placeholder='abc@gmail.com'/>
                    </div>
                    <div className='default-property'>
                        <span>Password</span>
                        <input type="text" placeholder='xyz123'/>
                    </div>
                    <div className='sign-up'>
                        <div className='signup-button'>
                            <button>Let's Get Started</button>
                        </div>
                        <div className='forgot-password'>
                            <Link to="/login" relative="path">Forgot Password?</Link>
                        </div>
                    </div>
                    <div className='login-button'>
                        <span>Already have an account?</span>
                        <Link to="/login" relative="path">LogIn</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
