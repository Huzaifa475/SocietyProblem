import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAlerts, fetchAlerts, setAlerts } from '../../redux/alertSlice'
import { io } from 'socket.io-client'
import './index.css'
import moment from 'moment';

function Alert() {

    const [socket, setSocket] = useState(null);
    const dispatch = useDispatch();
    const { alerts, loading, error } = useSelector(state => state.alert)
    const admin = localStorage.getItem('admin')
    const [content, setContent] = useState('')
    

    useEffect(() => {
        dispatch(fetchAlerts())
    }, [dispatch])

    const handleClearButton = () => {
        dispatch(deleteAlerts())
    }

    useEffect(() => {
        const newSocket = io("http://localhost:5000", {transports: ['websocket']});
        setSocket(newSocket);
        newSocket.on('connect', () => {
            console.log('Socket connected', newSocket.id);
        })

        newSocket.on('disconnect', () => {
            console.log('Socket disconnected');
        })

        const societyName = localStorage.getItem('societyName')
        newSocket.emit('join', societyName);

        newSocket.on('receive-alert', (alert) => {
            dispatch(setAlerts(alert));
        })

        return () => {
            newSocket.disconnect();
        }
    }, [dispatch])

    if(loading){
        return (
            <div className='alert-page'>
                <div className='alert-container'>
                    <div className='alert-title'>
                        <span>Alerts</span>
                        <button onClick={handleClearButton}>Clear All</button>
                    </div>
                    <div className='alert-main-container'>
                        Loading
                    </div>
                </div>
            </div>
        )
    }

    if(error){
        return (
            <div className='alert-page'>
                <div className='alert-container'>
                    <div className='alert-title'>
                        <span>Alerts</span>
                        <button onClick={handleClearButton}>Clear All</button>
                    </div>
                    <div className='alert-main-container'>
                        Error
                    </div>
                </div>
            </div>
        )
    }
    
    const handleCreateAlert = () => {

    }
    return (
        <div className='alert-page'>
            <div className='alert-container'>
                <div className='alert-title'>
                    <span>Alerts</span>
                    <button onClick={handleClearButton}>Clear All</button>
                </div>
                {
                    admin === true && 
                    <div className="alert-create-section">
                        <div className="alert-create-title">
                            <span>Create a new Alert</span>
                        </div>
                        <div className="alert-create-content">
                            <span>Content </span>
                            <input type="text" value={content} onChange={(e) => setContent(e.target.value)} autoComplete='off'/>
                        </div>
                        <div className="alert-create-button">
                            <button onClick={handleCreateAlert}>Create</button>
                        </div>
                    </div>
                }
                <div className='alert-main-container'>
                    {
                        alerts && alerts.length > 0 ? 
                        alerts.map((alert) => {
                            return (
                                <div className='alert-content' key={alert._id}>
                                    <span>{alert.content}</span>
                                    <span>{moment(alert.createdAt).format('LLL')}</span>
                                </div>
                            )
                        })
                        :
                        <div>No alerts to display</div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Alert