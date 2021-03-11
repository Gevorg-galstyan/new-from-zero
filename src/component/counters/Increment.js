import React from "react";
import {connect} from "react-redux";

function Increment(props){
    return(
        <button
            onClick={props.handleIncrement}
            className={'mr-3'}
        >
            Increment
        </button>
    )
}

const mapDispatchToProps = (dispatch)=>{
    return {
        handleIncrement: ()=>{
            dispatch({type: 'INCREMENT'})
        }
    }
}

export default connect(null, mapDispatchToProps)(Increment)