import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Navbar from '../component/Navbar/Navbar'
import Home from '../component/Home/Home'
import RestaurentDetails from '../component/Restaurent/RestaurentDetails'
import Cart from '../component/Cart/Cart'
import Profile from '../component/Profile/Profile'
import Auth from '../component/Auth/Auth'
import PaymentSuccess from '../component/Cart/PaymentSuccess'
import PaymentCancel from '../component/Cart/PaymentCancle'
import VerifyOTP from '../component/Verify/VerifyEmailOtp'
import ForgetPassword from '../component/Verify/ForgotPassword'
import ResetPassword from '../component/Verify/ResetPassword'
import OrderTrackingSection from '../component/Cart/OrderTrackingSection'

const CustomerRouter = () => {
  return (
    <div>
        <Navbar/>
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/account/:register' element={<Home/>}></Route>
            <Route path='/restaurant/:id' element={<RestaurentDetails/>}></Route>
            <Route path='/cart' element={<Cart/>}></Route>
            <Route path='/my-profile/*' element={<Profile/>}></Route>
            <Route path="/payment/success" element={<PaymentSuccess />} />
            <Route path="/payment/cancel" element={<PaymentCancel />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/order-tracking" element={<OrderTrackingSection/>}></Route>



        </Routes>
        <Auth/>

    </div>
  )
}

export default CustomerRouter