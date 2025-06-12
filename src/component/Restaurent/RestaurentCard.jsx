import React from 'react';
import { Card, CardMedia, CardContent, Chip, IconButton, Typography, Box, Rating } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavouriter } from '../State/Authentication/Action';
import { isPresentInFavourites } from '../config/logic';

const RestaurentCard = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);

  const handleAddToFavourite = () => {
    dispatch(addToFavouriter({ restaurentId: item.id }));
  };

  const handleNavigateToRestaurent = () => {
    if (item.status) {
      navigate(`/restaurant/${item.id}`);
    }
  };

  return (
    <Card
      sx={{
        width: { xs: '160px', sm: '260px' },
        bgcolor: 'rgba(31, 41, 55, 0.95)',
        border: '1px solid #d4a017',
        borderRadius: '10px',
        overflow: 'hidden',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: item.status ? 'scale(1.03)' : 'none',
          boxShadow: item.status ? '0 4px 12px rgba(249, 115, 22, 0.5)' : 'none',
          cursor: item.status ? 'pointer' : 'not-allowed',
        },
        mx: 'auto',
      }}
      onClick={handleNavigateToRestaurent}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height={{ xs: '100', sm: '140' }}
          image={item.images?.[0] || ''}
          alt={item.name || 'Restaurant Image'}
          sx={{ objectFit: 'cover' }}
        />
        <Chip
          size="small"
          label={item.status ? 'Open' : 'Closed'}
          sx={{
            position: 'absolute',
            top: 6,
            left: 6,
            bgcolor: item.status ? '#f97316' : '#ef4444',
            color: '#ffffff',
            fontSize: { xs: '0.625rem', sm: '0.75rem' },
            fontWeight: 'bold',
            px: 0.75,
          }}
        />
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            handleAddToFavourite();
          }}
          sx={{
            position: 'absolute',
            top: 6,
            right: 6,
            color: isPresentInFavourites(auth?.favourites, item) ? '#f97316' : '#9ca3af',
            bgcolor: 'rgba(31, 41, 55, 0.7)',
            '&:hover': { bgcolor: 'rgba(31, 41, 55, 0.9)' },
            width: { xs: 28, sm: 32 },
            height: { xs: 28, sm: 32 },
          }}
        >
          {isPresentInFavourites(auth?.favourites, item) ? (
            <FavoriteIcon fontSize="small" />
          ) : (
            <FavoriteBorderIcon fontSize="small" /> 
          )}
        </IconButton>
      </Box>
      <CardContent sx={{ p: { xs: 1, sm: 2 }, color: '#ffffff' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: { xs: 0.5, sm: 0.75 } }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '0.75rem', sm: '1rem' },
              color: '#ffffff',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '70%',
            }}
          >
            {item.name || 'Restaurant Name'}
          </Typography>
          <Rating
            value={item.rating || 0}
            precision={0.5}
            readOnly
            size="small"
            sx={{ color: '#f97316', fontSize: { xs: '0.875rem', sm: '1rem' } }}
          />
        </Box>
        <Typography
          sx={{
            fontSize: { xs: '0.625rem', sm: '0.875rem' },
            color: '#9ca3af',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {item.description || 'No description available'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RestaurentCard;