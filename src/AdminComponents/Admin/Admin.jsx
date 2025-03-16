import React, { useEffect, useState } from 'react';
import AdminSideBar from './AdminSideBar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import Orders from '../Orders/Orders';
import Menu from '../Menu/Menu';
import FoodCategory from '../FoodCategory/FoodCategory';
import Ingredients from '../Ingredients/Ingredients';
import Events from '../Events/Events';
import RestaurentDetails from './RestaurentDetails';
import CreateMenuForm from '../Menu/CreateMenuForm';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurentById, getRestaurentsCategory } from '../../component/State/Restaurent/Action';
import { getMenuItemByRestaurentId } from '../../component/State/Menu/Action';
import { getUserOrders } from '../../component/State/Order/Action';
import { getRestaurentOrders } from '../../component/State/Admin/Restaurent Orders/Action';
import { IconButton, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Admin = () => {
    const dispatch = useDispatch();
    const { restaurent } = useSelector(store => store);
    const jwt = localStorage.getItem("jwt");
    const isSmallScreen = useMediaQuery("(max-width:1080px)");
    const [isSidebarOpen, setIsSidebarOpen] = useState(!isSmallScreen);

    useEffect(() => {
        dispatch(getRestaurentsCategory({ restaurentId: restaurent.userRestaurent?.id, jwt }));
        dispatch(getRestaurentOrders({
            restaurentId: restaurent.userRestaurent.id,
            orderStatus: "pending",
            jwt
        }));
    }, [dispatch, restaurent.userRestaurent?.id, jwt]);

    const handleClose = () => {
        setIsSidebarOpen(false);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className='flex'>
            {/* Sidebar */}
            <AdminSideBar handleClose={handleClose} isOpen={isSidebarOpen} />

            {/* Main Content */}
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

                {/* Routes */}
                <div className='p-4'>
                    <Routes>
                        <Route path='/' element={<Dashboard />} />
                        <Route path='/orders' element={<Orders />} />
                        <Route path='/menu' element={<Menu />} />
                        <Route path='/category' element={<FoodCategory />} />
                        <Route path='/ingredients' element={<Ingredients />} />
                        <Route path='/events' element={<Events />} />
                        <Route path='/details' element={<RestaurentDetails />} />
                        <Route path='/add-menu' element={<CreateMenuForm />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default Admin;