import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Box
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LocationAutocomplete from './LocationAutoComplete';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRestaurents } from '../State/Restaurent/Action';
import PopularRestaurants from './PopularRestaurants';
import ExploreByCuisine from './CuisineTypes';


// Styled components
const HeroSection = styled('div')({
  background: 'linear-gradient(45deg, #FF5722 30%, #FF9800 90%)',
  padding: '80px 0',
  color: 'white',
  textAlign: 'center',
});

const RestaurantCard = styled(Card)({
  maxWidth: 345,
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const fixedImageStyle = {
  height: 200,
  objectFit: 'cover',
};


const Home = () => {

  const navigate=useNavigate();
const dispatch=useDispatch();
const [restaurants, setRestaurants]=useState([]);

const jwt=localStorage.getItem("jwt")

const {auth, restaurent}=useSelector(store=>store);

useEffect(()=>{
  const fetchData = async () => {
    if (restaurent.allRestaurents.length > 0) {
      setRestaurants(restaurent.allRestaurents);
      console.log("Res", restaurent.allRestaurents);
    }
  };

  fetchData();

},[restaurent.allRestaurents])

const handleViewMenu=(item)=>{
  if(auth.jwt){
    navigate(`/restaurent/${item.address.city}/${item.name}/${item.id}`)
  }
  else{
    navigate("/account/login");
  }
}

const handleStartOrdering=()=>{
  if(auth.jwt){
    navigate(`/my-profile`)
  }
  else{
    navigate("/account/login");
  }
}


  return (
    <div>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            Order Food Online 
          </Typography>
          <Typography variant="h5" paragraph>
            Discover the best restaurants in your area
          </Typography>
          <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
           <LocationAutocomplete/>
          </Box>
        </Container>
      </HeroSection>


<PopularRestaurants/>

<ExploreByCuisine/>

      {/* Call to Action */}
      <Container maxWidth="lg" sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Hungry? Order Now!
        </Typography>
        <Typography variant="body1" paragraph>
          Get food from hundreds of restaurants delivered to your doorstep
        </Typography>
        <Button variant="contained" size="large" sx={{ mt: 2 }} onClick={handleStartOrdering}>
          Start Ordering
        </Button>
      </Container>
    </div>
  );
};

export default Home;
