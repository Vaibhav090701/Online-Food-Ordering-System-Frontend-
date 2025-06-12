import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Button,
  CircularProgress,
} from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';import { toast } from 'react-toastify';
import TopSection from '../TopSection';

export default function NotificationsSettingsPage() {
  const [notificationSettings, setNotificationSettings] = useState({
    pushNotifications: false,
    accountUpdates: true,
    securityAlerts: true,
    trafficReport: true,
    newFeatures: false,
    tutorials: true,
  });
  const [summaryFrequency, setSummaryFrequency] = useState('Weekly');
  const [preferredDay, setPreferredDay] = useState('Monday');
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const notificationOptions = [
    { label: 'Account Updates', key: 'accountUpdates', description: 'Get notified about account-related changes' },
    { label: 'Security Alerts', key: 'securityAlerts', description: 'Important security updates' },
    { label: 'Weekly Traffic Report', key: 'trafficReport', description: 'Insights on your traffic performance' },
    { label: 'New Features', key: 'newFeatures', description: 'Be the first to know about new features' },
    { label: 'Tips & Tutorials', key: 'tutorials', description: 'Helpful guides and tips for you' },
  ];

  const handleToggle = (field) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call (replace with axios.patch('/api/user/notifications', { notificationSettings, summaryFrequency, preferredDay }))
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Notification settings updated successfully');
      navigate('/settings');
    }, 2000);
  };

  const handleUnsubscribe = () => {
    // Simulate unsubscribe (replace with axios.post('/api/user/notifications/unsubscribe'))
    if (window.confirm('Are you sure you want to unsubscribe from all email notifications?')) {
      setNotificationSettings({
        pushNotifications: false,
        accountUpdates: false,
        securityAlerts: false,
        trafficReport: false,
        newFeatures: false,
        tutorials: false,
      });
      toast.success('Unsubscribed from all email notifications');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', transition: 'background-color 0.3s' }}>
      {/* Top Section */}
      <TopSection
        heading="Notifications"
        contextButtonAction={handleSave}
        contextButtonDisabled={isSaving}
        contextButtonLoading={isSaving}
      />

      {/* Main Content */}
      <Container maxWidth="md" sx={{ py: 6, px: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {/* Email Notifications */}
          <Box>
            <Typography variant="h6" sx={{ color: 'text.primary', mb: 2, fontWeight: 600 }}>
              Email Notifications
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {notificationOptions.map((item) => (
                <Box
                  key={item.key}
                  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <Box>
                    <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 500 }}>
                      {item.label}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {item.description}
                    </Typography>
                  </Box>
                  <Switch
                    checked={notificationSettings[item.key]}
                    onChange={() => handleToggle(item.key)}
                    sx={{
                      '& .MuiSwitch-track': {
                        bgcolor: notificationSettings[item.key] ? 'primary.main' : 'grey.300',
                      },
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Box>

          {/* Traffic Summary Reports */}
          <Box>
            <Typography variant="h6" sx={{ color: 'text.primary', mb: 2, fontWeight: 600 }}>
              Traffic Summary Reports
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="summary-frequency-label">Summary Frequency</InputLabel>
                <Select
                  labelId="summary-frequency-label"
                  value={summaryFrequency}
                  label="Summary Frequency"
                  onChange={(e) => setSummaryFrequency(e.target.value)}
                  sx={{ bgcolor: 'background.paper', transition: 'background-color 0.2s' }}
                >
                  <MenuItem value="Daily">Daily</MenuItem>
                  <MenuItem value="Weekly">Weekly</MenuItem>
                  <MenuItem value="Monthly">Monthly</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="preferred-day-label">Preferred Day</InputLabel>
                <Select
                  labelId="preferred-day-label"
                  value={preferredDay}
                  label="Preferred Day"
                  onChange={(e) => setPreferredDay(e.target.value)}
                  sx={{ bgcolor: 'background.paper', transition: 'background-color 0.2s' }}
                >
                  <MenuItem value="Monday">Monday</MenuItem>
                  <MenuItem value="Tuesday">Tuesday</MenuItem>
                  <MenuItem value="Wednesday">Wednesday</MenuItem>
                  <MenuItem value="Thursday">Thursday</MenuItem>
                  <MenuItem value="Friday">Friday</MenuItem>
                  <MenuItem value="Saturday">Saturday</MenuItem>
                  <MenuItem value="Sunday">Sunday</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          {/* Push Notifications */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 500 }}>
                Push Notifications
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Receive updates on your device
              </Typography>
            </Box>
            <Switch
              checked={notificationSettings.pushNotifications}
              onChange={() => handleToggle('pushNotifications')}
              sx={{
                '& .MuiSwitch-track': {
                  bgcolor: notificationSettings.pushNotifications ? 'primary.main' : 'grey.300',
                },
              }}
            />
          </Box>

          {/* Unsubscribe Card */}
          <Card
            sx={{
              bgcolor: 'error.light',
              border: 1,
              borderColor: 'error.main',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              p: 3,
              textAlign: 'center',
            }}
          >
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="h6" sx={{ color: 'error.main', fontWeight: 600 }}>
                Unsubscribe from All Emails
              </Typography>
              <Typography variant="body2" sx={{ color: 'error.main' }}>
                This will stop all email notifications from our platform.
              </Typography>
              <Button
                variant="contained"
                color="error"
                onClick={handleUnsubscribe}
                sx={{ mt: 2, textTransform: 'none' }}
              >
                Unsubscribe
              </Button>
            </CardContent>
          </Card>

          {/* API Error */}
          {/* {errors.api && (
            <Typography color="error" variant="body2" align="center" sx={{ mt: 2 }}>
              {errors.api}
            </Typography>
          )} */}
        </Box>
      </Container>
    </Box>
  );
}