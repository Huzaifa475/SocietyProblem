import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAlerts, fetchAlerts } from '../../redux/alertSlice'
import './index.css'
import moment from 'moment';

function Alert() {

    const dispatch = useDispatch();
    const { alerts, loading, error } = useSelector(state => state.alert)

    useEffect(() => {
        dispatch(fetchAlerts())
    }, [dispatch])

    const handleClearButton = () => {
        dispatch(deleteAlerts())
    }

    console.log(alerts);
    
    return (
        <div className='alert-page'>
            <div className='alert-container'>
                <div className='alert-title'>
                    <span>Alerts</span>
                    <button>Clear All</button>
                </div>
                <div className='alert-main-container'>
                    {
                        alerts.map((alert) => {
                            return (
                                <div className='alert-content' key={alert._id}>
                                    <span>{alert.content}</span>
                                    <span>{moment(alert.createdAt).format('DD/MM/YYYY')}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Alert
