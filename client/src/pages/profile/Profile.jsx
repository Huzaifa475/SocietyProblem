import React from 'react'
import './index.css'
import Header from '../../components/header/Header'
import Sider from '../../components/sider/Sider'
import ProfileContent from './profileContent/ProfileContent'
import useQuery from '../../hook/useQuery/useQuery.jsx'

function Profile() {
  const isLargeSize = useQuery('(min-width: 700px)')
  return (
    <>
        <Header/>
        <div className="profile-container">
            {
              isLargeSize &&
              <Sider/>
            }
            <ProfileContent/>
        </div>
    </>
  )
}

export default Profile
