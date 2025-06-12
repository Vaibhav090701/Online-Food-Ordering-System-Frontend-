import { Box, Button, Fade, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const AddressSelectionSection = ({ addresses, selectedAddress, onSelectAddress, onAddAddress }) => {

  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [localAddresses, setLocalAddresses] = useState([]);


   useEffect(() => {
  if (addresses && addresses.length > 0) {
    setLocalAddresses(prev =>
      JSON.stringify(prev) !== JSON.stringify(addresses) ? addresses : prev
    );
    const defaultAddress = addresses.find(addr => addr.default);
    if (defaultAddress) {
      setSelectedAddressId(defaultAddress.id);
      onSelectAddress(defaultAddress); // ✅ notify parent properly    
  }
}}, [addresses]);


    const handleSelect = (address) => {
    if (selectedAddressId === address.id) {
      setSelectedAddressId(null);
      onSelectAddress(null); // optional, if you want to support unselect
    } else {
      setSelectedAddressId(address.id);
      onSelectAddress(address); // inform parent to mark this as default
    }
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
          Select Delivery Address
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {addresses.map((item) => {
              const isSelected = selectedAddressId === item.id;

           return ( <Box
              key={item.id}
              sx={{
                p: 2,
                bgcolor: 'rgba(31, 41, 55, 0.8)',
                backdropFilter: 'blur(8px)',
                borderRadius: '12px',
                border: `1px solid ${
                  selectedAddress?.id === item.id ? '#d4a017' : 'rgba(249, 115, 22, 0.4)'
                }`,
                transition: 'transform 0.3s, border-color 0.3s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  borderColor: '#f97316',
                },
                position: 'relative',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <HomeIcon sx={{ color: '#f97316' }} />
                <Typography
                  variant="body1"
                  sx={{ color: '#ffffff', fontWeight: 'bold', fontSize: '0.9rem' }}
                >
                  Home
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ color: '#9ca3af', mb: 1.5, fontSize: { xs: '0.8rem', sm: '0.85rem' } }}
              >
                {item.streetAddress}, {item.landmark}, {item.city}-{item.zipCode}, {item.state}.
              </Typography>
              <Button
                fullWidth
                variant="outlined"
                  onClick={() => handleSelect(item)}
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
                  {isSelected ? 'Unselect' : 'Select'}
              </Button>

                {isSelected && (
                <CheckCircleIcon
                  sx={{ color: '#d4a017', position: 'absolute', top: 12, right: 12, fontSize: '1.2rem' }}
                />
              )}
            </Box>
           );
          })}
          <Box
            sx={{
              p: 2,
              bgcolor: 'rgba(31, 41, 55, 0.8)',
              backdropFilter: 'blur(8px)',
              borderRadius: '12px',
              border: '1px solid rgba(249, 115, 22, 0.4)',
              transition: 'transform 0.3s',
              '&:hover': { transform: 'translateY(-2px)', borderColor: '#f97316' },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <AddLocationAltIcon sx={{ color: '#f97316' }} />
              <Typography
                variant="body1"
                sx={{ color: '#ffffff', fontWeight: 'bold', fontSize: '0.9rem' }}
              >
                Add New Address
              </Typography>
            </Box>
            <Button
              fullWidth
              variant="outlined"
              onClick={onAddAddress}
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
              Add
            </Button>
          </Box>
        </Box>
      </Box>
    </Fade>
  );
};

export default AddressSelectionSection;