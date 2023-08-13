import { Card, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import EventPositionCalculator from 'utils/eventPositionCalculator'

export default function CalendarEventPreview({ event }) {

    const positionCalculator = new EventPositionCalculator();

    const [eventStyle, seteventStyle] = useState({
        background: '#d7e4fa',
        position: 'absolute',
        top: '25%',
        bottom: '45%',
        width: '95%'
    });

    useEffect(() => {
        if (event) {
            const positionStyle = positionCalculator.calculatePosition(event);
            seteventStyle({ ...eventStyle, ...positionStyle })
        }
    }, [])

    return event && (
        <Card sx={eventStyle}>
                <Stack lineHeight={1} margin='auto 10px'>
                    <Typography fontWeight={400} fontSize='0.9em'> {event.title}</Typography>
                    <Typography fontWeight={100} fontSize='0.8em'> {event.description}</Typography>
                </Stack>
        </Card>
    )
}