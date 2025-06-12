import React from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EventIcon from '@mui/icons-material/Event';
import SettingsIcon from '@mui/icons-material/Settings';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../State/Authentication/Action';

const ProfileNavigation = () => {
  const isSmallScreen = useMediaQuery('(max-width:1080px)');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const menu = [
    { title: 'Orders', icon: <ShoppingBagIcon />, path: '/my-profile/orders' },
    // { title: 'Favourites', icon: <FavoriteIcon />, path: '/my-profile/favourites' },
    { title: 'Restaurants', icon: <RestaurantMenuIcon />, path: '/my-profile' },
    { title: 'Event', icon: <EventIcon />, path: '/my-profile/event' },
    { title: 'Settings', icon: <SettingsIcon />, path: '/my-profile/setting' },
    // { title: 'Logout', icon: <LogoutIcon />, path: '/' },
  ];

  const handleNavigate = (item) => {
    if (item.title === 'Logout') {
      dispatch(logout());
       
      navigate('/');
    } else {
      navigate(item.path);
    }
  };

  const getActiveIndex = () => {
    const currentPath = location.pathname;
    const index = menu.findIndex((item) => item.path === currentPath);
    return index >= 0 ? index : false;
  };

  if (isSmallScreen) {
    return (
      <BottomNavigation
        value={getActiveIndex()}
        showLabels
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          width: '100%',
          bgcolor: 'rgba(31, 41, 55, 0.9)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid #d4a017',
          height: '60px',
          zIndex: 1300,
          '& .MuiBottomNavigationAction-root': {
            color: '#9ca3af',
            minWidth: '60px',
            padding: '6px 0',
          },
          '& .Mui-selected': {
            color: '#f97316 !important',
            '& .MuiBottomNavigationAction-label': {
              fontWeight: 'bold',
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
            },
          },
          '& .MuiBottomNavigationAction-label': {
            fontSize: { xs: '0.7rem', sm: '0.8rem' },
            color: 'inherit',
          },
        }}
      >
        {menu.map((item, index) => (
          <BottomNavigationAction
            key={item.title}
            label={item.title}
            icon={item.icon}
            onClick={() => handleNavigate(item)}
            sx={{
              '& .MuiSvgIcon-root': {
                fontSize: { xs: '1.25rem', sm: '1.5rem' },
              },
            }}
          />
        ))}
      </BottomNavigation>
    );
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          bgcolor: 'rgba(31, 41, 55, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRight: '1px solid #d4a017',
          color: '#ffffff',
          boxSizing: 'border-box',
          top: 0,
          pt: 8,
        },
      }}
    >
      <List>
        {menu.map((item) => (
          <ListItem
            key={item.title}
            onClick={() => handleNavigate(item)}
            sx={{
              py: 1.5,
              px: 2,
              bgcolor: location.pathname === item.path ? 'rgba(249, 115, 22, 0.1)' : 'transparent',
              color: location.pathname === item.path ? '#f97316' : '#9ca3af',
              '&:hover': {
                color: '#f97316',
                bgcolor: 'rgba(249, 115, 22, 0.05)',
                transform: 'scale(1.02)',
                transition: 'all 0.2s',
              },
              cursor: 'pointer',
            }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: '40px' }}>{item.icon}</ListItemIcon>
            <ListItemText
              primary={item.title}
              sx={{
                '& .MuiTypography-root': {
                  fontSize: '1rem',
                  fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default ProfileNavigation;