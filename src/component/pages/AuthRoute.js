import React from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from 'react-redux';

 function AuthRoute({path, component: Component, type, isAuth}){
    return(
        <Route
            path={path}
            render={(props)=>{
                if(isAuth && type === 'public'){
                   return <Redirect  to={'/'}  />;
                }
                if(!isAuth && type === 'private') {
                   return <Redirect  to={'/login'} />;
                }

                return <Component {...props} />;
            }}
        />
    )
}
const mapStateToProps = (state)=>{
     return{
         isAuth: state.isAuth
     }
}

export default connect(mapStateToProps)(AuthRoute)