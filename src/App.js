import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import store from 'store/store'
import authService from 'services/authService'

import AuthProvider from 'components/Auth/authProvider'
import Header from 'components/Header/Header'
import Footer from 'components/Footer/Footer'
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator'
import ErrorPopUp from 'components/ErrorPopUp/ErrorPopUp'
import Main from 'components/Main/Main'

export default function App() {
    useEffect(() => {
        authService.loadUserFromStorage(store)
    }, [])

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Provider store={store}>
                <AuthProvider userManager={authService.getUserManager()} store={store}>
                    <Router>
                        <Header />
                        <Main />
                        <Footer />
                        <LoadingIndicator />
                        <ErrorPopUp />
                    </Router>
                </AuthProvider>
            </Provider>
        </LocalizationProvider>
    )
}
