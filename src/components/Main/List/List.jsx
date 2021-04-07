import React, { useState, useContext, useEffect } from 'react';
import { List as MUIList, Grid, Select, MenuItem, FormControl, InputLabel, TextField } from '@material-ui/core';
import { FinanceTrackerContext } from '../../../context/context';
import useStyles from './styles';
import Confirmation from '../../Confirmation/Confirmation';
import CustomListItem from '../../../containers/CustomListItem';

const List = ({currencySymbol}) => {
    const classes = useStyles();
    let { deleteTransaction, transactions } = useContext(FinanceTrackerContext);  
    const [open, setOpen] = useState(false);
    const [filteredType, setFilteredType] = useState("All");
    const [filteredDate, setFilteredDate] = useState();
    const [allTxns, setAllTxns] = useState(transactions);
    const [filteredTxns, setFilteredTxns] = useState(transactions);

    useEffect(() => {
        setAllTxns(transactions);
        setFilteredTxns(transactions);

        if (filteredType === "All") {
            setFilteredTxns(allTxns);    
        } else {
            setFilteredTxns(allTxns.filter((txn) => txn.type === filteredType));
        }
    }, [transactions, allTxns, filteredType]); 

    const removeTransaction = (identifier) => {
        deleteTransaction(identifier);
        setOpen(true);
    }; 

    const onFilterWithType = (e) => {
        setFilteredType(e.target.value);
        
        if (e.target.value === "All") {
            setFilteredTxns(allTxns);    
        } else {
            setFilteredTxns(allTxns.filter((txn) => txn.type === e.target.value));
        }
    };

    const onFilterWithDate = (e) => {
        setFilteredDate(e.target.value);
        
        if (!e.target.value && filteredType === "All") {
            setFilteredTxns(allTxns);    
        } else if (e.target.value) {
            setFilteredTxns(allTxns.filter((txn) => txn.type === filteredType && txn.date === e.target.value));
        } 
        
        if (e.target.value && filteredType === "All") {
            setFilteredTxns(allTxns.filter((txn) => txn.date === e.target.value)); 
        }
    };

    return (
        <MUIList className={classes.list} dense={false}>
            <Confirmation open={open} setOpen={setOpen} severity="error" message="Deleted the transaction." />
            
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Filter with Type</InputLabel>

                    <Select value={filteredType} onChange={onFilterWithType}> 
                      <MenuItem value="All">All</MenuItem>
                      <MenuItem value="Income">Income</MenuItem>
                      <MenuItem value="Expense">Expense</MenuItem>
                    </Select>
                </FormControl>
                
                <TextField 
                type="date" 
                inputProps={{ max: "9999-12-31" }} 
                InputLabelProps={{ shrink: true }} 
                label="Filter with Date" 
                fullWidth 
                value={filteredDate} 
                onChange={onFilterWithDate} />
            </Grid>
             
            {filteredTxns.map((txn, index) => (
              <CustomListItem
               txn={txn}
               key={txn.id} 
               onRemoveTxn={removeTransaction} 
               classes={classes} 
               currencySymbol={currencySymbol}
               date={filteredTxns[index].date} />
            ))}

           <p style={{color: "blue"}}>That's it, add more transactions!</p> 
        </MUIList>
    );
};

export default List;