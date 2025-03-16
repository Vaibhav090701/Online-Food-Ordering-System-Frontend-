import React, { useEffect, useState } from 'react'
import CartItem from './CartItem'
import { Box, Button, Card, Divider, Grid, Modal, TextField } from '@mui/material'
import AddressCart from './AddressCart';
import HomeIcon from '@mui/icons-material/Home';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { ErrorMessage, Field, Form, Formik, validateYupSchema } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../State/Order/Action';
import { findCart } from '../State/Cart/Action';
import { noop } from 'framer-motion';
import { createAddress, getUsersAddress } from '../State/Address/Action';
import NotificationSnackbar from '../../util/NotificationSnackBar';
import { showNotification } from '../State/Notification/Action';

// write this manually but not working so comment it out
// import * as Yup from 'yup';

export const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  outline:"none",
  boxShadow: 24,
  p: 4,
};

const initialValues={
  streetAddress:"",
  city:"",
  state:"",
  zipCode:0,
  landmark:"",
  isDefault:true
}

const Cart = () => {

  const jwt=localStorage.getItem("jwt");

  const handleOpenAddressModel=()=> setOpen(true);

  const [open, setOpen] = React.useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleClose = () => setOpen(false);

  const {restaurent,cart, address}=useSelector((store)=>store)
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(findCart(jwt));
    dispatch(getUsersAddress(jwt));
    
},[jwt])


  const handleSubmit=(values)=>{
    const data={
      streetAddress:values.streetAddress,
      city:values.city,
      state:values.state,
      zipCode:values.pincode,
      landmark:values.landmark,
      isDefault:true,
    }
    dispatch(createAddress({reqData:data, jwt:jwt}));
  }

  const handleSelectAddress=(address)=>{
    setSelectedAddress(address);  // Update the selected address\    
  }

  useEffect(() => {
    if (selectedAddress) {
      console.log("Selected Address", selectedAddress);
    }
  }, [selectedAddress]);

  console.log("Cart Items", cart.cartItems);
       

  const handlePlaceOrder=()=>{

    if(selectedAddress=="" || selectedAddress==null){
      alert("Please select the address");
    }
    else{

      const cartItemsArray = cart.cartItems.map(item => ({
        menuItemId: item.menuItemDto.id,  // Extract the menuItemId from the cart item
        quantity: item.quantity           // Extract the quantity from the cart item
      }));

    const data={
      paymentMethod:"CARD",
      addressId:selectedAddress.id,
      orderItems:cartItemsArray,
      restaurantId:cart.cartItems[0].restaurantId,
    }
    dispatch(createOrder({jwt:jwt,reqData:data}))
  }
  }


  return (
    <>
      <main className='lg:flex justify-between'>

        <NotificationSnackbar/>

        <section className='lg:w-[30%] space-y-6 lg:min-h-screen pt-10' >
        {cart.cartItems && cart.cartItems.length > 0 ? (
  cart.cartItems.map((item) => <CartItem key={item.id} item={item} />)
) : (
  <p>No items in the cart</p>
)}

        <Divider/>

        <div className='billDetails px-5 text-sm'>

          <p className='font-extralight py-5'>Bill Details</p>
          <div className='space-y-3'>

            <div className='flex justify-between text-gray-400'>
              <p>Item Total</p>
              <p>${cart.cart?.totalPrice }</p>
            </div>

            <div className='flex justify-between text-gray-400'>
              <p>Delivery Fee</p>
              <p>$20</p>
            </div>

            <div className='flex justify-between text-gray-400'>
              <p>Platform Fee</p>
              <p>$5</p>
            </div>

            <div className='flex justify-between text-gray-400'>
              <p>GST and Restaurent Charges</p>
              <p>$14</p>
            </div>

            <Divider/>
            <div className='flex justify-between text-gray-400'>
              <p>Total Pay</p>
              <p>${(cart.cart?.totalPrice+20+5+14).toFixed(2)}</p>
              {/* The toFixed() method allows you to specify the number of decimal places you'd like to keep. It will round the number accordingly and return a string. */}
            </div>

            <Grid item xs={12}>
                    <Button fullWidth variant='contained' onClick={handlePlaceOrder} color='primary'>Place Order</Button>
                  </Grid>


          </div>

        </div>

        </section>

        <Divider orientation='vertical' flexItem/>

        <section className='flex lg:w-[70%] justify-center px-5 pb-10 lg:pb-0'>

          <div>
            <h1 className='font-semibold text-center text-2xl py-10'>Choose Delivery Address</h1>

            <div className='flex justify-center flex-wrap gap-5'>
              {address.addresses.map((item)=>
                
                <AddressCart key={item.id}  item={item} showButton={true} 
                handleSelectAddress={handleSelectAddress}
                isSelected={selectedAddress?.id === item.id} />
              )}

              <Card className='flex gap-5 w-64 p-5'>
                      <AddLocationAltIcon/>
                      <div className='space--y-3 text-gray-500'>
                          <h1 className='font-semibold text-lg text-white'>Add New Address</h1> 
                      
                              <Button variant='outlined' fullWidth onClick={handleOpenAddressModel}>Add</Button>
                      
                      </div>

                  </Card>
            
            </div>
          </div>
          
        </section>
      </main>


        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
{/* 
npm i Formik
npm i yup
install those in the system */}

            <Formik initialValues={initialValues} 
            // validationSchema={validationSchema} 
            onSubmit={handleSubmit}>

              <Form>
              <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field 
                    as={TextField} 
                    name=
                    "streetAddress"
                    label="Street Address"
                    fullWidth
                    variant="outlined"
                    // error={!ErrorMessage("streetAddress")}
                    // helperText={
                    //   <ErrorMessage>
                    //   {(msg)=> <span className='text-red-600'>{msg}</span>}
                    //   </ErrorMessage>
                    // } 
                    >
                    </Field>
                  </Grid>

                  <Grid item xs={12}>
                    <Field 
                    as={TextField} 
                    name="state"
                    label="State"
                    fullWidth
                    variant="outlined"
                    // error={!ErrorMessage("streetAddress")}
                    // helperText={
                    //   <ErrorMessage>
                    //   {(msg)=> <span className='text-red-600'>{msg}</span>}
                    //   </ErrorMessage>
                    // } 
                    >                      
                    </Field>
                  </Grid>

                  <Grid item xs={12}>
                    <Field 
                    as={TextField} 
                    name="city"
                    label="City"
                    fullWidth
                    variant="outlined"
                    // error={!ErrorMessage("streetAddress")}
                    // helperText={
                    //   <ErrorMessage>
                    //   {(msg)=> <span className='text-red-600'>{msg}</span>}
                    //   </ErrorMessage>
                    // } 
                    >
                    </Field>
                  </Grid>

                  <Grid item xs={12}>
                    <Field 
                    as={TextField} 
                    name="zipcode"
                    label="Zipcode"
                    fullWidth
                    variant="outlined"
                    // error={!ErrorMessage("streetAddress")}
                    // helperText={
                    //   <ErrorMessage>
                    //   {(msg)=> <span className='text-red-600'>{msg}</span>}
                    //   </ErrorMessage>
                    // } 
                    >
                    </Field>
                  </Grid>

                  <Grid item xs={12}>
                    <Field 
                    as={TextField} 
                    name="landmark"
                    label="Landmark"
                    fullWidth
                    variant="outlined"
                    // error={!ErrorMessage("streetAddress")}
                    // helperText={
                    //   <ErrorMessage>
                    //   {(msg)=> <span className='text-red-600'>{msg}</span>}
                    //   </ErrorMessage>
                    // } 
                    >
                    </Field>
                  </Grid>

                  <Grid item xs={12}>
                    <Button fullWidth variant='contained' type='submit' color='primary'>Deliver Here</Button>
                  </Grid>

                </Grid>

              </Form>

            </Formik>

          </Box>
        </Modal>
    </>
  )
}

export default Cart