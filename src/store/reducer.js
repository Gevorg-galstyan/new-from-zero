let defaultState = {
    count: 0,
    toDo: []
}

export function reducer(state=defaultState, action){
    switch (action.type){
        case 'INCREMENT' : {
            return {
                ...state,
                count: state.count+1
            }
        }
        case 'DECREMENT' : {
            return {
                ...state,
                count: state.count-1
            }
        }

        case 'ON_PAGE_LOAD' : {
            return {
                ...state,
                toDo: action.toDo
            }
        }

        case 'DELETE_TODO' : {
            return {
                ...state,
                toDo: action.toDo
            }
        }

        case 'DELETE_TODOS' : {
            return {
                ...state,
                toDo: action.toDo
            }
        }

        case 'EDIT_TODO' : {
            let toDo = [...state.toDo];
            const changedToDoIndex = toDo.findIndex((e) => e._id === action.toDo._id);
            toDo[changedToDoIndex] = action.toDo;
            return {
                ...state,
                toDo
            }
        }

        case 'ADD_TODO' : {
            return {
                ...state,
                toDo: [...state.toDo, action.toDo]
            }
        }

        default : return state
    }


}

