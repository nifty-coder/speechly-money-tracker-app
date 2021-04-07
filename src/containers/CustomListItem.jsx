import React from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton, Slide } from '@material-ui/core';
import { Delete, MoneyOff, MoneyOutlined } from '@material-ui/icons';
import formatDate from '../utils/formatDate';
import commafy from '../utils/commafy';

const CustomListItem = ({txn, onRemoveTxn, classes, currencySymbol, date}) => {
    return (
      <Slide direction="down" in mountOnEnter unmountOnExit>
        <ListItem>
          <ListItemAvatar>
              <Avatar className={txn.type === "Income" ? classes.avatarIncome : classes.avatarExpense}>
                {txn.type === "Income" ? <MoneyOutlined /> : <MoneyOff />}
              </Avatar>
          </ListItemAvatar>

          <ListItemText primary={txn.category} secondary={`${currencySymbol}${commafy(txn.amount)}, ${txn.type} Date: ${formatDate(date)}`} />
          
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete" onClick={() => onRemoveTxn(txn.id)}>
              <Delete color="secondary" />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
     </Slide>
  );
};

export default CustomListItem;