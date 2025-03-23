import { Card, Chip, IconButton } from '@mui/material'
import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavouriter } from '../State/Authentication/Action';
import { isPresentInFavourites } from '../config/logic';
// import { isPresentInFavourites } from '../config/logic';

const   RestaurentCard = ({item}) => {

    console.log("item", item);
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const jwt=localStorage.getItem("jwt")

    const {auth}=useSelector(store=>store)

    const handleAddToFavourite=()=>{
        console.log("itemId",item.id);
        dispatch(addToFavouriter({jwt,restaurentId:item.id}))
    }

    const handleNavigateToRestaurent = () => {
        console.log("Item status", item.status);  // Check if status is being checked correctly
        if (item.status) {
            navigate(`/restaurent/${item.address}/${item.name}/${item.id}`);
        } else {
            console.log("Restaurant is closed");
        }
    }
        

  return (
    <div>
        <Card className='w-[18rem] bg-white'>

            <div className={`${true?'cursor-pointer':'cursor-not-allowed'} relative`}>
                <img className='w-full h-[10rem] rounded-t-md object-cover' 
                src={item.images[0]} alt=""/>
                <Chip size='small' className='absolute top-2 left-2' color={item.status?'success':'error'} label={item.status?'open':'closed'}
                />

            </div>

            <div className='p-4 textPart lg:flex w-full justify-between'>

                <div className='space-y-1'>
                    <p onClick={handleNavigateToRestaurent} className='font-semibold text-lg cursor-pointer text-gray-700'>{item.name}</p>
                    <p className='text-grey-500 text-sm text-gray-500'>{item.description}</p>

                </div>

                <div>
                    <IconButton onClick={handleAddToFavourite} 
                    sx={{
                        color: isPresentInFavourites(auth.favourites, item) ? 'red' : 'gray', // Icon color
                      }}
                    >
                        {isPresentInFavourites(auth.favourites,item)?
                        (<FavoriteIcon  sx={{ color: 'red' }}/>) :
                        (<FavoriteBorderIcon sx={{ color: 'gray' }}/>)}
                    </IconButton>
                </div>
            </div>

        </Card>
    </div>
  )
}

export default RestaurentCard