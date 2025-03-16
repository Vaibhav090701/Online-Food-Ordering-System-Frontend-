import { Button, Card } from '@mui/material'
import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';  // Green check icon
import { useDispatch, useSelector } from 'react-redux';

const AddressCart = ({ item, showButton, handleSelectAddress, isSelected }) => {
  return (
    <Card className='flex gap-5 w-64 p-5'>
        <HomeIcon />
        <div className='space--y-3 text-gray-500'>
            <h1 className='font-semibold text-lg text-white'>Home</h1>

            <p className='pb-2'>
                {item.streetAddress}, {item.landmark}, {item.city}-{item.zipCode}, {item.state}. 
            </p>
            
            {
                showButton &&
                <Button variant='outlined' fullWidth onClick={() => handleSelectAddress(item)}>
                    Select
                </Button>
            }

            {/* Conditionally render the green check icon if the address is selected */}
            {isSelected && <CheckCircleIcon style={{ color: 'green' }} />}
        </div>
    </Card>
  )
}

export default AddressCart;
