import React from 'react';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    name: 'Italian',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&auto=format&fit=crop&q=60',
  },
  {
    name: 'Chinese',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=60',
  },
  {
    name: 'Indian',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&auto=format&fit=crop&q=60',
  },
  {
    name: 'Mexican',
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=500&auto=format&fit=crop&q=60',
  },
  {
    name: 'Thai',
    image: 'https://plus.unsplash.com/premium_photo-1661610605309-77feabcc8772?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3',
  },
  {
    name: 'Japanese',
    image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3',
  },
  {
    name: 'American',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&auto=format&fit=crop&q=60',
  },
  {
    name: 'Mediterranean',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60',
  },
  {
    name: 'French',
    image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=500&auto=format&fit=crop&q=60',
  },
  {
    name: 'Korean',
    image: 'https://images.unsplash.com/photo-1580651315530-69c8e0026377?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3',
  },
  {
    name: 'Middle Eastern',
    image: 'https://images.unsplash.com/photo-1696385793103-71f51f6fd3b7?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3',
  },
];

const ExploreByCuisine = () => {
  const { auth } = useSelector((store) => store);
  const navigate = useNavigate();

  const handleCuisineClick = (cuisine) => {
    if (!auth.user) {
      navigate('/account/login');
    } else {
      navigate(`/my-profile?cuisine=${encodeURIComponent(cuisine)}`);
    }
  };

  return (
    <Box sx={{ padding: { xs: '16px', sm: '20px' }, backgroundColor: '#fdfdfd' }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 'bold',
          marginBottom: '16px',
          color: '#333',
          fontSize: { xs: '1.25rem', sm: '1.5rem' },
        }}
      >
        Explore by Cuisine
      </Typography>

      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          gap: { xs: '12px', sm: '16px' },
        }}
      >
        {categories.map(({ name, image }) => (
          <Box
            key={name}
            onClick={() => handleCuisineClick(name)}
            sx={{
              flex: '0 0 auto',
              scrollSnapAlign: 'start',
              width: { xs: '160px', sm: '180px' },
              height: { xs: '120px', sm: '140px' },
              position: 'relative',
              borderRadius: '12px',
              overflow: 'hidden',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s',
              '&:hover': { transform: 'scale(1.03)' },
            }}
          >
            <img
              src={image}
              alt={name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            <Typography
              variant="subtitle1"
              sx={{
                position: 'absolute',
                bottom: 8,
                left: 8,
                color: '#fff',
                backgroundColor: 'rgba(0,0,0,0.6)',
                px: 1.5,
                py: 0.5,
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: { xs: '0.8rem', sm: '0.9rem' },
              }}
            >
              {name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ExploreByCuisine;