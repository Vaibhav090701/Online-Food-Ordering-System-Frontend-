import { Dashboard } from '@mui/icons-material';
import ShoppingBag from '@mui/icons-material/ShoppingBag';
import ShopTwoIcon from '@mui/icons-material/ShopTwo';
import CategoryIcon from '@mui/icons-material/Category';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import EventIcon from '@mui/icons-material/Event';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import React from 'react';
import { Divider, Drawer, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../component/State/Authentication/Action';

const menu = [
    { title: "Dashboard", icon: <Dashboard />, path: "/" },
    { title: "Orders", icon: <ShoppingBag />, path: "/orders" },
    { title: "Menu", icon: <ShopTwoIcon />, path: "/menu" },
    { title: "Ingredients", icon: <FastfoodIcon />, path: "/ingredients" },
    { title: "Events", icon: <EventIcon />, path: "/events" },
    { title: "Details", icon: <AdminPanelSettingsIcon />, path: "/details" },
    { title: "Logout", icon: <LogoutIcon />, path: "/" },
];

const AdminSideBar = ({ handleClose, isOpen }) => {
    const isSmallScreen = useMediaQuery("(max-width:1080px)");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleNavigate = (item) => {
        navigate(`/admin/restaurents${item.path}`);
        if (item.title === "Logout") {
            navigate("/");
            dispatch(logout());
            handleClose();
        }
    };

    return (
        <Drawer
            anchor='left'
            sx={{ zIndex: 1 }}
            open={isOpen}
            onClose={handleClose}
            variant={isSmallScreen ? "temporary" : "permanent"}
        >
            <div className='w-[70vw] lg:w-[21.5vw] h-screen flex flex-col justify-center text-xl space-y-[1.5rem] bg-black'>
                {menu.map((item, i) => (
                    <React.Fragment key={i}>
                        <div onClick={() => handleNavigate(item)} className='px-5 pt-5 flex items-center gap-5 cursor-pointer'>
                            {item.icon}
                            <span>{item.title}</span>
                        </div>
                        {i !== menu.length - 1 && <Divider />}
                    </React.Fragment>
                ))}
            </div>
        </Drawer>
    );
};

export default AdminSideBar;