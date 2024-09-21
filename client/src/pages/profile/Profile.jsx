import React from 'react'
import './index.css'
import Header from '../../components/header/Header'
import Sider from '../../components/sider/Sider'
import ProfileContent from './profileContent/ProfileContent'

function Profile() {
  return (
    <>
        <Header/>
        <div className="profile-container">
            <Sider/>
            <ProfileContent/>
        </div>
    </>
  )
}

export default Profile
