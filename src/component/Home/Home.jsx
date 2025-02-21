import React, { useEffect } from 'react'
import './Home.css'
import MultiItemCarousel from './MultiItemCarousel'
// import RestaurentCard from '../Restaurent/RestaurentCard'
import { useDispatch, useSelector } from 'react-redux'
import { getAllRestaurents } from '../State/Restaurent/Action'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const dispatch=useDispatch();
  const jwt=localStorage.getItem("jwt");

  useEffect(()=>{
    dispatch(getAllRestaurents(jwt));
    console.log("hello");
  },[dispatch,jwt])

  const {restaurent}=useSelector(store=>store);
  console.log("restaurent", restaurent);

  return (
    <div className='pb-10'>

        <section className='banner -z-50 relative flex flex-col justify-center items-center '>
            
            <div className='w-[50vw] z-10 text-center'>
                <p className='text-2xl lg:text-6xl font-bold z-10 py-5'>Hi, foodiess</p>
                <p className='z-10 text-gray-300 text-xl lg:text-4xl'>Order just Delivered.</p>
            </div>

            <div className='cover absolute top-0 left-0 right-0'>

            </div>

            <div className='fadout'>

            </div>

        </section>

        <section className='p-10 lg:py-10 lg:px-10'>
          <p className='text-2xl font-semibold text-gray-400 py-3 pb-10'>Top Meals</p>
          <MultiItemCarousel/>
        </section>

        <section className='restaurentCard px-5 lg:px-10 pt-10'>
          <h1 className='text-2xl text-gray-400 font-semibold pb-8'>Order From Handpicked Favourites</h1>

          <div className='flex flex-wrap items-center justify-around gap-5'>
            {
              //when passing an array in props always pass index as a key
             restaurent.restaurents.map((item)=><RestaurentCard key={item.id} item={item}/>
            )
            }
          </div>

        </section>

    </div>
  )
}

export default Home