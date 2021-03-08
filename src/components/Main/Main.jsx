import React, { useContext } from 'react';
import { Card, CardHeader, CardContent, Typography, Divider, Grid } from '@material-ui/core';
import useStyles from './styles'; 
import Form from './Form/Form.jsx';
import List from './List/List.jsx';
import { FinanceTrackerContext } from '../../context/context';
import commafy from '../../utils/commafy';
import { SpeechlySuggestions } from '../index.js';

const Main = ({currencySymbol}) => {
    const classes = useStyles();
    const { balance } = useContext(FinanceTrackerContext);
     
     return (
      <Card className={classes.root}>
        <CardHeader title="Personal Financial Tracker" subheader="Powered by Speechly Voice" />
        
        <CardContent>
            <Typography variant="h5" align="center">Total Balance: {`${currencySymbol}` + commafy(balance)}</Typography>
            <Typography variant="subtitle1" style={{ lineHeight: '1.5em', marginTop: '2px' }}>
                <SpeechlySuggestions />
            </Typography> 
        
            <Divider className={classes.divider} />
        
           <Form editMode={false} />
       </CardContent>

       <CardContent className={classes.cardContent}>
           <Grid container spacing={2}>
            <h4>Transaction History:</h4>
              <Grid item xs={12}>
                <List currencySymbol={currencySymbol} />
               </Grid>
           </Grid>
       </CardContent>
    </Card>
    );
};

export default Main;