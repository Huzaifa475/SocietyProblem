import React, { useEffect, useState } from 'react'
import { useDispatch , useSelector} from 'react-redux';
import './index.css'
import { fetchProfile, updateProfile } from '../../../redux/profileSlice'

function ProfileContent() {

  const [showDropdown, setShowDropdown] = useState(false);
  const {profile, loading, error} = useSelector(state => state.profile)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [societyName, setSocietyName] = useState('')
  const [address, setAddress] = useState('')
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch])
  
  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  }

  return (
    <div className="profile-container">
      <div className="profile-main-container">
        <div className="profile-display-section">
          <div className="profile-img-display-container">
            {
              profile.photo ? 
              <img src={profile.photo} alt="" />
              :
              <img src='https://www.verizon.com/learning/mcgraw-hill' alt="" />
            }
          </div>
          <div className="profile-info-container">
            <div className="profile-name">
              <p><span>Name: </span>{profile.name}</p>
            </div>
            <div className="profile-email">
              <p><span>Email: </span>{profile.email}</p>
            </div>
            <div className="profile-phone">
              <p><span>Phone: </span>{profile.phone}</p>
            </div>
            <div className="profile-society-name">
              <p><span>Society: </span>{profile.societyName}</p>
            </div>
            <div className="profile-address">
              <p><span>Address: </span>{profile.address}</p>
            </div>
            <div className="profile-update-button">
              <button onClick={handleDropdown}>Update</button>
            </div>
          </div>
        </div>
        {
          showDropdown && (
            <div className="profile-update-section">
              <div className="update-name">
                <span>Name</span>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} autoComplete='off'/>
              </div>
              <div className="update-email">
                <span>Email</span>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete='off'/>
              </div>
              <div className="update-phone">
                <span>Phone</span>
                <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete='off'/>
              </div>
              <div className="update-society-name">
                <span>Society Name</span>
                <input type="text" value={societyName} onChange={(e) => setSocietyName(e.target.value)} autoComplete='off'/>
              </div>
              <div className="update-address">
                <span>Address</span>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} autoComplete='off'/>
              </div>
              <div className="update-submit-button">
                <button onClick={() => dispatch(updateProfile({name, email, phone, societyName, address}))}>Submit</button>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default ProfileContent