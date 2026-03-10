import axios from "axios";
import { toast } from "sonner";

export const fakeStoreApi = axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    timeout:5000
})
console.log(import.meta.env.VITE_API_URL);
fakeStoreApi.interceptors.request.use(
     (config)=>{
        console.log("Request sent : ",config.url )
        return config;
    },
    (error)=>{
        console.log("Request Error", error);
        return Promise.reject(error);
    }
)

fakeStoreApi.interceptors.response.use(
     (response)=>{
        if(response.status !== 200 && response.status !==201 ){
            // toast.error("Error in API")
            console.log("Error in API")
        }
        return response;
    },
    (error)=>{
        // console.log("API Error :", error.message);
        toast.error(`Network Error: Couldn't fetch details - ${error.message}`);
        return Promise.reject(error);
    }
)