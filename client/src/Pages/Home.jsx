import React from 'react'
import Hero from '../Components/Landing/Hero'


import Category from '../Components/Landing/Category'
import Pricing from './Pricing'
import Blogs from './Blogs'
import Calculator from './Calculator'
import BestTrainers from '../Components/Landing/BestTrainers'
import Faqs from '../Components/Landing/Faqs'
import Statestic from '../Components/Landing/Statestic'
import JoinTeam from '../Components/Landing/JoinTeam'
import AboutHome from '../Components/Landing/AboutHome'

const Home = () => {
  return (
    <div className='bg-[#f5f5f5]'> 
      <Hero /> 
      <Statestic/>
      <AboutHome/>
     <BestTrainers/>
      <Category />
      <Blogs/>
         <Calculator/>
   
 <Faqs/>
 <JoinTeam/>

    </div>
  )
}
export default Home
