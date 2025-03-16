import React from 'react'
import RestaurentCard from '../Restaurent/RestaurentCard'
import { useSelector } from 'react-redux'

const UserProfile = () => {

      const {auth,restaurent}=useSelector(store=>store)
      return (
        <div>
    
    <div className='flex flex-wrap items-center justify-around gap-5'>
                {
                  //when passing an array in props always pass index as a key
                    restaurent.allRestaurents.map((item) => (
                      <RestaurentCard key={item.id} item={item} />
                    ))            
                
              }
              </div>
    
    
        </div>
      )
    
  
}

export default UserProfile