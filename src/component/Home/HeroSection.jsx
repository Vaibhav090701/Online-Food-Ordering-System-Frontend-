import React from 'react'
import './Home.css';

const HeroSection = () => {
  return (
    <div>
    <section className="banner relative flex flex-col justify-center items-center">
        <div className="w-[50vw] z-10 text-center">
          <p className="text-2xl lg:text-6xl font-bold py-5 text-white">Hi, Foodies!</p>
          <p className="text-gray-300 text-xl lg:text-4xl">Order Just Delivered</p>
        </div>
        <div className="cover absolute top-0 left-0 right-0" />
      </section>

      
    </div>
  )
}

export default HeroSection
