import decode from 'jwt-decode';
import {store} from "../store/store";
import {LOGOUT} from "../store/actionTypes";

const apiHost = process.env.REACT_APP_API_HOST;

export function getToken(){
    const token = localStorage.getItem('token');
    if (token){
        const parsed = JSON.parse(token);
        const decoded = decode(parsed.jwt)
        if(decoded.exp -  new Date().getTime() / 1000 >  60){
            return Promise.resolve(parsed.jwt);
        }else {
           return  fetch(`${apiHost}/user/${decoded.userId}/token`,
                {
                    method: 'PUT',
                    body : JSON.stringify({refreshToken: parsed.refreshToken}),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                }
            )
                .then(res => res.json())
                .then(token => {
                    if (token.error){
                        throw token.error
                    }
                    localStorage.setItem('token', JSON.stringify(token));
                    return token.jwt;
                }).catch(()=>{
                   logout()
               })
        }
    }else {
        logout()
    }
}

export function logout(e){
    e.preventDefault();
    localStorage.removeItem('token')
    localStorage.removeItem('userImage')
    store.dispatch({type:LOGOUT})

}

export function checkLoginStatus() {return !!localStorage.getItem('token')}
