import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Fade,
  FormControlLabel,
  FormGroup,
  Typography,
  Zoom,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../State/Cart/Action';

const MenuCard = ({ item, restaurantId }) => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const dispatch = useDispatch();

  // Handle ingredient checkbox change
  const handleCheckBoxChange = (itemName) => {
    if (selectedIngredients.includes(itemName)) {
      setSelectedIngredients(selectedIngredients.filter((name) => name !== itemName));
    } else {
      setSelectedIngredients([...selectedIngredients, itemName]);
    }
  };

  // Handle add to cart
  const handleAddItemToCart = async (e) => {
    e.preventDefault();
    setIsAdding(true);
    const reqData = {
      token: localStorage.getItem('jwt'),
      cartItem: {
        menuItemId: item.id,
        quantity: 1,
        ingredients: selectedIngredients.length > 0 ? selectedIngredients : null,
        restaurantId,
      },
    };
    try {
      await dispatch(addItemToCart(reqData));
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  // Open/close customization dialog
  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  return (
    <Fade in={true} timeout={500}>
      <Card
        sx={{
          bgcolor: '#1f2937',
          borderRadius: '8px',
          border: '1px solid #f97316',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
          display: 'flex',
          alignItems: 'center',
          p: { xs: 1, sm: 2 },
          position: 'relative',
          transition: 'transform 0.2s',
          '&:hover': { transform: { sm: 'scale(1.02)' } },
        }}
      >
        {/* Image */}
        <Box
          sx={{
            width: { xs: '80px', sm: '100px', lg: '120px' },
            height: { xs: '80px', sm: '100px', lg: '120px' },
            borderRadius: '8px',
            overflow: 'hidden',
            flexShrink: 0,
            position: 'relative',
          }}
        >
          <img
            src={item.images[0] || 'https://via.placeholder.com/100?text=No+Image'}
            alt={item.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => (e.target.src = 'https://via.placeholder.com/100?text=No+Image')}
          />
          {/* Out of Stock Chip */}
          {!item.available && (
            <Chip
              label="Out of Stock"
              color="error"
              size="small"
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                bgcolor: '#7c2d12',
                color: '#fdba74',
                fontSize: '0.75rem',
              }}
            />
          )}
        </Box>

        {/* Content */}
        <CardContent
          sx={{
            flex: 1,
            p: { xs: 1, sm: 2 },
            pl: { xs: 2, sm: 3 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              color: '#ffffff',
              fontWeight: 'bold',
              fontSize: { xs: '0.9rem', sm: '1rem' },
              mb: 0.5,
            }}
            noWrap
          >
            {item.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#f97316',
              fontSize: { xs: '0.85rem', sm: '0.9rem' },
              mb: 0.5,
            }}
          >
            ₹{item.price.toFixed(2)}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#9ca3af',
              fontSize: { xs: '0.8rem', sm: '0.85rem' },
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {item.description}
          </Typography>
          {item.available && item.ingredients?.length > 0 && (
            <Button
              size="small"
              sx={{
                color: '#f97316',
                fontSize: { xs: '0.75rem', sm: '0.8rem' },
                p: 0,
                mt: 0.5,
                justifyContent: 'flex-start',
                '&:hover': { color: '#ea580c', bgcolor: 'transparent' },
              }}
              onClick={handleOpenDialog}
            >
              Customize
            </Button>
          )}
        </CardContent>

        {/* Add Button */}
        {item.available && (
          <Zoom in={true}>
            <Fab
              size="small"
              color="primary"
              onClick={item.ingredients?.length > 0 ? handleOpenDialog : handleAddItemToCart}
              disabled={isAdding}
              sx={{
                position: 'absolute',
                bottom: { xs: 8, sm: 12 },
                right: { xs: 8, sm: 12 },
                bgcolor: '#f97316',
                color: '#ffffff',
                '&:hover': { bgcolor: '#ea580c' },
                '&:disabled': { bgcolor: '#4b5563', color: '#9ca3af' },
              }}
            >
              {isAdding ? <CircularProgress size={20} sx={{ color: '#ffffff' }} /> : <AddIcon />}
            </Fab>
          </Zoom>
        )}

        {/* Customization Dialog */}
        <Dialog
          open={isDialogOpen}
          onClose={handleCloseDialog}
          fullScreen={window.innerWidth < 600}
          PaperProps={{ sx: { bgcolor: '#1f2937', borderRadius: { xs: 0, sm: '8px' }, maxWidth: '600px' } }}
        >
          <DialogTitle sx={{ color: '#ffffff', borderBottom: '1px solid #f97316' }}>
            Customize {item.name}
          </DialogTitle>
          <DialogContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography variant="body2" sx={{ color: '#9ca3af', mb: 2 }}>
              Select Ingredients
            </Typography>
            <FormGroup>
              {item.ingredients.map((ingredient) => (
                <FormControlLabel
                  key={ingredient.id}
                  control={
                    <Checkbox
                      checked={selectedIngredients.includes(ingredient.name)}
                      onChange={() => handleCheckBoxChange(ingredient.name)}
                      sx={{ color: '#f97316', '&.Mui-checked': { color: '#f97316' } }}
                    />
                  }
                  label={<Typography sx={{ color: '#ffffff', fontSize: '0.9rem' }}>{ingredient.name}</Typography>}
                />
              ))}
            </FormGroup>
          </DialogContent>
          <DialogActions sx={{ p: 2, borderTop: '1px solid #f97316' }}>
            <Button
              onClick={handleCloseDialog}
              sx={{ color: '#9ca3af', '&:hover': { bgcolor: '#2d3748' } }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddItemToCart}
              disabled={isAdding}
              sx={{
                bgcolor: '#f97316',
                color: '#ffffff',
                px: 2,
                borderRadius: '8px',
                '&:hover': { bgcolor: '#ea580c' },
                '&:disabled': { bgcolor: '#4b5563', color: '#9ca3af' },
              }}
            >
              {isAdding ? <CircularProgress size={20} sx={{ color: '#ffffff' }} /> : 'Save & Add'}
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </Fade>
  );
};

export default MenuCard;