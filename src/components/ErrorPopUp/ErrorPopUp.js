import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Snackbar, Alert } from '@mui/material'
import { removeError } from 'store/generalSlice'

export default function ErrorPopUp() {
    const dispatch = useDispatch()

    const error = useSelector(state => state.general.error)
    const [errorText, setErrorText] = useState('')

    useEffect(() => {
        if (error) {
            setErrorText(error)
        }
    }, [error])

    const styles = {
        position: 'absolute',
        top: '11vh',
        right: '1vw',
        maxWidth: '40vw',
        maxHeight: '70vh',
    }

    return (
        <Snackbar
            open={!!error}
            autoHideDuration={5000}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            onClose={() => dispatch(removeError())}
            transitionDuration={{ exit: 2000 }}
            sx={{ width: '100%' }}
        >
            <Alert onClose={() => dispatch(removeError())} severity="error" variant="filled" sx={styles}>
                {errorText}
            </Alert>
        </Snackbar>
    )
}
