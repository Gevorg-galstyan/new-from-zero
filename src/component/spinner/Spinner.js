import React,{useEffect} from "react";
import {Spinner as BSpinner} from "react-bootstrap";
import style from "./spinner.module.css";


export default function Spinner(){


    return(
        <div className={style.spinner_container}>
            <BSpinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </BSpinner>

        </div>
    )
}