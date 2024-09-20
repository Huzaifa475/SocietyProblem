import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteNotifications, fetchNotifications, setNotifications } from '../../redux/notificationSlice'
import moment from 'moment'
import { io } from 'socket.io-client'
import './index.css'

function Notification() {
    const [socket, setSocket] = useState(null);
    const dispatch = useDispatch();
    const notifications = useSelector(state => state.notification.notifications)
    const loading = useSelector(state => state.notification.loading)
    const error = useSelector(state => state.notification.error)

    useEffect(() => {
        dispatch(fetchNotifications())
    }, [dispatch])

    useEffect(() => {
        const newSocket = io("http://localhost:5000", { transports: ['websocket'] });
        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('Socket connected:', newSocket.id);
        });

        newSocket.on('disconnect', () => {
            console.log('Socket disconnected');
        });

        const societyName = localStorage.getItem('societyName');

        newSocket.emit('join', societyName);

        newSocket.on('receive-notification', (notification) => {
            dispatch(setNotifications(notification));
        })

        return () => {
            newSocket.disconnect();
        }
    }, [dispatch, setNotifications])

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
                    {notifications && notifications.length > 0 ? (
                        notifications.map((notification) => (
                            <div className='notification-content' key={notification._id}>
                                <span>{notification.content}</span>
                                <span>{moment(notification.createdAt).format('LLL')}</span>
                            </div>
                        ))
                    ) : (
                        <div>No notifications to display</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Notification