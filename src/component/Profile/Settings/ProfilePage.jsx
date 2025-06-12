import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, InputAdornment, Box, Container, Button, CircularProgress, Typography } from '@mui/material';
import { AlternateEmail, Phone, Email } from '@mui/icons-material';
import TopSection from '../TopSection';

export default function ProfileSettingsPage() {
  const [username, setUsername] = useState('john_doe'); // Mocked initial value
  const [mobileNo, setMobileNo] = useState('9876543210'); // Mocked initial value
  const [email, setEmail] = useState('john.doe@example.com'); // Mocked initial value
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    const usernameRegex = /^[a-z0-9_]+$/;
    const mobileRegex = /^\d{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!username.trim()) {
      newErrors.username = 'Username is required';
    } else if (!usernameRegex.test(username.trim())) {
      newErrors.username = 'Username can only contain letters, numbers, or underscores';
    }

    if (!mobileNo.trim()) {
      newErrors.mobileNo = 'Mobile number is required';
    } else if (!mobileRegex.test(mobileNo.trim())) {
      newErrors.mobileNo = 'Mobile number must be 10 digits';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = 'Invalid email format';
    }

    return newErrors;
  };

  const handleSave = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSaving(true);
    // Simulate API call (replace with real API, e.g., axios.patch)
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Profile updated successfully');
      navigate('/settings');
    }, 2000);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', transition: 'background-color 0.3s' }}>
      {/* Top Section */}
      <TopSection
        heading="Profile"
        contextButtonText="Save"
        contextButtonAction={handleSave}
        contextButtonDisabled={isSaving}
        contextButtonLoading={isSaving}
      />

      {/* Main Content */}
      <Container maxWidth="sm" sx={{ py: 6, px: { xs: 2, sm: 3 } }}>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Username */}
          <TextField
            id="username"
            label="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setErrors({ ...errors, username: '' });
            }}
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AlternateEmail sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
            error={!!errors.username}
            helperText={errors.username}
            sx={{ bgcolor: 'background.paper', transition: 'background-color 0.2s' }}
          />

          {/* Mobile Number */}
          <TextField
            id="mobileNo"
            label="Mobile Number"
            value={mobileNo}
            onChange={(e) => {
              setMobileNo(e.target.value);
              setErrors({ ...errors, mobileNo: '' });
            }}
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
            error={!!errors.mobileNo}
            helperText={errors.mobileNo}
            sx={{ bgcolor: 'background.paper', transition: 'background-color 0.2s' }}
          />

          {/* Email */}
          <TextField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors({ ...errors, email: '' });
            }}
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
            error={!!errors.email}
            helperText={errors.email}
            sx={{ bgcolor: 'background.paper', transition: 'background-color 0.2s' }}
          />

          {/* API Error */}
          {errors.api && (
            <Typography color="error" variant="body2" align="center">
              {errors.api}
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
}