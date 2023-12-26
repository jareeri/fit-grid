import React from 'react'
import TDietaryschedule from '../Components/Plan/TDietaryschedule'
import TTrainingschedule from '../Components/Plan/TTrainingschedule'
import TUserList from '../Components/Plan/TUserList'

const TCourseDetails = () => {
  return (
    <div>
      <div className="px-24 py-28 bg-[#f5f5f5]">
      
      <TDietaryschedule/>
      <TTrainingschedule/>
      
      </div>
    </div>
  )
}

export default TCourseDetails
