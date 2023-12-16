import { ButtonGroup, Button } from '@mui/material'

export default function PaginationPanel({ previousClick, nextClick, previousDisabled, nextDisabled, title }) {
    return (
        <ButtonGroup variant="text" aria-label="text button group" sx={{ margin: '1vh auto' }} >
            <Button onClick={previousClick} disabled={previousDisabled}>&lt;</Button>
            <Button disabled>{title}</Button>
            <Button onClick={nextClick} disabled={nextDisabled}>&gt;</Button>
        </ButtonGroup>
    )
}