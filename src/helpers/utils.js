import React from "react";

export function textEllipsis(str){
    if (str.length){
        if(str.length < 60){
            return str;
        }
        return str.slice(0,60)+'...'
    }
}