import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useDispatch } from 'react-redux';
import { createOrder } from '../State/Order/Action';

const PaymentForm = ({ paymentMethod, onPaymentSuccess, cartItems, totalPay }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [upiId, setUpiId] = useState('');
  const jwt = localStorage.getItem('jwt');

  const handleCardPayment = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    try {
      // Call backend to create a Payment Intent
      const response = await fetch('/api/payment/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          amount: Math.round(totalPay * 100), // Convert to cents
          currency: 'usd', // Adjust based on region
          cartItems,
        }),
      });

      const { clientSecret } = await response.json();

      // Confirm card payment with Stripe
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: 'Customer Name', // Replace with user input or profile data
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
        setProcessing(false);
      } else if (result.paymentIntent.status === 'succeeded') {
        // Dispatch order creation
        dispatch(
          createOrder({
            cartItems: cartItems.map((item) => ({
              menuItemId: item.menuItemDto.id,
              quantity: item.quantity,
              addons: item.addons?.map((addon) => ({
                id: addon.id,
                name: addon.name,
                price: addon.price,
              })),
            })),
            totalPrice: totalPay,
            paymentMethod: 'CARD',
            jwt,
          })
        );
        onPaymentSuccess(result.paymentIntent);
        setProcessing(false);
      }
    } catch (err) {
      setError('Payment failed. Please try again.');
      setProcessing(false);
    }
  };

  const handleUpiPayment = async (event) => {
    event.preventDefault();
    setProcessing(true);
    setError(null);

    try {
      // Call backend to create a UPI payment request (e.g., Razorpay)
      const response = await fetch('/api/payment/create-upi-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          amount: totalPay,
          currency: 'INR', // UPI typically for India
          upiId,
          cartItems,
        }),
      });

      const { paymentUrl } = await response.json();

      // Redirect to UPI payment page
      window.location.href = paymentUrl;

      // Note: Success/failure handled via webhook or redirect URL
    } catch (err) {
      setError('UPI payment initiation failed. Please try again.');
      setProcessing(false);
    }
  };

  const handleCodPayment = async (event) => {
    event.preventDefault();
    setProcessing(true);
    setError(null);

    try {
      // Dispatch order creation for COD
      dispatch(
        createOrder({
          cartItems: cartItems.map((item) => ({
            menuItemId: item.menuItemDto.id,
            quantity: item.quantity,
            addons: item.addons?.map((addon) => ({
              id: addon.id,
              name: addon.name,
              price: addon.price,
            })),
          })),
          totalPrice: totalPay,
          paymentMethod: 'COD',
          jwt,
        })
      );
      onPaymentSuccess({ id: 'COD_SUCCESS' }); // Mock success
      setProcessing(false);
    } catch (err) {
      setError('Order creation failed. Please try again.');
      setProcessing(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: '#ffffff',
          fontWeight: 'bold',
          fontSize: { xs: '1rem', sm: '1.125rem' },
        }}
      >
        {paymentMethod === 'CARD' ? 'Enter Card Details' : paymentMethod === 'UPI' ? 'Enter UPI Details' : 'Confirm Cash on Delivery'}
      </Typography>
      {paymentMethod === 'CARD' && (
        <Box
          component="form"
          onSubmit={handleCardPayment}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <Box
            sx={{
              p: 2,
              bgcolor: '#ffffff',
              borderRadius: '8px',
              border: '1px solid #d4a017',
            }}
          >
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#1f2937',
                    '::placeholder': { color: '#9ca3af' },
                  },
                  invalid: { color: '#ef4444' },
                },
              }}
            />
          </Box>
          {error && (
            <Typography sx={{ color: '#ef4444', fontSize: '0.8rem' }}>{error}</Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            disabled={!stripe || processing}
            sx={{
              bgcolor: '#f97316',
              color: '#ffffff',
              borderRadius: '8px',
              py: 1.5,
              fontSize: { xs: '0.8rem', sm: '0.9rem' },
              '&:hover': { bgcolor: '#ea580c' },
              '&:disabled': { bgcolor: '#9ca3af' },
            }}
          >
            {processing ? <CircularProgress size={20} color="inherit" /> : `Pay $${totalPay}`}
          </Button>
        </Box>
      )}
      {paymentMethod === 'UPI' && (
        <Box
          component="form"
          onSubmit={handleUpiPayment}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label="UPI ID"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            fullWidth
            required
            sx={{
              '& .MuiInputBase-root': { bgcolor: '#1f2937', borderRadius: '8px' },
              '& .MuiInputLabel-root': { color: '#9ca3af' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#d4a017' },
                '&:hover fieldset': { borderColor: '#f97316' },
              },
              
            }}
          />
          {error && (
            <Typography sx={{ color: '#ef4444', fontSize: '0.8rem' }}>{error}</Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            disabled={processing || !upiId}
            sx={{
              bgcolor: '#f97316',
              color: '#ffffff',
              borderRadius: '8px',
              py: 1.5,
              fontSize: { xs: '0.8rem', sm: '0.9rem' },
              '&:hover': { bgcolor: '#ea580c' },
              '&:disabled': { bgcolor: '#9ca3af' },
            }}
          >
            {processing ? <CircularProgress size={20} color="inherit" /> : `Pay $${totalPay}`}
          </Button>
        </Box>
      )}
      {paymentMethod === 'COD' && (
        <Box
          component="form"
          onSubmit={handleCodPayment}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <Typography sx={{ color: '#9ca3af', fontSize: '0.9rem' }}>
            Pay $${totalPay} in cash upon delivery.
          </Typography>
          {error && (
            <Typography sx={{ color: '#ef4444', fontSize: '0.8rem' }}>{error}</Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            disabled={processing}
            sx={{
              bgcolor: '#f97316',
              color: '#ffffff',
              borderRadius: '8px',
              py: 1.5,
              fontSize: { xs: '0.8rem', sm: '0.9rem' },
              '&:hover': { bgcolor: '#ea580c' },
              '&:disabled': { bgcolor: '#9ca3af' },
            }}
          >
            {processing ? <CircularProgress size={20} color="inherit" /> : 'Confirm Order'}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default PaymentForm;