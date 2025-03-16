import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material'
import { Chip, IconButton } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { findCart, removeCartItem, updateCartItem } from '../State/Cart/Action'

const CartItem = ({item}) => {

    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {cart,auth}=useSelector(store=>store);
    const jwt=localStorage.getItem("jwt");

    console.log("Item", item);
    

    const handleUpdateCartItem=(value)=>{
        if(value===-1 && item.quantity===1)
        {
            handleRemoveCartItem();
        }
        const quantity=item.quantity+value;
        const id=item.id;
        dispatch(updateCartItem({id,quantity,jwt}));
    }

    const handleRemoveCartItem=()=>{
        dispatch(removeCartItem({cartItemId:item.id,jwt:auth.jwt || jwt}));
    }

  return (

    <div className='pt-5'>
        <div className='lg:flex items-center lg:space-x-5'>
            <div>
                <img className='w-[5rem] h-[5rem] object-cover' src={item.menuItemDto.images[0]} alt="" />
            </div>

            <div className='flex items-center justify-between lg:w-[70%]'>
                <div className='space-y-1 lg:space-y-3 w-full'>
                    <p>{item.name}</p>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center space-x-1'>
                            <IconButton onClick={()=>handleUpdateCartItem(-1)}>
                                <RemoveCircleOutline/>
                            </IconButton>

                            <div className='w-5 h-5 flex justify-center items-center text-xs'>{item.quantity}</div>

                            <IconButton onClick={()=>handleUpdateCartItem(1)} >
                                <AddCircleOutline/>
                            </IconButton>
                        </div>

                    </div>

                </div>
                <p>${item.price}</p>

            </div>
        </div>

        <div className='pt-3 space-x-2'>
            {item.ingredients.map((ingredient, index)=> <Chip key={index} label={ingredient}/>)}
        </div>
    </div>
  )
}

export default CartItem


