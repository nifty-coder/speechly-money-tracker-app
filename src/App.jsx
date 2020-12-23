import React from 'react';
import { Grid } from '@material-ui/core';
import Details from './components/Details/Details.jsx';
import useStyles from './styles'; 
import Main from './components/Main/Main.jsx';

const App = () => {
    const classes = useStyles();

    return (
        <div>
            <h1>Welcome to Finance6s</h1>
            <p>6x Faster, All In One Place, so Manage Your Finances here!</p>
            
            <Grid 
             className={classes.grid} 
             container 
             spacing={0} 
             alignItems="center" 
             justify="center" 
             style={{height: '100vh'}}>
                <Grid item xs={12} sm={4}>
                   <Details title="Income" />               
               </Grid>
               <Grid item xs={12} sm={3}>
                  <Main />        
               </Grid>
               <Grid item xs={12} sm={4}>
                   <Details title="Expense" />               
               </Grid>
            </Grid>
        </div>
    );
};

export default App;