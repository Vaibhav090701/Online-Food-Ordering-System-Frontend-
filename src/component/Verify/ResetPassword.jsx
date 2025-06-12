import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography, TextField, CircularProgress } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { SHOW_NOTIFICATION } from '../State/Notification/ActionType';
import NotificationSnackbar from '../../util/NotificationSnackBar';
import axios from 'axios';

const ResetPassword = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [resendDisabled, setResendDisabled] = useState(true);
  const inputRefs = useRef([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const emailFromState = location.state?.email; // Get email from ForgetPassword
  let otpCode="";

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

  // Send OTP on mount if email is available
  // useEffect(() => {
  //   if (!email) {
  //     dispatch({
  //       type: SHOW_NOTIFICATION,
  //       payload: { message: 'No email provided.', severity: 'error' },
  //     });
  //     navigate('/forget-password');
  //     return;
  //   }
  //   sendOTP();
  // }, [email, navigate, dispatch]);


  const validateForm = () => {
    otpCode = otp.join('');
    if (otpCode.length !== 6 || !/^\d{6}$/.test(otpCode)) {
      return 'Please enter a valid 6-digit OTP';
    }
    
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters';
    if (password !== confirmPassword) return 'Passwords do not match';
    return '';
  };

  const handleOtpChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleOtpPaste = (e) => {
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pastedData.length === 6) {
      setOtp(pastedData.split(''));
      inputRefs.current[5].focus();
      setError('');
    }
  };

  const handleSubmit = async () => {
    const errorMsg = validateForm();
    if (errorMsg) {
      setError(errorMsg);
      return;
    }
    const data={
      email:emailFromState,
      otp:otpCode,
      newPassword:password
    }

    console.log("New Password data", data);

    setLoading(true);
  try {
      const response = await axios.post('http://localhost:8081/reset-password',data );
      // if (!response.ok) throw new Error('Invalid OTP or failed to reset password');
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: { message: 'Password reset successfully.', severity: 'success' },
      });
      const savedState = location.state?.savedState || {};
      navigate('/account/login', { state: savedState });
    } catch (err) {
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: { message: err.message || 'Failed to reset password.', severity: 'error' },
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
          Reset Password
        </Typography>
        <Typography
          sx={{
            color: '#9ca3af',
            fontSize: { xs: '0.9rem', sm: '1rem' },
            mt: 1,
          }}
        >
          Enter the OTP sent to {emailFromState || 'your account'} and your new password.
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
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
          {otp.map((digit, index) => (
            <TextField
              key={index}
              inputRef={(el) => (inputRefs.current[index] = el)}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleOtpKeyDown(index, e)}
              onPaste={index === 0 ? handleOtpPaste : null}
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
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#d4a017' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#f97316' },
                '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#f97316' },
                '& .MuiFormHelperText-root': {
                  color: '#ef4444',
                  fontSize: { xs: '0.8rem', sm: '0.85rem' },
                },
              }}
              error={!!error && error.includes('OTP')}
              helperText={error && error.includes('OTP') ? error : ''}
            />
          ))}
        </Box>
        <TextField
          label="New Password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError('');
          }}
          error={!!error && error.includes('Password')}
          helperText={error && error.includes('Password') ? error : ''}
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
            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#d4a017' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#f97316' },
            '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#f97316' },
            '& .MuiInputLabel-root': {
              color: '#9ca3af',
              fontSize: { xs: '0.9rem', sm: '1rem' },
            },
            '& .MuiInputLabel-root.Mui-focused': { color: '#f97316' },
            '& .MuiFormHelperText-root': {
              color: '#ef4444',
              fontSize: { xs: '0.8rem', sm: '0.85rem' },
            },
          }}
        />
        <TextField
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setError('');
          }}
          error={!!error && error.includes('Passwords')}
          helperText={error && error.includes('Passwords') ? error : ''}
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
            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#d4a017' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#f97316' },
            '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#f97316' },
            '& .MuiInputLabel-root': {
              color: '#9ca3af',
              fontSize: { xs: '0.9rem', sm: '1rem' },
            },
            '& .MuiInputLabel-root.Mui-focused': { color: '#f97316' },
            '& .MuiFormHelperText-root': {
              color: '#ef4444',
              fontSize: { xs: '0.8rem', sm: '0.85rem' },
            },
          }}
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading || !!error || otp.join('').length !== 6 || !password || !confirmPassword}
          sx={{
            bgcolor: '#f97316',
            color: '#ffffff',
            borderRadius: '12px',
            textTransform: 'none',
            py: 1.5,
            px: 4,
            fontSize: { xs: '0.9rem', sm: '1rem' },
            boxShadow: '0 4px 12px rgba(249, 115, 22, 0.5)',
            '&:hover': { bgcolor: '#ea580c', boxShadow: '0 6px 16px rgba(234, 88, 12, 0.7)' },
            '&:disabled': { bgcolor: '#9ca3af' },
          }}
        >
          {loading ? <CircularProgress size={20} sx={{ color: '#ffffff' }} /> : 'Reset Password'}
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

export default ResetPassword;