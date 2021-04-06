import request from "../helpers/request";
import * as actionTypes from "./actionTypes"
import {history} from "../helpers/history";
import {getUserImage} from "../helpers/utils";


const apiHost = process.env.REACT_APP_API_HOST;

export function onPageLoad(param = {}) {
    const searchParams = Object.entries(param).map(([key, value]) => `${key}=${value}`).join('&')

    return (dispatch) => {
        dispatch({type: actionTypes.PENDING})
        request(`${apiHost}/task?${searchParams}`, 'GET', null, true )
            .then((res) => {
                if(res.error){
                    throw res.error
                }
                dispatch({type: actionTypes.ON_PAGE_LOAD, toDo: res})
            })
            .catch((err) => {
                dispatch({type: actionTypes.ERROR, error: err.message})
            })
    }
}

export function loadSingleToDo(id) {
    return (dispatch) => {
        dispatch({type: actionTypes.PENDING})
        request(`${apiHost}/task/${id}`)
            .then((res) => {
                dispatch({type: actionTypes.LOAD_SINGLE_TODO, res})
            })
            .catch((err) => {
                dispatch({type: actionTypes.ERROR, error: err.message})
            })
    }
}

export function onAddToDo(toDo) {
    return (dispatch) => {
        if (toDo.title === '') {
            alert('Please Fill  Todo Title');
            return;
        }
        dispatch({type: actionTypes.PENDING})
        toDo.date = toDo.date.slice(0, 10)
        request(`${apiHost}/task`, "POST", toDo)
            .then((res) => {
                dispatch({type: actionTypes.ADD_TODO, toDo: res})
            })
            .catch((err) => {
                dispatch({type: actionTypes.ERROR, error: err.message})
            })
    }
}

export function onDeleteToDo(props, isSingle = false) {
    return (dispatch) => {
        dispatch({type: actionTypes.PENDING})
        if (typeof props.deleteId === "string") {
            request(`${apiHost}/task/${props.deleteId}`, 'DELETE')
                .then(() => {
                    const {toDo} = props,
                        delItem = toDo.filter((e) => e._id !== props.deleteId);
                    dispatch({
                        type: actionTypes.DELETE_TODO,
                        toDo: delItem,
                        isSingle
                    });

                    isSingle && history.push('/')

                })
                .catch((err) => {
                    dispatch({type: actionTypes.ERROR, error: err.message})
                })

        } else {

            const {toDo} = props;
            const body = {
                tasks: [...props.deleteId]
            }
            dispatch({type: actionTypes.PENDING})
            request(`${apiHost}/task/`, 'PATCH', body)
                .then(async () => {
                    const newToDo = toDo.filter((e) => !props.deleteId.has(e._id));
                    dispatch({
                        type: actionTypes.DELETE_TODOS, toDo: newToDo, alert: 'You are successfully delete tasks'
                    });

                })
                .catch((err) => {
                    dispatch({type: actionTypes.ERROR, error: err.message})
                })
        }
    }

}

export function onEditToDo(toDo, isSingle = false) {
    return (dispatch) => {
        if (toDo.title === '') {
            alert('Please Fill  Todo Title');
            return;
        }
        dispatch({type: actionTypes.PENDING})
        let body = {
            title: toDo.title,
            description: toDo.description,
            date: toDo.date.slice(0, 10)
        };
        request(`${apiHost}/task/${toDo._id}`, "PUT", body)
            .then((toDo) => {
                dispatch({type: actionTypes.EDIT_TODO, toDo, isSingle})
            })
            .catch((err) => {
                dispatch({type: actionTypes.ERROR, error: err.message})
            })
    }

}

export function onEditStatus(toDo, isSingle = false) {
    return (dispatch) => {
        dispatch({type: actionTypes.PENDING})
        request(`${apiHost}/task/${toDo._id}`, "PUT", {status: toDo.status})
            .then((toDo) => {
                dispatch({
                    type: actionTypes.EDIT_TODO_STATUS,
                    toDo,
                    isSingle
                })
            })
            .catch((err) => {
                dispatch({type: actionTypes.ERROR, error: err.message})
            })
    }

}

export function register(data) {
    return (dispatch) => {
        dispatch({type: actionTypes.PENDING})
        request(`${apiHost}/user`, "POST", data, false)
            .then((res) => {
                dispatch({type: actionTypes.REGISTER_USER, res})
                history.push('/login')
            })
            .catch((err) => {
                dispatch({type: actionTypes.ERROR, error: err.message})
            })
    }

}

export function login(data) {
    return (dispatch) => {
        dispatch({type: actionTypes.PENDING})
        request(`${apiHost}/user/sign-in`, "POST", data, false)
            .then((res) => {
                if(res.error){
                    throw res.error
                }
                localStorage.setItem('token', JSON.stringify(res))
                dispatch({type: actionTypes.LOGIN_USER})
            })
            .catch((err) => {
                dispatch({type: actionTypes.ERROR, error: err.message})
            })
    }

}

export function sendMessage(data){
    return (dispatch) => {
        dispatch({type: actionTypes.PENDING})
        request(`${apiHost}/form`, 'POST', data, false)
            .then((res) => {
                if(res.error){
                    throw res.error
                }
                dispatch({type: actionTypes.SEND_MESSAGE_SUCCESS})
            })
            .catch((err) => {
                dispatch({type: actionTypes.ERROR, error: err.message})
            })
    }
}

export function getUserInfo(){
    return (dispatch) => {
        dispatch({type: actionTypes.PENDING})
        request(`${apiHost}/user`, 'GET', false, )
            .then((res) => {
                if(res.error){
                    throw res.error
                }

                res.image = getUserImage();
                dispatch({type: actionTypes.GET_USER_INFO, res})

            })
            .catch((err) => {
                dispatch({type: actionTypes.ERROR, error: 'Sorry something went wrong'})
            })
    }
}

export function updateUserInfo(data){
    return (dispatch) => {
        dispatch({type: actionTypes.PENDING})
            request(`${apiHost}/user`, 'PUT', data, )
            .then((res) => {
                if(res.error){
                    throw res.error
                }
                data.image && localStorage.setItem('userImage', data.image);
                res.image = getUserImage();
                dispatch({type: actionTypes.UPDATE_USER_INFO, res})

            })
            .catch((err) => {
                dispatch({type: actionTypes.ERROR, error: 'Sorry something went wrong'})
            })
    }
}

export function updatePassword(data){
    return (dispatch) => {
        dispatch({type: actionTypes.PENDING})
            request(`${apiHost}/user/password`, 'PUT', data, )
            .then((res) => {
                if(res.error){
                    throw res.error
                }
                dispatch({type: actionTypes.UPDATE_USER_PASSWORD})

            })
            .catch((err) => {
                dispatch({type: actionTypes.ERROR, error: 'Sorry something went wrong'})
            })
    }
}