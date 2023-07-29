import { useState } from 'react';
import { Box } from '@mui/material';
import EventSearchPanel from 'components/AllEventsPage/EventSearchPanel'
import EventsGrid from 'components/EventsGrid/EventsGrid'
import eventRequestService from 'services/eventRequestService'

export default function AllEventsPage() {

    const itemsPerPageCount = 9;

    const [events, setEvents] = useState(null);

    const getEvents = (params) => {

        let criteria = {
            ...params,
            top: 100,
            skip: 0
        }

        eventRequestService.getList(criteria)
            .then(result => {
                setEvents(result);
            });
    }

    return (
        <Box>
            <EventSearchPanel getEventList={getEvents} />

            <EventsGrid events={events} itemsPerPageCount={itemsPerPageCount} height='70vh' />
        </Box>
    )
}