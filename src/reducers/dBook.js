import {ACTION_TYPES} from '../actions/dBook';

const initialState={
    list:[]
}

export const Book =(state=initialState,action)=>{
    switch(action.type){
        case ACTION_TYPES.FETCH_ALL:
            return{ 
                ...state,
                list:[...action.payload]
            }


            case ACTION_TYPES.CREATE:
                return {
                    ...state,
                    list: [...state.list, action.payload]
                }
    
           
                case ACTION_TYPES.UPDATE:
                    return {
                        ...state,
                        list: state.list.map(x => x.bookId == action.payload.bookId ? action.payload : x)
                    }
    
            case ACTION_TYPES.DELETE:
                return {
                    ...state,
                    list: state.list.filter(x => x.bookId != action.payload)
                }
                
            default: return state;
        }
    }