import React, { useEffect } from 'react';
import OrderCard from './OrderCard';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserOrders } from '../State/Order/Action';

const Orders = () => {
  const { auth, order } = useSelector((store) => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserOrders());
  }, [auth.user]);

  // Check if orders is undefined or empty
  if (!order.orders || order.orders.length === 0) {
    return <div className='text-center py-7'>No orders found.</div>;
  }

  return (
    <div className='flex flex-col items-center'>
      <h1 className='font-semibold text-center text-xl py-7'>My Orders</h1>

      <div className='space-y-5 w-full lg:w-1/2'>
        {order.orders.map((order,index) =>(
            <OrderCard key={index} order={order} />
          )
        )}
      </div>
    </div>
  );
};

export default Orders;