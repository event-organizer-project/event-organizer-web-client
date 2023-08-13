import { Box, Typography } from '@mui/material';
import DaySchedule from './DaySchedule'

export default function Schedule({ schedule }) {

    const hours = Array.from({ length: 24 }, (_, index) => index);

    const wrapperStyle = {
        display: 'flex',
        width: "100%",
        height: '64.35vh',
        overflow: 'auto'
    }

    const columnStyle = {
        flex: 1,
        display: 'table',
        flexDirection: 'column',
        borderLeft: '1px solid lightgray',
        "&:first-child": {
            borderLeft: 0,
        }
    }

    const hourStyle = {
        display: 'flex',
        justifyContent: 'right',
        width: '4vw',
        height: '50px',
        borderBottom: '1px solid lightgray'
    }

    return schedule && (
        <Box sx={wrapperStyle}>
            <Box>
                {hours.map((hour) => <Box sx={hourStyle} key={hour}>
                    <Typography>{hour}:00</Typography>
                </Box>)}
            </Box>
            {schedule.map((day) => <Box sx={columnStyle} key={day.weekDay}>
                <DaySchedule events={day.events} />
            </Box>)}
        </Box>
    )
}
