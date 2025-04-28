import React, { useEffect, useState } from 'react';
import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, IconButton, Modal, Typography } from '@mui/material';
import PredefinedMenuList from '../PreDefineMenuList';
import { useNavigate } from 'react-router-dom';
import { style } from '../../../util/constants';
import CreateIcon from '@mui/icons-material/Create';
import CreateMenuCategoryForm from './CreateMenuCategoryForm';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMenuCategory, getAllMenuCategories} from '../../../component/State/MenuCategory/Action';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const CategoryGrid = () => {

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [openCategoryForm, setOpenCategoryForm] = useState(false);

    const dispatch=useDispatch();
    const {menuCategory}=useSelector(store=>store);

    const jwt=localStorage.getItem('jwt');

    const navigate=useNavigate();

    useEffect(()=>{
      dispatch(getAllMenuCategories(jwt));
    },[])


    const onSelectCategory=(category)=>{
        console.log("Selected Category:", category);
        navigate(`/admin/restaurents/categories/${category.id}/menu-item`);


        setSelectedCategory(category);
    }

      const handleClose = () => {
        setOpenCategoryForm(false);
      };
    
      const handleOpen = () => {
        setOpenCategoryForm(true);
      };

      const handleDelete=(id)=>{
        dispatch(deleteMenuCategory({jwt, id:id}))
      }

      const handleGoBack=()=>{
        navigate("/admin/restaurents/menu");
      }
    
  return (
    <Box sx={{ bgcolor: '#000000', minHeight: '100vh', p: 4 }}>
      <Box>
        {/* Top-right corner Add Icon */}
        <IconButton
          onClick={handleOpen}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            color: '#f97316',
            '&:hover': { bgcolor: '#1f2937' },
          }}
          aria-label="Add category"
        >
          <CreateIcon />
        </IconButton>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <IconButton
          onClick={handleGoBack}
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
          Select a category
        </Typography>
      </Box>

        <Grid container spacing={2}>
          {menuCategory.menuCategories.map((category) => (
            <Grid item xs={12} sm={6} md={4} key={category.id}>
              <Card
                sx={{
                  position: 'relative',
                  bgcolor: '#1f2937',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
                  transition: 'box-shadow 0.3s, transform 0.3s',
                  '&:hover': {
                    boxShadow: '0 8px 12px rgba(0, 0, 0, 0.5)',
                    transform: 'translateY(-4px)',
                  },
                  height: 300,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardActionArea onClick={() => onSelectCategory(category)}>
                  <CardMedia
                    component="img"
                    image={category.categoryImage[0]}
                    alt={category.categoryName}
                    sx={{
                      height: 160,
                      objectFit: 'cover',
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{ color: '#ffffff', fontWeight: 'medium' }}
                    >
                      {category.categoryName}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: '#9ca3af', mt: 1 }}
                    >
                      {category.categoryDescription}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <IconButton
                  onClick={() => handleDelete(category.id)}
                  sx={{
                    position: 'absolute',
                    bottom: 8,
                    right: 8,
                    color: '#f97316',
                    bgcolor: 'rgba(31, 41, 55, 0.8)',
                    '&:hover': { bgcolor: 'rgba(31, 41, 55, 1)' },
                  }}
                  aria-label="Delete category"
                >
                  <DeleteIcon />
                </IconButton>
              </Card>
            </Grid>
          ))}
        </Grid>
        
      </Box>
    

    {/* Category Creation Modal */}
    <Modal open={openCategoryForm} onClose={handleClose}>
      <Box sx={style}>
        <CreateMenuCategoryForm />
      </Box>
    </Modal>
  </Box>

  );
};

export default CategoryGrid;
