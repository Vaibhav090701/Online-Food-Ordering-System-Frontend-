import { Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createCategory } from '../../component/State/Restaurent/Action';

const CreateFoodCategoryForm = () => {

    const { restaurent } = useSelector(store => store);
    const dispatch=useDispatch();
  

    const [formData, setFormData]=useState({categoryName:"",restaurentId:""});
    
    const handleInputChange=(e)=>{
        const {name,value}=e.target;
        setFormData({
            ...formData,[name]:value
        })
    }

    const restaurentId= restaurent.userRestaurent.id;


    const handleSubmit=(e)=>{
        e.preventDefault();
        const data={
            name:formData.categoryName,
            restaurentId
        };
        dispatch(createCategory({reqData:data, jwt:localStorage.getItem("jwt")}))
        console.log(data);
    };

  return (
    <div className=''>
        <div className='p-5'>
            <h1 className='text-gray-400 text-center text-xl pb-5'>Create Food Category</h1>
            <form onSubmit={handleSubmit} className='space-y-4'>
            <TextField fullWidth
                id="categoryName"
                name="categoryName"
                label="Food Category"
                varient="outlined"
                onChange={handleInputChange}
                value={formData.categoryName}
            ></TextField>

        <Button type='submit' variant='contained' color='primary'>
            Create Category
        </Button>


            </form>

        </div>
      
    </div>
  )
}

export default CreateFoodCategoryForm
