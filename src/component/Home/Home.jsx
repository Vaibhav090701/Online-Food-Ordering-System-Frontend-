import React from 'react';
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

const Home = () => {
  // Sample restaurant data
  const restaurants = [
    {
      id: 1,
      name: "Pizza Palace",
      cuisine: "Italian",
      rating: "4.5",
      deliveryTime: "25-35 min",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a680?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 2,
      name: "Sushi Haven",
      cuisine: "Japanese",
      rating: "4.8",
      deliveryTime: "30-40 min",
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 3,
      name: "Burger Bonanza",
      cuisine: "American",
      rating: "4.3",
      deliveryTime: "20-30 min",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            Order Food Online
          </Typography>
          <Typography variant="h5" paragraph>
            Discover the best restaurants in your area
          </Typography>
          <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
            <Button 
              variant="contained" 
              size="large" 
              fullWidth
              sx={{ 
                backgroundColor: 'white',
                color: '#FF5722',
                '&:hover': {
                  backgroundColor: '#f5f5f5'
                }
              }}
            >
              Enter Your Location
            </Button>
          </Box>
        </Container>
      </HeroSection>

      {/* Featured Restaurants Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography 
          variant="h3" 
          align="center" 
          gutterBottom 
          sx={{ mb: 6, fontWeight: 'bold' }}
        >
          Popular Restaurants
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {restaurants.map((restaurant) => (
            <Grid item xs={12} sm={6} md={4} key={restaurant.id}>
              <RestaurantCard>
                <CardMedia
                  component="img"
                  height="200"
                  image={restaurant.image}
                  alt={restaurant.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {restaurant.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {restaurant.cuisine}
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body2" component="span" sx={{ mr: 2 }}>
                      ⭐ {restaurant.rating}
                    </Typography>
                    <Typography variant="body2" component="span">
                      • {restaurant.deliveryTime}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                  <Button size="small" variant="contained" color="primary">
                    View Menu
                  </Button>
                </CardActions>
              </RestaurantCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Categories Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography 
          variant="h3" 
          align="center" 
          gutterBottom 
          sx={{ mb: 6, fontWeight: 'bold' }}
        >
          Explore by Cuisine
        </Typography>
        <Grid container spacing={3}>
          {[
            { name: 'Italian', image: 'https://images.unsplash.com/photo-1533777324892-5d3e93079022?auto=format&fit=crop&w=200&q=80' },
            { name: 'Chinese', image: 'https://images.unsplash.com/photo-1585032226651-2f3c16f236ab?auto=format&fit=crop&w=200&q=80' },
            { name: 'Indian', image: 'https://images.unsplash.com/photo-1606494262668-4c3d9e5e0e76?auto=format&fit=crop&w=200&q=80' },
          ].map((category) => (
            <Grid item xs={12} sm={4} key={category.name}>
              <Card sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="150"
                  image={category.image}
                  alt={category.name}
                />
                <Typography 
                  variant="h6" 
                  sx={{ 
                    position: 'absolute', 
                    bottom: 10, 
                    left: 10, 
                    color: 'white', 
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    padding: '4px 8px',
                    borderRadius: '4px'
                  }}
                >
                  {category.name}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action */}
      <Container maxWidth="lg" sx={{ py: 6, textAlign: 'center', backgroundColor: '#f5f5f5' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Hungry? Order Now!
        </Typography>
        <Typography variant="body1" paragraph>
          Get food from hundreds of restaurants delivered to your doorstep
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          size="large"
          sx={{ mt: 2 }}
        >
          Start Ordering
        </Button>
      </Container>
    </div>
  );
};

export default Home;