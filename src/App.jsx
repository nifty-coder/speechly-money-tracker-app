import React, { useEffect, useRef } from 'react';
import { Grid } from '@material-ui/core';
import useStyles from './styles'; 
import { Details, Main } from './components';
import { ErrorPanel, PushToTalkButton, PushToTalkButtonContainer } from '@speechly/react-ui';
import { SpeechState, useSpeechContext } from '@speechly/react-client';

const App = () => {
    const classes = useStyles();
    const { speechState } = useSpeechContext();
    const main = useRef(null);

    const executeScroll = () => main.current.scrollIntoView();    

    useEffect(() => {
       if(speechState === SpeechState.Recording) {
          executeScroll();
       } 
    }, [speechState]);

    return (
        <div>
            <h1>Welcome to Finance6s!</h1>
            <p>6x Faster, All In One Place, so Manage Your Finances here! Press and hold the Button below while you speak.</p>
            
            <Grid 
             className={classes.grid} 
             container 
             spacing={0} 
             alignItems="center">
                <Grid item xs={12} sm={4} className={classes.mobile}>
                   <Details title="Income" />               
               </Grid>

               <Grid ref={main} item xs={12} sm={3} className={classes.main}>
                  <Main />        
               </Grid>
               
               <Grid item xs={12} sm={4} className={classes.desktop}>
                   <Details title="Income" />               
               </Grid>

               <Grid item xs={12} sm={4} className={classes.last}> 
                   <Details title="Expense" />               
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