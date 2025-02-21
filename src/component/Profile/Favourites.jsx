import React from 'react'
import RestaurentCard from '../Restaurent/RestaurentCard'
import { useSelector } from 'react-redux'

const Favourites = () => {
  const {auth}=useSelector(store=>store)
  return (
    <div>
      <h1 className='text-center text-xl font-semibold py-5'>My Favourites</h1>
      <div className='flex justify-center gap-3 flex-wrap'>
        {
          auth.favourites.map((item)=> <RestaurentCard item={item}/>)
        }
      </div>
    </div>
  )
}

export default Favourites