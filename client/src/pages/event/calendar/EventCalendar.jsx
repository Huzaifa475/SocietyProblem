import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import './index.css'

const localizer = momentLocalizer(moment);

function EventCalendar() {
    return (
            <Calendar
                localizer={localizer}
                // style={{ width: 400, height: 400 }}
                startAccessor="start"
                endAccessor="end"
                views={['month', 'week', 'day']}
                defaultView="month"
            />
    )
}

export default EventCalendar
