import React from 'react'
import Header from '../../components/header/Header'
import Sider from '../../components/sider/Sider'
import HomeContent from './homeContent/HomeContent'
import './index.css'

function Home() {
  return (
    <>
        <Header/>
        <div className='home-container'>
          <Sider/>
          <HomeContent/>
        </div>
    </>
  )
}

export default Home
