import { Button, Card, CardContent, CardHeader, Grid, Typography, Box, TextField, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress, IconButton } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateRestaurantInfo, updateRestaurentStatus} from '../../component/State/Restaurent/Action';
import { uploadImageToCloudinary } from '../util/UploadToCloudinary';
import { AddPhotoAlternate} from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';


const RestaurentDetails = () => {
  const { restaurent } = useSelector(store => store);
  const dispatch = useDispatch();

  const [openEditForm, setOpenEditForm] = useState(false); // To control the form visibility
  const [updatedInfo, setUpdatedInfo] = useState({
    name: restaurent.userRestaurent?.name || '',
    address: restaurent.userRestaurent?.address || '',
    phone: restaurent.userRestaurent?.phone || '',
    email: restaurent.userRestaurent?.email || '',
    twitter: restaurent.userRestaurent?.twitter || '',
    instagram: restaurent.userRestaurent?.instagram || '',
    description: restaurent.userRestaurent?.description || '',
    images:restaurent.userRestaurent?.images || [],
  });

  const handleRestaurentStatus = () => {
    dispatch(updateRestaurentStatus({
      restaurentId: restaurent.userRestaurent.id,
      jwt: localStorage.getItem("jwt")
    }));
  };

  const handleEditClick = () => {
    setOpenEditForm(true); // Open the edit form
  };

  const handleCloseEditForm = () => {
    setOpenEditForm(false); // Close the edit form without saving
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedInfo(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    dispatch(updateRestaurantInfo({
      restaurentId: restaurent.userRestaurent.id,
      jwt: localStorage.getItem("jwt"),
      updatedInfo
    }));
    setOpenEditForm(false); // Close the form after updating
  };

    const [uploadImage, setUploadImage]=useState(false);
  

  const handleImageChange=async(e)=>{
      const file=e.target.files[0];
      setUploadImage(true);
      const image=await uploadImageToCloudinary(file);
      console.log("image-", image);
      
      // formik.setFieldValue("images",[...formik.values.images, image]);

            // Add the uploaded image to the updatedInfo state
            setUpdatedInfo((prevState) => ({
              ...prevState,
              images: [...prevState.images, image],
            }));
      
      setUploadImage(false);
    };

    const handleRemoveImage=(index)=>{

      const newImages = updatedInfo.images.filter((_, idx) => idx !== index);
    setUpdatedInfo((prevState) => ({
      ...prevState,
      images: newImages,
    }));
  
    }
  

  return (
    <div className="min-h-screen overflow-y-auto bg-black text-white px-6 py-8">
      {/* Title and Status Button */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <Typography variant="h3" className="font-bold text-center text-white mb-6 md:mb-0">
          {restaurent.userRestaurent?.name}
        </Typography>
        <div>
          <Button
            variant="contained"
            color={!restaurent.userRestaurent?.status ? "primary" : "error"}
            size="large"
            className="text-lg py-2 px-6"
            onClick={handleRestaurentStatus}
          >
            {restaurent.userRestaurent?.status ? "Close" : "Open"}
          </Button>

          <Button
            variant="contained"
            color={'primary'}
            size="large"
            className="text-lg py-2 px-6"
            onClick={handleEditClick} // Open edit form on click
          >
            Edit Info
          </Button>
        </div>
      </div>

      {/* Main Content Section */}
      <Grid container spacing={4} className="mt-6">
        {/* Restaurant Information Section */}
        <Grid item xs={12} md={6}>
          <Card sx={{ bgcolor: '#1c1c1c', color: 'white', borderRadius: '8px' }}>
            <CardHeader title={<Typography variant="h6" color="white">Restaurant Information</Typography>} sx={{ backgroundColor: '#333' }} />
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Typography variant="body1" color="textSecondary">Owner:</Typography>
                  <Typography variant="body1">{restaurent.userRestaurent.name}</Typography>
                </div>

                <div className="flex justify-between">
                  <Typography variant="body1" color="textSecondary">Status:</Typography>
                  <Typography variant="body1">
                    {restaurent.userRestaurent?.status ? (
                      <Box component="span" sx={{ backgroundColor: '#4CAF50', color: '#fff', borderRadius: '20px', padding: '0.5rem' }}>
                        Open
                      </Box>
                    ) : (
                      <Box component="span" sx={{ backgroundColor: '#F44336', color: '#fff', borderRadius: '20px', padding: '0.5rem' }}>
                        Closed
                      </Box>
                    )}
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>

        {/* Address Section */}
        <Grid item xs={12} md={6}>
          <Card sx={{ bgcolor: '#1c1c1c', color: 'white', borderRadius: '8px' }}>
            <CardHeader title={<Typography variant="h6" color="white">Address</Typography>} sx={{ backgroundColor: '#333' }} />
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Typography variant="body1" color="textSecondary">Street Address:</Typography>
                  <Typography variant="body1">{restaurent.userRestaurent.address}</Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>

        {/* Contact Information Section */}
        <Grid item xs={12} md={6}>
          <Card sx={{ bgcolor: '#1c1c1c', color: 'white', borderRadius: '8px' }}>
            <CardHeader title={<Typography variant="h6" color="white">Contact Information</Typography>} sx={{ backgroundColor: '#333' }} />
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Typography variant="body1" color="textSecondary">Mobile:</Typography>
                  <Typography variant="body1">{restaurent.userRestaurent.phone}</Typography>
                </div>

                <div className="flex justify-between">
                  <Typography variant="body1" color="textSecondary">Email:</Typography>
                  <Typography variant="body1">{restaurent.userRestaurent.email}</Typography>
                </div>

                <div className="flex justify-between">
                  <Typography variant="body1" color="textSecondary">Instagram:</Typography>
                  <Typography variant="body1">{restaurent.userRestaurent.instagram}</Typography>
                </div>

                <div className="flex justify-between">
                  <Typography variant="body1" color="textSecondary">Twitter:</Typography>
                  <Typography variant="body1">{restaurent.userRestaurent.twitter}</Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Edit Restaurant Form Dialog */}
      <Dialog open={openEditForm} onClose={handleCloseEditForm}>
        <DialogTitle>Edit Restaurant Information</DialogTitle>
        <DialogContent>

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

               {/* Display previously uploaded images */}
        <div className="flex flex-wrap gap-2">
          {updatedInfo.images.map((image, index) => (
            <div className="relative" key={index}>
              <img className="w-24 h-24 object-cover" src={image} alt={`uploaded-${index}`} />
              <IconButton
                size="small"
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  outline: 'none',
                }}
                onClick={() => handleRemoveImage(index)}
              >
                <CloseIcon sx={{ fontSize: '1rem' }} />
              </IconButton>
            </div>
             ))}
          </div>

                  </Grid>
                  </Grid>
          
          <TextField
            label="Restaurant Name"
            variant="outlined"
            fullWidth
            margin="normal"
            name="name"
            value={updatedInfo.name}
            onChange={handleInputChange}
          />
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            margin="normal"
            name="address"
            value={updatedInfo.address}
            onChange={handleInputChange}
          />
          <TextField
            label="Phone"
            variant="outlined"
            fullWidth
            margin="normal"
            name="phone"
            value={updatedInfo.phone}
            onChange={handleInputChange}
          />
            <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            value={updatedInfo.email}
            onChange={handleInputChange}
          />
            <TextField
            label="Twitter"
            variant="outlined"
            fullWidth
            margin="normal"
            name="twitter"
            value={updatedInfo.twitter}
            onChange={handleInputChange}
          />
            <TextField
            label="Instagram"
            variant="outlined"
            fullWidth
            margin="normal"
            name="instagram"
            value={updatedInfo.instagram}
            onChange={handleInputChange}
          />
            <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            name="description"
            value={updatedInfo.description}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditForm} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RestaurentDetails;
