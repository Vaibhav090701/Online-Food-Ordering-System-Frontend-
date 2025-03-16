import { Button, Card } from '@mui/material'
import React from 'react'

const OrderCard = ({order}) => {
  return (
    <div>
        <Card className='flex justify-between items-center p-5'>
            <div className='flex items-center space-x-5'>
                <img className='h-16 w-16' src={order.items[0].itemName.images[0]} alt="" />

                <div>
                    <p>{order.items[0].itemName.name}</p>
                    <p>${order.totalAmount}</p>
                </div>
                
            </div>

            <div>
                <Button className='cursor-not-allowed'>{order?.status}</Button>
            </div>
        </Card>

    </div>
  )
}

export default OrderCard