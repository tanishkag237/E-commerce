import React from 'react'

const SearchSkeleton = () => {
  return (
    <div>
        <div className="p-2 bg-white w-full rounded-4xl shadow-md h-13 flex justify-end  animate-pulse">
      <div className='w-92 gap-2 flex rounded-4xl items-center'>
         <div className='bg-gray-200 w-10 h-10 rounded-4xl items-center'></div>
          <div className='bg-gray-200 w-80 h-10 rounded-4xl items-center'></div>
      </div>
    </div>
    </div>
  )
}

export default SearchSkeleton