import { useState } from 'react';
import { Box, Card, IconButton, Typography } from '@mui/material'
import EventTagList from 'components/EventTagList/EventTagList'
import routes from 'constants/route-constants'
import EventSearchUrlBuilder from 'utils/eventSearchUrlBuilder'
import { useLocationNavigator } from 'utils/locationNavigator'
import TouchAppIcon from '@mui/icons-material/TouchApp';

export default function EventView ({ event }) {

    const locationNavigator = useLocationNavigator();

    const [isTouchIconShown, setIsTouchIconShown] = useState(false);

    const onTagClick = (tag) => {
        const tags = locationNavigator.getTagsFromUrl();

        if (tags.includes(tag))
            return;

        const url = new EventSearchUrlBuilder()
            .addTags(tags)
            .addTag(tag)
            .build();
        
        locationNavigator.navigate(url);
    }

    const eventViewSX = {
        boxShadow: 1,
        borderRadius: 3,
        p: 1,
        maxWidth: 300,
        height: 120,
        margin: "auto"
    }

    const descriptionSX = {
        lineHeight: '1.5em',
        height: '3em',
        overflow: 'hidden',
        whiteSpace: 'pre-line'
    }

    const titleSX = {
        fontWeight: 'bold',
        lineHeight: '1.5em',
        height: '1.5em',
        overflow: 'hidden',
        whiteSpace: 'pre-line'
    }
    const iconButtonSx = { padding: 0, color: 'black', visibility: !isTouchIconShown && 'hidden' }

    return (
        <Card sx={eventViewSX}
            onMouseEnter={() => setIsTouchIconShown(true)}
            onMouseLeave={() => setIsTouchIconShown(false)}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={titleSX}>{event.title}</Typography>
            
                <IconButton sx={iconButtonSx} 
                    onClick={() => locationNavigator.navigate(`${routes.events}/${event.id}`)}>
                    <TouchAppIcon sx={{ height: '0.7em',  }}/>
                </IconButton>
            </Box>
            <Box>
                <Typography sx={descriptionSX}>{event.description}</Typography>
            </Box>
            <Box sx={{height: '3em', display: 'flex', flexDirection: 'column-reverse' }}>
                <EventTagList tags={event.eventTags} onClick={onTagClick} />
            </Box>
        </Card>
    )
}