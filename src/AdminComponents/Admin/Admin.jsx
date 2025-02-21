import React, { useEffect } from 'react'
import AdminSideBar from './AdminSideBar'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../Dashboard/Dashboard'
import Orders from '../Orders/Orders'
import Menu from '../Menu/Menu'
import FoodCategory from '../FoodCategory/FoodCategory'
import Ingredients from '../Ingredients/Ingredients'
import Events from '../Events/Events'
import RestaurentDetails from './RestaurentDetails'
import CreateMenuForm from '../Menu/CreateMenuForm'
import { useDispatch, useSelector } from 'react-redux'
import { getRestaurentById, getRestaurentsCategory } from '../../component/State/Restaurent/Action'
import { getMenuItemByRestaurentId } from '../../component/State/Menu/Action'
import { getUserOrders } from '../../component/State/Order/Action'
import { getRestaurentOrders } from '../../component/State/Admin/Restaurent Orders/Action'

const Admin = () => {

  const dispatch=useDispatch();
  const { restaurent } = useSelector(store => store);
  const jwt=localStorage.getItem("jwt");


  useEffect(()=>{
    dispatch(getRestaurentsCategory({restaurentId:restaurent.userRestaurent?.id, jwt}))
    dispatch(getRestaurentOrders({
      restaurentId:restaurent.userRestaurent.id,
      orderStatus:"pending",
      jwt
    }))

  },[])

  const handleClose=()=>{

  }
  return (
    <div className='lg:flex justify-between'>
      <div className='sticky h-[100vh] lg:w-[20%] bg-black'>
        <AdminSideBar handleClose={handleClose}/>

        </div>
        
      <div className='lg:w-[80%] z-10 overflow-y-auto'>
        <Routes>
          <Route path='/' element={<Dashboard/>}></Route>
          <Route path='/orders' element={<Orders/>}></Route>
          <Route path='/menu' element={<Menu/>}></Route>
          <Route path='/category' element={<FoodCategory/>}></Route>
          <Route path='/ingredients' element={<Ingredients/>}></Route>
          <Route path='/events' element={<Events/>}></Route>
          <Route path='/details' element={<RestaurentDetails/>}></Route>
          <Route path='/add-menu' element={<CreateMenuForm/>}></Route>
        </Routes>

      </div>
    </div>
  )
}

export default Admin
