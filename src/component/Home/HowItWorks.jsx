import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { ArrowForward } from '@mui/icons-material'; // Example icon

const HowItWorks = ({ process }) => {
  return (
    <section className="py-12 px-4">
      <Typography variant="h4" align="center" gutterBottom color="text.secondary">
        How It Works
      </Typography>

      <Grid container justifyContent="center" spacing={4}>
        {process.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <div className="text-center">
              <div className="text-4xl text-pink-600 font-bold mb-2">
                {index + 1}
              </div>
              {/* Image Section */}
              <div className="mb-4">
                <img
                  src={item.image}
                  alt={item.action}
                  className="max-w-full h-auto rounded-lg" // Adjust styling as needed
                  style={{maxWidth: '300px', maxHeight: '250px', margin: '0 auto'}}
                />
              </div>
              <Typography variant="h6" gutterBottom>
                {item.action}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
              {index < process.length - 1 && (
                <div className="flex justify-center mt-2">
                  <ArrowForward color="primary" />
                </div>
              )}
            </div>
          </Grid>
        ))}
      </Grid>
    </section>
  );
};

export default HowItWorks;