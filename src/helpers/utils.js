export function textEllipsis(str = '', maxlength) {
    if(!maxlength || str.length < maxlength) {return str}
    return str.slice(0, maxlength) + '...'
}

export const getUserImage = () => localStorage.getItem('userImage');

