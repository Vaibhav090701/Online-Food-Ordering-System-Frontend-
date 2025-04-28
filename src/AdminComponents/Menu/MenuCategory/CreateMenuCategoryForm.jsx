import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Grid, CircularProgress, IconButton } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { uploadImageToCloudinary } from '../../util/UploadToCloudinary';
import { AddPhotoAlternate } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { createMenuCategory } from '../../../component/State/MenuCategory/Action';
import CloseIcon from '@mui/icons-material/Close';


const validationSchema = Yup.object({
  name: Yup.string().required('Category name is required'),
  description: Yup.string().required('Description is required'),
});

const CreateMenuCategoryForm = () => {

  const [uploadImage, setUploadImage]=useState(false);
  const dispatch=useDispatch();  

  const jwt=localStorage.getItem("jwt");
    
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      images:[],
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {

      const data={
        categoryName:values.name,
        categoryDescription:values.description,
        categoryImages:values.images,
      } 

      dispatch(createMenuCategory({jwt, reqData:data}));

      console.log("Form data", data);
      

      resetForm();
    },
  });

    const handleImageChange=async(e)=>{
      const file=e.target.files[0];
      setUploadImage(true);
      const image=await uploadImageToCloudinary(file);
      console.log("image-", image);
      
      formik.setFieldValue("images",[...formik.values.images, image]);
      setUploadImage(false);
    };
  
    const handleRemoveImage=(index)=>{
  
      const updateImages=[...formik.values.images];
      updateImages.splice(index,1);
      formik.setFieldValue("images", updateImages)
  
    }
  

  return (
    <div>
      <Typography variant="h5" mb={2}>
        Create Menu Category
      </Typography>

      <form onSubmit={formik.handleSubmit}>
      <Grid className='flex flex-wrap gap-5' item xs={12}>
          <input
          accept='image/*'
          id='fileInput'
          style={{display: "none"}}
          type="file"
          onChange={handleImageChange} />

<label className='relative' htmlFor="fileInput">
<span className='w-24 h-24 cursor-pointer flex items-center justify-center
p-3 border rounded-md border-gray-600'>
<AddPhotoAlternate className="■ text-black"/>
</span>
{
  uploadImage && 
    <div className='absolute left-0 right- top-0 bottom-8 w-24 h-24 flex justify-center items-center'> 
    <CircularProgress/>
    </div>
}
    </label>

    <div className='flex flex-wrap gap-2'>
      {
        formik.values.images.map((image,index)=>
        <div className='relative'>
          <img className='w-24 h-24 object-cover' src={image} alt="" />

          <IconButton size='small'
          sx={{
            position:'absolute',
            top:0,
            right:0,
            outline:'none',

          }} onClick={()=>handleRemoveImage(index)}>
            <CloseIcon sx={{fontSize:'1rem'}}/>
          </IconButton>

        </div>)
      }
    </div>
        </Grid>

        <TextField
          fullWidth
          id="name"
          name="name"
          label="Category Name"
          margin="normal"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />

        <TextField
          fullWidth
          id="description"
          name="description"
          label="Description"
          margin="normal"
          multiline
          rows={3}
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />

        <Box mt={2}>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Create Category
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default CreateMenuCategoryForm;
