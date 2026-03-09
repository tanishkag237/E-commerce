import React,{useState, useEffect} from 'react'
import Table from '../../components/common/Table'
import Loader from '../../components/common/Loader'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsersThunk } from '../../features/users/userSlice'

const userColumns = [
    {header:"ID", accessor:"id"},
    {header:"Userame", accessor:"username"},
    {header:"Email", accessor:"email"},
    {header:"Phone", accessor:"phone"},
    {header:"City", accessor:"city",cell:(row)=>row?.address?.city},
]

const ViewUsers = () => {

  const dispatch = useDispatch()
  const {data:users=[], isLoading, error} = useSelector((state)=>state.users)

      useEffect(()=>{
        try{
          dispatch(fetchUsersThunk())
          toast.success("All users fetched !")
        } catch(err){
          toast.error("Failed to fetch users")
        }
      },[dispatch])

    if(isLoading) return <Loader/>
    if (error) return <p className="text-red-500">{error}</p>;

  return (
     <div className="w-full max-w-7xl bg-white shadow-lg rounded-2xl p-8">
      <h1 className="text-3xl font-bold text-custom-wine mb-8 text-center">
        ACTIVE USERS 
      </h1>
      <div className='p-5'>
        <Table data={users} columns = {userColumns}/>
      </div>
      
    </div>
  )
}

export default ViewUsers