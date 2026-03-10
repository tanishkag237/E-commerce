import React from 'react'

const SkeletonButton = () => {
  return (
    <div>
        <div className="p-2 bg-white w-full rounded-4xl shadow-md h-13 flex justify-end  animate-pulse">
      <div className='bg-gray-200 w-24  rounded-4xl items-center'>
         {/* <div className='bg-gray-400 w-24 p-0.5 rounded-4xl items-center'>.</div> */}
      </div>
    </div>
    </div>
  )
}

export default SkeletonButton