import React, { useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { categrizeIngredient } from '../../util/categrizeIngredient';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../State/Cart/Action';


const MenuCard = ({item, restaurantId}) => {

  const [selectedIngredients,setSelectedIngredients]=useState([ ]);

  const dispatch=useDispatch();

  const handleAddItemToCart=(e)=>{
    e.preventDefault();
    const reqData={
      token:localStorage.getItem("jwt"),
      cartItem:{
        menuItemId:item.id,
        quantity:1,
        ingredients:selectedIngredients.length>0 ? selectedIngredients : null, // // Send null if no ingredients selected
        restaurantId:restaurantId
      }
    };
    console.log("reqData",reqData);
    dispatch(addItemToCart(reqData));
  }

  const handleCheckBoxChange=(itemName)=>{
    console.log("item name",itemName);
    //it will check if item is already present inside cart or not
    if(selectedIngredients.includes(itemName))
    {
      setSelectedIngredients(selectedIngredients.filter((item)=>item!==itemName));
    }
    else{
      setSelectedIngredients([...selectedIngredients,itemName])
    }
  }

  return (

    //import it from material ui website
    <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
      id="panel1-header"
    >
      <div className='flex items-center justify-center'>
        <div className='lg:flex items-center lg:gap-5'>
          <img className='w-[7rem] h-[7rem] object-cover' 
          src={item.images[0]} alt="" />
        </div>

        <div className='lg:space-y-5 space-y-1 lg:max-w-2xl'>
          <p className='font-semibold text-xl'>{item.name}</p>
          <p>{item.price}</p>
          <p className='text-gray-400'>{item.description}</p>
        </div>

      </div>

      </AccordionSummary>
  
    <AccordionDetails>

      <form onSubmit={handleAddItemToCart}>
        <div className='flex flex-wrap gap-5'>
          {item.ingredients.map((ingredient)=> 
          <div>
            <p>Choose Ingredients</p>
            <FormGroup>

              {item.ingredients.map((item)=>
                <FormControlLabel key={item.id} control={<Checkbox onChange={()=>handleCheckBoxChange(item.name)} />} label={item.name} />
              )}

            </FormGroup>
          </div>
          
          )}

        </div>

        <div className='pt-5'>
          <Button type='submit' variant='contained' disabled={false} >{true?"Add to Cart":"Out of Stock"}</Button>
        </div>

      </form>
    </AccordionDetails>
  </Accordion>

  )
}

export default MenuCard
