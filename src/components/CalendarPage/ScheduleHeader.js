import { Box, Typography } from '@mui/material';
import { useDateFormatter } from 'utils/dateFormatter'

export default function ScheduleHeader({ weekDays }) {

    const dateFormatter = useDateFormatter();

    const wrapperStyle = {
        display: 'flex',
        width: "100%"
    }

    const columnStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        borderLeft: '1px solid lightgray',
        borderTop: '1px solid lightgray',
        borderBottom: '1px solid lightgray',
        "&:first-child": {
            borderLeft: 0,
        },
        padding: '0 5px'
    }

    return weekDays && (
        <Box sx={wrapperStyle}>
            <Box sx={{ width: "4vw", borderBottom: '1px solid lightgray' }}></Box>
            {weekDays.map((day, index) => <Box sx={columnStyle} key={day.date}>
                <Typography>{dateFormatter.getDay(day.date)}</Typography>
                <Typography>{day.weekDay}</Typography>
            </Box>)}
            <Box sx={{ width: "17px", borderBottom: '1px solid lightgray', borderTop: '1px solid lightgray' }}></Box>
        </Box>
    )
}
