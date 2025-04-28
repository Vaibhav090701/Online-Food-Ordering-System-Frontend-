import React from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../State/Authentication/Action';

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .required('Full name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  role: Yup.string().required('Please select a role'),
});

const RegisterForm = () => {
  const initialValues = {
    username: '',
    email: '',
    password: '',
    role: '',
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(registerUser({ userData: values, navigate }));
  };

  return (
    <div>
      <Typography variant="h5" className="text-center">
        Register
      </Typography>

      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        <Form>
          <Field name="username">
            {({ field, meta }) => (
              <TextField
                {...field}
                label="Full Name"
                fullWidth
                variant="outlined"
                margin="normal"
                error={meta.touched && !!meta.error}
                helperText={meta.touched && meta.error}
              />
            )}
          </Field>

          <Field name="email">
            {({ field, meta }) => (
              <TextField
                {...field}
                label="Email"
                fullWidth
                variant="outlined"
                margin="normal"
                error={meta.touched && !!meta.error}
                helperText={meta.touched && meta.error}
              />
            )}
          </Field>

          <Field name="password">
            {({ field, meta }) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
                margin="normal"
                error={meta.touched && !!meta.error}
                helperText={meta.touched && meta.error}
              />
            )}
          </Field>

          <Field name="role">
            {({ field, meta }) => (
              <FormControl fullWidth margin="normal" error={meta.touched && !!meta.error}>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  {...field}
                  labelId="role-label"
                  id="role"
                  label="Role"
                  MenuProps={{
                    PaperProps: {
                      sx: { backgroundColor: '#000' },
                    },
                  }}
                >
                  <MenuItem value="ROLE_CUSTOMER">Customer</MenuItem>
                  <MenuItem value="ROLE_ADMIN">Restaurant Owner</MenuItem>
                </Select>
                {meta.touched && meta.error && (
                  <Typography variant="caption" color="error">
                    {meta.error}
                  </Typography>
                )}
              </FormControl>
            )}
          </Field>

          <Button sx={{ mt: 2, padding: '1rem' }} type="submit" fullWidth variant="contained">
            Register
          </Button>

          <Typography variant="body1" align="center" sx={{ mt: 3 }}>
            Already have an account?
            <Button onClick={() => navigate('/account/login')}>Login</Button>
          </Typography>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterForm;
