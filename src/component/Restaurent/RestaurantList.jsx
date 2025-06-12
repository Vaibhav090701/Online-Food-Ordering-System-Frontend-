import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import RestaurentCard from '../Restaurent/RestaurentCard';

const RestaurantsList = () => {
  const { restaurent } = useSelector((store) => store);
  const { type, value } = useParams(); // e.g., type=category, value=Cafe

  const filteredRestaurants = restaurent.allRestaurents?.filter((item) => {
    if (type === 'city') return item.city?.toLowerCase() === value.toLowerCase();
    if (type === 'category') return item.category?.toLowerCase() === value.toLowerCase();
    return true; // all
  }) || [];

  const title =
    type === 'city'
      ? `Restaurants in ${value}`
      : type === 'category'
      ? `${value}s`
      : 'All Restaurants';

  return (
    <Box
      sx={{
        bgcolor: '#000000',
        background: 'linear-gradient(180deg, #1f2937 0%, #000000 100%)',
        minHeight: '100vh',
        py: { xs: 2, sm: 4 },
        px: { xs: 2, sm: 3 },
      }}
    >
      <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
        <Typography
          variant="h6"
          sx={{
            color: '#ffffff',
            fontWeight: 'bold',
            fontSize: { xs: '1.25rem', sm: '1.5rem' },
            mb: 2,
            textAlign: 'center',
          }}
        >
          {title}
        </Typography>
        {filteredRestaurants.length > 0 ? (
          <Grid container spacing={3}>
            {filteredRestaurants.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <RestaurentCard item={item} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography
            sx={{
              color: '#9ca3af',
              fontSize: { xs: '0.9rem', sm: '1rem' },
              textAlign: 'center',
            }}
          >
            No restaurants found.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default RestaurantsList;