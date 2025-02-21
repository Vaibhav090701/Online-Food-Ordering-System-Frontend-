import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';

const UserProfile = () => {

  const handleLogout=()=>{

  }
  return (
    <div className='min-h-[80vh] flex flex-col items-center justify-center text-center'>

      <div className='flex flex-col justify-center items-center'>
        <AccountCircleIcon sx={{fontSize:'10rem'}}/>
        <h1 className='font-semibold text-2xl'>Code With Vaibhav</h1>
        <p className='pt-5 pb-5'>Email: vaibhav@gmail.com</p>
        <Button onClick={handleLogout} variant='contained'>LOGOUT</Button>
      </div>

    </div>
  )
}

export default UserProfile