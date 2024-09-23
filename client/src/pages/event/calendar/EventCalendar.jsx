import React, { useEffect, useState, useRef } from 'react';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import './index.css'

function ServerDay(props) {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

    const isSelected =
        !outsideCurrentMonth && highlightedDays.some(highlightedDay => day.isSame(highlightedDay, 'day'));

    return (
        <Badge
            key={day.toString()}
            overlap="circular"
            badgeContent={isSelected ? '🌟' : undefined}
            color="primary"
        >
            <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
        </Badge>
    );
}

function EventCalendar({ events }) {
    const [highlightedDays, setHighlightedDays] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const requestAbortController = useRef(null);

    useEffect(() => {
        const eventDates = events.map(event => dayjs(event.onDate));
        setHighlightedDays(eventDates);
    }, [events]);

    const handleMonthChange = (date) => {
        if (requestAbortController.current) {
            requestAbortController.current.abort();
        }
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    };

    return (
        <div className='calendar-container'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                    loading={isLoading}
                    onMonthChange={handleMonthChange}
                    renderLoading={() => <DayCalendarSkeleton />}
                    slots={{
                        day: ServerDay
                    }}
                    slotProps={{
                        day: {
                            highlightedDays
                        },
                    }}
                />
            </LocalizationProvider>
        </div>
    );
}

export default EventCalendar