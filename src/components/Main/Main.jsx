import React from 'react';
import { Card, CardHeader, CardContent, Typography, Divider, Grid } from '@material-ui/core';
import useStyles from './styles'; 
import Form from './Form/Form.jsx';
import List from './List/List.jsx';

const Main = () => {
    const classes = useStyles();
    
    return (
      <Card className={classes.root}>
        <CardHeader title="Financial Tracker" subheader="Powered by Speechly" />
        <CardContent>
            <Typography variant="h5" align="center">Total Balance: $100</Typography>
            <Typography variant="subtitle1" style={{ lineHeight: '1.5em', marginTop: '2px' }}>
                {/* InfoCard... */}
                Try saying: Add Income for $200 in Category Salary on Monday. 
            </Typography> 
            <Divider />
           <Form />
       </CardContent>

       <CardContent className={classes.cardContent}>
           <Grid container spacing={2}>
              <Grid item xs={12}>
                   <List />
               </Grid>
           </Grid>
       </CardContent>
    </Card>
    );
};

export default Main;