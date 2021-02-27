import request from "../helpers/request";
import * as actionTypes from "./actionTypes"

export function onPageLoad() {
    return (dispatch) => {
        dispatch({type: actionTypes.PENDING})
        request('http://localhost:3001/task')
            .then((res) => {
                dispatch({type: actionTypes.ON_PAGE_LOAD, toDo: res})
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
        request('http://localhost:3001/task', "POST", toDo)
            .then((res) => {
                dispatch({type: actionTypes.ADD_TODO, toDo: res})
            })
    }
}

export function onDeleteToDo(props) {
    return (dispatch) => {
        dispatch({type: actionTypes.PENDING})
        if (typeof props.deleteId === "string") {
            request(`http://localhost:3001/task/${props.deleteId}`, 'DELETE')
                .then(() => {
                    const {toDo} = props,
                        delItem = toDo.filter((e) => e._id !== props.deleteId);
                    dispatch({type: actionTypes.DELETE_TODO, toDo: delItem});
                })

        } else {

            const {toDo} = props;
            const body = {
                tasks: [...props.deleteId]
            }
            dispatch({type: actionTypes.PENDING})
            request(`http://localhost:3001/task/`, 'PATCH', body)
                .then(async (res) => {
                    const newToDo = toDo.filter((e) => !props.deleteId.has(e._id));
                    dispatch({type: actionTypes.DELETE_TODOS, toDo: newToDo});

                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

}

export function onEditToDo(toDo) {
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
        request(`http://localhost:3001/task/${toDo._id}`, "PUT", body)
            .then((toDo) => {
                dispatch({type: actionTypes.EDIT_TODO, toDo})
            })
    }

}