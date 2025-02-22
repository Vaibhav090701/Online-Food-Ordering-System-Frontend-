import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Discount, LocalOffer } from '@mui/icons-material'; // Example icons

const SpecialOffers = ({ specialOffers }) => {
  return (
    <section className="py-12 px-4">
      <Typography variant="h4" align="center" gutterBottom color="text.secondary">
        Special Offers
      </Typography>

      <Grid container justifyContent="center" spacing={4}>
        {specialOffers.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <div className="flex items-center mb-3">
                  {item.icon === 'discount' && <Discount color="primary" className="mr-2" />}
                  {item.icon === 'offer' && <LocalOffer color="primary" className="mr-2" />}
                  <Typography variant="h6" className="font-bold">
                    {item.description}
                  </Typography>
                </div>
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.description}
                    className="max-w-full h-auto mb-3 rounded-lg"
                    style={{maxWidth: '200px', maxHeight:'200px', margin: '0 auto'}}
                  />
                )}
                <Typography variant="body2" color="text.secondary">
                  {item.offer}
                </Typography>
                <div className="mt-4 text-center">
                  <Button variant="contained" color="primary">
                    Claim Offer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </section>
  );
};

export default SpecialOffers;