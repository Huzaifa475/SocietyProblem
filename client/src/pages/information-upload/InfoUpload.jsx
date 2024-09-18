import React, { useState } from 'react'
import axios from 'axios'
import {toast, Toaster} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import './index.css'

function InfoUpload() {

    const [phone, setPhone] = useState('');
    const [societyName, setSocietyName] = useState('');
    const [admin, setAdmin] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');

    const handleSubmit = async () => {
        let information = {}

        if(phone.length !== 10){
            return toast.error("Invalid phone number");
        }
        information.phone = parseInt(phone)
        information.societyName = societyName.toLowerCase();
        if(admin === "yes")
            information.admin = true
        else
            information.admin = false
        information.address = address
        try {
            const res = await axios({
                method: 'post',
                url: '/api/v1/users/information-upload',
                data: {
                    phone: information.phone,
                    address: information.address,
                    admin: information.admin,
                    societyName: information.societyName
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            }) 
            toast.success(res?.data?.message);
            setTimeout(() => {
                navigate('/')
            }, 500);
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

        setPhone('');
        setSocietyName('');
        setAddress('');
        setAdmin('');
    }
    return (
        <div className='info-container'>
            <div className='info-main-container'>
                <div className="phone-container default-container">
                    <span>Phone Number</span>
                    <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete='off'/>
                </div>
                <div className="society-name-container default-container">
                    <span>Society Name</span>
                    <input type="text" value={societyName} onChange={(e) => setSocietyName(e.target.value)} autoComplete='off'/>
                </div>
                <div className="admin-container default-container">
                    <span>Are you Admin?</span>
                    <select name="" id="" value={admin} onChange={(e) => setAdmin(e.target.value)}>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <div className="address-container default-container">
                    <span>Address</span>
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} autoComplete='off'/>
                </div>
                <div className="submit-button default-container">
                    <button onClick={handleSubmit}>Submit</button>
                    <Toaster/>
                </div>
            </div>
        </div>
    )
}

export default InfoUpload
