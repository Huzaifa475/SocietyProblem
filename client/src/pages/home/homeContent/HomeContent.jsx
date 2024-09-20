import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarCheck, faComments, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import './index.css'

function HomeContent() {
  return (
    <div className='card-container'>
        <div className='card-main-container'>
            <div className="cards-content event-card">
                <div className='cards-icon'>
                    <FontAwesomeIcon icon={faCalendarCheck} className='icon'/>
                </div>
                <div className='cards-body'>
                    <span>Content</span>
                    <span>Location</span>
                    <span>Date</span>
                </div>
                <div className='cards-button'>
                    <button>Click here</button>
                </div>
            </div>
            <div className="cards-content problem-card">
                <div className="cards-icon">
                    <FontAwesomeIcon icon={faTriangleExclamation} className='icon'/>
                </div>
                <div className="cards-body">
                    <span>Title</span>
                    <span>Content</span>
                    <span>Upvote</span>
                </div>
                <div className='cards-button'>
                    <button>Click here</button>
                </div>
            </div>
            <div className="cards-content disscusion-card">
                <div className="cards-icon">
                    <FontAwesomeIcon icon={faComments} className='icon'/>
                </div>
                <div className='cards-body'>
                    <span>Chat</span>
                </div>
                <div className='cards-button'>
                    <button>Click here</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomeContent
