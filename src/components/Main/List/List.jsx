import React, { useContext } from 'react';
import { List as MUIList, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton, Slide } from '@material-ui/core';
import { Delete, MoneyOff, MoneyOutlined } from '@material-ui/icons';
import { FinanceTrackerContext } from '../../../context/context';
import formatDate from '../../../utils/formatDate';
import useStyles from './styles';

const List = () => {
    const classes = useStyles();
    const { deleteTransaction, transactions } = useContext(FinanceTrackerContext);

    return (
        <MUIList className={classes.list} dense={false}>
            {transactions.map((trsc) => (
                <Slide key={trsc.id} direction="down" in mountOnEnter unmountOnExit>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar className={trsc.type === "Income" ? classes.avatarIncome : classes.avatarExpense}>
                               {trsc.type === "Income" ? <MoneyOutlined /> : <MoneyOff color="tertiary" />}
                            </Avatar>
                        </ListItemAvatar>

                        <ListItemText primary={trsc.category} secondary={`$${trsc.amount} on ${formatDate(trsc.date)}`} />

                        <ListItemSecondaryAction>
                           <IconButton edge="end" aria-label="delete" onClick={() => deleteTransaction(trsc.id)}>
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