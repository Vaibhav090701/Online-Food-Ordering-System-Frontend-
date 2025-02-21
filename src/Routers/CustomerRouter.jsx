import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Navbar from '../component/Navbar/Navbar'
import Home from '../component/Home/Home'
import RestaurentDetails from '../component/Restaurent/RestaurentDetails'
import Cart from '../component/Cart/Cart'
import Profile from '../component/Profile/Profile'
import Auth from '../component/Auth/Auth'
import PaymentSuccess from '../component/PaymentSuccess/PaymentSuccess'

const CustomerRouter = () => {
  return (
    <div>
        <Navbar/>
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/account/:register' element={<Home/>}></Route>
            <Route path='/restaurent/:city/:title/:id' element={<RestaurentDetails/>}></Route>
            <Route path='/cart' element={<Cart/>}></Route>
            <Route path='/my-profile/*' element={<Profile/>}></Route>
            <Route path='/payment/success/:id' element={<PaymentSuccess/>}></Route>
        </Routes>
        <Auth/>

    </div>
  )
}

export default CustomerRouter