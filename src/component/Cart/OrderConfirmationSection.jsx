import { Box, Button, CircularProgress, Fade, Typography } from '@mui/material';
import React, { useState } from 'react';
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SHOW_NOTIFICATION } from '../State/Notification/ActionType';
import { clearCart } from '../State/Cart/Action';

const OrderConfirmationSection = ({ cartItems, totalPrice, selectedAddress, paymentMethod, paymentDetails, onConfirmOrder }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {cart}=useSelector(store=>store);

  console.log("Selected Address", selectedAddress);
  console.log("Payment Details", paymentDetails);

  const addonTotal = cartItems
    ?.reduce((sum, item) => {
      const itemAddonTotal = item.ingredients?.reduce((acc, addon) => acc + addon.price, 0) || 0;
      return sum + itemAddonTotal * item.quantity;
    }, 0)
    .toFixed(2);

  const statusColor = paymentDetails?.status === 'failed' ? 'red' : 'green';

  const deliveryFee = 20;
  const platformFee = 5;
  const gstAndCharges = 14;
  const totalPay = totalPrice;

  const handleCancel = () => {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { message: 'Order cancelled successfully.', severity: 'info' },
    });
    dispatch(clearCart());
    localStorage.removeItem('checkoutSession');
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
          Order Confirmation
        </Typography>
        <Box
          sx={{
            p: 2,
            bgcolor: 'rgba(31, 41, 55, 0.8)',
            backdropFilter: 'blur(8px)',
            borderRadius: '12px',
            border: '1px solid #d4a017',
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: '#ffffff', fontWeight: 'bold', mb: 1, fontSize: '1rem' }}
          >
            Items
          </Typography>
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} readOnly />
          ))}
        </Box>
        <Box
          sx={{
            p: 2,
            bgcolor: 'rgba(31, 41, 55, 0.8)',
            backdropFilter: 'blur(8px)',
            borderRadius: '12px',
            border: '1px solid #d4a017',
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: '#ffffff', fontWeight: 'bold', mb: 1, fontSize: '1rem' }}
          >
            Delivery Address
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: '#9ca3af', fontSize: { xs: '0.8rem', sm: '0.85rem' } }}
          >
            {selectedAddress?.streetAddress}, {selectedAddress?.landmark}, {selectedAddress?.city}-
            {selectedAddress?.zipCode}, {selectedAddress?.state}.
          </Typography>
        </Box>
        <Box
          sx={{
            p: 2,
            bgcolor: 'rgba(31, 41, 55, 0.8)',
            backdropFilter: 'blur(8px)',
            borderRadius: '12px',
            border: '1px solid #d4a017',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <Typography
              variant="h6"
              sx={{ color: '#ffffff', fontWeight: 'bold', mb: 1, fontSize: '1rem' }}
            >
              Payment Method
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: '#9ca3af', fontSize: { xs: '0.8rem', sm: '0.85rem' }, mb: 1 }}
            >
              {paymentMethod === 'CARD' ? 'Credit/Debit Card' : paymentMethod === 'UPI' ? 'UPI' : 'Cash on Delivery'}
            </Typography>
            {paymentDetails?.paymentId && (
              <Typography
                variant="body2"
                sx={{ color: '#9ca3af', fontSize: { xs: '0.8rem', sm: '0.85rem' } }}
              >
                Payment ID: {paymentDetails.paymentId}
              </Typography>
            )}
          </div>
          <div className="mt-3 border-2 rounded-xl mb-3 pr-2 pl-2">
            <Typography sx={{ color: statusColor, marginTop: '5px' }}>
              {paymentDetails?.status?.toUpperCase() || 'PENDING'}
            </Typography>
          </div>
        </Box>
        <Box
          sx={{
            p: 2,
            bgcolor: 'rgba(31, 41, 55, 0.8)',
            backdropFilter: 'blur(8px)',
            borderRadius: '12px',
            border: '1px solid #d4a017',
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: '#ffffff', fontWeight: 'bold', mb: 1, fontSize: '1rem' }}
          >
            Order Summary
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', color: '#9ca3af' }}>
              <Typography variant="body2">Item Total</Typography>
              <Typography variant="body2">₹{cart.cart?.totalPrice}</Typography>
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
        {error && (
          <Typography sx={{ color: '#ef4444', fontSize: '0.8rem', textAlign: 'center', mt: 2 }}>
            {error}
          </Typography>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button
            variant="outlined"
            onClick={handleCancel}
            sx={{
              borderColor: '#f97316',
              color: '#f97316',
              borderRadius: '8px',
              textTransform: 'none',
              py: 1.5,
              px: 3,
              '&:hover': { borderColor: '#ea580c', bgcolor: 'rgba(249, 115, 22, 0.1)' },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={onConfirmOrder}
            disabled={loading || paymentDetails?.status === 'failed'}
            sx={{
              bgcolor: '#f97316',
              color: '#ffffff',
              borderRadius: '8px',
              textTransform: 'none',
              py: 1.5,
              px: 3,
              boxShadow: '0 4px 12px rgba(249, 115, 22, 0.5)',
              '&:hover': { bgcolor: '#ea580c', boxShadow: '0 6px 16px rgba(234, 88, 12, 0.7)' },
              '&:disabled': { bgcolor: '#6b7280' },
            }}
          >
            {loading ? <CircularProgress size={24} sx={{ color: '#ffffff' }} /> : 'Place Order'}
          </Button>
        </Box>
      </Box>
    </Fade>
  );
};

export default OrderConfirmationSection;