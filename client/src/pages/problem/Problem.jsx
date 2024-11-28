import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import './index.css'
import { createProblem, deleteProblem, fetchProblems, updateProblem, updateUpvote } from '../../redux/problemSlice'
import moment from 'moment'
import { Toaster } from 'react-hot-toast'

function Problem() {

    const [showDropdown, setShowDropdown] = useState(false);
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('Infrastructure Issues');
    const [updateContent, setUpdateContent] = useState('');
    const [updateCategory, setUpdateCategory] = useState('');
    const [updateStatus, setUpdateStatus] = useState('');
    const { problems, loading, error } = useSelector(state => state.problem)
    const [selectedProblem, setSelectedProblem] = useState(null)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProblems());
    }, [dispatch])
    
    const handleCreate = () => {
        dispatch(createProblem({ content, category }));
        setContent('')
        setCategory('Infrastructure Issues')
    }
    
    const handleShowDropdown = (problem) => {
        if (selectedProblem === problem._id) {
            setSelectedProblem(null);
            setShowDropdown(false)
        } else {
            setSelectedProblem(problem._id);
            setShowDropdown(true);
        }
    }

    const handleUpdate = (problemId) => {
        dispatch(updateProblem({ content: updateContent, category: updateCategory, status: updateStatus }, problemId))
        updateContent('')
        updateCategory('Infrastructure Issues')
        updateStatus('Incomplete')
        setShowDropdown(false)
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
                            <input type="text" value={content} onChange={(e) => setContent(e.target.value)} autoComplete='off' />
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
                        {
                            problems && problems.length > 0 ? (
                                problems.map((problem) => (
                                    <div className="problem-display-main" key={problem._id}>
                                        <div className="problem-display-title">
                                            <p><span>About: </span>{problem.content}</p>
                                        </div>
                                        <div className="problem-display-category">
                                            <p><span>Category: </span>{problem.category}</p>
                                        </div>
                                        <div className='problem-display-status'>
                                            <p><span>Status: </span>{problem.status}</p>
                                        </div>
                                        <div className="problem-display-created-at">
                                            <p><span>CreatedAt: </span>{moment(problem.createdAt).format('LLL')}</p>
                                        </div>
                                        <div className="problem-display-upvotes">
                                            <button onClick={() => dispatch(updateUpvote(problem.upvote, problem?._id))}><FontAwesomeIcon icon={faArrowUp} /></button>
                                            <span>{problem.upvote}</span>
                                        </div>
                                        <div className="problem-display-buttons">
                                            <div className="problem-update-button">
                                                <button onClick={() => handleShowDropdown(problem)}>Update</button>
                                            </div>
                                            <div className="problem-delete-buttonm">
                                                <button onClick={() => dispatch(deleteProblem(problem?._id))}>Delete</button>
                                            </div>
                                        </div>
                                        {
                                            showDropdown && selectedProblem === problem._id &&
                                                <div className="update-container">
                                                    <div className="update-title">
                                                        <span>Update</span>
                                                    </div>
                                                    <div className='update-inputs'>
                                                        <div className="update-content">
                                                            <span>Content: </span>
                                                            <input type="text" value={updateContent} onChange={(e) => setUpdateContent(e.target.value)} />
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
                                                                <option value="Incomplete">Incomplete</option>
                                                                <option value="Ongoing">Ongoing</option>
                                                                <option value="Completed">Completed</option>
                                                            </select>
                                                        </div>
                                                        <div className="update-button">
                                                            <button onClick={() => handleUpdate(problem._id)}>Update</button>
                                                        </div>
                                                    </div>
                                                </div>
                                        }
                                    </div>
                                ))
                            )
                            :
                            (
                                <div>No Problem Fetch</div>
                            )
                        }
                    </div>
                </div>
            </div >
            <Toaster/>
        </div >
    )
}

export default Problem