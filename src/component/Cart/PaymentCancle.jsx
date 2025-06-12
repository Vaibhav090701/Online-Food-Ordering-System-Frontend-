import { Box, Typography, Button, Snackbar, Alert, Fade } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import { useNavigate } from 'react-router-dom';

const PaymentCancel = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setOpenSnackbar(true);
  }, []);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleTryAgain = () => {
    navigate('/cart'); // Redirect to cart or payment page
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
            border: '1px solid #f97316',
            borderRadius: '12px',
            p: 4,
            textAlign: 'center',
            maxWidth: '400px',
            width: '100%',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)',
          }}
        >
          <ErrorIcon sx={{ color: '#ef4444', fontSize: '3rem', mb: 2 }} />
          <Typography
            variant="h5"
            sx={{
              color: '#ffffff',
              fontWeight: 'bold',
              mb: 2,
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
            }}
          >
            Payment Failed or Cancelled
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#9ca3af',
              mb: 3,
              fontSize: { xs: '0.9rem', sm: '1rem' },
            }}
          >
            Your payment was not completed. Please try again.
          </Typography>
          <Button
            variant="contained"
            onClick={handleTryAgain}
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
        </Box>
      </Fade>
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
          severity="error"
          icon={<ErrorIcon sx={{ color: '#ef4444' }} />}
          sx={{
            bgcolor: 'rgba(31, 41, 55, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid #ef4444',
            color: '#ffffff',
            fontSize: '0.8rem',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            maxWidth: { xs: '90%', sm: '400px' },
            '& .MuiAlert-icon': { color: '#ef4444' },
            '& .MuiAlert-action': { color: '#f97316' },
          }}
        >
          Payment failed or cancelled. Please try again.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PaymentCancel;