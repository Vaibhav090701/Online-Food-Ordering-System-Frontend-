import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Formik } from 'formik';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createIngredient } from '../../component/State/Ingredients/Action';

const CreateIngredientForm = () => {

    const [formData, setFormData]=useState({name:"",ingredientCategoryId:""});
    const { restaurent, ingredients } = useSelector(store => store);
    const dispatch=useDispatch();

    const handleInputChange=(e)=>{
        const {name,value}=e.target;
        setFormData({
            ...formData,[name]:value
        })
    }

    const restaurentId= restaurent.userRestaurent.id;

    const handleSubmit=(e)=>{
      e.preventDefault()

      if (!formData.ingredientCategoryId || formData.ingredientCategoryId === "0") {
        alert("Please select a valid category!");
        return;
      }

      console.log("ingredient category id", formData.ingredientCategoryId);
      
  

        const data={
            name:formData.name,
            categoryId: formData.ingredientCategoryId,
            restaurentId  
        };
        dispatch(createIngredient({reqData:data, jwt:localStorage.getItem("jwt")}))
        console.log(data);
    };

  return (
    <div className=''>
        <div className='p-5'>
            <h1 className='text-gray-400 text-center text-xl pb-5'>Ingredient</h1>
            <form onSubmit={handleSubmit} className='space-y-4'>
            <TextField fullWidth
                id="ingredientName"
                name="name"
                label="Ingredient"
                variednt="outined"
                onChange={handleInputChange}
                value={formData.name}
            ></TextField>

<FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Category</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={formData.ingredientCategoryId}
    label="Category"
    name="ingredientCategoryId"
    onChange={handleInputChange}
  >
    {
      ingredients.category.map((row)=>(
        <MenuItem value={row.id}>{row.name}</MenuItem>
      ))
    }
  </Select>
</FormControl>


        <Button type='submit' variant='contained' color='primary'>
            Create Category
        </Button>


            </form>

        </div>
      
    </div>
  )
}

export default CreateIngredientForm
