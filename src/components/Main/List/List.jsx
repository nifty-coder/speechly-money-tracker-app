import React from 'react';
import { List as MUIList, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton, Slide } from '@material-ui/core';
import { Delete, MoneyOff, MoneyOutlined } from '@material-ui/icons';
import moment from 'moment';
import useStyles from './styles';

const List = () => {
    const classes = useStyles();
    const transactions = [
     { id: 1, type: "Income", category: "Salary", amount: 100000, date: moment(new Date()).format('dddd of MMMM Do YYYY, h:mm a') },
     { id: 2, type: "Expense", category: "Home", amount: 100000, date: moment(new Date()).format('dddd of MMMM Do YYYY, h:mm a') },
     { id: 3, type: "Income", category: "Gift Card", amount: 100000, date: moment(new Date()).format('dddd of MMMM Do YYYY, h:mm a') }
    ]; 

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

                        <ListItemText primary={trsc.category} secondary={`$${trsc.amount} on ${trsc.date}`} />

                        <ListItemSecondaryAction>
                           <IconButton edge="end" aria-label="delete" onClick={() => {}}>
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