import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const CustomerTestimonials = ({ testimonials }) => {
  return (
    <section className="py-12 px-4">
      <Typography variant="h4" align="center" gutterBottom color="text.secondary">
        Customer Reviews
      </Typography>

      <Grid container justifyContent="center" spacing={4}>
        {testimonials.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <div className="flex items-center mb-3">
                  <Avatar alt={item.name} src={item.image} className="mr-3" />
                  <div>
                    <Typography variant="subtitle1" className="font-semibold text-pink-600">
                      {item.name}
                    </Typography>
                    <Rating name={`rating-${index}`} value={item.rating} readOnly size="small" />
                  </div>
                </div>
                <div style={{marginBottom: '10px'}}>
                  <FormatQuoteIcon color="primary" style={{ fontSize: 30 }}/>
                </div>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </section>
  );
};

export default CustomerTestimonials;