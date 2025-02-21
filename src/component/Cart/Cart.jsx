import React from 'react'
import CartItem from './CartItem'
import { Box, Button, Card, Divider, Grid, Modal, TextField } from '@mui/material'
import AddressCart from './AddressCart';
import HomeIcon from '@mui/icons-material/Home';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { ErrorMessage, Field, Form, Formik, validateYupSchema } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../State/Order/Action';

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
  state:"",
  pincode:"",
  city:""
}

const Cart = () => {


  const createOrderUsingSelectedAddress=()=>{

  }

  const handleOpenAddressModel=()=> setOpen(true);

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const {auth,cart}=useSelector((store)=>store)
  const dispatch=useDispatch();

  const handleSubmit=(values)=>{
    const data={
      jwt:localStorage.getItem("jwt"),
        restaurentId:cart.cartItems[0].food?.restaurent.id,
        address:{
          fullName:auth.user?.fullName,
          streetAddress:values.streetAddress,
          city:values.city,
          state:values.state,
          postalCode:values.pincode,
          country:"india"
      }
    }

    dispatch(createOrder(data))
    console.log("value", values);
  }


  const cartItems = cart?.cartItems ?? [];

  return (
    <>
      <main className='lg:flex justify-between'>

        <section className='lg:w-[30%] space-y-6 lg:min-h-screen pt-10' >
          {cart.cartItems.map((item)=>   
            <CartItem item={item}/> 
          )}

        <Divider/>

        <div className='billDetails px-5 text-sm'>

          <p className='font-extralight py-5'>Bill Details</p>
          <div className='space-y-3'>

            <div className='flex justify-between text-gray-400'>
              <p>Item Total</p>
              <p>${cart.cart?.total}</p>
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
              <p>${cart.cart?.total+20+5+14}</p>
            </div>

          </div>

        </div>

        </section>

        <Divider orientation='vertical' flexItem/>

        <section className='flex lg:w-[70%] justify-center px-5 pb-10 lg:pb-0'>

          <div>
            <h1 className='font-semibold text-center text-2xl py-10'>Choose Delivery Address</h1>

            <div className='flex justify-center flex-wrap gap-5'>
              {[1,1,1].map((item)=>
                
                <AddressCart handleSelectAddress={createOrderUsingSelectedAddress} item={item} showButton={true}/>
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
                    name="pincode"
                    label="Pincode"
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