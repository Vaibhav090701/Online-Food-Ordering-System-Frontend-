import React from 'react'
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

const Profile = () => {

    const openSideBar=()=>{
        
    }

  return (
    <div className='flex justify-between'>
        <div className='sticky h-[80vh] lg:w-[20%]'>

            <ProfileNavigation open={openSideBar}/>
        </div>

        <div className='lg:w-[80%]'>

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
  )
}

export default Profile