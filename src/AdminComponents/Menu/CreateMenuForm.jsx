import { AddPhotoAlternate } from '@mui/icons-material';
import { Box, Button, Chip, CircularProgress, FormControl, Grid, IconButton, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import { useFormik } from 'formik'
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react'
import { uploadImageToCloudinary } from '../util/UploadToCloudinary';
import { useDispatch, useSelector } from 'react-redux';

export const initialValues={
  name:"",
  description:"",
  price:"",
  category:"",
  restaurentId:"",
  vegetarian:true,
  seasonal:false,
  ingredients:[],
  images:[],
}

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
      const dispatch=useDispatch();
      const { restaurent, ingredients } = useSelector(store => store);
      const restaurentId= restaurent.userRestaurent.id;
      const jwt=localStorage.getItem("jwt");
    
  const [uploadImage, setUploadImage]=useState(false);

  const formik=useFormik({
    initialValues,
    onSubmit:(values)=>{
      const data={
        name:values.name,
        description:values.description,
        price:values.price,
        category:values.category,
        ingredients:values.ingredients,
        vegetarian:values.vegetarian,
        seasonal:values.seasonal
      }


      console.log("form data",values);
    }
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
  console.log("Price", formik.values.price);
  
  return (
    <div>
      <div className='py-10 lg:flex items-center justify-center min-h-screen'>
        <div className='lg:max-w-4xl'>
        <h1 className='font-bold text-2x1 text-center py-2'>
      Add New Menu
      </h1>

  <form onSubmit={formik.handleSubmit} className='space-y-4'> 
      <Grid container spacing={2} sx={{marginLeft:'2px'}}>
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
<AddPhotoAlternate className="■ text-white"/>
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

        <Grid xs={12}>
          <TextField  fullWidth
          name="name"
          label="Name"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.name}
          ></TextField>
        </Grid>

        <Grid xs={12}>
          <TextField fullWidth
          name="description"
          label="Description"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.description}
          />
        </Grid>

        <Grid xs={12} lg={6}>
          <TextField fullWidth
          name="price"
          label="Price"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.price}
          />
        </Grid>

        <Grid xs={12} lg={6}>


        <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Category</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={formik.values.category}
    label="Category"
    onChange={formik.handleChange}
    name="category"
  >{
    restaurent.categories.map((row)=>(
      <MenuItem value={row}>{row.name}</MenuItem>
    ))
  }
  </Select>
</FormControl>
        </Grid>

        <Grid xs={12}>
        <FormControl fullWidth>
        <InputLabel id="demo-multiple-chip-label">Ingredients</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          name="ingredients"
          multiple
          value={formik.values.ingredients}
          onChange={formik.handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Ingredients" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          // MenuProps={MenuProps}
        >
          {ingredients.ingredients.map((row) => (
            <MenuItem
              value={row.id}
            >
              {row.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
        </Grid>

        <Grid xs={12} lg={4}>
        <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Is Vegetrian</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={formik.values.vegetarian}
    label="Is Vegetarian"
    name="vegetarian"
    onChange={formik.handleChange}
  >
    <MenuItem value={true}>Yes</MenuItem>
    <MenuItem value={false}>No</MenuItem>
  </Select>
</FormControl>
        </Grid>

        <Grid xs={12} lg={4}>
        <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Is Seasonal</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={formik.values.seasonal}
    label="Is Seasonal"
    name="seasonal"
    onChange={formik.handleChange}
  >
    <MenuItem value={true}>Yes</MenuItem>
    <MenuItem value={false}>No</MenuItem>
  </Select>
</FormControl>
        </Grid>

      </Grid>

      <Button type='submit' variant='contained' color='primary'>
        Create Restaurent
      </Button>

</form>

        </div>

</div>
  </div>
  
  )
}

export default CreateMenuForm
