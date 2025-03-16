import { Padding } from '@mui/icons-material'
import { Button,TextField, Typography } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../State/Authentication/Action'
import NotificationSnackbar from '../../util/NotificationSnackBar'

const LoginForm = () => {

    const initialValues={
        email:"",
        password:""
    }

    const navigate=useNavigate();

    //it will come from redux
    const dispatch=useDispatch();

    const handleSubmit=(values)=>{
        //it will go to the Action.js loginUser() method with values i.e email and password
        dispatch(loginUser({userData:values,navigate}))
    }

  return (
    <div>

        <Typography variant='h5' className='text-center'>
            Login
        </Typography>

        <Formik onSubmit={handleSubmit} initialValues={initialValues}>
            <Form>

                {/* //it doesn't provide suggestion so write all attribute manually just you write in input tag of html */}
                <Field as={TextField} name="email" label="Email" fullWidth variant="outlined" margin="normal" />

                <Field as={TextField} name="password" label="Password" fullWidth variant="outlined" margin="normal" />

                <Button sx={{mt:2,padding:"1rem"}} type='submit' fullWidth variant='contained'>Login</Button>

                <Typography variant='body1' align='center' sx={{mt:3}}>Don't have an account?
                    <Button onClick={()=>navigate("/account/register")}>Register</Button>
                </Typography>

            </Form>

        </Formik>

    </div>
  )
}

export default LoginForm