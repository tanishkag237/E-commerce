import React from 'react'
import SkeletonButton from './SkeletonButton'
import SearchSkeleton from './SearchSkeleton'
import SortSkeleton from './SortSkeleton'

const SkeletonBar = () => {
  return (
     <div className='flex gap-4 justify-end m-3'>
        <SortSkeleton/>
        <SearchSkeleton/>
        <SkeletonButton/>
     </div>
  )
}

export default SkeletonBar