import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { getMenuItemByCategory } from '../../component/State/Menu/Action';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';


const PredefinedMenuList = () => {
  const dispatch = useDispatch();
  const { menu,menuCategory } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('All');
  const menuItems = menu?.menuItems || [];
  const {id}=useParams();
  const category = menuCategory.menuCategories.find((cat) => cat.id === parseInt(id)) || { name: 'Category' };

  const navigate=useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(getMenuItemByCategory({ id: id, jwt }));
    }
  }, [id, dispatch, jwt]);

  // Get unique template types
  const templateTypes = ['All', ...new Set(menuItems.map((item) => item.templateType))];

  // Filter menu items
  const filteredItems = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTemplate = selectedTemplate === 'All' || item.templateType === selectedTemplate;
    return matchesSearch && matchesTemplate;
  });

  const goBack=()=>{
    navigate('/admin/restaurents/menu/categories');
  }

  const onSelectItem=(item)=>{
    console.log("Selected Predefined Item:", item);
    navigate('/admin/restaurents/menu-form',{
      state:{item,id,mode:"prefill"}
    },
  )}

  const onCreateNew=()=>{
    navigate(`/admin/restaurents/menu-form`,{
      state:{id,mode:"custom"},
    });
  }

  return (
    <Box sx={{ p: 4, bgcolor: '#000000', minHeight: '100vh' }}>
            {/* Back Button and Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <IconButton
          onClick={goBack}
          sx={{
            color: '#f97316',
            '&:hover': { bgcolor: '#1f2937' },
            mr: 1,
          }}
          aria-label="Go back"
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
          Select a Menu Item for {category?.name}
        </Typography>
      </Box>

      {/* Create Custom Item Button */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography sx={{ color: '#d1d5db', mb: 2 }}>
          Don’t see the item you want?
        </Typography>
        <Button
          variant="contained"
          onClick={onCreateNew}
          sx={{
            bgcolor: '#f97316',
            color: '#ffffff',
            px: 4,
            py: 1.5,
            borderRadius: '8px',
            fontWeight: 'bold',
            '&:hover': { bgcolor: '#ea580c' },
          }}
        >
          Create Custom Menu Item
        </Button>
      </Box>
      {/* Search and Filter */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Search menu items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#f97316' }} />
              </InputAdornment>
            ),
            sx: {
              bgcolor: '#1f2937',
              color: '#ffffff',
              borderRadius: '8px',
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#f97316' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#ea580c' },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#f97316' },
            },
          }}
          sx={{ '& .MuiInputBase-input': { color: '#ffffff' } }}
        />
        <Select
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value)}
          sx={{
            bgcolor: '#1f2937',
            color: '#ffffff',
            borderRadius: '8px',
            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#374151' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#4b5563' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#2563eb' },
            '& .MuiSvgIcon-root': { color: '#f97316' },
          }}
        >
          {templateTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Menu Items Grid */}
      {filteredItems.length > 0 ? (
        <Grid container spacing={2}>
          {filteredItems.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.id}>
              <Card
                sx={{
                  bgcolor: '#1f2937',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'box-shadow 0.3s',
                  '&:hover': { boxShadow: '0 8px 12px rgba(0, 0, 0, 0.2)' },
                }}
              >
                <CardMedia
                  component="img"
                  image={item.image}
                  alt={item.name}
                  sx={{ height: '128px', objectFit: 'cover' }}
                />
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="h6" sx={{ color: '#ffffff', fontSize: '1.125rem' }}>
                      {item.name}
                    </Typography>
                    <Typography sx={{ color: '#4ade80', fontSize: '1rem', fontWeight: 'medium' }}>
                      ₹{item.price}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ color: '#9ca3af', fontSize: '0.75rem', mb: 2 }}
                  >
                    {item.description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography
                      sx={{
                        bgcolor: '#7c2d12',
                        color: '#fdba74',
                        px: 1,
                        py: 0.5,
                        borderRadius: '999px',
                        fontSize: '0.75rem',
                        fontWeight: 'medium',
                      }}
                    >
                      {item.templateType}
                    </Typography>
                    <Typography sx={{ ml: 1, color: '#9ca3af', fontSize: '0.75rem' }}>
                      {item.vegetarian ? 'Veg' : 'Non-Veg'}
                    </Typography>
                  </Box>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => onSelectItem(item)}
                    sx={{
                      bgcolor: '#f97316',
                      color: '#ffffff',
                      py: 1,
                      borderRadius: '8px',
                      '&:hover': { bgcolor: '#1d4ed8' },
                    }}
                  >
                    Use this item
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', py: 12 }}>
          <Typography sx={{ color: '#9ca3af', fontSize: '1.125rem' }}>
            No items found matching your criteria.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default PredefinedMenuList;