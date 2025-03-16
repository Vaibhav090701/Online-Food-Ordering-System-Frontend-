import React, { useState } from 'react'
import ProfileNavigation from './ProfileNavigation'
import { Route, Routes } from 'react-router-dom'
import Orders from './Orders'
import UserProfile from './UserProfile'
import Address from './Address'
import Payment from './Payment'
import Notification from './Notification'
import Event from './Event'
import Logout from './Logout'
import Favourites from './Favourites'

import { IconButton, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';


const Profile = () => {

    const isSmallScreen = useMediaQuery("(max-width:1080px)");
    const [isSidebarOpen, setIsSidebarOpen] = useState(!isSmallScreen);


    const openSideBar=()=>{
        
    }

    const handleClose = () => {
        setIsSidebarOpen(false);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };


  return (
        <div className='flex'>

            <ProfileNavigation handleClose={handleClose} isOpen={isSidebarOpen}/>

        <div
                className='flex-1 transition-all duration-300'
                style={{
                    marginLeft: isSmallScreen ? 0 : isSidebarOpen ? '20vw' : 0,
                }}
            >
                {/* Toggle Button for Small Screens */}
                {isSmallScreen && (
                    <IconButton onClick={toggleSidebar} sx={{ position: 'fixed', top: 10, left: 10, zIndex: 1200 }}>
                        <MenuIcon />
                    </IconButton>
                )}

            <div className='p-4'>

            {/* //this routing is only for its particular functionality, after my-profile these following urls will active */}            
            <Routes>
                <Route path='/' element={<UserProfile/>}></Route>
                <Route path='/orders' element={<Orders/>}></Route>
                <Route path='/favourites' element={<Favourites/>}></Route>
                <Route path='/address' element={<Address/>}></Route>
                <Route path='/payment' element={<Payment/>}></Route>
                <Route path='/noification' element={<Notification/>}></Route>
                <Route path='/event' element={<Event/>}></Route>
                {/* <Route path='/logout' element={<Logout/>}></Route> */}
            </Routes>

        </div>
        </div>
        </div>

  )
}

export default Profile