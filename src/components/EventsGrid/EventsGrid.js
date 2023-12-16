import { useState, useEffect } from 'react';
import { Box, Grid, ButtonGroup, Button } from '@mui/material'
import EventView from '../EventView/EventView'
import PaginationPanel from '../PaginationPanel/PaginationPanel'

export default function EventsGrid({ events, itemsPerPageCount, height }) {

    const [page, setPage] = useState({
        items: [],
        currentPage: 0,
        pageCount: 0
    })

    useEffect(() => {
        if (events)
            setPage({
                items: events.slice(0, itemsPerPageCount),
                currentPage: events.length == 0 ? 0 : 1,
                pageCount: Math.ceil(events.length / itemsPerPageCount)
            })
    }, [events])

    const previous = (e) => {
        e.preventDefault();

        const newCurrentPage = page.currentPage - 1;
        const newPage = {
            items: events.slice((newCurrentPage - 1) * itemsPerPageCount, newCurrentPage * itemsPerPageCount),
            currentPage: newCurrentPage,
            pageCount: page.pageCount
        };

        setPage(newPage);
    }

    const next = (e) => {
        e.preventDefault();

        const newCurrentPage = page.currentPage + 1;
        const newPage = {
            items: events.slice(page.currentPage * itemsPerPageCount, newCurrentPage * itemsPerPageCount),
            currentPage: newCurrentPage,
            pageCount: page.pageCount
        };

        setPage(newPage);
    }

    return events && (
        <Box display='flex' flexDirection='column' justifyContent='space-between' height={height}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 3, sm: 8, md: 12 }} style={{ width: '95vw' }}>
                {page.items.map(event => (
                    <Grid item xs={2} sm={4} md={4} key={event.id}>
                        <EventView event={event} />
                    </Grid>
                ))}
            </Grid>
            <PaginationPanel
                previousClick={previous} 
                nextClick={next}
                previousDisabled={page.currentPage <= 1}
                nextDisabled={page.currentPage == page.pageCount}
                title={`${page.currentPage} / ${page.pageCount}`}
            />
        </Box>
    )
}