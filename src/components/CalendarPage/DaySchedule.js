import { Box } from '@mui/material';
import CalendarEventPreview from './CalendarEventPreview'

export default function DaySchedule({ events }) {
    
    const hours = Array.from({ length: 24 }, (_, index) => index);

    const wrapperStyle = {
        display: 'flex',
        width: "100%",
        position: 'relative'
    }

    const hourStyle = {
        display: 'flex',
        justifyContent: 'right',
        width: '100%',
        height: '50px',
        borderBottom: '1px solid lightgray'
    }

    return events && (
        <Box sx={wrapperStyle}>
            <Box sx={{ width: '100%' }}>
                {hours.map(hour => <Box sx={hourStyle} key={hour}></Box>)}
            </Box>
            {events.map(event => <CalendarEventPreview event={event} key={event.id}/>)}
        </Box>
    )
}
