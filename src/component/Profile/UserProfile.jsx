import React, { useState, useMemo, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Select,
  MenuItem,
  Modal,
  Button,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useLocation, useNavigate } from 'react-router-dom';
import RestaurentCard from '../Restaurent/RestaurentCard';
import { getRestaurantByCity } from '../State/Restaurent/Action';

const UserProfile = () => {
  const { restaurent, auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [tabValue, setTabValue] = useState(null); // No tab selected by default
  const [selectedCity, setSelectedCity] = useState(auth.user?.city || localStorage.getItem('userCity') || '');
  const [openCityModal, setOpenCityModal] = useState(!auth.user?.city && !localStorage.getItem('userCity'));
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const selectedCuisine = queryParams.get('cuisine') || '';

  // List of cities (hardcoded for simplicity)
  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad'];

  useEffect(() => {
    // Update localStorage and Redux when city changes
    if (selectedCity) {
      localStorage.setItem('userCity', selectedCity);
      dispatch(getRestaurantByCity(selectedCity));
      setOpenCityModal(false);
    }
  }, [selectedCity, dispatch]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const categories = ['Vegetarian', 'Non-Vegetarian', 'Cafe'];
  const userCity = selectedCity || 'Mumbai';

  const normalizeCategory = (category) => {
    if (!category) return '';
    return category.toLowerCase().replace('only ', '');
  };

  const filteredRestaurants = useMemo(() => {
    if (!restaurent.allRestaurents || !Array.isArray(restaurent.allRestaurents)) {
      return [];
    }

    let filtered = restaurent.allRestaurents.filter((item) => !item.deleted);

    if (selectedCity) {
      filtered = filtered.filter(
        (item) => item.city?.toLowerCase() === selectedCity.toLowerCase()
      );
    }

    // Apply cuisine filter if present
    if (selectedCuisine) {
      filtered = filtered.filter(
        (item) => item.cuisineType?.toLowerCase() === selectedCuisine.toLowerCase()
      );
    }

    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [restaurent.allRestaurents, searchQuery, selectedCuisine, selectedCity]);

  const tabRestaurants = useMemo(() => {
    if (!restaurent.allRestaurents || !Array.isArray(restaurent.allRestaurents)) {
      return [];
    }

    let filtered = filteredRestaurants; // Start with already filtered restaurants (city, cuisine, search)

    // Apply category filter only if a tab is selected
    if (tabValue !== null && tabValue >= 0 && tabValue < categories.length) {
      filtered = filtered.filter(
        (item) =>
          normalizeCategory(item.restaurantCategory) ===
          normalizeCategory(categories[tabValue])
      );
    }

    return filtered;
  }, [restaurent.allRestaurents, tabValue, filteredRestaurants]);

  const getTitle = () => {
    if (searchQuery) return 'Search Results';
    if (selectedCuisine) return `${selectedCuisine} Restaurants`;
    if (tabValue !== null && tabValue >= 0 && tabValue < categories.length) {
      return `${categories[tabValue]} Restaurants`;
    }
    return '';
  };

  return (
    <Box
      sx={{
        bgcolor: '#000000',
        background: 'linear-gradient(180deg, #1f2937 0%, #000000 100%)',
        minHeight: '100vh',
        py: { xs: 2, sm: 3 },
        px: { xs: 1, sm: 2 },
        position: 'relative',
        // Disable interaction if city modal is open
        pointerEvents: openCityModal ? 'none' : 'auto',
      }}
    >
      {/* Top Bar with Location and Search */}
      <Box
        sx={{
          maxWidth: '1200px',
          mx: 'auto',
          mb: 3,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: { xs: 2, sm: 3 },
        }}
      >
        {/* Location Module */}
        <FormControl
          sx={{
            minWidth: { xs: '100%', sm: 200 },
            maxWidth: { xs: '100%', sm: 250 },
          }}
        >
          <InputLabel
            id="city-select-label"
            sx={{
              color: '#9ca3af',
              '&.Mui-focused': { color: '#f97316' },
            }}
          >
            Select City
          </InputLabel>
          <Select
            labelId="city-select-label"
            value={selectedCity}
            onChange={handleCityChange}
            label="Select City"
            startAdornment={
              <InputAdornment position="start">
                <LocationOnIcon sx={{ color: '#f97316' }} />
              </InputAdornment>
            }
            sx={{
              bgcolor: '#1f2937',
              color: '#ffffff',
              borderRadius: '8px',
              height: '36px',
              '& .MuiSelect-select': {
                py: 0.5,
                fontSize: { xs: '0.875rem', sm: '1rem' },
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#d4a017',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#f97316',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#f97316',
              },
            }}
          >
            {cities.map((city) => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Search Bar */}
        <TextField
          placeholder="Search restaurants..."
          value={searchQuery}
          onChange={handleSearchChange}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#9ca3af' }} />
              </InputAdornment>
            ),
            style: { color: '#ffffff', fontSize: { xs: '0.875rem', sm: '1rem' } },
          }}
          sx={{
            '& .MuiInputBase-root': {
              bgcolor: '#1f2937',
              borderRadius: '8px',
              height: '36px',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#d4a017',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#f97316',
            },
            '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#f97316',
            },
          }}
        />
      </Box>

      {/* City Selection Modal for First-Time Users */}
      <Modal
        open={openCityModal}
        onClose={() => {}}
        aria-labelledby="city-selection-modal"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            bgcolor: '#1f2937',
            borderRadius: '12px',
            p: { xs: 2, sm: 3 },
            maxWidth: { xs: '90%', sm: 400 },
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
            animation: 'fadeIn 0.3s ease-in-out',
            '@keyframes fadeIn': {
              from: { opacity: 0, transform: 'scale(0.95)' },
              to: { opacity: 1, transform: 'scale(1)' },
            },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: '#ffffff',
              fontWeight: 'bold',
              mb: 2,
              fontSize: { xs: '1.125rem', sm: '1.25rem' },
            }}
          >
            Select Your City
          </Typography>
          <Typography
            sx={{
              color: '#9ca3af',
              mb: 3,
              fontSize: { xs: '0.875rem', sm: '1rem' },
            }}
          >
            Please choose your city to explore restaurants near you.
          </Typography>
          <FormControl fullWidth>
            <InputLabel
              id="modal-city-select-label"
              sx={{
                color: '#9ca3af',
                '&.Mui-focused': { color: '#f97316' },
              }}
            >
              City
            </InputLabel>
            <Select
              labelId="modal-city-select-label"
              value={selectedCity}
              onChange={handleCityChange}
              label="City"
              sx={{
                bgcolor: '#1f2937',
                color: '#ffffff',
                borderRadius: '8px',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#d4a017',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#f97316',
                },
                '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#f97316',
                },
              }}
            >
              {cities.map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            onClick={() => selectedCity && setOpenCityModal(false)}
            disabled={!selectedCity}
            sx={{
              mt: 2,
              bgcolor: '#f97316',
              color: '#ffffff',
              '&:hover': { bgcolor: '#d4a017' },
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 'bold',
              px: 3,
            }}
          >
            Confirm
          </Button>
        </Box>
      </Modal>

      {/* Main Content */}
      <Box sx={{ maxWidth: '1200px', mx: 'auto', opacity: openCityModal ? 0.5 : 1 }}>
        {!searchQuery && !selectedCuisine && (
          <Tabs
            value={tabValue || false} // Prevent auto-selection
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              mb: 2,
              '& .MuiTab-root': {
                color: '#9ca3af',
                fontSize: { xs: '0.875rem', sm: '1rem' },
                textTransform: 'none',
                px: { xs: 1, sm: 2 },
              },
              '& .Mui-selected': { color: '#f97316', fontWeight: 'bold' },
              '& .MuiTabs-indicator': { bgcolor: '#f97316' },
            }}
          >
            <Tab label="Veg" />
            <Tab label="Non-Veg" />
            <Tab label="Cafe" />
          </Tabs>
        )}

        <Typography
          variant="h6"
          sx={{
            color: '#ffffff',
            fontWeight: 'bold',
            fontSize: { xs: '1.125rem', sm: '1.25rem' },
            mb: 2,
            textAlign: 'center',
          }}
        >
          {getTitle()}
        </Typography>

        {tabRestaurants.length > 0 ? (
          <Grid
            container
            spacing={{ xs: 1, sm: 2 }}
            sx={{
              justifyContent: { xs: 'center', sm: 'flex-start' },
            }}
          >
            {tabRestaurants.map((item) => (
              <Grid
                item
                xs={6}
                sm={6}
                md={4}
                lg={3}
                key={item.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <RestaurentCard item={item} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography
            sx={{
              color: '#9ca3af',
              fontSize: { xs: '0.875rem', sm: '1rem' },
              textAlign: 'center',
            }}
          >
            {selectedCuisine
              ? `No ${selectedCuisine} restaurants found.`
              : searchQuery
              ? 'No restaurants match your search.'
              : 'No restaurants found.'}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default UserProfile;
