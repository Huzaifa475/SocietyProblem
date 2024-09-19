import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import {useNavigate} from 'react-router-dom'
import './index.css'

function Header() {

    const navigate = useNavigate();

    const handleAlert = () => {
        navigate('/alert');
    }

    const handleNotification = () => {
        navigate('/notification')
    }
  return (
    <div className='header'>
        <div className="header-society-name">
            <span>Name</span>
        </div>
        <div className='header-icon'>
            <div className='header-alert-icon'>
                <button onClick={handleAlert}><FontAwesomeIcon icon={faCircleExclamation} style={{color: "#000000", fontSize: "20px"}}/></button>
            </div>
            <div className='header-notification-icon'>
                <button onClick={handleNotification}><FontAwesomeIcon icon={faBell} style={{color: "#000000", fontSize: "20px"}}/></button>
            </div>
        </div>
    </div>
  )
}

export default Header