import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PopularRestaurants from './PopularRestaurants';
import ExploreByCuisine from './CuisineTypes';
import RotatingCardSection from './KeyboardButton';

// Styled components
const HeroSection = styled('div')(({ theme }) => ({
  background: 'linear-gradient(45deg, #FF5722 30%, #FF9800 90%)',
  padding: theme.spacing(10, 2),
  color: '#ffffff',
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' },
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(6, 2),
    textAlign: 'center',
  },
}));

const TextContainer = styled(Box)(({ theme }) => ({
  flex:1,
  maxWidth: { xs: '100%', md: '50%' },
  padding: theme.spacing(0, 2),
  marginLeft:'20px'
}));

const CubeContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  maxWidth: { xs: '100%', md: '50%' },
  display: 'flex',
  justifyContent: 'center'
}));

const AnimatedTypography = styled(motion(Typography))({});
const AnimatedButton = styled(motion(Button))({});


const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [restaurants, setRestaurants] = useState([]);
  const { auth, restaurant } = useSelector((store) => store);

  const handleStartOrdering = () => {
    if (auth.user) {
      navigate('/my-profile');
    } else {
      navigate('/account/login');
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <HeroSection>
        <TextContainer>
                    <AnimatedTypography
            variant="h2"
            fontWeight="bold"
            gutterBottom
            sx={{ fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            Crave It, Order It!
          </AnimatedTypography>

                   <AnimatedTypography
            variant="h5"
            paragraph
            sx={{ fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' }, color: '#f5f5f5' }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          >
            Savor top dishes from local restaurants, delivered fast!
          </AnimatedTypography>
          <AnimatedButton
            variant="contained"
            size="large"
            onClick={handleStartOrdering}
            aria-label="Start ordering food"
            sx={{
              mt: 2,
              bgcolor: '#ffffff',
              color: '#FF5722',
              fontWeight: 'bold',
              padding: { xs: '8px 16px', sm: '10px 24px' },
              fontSize: { xs: '0.875rem', sm: '1rem' },
              '&:hover': {
                bgcolor: '#f5f5f5',
                transform: 'scale(1.05)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              },
            }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          >
            Start Ordering
          </AnimatedButton>

        </TextContainer>
        <CubeContainer>
          <RotatingCardSection />
        </CubeContainer>
      </HeroSection>

      <PopularRestaurants />
      <ExploreByCuisine />

      {/* Call to Action */}
      <Container maxWidth="lg" sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
          Hungry? Order Now!
        </Typography>
        <Typography variant="body1" paragraph sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
          Get food from hundreds of restaurants delivered to your doorstep
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={handleStartOrdering}
          sx={{ mt: 2, bgcolor: '#FF5722', '&:hover': { bgcolor: '#f97316' } }}
        >
          Start Ordering
        </Button>
      </Container>
    </div>
  );
};

export default Home;