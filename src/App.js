import './App.css';
import "react-datepicker/dist/react-datepicker.css";
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import ToDo from "./component/toDo/ToDo";
import About from "./component/pages/about/About";
import Contacts from "./component/pages/contacts/Contacts";
import NotFound from "./component/pages/notFound/NotFound";
import SingleTask from "./component/pages/singleTask/SingleTask";
import Header from "./component/pages/header/Header";

function App() {
    return (
        <div>
            <Router>
                <Header/>

                <Switch>
                    {/*HOME*/}
                    <Route
                        path={'/'}
                        exact
                        component={ToDo}
                    />

                    <Route
                        path={'/home'}
                        exact
                        component={ToDo}
                    />
                    {/*ABOUT*/}
                    <Route
                        path={'/about'}
                        exact
                        component={About}
                    />
                    {/*CONTACTS*/}
                    <Route
                        path={'/contacts'}
                        exact
                        component={Contacts}
                    />

                    {/*SingleTask*/}
                    <Route
                        path={'/task/:taskId'}
                        exact
                        component={SingleTask}
                    />

                    {/*    404*/}
                    <Route
                        path={'/404'}
                        exact
                        component={NotFound}
                    />
                    <Redirect to={'/404'}/>

                </Switch>
            </Router>
        </div>
    );
}

export default App;
