import { AddPhotoAlternate, ArrowBack } from '@mui/icons-material';
import {
  Alert,
  Autocomplete,
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
import React, { useEffect, useState, useRef } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { uploadImageToCloudinary } from '../util/UploadToCloudinary';
import { getAllIngredients } from '../../component/State/Ingredients/Action';
import { createMenuItem } from '../../component/State/Menu/Action';
import { getAllMenuCategories } from '../../component/State/MenuCategory/Action';
import CreateIngredientForm from '../Ingredients/CreateIngredientForm';

const initialValues = {
  name: '',
  categoryId: '',
  description: '',
  price: '',
  isVegetarian: true,
  ingredientIds: [],
  images: [],
  templateType: '',
  sizes: [],
  addons: [],
};

const templateOptions = ['Pizza', 'Burger', 'Sandwich', 'Wrap'];

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
  const { restaurent, ingredients } = useSelector((store) => store);
  const restaurentId = restaurent.userRestaurent.id;
  const location = useLocation();
  const [uploadImage, setUploadImage] = useState(false);
  const [imageError, setImageError] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [openIngredientDialog, setOpenIngredientDialog] = useState(false);
  const [addonError, setAddonError] = useState('');
  const addAddonButtonRef = useRef(null);

  // Determine initial form values based on location.state
  const prefilledItem = location.state?.item;
  const categoryId = location.state?.id;
  const mode = location.state?.mode || 'custom';

  useEffect(() => {
    dispatch(getAllIngredients());
    dispatch(getAllMenuCategories());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: prefilledItem
      ? {
          name: prefilledItem.name,
          categoryId: prefilledItem.categoryId || categoryId,
          description: prefilledItem.description,
          price: prefilledItem.price,
          vegetarian: prefilledItem.vegetarian,
          images: [prefilledItem.image],
          templateType: prefilledItem.templateType || '',
          sizes: prefilledItem.templateType === 'Pizza' ? [{ size: 'small', priceOffset: 0 }, { size: 'medium', priceOffset: 50 }, { size: 'large', priceOffset: 100 }] : [],
          ingredientIds: [], // Always start with empty ingredientIds
        }
      : { ...initialValues, categoryId },
    onSubmit: async (values) => {
      // Validate ingredientIds before submission
      const availableIngredientIds = ingredients?.ingredients?.map(ing => ing.id) || [];
      const invalidIngredients = values.ingredientIds.filter(id => !availableIngredientIds.includes(id));
      if (invalidIngredients.length > 0) {
        setAddonError('Please remove add-ons that are not in the restaurant’s ingredient list before submitting.');
        return;
      }
      const data = {
        name: values.name,
        categoryId: parseInt(values.categoryId),
        description: values.description,
        price: parseFloat(values.price),
        vegetarian: values.vegetarian,
        ingredientIds: values.ingredientIds,
        images: values.images,
        templateType: values.templateType,
        sizes: values.sizes,
      };
      const response = await dispatch(createMenuItem({ reqData: data }));
      console.log("Response", response);
      
      if (response.payload?.data.success) {
        navigate(`/admin/restaurants/menu`);
      }
    },
  });

  const validateImageUrl = (url) => {
    const urlRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i;
    return urlRegex.test(url);
  };

  const handleImageChange = async (e) => {
    if (formik.values.images.length >= 1) {
      setImageError('Only one image is allowed for menu items.');
      return;
    }
    const file = e.target.files[0];
    if (!file) return;
    setUploadImage(true);
    try {
      const image = await uploadImageToCloudinary(file);
      formik.setFieldValue('images', [image]);
      setImageUrl('');
      setImageError('');
    } catch (error) {
      setImageError('Failed to upload image. Please try again.');
    } finally {
      setUploadImage(false);
    }
  };

  const handleImageUrlChange = () => {
    if (formik.values.images.length >= 1) {
      setImageError('Only one image is allowed for menu items.');
      return;
    }
    if (!validateImageUrl(imageUrl)) {
      setImageError('Please enter a valid image URL (e.g., https://example.com/image.jpg).');
      return;
    }
    formik.setFieldValue('images', [imageUrl]);
    setImageError('');
  };

  const handleRemoveImage = (index) => {
    const updateImages = [...formik.values.images];
    updateImages.splice(index, 1);
    formik.setFieldValue('images', updateImages);
    setImageUrl('');
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
    dispatch(getAllIngredients());
    formik.setFieldValue('ingredientIds', [...formik.values.ingredientIds, newIngredientId]);
    // Revalidate after adding new ingredient
    const availableIngredientIds = ingredients?.ingredients?.map(ing => ing.id) || [];
    const updatedIngredientIds = [...formik.values.ingredientIds, newIngredientId];
    const invalidIngredients = updatedIngredientIds.filter(id => !availableIngredientIds.includes(id));
    if (invalidIngredients.length === 0) {
      setAddonError('');
    }
    handleCloseIngredientDialog();
  };

  const handleBack = () => {
    navigate(`/admin/restaurants/categories/${categoryId}/menu-item`);
  };

  const handleRemoveIngredient = (ingredientId) => {
    const updatedIngredientIds = formik.values.ingredientIds.filter(id => id !== ingredientId);
    formik.setFieldValue('ingredientIds', updatedIngredientIds);
    // Revalidate after removing ingredient
    const availableIngredientIds = ingredients?.ingredients?.map(ing => ing.id) || [];
    const invalidIngredients = updatedIngredientIds.filter(id => !availableIngredientIds.includes(id));
    if (invalidIngredients.length > 0) {
      setAddonError('Some selected add-ons are not present in the restaurant’s ingredient list. Please remove them or add new add-ons.');
    } else {
      setAddonError('');
    }
  };

  // Combine restaurant ingredients with prefilled ingredients as suggestions
  const ingredientOptions = [
    ...(ingredients?.ingredients || []),
    ...(prefilledItem?.ingredients?.filter(
      ing => !ingredients?.ingredients?.some(restIng => restIng.id === ing.id)
    ) || []),
  ];

  return (
    <Box sx={{ bgcolor: '#000000', minHeight: '100vh', py: 10, px: { xs: 2, sm: 4 } }}>
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
              <Typography sx={{ color: '#ffffff', mb: 1, fontWeight: 'medium' }}>
                Upload Image or Enter URL
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
                  <input
                    accept="image/*"
                    id="fileInput"
                    style={{ display: 'none' }}
                    type="file"
                    onChange={handleImageChange}
                    disabled={formik.values.images.length >= 1 || imageUrl}
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
                        cursor: formik.values.images.length >= 1 || imageUrl ? 'not-allowed' : 'pointer',
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
                  {formik.values.images.map((image, index) => (
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
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <TextField
                    fullWidth
                    label="Image URL"
                    variant="outlined"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    disabled={formik.values.images.length >= 1}
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
                  <Button
                    variant="contained"
                    onClick={handleImageUrlChange}
                    disabled={formik.values.images.length >= 1 || !imageUrl}
                    sx={{
                      bgcolor: '#f97316',
                      color: '#ffffff',
                      '&:hover': { bgcolor: '#ea580c' },
                      textTransform: 'none',
                      px: 3,
                    }}
                  >
                    Add URL
                  </Button>
                </Box>
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
                <Autocomplete
                  freeSolo
                  options={templateOptions}
                  value={formik.values.templateType}
                  onChange={(event, newValue) => formik.setFieldValue('templateType', newValue || '')}
                  onInputChange={(event, newInputValue) => formik.setFieldValue('templateType', newInputValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Template Type"
                      variant="outlined"
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
                  )}
                  sx={{
                    bgcolor: '#1f2937',
                    '& .MuiAutocomplete-popupIndicator': { color: '#ffffff' },
                    '& .MuiAutocomplete-clearIndicator': { color: '#ffffff' },
                  }}
                />
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
                multiline
                rows={4}
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
              <FormControl fullWidth variant="filled">
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
                    '& .MuiFilledInput-underline:before': { borderColor: '#f97316' },
                    '&:hover .MuiFilledInput-underline:before': { borderColor: '#ea580c' },
                    '&.Mui-focused .MuiFilledInput-underline:after': { borderColor: '#f97316' },
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
                  onChange={(e) => {
                    formik.setFieldValue('ingredientIds', e.target.value);
                    // Revalidate after changing selection
                    const availableIngredientIds = ingredients?.ingredients?.map(ing => ing.id) || [];
                    const invalidIngredients = e.target.value.filter(id => !availableIngredientIds.includes(id));
                    if (invalidIngredients.length > 0) {
                      setAddonError('Some selected add-ons are not present in the restaurant’s ingredient list. Please remove them or add new add-ons.');
                    } else {
                      setAddonError('');
                    }
                  }}
                  input={<OutlinedInput id="select-multiple-chip" label="Add-ons" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {selected.map((valueId) => {
                        const ingredient = ingredients?.ingredients?.find((ing) => ing.id === valueId);
                        const name = ingredient?.name || 'Unknown';
                        return (
                          <Chip
                            key={valueId}
                            label={name}
                            onDelete={() => handleRemoveIngredient(valueId)}
                            onMouseDown={(e) => e.stopPropagation()} // Prevent Select dropdown from opening
                            deleteIcon={<CloseIcon />}
                            sx={{
                              bgcolor: '#7c2d32',
                              color: '#fff',
                              '& .MuiChip-deleteIcon': {
                                color: '#fff',
                                '&:hover': { color: '#f97316' },
                              },
                            }}
                          />
                        );
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
                  {ingredientOptions.map((row) => (
                    <MenuItem
                      key={row.id}
                      value={row.id}
                      disabled={!ingredients?.ingredients?.some(ing => ing.id === row.id)}
                    >
                      {row.name} {prefilledItem?.ingredients?.some(ing => ing.id === row.id) && '(Suggested)'}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {addonError && (
                <Alert severity="error" sx={{ mt: 2, bgcolor: '#7c2d12', color: '#fdba74' }}>
                  {addonError}
                </Alert>
              )}
              <Button
                ref={addAddonButtonRef}
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
            sx: { bgcolor: '#1f2937', color: '#ffffff', borderRadius: '8px', minWidth: { xs: '90%', sm: '600px' } },
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