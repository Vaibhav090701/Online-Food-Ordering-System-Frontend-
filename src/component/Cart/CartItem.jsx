import { Box, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { updateCartItem, removeCartItem } from '../State/Cart/Action';

const CartItem = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const dispatch = useDispatch();

  const handleUpdateQuantity = (newQuantity) => {
    if (newQuantity < 1){
      handleRemoveItem()
    };
    
    setQuantity(newQuantity);
    dispatch(
      updateCartItem({
        id: item.id,
        quantity: newQuantity,
      })
    );
  };

  const handleRemoveItem = () => {
    dispatch(removeCartItem({ cartItemId: item.id }));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        py: 1,
      }}
    >
      <Box
        sx={{
          width: { xs: 50, sm: 60 },
          height: { xs: 50, sm: 60 },
          borderRadius: '8px',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <img
          src={item.menuItemDto?.images?.[0] || ''}
          alt={item.menuItemDto?.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="body2"
          sx={{
            color: '#ffffff',
            fontWeight: 'bold',
            fontSize: { xs: '0.85rem', sm: '0.9rem' },
          }}
        >
          {item?.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: '#9ca3af', fontSize: { xs: '0.75rem', sm: '0.8rem' } }}
        >
          ₹{item?.price?.toFixed(2)} x {quantity}
        </Typography>
        {item?.ingredients && item?.ingredients.length > 0 && (
          <Box sx={{ mt: 0.5, display: 'flex', flexDirection: 'column', gap: 0.3 }}>
            {item.ingredients.map((addon) => (
              <Typography
                key={addon.id}
                variant="body2"
                sx={{
                  color: '#f97316',
                  fontStyle: 'italic',
                  fontSize: { xs: '0.7rem', sm: '0.75rem' },
                }}
              >
                + {addon.name} (₹{addon.price.toFixed(2)})
              </Typography>
            ))}
          </Box>
        )}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: 'rgba(249, 115, 22, 0.2)',
            borderRadius: '8px',
            p: 0.3,
          }}
        >
          <IconButton
            size="small"
            onClick={() => handleUpdateQuantity(quantity - 1)}
            sx={{ color: '#f97316', p: 0.5 }}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
          <Typography sx={{ color: '#ffffff', px: 0.5, fontSize: '0.8rem' }}>
            {quantity}
          </Typography>
          <IconButton
            size="small"
            onClick={() => handleUpdateQuantity(quantity + 1)}
            sx={{ color: '#f97316', p: 0.5 }}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>
        <IconButton
          size="small"
          onClick={handleRemoveItem}
          sx={{ color: '#ef4444', '&:hover': { color: '#dc2626' }, p: 0.5 }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CartItem;