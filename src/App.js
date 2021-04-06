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
import Profile from "./component/pages/profile/Profile";
import Footer from "./component/pages/footer/Footer";
import Spinner from "./component/spinner/Spinner";
import AuthRoute from "./component/pages/AuthRoute";
import Settings from "./component/pages/settings/Settings";
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
                    <AuthRoute
                        path={'/'}
                        component={ToDo}
                        type={'private'}
                        exact
                    />

                    <AuthRoute
                        path={'/home'}
                        component={ToDo}
                        type={'private'}
                        exact
                    />
                    {/*ABOUT*/}
                    <Route
                        path={'/about'}
                        component={About}
                        exact
                    />
                    {/*CONTACTS*/}
                    <Route
                        path={'/contacts'}
                        component={Contacts}
                        exact
                    />

                    {/*SingleTask*/}
                    <AuthRoute
                        path={'/task/:taskId'}
                        component={SingleTask}
                        type={'private'}
                        exact
                    />

                    {/*LOGIN*/}
                    <AuthRoute
                        path={'/login'}
                        component={Login}
                        type={'public'}
                        exact
                    />

                    {/*REGISTER*/}
                    <AuthRoute
                        path={'/register'}
                        component={Register}
                        type={'public'}
                        exact
                    />

                    {/*PROFILE*/}
                    <AuthRoute
                        path={'/profile'}
                        component={Profile}
                        type={'private'}
                        exact
                    />

                    {/*SETTINGS*/}
                    <AuthRoute
                        path={'/settings'}
                        component={Settings}
                        type={'private'}
                        exact
                    />

                    {/*    404*/}
                    <Route
                        path={'/404'}
                        component={NotFound}
                        exact
                    />
                    <Redirect to={'/404'}/>

                </Switch>

                <Footer/>
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
