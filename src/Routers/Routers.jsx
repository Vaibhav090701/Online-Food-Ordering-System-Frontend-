import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminRouter from './AdminRouter'
import CustomerRouter from './CustomerRouter'

const Routers = () => {
  return (
    <div>

        <Routes>
            <Route path='/admin/restaurents/*' element={<AdminRouter/>}></Route>
            <Route path='/*' element={<CustomerRouter/>}></Route>
        </Routes>
      
    </div>
  )
}

export default Routers
