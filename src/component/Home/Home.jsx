import React, { useEffect } from 'react';
import './Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRestaurents } from '../State/Restaurent/Action';
import { useNavigate } from 'react-router-dom';
import HeroSection from './HeroSection';
import Dishes from './Dishes';
import HowItWorks from './HowItWorks';
import CustomerTestimonials from './CustomerTestimonials';
import SpecialOffers from './SpecialOffers';
import CallToAction from './CallToAction';
import {customerTestimonials, featuredDishes, specialOffers, workProcess } from './TopMeal';
import Footer from '../Footer/Footer';
const Home = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    dispatch(getAllRestaurents(jwt));
  }, [dispatch, jwt]);

  const { restaurent } = useSelector((store) => store);

  const dishes=featuredDishes;
  const process=workProcess;
  const testimonials=customerTestimonials;
  const offers=specialOffers;

  return (
    <div className="pb-10">

      {/* Hero Section */}
      <HeroSection/>
      <Dishes dishes={dishes}/>
      <CustomerTestimonials testimonials={testimonials}/>
      <SpecialOffers specialOffers={offers}/>
      <CallToAction/>
      <Footer/>

    </div>
  );
}

export default Home;
