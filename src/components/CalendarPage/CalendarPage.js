import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import ScheduleHeader from './ScheduleHeader'
import Schedule from './Schedule'
import PaginationPanel from '../PaginationPanel/PaginationPanel'
import calendarRequestService from 'services/calendarRequestService'
import { useDateFormatter } from 'utils/dateFormatter'

export default function CalendarPage() {

    const [week, setWeek] = useState({});
    const [offset, setOffset] = useState(0);
    const dateFormatter = useDateFormatter();

    useEffect(() => {
        getWeek();
    }, [])

    const getWeek = (offset = 0) => calendarRequestService
        .get(offset).then(result => {
            setWeek(result);
            setOffset(offset);
        });

    const weekTitle = () => {
        if (!week.weekDays)
            return '';

        const weekStart = dateFormatter.getMonthWithYear(week.weekDays.at(0).date);
        const weekEnd = dateFormatter.getMonthWithYear(week.weekDays.at(-1).date);

        return weekStart === weekEnd
            ? weekStart
            : `${weekStart} - ${weekEnd}`
    }

    return (
        <Box>
            <Box display='flex' width='100%'>
                <PaginationPanel    
                    previousClick={() => getWeek(offset - 1)} 
                    nextClick={() => getWeek(offset + 1)}
                    title={weekTitle()}
                />
                <Button onClick={() => getWeek()} disabled={offset == 0}>Current Week</Button>
            </Box>
            <ScheduleHeader weekDays={week.weekDays} />
            <Schedule schedule={week.weekDays} />
        </Box>
    )
}
