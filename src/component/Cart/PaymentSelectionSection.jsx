import { Box, Button, Fade, Modal, Typography, CircularProgress, Snackbar, Alert } from '@mui/material';
import React, { useState } from 'react';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaymentIcon from '@mui/icons-material/Payment';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PaymentForm from './PaymentForm';
import { useSelector } from 'react-redux';
import OrderConfirmationSection from './OrderConfirmationSection';
import axios from 'axios';
import { api } from '../config/api';

const PaymentSelectionSection = ({ onSelectPayment, onPaymentSuccess, cartItems, totalPay }) => {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const jwt = localStorage.getItem('jwt');

  const {cart}=useSelector(store=>store)

  const paymentOptions = [
    { id: 'CARD', label: 'Credit/Debit Card', icon: <CreditCardIcon sx={{ color: '#f97316' }} /> },
    { id: 'UPI', label: 'UPI', icon: <PaymentIcon sx={{ color: '#f97316' }} /> },
    { id: 'COD', label: 'Cash on Delivery', icon: <LocalAtmIcon sx={{ color: '#f97316' }} /> },
  ];

  // Load Razorpay SDK dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSelectPayment = async (method) => {
    setPaymentMethod(method);
    onSelectPayment(method);
    setOpen(true);
    setError(null);
    setLoading(true);

    try {
      if (method === 'COD') {
        // Skip modal, navigate to order confirmation
        setLoading(false);
        navigate('/cart', {
          state: {
            activeStep: 3,
            paymentMethod: 'COD',
            paymentDetails: { paymentId: null, orderId: null, status: 'pending' },
          },
        });
      } 
      else if (method === 'CARD') {
        console.log('Initiating CARD payment', { amount: totalPay, cartItems });
        const reqData={
          amount: Math.round(totalPay * 100), // Convert to cents
            currency: 'INR',
            cartItems:cart.cartItems,
            successUrl: window.location.origin + '/payment/success',
            cancelUrl: window.location.origin + '/payment/cancel',
        }
        const response = await api.post('/payment/create-checkout-session',reqData);

        if (response.status!=200) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.data;
        console.log('Stripe response:', data);

        if (!data.sessionUrl) {
          throw new Error('No sessionUrl in response');
        }

        setLoading(false);
        setOpen(false);
        window.location.href = data.sessionUrl; // Redirect to Stripe Checkout
      } else if (method === 'UPI') {
        console.log('Initiating UPI payment', { amount: totalPay, cartItems });
        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
          throw new Error('Failed to load Razorpay SDK');
        }

        const reqData={
            amount: Math.round(totalPay * 100), // Convert to paise
            currency: 'INR',
            cartItems:cart.cartItems,
            successUrl: window.location.origin + '/payment/success',
            cancelUrl: window.location.origin + '/payment/cancel',
        }

        const response = await api.post('/payment/create-razorpay-order',reqData);

        if (response.status!=200) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.data; 
        console.log('Razorpay response:', data);

        if (!data.orderId || !data.keyId) {
          throw new Error('Missing orderId or keyId in response');
        }

        const options = {
          key: data.keyId,
          amount: Math.round(totalPay * 100),
          currency: 'INR',
          order_id: data.orderId,
          name: 'Foodie',
          description: 'Order Payment',
          handler: function (response) {
            console.log('Razorpay payment success:', response);
            onPaymentSuccess({
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
              paymentMethod: 'UPI',
            });
          },
          prefill: {
            name: 'Customer Name',
            email: 'customer@example.com',
          },
          theme: {
            color: '#f97316',
          },
          modal: {
            ondismiss: function () {
              console.log('Razorpay modal dismissed');
              onSelectPayment(null);
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function (response) {
          console.error('Razorpay payment failed:', response);
          setError('UPI payment failed. Please try again.');
          setOpen(true); // Reopen modal to show error
        });

        setLoading(false);
        setOpen(false);
        rzp.open();
      }
      // COD: Stay in modal, render PaymentForm

    } catch (err) {
      console.error(`Error in ${method} payment:`, err.message);
      setError(`Failed to initiate ${method.toLowerCase()} payment: ${err.message}`);
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setPaymentMethod(null);
    setError(null);
    setLoading(false);
    onSelectPayment(null);
  };

  const handlePaymentSuccess = (paymentIntent) => {
    onPaymentSuccess(paymentIntent);
    setOpen(false);
    setPaymentMethod(null);
    setError(null);
    setLoading(false);
    onSelectPayment(null);
    // Show success notification for COD
    setSnackbarMessage('Payment Successful! Your order has been placed.');
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setSnackbarMessage('');
  };

  return (
    <Fade in={true} timeout={600}>
      <Box
        sx={{
          bgcolor: 'transparent',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          maxWidth: '600px',
          mx: 'auto',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: '#ffffff',
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 2,
            textShadow: '0 2px 6px rgba(0, 0, 0, 0.5)',
            fontSize: { xs: '1.25rem', sm: '1.5rem' },
          }}
        >
          Choose Payment Method
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {paymentOptions.map((option) => (
            <Box
              key={option.id}
              sx={{
                p: 2,
                bgcolor: 'rgba(31, 41, 55, 0.8)',
                backdropFilter: 'blur(8px)',
                borderRadius: '12px',
                border: `1px solid ${
                  paymentMethod === option.id ? '#d4a017' : 'rgba(249, 115, 22, 0.4)'
                }`,
                transition: 'transform 0.3s, border-color 0.3s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  borderColor: '#f97316',
                },
                position: 'relative',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                {option.icon}
                <Typography
                  variant="body1"
                  sx={{ color: '#ffffff', fontWeight: 'bold', fontSize: '0.9rem' }}
                >
                  {option.label}
                </Typography>
              </Box>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => handleSelectPayment(option.id)}
                disabled={loading}
                sx={{
                  borderColor: '#f97316',
                  color: '#f97316',
                  borderRadius: '8px',
                  textTransform: 'none',
                  py: 1,
                  fontSize: { xs: '0.8rem', sm: '0.9rem' },
                  '&:hover': { borderColor: '#ea580c', bgcolor: 'rgba(249, 115, 22, 0.1)' },
                  '&:disabled': { borderColor: '#9ca3af', color: '#9ca3af' },
                }}
              >
                {loading && paymentMethod === option.id ? (
                  <CircularProgress size={20} sx={{ color: '#f97316' }} />
                ) : paymentMethod === option.id ? (
                  'Selected'
                ) : (
                  'Select'
                )}
              </Button>
              {paymentMethod === option.id && !loading && (
                <CheckCircleIcon
                  sx={{ color: '#d4a017', position: 'absolute', top: 12, right: 12, fontSize: '1.2rem' }}
                />
              )}
            </Box>
          ))}
        </Box>
        {/* <Modal
          open={open}
          onClose={handleClose}
          closeAfterTransition
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Fade in={open} timeout={600}>
            <Box
              sx={{
                width: { xs: '90%', sm: 360 },
                bgcolor: 'rgba(31, 41, 55, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid #d4a017',
                borderRadius: '12px',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)',
                p: 3,
                outline: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                maxHeight: '90vh',
                overflowY: 'auto',
                position: 'relative',
              }}
            >
              {paymentMethod === 'COD' ? 
              <OrderConfirmationSection />: (
                <>
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#ffffff',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      fontSize: { xs: '1rem', sm: '1.125rem' },
                    }}
                  >
                    {paymentMethod === 'CARD' ? 'Redirecting to Card Payment' : 'Redirecting to UPI Payment'}
                  </Typography>
                  {loading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                      <CircularProgress sx={{ color: '#f97316' }} />
                    </Box>
                  )}
                  {error && (
                    <Typography sx={{ color: '#ef4444', fontSize: '0.8rem', textAlign: 'center' }}>
                      {error}
                    </Typography>
                  )}
                  {!loading && !error && (
                    <Typography
                      variant="body2"
                      sx={{ color: '#9ca3af', fontSize: '0.8rem', textAlign: 'center' }}
                    >
                      You will be redirected to a secure payment page.
                    </Typography>
                  )}
                </>
              )}
              <Button
                fullWidth
                variant="outlined"
                onClick={handleClose}
                disabled={loading}
                sx={{
                  borderColor: '#f97316',
                  color: '#f97316',
                  borderRadius: '8px',
                  textTransform: 'none',
                  py: 1,
                  fontSize: { xs: '0.8rem', sm: '0.9rem' },
                  '&:hover': { borderColor: '#ea580c', bgcolor: 'rgba(249, 115, 22, 0.1)' },
                  '&:disabled': { borderColor: '#9ca3af', color: '#9ca3af' },
                  mt: 1,
                }}
              >
                Close
              </Button>
            </Box>
          </Fade>
        </Modal> */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={5000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          TransitionComponent={Fade}
          transitionDuration={600}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            icon={<CheckCircleIcon sx={{ color: '#d4a017' }} />}
            sx={{
              bgcolor: 'rgba(31, 41, 55, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '1px solid #f97316',
              color: '#ffffff',
              fontSize: '0.8rem',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
              maxWidth: { xs: '90%', sm: '400px' },
              '& .MuiAlert-icon': { color: '#d4a017' },
              '& .MuiAlert-action': { color: '#f97316' },
            }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Fade>
  );
};

export default PaymentSelectionSection;