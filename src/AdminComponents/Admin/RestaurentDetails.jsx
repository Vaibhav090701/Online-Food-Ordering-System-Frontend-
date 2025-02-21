import { Button, Card, CardContent, CardHeader, Grid, Typography, Box } from '@mui/material';
import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useDispatch, useSelector } from 'react-redux';
import { updateRestaurentStatus } from '../../component/State/Restaurent/Action';

const RestaurentDetails = () => {
  const { restaurent } = useSelector(store => store);
  const dispatch = useDispatch();

  const handleRestaurentStatus = () => {
    dispatch(updateRestaurentStatus({
      restaurentId: restaurent.userRestaurent.id,
      jwt: localStorage.getItem("jwt")
    }));
  };

  return (
    <div className="min-h-screen overflow-y-auto bg-black text-white px-6 py-8">
      {/* Title and Status Button */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <Typography variant="h3" className="font-bold text-center text-white mb-6 md:mb-0">
          {restaurent.userRestaurent?.name}
        </Typography>

        <Button
          variant="contained"
          color={!restaurent.userRestaurent?.open ? "primary" : "error"}
          size="large"
          className="text-lg py-2 px-6"
          onClick={handleRestaurentStatus}
        >
          {restaurent.userRestaurent?.open ? "Close" : "Open"}
        </Button>
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
                  <Typography variant="body1">{restaurent.userRestaurent?.user.fullName}</Typography>
                </div>

                <div className="flex justify-between">
                  <Typography variant="body1" color="textSecondary">Cuisine Type:</Typography>
                  <Typography variant="body1">{restaurent.userRestaurent?.cuisineType}</Typography>
                </div>

                <div className="flex justify-between">
                  <Typography variant="body1" color="textSecondary">Opening Hours:</Typography>
                  <Typography variant="body1">{restaurent.userRestaurent?.openingHours}</Typography>
                </div>

                <div className="flex justify-between">
                  <Typography variant="body1" color="textSecondary">Status:</Typography>
                  <Typography variant="body1">
                    {restaurent.userRestaurent?.open ? (
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
                  <Typography variant="body1" color="textSecondary">Country:</Typography>
                  <Typography variant="body1">{restaurent.userRestaurent.address?.country}</Typography>
                </div>

                <div className="flex justify-between">
                  <Typography variant="body1" color="textSecondary">City:</Typography>
                  <Typography variant="body1">{restaurent.userRestaurent.address?.city}</Typography>
                </div>

                <div className="flex justify-between">
                  <Typography variant="body1" color="textSecondary">Postal Code:</Typography>
                  <Typography variant="body1">{restaurent.userRestaurent.address?.postalCode}</Typography>
                </div>

                <div className="flex justify-between">
                  <Typography variant="body1" color="textSecondary">Street Address:</Typography>
                  <Typography variant="body1">{restaurent.userRestaurent.address?.streetAddress}</Typography>
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
                  <Typography variant="body1" color="textSecondary">Email:</Typography>
                  <Typography variant="body1">{restaurent.userRestaurent.contactInformation?.email}</Typography>
                </div>

                <div className="flex justify-between">
                  <Typography variant="body1" color="textSecondary">Mobile:</Typography>
                  <Typography variant="body1">{restaurent.userRestaurent.contactInformation?.mobile}</Typography>
                </div>

                <div className="flex justify-between items-center">
                  <Typography variant="body1" color="textSecondary">Social:</Typography>
                  <div className="flex gap-3">
                    <a href={`https://instagram.com/${restaurent.userRestaurent.contactInformation?.instagram}`} target="_blank" rel="noopener noreferrer">
                      <InstagramIcon sx={{ fontSize: '2rem', color: 'white' }} />
                    </a>

                    <a href={`https://twitter.com/${restaurent.userRestaurent.contactInformation?.twitter}`} target="_blank" rel="noopener noreferrer">
                      <TwitterIcon sx={{ fontSize: '2rem', color: 'white' }} />
                    </a>

                    <a href="/" target="_blank" rel="noopener noreferrer">
                      <LinkedInIcon sx={{ fontSize: '2rem', color: 'white' }} />
                    </a>

                    <a href="/" target="_blank" rel="noopener noreferrer">
                      <FacebookIcon sx={{ fontSize: '2rem', color: 'white' }} />
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default RestaurentDetails;
