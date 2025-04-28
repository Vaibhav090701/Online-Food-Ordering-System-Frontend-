import { AddPhotoAlternate, ArrowBack } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { uploadImageToCloudinary } from '../util/UploadToCloudinary';
import { getIngredientsOfRestaurent } from '../../component/State/Ingredients/Action';
import { createMenuItem } from '../../component/State/Menu/Action';
import { getAllMenuCategories } from '../../component/State/MenuCategory/Action';
import CreateIngredientForm from '../Ingredients/CreateIngredientForm';

const initialValues = {
  name: '',
  category: '',
  description: '',
  price: '',
  isVegetarian: true,
  ingredientIds: [],
  images: [],
  templateType: '',
  sizes: [],
  addons: [],
};

const CreateMenuForm = () => {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { restaurent, ingredients, menuCategory } = useSelector((store) => store);
  const restaurentId = restaurent.userRestaurent.id;
  const jwt = localStorage.getItem('jwt');
  const location = useLocation();
  const [uploadImage, setUploadImage] = useState(false);
  const [imageError, setImageError] = useState('');
  const [openIngredientDialog, setOpenIngredientDialog] = useState(false);

  // Determine initial form values based on location.state
  const prefilledItem = location.state?.item;
  const categoryId = location.state?.id;
  const mode = location.state?.mode || 'custom';

  useEffect(() => {
    dispatch(getIngredientsOfRestaurent(jwt));
    dispatch(getAllMenuCategories(jwt));
  }, [dispatch, jwt]);

  const formik = useFormik({
    initialValues: prefilledItem
      ? {
          name: prefilledItem.name,
          category: prefilledItem.category || '',
          description: prefilledItem.description,
          price: prefilledItem.price,
          vegetarian: prefilledItem.vegetarian,
          images: [prefilledItem.image],
          templateType: prefilledItem.templateType || '',
          sizes: prefilledItem.templateType === 'Pizza' ? [{ size: 'small', priceOffset: 0 }, { size: 'medium', priceOffset: 50 }, { size: 'large', priceOffset: 100 }] : [],
          ingredientIds:[],
        }
      : initialValues,
    onSubmit: (values) => {
      const data = {
        name: values.name,
        category: values.category,
        description: values.description,
        price: parseFloat(values.price),
        vegetarian: values.vegetarian,
        ingredientIds: values.ingredientIds,
        images: values.images,
        templateType: values.templateType,
        sizes: values.sizes,
      };
      console.log("Form data", data);
      
      dispatch(createMenuItem({ reqData: data, jwt }));
    },
  });

  const handleImageChange = async (e) => {
    if (formik.values.images.length >= 1) {
      setImageError('Only one image is allowed for menu items.');
      return;
    }
    const file = e.target.files[0];
    setUploadImage(true);
    const image = await uploadImageToCloudinary(file);
    formik.setFieldValue('images', [image]);
    setUploadImage(false);
    setImageError('');
  };

  const handleRemoveImage = (index) => {
    const updateImages = [...formik.values.images];
    updateImages.splice(index, 1);
    formik.setFieldValue('images', updateImages);
    setImageError('');
  };

  const handleAddSize = () => {
    formik.setFieldValue('sizes', [...formik.values.sizes, { size: '', priceOffset: 0 }]);
  };

  const handleSizeChange = (index, field, value) => {
    const updatedSizes = [...formik.values.sizes];
    updatedSizes[index][field] = value;
    formik.setFieldValue('sizes', updatedSizes);
  };

  const handleRemoveSize = (index) => {
    const updatedSizes = [...formik.values.sizes];
    updatedSizes.splice(index, 1);
    formik.setFieldValue('sizes', updatedSizes);
  };


  const handleOpenIngredientDialog = () => {
    setOpenIngredientDialog(true);
  };

  const handleCloseIngredientDialog = () => {
    setOpenIngredientDialog(false);
  };

  const handleIngredientCreated = (newIngredientId) => {
    dispatch(getIngredientsOfRestaurent(jwt));
    formik.setFieldValue('ingredientIds', [...formik.values.ingredientIds, newIngredientId]);
    handleCloseIngredientDialog();
  };

  const handleBack = () => {
    navigate(`/admin/restaurents/menu-items/${categoryId}`);
  };

  return (
    <Box sx={{ bgcolor: '#000000', minHeight: '100vh', py: 10, px: 4 }}>
      <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <IconButton
            onClick={handleBack}
            sx={{ color: '#f97316', '&:hover': { bgcolor: '#1f2937' }, mr: 1 }}
            aria-label="Go back"
          >
            <ArrowBack />
          </IconButton>
          <Typography
            variant="h4"
            sx={{ color: '#ffffff', fontWeight: 'bold', textAlign: 'center' }}
          >
            {mode === 'prefill' ? 'Edit Menu Item' : 'Add New Menu Item'}
          </Typography>
        </Box>

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            {/* Images */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
                <input
                  accept="image/*"
                  id="fileInput"
                  style={{ display: 'none' }}
                  type="file"
                  onChange={handleImageChange}
                  disabled={formik.values.images.length >= 1}
                />
                <label htmlFor="fileInput">
                  <Box
                    sx={{
                      width: 96,
                      height: 96,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px dashed #f97316',
                      borderRadius: '8px',
                      cursor: formik.values.images.length >= 1 ? 'not-allowed' : 'pointer',
                      bgcolor: '#1f2937',
                      position: 'relative',
                    }}
                  >
                    <AddPhotoAlternate sx={{ color: '#f97316' }} />
                    {uploadImage && (
                      <Box
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: 'rgba(0, 0, 0, 0.5)',
                        }}
                      >
                        <CircularProgress size={24} sx={{ color: '#f97316' }} />
                      </Box>
                    )}
                  </Box>
                </label>
                {formik.values.images.map((image,index)=>(
                                    <Box key={index} sx={{ position: 'relative' }}>
                                    <img
                                      src={image}
                                      alt={`Uploaded ${index}`}
                                      style={{ width: 96, height: 96, objectFit: 'cover', borderRadius: '8px' }}
                                    />
                                    <IconButton
                                      size="small"
                                      onClick={() => handleRemoveImage(index)}
                                      sx={{
                                        position: 'absolute',
                                        top: 0,
                                        right: 0,
                                        bgcolor: '#f97316',
                                        color: '#ffffff',
                                        '&:hover': { bgcolor: '#ea580c' },
                                      }}
                                    >
                                      <CloseIcon sx={{ fontSize: '1rem' }} />
                                    </IconButton>
                                  </Box>                

                ))}
                {imageError && (
                  <Alert severity="error" sx={{ mt: 2, bgcolor: '#7c2d12', color: '#fdba74' }}>
                    {imageError}
                  </Alert>
                )}
              </Box>
            </Grid>

            {/* Template Type */}
            <Grid item xs={12}>
              {mode === 'prefill' ? (
                <Typography sx={{ color: '#ffffff', fontWeight: 'medium', mb: 1 }}>
                  Template Type: {formik.values.templateType || 'None'}
                </Typography>
              ) : (
                <FormControl fullWidth variant="outlined">
                  <InputLabel sx={{ color: '#9ca3af' }} id="templateType-label">
                    Template Type
                  </InputLabel>
                  <Select
                    labelId="templateType-label"
                    name="templateType"
                    value={formik.values.templateType}
                    onChange={formik.handleChange}
                    label="Template Type"
                    sx={{
                      bgcolor: '#1f2937',
                      color: '#ffffff',
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: '#f97316' },
                      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#ea580c' },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#f97316' },
                      '& .MuiSvgIcon-root': { color: '#ffffff' },
                    }}
                  >
                    <MenuItem value={"Pizza"}>Pizza</MenuItem>
                    <MenuItem value={"Burger"}>Burger</MenuItem>
                    <MenuItem value={"Sandwich"}>Sandwich</MenuItem>
                    <MenuItem value={"Wrap"}>Wrap</MenuItem>
                  </Select>
                </FormControl>
              )}
            </Grid>

            {/* Category */}
            <Grid item xs={12}>
              {mode === 'prefill' ? (
                <Typography sx={{ color: '#ffffff', fontWeight: 'medium', mb: 1 }}>
                  Category Name: {formik.values.category}
                </Typography>
              ) : (
                <FormControl fullWidth variant="outlined">
                  <InputLabel sx={{ color: '#9ca3af' }} id="category-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="category-label"
                    name="category"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    label="Category"
                    sx={{
                      bgcolor: '#1f2937',
                      color: '#ffffff',
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: '#f97316' },
                      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#ea580c' },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#f97316' },
                      '& .MuiSvgIcon-root': { color: '#ffffff' },
                    }}
                  >
                    {menuCategory.menuCategories.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.categoryName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Grid>

            {/* Name */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="name"
                label="Name"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.name}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: '#1f2937',
                    color: '#ffffff',
                    '& fieldset': { borderColor: '#f97316' },
                    '&:hover fieldset': { borderColor: '#ea580c' },
                    '&.Mui-focused fieldset': { borderColor: '#f97316' },
                  },
                  '& .MuiInputLabel-root': { color: '#9ca3af' },
                  '& .MuiInputLabel-root.Mui-focused': { color: '#f97316' },
                }}
              />
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="description"
                label="Description"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.description}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: '#1f2937',
                    color: '#ffffff',
                    '& fieldset': { borderColor: '#f97316' },
                    '&:hover fieldset': { borderColor: '#ea580c' },
                    '&.Mui-focused fieldset': { borderColor: '#f97316' },
                  },
                  '& .MuiInputLabel-root': { color: '#9ca3af' },
                  '& .MuiInputLabel-root.Mui-focused': { color: '#f97316' },
                }}
              />
            </Grid>

            {/* Price */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="price"
                label="Base Price"
                variant="outlined"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.price}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: '#1f2937',
                    color: '#ffffff',
                    '& fieldset': { borderColor: '#f97316' },
                    '&:hover fieldset': { borderColor: '#ea580c' },
                    '&.Mui-focused fieldset': { borderColor: '#f97316' },
                  },
                  '& .MuiInputLabel-root': { color: '#9ca3af' },
                  '& .MuiInputLabel-root.Mui-focused': { color: '#f97316' },
                }}
              />
            </Grid>

            {/* Vegetarian */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel sx={{ color: '#9ca3af' }} id="isVegetarian-label">
                  Type
                </InputLabel>
                <Select
                  labelId="vegetarian-label"
                  name="vegetarian"
                  value={formik.values.vegetarian}
                  onChange={formik.handleChange}
                  label="Type"
                  sx={{
                    bgcolor: '#1f2937',
                    color: '#ffffff',
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#f97316' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#ea580c' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#f97316' },
                    '& .MuiSvgIcon-root': { color: '#ffffff' },
                  }}
                >
                  <MenuItem value={true}>Vegetarian</MenuItem>
                  <MenuItem value={false}>Non-Vegetarian</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Ingredients */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel sx={{ color: '#9ca3af' }} id="ingredients-label">
                  Add-ons
                </InputLabel>
                <Select
                  labelId="ingredients-label"
                  name="ingredientIds"
                  multiple
                  value={formik.values.ingredientIds}
                  onChange={(e) => formik.setFieldValue('ingredientIds', e.target.value)}
                  input={<OutlinedInput id="select-multiple-chip" label="Add-ons" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => {
                        const ingredient = ingredients.ingredients.find((ing) => ing.id === value);
                        return <Chip key={value} label={ingredient?.name || value} sx={{ bgcolor: '#7c2d12', color: '#fdba74' }} />;
                      })}
                    </Box>
                  )}
                  sx={{
                    bgcolor: '#1f2937',
                    color: '#ffffff',
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#f97316' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#ea580c' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#f97316' },
                    '& .MuiSvgIcon-root': { color: '#ffffff' },
                  }}
                  MenuProps={MenuProps}
                >
                  {ingredients.ingredients.map((row) => (
                    <MenuItem key={row.id} value={row.id}>
                      {row.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                onClick={handleOpenIngredientDialog}
                variant="outlined"
                sx={{
                  mt: 2,
                  borderColor: '#f97316',
                  color: '#f97316',
                  '&:hover': { borderColor: '#ea580c', bgcolor: '#1f2937' },
                }}
              >
                Add New Add-on
              </Button>
            </Grid>

            {/* Pizza Sizes */}
            {formik.values.templateType === 'Pizza' && (
              <Grid item xs={12}>
                <Typography sx={{ color: '#ffffff', mb: 2, fontWeight: 'medium' }}>
                  Pizza Sizes
                </Typography>
                {formik.values.sizes.map((size, index) => (
                  <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
                    <TextField
                      label="Size"
                      value={size.size}
                      onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
                      sx={{
                        flex: 1,
                        '& .MuiOutlinedInput-root': {
                          bgcolor: '#1f2937',
                          color: '#ffffff',
                          '& fieldset': { borderColor: '#f97316' },
                          '&:hover fieldset': { borderColor: '#ea580c' },
                          '&.Mui-focused fieldset': { borderColor: '#f97316' },
                        },
                        '& .MuiInputLabel-root': { color: '#9ca3af' },
                        '& .MuiInputLabel-root.Mui-focused': { color: '#f97316' },
                      }}
                    />
                    <TextField
                      label="Price Offset (₹)"
                      type="number"
                      value={size.priceOffset}
                      onChange={(e) => handleSizeChange(index, 'priceOffset', parseFloat(e.target.value))}
                      sx={{
                        flex: 1,
                        '& .MuiOutlinedInput-root': {
                          bgcolor: '#1f2937',
                          color: '#ffffff',
                          '& fieldset': { borderColor: '#f97316' },
                          '&:hover fieldset': { borderColor: '#ea580c' },
                          '&.Mui-focused fieldset': { borderColor: '#f97316' },
                        },
                        '& .MuiInputLabel-root': { color: '#9ca3af' },
                        '& .MuiInputLabel-root.Mui-focused': { color: '#f97316' },
                      }}
                    />
                    <IconButton
                      onClick={() => handleRemoveSize(index)}
                      sx={{ color: '#f97316', '&:hover': { bgcolor: '#1f2937' } }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>
                ))}
                <Button
                  onClick={handleAddSize}
                  variant="outlined"
                  sx={{
                    borderColor: '#f97316',
                    color: '#f97316',
                    '&:hover': { borderColor: '#ea580c', bgcolor: '#1f2937' },
                  }}
                >
                  Add Size
                </Button>
              </Grid>
            )}

          </Grid>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Button
              type="submit"
              variant="contained"
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
              {mode === 'prefill' ? 'Save Menu Item' : 'Create Menu Item'}
            </Button>
          </Box>
        </form>

        {/* Ingredient Creation Dialog */}
        <Dialog
          open={openIngredientDialog}
          onClose={handleCloseIngredientDialog}
          PaperProps={{
            sx: { bgcolor: '#1f2937', color: '#ffffff', borderRadius: '8px', minWidth: '600px' },
          }}
        >
          <DialogTitle sx={{ color: '#ffffff' }}>Add New Add-on</DialogTitle>
          <DialogContent>
            <CreateIngredientForm
              onIngredientCreated={handleIngredientCreated}
              onClose={handleCloseIngredientDialog}
            />
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
};

export default CreateMenuForm;