import React, { useEffect, useState } from 'react'
import { PieChart } from '@mui/x-charts/PieChart'
import { useDispatch, useSelector } from 'react-redux'
import './index.css'
import { fetchSocity, fetchTotalEvents, fetchTotalProblems } from '../../redux/analyticsSlice'
import axios from 'axios'
import { Stack, Skeleton } from '@mui/material'
import useResponsiveSize from '../../hook/useResponsiveSize/useResponsiveSize.jsx'

function Analytics() {

  const [showDropdown, setShowDropdown] = useState(false)
  const dispatch = useDispatch()
  const { societyMembers, totalProblems, totalEvents, completedProblems, incompleteProblems, pendingProblems, totalMembers, loading, error } = useSelector(state => state.analytics)
  const [uid, setUid] = useState('')
  const {width, height} = useResponsiveSize()

  useEffect(() => {
    dispatch(fetchSocity())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchTotalProblems())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchTotalEvents())
  }, [dispatch])

  const handleDropdown = () => {
    setShowDropdown(!showDropdown)
  }

  const handleChangeAdmin = async () => {
    const accessToken = localStorage.getItem('accessToken')
    try {
      const res = await axios({
        method: 'patch',
        url: '/api/v1/users/change-admin',
        data: {
          userId: uid
        },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      })
    } catch (error) {
      console.log(error);
    }
    setUid('')
  }

  if (loading) {
    return (
      < div className="analytics-container" >
        <div className="analytics-main-container">
          <div className="analytics-top-container">
            <div className="analytics-pie-container">
              <span>Problem analytics of society</span>
            </div>
            <div className="analytics-right-container">
              <div className="analytics-total-container">
                <div className="analytics-total-members">
                  <span>Total Members</span>
                </div>
                <div className="analytics-total-problems">
                  <span>Total Problems</span>
                </div>
                <div className="analytics-total-events">
                  <span>Total Events</span>
                </div>
              </div>
            </div>
          </div>
          <Stack className="analytics-bottom-container">
            <Skeleton className='analytics-display-members-container' style={{backgroundColor: 'silver'}}/>
            <Skeleton className='analytics-display-members-container' style={{backgroundColor: 'silver'}}/>
            <Skeleton className='analytics-display-members-container' style={{backgroundColor: 'silver'}}/>
            <Skeleton className='analytics-display-members-container' style={{backgroundColor: 'silver'}}/>
            <Skeleton className='analytics-display-members-container' style={{backgroundColor: 'silver'}}/>
          </Stack>
        </div>
      </div >
    )
  }

  if(error){
    return (
      < div className="analytics-container" >
        <div className="analytics-main-container">
          <div className="analytics-top-container">
            <div className="analytics-pie-container">
              <span>Problem analytics of society</span>
            </div>
            <div className="analytics-right-container">
              <div className="analytics-total-container">
                <div className="analytics-total-members">
                  <span>Total Members</span>
                </div>
                <div className="analytics-total-problems">
                  <span>Total Problems</span>
                </div>
                <div className="analytics-total-events">
                  <span>Total Events</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            Something went wrong
          </div>
        </div>
      </div >
    )
  }

  return (
    <div className="analytics-container">
      <div className="analytics-main-container">
        <div className="analytics-top-container">
          <div className="analytics-pie-container">
            <span>Problem analytics of society</span>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: completedProblems, label: 'complete', color: '#2d4052' },
                    { id: 1, value: incompleteProblems, label: 'incomplete', color: '#98b1cb' },
                    { id: 2, value: pendingProblems, label: 'pending', color: '#3880cd' }
                  ]
                }
              ]}
              width={width}
              height={height}
            />
          </div>
          <div className="analytics-right-container">
            <div className="analytics-total-container">
              <div className="analytics-total-members">
                <span>Total Members</span>
                <span>{totalMembers}</span>
              </div>
              <div className="analytics-total-problems">
                <span>Total Problems</span>
                <span>{totalProblems}</span>
              </div>
              <div className="analytics-total-events">
                <span>Total Events</span>
                <span>{totalEvents}</span>
              </div>
            </div>
            <div className="analytics-change-admin-container">
              <div className="analytics-change">
                <button onClick={handleDropdown}>Change admin</button>
              </div>
              {
                showDropdown &&
                <>
                  <div className="analytics-admin-input">
                    <span>New Admin Id</span>
                    <input type="text" value={uid} onChange={(e) => setUid(e.target.value)} autoComplete='off' />
                  </div>
                  <div className="analytics-admin-button">
                    <button onClick={handleChangeAdmin}>Change</button>
                  </div>
                </>
              }
            </div>
          </div>
        </div>
        <div className="analytics-bottom-container">
          {
            societyMembers && societyMembers.length > 0 &&
            societyMembers.map((member) => {
              return (
                <div className="analytics-display-members-container" key={member._id}>
                  <div className="analytics-member-name">
                    <span>{`Name: ${member.name}`}</span>
                  </div>
                  <div className="analytics-member-id">
                    <span>{`Id: ${member._id}`}</span>
                  </div>
                  <div className="analytics-member-address">
                    <span>{`Flat-location: ${member.address}`}</span>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Analytics