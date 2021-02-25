import React from "react";
import {connect} from 'react-redux';

function ShowCount(props){

    return(
        <div>
            <p>Count: {props.count}</p>
        </div>
    )
}

const mapStateToProps = (state)=>{
    return{
        count: state.count
    }
}

export default connect(mapStateToProps)(ShowCount)