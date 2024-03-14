import { Route, Switch } from 'react-router-dom'
import PrivateRoute from 'components/Auth/protectedRoute'
import SigninOidc from 'components/Auth/signin-oidc'
import SignoutOidc from 'components/Auth/signout-oidc'
import StartPage from 'components/StartPage/StartPage'
import AllEventsPage from 'components/AllEventsPage/AllEventsPage'
import OwnEventsPage from 'components/OwnEventsPage/OwnEventsPage'
import CalendarPage from 'components/CalendarPage/CalendarPage'
import SpecificEventPage from 'components/SpecificEventPage/SpecificEventPage'
import routes from 'constants/route-constants'

export default function Main() {
    return (
        <main>
            <Switch>
                <Route path={routes.signin} component={SigninOidc} />
                <Route path={routes.signout} component={SignoutOidc} />
                <Route exact path={routes.root} component={StartPage} />
                <PrivateRoute path={`${routes.events}/:id`} component={SpecificEventPage} />
                <PrivateRoute path={routes.events} component={AllEventsPage} />
                <PrivateRoute path={routes.ownEvents} component={OwnEventsPage} />
                <PrivateRoute path={routes.calendar} component={CalendarPage} />
            </Switch>
        </main>
    )
}
