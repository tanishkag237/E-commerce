import React from 'react'

const SortSkeleton = () => {
  return (
    <div>
        <div className="p-2 bg-white w-full rounded-2xl shadow-md h-13 flex justify-end  animate-pulse">
      <div className='w-50 gap-2 flex justify-end rounded-2xl items-center'>
         <div className='bg-gray-200 w-14 h-6 rounded-md items-center'></div>
          <div className='bg-gray-200 w-35 h-10 rounded-xl items-center'></div>
      </div>
    </div>
    </div>
  )
}

export default SortSkeleton