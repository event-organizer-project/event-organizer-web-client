import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ScheduleHeader from './ScheduleHeader'
import Schedule from './Schedule'
import calendarRequestService from 'services/calendarRequestService'

export default function CalendarPage() {

    const [week, setWeek] = useState({});

    useEffect(() => {
        calendarRequestService.get().then(result => {
            setWeek(result);
        });
    }, [])

    return (
        <Box>
            <Typography variant="h6" gutterBottom>Calendar</Typography>
            <Typography variant="subtitle2" gutterBottom>Calendar Panel</Typography>
            <ScheduleHeader weekDays={week.weekDays} />
            <Schedule schedule={week.weekDays} />
        </Box>
    )
}
