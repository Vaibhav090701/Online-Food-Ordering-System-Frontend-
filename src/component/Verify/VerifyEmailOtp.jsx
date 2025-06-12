import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography, TextField, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { SHOW_NOTIFICATION } from '../State/Notification/ActionType';
import NotificationSnackbar from '../../util/NotificationSnackBar';
import axios from 'axios';

const VerifyOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [resendDisabled, setResendDisabled] = useState(true);
  const inputRefs = useRef([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);
  const jwt = localStorage.getItem('jwt');

       // ... (previous state and hooks)
     const location = useLocation();
     const emailFromState = location.state?.email; // Get email from ForgetPassword

  

  // Start resend timer on mount
  useEffect(() => {
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          setResendDisabled(false);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Send OTP on mount
  //  useEffect(() => {
  //      if (!emailFromState && !auth.user.email) {
  //        navigate('/account/login');
  //        return;
  //      }
  //      sendOTP();
  //    }, [emailFromState, navigate]);

  const sendOTP = async () => {
           const targetEmail = emailFromState || auth.user.email;
       if (!targetEmail) {
         dispatch({
           type: SHOW_NOTIFICATION,
           payload: { message: 'No email provided.', severity: 'error' },
         });
         navigate('/account/login');
         return;
       }

    try {
      const response = await axios.post('http://localhost:8081/send-otp', {},{
        
            params:{email:targetEmail},
            withCredentials: true,              // ✅ send cookies
        },
    );
      if (!response.ok) throw new Error('Failed to send OTP');
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: { message: `OTP sent to ${targetEmail}.`, severity: 'success' },
      });
    } catch (err) {
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: { message: 'Failed to send OTP. Try again.', severity: 'error' },
      });
      navigate('/account/login');
    }
  };

  const handleInputChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return; // Allow only digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pastedData.length === 6) {
      setOtp(pastedData.split(''));
      inputRefs.current[5].focus();
    }
  };

  const handleVerifyOTP = async () => {
    const otpCode = otp.join('');
    const targetEmail = emailFromState || auth.user.email;
    if (otpCode.length !== 6) {
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: { message: 'Please enter a 6-digit OTP.', severity: 'error' },
      });
      return;
    }
    console.log("Email", targetEmail);
    console.log("otp", otpCode);

    const reqData={
        email: targetEmail,
        otp: otpCode}
    
    setLoading(true);
    try {
     const response = await axios.post(
      'http://localhost:8081/verify-otp',reqData)
      // if (!response.ok) throw new Error('Invalid OTP');
      dispatch({ type: 'VERIFY_OTP_SUCCESS', payload: { isEmailVerified: true } });
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: { message: 'Email verified successfully.', severity: 'success' },
      });
    //   const savedState = JSON.parse(localStorage.getItem('cartCheckoutState') || '{}');
    console.log("Email from state", emailFromState);
    
    if(targetEmail===emailFromState){
      navigate("/reset-password")
    }
    else{
      navigate('/');
    }
    } catch (err) {
      console.log("error",err);
      
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: { message: 'Invalid or expired OTP.', severity: 'error' },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = () => {
    setResendTimer(30);
    setResendDisabled(true);
    sendOTP();
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0].focus();
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
          Verify Your Email
        </Typography>
        <Typography
          sx={{
            color: '#9ca3af',
            fontSize: { xs: '0.9rem', sm: '1rem' },
            mt: 1,
          }}
        >
          Enter the 6-digit OTP sent to your email.
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
          alignItems: 'center',
          gap: 3,
        }}
      >
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
          {otp.map((digit, index) => (
            <TextField
              key={index}
              inputRef={(el) => (inputRefs.current[index] = el)}
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : null}
              type="tel"
              inputProps={{
                maxLength: 1,
                style: { textAlign: 'center', fontSize: '1.5rem', color: '#ffffff' },
              }}
              sx={{
                width: { xs: '40px', sm: '48px' },
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
              }}
            />
          ))}
        </Box>
        <Button
          variant="contained"
          onClick={handleVerifyOTP}
          disabled={loading || otp.join('').length !== 6}
          sx={{
            bgcolor: '#f97316',
            color: '#ffffff',
            borderRadius: '12px',
            textTransform: 'none',
            py: 1.5,
            px: 4,
            fontSize: { xs: '0.9rem', sm: '1rem' },
            minWidth: '200px',
            boxShadow: '0 4px 12px rgba(249, 115, 22, 0.5)',
            '&:hover': {
              bgcolor: '#ea580c',
              boxShadow: '0 6px 16px rgba(234, 88, 12, 0.7)',
            },
            '&:disabled': { bgcolor: '#9ca3af' },
          }}
        >
          {loading ? <CircularProgress size={20} sx={{ color: '#ffffff' }} /> : 'Verify OTP'}
        </Button>
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            sx={{
              color: '#9ca3af',
              fontSize: { xs: '0.8rem', sm: '0.9rem' },
              mb: 1,
            }}
          >
            Didn’t receive the OTP?{' '}
            <Button
              onClick={handleResendOTP}
              disabled={resendDisabled}
              sx={{
                color: '#f97316',
                textTransform: 'none',
                fontSize: { xs: '0.8rem', sm: '0.9rem' },
                p: 0,
                '&:hover': { color: '#ea580c' },
                '&:disabled': { color: '#9ca3af' },
              }}
            >
              Resend {resendDisabled ? `in ${resendTimer}s` : 'OTP'}
            </Button>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default VerifyOTP;