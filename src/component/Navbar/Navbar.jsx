import { Avatar, Badge, Box, IconButton } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { blue, pink } from '@mui/material/colors';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Navbar.css'
import { Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { store } from '../State/Store';
import NotificationSnackbar from '../../util/NotificationSnackBar';

const Navbar = () => {

    const navigate=useNavigate();
    //assess the redux store and user data here
    const {auth,cart}=useSelector(store=>store);

    const handleAvatarClick=()=>{
        if(auth.user.role==="ROLE_CUSTOMER")
            {
                navigate("/my-profile")
            }
            else{
                navigate("/admin/restaurents")
            }

    }
  return (
    <Box className='px-5 sticky top-0 z-50 py-[.8rem] lg:px-20 flex justify-between border-transparent' sx={{  background: 'linear-gradient(45deg, #FF5722 30%, #FF9800 90%)',
    }}>

            <div className='lg:mr10 cursor-pointer flex items-center space-x-4'>
                <li onClick={()=>navigate("/")} className='logo font-semibold text-gray-300 text-xl cursor-pointer'>
                    foodiee
                </li>
            </div>

            <NotificationSnackbar/>


            <div className='flex items-center space-x-2 lg:space-x-10'>
                <div className=''>
                    <IconButton >
                        <SearchIcon sx={{fontSize:"1.5rem"}}></SearchIcon>
                    </IconButton>
                </div>

                <div>
                   {auth.user ? (<Avatar sx={{bgcolor:"white",color:pink.A400}} onClick={handleAvatarClick}>{auth.user?.name[0].toUpperCase()}</Avatar>):

                   <IconButton onClick={()=>navigate("/account/login")}>
                    <Person/>
                    </IconButton>}
                </div>

                <div className=''>
                    <IconButton onClick={()=>navigate('/cart')} >
                        <Badge color='secondary' badgeContent={cart.cartItems.length}>
                        <ShoppingCartIcon sx={{fontSize:"1.5rem"}} ></ShoppingCartIcon>
                        </Badge>

                    </IconButton>
                </div>
            </div>

    </Box>
    
  )
}

export default Navbar