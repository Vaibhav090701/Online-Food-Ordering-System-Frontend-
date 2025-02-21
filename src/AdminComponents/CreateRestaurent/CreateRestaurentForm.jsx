import { AddPhotoAlternate } from '@mui/icons-material';
import { Button, CircularProgress, Grid, IconButton, TextField } from '@mui/material';
import { useFormik } from 'formik'
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react'
import { uploadImageToCloudinary } from '../util/UploadToCloudinary';
import { useDispatch } from 'react-redux';
import { createRestaurent } from '../../component/State/Restaurent/Action';

export const initialValues={
  name:"",
  description:"",
  cuisineType:"",
  streetAddress:"",
  city:"",
  postalCode:"",
  stateProvience:"",
  country:"",
  email:"",
  mobile:"",
  twitter:"",
  instagram:"",
  openingHours:"Mon-Sun : 9:00 AM - 12:00 PM",
  images:[],
}

const CreateRestaurentForm = () => {

  const [uploadImage, setUploadImage]=useState(false);

  const dispatch=useDispatch();
  const jwt=localStorage.getItem("jwt");

  const formik=useFormik({
    initialValues,
    onSubmit:(values)=>{
      const data={
        name:values.name,
        description:values.description,
        cuisineType:values.cuisineType,
        address:{
          streetAddress:values.streetAddress,
          city:values.city,
          stateProvience:values.stateProvience,
          postalCode:values.postalCode,
          country:values.country,
        },
        contactInformation:{
          email:values.email,
          mobile:values.mobile,
          twitter:values.twitter,
          instagram:values.instagram,
        },
      openingHours:values.openingHours,
      images:values.images,
      };
      console.log("form data",data);

      dispatch(createRestaurent({data, token:jwt}))

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
  return (
    <div>
      <div className='py-10 lg:flex items-center justify-center min-h-screen'>
        <div className='lg:max-w-4xl'>
        <h1 className='font-bold text-2x1 text-center py-2'>
      Add New Restaurant
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
          <TextField fullWidth
          id="name"
          label="Name"
          variednt="outined"
          onChange={formik.handleChange}
          value={formik.values.name}
          ></TextField>
        </Grid>

        <Grid xs={12}>
          <TextField fullWidth
          id="description"
          name="description"
          label="Description"
          variednt="outined"
          onChange={formik.handleChange}
          value={formik.values.description}
          />
        </Grid>

        <Grid xs={12} lg={6}>
          <TextField fullWidth
          id="cuisineType"
          name="cuisineType"
          label="Cuisine Type"
          variednt="outined"
          onChange={formik.handleChange}
          value={formik.values.cuisineType}
          />
        </Grid>

        <Grid xs={12} lg={6}>
          <TextField fullWidth
          id="openingHours"
          name="openingHours"
          label="Opening Hours"
          variednt="outined"
          onChange={formik.handleChange}
          value={formik.values.openingHours}
          />
        </Grid>


        <Grid xs={12}>
          <TextField fullWidth
          id="streetAddress"
          name="streetAddress"
          label="Street Address"
          variednt="outined"
          onChange={formik.handleChange}
          value={formik.values.streetAddress}
          />
        </Grid>

        <Grid xs={12} lg={4}>
          <TextField fullWidth
          id="city"
          name="city"
          label="City"
          variednt="outined"
          onChange={formik.handleChange}
          value={formik.values.city}
          />
        </Grid>

        <Grid xs={12} lg={4}>
          <TextField fullWidth
          id="stateProvience"
          name="stateProvience"
          label="State/Provience"
          variednt="outined"
          onChange={formik.handleChange}
          value={formik.values.stateProvience}
          />
        </Grid>

        <Grid xs={12} lg={4}>
          <TextField fullWidth
          id="postalCode"
          name="postalCode"
          label="Postal Code"
          variednt="outined"
          onChange={formik.handleChange}
          value={formik.values.postalCode}
          />
        </Grid>

        <Grid xs={12}>
          <TextField fullWidth
          id="country"
          name="country"
          label="Country"
          variednt="outined"
          onChange={formik.handleChange}
          value={formik.values.country}
          />
        </Grid>

        <Grid xs={12} lg={6}>
          <TextField fullWidth
          id="email"
          name="email"
          label="Email"
          variednt="outined"
          onChange={formik.handleChange}
          value={formik.values.email}
          />
        </Grid>

        <Grid xs={12} lg={6}>
          <TextField fullWidth
          id="mobile"
          name="mobile"
          label="Mobile"
          variednt="outined"
          onChange={formik.handleChange}
          value={formik.values.mobile}
          />
        </Grid>

        <Grid xs={12} lg={6}>
          <TextField fullWidth
          id="instagram"
          name="instagram"
          label="instagram"
          variednt="outined"
          onChange={formik.handleChange}
          value={formik.values.instagram}
          />
        </Grid>

        <Grid xs={12} lg={6}>
          <TextField fullWidth
          id="twitter"
          name="twitter"
          label="twitter"
          variednt="outined"
          onChange={formik.handleChange}
          value={formik.values.twitter}
          />
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

export default CreateRestaurentForm
