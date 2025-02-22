import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { Facebook, Twitter, Instagram, Email } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'gray.200', py: 6 }}>
      <Grid container justifyContent="center" spacing={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            About Us
          </Typography>
          <Typography variant="body2" color="text.secondary">
            We are dedicated to delivering delicious meals to your doorstep. Our mission is to provide quality food with excellent service.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Quick Links
          </Typography>
          <Box>
            <Link href="/menu" color="inherit" underline="hover">
              Menu
            </Link>
          </Box>
          <Box>
            <Link href="/offers" color="inherit" underline="hover">
              Special Offers
            </Link>
          </Box>
          <Box>
            <Link href="/contact" color="inherit" underline="hover">
              Contact Us
            </Link>
          </Box>
          <Box>
            <Link href="/privacy" color="inherit" underline="hover">
              Privacy Policy
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Contact Info
          </Typography>
          <Typography variant="body2" color="text.secondary">
            123 Main Street, City, Country
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Phone: +1 123-456-7890
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Email: info@fooddelivery.com
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Follow Us
          </Typography>
          <Box>
            <Link href="#" color="inherit" underline="hover" sx={{ mr: 2 }}>
              <Facebook />
            </Link>
            <Link href="#" color="inherit" underline="hover" sx={{ mr: 2 }}>
              <Twitter />
            </Link>
            <Link href="#" color="inherit" underline="hover" sx={{ mr: 2 }}>
              <Instagram />
            </Link>
            <Link href="mailto:info@fooddelivery.com" color="inherit" underline="hover">
              <Email />
            </Link>
          </Box>
        </Grid>
      </Grid>
      <Box mt={4} textAlign="center">
        <Typography variant="body2" color="text.secondary">
          &copy; {new Date().getFullYear()} Food Delivery. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;