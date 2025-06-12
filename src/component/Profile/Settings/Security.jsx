import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  TextField,
  Typography,
  Switch,
  Card,
  CardContent,
  CardActions,
  Button,
  Divider,
  CircularProgress,
  InputAdornment,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import TopSection from '../TopSection';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LockIcon from '@mui/icons-material/Lock';
import { toast } from 'react-toastify';

export default function SecuritySettingsPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [enable2FA, setEnable2FA] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const connectedAccounts = [
    {
      name: 'Google',
      icon: <GoogleIcon sx={{ color: '#ef4444', fontSize: 24 }} />,
      connected: true,
    },
    {
      name: 'Facebook',
      icon: <FacebookIcon sx={{ color: '#2563eb', fontSize: 24 }} />,
      connected: false,
    },
    {
      name: 'Instagram',
      icon: <InstagramIcon sx={{ color: '#ec4899', fontSize: 24 }} />,
      connected: false,
    },
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!currentPassword) newErrors.currentPassword = 'Current password is required';
    if (!newPassword) newErrors.newPassword = 'New password is required';
    else if (newPassword.length < 8) newErrors.newPassword = 'Password must be at least 8 characters long';
    if (newPassword && !confirmPassword) newErrors.confirmPassword = 'Please confirm your new password';
    else if (newPassword !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  const handleSave = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSaving(true);
    // Simulate API call (replace with axios.patch('/api/user/security', { currentPassword, newPassword, enable2FA }))
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Security settings updated successfully');
      navigate('/settings');
    }, 2000);
  };

  const handleConnectAccount = (accountName, connected) => {
    // Simulate connect/disconnect (replace with real API call)
    toast.info(`${connected ? 'Disconnecting' : 'Connecting'} ${accountName} account`);
  };

  const handleDeleteAccount = () => {
    // Simulate account deletion (replace with axios.delete('/api/user'))
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      toast.success('Account deletion requested');
      navigate('/logout');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', transition: 'background-color 0.3s' }}>
      {/* Top Section */}
      <TopSection
        heading="Security"
        contextButtonText="Save"
        contextButtonAction={handleSave}
        contextButtonDisabled={isSaving}
        contextButtonLoading={isSaving}
      />

      {/* Main Content */}
      <Container maxWidth="sm" sx={{ py: 6, px: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {/* Password Section */}
          <Box>
            <Typography variant="h6" sx={{ color: 'text.primary', mb: 2, fontWeight: 600 }}>
              Password
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Current Password */}
              <TextField
                id="current-password"
                label="Current Password"
                type="password"
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                  setErrors({ ...errors, currentPassword: '' });
                }}
                placeholder="Enter your current password"
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
                error={!!errors.currentPassword}
                helperText={errors.currentPassword}
                sx={{ bgcolor: 'background.paper', transition: 'background-color 0.2s' }}
              />

              {/* New Password */}
              <TextField
                id="new-password"
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setErrors({ ...errors, newPassword: '' });
                }}
                placeholder="Enter your new password"
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
                error={!!errors.newPassword}
                helperText={errors.newPassword}
                sx={{ bgcolor: 'background.paper', transition: 'background-color 0.2s' }}
              />

              {/* Confirm Password */}
              <TextField
                id="confirm-password"
                label="Confirm New Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setErrors({ ...errors, confirmPassword: '' });
                }}
                placeholder="Confirm your new password"
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                sx={{ bgcolor: 'background.paper', transition: 'background-color 0.2s' }}
              />
            </Box>
            <Divider sx={{ my: 3, borderColor: 'divider' }} />
          </Box>

          {/* 2FA Section */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 600 }}>
                Two-Factor Authentication
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Add an extra layer of security to your account
              </Typography>
            </Box>
            <Switch
              checked={enable2FA}
              onChange={(e) => setEnable2FA(e.target.checked)}
              sx={{
                '& .MuiSwitch-track': {
                  bgcolor: enable2FA ? 'primary.main' : 'grey.300',
                },
              }}
            />
          </Box>
          <Divider sx={{ my: 3, borderColor: 'divider' }} />

          {/* Connected Accounts */}
          <Box>
            <Typography variant="h6" sx={{ color: 'text.primary', mb: 2, fontWeight: 600 }}>
              Connected Accounts
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {connectedAccounts.map((account, idx) => (
                <Card
                  key={idx}
                  sx={{
                    bgcolor: 'background.paper',
                    border: 1,
                    borderColor: 'divider',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  }}
                >
                  <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 2 }}>
                    {account.icon}
                    <Box>
                      <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 500 }}>
                        {account.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {account.connected ? 'Connected' : 'Not Connected'}
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'flex-end', pr: 2, py: 1 }}>
                    <Button
                      size="small"
                      onClick={() => handleConnectAccount(account.name, account.connected)}
                      sx={{ color: 'primary.main', textTransform: 'none' }}
                    >
                      {account.connected ? 'Disconnect' : 'Connect'}
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </Box>
            <Divider sx={{ my: 3, borderColor: 'divider' }} />
          </Box>

          {/* Danger Zone */}
          <Box>
            <Typography variant="h6" sx={{ color: 'error.main', mb: 2, fontWeight: 600 }}>
              Danger Zone
            </Typography>
            <Card
              sx={{
                bgcolor: 'background.paper',
                border: 1,
                borderColor: 'error.main',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                p: 2,
              }}
            >
              <Typography variant="body1" sx={{ color: 'error.main', fontWeight: 500 }}>
                Delete Account
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                Once you delete your account, there is no going back. Please be certain.
              </Typography>
              <Button
                fullWidth
                variant="contained"
                color="error"
                onClick={handleDeleteAccount}
                sx={{ mt: 2, textTransform: 'none' }}
              >
                Delete Account
              </Button>
            </Card>
          </Box>

          {/* API Error */}
          {errors.api && (
            <Typography color="error" variant="body2" align="center" sx={{ mt: 2 }}>
              {errors.api}
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
}