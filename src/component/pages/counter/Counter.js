import React from "react";
import CounterButtons from "../../counters/CounterButtons";
import ShowCount from "../../counters/ShowCount";

export default function Counter(){

    return(
        <div>
            <ShowCount/>
            <CounterButtons/>
        </div>

    )
}