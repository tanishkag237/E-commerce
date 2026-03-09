import axios from "axios";

export const fakeStoreApi = axios.create({
    baseURL:"https://fakestoreapi.com",
    timeout:5000
})

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
        if(response.status !== 200 || response.status !==201 ){
            console.log("Error in user API")
        }
        return response;
    },
    (error)=>{
        console.log("API Error :", error.message);
        return Promise.reject(error);
    }
)