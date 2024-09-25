import React, { useEffect, useState } from 'react'
import {replace, useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './index.css'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import toast from 'react-hot-toast'

function Sider() {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');
    const admin = JSON.parse(localStorage.getItem('admin'))
    const [photoUrl, setPhotoUrl] = useState('');

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
            localStorage.removeItem('admin');
            localStorage.removeItem('userId');
            localStorage.removeItem('societyName');
            localStorage.removeItem('accessToken');
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

    const handleHome = () => {
        navigate('/home');
    }

    const renderPhoto = async () => {
        try {
            const res = await axios({
                method: 'get',
                url: '/api/v1/users/getPhoto',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            setPhotoUrl(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        renderPhoto()
    }, [])

  return (
    <div className='sider-container'>
        <div className="profile-img-container">
            {
                photoUrl ?
                <img src={photoUrl} alt="" loading='lazy'/>
                :
                <img src="https://picsum.photos/400/300" alt="" loading='lazy'/>
            }
        </div>
        <div className="view-profile-container">
            <button onClick={handleHome}>Home</button>
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
