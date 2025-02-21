import React, { useEffect } from 'react'
import OrderCard from './OrderCard'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserOrders } from '../State/Order/Action';


const Orders = () => {

  const {auth,cart,order}=useSelector((store)=>store)
  const dispatch=useDispatch();
  const jwt=localStorage.getItem("jwt");
  const navigate=useNavigate();

  useEffect(()=>{
    dispatch(getUserOrders(jwt))
  },[auth.jwt])
  
  return (
    <div className='flex flex-col items-center'>
      <h1 className='font-semibold text-center text-xl py-7'>My Orders</h1>

      <div className='space-y-5 w-full lg:w-1/2'>
        {
          order.orders.map((order)=>order.items.map((item)=>  <OrderCard item={item} order={order}/>
        )
          )
        }

      </div>


    </div>
  )
}

export default Orders