const { Route, Switch } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter
const history = History.createBrowserHistory()



import NavBar from './cmps/NavBar.jsx'

import Home from './pages/Home.jsx'
import MisterEmail from './pages/MisterEmail.jsx'
import MissKeep from './pages/MissKeep.jsx'
import MissBook from './pages/MissBook.jsx'
import EmailDetails from './apps/MisterEmail/pages/EmailDetails.jsx'

export class App extends React.Component {

    render() {

        return (
            <Router>
                <header className="app-header">
                    <NavBar history={history} />
                </header>
                <main>
                    <Switch>
                        <Route component={MissBook} path="/books" />
                        <Route component={MissKeep} path="/keep" />
                        <Route component={EmailDetails} path="/email/:theMailId"/>
                        <Route component={MisterEmail} history={history} path="/email" />
                        <Route component={Home} path="/" />
                    </Switch>
                </main>
            </Router>
        )
    }
}

