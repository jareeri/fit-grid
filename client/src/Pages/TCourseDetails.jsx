import React from 'react'
import TDietaryschedule from '../Components/Plan/TDietaryschedule'
import TTrainingschedule from '../Components/Plan/TTrainingschedule'

const TCourseDetails = () => {
  return (
    <div>
      <div className='mb-24 mt-32'>
      <TDietaryschedule/>
      <TTrainingschedule/>
      </div>
    </div>
  )
}

export default TCourseDetails
