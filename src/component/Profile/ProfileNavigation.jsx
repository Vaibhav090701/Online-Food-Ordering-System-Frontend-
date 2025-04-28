import React from 'react'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import { Divider, Drawer, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../State/Authentication/Action';

const ProfileNavigation = ({ handleClose, isOpen }) => {

        const isSmallScreen = useMediaQuery("(max-width:1080px)");


    const menu=[
        {title:"Orders", icon:<ShoppingBagIcon/>},
        {title:"Favourites", icon:<FavoriteIcon/>},
        {title:"Address", icon:<HomeIcon/>},
        // {title:"Payment", icon:<AccountBalanceWalletIcon/>},
        {title:"Notification", icon:<NotificationsActiveIcon/>},
        {title:"Event", icon:<EventIcon/>},
        {title:"Logout", icon:<LogoutIcon/>}
    ]


    const navigate=useNavigate();
    const dispatch=useDispatch();  

    const handleNavigate=(item)=>{
        if(item.title==="Logout")
            {
                dispatch(logout());
                navigate('/');
            }
            else{
        navigate(`/my-profile/${item.title.toLowerCase()}`)
            }
    }



  return (
    <div>
        <Drawer
            anchor='left'
            sx={{ zIndex: 1 }}
            open={isOpen}
            onClose={handleClose}
            variant={isSmallScreen ? "temporary" : "permanent"}
        >
        
        <div className='w-[70vw] lg:w-[21.5vw] h-screen flex flex-col justify-center text-xl space-y-[1.5rem] bg-black mt-5'>
        {
                    menu.map((item,i)=><>
                    <React.Fragment key={i}>
                        <div onClick={()=>handleNavigate(item)} className='px-5 pt-5 py-2 flex items-center gap-5 cursor-pointer'>                      
                        {item.icon}
                        <span>{item.title}</span>
                        </div>
                        {i!==menu.length-1 && <Divider/>}
                    </React.Fragment>
                   </>)
                }

            </div>

        </Drawer>
    </div>
  )
}

export default ProfileNavigation