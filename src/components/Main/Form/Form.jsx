import React, { useState, useEffect, useContext } from 'react';
import { TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import formatDate from '../../../utils/formatDate';
import { FinanceTrackerContext } from '../../../context/context';
import { incomeCategories, expenseCategories } from '../../../constants/categories';
import useStyles from './styles'; 
import { useSpeechContext } from '@speechly/react-client';
import Confirmation from '../../Confirmation/Confirmation';

const Form = ({editMode, state}) => {
  const initialState = {
    amount: editMode ? state.amount : '',
    category: editMode ? state.category : '',
    type: editMode ? state.type : '',
    date: editMode ? state.date : formatDate(new Date())
  };

    const classes = useStyles();
    const [formData, setFormData] = useState(initialState);
    const { addTransaction } = useContext(FinanceTrackerContext);
    const { segment } = useSpeechContext();
    const [open, setOpen] = useState(false);

    const createTransaction = () => {
        if(Number.isNaN(Number(formData.amount)) || !formData.amount || !formData.category || !formData.type || !formData.date) {
            return;
        }

        const transaction = { ...formData, amount: Number(formData.amount), id: uuidv4() };  
        addTransaction(transaction);
        setOpen(true);
        setFormData(initialState);
    };   
    
    useEffect(() => {
        if (segment) {
          if (segment.intent.intent === 'add_expense') {
            setFormData({ ...formData, type: 'Expense' });
          } else if (segment.intent.intent === 'add_income') {
            setFormData({ ...formData, type: 'Income' });
          } else if (segment.isFinal && segment.intent.intent === 'create_transaction') {
            return createTransaction();
          } else if (segment.isFinal && segment.intent.intent === 'cancel_transaction') {
            return setFormData(initialState);
          }
    
          segment.entities.forEach((s) => {
            const category = `${s.value.charAt(0)}${s.value.slice(1).toLowerCase()}`;
    
            switch (s.type) {
              case 'amount':
                setFormData({ ...formData, amount: s.value });
                break;
              case 'category':
                if (incomeCategories.map((iC) => iC.type).includes(category)) {
                  setFormData({ ...formData, type: 'Income', category });
                } else if (expenseCategories.map((eC) => eC.type).includes(category)) {
                  setFormData({ ...formData, type: 'Expense', category });
                }
                break;
              case 'date':
                setFormData({ ...formData, date: s.value });
                break;
              default:
                break;
            }
          });
    
          if (segment.isFinal && formData.amount && formData.category && formData.type && formData.date) {
            createTransaction();
          }
        }
      }, [segment]);    

    const selectedCategories = formData.type === "Income" ? incomeCategories : expenseCategories;

    return (
      <Grid container spacing={2}>
        <Confirmation open={open} setOpen={setOpen} severity="success" message="Transaction successfully added!" />
          <Grid item xs={12}>
              <Typography variant="subtitle2" align="center" gutterBottom>
                {segment && segment.words.map((w) => w.value.toLowerCase()).join(" ")}
              </Typography>
          </Grid>
          
          <Grid item xs={6}>
              <FormControl fullWidth>
                  <InputLabel>Type</InputLabel>
                  <Select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                      <MenuItem value="Income">Income</MenuItem>
                      <MenuItem value="Expense">Expense</MenuItem>
                  </Select>
              </FormControl>
          </Grid>

          <Grid item xs={6}>
              <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                      {selectedCategories.map((c) => <MenuItem key={c.type} value={c.type}>{c.type}</MenuItem>)}
                  </Select>
              </FormControl>
          </Grid>

         <Grid item xs={6}>
          <TextField type="number" label="Amount" fullWidth value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} />     
        </Grid>
      
        <Grid item xs={6}>
          <TextField type="date" label="Date" fullWidth value={formData.date} onChange={(e) =>setFormData({ ...formData, date: e.target.value })} />     
        </Grid>

        <Button className={classes.button} variant="outlined" color="primary" fullWidth onClick={createTransaction}>Add</Button>
      </Grid>
  );
};

export default Form;