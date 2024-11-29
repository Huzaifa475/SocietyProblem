import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './index.css'
import { fetchProfile, updateProfile } from '../../../redux/profileSlice'
import { toast, Toaster } from 'react-hot-toast';

function ProfileContent() {

  const [showDropdown, setShowDropdown] = useState(false);
  const [showUploadDropdown, setShowUploadDropdow] = useState(false);
  const { profile, loading, error } = useSelector(state => state.profile)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [societyName, setSocietyName] = useState('')
  const [address, setAddress] = useState('')
  const [selectedFile, setSelectedFile] = useState('')
  const dispatch = useDispatch()
  const accessToken = localStorage.getItem('accessToken')

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch])

  const handleDropdown = () => {
    setShowUploadDropdow(false)
    setShowDropdown(!showDropdown);
  }

  const handleUpdateProfile = () => {
    dispatch(updateProfile({ name, email, phone, address, societyName }))

    setName('')
    setEmail('')
    setPhone('')
    setSocietyName('')
    setAddress('')
  }

  const handleUploadDropdown = () => {
    setShowDropdown(false);
    setShowUploadDropdow(!showUploadDropdown);
  }

  const handleFileSelect = async (e) => {
    e.preventDefault()
    const file = e.target.files[0]

    if (file) {
      setSelectedFile(file)

      const render = new FileReader()
      render.onloadend = () => {
        console.log('File read successfully');
      }
      render.readAsDataURL(file)
    }
  }

  const uploadImage = async (e) => {
    e.preventDefault();
    try {
      if (!selectedFile) {
        throw new Error('Select a File');
      }

      const formData = new FormData();
      formData.append('photo', selectedFile);

      const response = await fetch('/api/v1/users/uploadPhoto', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data`',
          'Authorization': `Bearer ${accessToken}`
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error('Failed to upload image', errorData);
      }
      toast.success(response.statusText)
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-main-container">
        <div className="profile-display-section">
          <div className="profile-img-display-container">
            {
              profile.photo ?
                <img src={profile.photo} alt="" />
                :
                <img src="https://via.placeholder.com/150?text=No+Profile+Image" alt="" />
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
              <button onClick={handleUploadDropdown}>UploadImage</button>
            </div>
          </div>
        </div>
        {
          showDropdown && (
            <div className="profile-update-section">
              <div className="update-name">
                <span>Name</span>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} autoComplete='off' />
              </div>
              <div className="update-email">
                <span>Email</span>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete='off' />
              </div>
              <div className="update-phone">
                <span>Phone</span>
                <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete='off' />
              </div>
              <div className="update-society-name">
                <span>Society Name</span>
                <input type="text" value={societyName} onChange={(e) => setSocietyName(e.target.value)} autoComplete='off' />
              </div>
              <div className="update-address">
                <span>Address</span>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} autoComplete='off' />
              </div>
              <div className="update-submit-button">
                <button onClick={() => handleUpdateProfile()}>Submit</button>
              </div>
            </div>
          )
        }
        {
          showUploadDropdown && (
            <div className="img-upload-container">
              <form onSubmit={uploadImage}>
                <input type="file" accept='image/*' onChange={handleFileSelect} required />
                <br /><br />
                <button type='submit'>Upload Image</button>
              </form>
            </div>
          )
        }
      </div>
      <Toaster />
    </div>
  )
}

export default ProfileContent