import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EventsGrid from 'components/EventsGrid/EventsGrid'
import eventRequestService from 'services/eventRequestService'
import routes from 'constants/route-constants'

export default function OwnEventsPage() {

    const [ownEvents, setOwnEvents] = useState(null);

    useEffect(() => {
        eventRequestService.getOwnEvents()
            .then(result => {
                setOwnEvents(result);
            });
    }, [])

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '36vh',
        justifyContent: 'space-between',
        padding: '2vh 0'
    }

    return ownEvents && (
        <Box>
            <Box style={containerStyle}>
                <Box display='flex'>
                    <Typography variant='h5' gutterBottom padding='6px 2px'>
                        Created events
                    </Typography>
                    <IconButton component={Link} to={`${routes.events}/0`} style={{ height: 'fit-content' }}>
                        <AddCircleOutlineIcon />
                    </IconButton>
                </Box>

                <EventsGrid events={ownEvents.createdEvents} itemsPerPageCount={3}/>
            </Box>
            
            <Box style={containerStyle}>
                <Typography variant='h5' gutterBottom >Joined  events</Typography>
                <EventsGrid events={ownEvents.joinedEvents} itemsPerPageCount={3}/>
            </Box>
        </Box>
    )
}