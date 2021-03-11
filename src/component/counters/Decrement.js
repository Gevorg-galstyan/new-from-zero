import React from "react";
import {connect} from "react-redux";

function Decrement(props){

    return(
        <button
            onClick={props.handleDecrement}
        >
            Decrement
        </button>
    )
}

const mapDispatchToProps = (dispatch)=>{
    return {
        handleDecrement: ()=>{
            dispatch({type: 'DECREMENT'})
        }
    }
}

export default connect(null, mapDispatchToProps)(Decrement)