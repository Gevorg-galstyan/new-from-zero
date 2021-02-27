import * as actionTypes from "./actionTypes"

let defaultState = {
    count: 0,
    toDo: [],
    addModalShow: false,
    delModalShow: false,
    editModalShow: false,
    delFromSingle: false,
    loading: false
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
                loading: true
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

        case actionTypes.DELETE_TODO : {
            return {
                ...state,
                toDo: action.toDo,
                delModalShow: true,
                delFromSingle: true,
                loading: false
            }
        }

        case actionTypes.DELETE_TODOS : {
            return {
                ...state,
                toDo: action.toDo,
                delModalShow: true,
                loading: false
            }
        }

        case actionTypes.EDIT_TODO : {
            let toDo = [...state.toDo];
            const changedToDoIndex = toDo.findIndex((e) => e._id === action.toDo._id);
            toDo[changedToDoIndex] = action.toDo;
            return {
                ...state,
                toDo,
                editModalShow:true,
                loading: false
            }
        }

        case actionTypes.ADD_TODO : {
            return {
                ...state,
                toDo: [...state.toDo, action.toDo],
                addModalShow:true,
                loading: false
            }
        }

        default : return state
    }


}

