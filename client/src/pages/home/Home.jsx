import React from 'react'
import Header from '../../components/header/Header'
import Sider from '../../components/sider/Sider'

function Home() {
  return (
    <>
        <Header/>
        <div className='home-container'>
          <Sider/>
        </div>
    </>
  )
}

export default Home
