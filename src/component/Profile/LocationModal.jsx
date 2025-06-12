import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserLocation } from '../slices/authSlice';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';

const libraries = ['places'];

const LocationModal = ({ open, onClose }) => {
  const [locationInput, setLocationInput] = useState('');
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY', // Replace with your API key
    libraries,
  });

  const handlePlaceSelect = (autocomplete) => {
    const place = autocomplete.getPlace();
    const city = place.address_components?.find((comp) => comp.types.includes('locality'))?.long_name;
    if (city) {
      dispatch(updateUserLocation(city));
      setLocationInput('');
      onClose();
    }
  };

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_GOOGLE_MAPS_API_KEY`
            );
            const data = await response.json();
            const city = data.results[0]?.address_components?.find((comp) =>
              comp.types.includes('locality')
            )?.long_name;
            if (city) {
              dispatch(updateUserLocation(city));
              onClose();
            }
          } catch (error) {
            console.error('Geocoding error:', error);
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
      );
    } else {
      console.error('Geolocation not supported');
    }
  };

  if (!isLoaded) return <CircularProgress />;

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: '#1f2937',
          borderRadius: '8px',
          p: { xs: 2, sm: 4 },
          width: { xs: '90%', sm: '400px' },
          color: '#ffffff',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
          Select Your Location
        </Typography>
        <Autocomplete onLoad={(autocomplete) => autocomplete.addListener('place_changed', () => handlePlaceSelect(autocomplete))}>
          <TextField
            placeholder="Enter city or area"
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
            fullWidth
            disabled={loading}
            sx={{
              '& .MuiInputBase-root': { bgcolor: '#374151', color: '#ffffff', borderRadius: '4px' },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#d4a017' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#f97316' },
              '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#f97316' },
              mb: 2,
            }}
          />
        </Autocomplete>
        <Button
          variant="contained"
          onClick={handleGeolocation}
          disabled={loading}
          sx={{
            bgcolor: '#f97316',
            '&:hover': { bgcolor: '#ea580c' },
            fontWeight: 'bold',
            textTransform: 'none',
            height: '40px',
            borderRadius: '4px',
          }}
          fullWidth
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Use Current Location'}
        </Button>
      </Box>
    </Modal>
  );
};

export default LocationModal;