import React, { useEffect, useState } from 'react';
import { Box, Typography, Rating } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const   PopularRestaurants = () => {
    const [restaurants, setRestaurants]=useState([]);
    const navigate=useNavigate();
    
    const {auth, restaurent}=useSelector(store=>store);

    useEffect(()=>{
      const fetchData = async () => {
        if (restaurent.allRestaurents.length > 0) {
          setRestaurants(restaurent.allRestaurents.filter((item)=>!item.deleted));
        }
      };
    
      fetchData();
    
    },[restaurent.allRestaurents])
    


    const handleClick=(item)=>{
        if(auth.user){
          if(item.status){
            navigate(`/restaurant/${item.id}`)
          }
          else{
            alert("Restaurant is closed");
          }
          }
          else{
            navigate("/account/login");
          }        
    }
    

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#f4f4f9' }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: 'bold', marginBottom: '20px', color: '#333' }}
      >
        Popular Restaurants
      </Typography>
      <Box
        className="horizontal-scroll"
        sx={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          padding: '10px 0',
        }}
      >
        {restaurants.map((restaurant) => (
            <div onClick={()=>handleClick(restaurant)} className='cursor-pointer'>
        <Box
            key={restaurant.id}
            className="restaurant-card"
            sx={{
              flex: '0 0 auto',
              scrollSnapAlign: 'start',
              width: { xs: '240px', sm: '280px' },
              marginRight: '15px',
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s',
              '&:hover': { transform: 'translateY(-5px)' },
              backgroundColor: '#fff',
            }}
            
          >
            <img
              src={restaurant.images[0]}
              alt={restaurant.name}
              className="restaurant-image"
              style={{
                width: '100%',
                height: '150px',
                objectFit: 'cover',
              }}
              
            />
            <Box sx={{ padding: '10px' }}>
              <Typography
                variant="h6"
                sx={{ fontSize: '1.1rem', fontWeight: '500', color: '#333' }}
              >
                {restaurant.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                <Rating
                  value={restaurant.rating}
                  precision={0.5}
                  readOnly
                  size="small"
                />
                <Typography
                  variant="body2"
                  sx={{ marginLeft: '5px', color: '#666' }}
                >
                  {restaurant.rating}
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ color: '#666', marginTop: '5px' }}
              >
                {restaurant.cuisineType}
              </Typography>
            </Box>
          </Box>


            </div>
        ))}
      </Box>
    </Box>
  );
};

export default PopularRestaurants;