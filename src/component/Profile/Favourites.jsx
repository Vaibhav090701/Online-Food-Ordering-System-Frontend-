import React from 'react'
import RestaurentCard from '../Restaurent/RestaurentCard'
import { useSelector } from 'react-redux'

const Favourites = () => {
  
  const {auth,restaurent}=useSelector(store=>store)
  return (
    <div>

      <h1 className='text-center text-xl font-semibold py-5'>My Favourites</h1>
      <div className='flex justify-center gap-3 flex-wrap'>
        {
           auth.favourites
    ?.filter(item => !item.deleted)
    .map(item => (
      <RestaurentCard key={item.id} item={item} />
    ))
        }
      </div>
    </div>
  )
}

export default Favourites