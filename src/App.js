import React, {useEffect} from "react";
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import './index.css';
import ToDo from "./component/toDo/ToDo";
import About from "./component/pages/about/About";
import Contacts from "./component/pages/contacts/Contacts";
import NotFound from "./component/pages/notFound/NotFound";
import SingleTask from "./component/pages/singleTask/SingleTask";
import Login from "./component/pages/login/Login";
import Register from "./component/pages/register/Register";
import Header from "./component/pages/header/Header";
import Spinner from "./component/spinner/Spinner";
import {ToastContainer, toast} from 'react-toastify';
import {Router, Route, Switch, Redirect} from 'react-router-dom'
import {connect} from "react-redux";
import {history} from './helpers/history';


function App({loader, successAlert, errorAlert}) {

    useEffect(() => {
        loader ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'auto';

        if(successAlert){
            toast.success(successAlert, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }

        if(errorAlert){
            toast.error(errorAlert, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }

    }, [loader, successAlert])

    return (
        <div className={'general-container'}>
            <Router history={history}>
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

                    {/*LOGIN*/}
                    <Route
                        path={'/login'}
                        exact
                        component={Login}
                    />

                    {/*REGISTER*/}
                    <Route
                        path={'/register'}
                        exact
                        component={Register}
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

            <ToastContainer />
            {loader && <Spinner/>}

        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        loader: state.loading,
        successAlert: state.successAlert,
        errorAlert: state.errorAlert,
    }
}

export default connect(mapStateToProps)(App);
