import React from "react";

export function textEllipsis(str = '', maxlength) {
    if(!maxlength || str.length < maxlength) {return str}
    return str.slice(0, maxlength) + '...'

}