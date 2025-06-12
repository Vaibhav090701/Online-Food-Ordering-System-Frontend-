import { Box, Button, CircularProgress, Fade, Grid, Typography, Avatar, Divider, LinearProgress, IconButton } from '@mui/material';
import { LocationOn, Phone, Home } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const OrderTrackingSection = ({ orderDetails }) => {
        const location = useLocation();
  const {orderId, cartItems, totalPrice, selectedAddress, restaurantName, estimatedDeliveryTime } = location.state.orderDetails;
  const navigate = useNavigate();
  const { auth} = useSelector((store) => store);
  const [loading, setLoading] = useState(true);
  const [deliveryStatus, setDeliveryStatus] = useState('Order Placed');

  // Mock delivery partner data (replace with API call in production)
  const deliveryPartner = {
    name: 'Ravi Kumar',
    contact: '+91 98765 43210',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  };

  // Mock map image (replace with Google Maps Static API or similar in production)
  const mapImage = 'https://images.unsplash.com/photo-1592928302633-24942f62e6f4?auto=format&fit=crop&w=800';

  // Simulate order status updates (replace with WebSocket or polling in production)
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
    const statusUpdates = ['Order Placed', 'Preparing', 'Out for Delivery', 'Delivered'];
    let currentStatusIndex = 0;
    const interval = setInterval(() => {
      if (currentStatusIndex < statusUpdates.length - 1) {
        currentStatusIndex++;
        setDeliveryStatus(statusUpdates[currentStatusIndex]);
      } else {
        clearInterval(interval);
      }
    }, 10000); // Update status every 10 seconds for demo
    return () => clearInterval(interval);
  }, []);

  const handleBackToHome = () => {
    navigate('/my-profile');
  };

  const statusProgress = {
    'Order Placed': 25,
    'Preparing': 50,
    'Out for Delivery': 75,
    'Delivered': 100,
  };

  return (
    <Fade in={true} timeout={600}>
      <Box
        sx={{
          bgcolor: '#000000',
          minHeight: '100vh',
          py: { xs: 4, sm: 6 },
          px: { xs: 2, sm: 4 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box sx={{ maxWidth: '800px', width: '100%' }}>
          <Typography
            variant="h4"
            sx={{
              color: '#ffffff',
              fontWeight: 'bold',
              textAlign: 'center',
              mb: 4,
              textShadow: '0 2px 6px rgba(0, 0, 0, 0.5)',
              fontSize: { xs: '1.5rem', sm: '2rem' },
            }}
          >
            Order Tracking
          </Typography>

          {/* Map Section */}
          <Box
            sx={{
              mb: 3,
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid #f97316',
              position: 'relative',
              height: { xs: '200px', sm: '300px' },
            }}
          >
            {loading ? (
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'rgba(31, 41, 55, 0.8)',
                }}
              >
                <CircularProgress sx={{ color: '#f97316' }} />
              </Box>
            ) : (
              <img
                src={mapImage}
                alt="Delivery Route"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )}
            <Box
              sx={{
                position: 'absolute',
                top: 10,
                left: 10,
                bgcolor: 'rgba(0, 0, 0, 0.7)',
                borderRadius: '8px',
                p: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <LocationOn sx={{ color: '#f97316', fontSize: '1.2rem' }} />
              <Typography sx={{ color: '#ffffff', fontSize: '0.9rem' }}>
                {selectedAddress?.city}
              </Typography>
            </Box>
          </Box>

          {/* Delivery Status */}
          <Box
            sx={{
              p: 2,
              bgcolor: 'rgba(31, 41, 55, 0.8)',
              backdropFilter: 'blur(8px)',
              borderRadius: '12px',
              border: '1px solid #f97316',
              mb: 3,
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: '#ffffff', fontWeight: 'bold', mb: 2, fontSize: '1rem' }}
            >
              Order Status
            </Typography>
            <LinearProgress
              variant="determinate"
              value={statusProgress[deliveryStatus]}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: '#374151',
                '& .MuiLinearProgress-bar': { bgcolor: '#f97316' },
                mb: 2,
              }}
            />
            <Typography sx={{ color: '#ffffff', fontSize: '0.9rem', textAlign: 'center' }}>
              {deliveryStatus}
            </Typography>
            <Typography sx={{ color: '#9ca3af', fontSize: '0.8rem', textAlign: 'center', mt: 1 }}>
              Estimated Delivery: {estimatedDeliveryTime || '30-40 mins'}
            </Typography>
          </Box>

          {/* Delivery Partner */}
          <Box
            sx={{
              p: 2,
              bgcolor: 'rgba(31, 41, 55, 0.8)',
              backdropFilter: 'blur(8px)',
              borderRadius: '12px',
              border: '1px solid #f97316',
              mb: 3,
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: '#ffffff', fontWeight: 'bold', mb: 2, fontSize: '1rem' }}
            >
              Delivery Partner
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={3} sm={2}>
                <Avatar
                  src={deliveryPartner.avatar}
                  alt={deliveryPartner.name}
                  sx={{ width: 50, height: 50 }}
                />
              </Grid>
              <Grid item xs={9} sm={7}>
                <Typography sx={{ color: '#ffffff', fontSize: '0.9rem' }}>
                  {deliveryPartner.name}
                </Typography>
                <Typography sx={{ color: '#9ca3af', fontSize: '0.8rem' }}>
                  Contact: {deliveryPartner.contact}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={3} sx={{ textAlign: { xs: 'center', sm: 'right' } }}>
                <Button
                  variant="outlined"
                  startIcon={<Phone />}
                  sx={{
                    borderColor: '#f97316',
                    color: '#f97316',
                    textTransform: 'none',
                    '&:hover': { borderColor: '#ea580c', bgcolor: '#1f2937' },
                  }}
                  disabled
                >
                  Contact
                </Button>
              </Grid>
            </Grid>
          </Box>

          {/* Order Details */}
          <Box
            sx={{
              p: 2,
              bgcolor: 'rgba(31, 41, 55, 0.8)',
              backdropFilter: 'blur(8px)',
              borderRadius: '12px',
              border: '1px solid #f97316',
              mb: 3,
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: '#ffffff', fontWeight: 'bold', mb: 2, fontSize: '1rem' }}
            >
              Order Details
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography sx={{ color: '#9ca3af', fontSize: '0.85rem' }}>
                Order ID: {orderId || 'ORD123456'}
              </Typography>
              <Typography sx={{ color: '#9ca3af', fontSize: '0.85rem' }}>
                Restaurant: {restaurantName || 'Tasty Bites'}
              </Typography>
              <Typography sx={{ color: '#9ca3af', fontSize: '0.85rem' }}>
                Delivery Address: {selectedAddress?.streetAddress}, {selectedAddress?.landmark},{' '}
                {selectedAddress?.city}-{selectedAddress?.zipCode}, {selectedAddress?.state}
              </Typography>
              <Divider sx={{ my: 1, bgcolor: '#374151' }} />
              {[1,1,1].map((item) => (
                <Box
                  key={item.id}
                  sx={{ display: 'flex', justifyContent: 'space-between', color: '#9ca3af' }}
                >
                  <Typography sx={{ fontSize: '0.85rem' }}>
                    {item.name} x {item.quantity}
                  </Typography>
                  <Typography sx={{ fontSize: '0.85rem' }}>
                    ₹{item.price * item.quantity}
                  </Typography>
                </Box>
              ))}
              <Divider sx={{ my: 1, bgcolor: '#374151' }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', color: '#ffffff' }}>
                <Typography sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                  Total
                </Typography>
                <Typography sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                  ₹{totalPrice}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Back to Home */}
          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              startIcon={<Home />}
              onClick={handleBackToHome}
              sx={{
                bgcolor: '#f97316',
                color: '#ffffff',
                px: 4,
                py: 1.5,
                borderRadius: '8px',
                textTransform: 'none',
                '&:hover': { bgcolor: '#ea580c' },
              }}
            >
              Back to Home
            </Button>
          </Box>
        </Box>
      </Box>
    </Fade>
  );
};

export default OrderTrackingSection;