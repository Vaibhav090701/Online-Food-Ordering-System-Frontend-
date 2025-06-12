import { Box, Button, Card, Typography } from '@mui/material';
import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const AddressCart = ({ item, showButton, handleSelectAddress, isSelected }) => {
  return (
    <Card
      sx={{
        display: 'flex',
        gap: 2,
        width: { xs: '100%', sm: 256 },
        p: 3,
        bgcolor: '#1f2937',
        border: '1px solid #f97316',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
      }}
    >
      <HomeIcon sx={{ color: '#f97316', mt: 0.5 }} />
      <Box sx={{ flex: 1, color: '#9ca3af' }}>
        <Typography
          variant="h6"
          sx={{ color: '#ffffff', fontWeight: 'bold', fontSize: '1.125rem', mb: 1 }}
        >
          Home
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: '#9ca3af', mb: 2, lineHeight: 1.5 }}
        >
          {item.streetAddress}, {item.landmark}, {item.city}-{item.zipCode}, {item.state}.
        </Typography>
        {showButton && (
          <Button
            variant="outlined"
            fullWidth
            onClick={() => handleSelectAddress(isSelected ? null : item)}
            sx={{
              borderColor: '#f97316',
              color: '#f97316',
              borderRadius: '8px',
              textTransform: 'none',
              '&:hover': { borderColor: '#ea580c', bgcolor: '#2d3748' },
            }}
          >
            {isSelected ? 'Unselect' : 'Select'}
          </Button>
        )}
        {isSelected && 
          <CheckCircleIcon sx={{ color: '#22c55e', position: 'abso  lute', top: 8, right: 8 }} />
        }
      </Box>
    </Card>
  );
};

export default AddressCart;