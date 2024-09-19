import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteNotifications, fetchNotifications } from '../../redux/notificationSlice'
import moment from 'moment'
import './index.css'

function Notification() {

    const dispatch = useDispatch();
    const { notifications, loading, error } = useSelector(state => state.notification)

    useEffect(() => {
        dispatch(fetchNotifications())
    }, [dispatch])

    const handleClearButton = () => {
        dispatch(deleteNotifications());
    }

    if (loading) {
        return (
            <div className='notification-page'>
                <div className='notification-container'>
                    <div className='notification-title'>
                        <span>Notifications</span>
                        <button onClick={handleClearButton}>Clear All</button>
                    </div>
                    <div className='notification-main-container'>
                        Loading...
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className='notification-page'>
                <div className='notification-container'>
                    <div className='notification-title'>
                        <span>Notifications</span>
                        <button onClick={handleClearButton}>Clear All</button>
                    </div>
                    <div className='notification-main-container'>
                        Error
                    </div>
                </div>
            </div>
        )
    }
    
    return (
        <div className='notification-page'>
            <div className='notification-container'>
                <div className='notification-title'>
                    <span>Notifications</span>
                    <button onClick={handleClearButton}>Clear All</button>
                </div>
                <div className='notification-main-container'>
                    {
                        notifications.map((notification) => {
                            return (
                                <div className='notification-content' key={notification._id}>
                                    <span>{notification.content}</span>
                                    <span>{moment(notification.createdAt).format('DD/MM/YYYY')}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Notification