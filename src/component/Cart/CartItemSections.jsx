import { Box, Button, Fade, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';

const CartItemsSection = ({ cartItems, totalPrice, handleTotalAmount }) => {
  const deliveryFee = 20;
  const platformFee = 5;
  const gstAndCharges = 14;
  const { auth } = useSelector((store) => store);
  const navigate = useNavigate();

  // Calculate total addon price
  const addonTotal = cartItems
    ?.reduce((sum, item) => {
      const itemAddonTotal = item.ingredients?.reduce((acc, addon) => acc + addon.price, 0) || 0;
      return sum + itemAddonTotal * item.quantity;
    }, 0)
    .toFixed(2);

  const totalPay = (totalPrice + parseFloat(addonTotal) + deliveryFee + platformFee + gstAndCharges).toFixed(2);

  handleTotalAmount(totalPay);
  
  const handleSignIn = () => {
    navigate('/account/login');
  };

  const handleAddItems = () => {
    navigate('/my-profile');
  };

  return (
    <Fade in={true} timeout={600}>
      <Box
        sx={{
          bgcolor: 'transparent',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: '#ffffff',
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 2,
            textShadow: '0 2px 6px rgba(0, 0, 0, 0.5)',
            fontSize: { xs: '1.25rem', sm: '1.5rem' },
          }}
        >
          Your Cart ({cartItems?.length || 0})
        </Typography>
        {cartItems && cartItems.length > 0 ? (
          <>
            {cartItems.map((item, index) => (
              <Fade key={item.id} in={true} timeout={600 + index * 100}>
                <Box
                  sx={{
                    py: 1.5,
                    px: 2,
                    bgcolor: 'rgba(31, 41, 55, 0.8)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: '12px',
                    border: '1px solid rgba(249, 115, 22, 0.4)',
                    transition: 'transform 0.3s',
                    '&:hover': { transform: 'translateY(-2px)' },
                  }}
                >
                  <CartItem item={item} />
                </Box>
              </Fade>
            ))}
            <Box
              sx={{
                py: 2,
                px: 2,
                bgcolor: 'rgba(31, 41, 55, 0.8)',
                backdropFilter: 'blur(8px)',
                borderRadius: '12px',
                border: '1px solid #d4a017',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: '#ffffff',
                  fontWeight: 'bold',
                  mb: 1,
                  fontSize: { xs: '1rem', sm: '1.125rem' },
                }}
              >
                Order Summary
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', color: '#9ca3af' }}>
                  <Typography variant="body2">Item Total</Typography>
                  <Typography variant="body2">₹{totalPrice}</Typography>
                </Box>
                {addonTotal > 0 && (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Typography
                      variant="body2"
                      sx={{ color: '#f97316', fontWeight: 'bold', fontSize: { xs: '0.85rem', sm: '0.9rem' } }}
                    >
                      Addons
                    </Typography>
                    {cartItems.map((item) =>
                      item?.ingredients?.map((addon) => (
                        <Box
                          key={`${item.id}-${addon.id}`}
                          sx={{ display: 'flex', justifyContent: 'space-between', color: '#9ca3af' }}
                        >
                          <Typography
                            variant="body2"
                            sx={{ fontSize: { xs: '0.75rem', sm: '0.8rem' }, fontStyle: 'italic' }}
                          >
                            {addon.name} (x{item.quantity})
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ fontSize: { xs: '0.75rem', sm: '0.8rem' } }}
                          >
                            ₹{(addon.price * item.quantity).toFixed(2)}
                          </Typography>
                        </Box>
                      ))
                    )}
                  </Box>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', color: '#9ca3af' }}>
                  <Typography variant="body2">Delivery Fee</Typography>
                  <Typography variant="body2">₹{deliveryFee}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', color: '#9ca3af' }}>
                  <Typography variant="body2">Platform Fee</Typography>
                  <Typography variant="body2">₹{platformFee}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', color: '#9ca3af' }}>
                  <Typography variant="body2">GST & Charges</Typography>
                  <Typography variant="body2">₹{gstAndCharges}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', color: '#ffffff' }}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 'bold', textShadow: '0 0 8px rgba(212, 160, 23, 0.7)' }}
                  >
                    Total
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 'bold', textShadow: '0 0 8px rgba(212, 160, 23, 0.7)' }}
                  >
                    ₹{totalPay}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              py: 4,
              bgcolor: 'rgba(31, 41, 55, 0.8)',
              borderRadius: '12px',
              border: '1px solid rgba(249, 115, 22, 0.4)',
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: '#9ca3af',
                textAlign: 'center',
                mb: 2,
                fontSize: { xs: '0.875rem', sm: '1rem' },
              }}
            >
              Your cart is empty
            </Typography>
            <Button
              variant="contained"
              onClick={auth.user ? handleAddItems : handleSignIn}
              sx={{
                bgcolor: '#f97316',
                '&:hover': { bgcolor: '#ea580c' },
                fontWeight: 'bold',
                textTransform: 'none',
                borderRadius: '8px',
                px: 3,
                py: 1,
                fontSize: { xs: '0.875rem', sm: '1rem' },
              }}
            >
              {auth.user ? 'Add food to Cart' : 'Sign In'}
            </Button>
          </Box>
        )}
      </Box>
    </Fade>
  );
};

export default CartItemsSection;