import React, { useReducer, createContext } from 'react';
import { ADD_TRANSACTION, DELETE_TRANSACTION } from './contextActionTypes.js';
import contextReducer from './contextReducer.js';

const initialState = [];

export const FinanceTrackerContext = createContext(initialState);

export const AppProvider = (props) => {
    const [transactions, dispatch] = useReducer(contextReducer, initialState)

    const addTransaction = (transaction) => {
        dispatch({ type: ADD_TRANSACTION, payload: transaction });
    };  

    const deleteTransaction = (id) => {
        dispatch({ type: DELETE_TRANSACTION, payload: id });
    };  

    const contextValue = {
        addTransaction,
        deleteTransaction, 
        transactions
    };

    return (
        <FinanceTrackerContext.Provider value={contextValue}>
            {props.children}
        </FinanceTrackerContext.Provider>
    );
};