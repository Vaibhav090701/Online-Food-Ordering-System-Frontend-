import { Box, Button, Fade, Grid, TextField, Typography } from '@mui/material';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import React from 'react';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  streetAddress: Yup.string()
    .min(5, 'Street address must be at least 5 characters')
    .required('Street address is required'),
  city: Yup.string()
    .min(2, 'City must be at least 2 characters')
    .required('City is required'),
  state: Yup.string()
    .min(2, 'State must be at least 2 characters')
    .required('State is required'),
  zipCode: Yup.string()
    .matches(/^\d{6}$/, 'Zip code must be exactly 6 digits')
    .required('Zip code is required'),
  landmark: Yup.string(),
});

const initialValues = {
  streetAddress: '',
  city: '',
  state: '',
  zipCode: '',
  landmark: '',
  isDefault: true,
};

const AddressFormModal = ({ open, onClose, onSubmit }) => {
  return (
    <Fade in={open}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: 360 },
          bgcolor: 'rgba(31, 41, 55, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid #d4a017',
          borderRadius: '12px',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)',
          p: 3,
          outline: 'none',
          '& .MuiInputLabel-root': { color: '#9ca3af', fontSize: '0.85rem' },
          '& .MuiInputBase-input': { color: '#ffffff', fontSize: '0.9rem' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#f97316' },
            '&:hover fieldset': { borderColor: '#ea580c' },
            '&.Mui-focused fieldset': { borderColor: '#d4a017' },
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: '#ffffff',
            fontWeight: 'bold',
            mb: 2,
            textAlign: 'center',
            fontSize: { xs: '1rem', sm: '1.125rem' },
          }}
        >
          Add New Address
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onSubmit({
              streetAddress: values.streetAddress,
              city: values.city,
              state: values.state,
              zipCode: values.zipCode,
              landmark: values.landmark,
              isDefault: true,
            });
            onClose();
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Grid container spacing={1.5}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="streetAddress"
                    label="Street Address"
                    fullWidth
                    variant="outlined"
                    error={touched.streetAddress && !!errors.streetAddress}
                    helperText={<ErrorMessage name="streetAddress" component="div" style={{ color: '#ef4444', fontSize: '0.75rem' }} />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="state"
                    label="State"
                    fullWidth
                    variant="outlined"
                    error={touched.state && !!errors.state}
                    helperText={<ErrorMessage name="state" component="div" style={{ color: '#ef4444', fontSize: '0.75rem' }} />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="city"
                    label="City"
                    fullWidth
                    variant="outlined"
                    error={touched.city && !!errors.city}
                    helperText={<ErrorMessage name="city" component="div" style={{ color: '#ef4444', fontSize: '0.75rem' }} />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="zipCode"
                    label="Zip Code"
                    fullWidth
                    variant="outlined"
                    error={touched.zipCode && !!errors.zipCode}
                    helperText={<ErrorMessage name="zipCode" component="div" style={{ color: '#ef4444', fontSize: '0.75rem' }} />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="landmark"
                    label="Landmark (Optional)"
                    fullWidth
                    variant="outlined"
                    error={touched.landmark && !!errors.landmark}
                    helperText={<ErrorMessage name="landmark" component="div" style={{ color: '#ef4444', fontSize: '0.75rem' }} />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    sx={{
                      bgcolor: '#f97316',
                      color: '#ffffff',
                      borderRadius: '8px',
                      textTransform: 'none',
                      py: 1,
                      fontSize: { xs: '0.8rem', sm: '0.9rem' },
                      '&:hover': { bgcolor: '#ea580c' },
                    }}
                  >
                    Save Address
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={onClose}
                    sx={{
                      borderColor: '#f97316',
                      color: '#f97316',
                      borderRadius: '8px',
                      textTransform: 'none',
                      py: 1,
                      fontSize: { xs: '0.8rem', sm: '0.9rem' },
                      '&:hover': { borderColor: '#ea580c', bgcolor: 'rgba(249, 115, 22, 0.1)' },
                    }}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Fade>
  );
};

export default AddressFormModal;