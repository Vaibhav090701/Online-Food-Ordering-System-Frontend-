import React, { useEffect, useState } from 'react';
import { Box, Button, Fade, Modal, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { createOrder } from '../State/Order/Action';
import { clearCart, findCart } from '../State/Cart/Action';
import { createAddress, getUsersAddress, updateAddressDefault } from '../State/Address/Action';
import { SHOW_NOTIFICATION } from '../State/Notification/ActionType';
import NotificationSnackbar from '../../util/NotificationSnackBar';
import CartItemsSection from './CartItemSections';
import AddressSelectionSection from './AddressSelectionSection';
import PaymentSelectionSection from './PaymentSelectionSection';
import OrderConfirmationSection from './OrderConfirmationSection';
import AddressFormModal from './AddressForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const steps = ['Cart', 'Delivery Address', 'Payment Method', 'Confirm Order'];

const Cart = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentDetails, setPaymentDetails] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const { auth, cart, address } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem('jwt');
  const location = useLocation();
  const [isInitializing, setIsInitializing] = useState(true);

  // Initialize Stripe with your publishable key
  const stripePromise = loadStripe('pk_test_51PdvChGC67kgFd3Z1RNyhSTSsXGSHFT3QWbP2tKXBMK9bebb20Ona6rYw28rgenIwTfMLwvVRzktIpsO4ICox8ul00liv8oJ0t'); // Replace with your key

  useEffect(() => {
    dispatch(findCart());
    dispatch(getUsersAddress());
    // Only restore session on first load
    const locationData = location.state;

    if (locationData) {
      const { activeStep: step, paymentMethod: method, paymentDetails: details, selectedAddress: address1 } = locationData;
      if (step !== undefined) setActiveStep(step);
      if (method) setPaymentMethod(method);
      if (details) setPaymentDetails(details);
      if (address1) setSelectedAddress(address1);
    } else {
      const sessionData = localStorage.getItem('checkoutSession');
      if (sessionData) {
        try {
          const { activeStep: step, selectedAddress: savedAddress, paymentMethod: method, paymentDetails: details } = JSON.parse(sessionData);
          if (step !== undefined) setActiveStep(step);
          if (savedAddress) setSelectedAddress(savedAddress);
          if (method) setPaymentMethod(method);
          if (details) setPaymentDetails(details);
        } catch (err) {
          console.error('Error parsing session data', err);
          localStorage.removeItem('checkoutSession');
        }
      }
    }
    setIsInitializing(false);
  }, []);

  useEffect(() => {
    if (isInitializing) return;
    const sessionData = { activeStep, selectedAddress, paymentMethod, paymentDetails };
    localStorage.setItem('checkoutSession', JSON.stringify(sessionData));
    console.log('Session data', sessionData);
  }, [activeStep, selectedAddress, paymentMethod, paymentDetails, isInitializing]);

  const clearSession = () => {
    localStorage.removeItem('checkoutSession');
  };

  const handleOpenAddressModal = () => {
    if (auth.user) {
      setOpen(true);
    } else {
      navigate('/account/login');
    }
  };

  const handleClose = () => setOpen(false);

  const handleSubmit = (data) => {
    dispatch(createAddress({ reqData: data }));
  };

  const handleSelectAddress = (address) => {
    dispatch(updateAddressDefault({ addressId: address?.id }));
    setSelectedAddress(address);
  };

  const handleSelectPayment = (method) => {
    setPaymentMethod(method);
  };

  const handleNext = () => {
    if (activeStep === 0 && (!cart.cartItems || cart.cartItems.length === 0)) {
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: { message: 'Cart is empty', severity: 'error' },
      });
      return;
    }
    if (activeStep === 1 && !selectedAddress) {
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: { message: 'Please select an address', severity: 'error' },
      });
      return;
    }
    if (activeStep === 2 && !paymentMethod) {
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: { message: 'Please select a payment method', severity: 'error' },
      });
      return;
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError(null);
    const cartItemsArray = cart.cartItems.map((item) => ({
      menuItemId: item.menuItemDto.id,
      quantity: item.quantity,
    }));

    const data = {
      paymentMethod,
      addressId: selectedAddress.id,
      orderItems: cartItemsArray,
      restaurantId: cart.cartItems[0]?.restaurantId,
    };

    console.log('Order data', data);
                     
    try {
      const orderResponse = await dispatch(createOrder({ reqData: data, navigate }));
      // await dispatch(clearCart());
      console.log("Order response", orderResponse);
      

      // Prepare order details for OrderTrackingSection
      const orderDetails = {
        orderId: orderResponse?.data?.id || 'ORD' + Math.floor(Math.random() * 1000000),
        cartItems: orderResponse?.data?.items|| [],
        totalPrice: totalAmount,
        selectedAddress : orderResponse.deliveryAddress,
        restaurantName: cart.cartItems[0]?.restaurantName || 'Tasty Bites',
        estimatedDeliveryTime: '30-40 mins',
      };

      // Redirect to OrderTrackingSection
      navigate('/order-tracking', { state: { orderDetails } });

      dispatch({
        type: SHOW_NOTIFICATION,
        payload: { message: 'Order placed successfully!', severity: 'success' },
      });
    } catch (err) {
      console.error('Order confirmation error:', err.message);
      setError('Failed to place order. Please try again.');
      dispatch({
        type: SHOW_NOTIFICATION,
        payload: { message: 'Failed to place order. Please try again.', severity: 'error' },
      });
    } finally {
      setLoading(false);
    }
          // clearSession();

  };

  const handleCancel = () => {
    setCancelModalOpen(true);
  };

  const handleConfirmCancel = () => {
    setCancelModalOpen(false);
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: { message: 'Order cancelled successfully.', severity: 'info' },
    });
    dispatch(clearCart());
    clearSession();
    navigate('/my-profile');
  };

  const handleCloseCancelModal = () => {
    setCancelModalOpen(false);
  };

  const handlePaymentSuccess = (paymentIntent) => {
    console.log('Payment successful:', paymentIntent);
    setPaymentDetails({ paymentId: paymentIntent.id, status: 'succeeded' });
  };

  const totalBillAmount = (amount) => {
    setTotalAmount(amount);
  };

  return (
    <Fade in={true} timeout={600}>
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
        <Box sx={{ width: '100%', mb: 3 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel
                  sx={{
                    '& .MuiStepLabel-label': {
                      color: '#9ca3af',
                      fontSize: { xs: '0.75rem', sm: '0.85rem' },
                      fontWeight: activeStep >= steps.indexOf(label) ? 'bold' : 'normal',
                    },
                    '& .MuiStepIcon-root': { color: '#f97316', fontSize: '1.5rem' },
                    '& .MuiStepIcon-text': { fill: '#ffffff' },
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Box sx={{ width: '100%', flex: 1 }}>
          {activeStep === 0 && (
            <CartItemsSection
              cartItems={cart.cartItems}
              totalPrice={cart.cart?.totalPrice || 0}
              handleTotalAmount={totalBillAmount}
            />
          )}
          {activeStep === 1 && (
            <AddressSelectionSection
              addresses={address.addresses}
              selectedAddress={selectedAddress}
              onSelectAddress={handleSelectAddress}
              onAddAddress={handleOpenAddressModal}
            />
          )}
          {activeStep === 2 && (
            <Elements stripe={stripePromise}>
              <PaymentSelectionSection
                onSelectPayment={handleSelectPayment}
                onPaymentSuccess={handlePaymentSuccess}
                cartItems={cart?.cartItems}
                totalPay={totalAmount || 0}
              />
            </Elements>
          )}
          {activeStep === 3 && (
            <OrderConfirmationSection
              cartItems={cart.cartItems}
              totalPrice={totalAmount || 0}
              selectedAddress={selectedAddress}
              paymentMethod={paymentMethod}
              paymentDetails={paymentDetails}
              onConfirmOrder={handlePlaceOrder}
            />
          )}
        </Box>
        {/* Hide buttons when activeStep is 3 */}
        {activeStep < 3 && (
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              mt: 2,
              position: { xs: 'sticky', lg: 'static' },
              bottom: 0,
              bgcolor: 'rgba(0, 0, 0, 0.8)',
              py: 2,
              px: 2,
              zIndex: 2,
            }}
          >
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{
                color: '#f97316',
                textTransform: 'none',
                fontSize: { xs: '0.9rem', sm: '1rem' },
              }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{
                bgcolor: '#f97316',
                color: '#ffffff',
                borderRadius: '12px',
                textTransform: 'none',
                py: 1.5,
                px: 3,
                boxShadow: '0 4px 12px rgba(249, 115, 22, 0.5)',
                '&:hover': {
                  bgcolor: '#ea580c',
                  boxShadow: '0 6px 16px rgba(234, 88, 12, 0.7)',
                },
                fontSize: { xs: '0.9rem', sm: '1rem' },
              }}
            >
              Continue
            </Button>
          </Box>
        )}
        <AddressFormModal open={open} onClose={handleClose} onSubmit={handleSubmit} />
        <Modal
          open={cancelModalOpen}
          onClose={handleCloseCancelModal}
          closeAfterTransition
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Fade in={cancelModalOpen} timeout={600}>
            <Box
              sx={{
                width: { xs: '90%', sm: 360 },
                bgcolor: 'rgba(31, 41, 55, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid #d4a017',
                borderRadius: '12px',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)',
                p: 3,
                outline: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: '#ffffff',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontSize: { xs: '1rem', sm: '1.125rem' },
                }}
              >
                Cancel Order
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#9ca3af',
                  textAlign: 'center',
                  fontSize: { xs: '0.8rem', sm: '0.85rem' },
                }}
              >
                Are you sure you want to cancel your order?
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleConfirmCancel}
                  sx={{
                    bgcolor: '#f97316',
                    color: '#ffffff',
                    borderRadius: '8px',
                    textTransform: 'none',
                    py: 1,
                    fontSize: { xs: '0.8rem', sm: '0.9rem' },
                    '&:hover': { bgcolor: '#ea580c' },
                  }}
                >
                  Yes
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleCloseCancelModal}
                  sx={{
                    borderColor: '#f97316',
                    color: '#f97316',
                    borderRadius: '8px',
                    textTransform: 'none',
                    py: 1,
                    fontSize: { xs: '0.8rem', sm: '0.9rem' },
                    '&:hover': { borderColor: '#ea580c', bgcolor: 'rgba(249, 115, 22, 0.1)' },
                  }}
                >
                  No
                </Button>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </Box>
    </Fade>
  );
};

export default Cart;