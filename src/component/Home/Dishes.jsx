import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const Dishes = ({ dishes }) => {
  return (
    <section className="py-12 lg:py-16">
      <div className="text-center mb-12">
        <Typography variant="h4" component="h2" gutterBottom>
          Popular Dishes
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Delicious meals prepared with love
        </Typography>
      </div>

      <Grid container spacing={3} justifyContent="center" sx={{ width: '100%', marginLeft:'10px' }}>
        {dishes.map((dish, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="140"
                image={dish.image}
                alt={dish.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div">
                  {dish.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {dish.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained" color="primary">
                  Order Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </section>
  );
};

export default Dishes;