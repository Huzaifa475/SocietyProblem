import React, { useState } from 'react'
import './index.css'

function ProfileContent() {

  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  }
  return (
    <div className="profile-container">
      <div className="profile-main-container">
        <div className="profile-display-section">
          <div className="profile-img-display-container">
            <img src="" alt="" />
          </div>
          <div className="profile-info-container">
            <div className="profile-name">
              <p><span>Name: </span>Sujal</p>
            </div>
            <div className="profile-email">
              <p><span>Email: </span>11@xjb</p>
            </div>
            <div className="profile-phone">
              <p><span>Phone: </span>4628958561</p>
            </div>
            <div className="profile-society-name">
              <p><span>Society: </span>dkwqfkj</p>
            </div>
            <div className="profile-address">
              <p><span>Address: </span>ehfuegu</p>
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
                <input type="text" />
              </div>
              <div className="update-email">
                <span>Email</span>
                <input type="text" />
              </div>
              <div className="update-phone">
                <span>Phone</span>
                <input type="number" />
              </div>
              <div className="update-society-name">
                <span>Society Name</span>
                <input type="text" />
              </div>
              <div className="update-address">
                <span>Address</span>
                <input type="text" />
              </div>
              <div className="update-submit-button">
                <button>Submit</button>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default ProfileContent