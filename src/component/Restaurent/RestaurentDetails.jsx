import { Button, Divider, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MenuCard from './MenuCard';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurentById, getRestaurentsCategory } from '../State/Restaurent/Action';
import { getMenuItemByRestaurentId } from '../State/Menu/Action';

const RestaurentDetails = () => {

  const [foodType, setFoodType]=useState("all")
  const [selectedFood, setSelectedFood] = useState("");
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const jwt = localStorage.getItem("jwt");
  const { id } = useParams();

  const { restaurent, menu } = useSelector(store => store);


  const handleFilter = (e) => {
    setFoodType(e.target.value);
  };

  useEffect(() => {
    dispatch(getRestaurentById({restaurentId: id, jwt:jwt}));
  }, []);

  useEffect(() => {
    dispatch(getMenuItemByRestaurentId({
      restaurentId: id,
      jwt:jwt
    }));
  }, [selectedFood, foodType]);

   // Filter the menu items based on the selected foodType
   const filteredMenuItems = menu.menuItems.filter((item) => {
    if (foodType === "all") return true;  // Show all items
    if (foodType === "vegetarian") return item.vegetarian === true;  // Show only vegetarian
    if (foodType === "non-vegetarian") return item.vegetarian === false;  // Show only non-vegetarian
    return true;
  });

  const foodTypes = [
    { label: "All", value: "all" },
    { label: "Vegetarian only", value: "vegetarian" },
    { label: "Non-Vegetarian only", value: "non-vegetarian" },
  ];

  return (
    <div className="px-5 lg:px-10 h-screen overflow-y-auto">

      <section>
        <h3 className="text-gray-500 py-2 mt-10">Home/india/indian fast food</h3>

        <div>
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <img className="w-full h-[40vh] object-cover" src={restaurent.restaurent?.images[0]} alt="" />
            </Grid>

            <Grid item xs={12} lg={6}>
              <img className="w-full h-[40vh] object-cover" src={restaurent.restaurent?.images[1]} alt="" />
            </Grid>

            <Grid item xs={12} lg={6}>
              <img className="w-full h-[40vh] object-cover" src={restaurent.restaurent?.images[2]} alt="" />
            </Grid>

          </Grid>
        </div>

        <div className="pt-3 pb-5">
          <h1 className="text-4xl font-semibold">{restaurent.restaurent?.name}</h1>
          <p className="text-gray-500 mt-1">{restaurent.restaurent?.description}</p>

          <div className="space-y-3 mt-3">
            <p className="text-gray-500 flex items-center gap-3">
              <LocationOnIcon />
              <span>{restaurent.restaurent?.address}</span>
            </p>

            <p className="text-gray-500 flex items-center gap-3">
              <CalendarTodayIcon />
              <span>Mon-Sun 9:00 AM-9:00 PM (Today)</span>
            </p>

          </div>
        </div>
      </section>

      <Divider />

      <section className="pt-[2rem] lg:flex relative">

        <div className="space-y-10 lg:w-[20%] filter">

          <div className="box space-y-5 lg:sticky top-28">

            <div>
              <Typography variant="h5" sx={{ paddingBottom: '1rem' }}>
                Food Type
              </Typography>

              <FormControl className="py-10 space-y-5" component={"fieldset"}>

                <RadioGroup onChange={handleFilter} name="food_type" value={foodType}>
                  {
                    foodTypes.map((item) => (
                      <FormControlLabel key={item.value} value={item.value} control={<Radio />} label={item.label} />
                    ))
                  }
                </RadioGroup>
              </FormControl>
            </div>

            <Divider />


          </div>

        </div>

        <div className="space-y-5 lg:w-[80%] lg:pl-10">
          <Typography variant="h4">Menu</Typography>
          {filteredMenuItems.length > 0 ? (
            filteredMenuItems.map((item) => <MenuCard key={item.id} item={item} restaurantId={id} />)
          ) : (
            <p>No menu items found for the selected filter.</p>
          )}
        </div>

      </section>
    </div>
  );
}

export default RestaurentDetails;
