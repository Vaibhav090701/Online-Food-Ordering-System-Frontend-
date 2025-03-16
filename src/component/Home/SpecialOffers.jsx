import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Discount, LocalOffer } from '@mui/icons-material'; // Example icons
import { motion } from 'framer-motion'


const SpecialOffers = ({ specialOffers }) => {

  const specialOffer = [
    { id: 1, title: '50% Off on First Order', code: 'FIRST50' },
    { id: 2, title: 'Free Delivery on Orders Above $20', code: 'FREESHIP' },
    { id: 3, title: 'Buy 1 Get 1 Free', code: 'BOGO' }
  ]

  return (
    <section className="py-12 px-4">
      <Typography variant="h4" align="center" gutterBottom color="text.secondary">
        Special Offers
      </Typography>

      <div className="section-container">
          <h2 className="section-title">Special Offers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {specialOffer.map((offer) => (
              <motion.div
                key={offer.id}
                className="card p-6 text-center bg-gradient-to-r from-primary to-blue-500 text-white"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-xl font-semibold mb-2">{offer.title}</h3>
                <p className="text-sm">Use code: <strong>{offer.code}</strong></p>
              </motion.div>
            ))}
          </div>
        </div>
    </section>
  );
};

export default SpecialOffers;