import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import CreateRestaurentForm from '../AdminComponents/CreateRestaurent/CreateRestaurentForm'
import Admin from '../AdminComponents/Admin/Admin'
import { useSelector } from 'react-redux'

const AdminRouter = () => {
  const {restaurent}=useSelector(store=>store)
  const [isLoading, setIsLoading] = useState(true);
  const [hasRestaurant, setHasRestaurant] = useState(null); // true / false

  useEffect(() => {
    if (restaurent.userRestaurent !== undefined) {
      setHasRestaurant(!!restaurent.userRestaurent?.id); // check if valid restaurant object with ID exists
      setIsLoading(false);
    }
  }, [restaurent.userRestaurent]);

  if (isLoading) return <div>Loading...</div>;

  
  return (
    <div>
        <Routes>
        <Route
        path="/*"
        element={hasRestaurant ? <Admin /> : <CreateRestaurentForm />}
      />        </Routes>
      
    </div>
  )
}

export default AdminRouter
