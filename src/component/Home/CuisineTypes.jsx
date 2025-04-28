import React from 'react';
import { Box, Typography } from '@mui/material';

const categories = [
    {
      name: 'Italian',
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&auto=format&fit=crop&q=60'
    },
    {
      name: 'Chinese',
      image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=60'
    },
    {
      name: 'Indian',
      image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&auto=format&fit=crop&q=60'
    },
    {
      name: 'Mexican',
      image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=500&auto=format&fit=crop&q=60'
    },
    {
      name: 'Thai',
      image: 'https://images.unsplash.com/photo-1613145990645-b98b5b12f8b2?w=500&auto=format&fit=crop&q=60'
    },
    {
      name: 'Japanese',
      image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e4d6b7?w=500&auto=format&fit=crop&q=60'
    },
    {
      name: 'American',
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&auto=format&fit=crop&q=60'
    },
    {
      name: 'Mediterranean',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60'
    },
    {
      name: 'French',
      image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=500&auto=format&fit=crop&q=60'
    },
    {
      name: 'Korean',
      image: 'https://images.unsplash.com/photo-1604909053134-76f747fef2e8?w=500&auto=format&fit=crop&q=60'
    },
    {
      name: 'Middle Eastern',
      image: 'https://images.unsplash.com/photo-1604908812141-06f9ff6aa174?w=500&auto=format&fit=crop&q=60'
    }
  ];
  
const ExploreByCuisine = ({ handleCuisineClick }) => {
  return (
    <Box sx={{ padding: '20px', backgroundColor: '#fdfdfd' }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: 'bold', marginBottom: '20px', color: '#333' }}
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
          gap: '16px',
        }}
      >
        {categories.map(({ name, image }) => (
          <Box
            key={name}
            onClick={() => handleCuisineClick?.(name)}
            sx={{
              flex: '0 0 auto',
              scrollSnapAlign: 'start',
              width: { xs: '180px', sm: '200px' },
              height: '140px',
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
                bottom: 10,
                left: 10,
                color: '#fff',
                backgroundColor: 'rgba(0,0,0,0.5)',
                px: 1.5,
                py: 0.5,
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '0.9rem',
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
