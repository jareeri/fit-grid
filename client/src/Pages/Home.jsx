import React from 'react'
import Hero from '../Components/Landing/Hero'


import Category from '../Components/Landing/Category'
import Pricing from './Pricing'
import Blogs from './Blogs'
import Calculator from './Calculator'
import BestTrainers from '../Components/Landing/BestTrainers'
import Faqs from '../Components/Landing/Faqs'
import Statestic from '../Components/Landing/Statestic'

const Home = () => {
  return (
    <div> 
      <Hero /> 
      <Statestic/>
     <BestTrainers/>
      <Category />
         <Calculator/>
      <Blogs/>
 <Faqs/>

    </div>
  )
}
export default Home
