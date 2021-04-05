import * as actionTypes from "./actionTypes";
import {checkLoginStatus} from "../helpers/auth";

let defaultState = {
    count: 0,
    toDo: [],
    userInfo: null,
    singleToDo: null,
    addModalShow: false,
    delModalShow: false,
    editModalShow: false,
    delFromSingle: false,
    loading: false,
    successAlert: false,
    errorAlert: false,
    isAuth: checkLoginStatus(),
    messageSuccess: false,
    clearPasswordInputs: false,
}

export function reducer(state = defaultState, action) {
    switch (action.type) {
        case actionTypes.PENDING : {
            return {
                ...state,
                addModalShow: false,
                delModalShow: false,
                delFromSingle: false,
                editModalShow: false,
                loading: true,
                successAlert: false,
                errorAlert: false,
                messageSuccess: false,
                clearPasswordInputs: false,
            }
        }

        case actionTypes.ERROR : {
            return {
                ...state,
                loading: false,
                messageSuccess: false,
                errorAlert: action.error,
            }
        }

        case actionTypes.INCREMENT : {
            return {
                ...state,
                count: state.count + 1
            }
        }

        case actionTypes.DECREMENT : {
            return {
                ...state,
                count: state.count - 1
            }
        }

        case actionTypes.ON_PAGE_LOAD : {
            return {
                ...state,
                toDo: action.toDo,
                loading: false
            }
        }

        case actionTypes.LOAD_SINGLE_TODO : {
            return {
                ...state,
                singleToDo: action.res,
                loading: false,
            }
        }

        case actionTypes.DELETE_TODO : {

            if (action.isSingle) {
                return {
                    ...state,
                    singleToDo: null,
                    delModalShow: true,
                    loading: false,
                    successAlert: 'You are successfully delete task'
                }
            }

            return {
                ...state,
                toDo: action.toDo,
                delModalShow: true,
                loading: false,
                successAlert: action.alert
            }
        }

        case actionTypes.DELETE_TODOS : {
            return {
                ...state,
                toDo: action.toDo,
                delModalShow: true,
                loading: false,
                successAlert: action.alert
            }
        }

        case actionTypes.EDIT_TODO : {
            if (action.isSingle) {
                return {
                    ...state,
                    singleToDo: action.toDo,
                    editModalShow: true,
                    loading: false,
                    successAlert: 'You are successfully edit task'
                }
            }

            let toDo = [...state.toDo];
            const changedToDoIndex = toDo.findIndex((e) => e._id === action.toDo._id);
            toDo[changedToDoIndex] = action.toDo;
            return {
                ...state,
                toDo,
                editModalShow: true,
                loading: false,
                successAlert: action.alert
            }
        }

        case actionTypes.EDIT_TODO_STATUS : {
            let toDo = [...state.toDo];
            const changedToDoIndex = toDo.findIndex((e) => e._id === action.toDo._id);
            toDo[changedToDoIndex].status = action.toDo.status;

            return {
                ...state,
                toDo,
                editModalShow: true,
                loading: false,
                successAlert: 'You have successfully changed task status',
                singleToDo: action.isSingle ? action.toDo : null
            }
        }

        case actionTypes.ADD_TODO : {
            return {
                ...state,
                toDo: [...state.toDo, action.toDo],
                addModalShow: true,
                loading: false,
                successAlert: 'You are successfully add task'
            }
        }

        case actionTypes.REGISTER_USER : {
            return {
                ...state,
                loading: false,
                successAlert: 'Congratulations!!!  You are successfully registered'
            }
        }

        case actionTypes.LOGIN_USER : {
            return {
                ...state,
                loading: false,
                isAuth: true,
            }
        }

        case actionTypes.LOGOUT : {
            return {
                ...state,
                loading: false,
                isAuth: false,
                userInfo: null,
            }
        }

        case actionTypes.SEND_MESSAGE_SUCCESS : {
            return {
                ...state,
                loading: false,
                messageSuccess: true,
                successAlert: 'Your Message has been send'
            }
        }

        case actionTypes.GET_USER_INFO : {
            return {
                ...state,
                loading: false,
                userInfo: action.res
            }
        }

        case actionTypes.UPDATE_USER_INFO : {
            return {
                ...state,
                loading: false,
                userInfo: action.res,
                successAlert: 'You`r successfully update data '
            }
        }

        case actionTypes.UPDATE_USER_PASSWORD : {
            return {
                ...state,
                loading: false,
                successAlert: 'You`r successfully update your password ',
                clearPasswordInputs: true,
            }
        }

        default :
            return state
    }


}

