import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import './index.css'

function Problem() {

    const [showDropdown, setShowDropdown] = useState(false);
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [updateContent, setUpdateContent] = useState('');
    const [updateCategory, setUpdateCategory] = useState('');
    const [updateStatus, setUpdateStatus] = useState('');

    const handleUpdate = () => {
        setShowDropdown(!showDropdown);
    }

    const handleCreate = () => {
        
    }

    return (
        <div className='problem-container'>
            <div className="problem-main-container">
                <div className="problem-create-section">
                    <div className="problem-create-title">
                        <span>Tell about your problem</span>
                    </div>
                    <div className='problem-create-inputs'>
                        <div className="problem-create-content">
                            <span>Content</span>
                            <input type="text" value={content} onChange={(e) => setContent(e.target.value)} autoComplete='off'/>
                        </div>
                        <div className="problem-create-category">
                            <span>Category</span>
                            <select name="" id="" value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="Infrastructure Issues">Infrastructure Issues</option>
                                <option value="Security Concerns">Security Concerns</option>
                                <option value="Utilities Problems">Utilities Problems</option>
                                <option value="Event Management">Event Management</option>
                                <option value="Financial Issues">Financial Issues</option>
                                <option value="Administrative Requests">Administrative Requests</option>
                                <option value="Dispute Resolution">Dispute Resolution</option>
                                <option value="Housekeeping Issues">Housekeeping Issues</option>
                                <option value="Parking Issues">Parking Issues</option>
                                <option value="Community Activities">Community Activities</option>
                            </select>
                        </div>
                        <div className="problem-create-button">
                            <button onClick={handleCreate}>Create</button>
                        </div>
                    </div>
                </div>
                <div className="problem-display-section">
                    <div className="problem-display-top">
                        <span>Problems</span>
                    </div>
                    <div className="problem-display-bottom">
                        <div className="problem-display-main">
                            <div className="problem-display-title">
                                <p><span>About: </span>jfbjebvk</p>
                            </div>
                            <div className="problem-display-category">
                                <p><span>Category: </span>Utilities Problems</p>
                            </div>
                            <div className='problem-display-status'>
                                <p><span>Status: </span>hwvbhj</p>
                            </div>
                            <div className="problem-display-upvotes">
                                <button><FontAwesomeIcon icon={faArrowUp} /></button>
                                <span>2</span>
                            </div>
                            <div className="problem-display-buttons">
                                <div className="problem-update-button">
                                    <button onClick={handleUpdate}>Update</button>
                                </div>
                                <div className="problem-delete-buttonm">
                                    <button>Delete</button>
                                </div>
                            </div>
                        </div>


                        {
                            showDropdown ?
                                <div className="update-container">
                                    <div className="update-title">
                                        <span>Update</span>
                                    </div>
                                    <div className='update-inputs'>
                                        <div className="update-content">
                                            <span>Content: </span>
                                            <input type="text" value={updateContent} onChange={(e) => setUpdateContent(e.target.value)}/>
                                        </div>
                                        <div className="update-category">
                                            <span>Category: </span>
                                            <select name="" id="" value={updateCategory} onChange={(e) => setUpdateCategory(e.target.value)}>
                                                <option value="Infrastructure Issues">Infrastructure Issues</option>
                                                <option value="Security Concerns">Security Concerns</option>
                                                <option value="Utilities Problems">Utilities Problems</option>
                                                <option value="Event Management">Event Management</option>
                                                <option value="Financial Issues">Financial Issues</option>
                                                <option value="Administrative Requests">Administrative Requests</option>
                                                <option value="Dispute Resolution">Dispute Resolution</option>
                                                <option value="Housekeeping Issues">Housekeeping Issues</option>
                                                <option value="Parking Issues">Parking Issues</option>
                                                <option value="Community Activities">Community Activities</option>
                                            </select>
                                        </div>
                                        <div className="update-status">
                                            <span>Status: </span>
                                            <select name="" id="" value={updateStatus} onChange={(e) => setUpdateStatus(e.target.value)}>
                                                <option value="">Incomplete</option>
                                                <option value="">Pending</option>
                                                <option value="">Complete</option>
                                            </select>
                                        </div>
                                        <div className="update-button">
                                            <button>Update</button>
                                        </div>
                                    </div>
                                </div>
                                :
                                <></>
                        }




                    </div>
                </div>
            </div>
        </div>
    )
}

export default Problem