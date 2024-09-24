import React from 'react'
import {replace, useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './index.css'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import toast from 'react-hot-toast'

function Sider() {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');
    const admin = localStorage.getItem('admin');

    const handleLogout = async () => {
        try {
            const res = await axios({
                method: 'post',
                url: '/api/v1/users/logout',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            toast.success(res.data.message);
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
        finally{
            localStorage.removeItem('accessToken');
            localStorage.removeItem('societyName');
            localStorage.removeItem('userId');
            localStorage.removeItem('admin');
        }
    }

    const handleLogin = () => {
        navigate('/');
    }

    const handleViewProfile = () => {
        navigate('/profile');
    }

    const handleAnalytics = () => {
        navigate('/analytics');
    }
  return (
    <div className='sider-container'>
        <div className="profile-img-container">
            <img src="" alt="" />
        </div>
        <div className="view-profile-container">
            <button onClick={handleViewProfile}>View Profile</button>
        </div>
        {
            admin === true ?
            <div className="admin-information-container">
                <button onClick={handleAnalytics}>Analytics</button>
            </div>
            : 
            <></>
        }
        {
            accessToken ?
            <>
            </>
            :
            <div className='admin-information-container'>
                <button onClick={handleLogin}>Login</button>
            </div>
        }
        <div className="logout-button-container">
            <button onClick={handleLogout}>Logout <FontAwesomeIcon icon={faRightFromBracket}/></button>
        </div>
    </div>
  )
}

export default Sider
