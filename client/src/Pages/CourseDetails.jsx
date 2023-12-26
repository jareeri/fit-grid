import React from 'react'
import Dietaryschedule from '../Components/Plan/Dietaryschedule'
import Trainingschedule from '../Components/Plan/Trainingschedule'

const CourseDetails = () => {
  return (
    <div>
    <div className="px-24 py-28 bg-[#f5f5f5]">
      <Dietaryschedule/>
      <Trainingschedule/>
      </div>
    </div>
  )
}

export default CourseDetails
