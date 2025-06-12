import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, TextField, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SHOW_NOTIFICATION } from '../State/Notification/ActionType';
import NotificationSnackbar from '../../util/NotificationSnackBar';
import axios from 'axios';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);

  // Pre-fill email if available
  // useEffect(() => {
  //   if (auth.user?.email) {
  //     setEmail(auth.user.email);
  //   }
  // }, [auth.user?.email]);

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      return 'Email is required';
    }
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value));
  };

  const handleSubmit = async () => {
    const error = validateEmail(email);
    if (error) {
      setEmailError(error);
      return;
    }

    setLoading(true);
    try {
      const response =await axios.post('http://localhost:8081/send-reset-otp',{}, {
        params:{email:email},
      });
      console.log("Response", response);
      
      if (response.status!=200) throw new Error('Email not found');
    
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: { message: 'OTP sent to your email.', severity: 'success' },
      });
      navigate('/reset-password', { state: { email } });
    } catch (err) {
      console.log("Error", err);
      
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: { message: 'Email not found or error occurred.', severity: 'error' },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: '#000000',
        background: 'linear-gradient(180deg, #1f2937 0%, #000000 100%)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: { xs: 2, sm: 4 },
        px: { xs: 2, sm: 3 },
        maxWidth: '600px',
        mx: 'auto',
      }}
    >
      <NotificationSnackbar />
      <Box sx={{ width: '100%', textAlign: 'center', mb: 4 }}>
        <Typography
          variant="h5"
          sx={{
            color: '#ffffff',
            fontWeight: 'bold',
            fontSize: { xs: '1.5rem', sm: '1.75rem' },
          }}
        >
          Forgot Password
        </Typography>
        <Typography
          sx={{
            color: '#9ca3af',
            fontSize: { xs: '0.9rem', sm: '1rem' },
            mt: 1,
          }}
        >
          Enter your email to receive a verification OTP.
        </Typography>
      </Box>
      <Box
        sx={{
          width: '100%',
          bgcolor: 'rgba(31, 41, 55, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid #d4a017',
          borderRadius: '12px',
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <TextField
          label="Email Address"
          value={email}
          onChange={handleEmailChange}
          error={!!emailError}
          helperText={emailError}
          type="email"
          fullWidth
          inputProps={{
            style: { color: '#ffffff', fontSize: { xs: '0.9rem', sm: '1rem' } },
          }}
          sx={{
            '& .MuiInputBase-root': {
              bgcolor: '#1f2937',
              borderRadius: '8px',
              height: { xs: '48px', sm: '56px' },
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#d4a017',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#f97316',
            },
            '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#f97316',
            },
            '& .MuiInputLabel-root': {
              color: '#9ca3af',
              fontSize: { xs: '0.9rem', sm: '1rem' },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#f97316',
            },
            '& .MuiFormHelperText-root': {
              color: '#ef4444',
              fontSize: { xs: '0.8rem', sm: '0.85rem' },
            },
          }}
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading || !!emailError || !email}
          sx={{
            bgcolor: '#f97316',
            color: '#ffffff',
            borderRadius: '12px',
            textTransform: 'none',
            py: 1.5,
            px: 4,
            fontSize: { xs: '0.9rem', sm: '1rem' },
            boxShadow: '0 4px 12px rgba(249, 115, 22, 0.5)',
            '&:hover': {
              bgcolor: '#ea580c',
              boxShadow: '0 6px 16px rgba(234, 88, 12, 0.7)',
            },
            '&:disabled': { bgcolor: '#9ca3af' },
          }}
        >
          {loading ? <CircularProgress size={20} sx={{ color: '#ffffff' }} /> : 'Send OTP'}
        </Button>
        <Typography
          sx={{
            color: '#9ca3af',
            fontSize: { xs: '0.8rem', sm: '0.9rem' },
            textAlign: 'center',
          }}
        >
          Remember your password?{' '}
          <Button
            onClick={() => navigate('/account/login')}
            sx={{
              color: '#f97316',
              textTransform: 'none',
              fontSize: { xs: '0.8rem', sm: '0.9rem' },
              p: 0,
              '&:hover': { color: '#ea580c' },
            }}
          >
            Back to Login
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default ForgetPassword;