import React from 'react';
import { Grid } from '@material-ui/core';
import useStyles from './styles'; 
import Main from './components/Main/Main.jsx';
import DetailsCard from './components/Details/Details.jsx';
import { ErrorPanel, PushToTalkButton, PushToTalkButtonContainer } from '@speechly/react-ui';

const App = () => {
    const classes = useStyles();

    return (
        <div>
            <h1>Welcome to Finance6s</h1>
            <p>6x Faster, All In One Place, so Manage Your Finances here! Press and hold the Button below while you speak.</p>
            
            <Grid 
             className={classes.grid} 
             container 
             spacing={0} 
             alignItems="center">
                <Grid item xs={12} sm={4}>
                   <DetailsCard title="Income" />               
               </Grid>
               <Grid item xs={12} sm={3}>
                  <Main />        
               </Grid>
               <Grid item xs={12} sm={4}>
                   <DetailsCard title="Expense" />               
               </Grid>
            </Grid>

           <PushToTalkButtonContainer>
              <PushToTalkButton />     
              <ErrorPanel />  
          </PushToTalkButtonContainer>   
        </div>
    );
};

export default App;