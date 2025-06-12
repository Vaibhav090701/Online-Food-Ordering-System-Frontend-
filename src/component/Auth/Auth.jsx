import { Box, Modal } from '@mui/material'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import { style } from '../../util/constants';

const Auth = () => {

    //useLocation hook is use to fetch the url data
    const location=useLocation();
    const navigate=useNavigate();
    const handleonClose=()=>{
        navigate("/")
    }
  return (
    <div>
        <Modal onClose={handleonClose} open={
            location.pathname==="/account/register" || location.pathname==="/account/login"
        } >
            <Box sx={style}>
                {location.pathname==="/account/register"?<RegisterForm/>:<LoginForm/>}
            </Box>
        </Modal>
    </div>
  )
}

export default Auth