import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Drawer,
  Fade,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
  TextField,
  InputAdornment,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import MenuCard from './MenuCard';
import { getRestaurentById } from '../State/Restaurent/Action';
import { getMenuItemByRestaurantId, getRestaurentMenu } from '../State/Menu/Action';

const RestaurentDetails = () => {
  const [foodType, setFoodType] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // New state for search
  const { id } = useParams();
  const dispatch = useDispatch();
  const { restaurent, menu } = useSelector((store) => store);

  // Fetch restaurant and menu data
  useEffect(() => {
    dispatch(getRestaurentById({ restaurentId: id }));
    dispatch(getRestaurentMenu({ id: id }));
  }, [dispatch, id]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter menu items based on foodType and searchQuery
  const filteredMenuItems = useMemo(() => {
    let items = menu.menuItems || [];

    // Apply foodType filter
    items = items.filter((item) => {
      if (foodType === 'all') return true;
      if (foodType === 'vegetarian') return item.vegetarian === true;
      if (foodType === 'non-vegetarian') return item.vegetarian === false;
      return true;
    });

    // Apply search filter
    if (searchQuery) {
      items = items.filter((item) =>
        item.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return items;
  }, [menu.menuItems, foodType, searchQuery]);

  const foodTypes = [
    { label: 'All', value: 'all' },
    { label: 'Vegetarian Only', value: 'vegetarian' },
    { label: 'Non-Vegetarian Only', value: 'non-vegetarian' },
  ];

  // Handle filter change
  const handleFilter = (e) => {
    setFoodType(e.target.value);
  };

  // Toggle filter drawer on mobile
  const toggleFilterDrawer = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // Placeholder image
  const placeholderImage = 'https://via.placeholder.com/1200x400?text=No+Image+Available';

  return (
    <Box sx={{ bgcolor: '#000000', minHeight: '100vh', px: { xs: 2, sm: 4, lg: 8 }, py: 4, overflowY: 'auto' }}>
      {/* Error Alert */}
      {restaurent.error && (
        <Alert severity="error" sx={{ mb: 2, bgcolor: '#7c2d12', color: '#fdba74' }}>
          Failed to load restaurant details. Please try again.
        </Alert>
      )}

      {/* Breadcrumb */}
      <Typography
        variant="body2"
        sx={{
          color: '#9ca3af',
          mb: 3,
          '& a': { color: '#f97316', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } },
        }}
      >
        <a href="/">Home</a> / <a href="/india">India</a> / <span>Indian Fast Food</span>
      </Typography>

      {/* Header Section */}
      <Fade in={true} timeout={1000}>
        <Box sx={{ mb: 6, position: 'relative' }}>
          {/* Hero Image */}
          <Box
            sx={{
              height: { xs: '30vh', sm: '40vh', lg: '50vh' },
              borderRadius: '8px',
              overflow: 'hidden',
              border: '2px solid #f97316',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
              position: 'relative',
              bgcolor: '#1f2937',
            }}
          >
            {imageLoaded || <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#f97316' }} />}
            <img
              src={restaurent.restaurent?.images?.[0] || placeholderImage}
              alt={restaurent.restaurent?.name || 'Restaurant'}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                opacity: imageLoaded ? 1 : 0,
                transition: 'opacity 0.3s',
              }}
              onLoad={() => setImageLoaded(true)}
            />
            {/* Secondary Thumbnail (if available) */}
            {restaurent.restaurent?.images?.[1] && (
              <Box
                sx={{
                  position: 'absolute',
                  bottom: '16px',
                  right: '16px',
                  width: { xs: '80px', sm: '100px' },
                  height: { xs: '80px', sm: '100px' },
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid #f97316',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                <img
                  src={restaurent.restaurent.images[1] || placeholderImage}
                  alt="Secondary"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => (e.target.src = placeholderImage)}
                />
              </Box>
            )}
          </Box>

          {/* Restaurant Info */}
          <Card
            sx={{
              bgcolor: '#1f2937',
              mt: 3,
              borderRadius: '8px',
              border: '1px solid #f97316',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
            }}
          >
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography variant="h3" sx={{ color: '#ffffff', fontWeight: 'bold', mb: 1.5, fontSize: { xs: '1.75rem', sm: '2.125rem' } }}>
                {restaurent.restaurent?.name || 'Loading...'}
              </Typography>
              <Typography variant="body1" sx={{ color: '#9ca3af', mb: 2, lineHeight: 1.6 }}>
                {restaurent.restaurent?.description || 'No description available'}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOnIcon sx={{ color: '#f97316', fontSize: '1.5rem' }} />
                  <Typography variant="body2" sx={{ color: '#ffffff' }}>
                    {restaurent.restaurent?.address || 'Address not available'}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CalendarTodayIcon sx={{ color: '#f97316', fontSize: '1.5rem' }} />
                  <Typography variant="body2" sx={{ color: '#ffffff' }}>
                    Mon-Sun 9:00 AM-9:00 PM (Today)
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Fade>

      <Divider sx={{ bgcolor: '#f97316', mb: 4 }} />

      {/* Main Content */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 4 }}>
        {/* Filter Sidebar (Desktop) */}
        <Box sx={{ width: { xs: '100%', lg: '20%' }, display: { xs: 'none', lg: 'block' } }}>
          <Card sx={{ bgcolor: '#1f2937', p: 2, borderRadius: '8px', position: 'sticky', top: '100px', border: '1px solid #f97316' }}>
            <Typography variant="h6" sx={{ color: '#ffffff', mb: 2 }}>
              Filter by Food Type
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup name="food_type" value={foodType} onChange={handleFilter}>
                {foodTypes.map((item) => (
                  <FormControlLabel
                    key={item.value}
                    value={item.value}
                    control={<Radio sx={{ color: '#f97316', '&.Mui-checked': { color: '#f97316' } }} />}
                    label={<Typography sx={{ color: '#ffffff' }}>{item.label}</Typography>}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Card>
        </Box>

        {/* Mobile Filter Button */}
        <Box sx={{ display: { xs: 'block', lg: 'none' }, mb: 2 }}>
          <Button
            variant="outlined"
            startIcon={<MenuIcon />}
            onClick={toggleFilterDrawer}
            sx={{
              borderColor: '#f97316',
              color: '#f97316',
              py: 1,
              borderRadius: '8px',
              '&:hover': { borderColor: '#ea580c', bgcolor: '#1f2937' },
            }}
          >
            Filters
          </Button>
          <Drawer anchor="left" open={isFilterOpen} onClose={toggleFilterDrawer} PaperProps={{ sx: { bgcolor: '#1f2937', p: 2 } }}>
            <Box sx={{ width: 250 }}>
              <Typography variant="h6" sx={{ color: '#ffffff', mb: 2 }}>
                Filter by Food Type
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup name="food_type" value={foodType} onChange={handleFilter}>
                  {foodTypes.map((item) => (
                    <FormControlLabel
                      key={item.value}
                      value={item.value}
                      control={<Radio sx={{ color: '#f97316', '&.Mui-checked': { color: '#f97316' } }} />}
                      label={<Typography sx={{ color: '#ffffff' }}>{item.label}</Typography>}
                    />
                  ))}
              </RadioGroup>
            </FormControl>
            <Button
              onClick={toggleFilterDrawer}
              sx={{ mt: 2, color: '#f97316', '&:hover': { bgcolor: '#1f2937' } }}
            >
              Close
            </Button>
          </Box>
        </Drawer>
        </Box>

        {/* Menu Section */}
        <Box sx={{ width: { xs: '100%', lg: '80%' } }}>
          <Fade in={true} timeout={500}>
            <Box>
              <Typography variant="h4" sx={{ color: '#ffffff', mb: 2, fontWeight: 'bold' }}>
                Menu
              </Typography>
              {/* Search Bar */}
              <TextField
                placeholder="Search menu items..."
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
                  mb: 3,
                  '& .MuiInputBase-root': {
                    bgcolor: '#1f2937',
                    borderRadius: '8px',
                    height: '40px',
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
                  transition: 'all 0.3s ease',
                }}
                aria-label="Search menu items"
              />
            </Box>
          </Fade>
          {menu.loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress sx={{ color: '#f97316' }} />
            </Box>
          ) : filteredMenuItems.length > 0 ? (
            <Grid container spacing={2}>
              {filteredMenuItems.map((item) => (
                <Grid item xs={12} sm={6} lg={4} key={item.id}>
                  <MenuCard item={item} restaurantId={id} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1" sx={{ color: '#9ca3af' }}>
              {searchQuery ? 'No menu items match your search.' : 'No menu items found for the selected filter.'}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default RestaurentDetails;