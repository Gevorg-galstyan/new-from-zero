import * as actionTypes from "./actionTypes";

let defaultState = {
    count: 0,
    toDo: [],
    singleToDo: null,
    addModalShow: false,
    delModalShow: false,
    editModalShow: false,
    delFromSingle: false,
    loading: false,
    successAlert: false,
    errorAlert: false,

}

export function reducer(state=defaultState, action){
    switch (action.type){
        case actionTypes.PENDING : {
            return {
                ...state,
                addModalShow:false,
                delModalShow:false,
                delFromSingle: false,
                editModalShow: false,
                loading: true,
                successAlert: false,
                errorAlert: false,
            }
        }

        case actionTypes.ERROR : {
            return {
                ...state,
                loading: false,
                errorAlert: action.error,
            }
        }

        case actionTypes.INCREMENT : {
            return {
                ...state,
                count: state.count+1
            }
        }

        case actionTypes.DECREMENT : {
            return {
                ...state,
                count: state.count-1
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

            if(action.isSingle) {
                return {
                    ...state,
                    singleToDo: null,
                    delModalShow: true,
                    loading: false,
                    successAlert: action.alert
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
            if(action.isSingle){
                return {
                    ...state,
                    singleToDo: action.toDo,
                    editModalShow:true,
                    loading: false,
                    successAlert: action.alert
                }
            }

            let toDo = [...state.toDo];
            const changedToDoIndex = toDo.findIndex((e) => e._id === action.toDo._id);
            toDo[changedToDoIndex] = action.toDo;
            return {
                ...state,
                toDo,
                editModalShow:true,
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
                editModalShow:true,
                loading: false,
                successAlert: action.alert
            }
        }

        case actionTypes.ADD_TODO : {
            return {
                ...state,
                toDo: [...state.toDo, action.toDo],
                addModalShow:true,
                loading: false,
                successAlert: action.alert
            }
        }

        default : return state
    }


}

