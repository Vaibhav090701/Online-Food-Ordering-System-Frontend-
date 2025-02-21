import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CreateRestaurentForm from '../AdminComponents/CreateRestaurent/CreateRestaurentForm'
import Admin from '../AdminComponents/Admin/Admin'
import { useSelector } from 'react-redux'

const AdminRouter = () => {
  const {restaurent}=useSelector(store=>store)
  return (
    <div>
        <Routes>
            <Route path='/*' element={!restaurent.userRestaurent?<CreateRestaurentForm/>:<Admin/>}></Route>
        </Routes>
      
    </div>
  )
}

export default AdminRouter
