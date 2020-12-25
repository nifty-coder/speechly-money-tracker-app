import React, { useState, useContext } from 'react';
import { List as MUIList, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton, Slide } from '@material-ui/core';
import { Delete, MoneyOff, MoneyOutlined } from '@material-ui/icons';
import { FinanceTrackerContext } from '../../../context/context';
import formatDate from '../../../utils/formatDate';
import useStyles from './styles';
import commafy from '../../../utils/commafy';
import Confirmation from '../../Confirmation/Confirmation';

const List = () => {
    const classes = useStyles();
    const { deleteTransaction, transactions } = useContext(FinanceTrackerContext);
    const [open, setOpen] = useState(false);

    const removeTransaction = (identifier) => {
        deleteTransaction(identifier);
        setOpen(true);
    }; 

    return (
        <MUIList className={classes.list} dense={false}>
            <Confirmation open={open} setOpen={setOpen} severity="error" message="Deleted the transaction." />
            {transactions.map((trsc) => (
                <Slide key={trsc.id} direction="down" in mountOnEnter unmountOnExit>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar className={trsc.type === "Income" ? classes.avatarIncome : classes.avatarExpense}>
                               {trsc.type === "Income" ? <MoneyOutlined /> : <MoneyOff color="tertiary" />}
                            </Avatar>
                        </ListItemAvatar>

                        <ListItemText primary={trsc.category} secondary={`$${commafy(trsc.amount)} created on ${formatDate(trsc.date)}`} />

                        <ListItemSecondaryAction>
                           <IconButton edge="end" aria-label="delete" onClick={() => removeTransaction(trsc.id)}>
                            <Delete color="secondary" />
                          </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </Slide>
            ))}
        </MUIList>
    );
};

export default List;