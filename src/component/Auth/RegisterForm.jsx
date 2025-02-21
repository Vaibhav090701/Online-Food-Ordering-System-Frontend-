import React from 'react'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { registerUser } from '../State/Authentication/Action'


const RegisterForm = () => {

    const initialValues={
        fullName:"",
        email:"",
        password:"",
        role:""
    }

    const navigate=useNavigate();
    const dispatch=useDispatch();

    const handleSubmit=(values)=>{
        console.log("Form values", values);

        //same as loginForm
        dispatch(registerUser({userData:values,navigate}))
    }
  return (

    <div>
        <Typography variant='h5' className='text-center'>
            Register
        </Typography>

        <Formik onSubmit={handleSubmit} initialValues={initialValues}>
            <Form>

                {/* //it doesn't provide suggestion so write all attribute manually just you write in input tag of html */}

                <Field as={TextField} name="fullName" label="Full Name" fullWidth variant="outlined" margin="normal" />

                <Field as={TextField} name="email" label="Email" fullWidth variant="outlined" margin="normal" />

                <Field as={TextField} name="password" label="Password" fullWidth variant="outlined" margin="normal" type="password" />

                {/* //take it from material ui 'select' component and change select tag to field tag */}
                <FormControl fullWidth margin="normal">
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>

                    <Field
                        as={Select}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="role"
                        // value={age}
                        label="Role"
                        // onChange={handleChange}
                    >
                        <MenuItem value="ROLE_CUSTOMER">Customer</MenuItem>
                        <MenuItem value="ROLE_RESTAURANT_OWNER">Restaurant Owner</MenuItem>
                    </Field>
                </FormControl>

                <Button sx={{mt:2,padding:"1rem"}} type='submit' fullWidth variant='contained'>Register</Button>

                <Typography variant='body1' align='center' sx={{mt:3}}>already have an account.
                    <Button onClick={()=>navigate("/account/login")}>Login</Button>
                </Typography>

            </Form>

        </Formik>

    </div>
  )

}

export default RegisterForm