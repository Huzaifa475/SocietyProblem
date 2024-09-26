import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAlerts, fetchAlerts, setAlerts } from '../../redux/alertSlice'
import { io } from 'socket.io-client'
import './index.css'
import moment from 'moment';
import { Skeleton, Stack } from '@mui/material'
import {toast, Toaster} from 'react-hot-toast'
import axios from 'axios'

function Alert() {

    const [socket, setSocket] = useState(null);
    const dispatch = useDispatch();
    const { alerts, loading, error } = useSelector(state => state.alert)
    const admin = JSON.parse(localStorage.getItem('admin'))
    const accessToken = localStorage.getItem('accessToken')
    const [content, setContent] = useState('')

    useEffect(() => {
        dispatch(fetchAlerts())
    }, [dispatch])

    const handleClearButton = () => {
        dispatch(deleteAlerts())
    }

    useEffect(() => {
        const newSocket = io("https://societyproblem-server.onrender.com", { 
            transports: ['websocket'],
            secure: true
        });
        setSocket(newSocket);

        const societyName = localStorage.getItem('societyName')
        newSocket.emit('join', societyName);

        newSocket.on('receive-alert', (alert) => {
            dispatch(setAlerts(alert));
        })

        return () => {
            newSocket.disconnect();
        }
    }, [dispatch])

    if (loading) {
        return (
            <div className='alert-page'>
                <div className='alert-container'>
                    <div className='alert-title'>
                        <span>Alerts</span>
                        <button onClick={handleClearButton}>Clear All</button>
                    </div>
                    <Stack className='alert-main-container'>
                        <Skeleton animation="wave" className='alert-content' style={{ backgroundColor: 'silver' }} />
                        <Skeleton animation="wave" className='alert-content' style={{ backgroundColor: 'silver' }} />
                        <Skeleton animation="wave" className='alert-content' style={{ backgroundColor: 'silver' }} />
                        <Skeleton animation="wave" className='alert-content' style={{ backgroundColor: 'silver' }} />
                        <Skeleton animation="wave" className='alert-content' style={{ backgroundColor: 'silver' }} />
                        <Skeleton animation="wave" className='alert-content' style={{ backgroundColor: 'silver' }} />
                        <Skeleton animation="wave" className='alert-content' style={{ backgroundColor: 'silver' }} />
                        <Skeleton animation="wave" className='alert-content' style={{ backgroundColor: 'silver' }} />
                    </Stack>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className='alert-page'>
                <div className='alert-container'>
                    <div className='alert-title'>
                        <span>Alerts</span>
                        <button onClick={handleClearButton}>Clear All</button>
                    </div>
                    <div className="div">
                        Opps something went wrong!
                    </div>
                </div>
            </div>
        )
    }

    const handleCreateAlert = async() => {
        try {
            const res = await axios({
                method: 'post',
                url: '/api/v1/alert/create',
                data: {
                    content
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            toast.success(res?.data?.message);
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

        setContent('')
    }
    
    return (
        <div className='alert-page'>
            <div className='alert-container'>
                <div className='alert-title'>
                    <span>Alerts</span>
                    <button onClick={handleClearButton}>Clear All</button>
                </div>
                {
                    admin === true ?
                    <div className="alert-create-section">
                        <div className="alert-create-title">
                            <span>Create a new Alert</span>
                        </div>
                        <div className="alert-create-content">
                            <span>Content </span>
                            <input type="text" value={content} onChange={(e) => setContent(e.target.value)} autoComplete='off' />
                        </div>
                        <div className="alert-create-button">
                            <button onClick={handleCreateAlert}>Create</button>
                            <Toaster/>
                        </div>
                    </div>
                    :
                    <></>
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
                        <div>
                            No alert fetch
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Alert