import { ADD_TRANSACTION, DELETE_TRANSACTION } from "./contextActionTypes";

const contextReducer = (state, action) => {
    switch(action.type) {
        case ADD_TRANSACTION:
         return [...state, action.payload]      
        case DELETE_TRANSACTION:
         return state.filter((t) => t.id !== action.payload);
      default: 
        return state;
    }
};

export default contextReducer;