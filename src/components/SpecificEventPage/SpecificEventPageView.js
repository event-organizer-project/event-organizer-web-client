import { Box, Grid, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventTagList from 'components/EventTagList/EventTagList'
import UserView from 'components/UserView/UserView'
import UserViewList from 'components/UserViewList/UserViewList'
import EventOptionsMenu from './EventOptionsMenu'
import { mapEnumToString } from 'mappers/recurrence-type-mapper'
import { useLocationNavigator } from 'utils/locationNavigator'
import { useDateFormatter } from 'utils/dateFormatter'
import EventSearchUrlBuilder from 'utils/eventSearchUrlBuilder'

export default function SpecificEventPageView({ event, setEvent, toUpdateMode }) {
    
    const locationNavigator = useLocationNavigator();
    const dateFormatter = useDateFormatter();

    const startDay = dateFormatter.getDayFullFormat(event?.startDate);
    const endDay = dateFormatter.getDayFullFormat(event?.endDate);

    const onTagClick = (tag) => {
        const url = new EventSearchUrlBuilder()
            .addTag(tag)
            .build();
        
        locationNavigator.navigate(url);
    }

    const timeIcon = <AccessTimeIcon sx={{ height: "0.5em", width: '0.5em', m: '0 0.1em 0 0.15em'}} />;

    return event && (
        <Box>
            <Box display='flex'>
                <Typography variant='h5' gutterBottom padding='6px 2px'>
                    {event.title}
                </Typography>
                <EventOptionsMenu
                    toUpdateEvent={toUpdateMode}
                    event={event}
                    setEvent={setEvent}
                />
            </Box>
            <Grid container spacing={2} width='100vw'>
                <Grid item xs={12} sm={5}>
                    <Typography variant="h6" gutterBottom>Details:</Typography>

                    <Typography variant="subtitle2">Description:</Typography>
                    <Typography style={{whiteSpace: 'pre-line'}} >{event.description}</Typography>

                    <Typography variant="subtitle2">Date:</Typography>
                    <Typography>{startDay}{timeIcon}{dateFormatter.getTime(event.startDate)} — {startDay != endDay && <span>{endDay}{timeIcon}</span>}
                        {dateFormatter.getTime(event.endDate)}
                    </Typography>

                    <Typography variant="subtitle2">Recurrence:</Typography>
                    <Typography>{mapEnumToString(event.recurrenceType)}</Typography>

                    <Typography variant="subtitle2">Tags:</Typography>
                    <EventTagList tags={event.eventTags} onClick={onTagClick} />

                    <Typography variant="subtitle2">Owner:</Typography>
                    <UserView user={event.owner} />

                </Grid>

                <Grid item xs={12} sm={4}>
                    <Typography variant="h6" gutterBottom>Atachments:</Typography>
                </Grid>

                <Grid item xs={12} sm={3}>
                    <Typography variant="h6" gutterBottom>Members:</Typography>
                    <UserViewList users={event.members} />
                </Grid>

            </Grid>
        </Box>
    )
}
