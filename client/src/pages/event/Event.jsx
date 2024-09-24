import React, { useEffect, useState, Suspense, lazy } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './index.css'
import moment from 'moment'
import { createEvent, deleteEvent, fetchEvents, updateEvent } from '../../redux/eventSlice.js'
import {Toaster} from 'react-hot-toast'

const EventCalendar = lazy(() => import('./calendar/EventCalendar.jsx'));

function Event() {

  const [showDropdown, setShowDropdown] = useState(false)
  const [title, setTitle] = useState('')
  const [discription, setDiscription] = useState('')
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const dispatch = useDispatch()
  const { events, loading, error } = useSelector(state => state.event)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [updateTitle, setUpdateTitle] = useState('')
  const [updateDiscription, setUpdateDiscription] = useState('')
  const [updateLocation, setUpdateLocation] = useState('')
  const [updateOnDate, setUpdateOnDate] = useState('')

  useEffect(() => {
    dispatch(fetchEvents())
  }, [])

  const handleCreateClick = () => {
    const onDate = date
    dispatch(createEvent({ title, discription, location, onDate }))

    setTitle('')
    setDiscription('')
    setLocation('')
    setDate('')
  }

  const handleShowDropdown = (event) => {
    if (selectedEvent === event._id) {
      setSelectedEvent(null)
      setShowDropdown(false)
    }
    else {
      setSelectedEvent(event._id)
      setShowDropdown(true)
    }
  }

  const handleUpdate = (event) => {
    dispatch(updateEvent({ updateTitle, updateDiscription, updateLocation, updateOnDate }, event._id))
    setUpdateTitle('')
    setUpdateDiscription('')
    setLocation('')
    setUpdateOnDate('')

    setShowDropdown(!showDropdown)
  }
  return (
    <div className="event-container">
      <div className="event-main-container">
        <div className="event-left-container">
          <Suspense fallback={<div>Loading Calendar...</div>}>
            <EventCalendar events={events} />
          </Suspense>
          <div className="event-bottom-container">
            <div className="event-create-title">
              <span>Title</span>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} autoComplete='off' />
            </div>
            <div className="event-create-discription">
              <span>Description</span>
              <input type="text" value={discription} onChange={(e) => setDiscription(e.target.value)} autoComplete='off' />
            </div>
            <div className="event-create-location">
              <span>Location</span>
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} autoComplete='off' />
            </div>
            <div className="event-create-ondate">
              <span>Date</span>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="event-create-button">
              <button onClick={handleCreateClick}>Create</button>
            </div>
          </div>
        </div>
        <div className="event-display-section">
          <div className="event-display-top">
            <span>Events</span>
          </div>
          <div className="event-display-bottom">
            {
              events && events.length > 0 ? (
                events.map((event) => (
                  <div className="event-display-main" key={event._id}>
                    <div className="event-display-title">
                      <p><span>Title: </span>{event.title}</p>
                    </div>
                    <div className="event-display-discription">
                      <p><span>Discription: </span>{event.description}</p>
                    </div>
                    <div className='event-display-location'>
                      <p><span>Location: </span>{event.location}</p>
                    </div>
                    <div className="event-display-on-date">
                      <p><span>onDate: </span>{moment(event.onDate).format('LLL')}</p>
                    </div>
                    <div className="event-display-buttons">
                      <div className="event-update-button">
                        <button onClick={() => handleShowDropdown(event)}>Update</button>
                      </div>
                      <div className="event-delete-buttonm">
                        <button onClick={() => dispatch(deleteEvent(event?._id))}>Delete</button>
                        <Toaster/>
                      </div>
                    </div>
                    {
                      showDropdown && selectedEvent === event._id &&
                      <div className="update-event-container">
                        <div className="update-header-container">
                          <span>Update</span>
                        </div>
                        <div className="update-title-container">
                          <span>Title: </span>
                          <input type="text" value={updateTitle} onChange={(e) => setUpdateTitle(e.target.value)} autoComplete='off' />
                        </div>
                        <div className="update-discription-container">
                          <span>Discription: </span>
                          <input type="text" value={updateDiscription} onChange={(e) => setUpdateDiscription(e.target.value)} autoComplete='off' />
                        </div>
                        <div className="update-location-container">
                          <span>Location: </span>
                          <input type="text" value={updateLocation} onChange={(e) => setUpdateLocation(e.target.value)} autoComplete='off' />
                        </div>
                        <div className="update-date-container">
                          <span>Date: </span>
                          <input type="date" value={updateOnDate} onChange={(e) => setUpdateOnDate(e.target.value)} autoComplete='off' />
                        </div>
                        <div className="update-submit-container">
                          <button onClick={() => handleUpdate(event)}>Update</button>
                        </div>
                      </div>
                    }
                  </div>
                ))
              )
                :
                (
                  <div>No event Fetch</div>
                )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Event