import React, { useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { updateIngredientDetails } from '../../component/State/Ingredients/Action';

const UpdateIngredientForm = ({ ingredient, handleClose }) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem('jwt');
  const id=ingredient.id;

  const formik = useFormik({
    initialValues: {
      name: ingredient?.name || '',
      price:ingredient?.price || 0.00,
      quantityInStock: ingredient?.quantityInStock || 0,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      const updatedData = {
        name: values.name,
        price: values.price,
        quantityInStock: values.quantityInStock,
      };

      dispatch(updateIngredientDetails({id,jwt, reqData:updatedData}));
      handleClose(); // Close modal after update
    },
  });

  return (
    <Box>
      <Typography variant="h6" mb={2}>
        Update Ingredient
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Ingredient Name"
          name="name"
          fullWidth
          margin="normal"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        <TextField
          label="Quantity in Stock"
          name="quantityInStock"
          fullWidth
          margin="normal"
          type="number"
          value={formik.values.quantityInStock}
          onChange={formik.handleChange}
        />
        <TextField
          label="Price"
          name="price"
          fullWidth
          margin="normal"
          value={formik.values.price}
          onChange={formik.handleChange}
        />

        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Update
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default UpdateIngredientForm;
