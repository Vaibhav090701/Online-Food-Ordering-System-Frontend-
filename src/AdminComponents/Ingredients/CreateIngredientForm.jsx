import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createIngredient } from '../../component/State/Ingredients/Action';

export const initialValues = {
  name: "",
  description: "",
  quantityInStock: "",
  unit: ""
};

const CreateIngredientForm = () => {
  const { restaurent } = useSelector(store => store);
  const dispatch = useDispatch();
  const restaurentId = restaurent.userRestaurent.id;
  const jwt=localStorage.getItem("jwt");

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      const data = {
        name: values.name,
        description: values.description,
        quantityInStock: values.quantityInStock,
        unit: values.unit,
      };
      console.log("form data", values);
      dispatch(createIngredient({ reqData: data, jwt: jwt }));
    }
  });

  return (
    <div className=''>
      <div className='p-5'>
        <h1 className='text-gray-400 text-center text-xl pb-5'>Ingredient</h1>
        <form onSubmit={formik.handleSubmit} className='space-y-4'>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Ingredient"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <TextField
            fullWidth
            id="description"
            name="description"
            label="Description"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
          <TextField
            fullWidth
            id="quantityInStock"
            name="quantityInStock"
            label="Quantity in Stock"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.quantityInStock}
          />
          <TextField
            fullWidth
            id="unit"
            name="unit"
            label="Unit"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.unit}
          />
          <Button type='submit' variant='contained' color='primary'>
            Create Ingredient
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateIngredientForm;
