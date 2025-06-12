import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography, CircularProgress} from '@mui/material';
import { addItemToCart } from '../State/Cart/Action';

const OrderCard = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isReordering, setIsReordering] = useState(false);
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleReorder = async () => {

    setIsReordering(true);
    try {
      // Iterate over order.items to add each item to the cart
      for (const item of order.items) {
        const reqData = {
          cartItem: {
            menuItemId: item.itemName.id,
            quantity: item.quantity,
            ingredients: item.itemName.ingredients?.length > 0 ? item.itemName.ingredients.map((i)=>i.name) : null,
            restaurantId: item.itemName.restaurantId, // Ensure order object includes restaurantId
          },
        };
        
        await dispatch(addItemToCart(reqData)); // Use unwrap for Thunk async handling
      }
    } catch (error) {
    } finally {
      setIsReordering(false);
    }
  };


  return (
    <div
      style={{
        backgroundColor: '#1f2937', // Match dark theme
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '20px',
        border: '1px solid rgba(249, 115, 22, 0.4)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* Order Header: Basic Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <div>
          <Typography variant="h6" style={{ fontWeight: 'bold', color: '#ffffff' }}>
            Order #{order.id}
          </Typography>
          <Typography variant="body2" style={{ color: '#9ca3af' }}>
            Order Date: {new Date(order.orderDate).toLocaleDateString()}
          </Typography>
          <Typography
            variant="body2"
            style={{
              color: order.status === 'COMPLETED' ? '#4caf50' : '#f97316',
              fontSize: '0.875rem',
            }}
          >
            Status: {order.status}
          </Typography>
        </div>
        <Typography variant="h6" style={{ fontWeight: 'bold', color: '#ffffff' }}>
          Total: ₹{order.totalAmount}
        </Typography>
      </div>

      {/* Expandable Order Items */}
      {isExpanded && (
        <div style={{ marginBottom: '12px' }}>
          {order.items.map((item, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img
                  style={{ height: '48px', width: '48px', objectFit: 'cover', borderRadius: '4px' }}
                  src={item.itemName.images[0] || 'https://via.placeholder.com/48'}
                  alt={item.itemName.name}
                />
                <div>
                  <Typography variant="body1" style={{ fontWeight: 'medium', color: '#ffffff' }}>
                    {item.itemName.name}
                  </Typography>
                  <Typography variant="body2" style={{ color: '#9ca3af' }}>
                    ₹{item.price} x {item.quantity}
                  </Typography>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Expand/Collapse Button */}
      <Button
        variant="outlined"
        size="small"
        onClick={toggleExpand}
        fullWidth
        sx={{
          marginTop: '8px',
          color: '#f97316',
          borderColor: '#f97316',
          textTransform: 'none',
          borderRadius: '8px',
          '&:hover': { borderColor: '#ea580c', backgroundColor: 'rgba(249, 115, 22, 0.1)' },
        }}
      >
        {isExpanded ? 'Hide Details' : 'View Details'}
      </Button>

      {/* Action Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
        <Button
          variant="contained"
          size="small"
          onClick={handleReorder}
          disabled={isReordering}
          sx={{
            backgroundColor: '#f97316',
            color: '#ffffff',
            fontWeight: 'bold',
            textTransform: 'none',
            borderRadius: '8px',
            padding: '6px 16px',
            '&:hover': { backgroundColor: '#ea580c' },
            '&:disabled': { backgroundColor: '#9ca3af', cursor: 'not-allowed' },
          }}
        >
          {isReordering ? <CircularProgress size={20} color="inherit" /> : 'Reorder'}
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={() => alert('This feature coming soon!!!')}
          sx={{
            color: '#f97316',
            borderColor: '#f97316',
            textTransform: 'none',
            borderRadius: '8px',
            padding: '6px 16px',
            '&:hover': { borderColor: '#ea580c', backgroundColor: 'rgba(249, 115, 22, 0.1)' },
          }}
        >
          Track Order
        </Button>
      </div>

    </div>
  );
};

export default OrderCard;