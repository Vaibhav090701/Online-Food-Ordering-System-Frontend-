import React from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import ProfileNavigation from './ProfileNavigation';
import UserProfile from './UserProfile';
import Orders from './Orders';
import Favourites from './Favourites';
import Event from './Event';
import Setting from './Setting';
import ProfileSettingsPage from './Settings/ProfilePage';
import ResetPassword from '../Verify/ResetPassword';
import SecuritySettingsPage from './Settings/Security';
import NotificationsSettingsPage from './Settings/NotificationPage';
import HelpSupportPage from './Settings/Help&Support';
import PrivacyPolicyPage from './Settings/PrivacyPolicy';
import TermsConditionsPage from './Settings/Terms&Conditions';

const Profile = () => {
  const isSmallScreen = useMediaQuery('(max-width:1080px)');

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        width: '100%',
        overflowX: 'hidden',
        bgcolor: '#000000',
        background: 'linear-gradient(180deg, #1f2937 0%, #000000 100%)',
      }}
    >
      <ProfileNavigation />

      <Box
        sx={{
          flex: 1,
          width: '100%',
          ml: { xs: 0, lg: '5px' }, // Sidebar width on desktop
          pb: { xs: '76px', lg: 0 }, // Bottom navigation padding on mobile
          overflowX: 'hidden',
        }}
      >
        <Routes>
          <Route path="/" element={<UserProfile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/event" element={<Event />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/setting/profile" element={<ProfileSettingsPage />} />
          <Route path="/setting/security" element={<SecuritySettingsPage/>}></Route>
          <Route path="/setting/notification" element={<NotificationsSettingsPage/>}></Route>
          <Route path="/setting/help-and-support" element={<HelpSupportPage/>}></Route>
          <Route path="/setting/privacy-policy" element={<PrivacyPolicyPage/>}></Route>
          <Route path="/setting/terms-and-conditions" element={<TermsConditionsPage/>}></Route>

        </Routes>
      </Box>
    </Box>
  );
};

export default Profile;
