import React from 'react'
import Dietaryschedule from '../Components/Plan/Dietaryschedule'
import Trainingschedule from '../Components/Plan/Trainingschedule'

const CourseDetails = () => {
  return (
    <div>
      <div className='mb-24 mt-32'>
      <Dietaryschedule/>
      <Trainingschedule/>
      </div>
    </div>
  )
}

export default CourseDetails
