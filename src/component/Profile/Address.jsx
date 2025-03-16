import React, { useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Box, Paper, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersAddress } from '../State/Address/Action';

const Address = () => {
  const dispatch=useDispatch();
  const {address}=useSelector(store=>store);
  const jwt=localStorage.getItem("jwt");

  useEffect(()=>{
    dispatch(getUsersAddress(jwt))
  },[jwt]);

  // Sample data for multiple addresses
  const userAddresses = [
    {
      id: 1,
      street: '123 Main St',
      city: 'Springfield',
      state: 'IL',
      zip: '62701',
      country: 'USA',
    },
    {
      id: 2,
      street: '456 Elm St',
      city: 'Chicago',
      state: 'IL',
      zip: '60601',
      country: 'USA',
    },
    {
      id: 3,
      street: '789 Oak St',
      city: 'Madison',
      state: 'WI',
      zip: '53703',
      country: 'USA',
    },
  ];

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom align="center">
        Your Addresses
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {address.addresses.map((address,index) => (
          <Grid item xs={12} sm={6} md={4} key={address.id}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Address {index+1}
                </Typography>
                <Typography variant="body1">Street: {address.streetAddress}</Typography>
                <Typography variant="body1">Landmark: {address.landmark}</Typography>
                <Typography variant="body1">City: {address.city}</Typography>
                <Typography variant="body1">State: {address.state}</Typography>
                <Typography variant="body1">ZIP Code: {address.zipCode}</Typography>
              </CardContent>
              <Button>Update Address</Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Address;
