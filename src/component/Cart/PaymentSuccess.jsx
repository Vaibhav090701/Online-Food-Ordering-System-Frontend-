import { Box, Typography, Button, Snackbar, Alert, Fade } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SHOW_NOTIFICATION } from '../State/Notification/ActionType';
import { getUsersAddress } from '../State/Address/Action';
import { useLocation } from 'react-router-dom';
import { api } from '../config/api';


const PaymentSuccess = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const { addresses } = useSelector((store) => store.address);
  const {auth}=useSelector(store=>store);

      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);

  const dispatch=useDispatch();

  const location = useLocation();
  const [defaultAddress, setDefaultAddress] = useState(null);

  useEffect(() => {
    if (auth.user) {
      
      dispatch(getUsersAddress());
    } 
  }, [navigate, dispatch]);

  useEffect(() => {
    if (addresses && addresses.length > 0) {
      console.log("Address", addresses);
      
      const defaultAddr = addresses.find(addr => addr.default === true);
      console.log("Default address", defaultAddr);
      setDefaultAddress(defaultAddr);
    }
  }, [auth.user, addresses]);

  useEffect(() => {    

    const verifyPayment = async () => {
      try {
        // Extract sessionId (Stripe) or paymentId/orderId (Razorpay) from URL or state
        const urlParams = new URLSearchParams(location.search);
        const sessionId = urlParams.get('session_id'); // Stripe
        const paymentId = urlParams.get('payment_id'); // Razorpay
        const orderId = urlParams.get('order_id'); // Razorpay

        const response = await api.post('/payment/verify',{
            sessionId,
            paymentId,
            orderId,
          });

          console.log("Response", response);

        // if (!response.data.status==='failed') {
        //   throw new Error(`HTTP error! Status: ${response.status}`);
        // }

        const data = await response.data;
        console.log('Payment verification:', data);

        //We should use status=success when we use actual data.
        if (data.status === 'failed') {
          // setOpenSnackbar(true);
          // dispatch({
          //   type: SHOW_NOTIFICATION,
          //   payload: {
          //     message: `Payment successful!`,
          //     severity: 'success',
          //   },
          // });
                  // ✅ Only navigate when defaultAddress is available
        if (defaultAddress) {
          navigate('/cart', {
            state: {
              activeStep: 3,
              selectedAddress: defaultAddress,
              paymentMethod: data.paymentMethod,
              paymentDetails: {
                paymentId: data.paymentId,
                orderId: data.orderId,
                status: data.status,
              },
            },
          });
        } else {
          console.warn("Default address not set yet, waiting...");
        }
      } else {
        throw new Error('Payment failed');
      }

      } catch (err) {
        console.error('Payment verification error:', err.message);
        setError('Failed to verify payment. Please try again.');
        dispatch({
          type: SHOW_NOTIFICATION,
          payload: { message: 'Failed to verify payment. Please try again.', severity: 'error' },
        });
        setLoading(false);
      }
    };

      verifyPayment();
    
  }, [navigate, location, dispatch, defaultAddress]);


  const handleContinueShopping = () => {
    navigate('/cart'); // Redirect to home or cart page
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#1f2937',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Fade in={true} timeout={600}>
        <Box
          sx={{
            bgcolor: 'rgba(31, 41, 55, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid #d4a017',
            borderRadius: '12px',
            p: 4,
            textAlign: 'center',
            maxWidth: '400px',
            width: '100%',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)',
          }}
        >
           {loading ? (
            <>
              <CircularProgress sx={{ color: '#f97316', mb: 2 }} />
              <Typography
                variant="h5"
                sx={{
                  color: '#ffffff',
                  fontWeight: 'bold',
                  mb: 2,
                  fontSize: { xs: '1.25rem', sm: '1.5rem' },
                }}
              >
                Verifying Payment...
              </Typography>
            </>
          ) : error ? (
            <>
              <Typography
                variant="h5"
                sx={{
                  color: '#ef4444',
                  fontWeight: 'bold',
                  mb: 2,
                  fontSize: { xs: '1.25rem', sm: '1.5rem' },
                }}
              >
                Payment Verification Failed
              </Typography>
              <Button
                variant="contained"
                onClick={handleContinueShopping}
                sx={{
                  bgcolor: '#f97316',
                  color: '#ffffff',
                  borderRadius: '8px',
                  textTransform: 'none',
                  py: 1,
                  fontSize: { xs: '0.8rem', sm: '0.9rem' },
                  '&:hover': { bgcolor: '#ea580c' },
                }}
              >
                Try Again
              </Button>
            </>
          ) : (
            <>
          <CheckCircleIcon sx={{ color: '#d4a017', fontSize: '3rem', mb: 2 }} />
          <Typography
            variant="h5"
            sx={{
              color: '#ffffff',
              fontWeight: 'bold',
              mb: 2,
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
            }}
          >
            Payment Successful!
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#9ca3af',
              mb: 3,
              fontSize: { xs: '0.9rem', sm: '1rem' },
            }}
          >
                Redirecting to order confirmation...
                </Typography>
                </>
          )}
        </Box>
      </Fade>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        TransitionComponent={Fade}
        transitionDuration={600}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
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
          Payment Successful! Your order has been placed.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PaymentSuccess;