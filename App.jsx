const { Route, Switch } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter
const history = History.createBrowserHistory()



import NavBar from './cmps/NavBar.jsx'

import Home from './pages/Home.jsx'
import MisterEmail from './pages/MisterEmail.jsx'
import MissKeep from './pages/MissKeep.jsx'
import MissBook from './pages/MissBook.jsx'
import EmailDetails from './apps/MisterEmail/pages/EmailDetails.jsx'
import EditNote from './apps/MissKeep/pages/EditNote.jsx'


import UserMsg from './apps/MissBook/cmps/user-msg.jsx'
import { BookDetails } from './apps/MissBook/pages/Book-details.jsx'
import { AddBooks } from './apps/MissBook/pages/addBooks.jsx'


export class App extends React.Component {

    render() {

        return (
            <Router>
                <header className="app-header">
                    <NavBar history={history} />
                </header>
                <main>
                    {/* <UserMsg /> */}
                    <Switch>
                        <Route component={EditNote} path="/keep/:idNote" />
                        <Route component={MissKeep} history={history} path="/keep" />
                        <Route component={EmailDetails} history={history} path="/email/:theMailId" />
                        <Route component={MisterEmail} history={history} path="/email" />
                        <Route component={BookDetails} path="/books/:idBook" />
                        <Route component={MissBook} path="/books" />
                        <Route component={AddBooks} path="/addBook" />
                        <Route exact component={Home} path="/" />
                    </Switch>
                </main>
            </Router>
        )
    }
}

