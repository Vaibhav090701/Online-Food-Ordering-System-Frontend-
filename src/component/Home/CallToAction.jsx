import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ShoppingCart } from '@mui/icons-material'; // Example icon

const CallToAction = () => {
  return (
    <section className="py-12 px-4 text-center bg-pink-600 text-white">
      <Typography variant="h4" component="h2" gutterBottom>
        Ready to Order?
      </Typography>
      <Typography variant="body1" gutterBottom>
        Browse our menu and enjoy delicious food delivered to your doorstep.
      </Typography>
      <Button
        variant="contained"
        color="inherit"
        size="large"
        startIcon={<ShoppingCart />}
        sx={{
          backgroundColor: 'white',
          color: 'pink',
          '&:hover': {
            backgroundColor: '#f0f0f0', // Slightly darker hover effect
          },
        }}
      >
        Start Ordering Now
      </Button>
    </section>
  );
};

export default CallToAction;