import React, { useState } from 'react'
import { Box } from '@mui/material'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import eventRequestService from 'services/eventRequestService'
import { useLocationNavigator } from 'utils/locationNavigator'
import routes from 'constants/route-constants'

export default function CalendarPage() {
    const [events, setEvents] = useState([])
    const locationNavigator = useLocationNavigator()

    const handleDatesSet = arg => {
        const criteria = {
            startingFrom: arg.start,
            endingBefore: arg.end,
            onlyForCurrentUser: true,
            top: 100,
        }

        eventRequestService.getList(criteria).then(result => {
            const events = result.map(x => {
                return {
                    id: x.id,
                    title: x.title,
                    start: x.startDate,
                    end: x.endDate,
                }
            })
            setEvents(events)
        })
    }

    const handleEventClick = clickInfo => {
        locationNavigator.navigate(`${routes.events}/${clickInfo.event.id}`)
    }

    const scrollTime = () => {
        const now = new Date()
        return `${now.getHours() - 4}:${now.getMinutes()}:00`
    }

    const calendarBoxStyles = {
        flex: 2,
        '& .fc': {
            maxHeight: '78vh',
            margin: '0 2vw',
        },
        fontFamily: 'Arial, Helvetica Neue, Helvetica, sans-serif',
        fontSize: '14px',
    }

    return (
        <Box sx={{ flexDirection: 'row' }}>
            <Box sx={calendarBoxStyles}>
                <FullCalendar
                    plugins={[timeGridPlugin]}
                    initialView="timeGridWeek"
                    events={events}
                    headerToolbar={{
                        left: '',
                        center: 'title',
                        right: 'prev,next today',
                    }}
                    datesSet={handleDatesSet} // Handle click on prev or next week
                    eventClick={handleEventClick}
                    firstDay={1} // Set Monday as the first day of the week
                    scrollTime={scrollTime()}
                    allDaySlot={false}
                    eventTimeFormat={{
                        hour: 'numeric',
                        minute: '2-digit',
                        omitZeroMinute: false,
                        meridiem: true, // Set to false to omit AM/PM
                    }}
                />
            </Box>
        </Box>
    )
}
