import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, Grid, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import useStyles from './styles'; 
import { Details, Main } from './components';
import { ErrorPanel, PushToTalkButton, PushToTalkButtonContainer } from '@speechly/react-ui';
import { SpeechState, useSpeechContext } from '@speechly/react-client';

const App = () => {
    const [currency, setCurrency] = useState(localStorage.getItem("currency"));

    const classes = useStyles();
    const { speechState } = useSpeechContext();
    const main = useRef(null);
  
    const executeScroll = () => main.current.scrollIntoView();    

    useEffect(() => {
       if(speechState === SpeechState.Recording) {
          executeScroll();
       } 
    }, [speechState]);

    useEffect(() => {
        if(!localStorage.getItem("currency")) {
            setCurrency("$");
        } else {
            setCurrency(localStorage.getItem("currency"));
        }
    }, []);

    const inputChangedHandler = (e) => {
        setCurrency(e.target.value);
        localStorage.setItem("currency", e.target.value);
    };  

    return (
        <div>
            <h1>Welcome to Finan6s!</h1>
            <p>6x Faster, All In One Place, so Manage Your Finances here! Press and hold the Button below while you speak.</p>
            
            <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center">
               <Grid item xs={12}>
                <Card style={{textAlign: "center"}}>
                    <CardContent>
                        <Typography variant="h6">What's your currency symbol?</Typography> 
                        <InputLabel children="Pick your currency symbol below!" />  
                        <Select 
                        variant="outlined"
                        value={currency} 
                        onChange={inputChangedHandler}
                        style={{width: 100}}>
                            <MenuItem value="$">$</MenuItem>    
                            <MenuItem value="₹">₹</MenuItem>    
                            <MenuItem value="₺">₺</MenuItem>     
                            <MenuItem value="£">£</MenuItem>   
                            <MenuItem value="€">€</MenuItem>   
                        </Select>
                        {/* <TextField label="Currency" value={currency} onChange={inputChangedHandler} /> */}
                    </CardContent>
                </Card>       
              </Grid> 
            </Grid> 

            <Grid 
             className={classes.grid} 
             container 
             spacing={0} 
             alignItems="center">
                <Grid item xs={12} sm={4} className={classes.mobile}>
                   <Details title="Income" currencySymbol={currency} />               
               </Grid>

               <Grid ref={main} item xs={12} sm={3} className={classes.main}>
                  <Main currencySymbol={currency} />        
               </Grid>
               
               <Grid item xs={12} sm={4} className={classes.desktop}>
                   <Details title="Income" currencySymbol={currency} />               
               </Grid>

               <Grid item xs={12} sm={4} className={classes.last}> 
                   <Details title="Expense" currencySymbol={currency} />               
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