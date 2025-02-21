import { Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createIngredientCategory } from '../../component/State/Ingredients/Action';

const CreateIngredientCategoryForm = () => {

    const [formData, setFormData]=useState({name:""});

    const { restaurent } = useSelector(store => store);
    const dispatch=useDispatch();

    const restaurentId= restaurent.userRestaurent.id;

    const handleInputChange=(e)=>{
        const {name,value}=e.target;
        setFormData({
            ...formData,[name]:value
        })
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        const data={
            name:formData.name,
            restaurentId  
        };
        console.log("Form",formData);
        dispatch(createIngredientCategory({reqData:data, jwt:localStorage.getItem("jwt")}))
    };

  return (
    <div className=''>
        <div className='p-5'>
            <h1 className='text-gray-400 text-center text-xl pb-5'>Create Ingredient Category</h1>
            <form onSubmit={handleSubmit} className='space-y-4'>
            <TextField fullWidth
                id="name"
                name="name"
                label="Name"
                variednt="outined"
                onChange={handleInputChange}
                value={formData.name}
            ></TextField>

        <Button type='submit' variant='contained' color='primary'>
            Create Category
        </Button>

            </form>

        </div>
      
    </div>
  )
}

export default CreateIngredientCategoryForm
