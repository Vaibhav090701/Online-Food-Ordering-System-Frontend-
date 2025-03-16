import './App.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme } from './component/Theme/DarkTheme';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './component/State/Authentication/Action';
import { findCart } from './component/State/Cart/Action';
import Routers from './Routers/Routers';
import {getAllRestaurents, getRestaurentByUserId } from './component/State/Restaurent/Action';

function App() {

  const dispatch=useDispatch()

  const jwt=localStorage.getItem("jwt");
  //we also need to access our store
  const {auth}=useSelector(store=>store)

  //when application runs first time at that time only we need to render user profile thats why we are using useEfect hook
  useEffect(()=>{

    //whenever RegisterSuccess or LoginSuccess is done, we have jwt token inside our store, so thats why we use that jwt also or get from localstorage also
    dispatch(getUser(auth.jwt || jwt))
    dispatch(findCart(jwt));

  },[auth.jwt]);

  useEffect(()=>{
    dispatch(getAllRestaurents(jwt)); 
    if(auth.jwt || jwt)
    {
    dispatch(getRestaurentByUserId(auth.jwt || jwt))
    }
  },[auth.user]);

  
  return (

    <ThemeProvider theme={darkTheme}>
        <CssBaseline></CssBaseline>
      <Routers/>


    </ThemeProvider>



  );
}

export default App;
