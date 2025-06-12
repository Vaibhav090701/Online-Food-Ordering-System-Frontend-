import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { createIngredient } from '../../component/State/Ingredients/Action';

export const initialValues = {
  name: '',
  quantityInStock: '',
  unit: '',
  price: 0.00,
};

const validationSchema = Yup.object({
  name: Yup.string().required('Ingredient name is required'),
  quantityInStock: Yup.number()
    .required('Quantity is required')
    .min(0, 'Quantity cannot be negative'),
  unit: Yup.string().required('Unit is required'),
  price: Yup.number()
    .required('Price is required')
    .min(0, 'Price cannot be negative'),
});

const CreateIngredientForm = ({ onIngredientCreated, onClose }) => {
  const { restaurent } = useSelector((store) => store);
  const dispatch = useDispatch();
  const restaurentId = restaurent.userRestaurent.id;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const reqData = {
        name: values.name,
        quantityInStock: parseFloat(values.quantityInStock),
        unit: values.unit,
        price: parseFloat(values.price),
        restaurantId: restaurentId,
      };
      setIsSubmitting(true);
      try {
        const {data} = await dispatch(createIngredient(reqData));
        if (data?.data?.id) {
          onIngredientCreated(data?.data?.id);
          formik.resetForm();
        }
      } catch (err) {
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <Box sx={{ py: 2 }}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Add-On Name (Extra cheese)"
              variant="outlined"
              onChange={formik.handleChange}
              value={formik.values.name}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
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
                '& .MuiFormHelperText-root': { color: '#fdba74' },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="quantityInStock"
              name="quantityInStock"
              label="Quantity in Stock"
              type="number"
              variant="outlined"
              onChange={formik.handleChange}
              value={formik.values.quantityInStock}
              error={formik.touched.quantityInStock && Boolean(formik.errors.quantityInStock)}
              helperText={formik.touched.quantityInStock && formik.errors.quantityInStock}
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
                '& .MuiFormHelperText-root': { color: '#fdba74' },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="unit"
              name="unit"
              label="Unit (Kg, Piece)"
              variant="outlined"
              onChange={formik.handleChange}
              value={formik.values.unit}
              error={formik.touched.unit && Boolean(formik.errors.unit)}
              helperText={formik.touched.unit && formik.errors.unit}
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
                '& .MuiFormHelperText-root': { color: '#fdba74' },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="price"
              name="price"
              label="Price (₹) Per quantity"
              type="number"
              variant="outlined"
              onChange={formik.handleChange}
              value={formik.values.price}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
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
                '& .MuiFormHelperText-root': { color: '#fdba74' },
              }}
            />
          </Grid>
         
        </Grid>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            onClick={onClose}
            sx={{ color: '#9ca3af', '&:hover': { bgcolor: '#1f2937' } }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            sx={{
              bgcolor: '#f97316',
              color: '#ffffff',
              px: 4,
              py: 1,
              borderRadius: '8px',
              '&:hover': { bgcolor: '#ea580c' },
            }}
          >
            {isSubmitting ? (
              <CircularProgress size={24} sx={{ color: '#ffffff' }} />
            ) : (
              'Create Add-on'
            )}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CreateIngredientForm;