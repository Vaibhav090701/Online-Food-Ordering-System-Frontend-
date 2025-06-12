import React, { useEffect } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import AdminSideBar from './AdminSideBar';
import Dashboard from '../Dashboard/Dashboard';
import Orders from '../Orders/Orders';
import Menu from '../Menu/Menu';
import Ingredients from '../Ingredients/Ingredients';
import CreateMenuForm from '../Menu/CreateMenuForm';
import CategoryGrid from '../Menu/MenuCategory/CategoryGrid';
import PredefinedMenuList from '../Menu/PreDefineMenuList';
import CreateIngredientForm from '../Ingredients/CreateIngredientForm';
import { useDispatch, useSelector } from 'react-redux';
// import { getRestaurentOrders } from '../../component/State/Admin/Restaurent Orders/Action';
import RestaurentDetails from './RestaurentDetails';

const Admin = () => {
  const dispatch = useDispatch();
  const { restaurent } = useSelector((store) => store);
  const isSmallScreen = useMediaQuery('(max-width:1080px)');

  useEffect(() => {
    // if (restaurent.userRestaurent?.id) {
    //   dispatch(
    //     getRestaurentOrders({
    //       restaurentId: restaurent.userRestaurent.id,
    //       orderStatus: 'pending',
    //     })
    //   );
    // }
  }, [dispatch, restaurent.userRestaurent?.id]);

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        width: '100%',
        overflowX: 'hidden',
        bgcolor: '#000000',
        // background: 'linear-gradient(180deg, #1f2937 0%, #000000 100%)',
      }}
    >
      <AdminSideBar />

      <Box
        sx={{
          flex: 1,
          width: '100%',
          pb: { xs: '76px', lg: 0 },
          overflowX: 'hidden',
        }}
      >
        <Box sx={{ width: '100%', maxWidth: '1200px', mx: 'auto'}}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/ingredients" element={<Ingredients />} />
            <Route path="/menu-form" element={<CreateMenuForm />} />
            <Route path="/menu/categories" element={<CategoryGrid />} />
            <Route path="/categories/:id/menu-item" element={<PredefinedMenuList />} />
            <Route path="/ingredients/create" element={<CreateIngredientForm />} />
            <Route path="/details" element={<RestaurentDetails/>}></Route>
          </Routes>
        </Box>
      </Box>
    </Box>
  );
};

export default Admin;
