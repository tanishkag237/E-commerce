import { useContext } from 'react'
import {AuthContext} from '../context/AuthContext'

export const useAuth = () =>{
    const context = useContext(AuthContext)
    if(!context){
        console.log("useAuth should be used with AuthProvider")
    }
    return context;
}
