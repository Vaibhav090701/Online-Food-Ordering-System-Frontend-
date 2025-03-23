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



  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom align="center">
        Your Addresses
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {address.addresses.map((address,index) => (
          <Grid item xs={12} sm={6} md={4} key={address.id}>
            <Card elevation={3} className="bg-white shadow-md rounded-lg">
              <CardContent>
                <Typography variant="h6" className="font-semibold text-gray-700" gutterBottom>
                  Address {index+1}
                </Typography>
                <Typography variant="body1"  className="text-gray-500">Street: {address.streetAddress}</Typography>
                <Typography variant="body1"  className="text-gray-500">Landmark: {address.landmark}</Typography>
                <Typography variant="body1"  className="text-gray-500">City: {address.city}</Typography>
                <Typography variant="body1"  className="text-gray-500">State: {address.state}</Typography>
                <Typography variant="body1"  className="text-gray-500">ZIP Code: {address.zipCode}</Typography>
              </CardContent>
              <Button variant='contained'>Update Address</Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Address;
