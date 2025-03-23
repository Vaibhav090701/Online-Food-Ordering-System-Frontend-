import { Button, Card, CardContent, CardHeader, Grid, Typography, Box, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateRestaurantInfo, updateRestaurentStatus} from '../../component/State/Restaurent/Action';

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
