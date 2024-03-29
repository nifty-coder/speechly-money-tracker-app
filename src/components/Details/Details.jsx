import React from 'react';
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';
import { Doughnut } from 'react-chartjs-2';
import commafy from '../../utils/commafy';
import useStyles from './styles';
import useTransactions from '../../useTransactions';

const DetailsCard = ({ title, subheader, currencySymbol }) => {
  const { total, chartData } = useTransactions(title);
  const classes = useStyles();

  return (
    <Card className={title === 'Income' ? classes.income : classes.expense}>
      <CardHeader title={title} subheader={subheader} />
      <CardContent>
        <Typography variant="h5">{`${currencySymbol}` + commafy(total)}</Typography>
        <Doughnut data={chartData} />
      </CardContent>
    </Card>
  );
};

export default DetailsCard;